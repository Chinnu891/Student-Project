import React, { useState, useEffect, useRef } from 'react';
import EmployeePopup from './EmployeePopup';
import './StudentForm.css';

const StudentForm = ({ student = null, onSuccess }) => {
  const [form, setForm] = useState({
    student_id: '',
    student_name: '',
    dob: '',
    college_id: '',
    discipline: '',
    branch: '',
    father_id: ''
  });

  const [errors, setErrors] = useState({});
  const [colleges, setColleges] = useState([]);
  const [otherCollege, setOtherCollege] = useState('');
  const [showOtherCollege, setShowOtherCollege] = useState(false);
  const [disciplines] = useState([
    { name: "Engineering Technology", branches: ["CSE", "ECE", "EEE", "Civil", "Mechanical"] },
    { name: "Science & Arts College", branches: ["BSc", "BA", "B.Com"] },
    { name: "Medical College", branches: ["MBBS", "BDS", "Pharmacy"] },
    { name: "Diploma College", branches: ["Diploma CSE", "Diploma EEE", "Diploma Civil"] }
  ]);
  const [branches, setBranches] = useState([]);
  const [fathers, setFathers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [studentIdStatus, setStudentIdStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('https://student-project.infinityfree.me/getColleges.php')
      .then(res => res.json())
      .then(data => setColleges(data));

    fetch('https://student-project.infinityfree.me/getFathers.php')
      .then(res => res.json())
      .then(data => setFathers(data));

    if (student) {
      setForm({ ...student });
      const selected = disciplines.find(d => d.name === student.discipline);
      setBranches(selected ? selected.branches : []);
    }
  }, [student]);

  const capitalizeWords = (text) =>
    text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'student_name') {
      setForm(prev => ({ ...prev, student_name: capitalizeWords(value) }));
      return;
    }

    if (name === 'other_college') {
      setOtherCollege(capitalizeWords(value));
      return;
    }

    if (name === 'discipline') {
      const selected = disciplines.find(d => d.name === value);
      setBranches(selected ? selected.branches : []);
      setForm(prev => ({ ...prev, discipline: value, branch: '' }));
      return;
    }

    if (name === 'college_id') {
      if (value === 'Other') {
        setShowOtherCollege(true);
        setForm(prev => ({ ...prev, college_id: '' }));
        return;
      } else {
        setForm(prev => ({ ...prev, college_id: value }));
        setShowOtherCollege(false);
        return;
      }
    }

    if (name === 'father_id') {
      if (value === 'Other') {
        setShowPopup(true);
        setForm(prev => ({ ...prev, father_id: '' }));
      } else {
        setForm(prev => ({ ...prev, father_id: value }));
      }
      return;
    }

    if (name === 'student_id') {
      checkStudentId(value);
    }

    if (name === 'dob') {
      const dobDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;
      if (age < 18) {
        setErrors(prev => ({ ...prev, dob: "Age should be 18 above" }));
      } else {
        setErrors(prev => {
          const updated = { ...prev };
          delete updated.dob;
          return updated;
        });
      }
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const checkStudentId = (id) => {
    if (!id) return;
    fetch(`https://student-project.infinityfree.me/checkStudentId.php?student_id=${id}`)
      .then(res => res.text())
      .then(text => {
        if (!student || student.student_id !== id) {
          setStudentIdStatus(text === "exists" ? "Already exist" : "");
        }
      });
  };

  const addCollege = async () => {
    const res = await fetch("https://student-project.infinityfree.me/addCollege.php", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ college_name: otherCollege })
    });
    const data = await res.json();
    if (data.success) {
      const newCollegeId = data.id;
      setColleges(prev => [...prev, data]);
      setShowOtherCollege(false);
      setOtherCollege('');
      return newCollegeId;
    } else {
      alert(data.message);
      return null;
    }
  };

  const validateForm = (formData) => {
    const newErrors = {};
    const dobDate = new Date(formData.dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;
    if (age < 18) newErrors.dob = "Age should be 18 above";
    if (!formData.student_id) newErrors.student_id = "Required";
    if (!formData.student_name) newErrors.student_name = "Required";
    if (!formData.college_id) newErrors.college_id = "Required";
    if (!formData.discipline) newErrors.discipline = "Required";
    if (!formData.branch) newErrors.branch = "Required";
    if (!formData.father_id) newErrors.father_id = "Required";
    if (studentIdStatus) newErrors.student_id = "Already exist";
    setErrors(newErrors);

    setTimeout(() => {
      const errorField = document.querySelector(".error-text");
      if (errorField) {
        errorField.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let updatedForm = { ...form };

    if (showOtherCollege && otherCollege.trim()) {
      const newCollegeId = await addCollege();
      if (!newCollegeId) {
        setLoading(false);
        return;
      }
      updatedForm.college_id = newCollegeId;
      setForm(prev => ({ ...prev, college_id: newCollegeId }));
    }

    if (!validateForm(updatedForm)) {
      setLoading(false);
      return;
    }

    const url = student
      ? 'https://student-project.infinityfree.me/updateStudent.php'
      : 'https://student-project.infinityfree.me/saveStudent.php';

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedForm)
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      setSuccessMessage(student ? "Student Updated Successfully!" : "Student Registered Successfully!");
      setTimeout(() => setSuccessMessage(''), 3000);
      if (onSuccess) onSuccess();
      if (!student) {
        setForm({
          student_id: '', student_name: '', dob: '', college_id: '',
          discipline: '', branch: '', father_id: ''
        });
      }
    } else {
      alert(data.message || "Something went wrong.");
    }
  };

  const handleFatherAdded = (newFather) => {
    setFathers(prev => [...prev, newFather]);
    setForm(prev => ({ ...prev, father_id: newFather.employee_id }));
    setShowPopup(false);
  };

  return (
      <div className="student-form-box">
        <h2 className="form-title">{student ? "Edit Student" : "Student Registration"}</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="form-fields">
          <div className="form-grid">
            <div>
              <label>Student ID <span className="required">*</span></label>
              <input
                type="text"
                name="student_id"
                value={form.student_id}
                onChange={handleChange}
                disabled={!!student}
                className={student ? "disabled" : ""}
              />
              {errors.student_id && <p className="error-text">{errors.student_id}</p>}
              {studentIdStatus && <p className="error-text">{studentIdStatus}</p>}
            </div>

            <div>
              <label>Student Name <span className="required">*</span></label>
              <input type="text" name="student_name" value={form.student_name} onChange={handleChange} />
              {errors.student_name && <p className="error-text">{errors.student_name}</p>}
            </div>

            <div>
              <label>Date of Birth <span className="required">*</span></label>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} />
              {errors.dob && <p className="error-text">{errors.dob}</p>}
            </div>

            <div>
              <label>College <span className="required">*</span></label>
              <select name="college_id" value={form.college_id} onChange={handleChange}>
                <option value="">Select College</option>
                {colleges.map((col, index) => (
                  <option key={col.id || index} value={col.id}>{col.college_name}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {showOtherCollege && (
                <input
                  type="text"
                  name="other_college"
                  placeholder="Enter College Name"
                  value={otherCollege}
                  onChange={handleChange}
                />
              )}
              {errors.college_id && <p className="error-text">{errors.college_id}</p>}
            </div>

            <div>
              <label>Discipline <span className="required">*</span></label>
              <select name="discipline" value={form.discipline} onChange={handleChange}>
                <option value="">Select Discipline</option>
                {disciplines.map((d, idx) => (
                  <option key={idx} value={d.name}>{d.name}</option>
                ))}
              </select>
              {errors.discipline && <p className="error-text">{errors.discipline}</p>}
            </div>

            <div>
              <label>Branch <span className="required">*</span></label>
              <select name="branch" value={form.branch} onChange={handleChange}>
                <option value="">Select Branch</option>
                {branches.map((b, idx) => (
                  <option key={idx} value={b}>{b}</option>
                ))}
              </select>
              {errors.branch && <p className="error-text">{errors.branch}</p>}
            </div>

            <div>
              <label>Father Name <span className="required">*</span></label>
              <select name="father_id" value={form.father_id} onChange={handleChange}>
                <option value="">Select Father</option>
                {fathers.map((f, idx) => (
                  <option key={idx} value={f.employee_id}>{f.employee_name}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {errors.father_id && <p className="error-text">{errors.father_id}</p>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : student ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        {showPopup && (
          <EmployeePopup
            onClose={() => setShowPopup(false)}
            onSaved={handleFatherAdded}
          />
        )}
      </div>
  );
};

export default StudentForm;
  