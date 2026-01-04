# InfinityFree Upload Checklist

## ✅ Step 1: Rebuild React App

```bash
cd frontend
npm run build
```

## ✅ Step 2: Upload to InfinityFree htdocs folder

### 📁 Build Files (from `frontend/build/` folder):

- [ ] `index.html` ⭐ **MUST**
- [ ] `favicon.ico`
- [ ] `logo192.png`
- [ ] `logo512.png`
- [ ] `manifest.json`
- [ ] `robots.txt`
- [ ] `asset-manifest.json`
- [ ] **`static/` folder** ⭐ **VERY IMPORTANT - Upload entire folder!**
  - [ ] `static/css/` folder (with all CSS files)
  - [ ] `static/js/` folder (with all JS files)

### 📁 PHP Files (from root directory):

- [ ] `addCollege.php`
- [ ] `checkEmployeeId.php`
- [ ] `checkStudentId.php`
- [ ] `deleteStudent.php`
- [ ] `editStudent.php`
- [ ] `getColleges.php`
- [ ] `getDepartments.php`
- [ ] `getDesignations.php`
- [ ] `getFathers.php`
- [ ] `getStudents.php`
- [ ] `saveDepartment.php`
- [ ] `saveDesignation.php`
- [ ] `saveEmployee.php`
- [ ] `saveStudent.php`
- [ ] `updateStudent.php`

### 📁 Configuration Files:

- [ ] `.htaccess` ⭐ **IMPORTANT for React Router**

## ✅ Step 3: Database Setup

1. [ ] InfinityFree Control Panel → MySQL Databases
2. [ ] Import `student_registration.sql` via phpMyAdmin
3. [ ] Verify database name: `if0_40822494_student_registration`

## ✅ Step 4: Verify Upload

After uploading, your `htdocs` folder should have:

```
htdocs/
├── index.html
├── favicon.ico
├── logo192.png
├── logo512.png
├── manifest.json
├── robots.txt
├── asset-manifest.json
├── static/              ← MUST BE UPLOADED!
│   ├── css/
│   └── js/
├── .htaccess            ← MUST BE UPLOADED!
└── *.php                ← All PHP files
```

## ⚠️ Common Issues:

1. **Site not loading?** 
   - Check if `static` folder is uploaded
   - Check if `index.html` is in root

2. **404 errors?**
   - Make sure `.htaccess` file is uploaded

3. **API not working?**
   - Check if PHP files are uploaded
   - Check database connection in PHP files

## 🎯 Final URL:

https://student-project.infinityfree.me/

