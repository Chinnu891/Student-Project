import React, { useEffect, useState } from 'react';
import StudentForm from './StudentForm';
import EmployeePopup from './EmployeePopup';
import { API_BASE_URL } from '../config';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [searchField, setSearchField] = useState('student_id');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [colleges, setColleges] = useState([]);
  const [disciplines] = useState([
    { name: 'Engineering Technology', branches: ['CSE', 'ECE', 'EEE', 'Civil', 'Mechanical'] },
    { name: 'Science & Arts College', branches: ['BSc', 'BA', 'B.Com'] },
    { name: 'Medical College', branches: ['MBBS', 'BDS', 'Pharmacy'] },
    { name: 'Diploma College', branches: ['Diploma CSE', 'Diploma EEE', 'Diploma Civil'] },
  ]);
  const [branches, setBranches] = useState([]);
  const [fathers, setFathers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [isOtherCollege, setIsOtherCollege] = useState(false);

  useEffect(() => {
    if (!sortField) {
      setSortField(searchField);
      setSortOrder('asc');
    }
  }, [searchField]);

  useEffect(() => {
    fetchStudents();
    fetch(`${API_BASE_URL}/getColleges.php`)
      .then(res => res.json())
      .then(data => setColleges(data));
    fetch(`${API_BASE_URL}/getFathers.php`)
      .then(res => res.json())
      .then(data => setFathers(data));
  }, [page, limit, search, searchField, sortField, sortOrder]);

  const fetchStudents = async () => {
    const res = await fetch(
      `${API_BASE_URL}/getStudents.php?page=${page}&limit=${limit}&search=${search}&field=${searchField}&sortField=${sortField}&sortOrder=${sortOrder}`
    );
    const data = await res.json();
    setStudents(data.students);
    setTotal(data.total);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  const handleEdit = (student) => {
    setEditingId(student.student_id);
    setEditData({
      ...student,
      college_id: student.college_id,
      college_name: '',
      original_id: student.student_id
    });
    const selected = disciplines.find((d) => d.name === student.discipline);
    setBranches(selected ? selected.branches : []);
    setIsOtherCollege(false);
  };

  const formatEachWord = (str) =>
    str.replace(/\b\w+/g, (word) =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (name === 'college_name') {
      const formatted = formatEachWord(value);
      setEditData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setEditData(prev => ({ ...prev, [name]: value }));

    if (name === 'discipline') {
      const selected = disciplines.find((d) => d.name === value);
      setBranches(selected ? selected.branches : []);
      setEditData(prev => ({ ...prev, branch: '' }));
    }

    if (name === 'father_id' && value === 'Other') setShowPopup(true);

    if (name === 'college_id') {
      if (value === 'Other') {
        setIsOtherCollege(true);
        setEditData(prev => ({ ...prev, college_id: '', college_name: '' }));
      } else {
        setIsOtherCollege(false);
        const selectedCollege = colleges.find(c => c.id === value);
        setEditData(prev => ({
          ...prev,
          college_id: value,
          college_name: selectedCollege?.college_name || ''
        }));
      }
    }
  };

  const handleSave = async () => {
    let collegeId = editData.college_id;

    if (isOtherCollege && editData.college_name) {
      const res = await fetch(`${API_BASE_URL}/addCollege.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ college_name: editData.college_name }),
      });
      const data = await res.json();
      if (data.success) {
        collegeId = data.id;
        setColleges(prev => [...prev, { id: data.id, college_name: data.college_name }]);
      } else {
        alert(data.message || 'Failed to add college');
        return;
      }
    }

    if (!collegeId || !editData.student_id || !editData.student_name || !editData.dob || !editData.discipline || !editData.branch) {
      alert('Missing required fields');
      return;
    }

    const res = await fetch(`${API_BASE_URL}/updateStudent.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editData, college_id: collegeId }),
    });
    const data = await res.json();
    if (data.success) {
      alert('Updated successfully!');
      setEditingId(null);
      setEditData({});
      setIsOtherCollege(false);
      fetchStudents();
    } else {
      alert(data.message || 'Update failed');
    }
  };

  const handleDelete = async (student_id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    const res = await fetch(`${API_BASE_URL}/deleteStudent.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id }),
    });
    const data = await res.json();
    if (data.success) {
      alert('Deleted successfully!');
      fetchStudents();
    }
  };

  const totalPages = Math.ceil(total / limit);

  const handleFatherAdded = (newFather) => {
    setFathers(prev => [...prev, newFather]);
    setEditData(prev => ({ ...prev, father_id: newFather.employee_id }));
    setShowPopup(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
    setIsOtherCollege(false);
  };

  return (
    <div className="student-list-container">
      {showForm ? (
        <div>
          <button className="back-to-list-button" onClick={() => {
            setShowForm(false);
            fetchStudents();
          }}>Back to List</button>
          <StudentForm />
        </div>
      ) : (
        <>
          <div className="header-container">
            <h2 className="title">Registered Students</h2>
            <div className="search-actions">
              <select value={searchField} onChange={(e) => { setSearchField(e.target.value); setPage(1); }} className="search-select">
                <option value="student_id">Student ID</option>
                <option value="student_name">Student Name</option>
                <option value="college_name">College</option>
                <option value="branch">Branch</option>
                <option value="father_employee_id">Father ID</option>
              </select>
              <input
                type="text"
                placeholder={`Search by ${searchField.replace('_', ' ')}...`}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="search-input"
              />
              <button className="add-button" onClick={() => setShowForm(true)}>+ Add Student</button>
            </div>
          </div>

          <div className="table-container table-scroll-container">
            <div className="table-wrapper">
              <div className="scroll-table-body">
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort('student_id')}>Student ID</th>
                      <th onClick={() => handleSort('student_name')}>Student Name</th>
                      <th onClick={() => handleSort('dob')}>DOB</th>
                      <th onClick={() => handleSort('college_name')}>College</th>
                      <th onClick={() => handleSort('discipline')}>Discipline</th>
                      <th onClick={() => handleSort('branch')}>Branch</th>
                      <th onClick={() => handleSort('father_name')}>Father Name</th>
                      <th onClick={() => handleSort('father_employee_id')}>Father ID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 ? (
                      <tr><td colSpan="9" className="no-records">No students found</td></tr>
                    ) : (
                      students.map((s) => (
                        <tr key={s.student_id} className="fade-in">
                          {editingId === s.student_id ? (
                            <>
                              <td><input type ="text"name="student_id" value={editData.student_id} onChange={handleEditChange} /></td>
                              <td><input type="text"name="student_name" value={editData.student_name} onChange={handleEditChange} /></td>
                              <td><input type="date" name="dob" value={editData.dob} onChange={handleEditChange} /></td>
                              <td>
                                {isOtherCollege ? (
                                  <input
                                    type="text"
                                    name="college_name"
                                    value={editData.college_name || ''}
                                    onChange={handleEditChange}
                                    placeholder="Enter new college name"
                                  />
                                ) : (
                                  <select name="college_id" value={editData.college_id} onChange={handleEditChange}>
                                    <option type="text" value="">Select</option>
                                    {colleges.map((c) => (
                                      <option key={c.id} value={c.id}>{c.college_name}</option>
                                    ))}
                                    <option value="Other">Other</option>
                                  </select>
                                )}
                              </td>
                              <td>
                                <select type="text" name="discipline" value={editData.discipline} onChange={handleEditChange}>
                                  <option value="">Select</option>
                                  {disciplines.map((d, idx) => (
                                    <option key={idx} value={d.name}>{d.name}</option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <select name="branch" value={editData.branch} onChange={handleEditChange}>
                                  <option value="">Select</option>
                                  {branches.map((b, idx) => (
                                    <option key={idx} value={b}>{b}</option>
                                  ))}
                                </select>
                              </td>
                              <td colSpan={2}>
                                <select name="father_id" value={editData.father_id} onChange={handleEditChange}>
                                  <option value="">Select</option>
                                  {fathers.map((f) => (
                                    <option key={f.employee_id} value={f.employee_id}>
                                      {f.employee_name} ({f.employee_id})
                                    </option>
                                  ))}
                                  <option value="Other">Other</option>
                                </select>
                              </td>
                              <td className="action-buttons">
                                <button onClick={handleSave} className="btn-save">Save</button>
                                <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>{s.student_id}</td>
                              <td>{s.student_name}</td>
                              <td>{s.dob}</td>
                              <td>{s.college_name}</td>
                              <td>{s.discipline}</td>
                              <td>{s.branch}</td>
                              <td>{s.father_name}</td>
                              <td>{s.father_employee_id}</td>
                              <td className="action-buttons">
                                <button className="edit-button" onClick={() => handleEdit(s)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(s.student_id)}>Delete</button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="pagination-container">
            <div className="rows-limit-control">
              <label htmlFor="rows">Rows:</label>
              <select
                id="rows"
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setPage(1);
                }}
                className="limit-dropdown"
              >
                {[5, 10, 20, 30, 50, 75, 100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="pagination-wrapper">
              <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>&lt; Prev</button>
              <span>Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next &gt;</button>
            </div>
          </div>

          {showPopup && (
            <EmployeePopup onClose={() => setShowPopup(false)} onSaved={handleFatherAdded} />
          )}
        </>
      )}
    </div>
  );
};

export default StudentList;
