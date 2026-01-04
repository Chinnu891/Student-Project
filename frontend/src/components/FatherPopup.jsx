import React, { useState, useEffect } from 'react';

const FatherPopup = ({ onClose, onSave }) => {
  const [father, setFather] = useState({
    employee_name: '',
    employee_id: '',
    dob: '',
    salary: '',
    designation: '',
    department: '',
  });

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [showDeptInput, setShowDeptInput] = useState(false);
  const [showDesigInput, setShowDesigInput] = useState(false);

  useEffect(() => {
    fetch('http://localhost/student-project/getDepartments.php')
      .then(res => res.json())
      .then(data => setDepartments(data));
    fetch('http://localhost/student-project/getDesignations.php')
      .then(res => res.json())
      .then(data => setDesignations(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFather({ ...father, [name]: value });
  };

  const handleSave = () => {
    // Save to DB
    fetch('http://localhost/student-project/saveEmployee.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(father)
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert('Father details saved!');
        onSave(father); // send data back to StudentForm
        onClose();
      } else {
        alert('Error: ' + data.message);
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-xl p-6 w-[450px] shadow-xl relative">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Father Details</h2>

        <div className="space-y-3">
          <input
            type="text"
            name="employee_name"
            placeholder="Father Name"
            value={father.employee_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="employee_id"
            placeholder="Employee ID"
            value={father.employee_id}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="dob"
            value={father.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="salary"
            placeholder="Salary"
            value={father.salary}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          {/* Designation Dropdown */}
          {showDesigInput ? (
            <input
              type="text"
              name="designation"
              placeholder="Enter New Designation"
              value={father.designation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <select
              name="designation"
              value={father.designation}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'Other') {
                  setShowDesigInput(true);
                  setFather({ ...father, designation: '' });
                } else {
                  handleChange(e);
                }
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Designation</option>
              {designations.map((d, i) => (
                <option key={i} value={d.designation}>{d.designation}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          )}

          {/* Department Dropdown */}
          {showDeptInput ? (
            <input
              type="text"
              name="department"
              placeholder="Enter New Department"
              value={father.department}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          ) : (
            <select
              name="department"
              value={father.department}
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'Other') {
                  setShowDeptInput(true);
                  setFather({ ...father, department: '' });
                } else {
                  handleChange(e);
                }
              }}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Department</option>
              {departments.map((d, i) => (
                <option key={i} value={d.department}>{d.department}</option>
              ))}
              <option value="Other">Other</option>
            </select>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FatherPopup;
