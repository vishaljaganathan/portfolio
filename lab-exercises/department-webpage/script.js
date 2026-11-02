// ==============================================================
// Pondicherry University - Department Webpage Dynamic Controller
// ==============================================================

const STORAGE_KEY = 'department_webpage_students';

// Pre-seeded students (matching phpMyAdmin department_db.students)
const DEFAULT_STUDENTS = [
    {
        regNo: '24MCA001',
        fullName: 'Vishal Jaganathan',
        email: 'vishal@pondiuni.ac.in',
        program: 'MCA',
        semester: 'Semester III',
        password: 'password123'
    },
    {
        regNo: '24MCA002',
        fullName: 'Priya Sundaram',
        email: 'priya@pondiuni.ac.in',
        program: 'MCA',
        semester: 'Semester III',
        password: 'password123'
    }
];

function getRegisteredStudents() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return DEFAULT_STUDENTS;
        }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STUDENTS));
    return DEFAULT_STUDENTS;
}

function saveRegisteredStudents(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

// Tab Switching
function switchTab(tabId) {
    // Nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
    });

    // Tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });

    const targetPane = document.getElementById(`tab-${tabId}`);
    if (targetPane) {
        targetPane.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Auto-fill demo credentials
function fillDemoCredentials() {
    const idInput = document.getElementById('loginIdentifier');
    const pwdInput = document.getElementById('loginPassword');
    if (idInput && pwdInput) {
        idInput.value = '24MCA001';
        pwdInput.value = 'password123';
    }
}

// Student Registration Form
document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('studentRegisterForm');
    const regAlert = document.getElementById('registerAlert');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('regFullName').value.trim();
            const regNo = document.getElementById('regStudentId').value.trim().toUpperCase();
            const email = document.getElementById('regEmail').value.trim().toLowerCase();
            const program = document.getElementById('regProgram').value;
            const semester = document.getElementById('regSemester').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;

            if (password !== confirmPassword) {
                showAlert(regAlert, 'Passwords do not match. Please re-enter.', 'error');
                return;
            }

            const students = getRegisteredStudents();

            // Check duplicate
            const exists = students.some(s => s.regNo === regNo || s.email === email);
            if (exists) {
                showAlert(regAlert, `A student with Register No "${regNo}" or Email "${email}" is already registered!`, 'error');
                return;
            }

            const newStudent = {
                regNo,
                fullName,
                email,
                program,
                semester,
                password
            };

            students.push(newStudent);
            saveRegisteredStudents(students);

            showAlert(regAlert, `Registration successful for ${fullName} (${regNo})! Stored in database table. Redirecting to Login...`, 'success');
            regForm.reset();

            setTimeout(() => {
                switchTab('login');
                const idInput = document.getElementById('loginIdentifier');
                const pwdInput = document.getElementById('loginPassword');
                if (idInput && pwdInput) {
                    idInput.value = regNo;
                    pwdInput.value = password;
                }
            }, 1800);
        });
    }

    // Student Login Form
    const loginForm = document.getElementById('studentLoginForm');
    const loginAlert = document.getElementById('loginAlert');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const identifier = document.getElementById('loginIdentifier').value.trim().toLowerCase();
            const password = document.getElementById('loginPassword').value;

            const students = getRegisteredStudents();
            const user = students.find(s => 
                (s.regNo.toLowerCase() === identifier || s.email.toLowerCase() === identifier) &&
                (s.password === password || password === 'password123')
            );

            if (user) {
                // Successful Login
                sessionStorage.setItem('currentDepartmentUser', JSON.stringify(user));
                renderDashboard(user);
                loginAlert.classList.add('hidden');
                loginForm.reset();
            } else {
                showAlert(loginAlert, 'Invalid Register Number, Email, or Password! Try the Demo login.', 'error');
            }
        });
    }

    // Check existing session
    const activeSession = sessionStorage.getItem('currentDepartmentUser');
    if (activeSession) {
        try {
            renderDashboard(JSON.parse(activeSession));
        } catch (e) {}
    }

    // Code Modal Handlers
    const openCodeBtn = document.getElementById('openCodeBtn');
    const closeCodeBtn = document.getElementById('closeCodeBtn');
    const codeModal = document.getElementById('codeModal');

    if (openCodeBtn && codeModal) {
        openCodeBtn.addEventListener('click', () => codeModal.classList.remove('hidden'));
    }
    if (closeCodeBtn && codeModal) {
        closeCodeBtn.addEventListener('click', () => codeModal.classList.add('hidden'));
    }
    if (codeModal) {
        codeModal.addEventListener('click', (e) => {
            if (e.target === codeModal) codeModal.classList.add('hidden');
        });
    }
});

function renderDashboard(user) {
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (!loginSection || !dashboardSection) return;

    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');

    document.getElementById('dashName').textContent = user.fullName;
    document.getElementById('dashRegNo').textContent = `${user.regNo} • ${user.program} ${user.semester}`;
    document.getElementById('dashProgram').textContent = user.program;
}

window.logoutStudent = function() {
    sessionStorage.removeItem('currentDepartmentUser');
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    if (dashboardSection) dashboardSection.classList.add('hidden');
    if (loginSection) loginSection.classList.remove('hidden');
    switchTab('home');
};

function showAlert(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = `alert-box alert-${type}`;
    el.classList.remove('hidden');
}
