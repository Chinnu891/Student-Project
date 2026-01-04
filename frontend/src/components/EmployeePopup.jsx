import React, { useState, useEffect, useRef } from 'react';
import './StudentForm.css'; // Using same CSS

const EmployeePopup = ({ onClose, onSaved }) => {
  const popupRef = useRef(null);

  const [form, setForm] = useState({
    employee_id: '',
    employee_name: '',
    dob: '',
    salary: '',
    designation: '',
    department: ''
  });
  const [errors, setErrors] = useState({});
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [otherDesignation, setOtherDesignation] = useState('');
  const [otherDepartment, setOtherDepartment] = useState('');
  const [showOtherDesignation, setShowOtherDesignation] = useState(false);
  const [showOtherDepartment, setShowOtherDepartment] = useState(false);
  const [employeeIdStatus, setEmployeeIdStatus] = useState('');

  // Close popup on ESC or outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    };
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  useEffect(() => {
    fetch('http://localhost/student-project/getDesignations.php')
      .then(res => res.json())
      .then(data => setDesignations(data));

    fetch('http://localhost/student-project/getDepartments.php')
      .then(res => res.json())
      .then(data => setDepartments(data));
  }, []);

  const capitalizeWords = (text) =>
    text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'employee_id') {
      checkEmployeeId(value);
    }

    if (name === 'employee_name') {
      const formatted = capitalizeWords(value);
      setForm(prev => ({ ...prev, employee_name: formatted }));
      return;
    }

    if (name === 'other_designation') {
      setOtherDesignation(capitalizeWords(value));
      return;
    }

    if (name === 'other_department') {
      setOtherDepartment(capitalizeWords(value));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const checkEmployeeId = (id) => {
    if (!id) return;
    fetch(`http://localhost/student-project/checkEmployeeId.php?employee_id=${id}`)
      .then(res => res.text())
      .then(text => {
        setEmployeeIdStatus(text === "exists" ? "Already exist" : "");
      });
  };

  const validateForm = () => {
    const newErrors = {};
    const dobDate = new Date(form.dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;
    if (age < 18) newErrors.dob = "Age should be 18 above";

    if (!form.employee_id) newErrors.employee_id = "Required";
    if (!form.employee_name) newErrors.employee_name = "Required";
    if (!form.dob) newErrors.dob = "Required";
    if (!form.salary || isNaN(form.salary)) newErrors.salary = "Valid salary required";
    if (!form.designation && !otherDesignation) newErrors.designation = "Required";
    if (!form.department && !otherDepartment) newErrors.department = "Required";
    if (employeeIdStatus) newErrors.employee_id = "Already exist";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addOption = async (type, value) => {
    const url = type === "designation"
      ? "http://localhost/student-project/addDesignation.php"
      : "http://localhost/student-project/addDepartment.php";

    const res = await fetch(url, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: value })
    });

    const data = await res.json();
    return data.success ? data.id : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedForm = { ...form };

    if (showOtherDesignation && otherDesignation.trim()) {
      const newId = await addOption("designation", otherDesignation);
      if (!newId) return alert("Failed to save new designation.");
      updatedForm.designation = otherDesignation;
    }

    if (showOtherDepartment && otherDepartment.trim()) {
      const newId = await addOption("department", otherDepartment);
      if (!newId) return alert("Failed to save new department.");
      updatedForm.department = otherDepartment;
    }

    if (!validateForm()) return;

    const res = await fetch("http://localhost/student-project/saveEmployee.php", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedForm)
    });

    const data = await res.json();

    if (data.success) {
      onSaved(updatedForm);
    } else {
      alert(data.message || "Something went wrong.");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box" ref={popupRef}>
        <h3 className="form-title">Add Father Details</h3>

        <form onSubmit={handleSubmit} className="form-fields">
          <div className="form-grid">
            <div>
              <label>Employee ID <span className="required">*</span></label>
              <input type="text" name="employee_id" value={form.employee_id} onChange={handleChange} />
              {errors.employee_id && <p className="error-text">{errors.employee_id}</p>}
              {employeeIdStatus && <p className="error-text">{employeeIdStatus}</p>}
            </div>

            <div>
              <label>Father Name <span className="required">*</span></label>
              <input type="text" name="employee_name" value={form.employee_name} onChange={handleChange} />
              {errors.employee_name && <p className="error-text">{errors.employee_name}</p>}
            </div>

            <div>
              <label>Date of Birth <span className="required">*</span></label>
              <input type="date" name="dob" value={form.dob} onChange={handleChange} />
              {errors.dob && <p className="error-text">{errors.dob}</p>}
            </div>

            <div>
              <label>Salary <span className="required">*</span></label>
              <input type="number" name="salary" value={form.salary} onChange={handleChange} />
              {errors.salary && <p className="error-text">{errors.salary}</p>}
            </div>

            <div>
              <label>Designation <span className="required">*</span></label>
              <select name="designation" value={form.designation} onChange={(e) => {
                const val = e.target.value;
                if (val === "Other") {
                  setShowOtherDesignation(true);
                  setForm(prev => ({ ...prev, designation: '' }));
                } else {
                  setShowOtherDesignation(false);
                  setForm(prev => ({ ...prev, designation: val }));
                }
              }}>
                <option value="">Select Designation</option>
                {designations.map((d, idx) => (
                  <option key={idx} value={d.designation_name}>{d.designation_name}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {showOtherDesignation && (
                <input
                  type="text"
                  name="other_designation"
                  placeholder="Enter Designation"
                  value={otherDesignation}
                  onChange={handleChange}
                />
              )}
              {errors.designation && <p className="error-text">{errors.designation}</p>}
            </div>

            <div>
              <label>Department <span className="required">*</span></label>
              <select name="department" value={form.department} onChange={(e) => {
                const val = e.target.value;
                if (val === "Other") {
                  setShowOtherDepartment(true);
                  setForm(prev => ({ ...prev, department: '' }));
                } else {
                  setShowOtherDepartment(false);
                  setForm(prev => ({ ...prev, department: val }));
                }
              }}>
                <option value="">Select Department</option>
                {departments.map((d, idx) => (
                  <option key={idx} value={d.department_name}>{d.department_name}</option>
                ))}
                <option value="Other">Other</option>
              </select>
              {showOtherDepartment && (
                <input
                  type="text"
                  name="other_department"
                  placeholder="Enter Department"
                  value={otherDepartment}
                  onChange={handleChange}
                />
              )}
              {errors.department && <p className="error-text">{errors.department}</p>}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeePopup;
