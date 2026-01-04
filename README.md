# Student Registration System

A comprehensive full-stack web application for managing student registrations with employee/father information, colleges, departments, and designations.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

This Student Registration System allows educational institutions to manage student records with detailed information including:
- Student personal details (ID, name, date of birth)
- College and academic information (college, discipline, branch)
- Parent/Guardian information (linked to employee records)
- Employee management system
- College, department, and designation management

## ✨ Features

### Student Management
- ✅ Add new student registrations
- ✅ View all registered students
- ✅ Edit existing student records
- ✅ Delete student records
- ✅ Student ID validation (prevents duplicates)
- ✅ Real-time student ID availability check

### Employee/Father Management
- ✅ Add employee records (can be linked as student's father)
- ✅ Employee ID validation
- ✅ Department and designation assignment
- ✅ Salary and date of birth tracking

### College Management
- ✅ Pre-defined list of colleges
- ✅ Add custom colleges
- ✅ College selection dropdown

### Academic Information
- ✅ Multiple disciplines (Engineering, Science & Arts, Medical, Diploma)
- ✅ Branch selection based on discipline
- ✅ Date picker for date of birth

### User Interface
- ✅ Modern, responsive React UI
- ✅ Form validation
- ✅ Success/error messages
- ✅ Popup modals for employee/father selection
- ✅ Clean and intuitive design

## 🛠 Technology Stack

### Frontend
- **React** 18.2.0 - UI library
- **React Router DOM** 7.6.3 - Routing
- **React DatePicker** 8.4.0 - Date selection
- **Date-fns** 4.1.0 - Date formatting
- **Tailwind CSS** 4.1.11 - Styling
- **React Scripts** 5.0.1 - Build tools

### Backend
- **PHP** 8.2+ - Server-side scripting
- **MySQL/MariaDB** 10.4+ - Database

### Development Tools
- **Node.js** - Package management
- **npm** - Dependency management

## 📁 Project Structure

```
student-project/
├── frontend/                    # React frontend application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── StudentForm.jsx      # Student registration form
│   │   │   ├── StudentList.jsx      # Student list view
│   │   │   ├── EmployeePopup.jsx    # Employee selection popup
│   │   │   ├── FatherPopup.jsx      # Father selection popup
│   │   │   └── *.css               # Component styles
│   │   ├── App.js              # Main app component
│   │   ├── index.js            # Entry point
│   │   └── ...
│   ├── package.json            # Frontend dependencies
│   └── README.md               # Frontend documentation
│
├── addCollege.php              # Add new college
├── checkEmployeeId.php         # Validate employee ID
├── checkStudentId.php          # Validate student ID
├── deleteStudent.php           # Delete student record
├── editStudent.php             # Edit student form data
├── getColleges.php             # Fetch all colleges
├── getDepartments.php          # Fetch all departments
├── getDesignations.php         # Fetch all designations
├── getFathers.php              # Fetch all employees (fathers)
├── getStudents.php             # Fetch all students
├── saveDepartment.php          # Save new department
├── saveDesignation.php         # Save new designation
├── saveEmployee.php            # Save new employee
├── saveStudent.php             # Save new student
├── updateStudent.php            # Update student record
├── student_registration.sql    # Database schema and data
└── README.md                   # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** 8.2 or higher
- **MySQL/MariaDB** 10.4 or higher
- **Node.js** 16.x or higher
- **npm** or **yarn**
- **Web Server** (Apache/Nginx) or PHP built-in server
- **Git** (for version control)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Chinnu891/Student-Project.git
cd Student-Project
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 3. Database Setup

1. Import the database schema:
   ```bash
   mysql -u root -p < student_registration.sql
   ```
   
   Or use phpMyAdmin:
   - Open phpMyAdmin
   - Create a new database named `student_registration`
   - Import the `student_registration.sql` file

### 4. Configure Database Connection

Update the database credentials in PHP files (if needed):
- Default: `localhost`, `root`, no password
- Database: `student_registration`

Edit the following files if your database credentials differ:
- `saveStudent.php`
- `getStudents.php`
- `updateStudent.php`
- `deleteStudent.php`
- `saveEmployee.php`
- `getFathers.php`
- And other PHP files as needed

## ⚙️ Configuration

### Backend Configuration

Update database connection in PHP files:

```php
$host = "localhost";
$username = "root";
$password = "";  // Your MySQL password
$database = "student_registration";
```

### Frontend Configuration

Update API endpoints in React components if your backend URL differs:

```javascript
// Default: http://localhost/student-project/
// Update in:
// - StudentForm.jsx
// - StudentList.jsx
// - EmployeePopup.jsx
```

## 🎮 Usage

### Start the Backend (PHP)

**Option 1: Using PHP Built-in Server**
```bash
php -S localhost:8000
```

**Option 2: Using Apache/Nginx**
- Place project in `htdocs` (XAMPP) or `www` (WAMP)
- Access via: `http://localhost/student-project/`

### Start the Frontend (React)

```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`

### Build for Production

```bash
cd frontend
npm run build
```

## 📡 API Endpoints

### Student Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `getStudents.php` | GET | Fetch all students |
| `saveStudent.php` | POST | Create new student |
| `updateStudent.php` | POST | Update student record |
| `deleteStudent.php` | POST | Delete student |
| `checkStudentId.php` | POST | Validate student ID |

### Employee Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `getFathers.php` | GET | Fetch all employees (fathers) |
| `saveEmployee.php` | POST | Create new employee |
| `checkEmployeeId.php` | POST | Validate employee ID |

### College/Department/Designation Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `getColleges.php` | GET | Fetch all colleges |
| `addCollege.php` | POST | Add new college |
| `getDepartments.php` | GET | Fetch all departments |
| `saveDepartment.php` | POST | Add new department |
| `getDesignations.php` | GET | Fetch all designations |
| `saveDesignation.php` | POST | Add new designation |

## 🧩 Components

### StudentForm
- Handles student registration and editing
- Form validation
- College and discipline selection
- Father/Employee linking

### StudentList
- Displays all registered students
- Edit and delete functionality
- Search and filter capabilities

### EmployeePopup
- Modal for adding new employees
- Department and designation selection
- Employee ID validation

### FatherPopup
- Modal for selecting existing employee as father
- Search and filter employees

## 🗄 Database Schema

### Tables

1. **students**
   - `student_id` (Primary Key)
   - `student_name`
   - `dob`
   - `college_id` (Foreign Key)
   - `discipline`
   - `branch`
   - `father_id` (Foreign Key to employee)

2. **employee**
   - `employee_id` (Primary Key)
   - `employee_name`
   - `dob`
   - `salary`
   - `department_id` (Foreign Key)
   - `designation_id` (Foreign Key)

3. **colleges**
   - `id` (Primary Key)
   - `college_name`

4. **departments**
   - `department_id` (Primary Key)
   - `department_name`

5. **designations**
   - `designation_id` (Primary Key)
   - `designation_name`

## 🔧 Development

### Running Tests

```bash
cd frontend
npm test
```

### Code Formatting

The project uses standard React and PHP coding conventions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Chinnu891**

- GitHub: [@Chinnu891](https://github.com/Chinnu891)
- Repository: [Student-Project](https://github.com/Chinnu891/Student-Project.git)

## 🙏 Acknowledgments

- React team for the amazing framework
- PHP community for backend support
- All contributors and users of this project

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Note**: Make sure to update the database credentials and API endpoints according to your local setup before running the application.

