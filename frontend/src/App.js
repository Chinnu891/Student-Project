import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [reload, setReload] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
     
      {showForm ? (
        <StudentForm
          onClose={() => {
            setShowForm(false);
            setReload(!reload);
          }}
        />
      ) : (
        <StudentList reload={reload} />
      )}
    </div>
  );
}