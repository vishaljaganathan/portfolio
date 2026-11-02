document.addEventListener('DOMContentLoaded', () => {
    const employeeForm = document.getElementById('employeeForm');
    const toastMessage = document.getElementById('toastMessage');
    const employeeTableBody = document.getElementById('employeeTableBody');
    const recordCountEl = document.getElementById('recordCount');
    const resetDataBtn = document.getElementById('resetDataBtn');
    const viewCodeBtn = document.getElementById('viewCodeBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const codeModal = document.getElementById('codeModal');

    const STORAGE_KEY = 'lab_exercise_employees_db';

    // Initial default mock records (representing phpMyAdmin database state)
    const DEFAULT_RECORDS = [
        {
            id: 101,
            fullName: 'Vishal Jaganathan',
            email: 'vishal@example.com',
            phone: '+91 9876543210',
            department: 'Engineering',
            joinDate: '2024-06-15',
            address: 'Puducherry, India',
            gender: 'Male'
        },
        {
            id: 102,
            fullName: 'Ananya Sharma',
            email: 'ananya@example.com',
            phone: '+91 9812345678',
            department: 'Design',
            joinDate: '2024-07-01',
            address: 'White Town, Puducherry',
            gender: 'Female'
        },
        {
            id: 103,
            fullName: 'Karthik Raja',
            email: 'karthik@example.com',
            phone: '+91 9845123456',
            department: 'Human Resources',
            joinDate: '2024-08-10',
            address: 'Muthialpet, Puducherry',
            gender: 'Male'
        }
    ];

    function getEmployees() {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                return DEFAULT_RECORDS;
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RECORDS));
        return DEFAULT_RECORDS;
    }

    function saveEmployees(records) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        renderTable();
    }

    function renderTable() {
        const records = getEmployees();
        recordCountEl.textContent = `${records.length} Records`;

        if (records.length === 0) {
            employeeTableBody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 2rem;">
                        No employee records found in the database. Use the form to register new employees.
                    </td>
                </tr>
            `;
            return;
        }

        employeeTableBody.innerHTML = records.map(emp => `
            <tr>
                <td><span class="id-tag">#${emp.id}</span></td>
                <td><strong>${escapeHtml(emp.fullName)}</strong></td>
                <td><span class="dept-badge ${emp.department.toLowerCase()}">${escapeHtml(emp.department)}</span></td>
                <td>${escapeHtml(emp.email)}</td>
                <td>${escapeHtml(emp.phone)}</td>
                <td>${escapeHtml(emp.joinDate || 'N/A')}</td>
                <td>${escapeHtml(emp.gender)}</td>
                <td>
                    <button class="action-btn delete-btn" onclick="deleteEmployee(${emp.id})" title="Delete record from table">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    window.deleteEmployee = function(id) {
        if (confirm(`Are you sure you want to delete employee #${id} from the database?`)) {
            const records = getEmployees().filter(e => e.id !== id);
            saveEmployees(records);
            showToast('Employee deleted from database table.');
        }
    };

    function showToast(msg) {
        toastMessage.querySelector('span').textContent = msg;
        toastMessage.classList.remove('hidden');
        setTimeout(() => {
            toastMessage.classList.add('hidden');
        }, 3200);
    }

    if (employeeForm) {
        employeeForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const records = getEmployees();
            const nextId = records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 101;

            const newEmployee = {
                id: nextId,
                fullName: document.getElementById('fullName').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                department: document.getElementById('department').value,
                joinDate: document.getElementById('joinDate').value,
                address: document.getElementById('address').value.trim(),
                gender: document.querySelector('input[name="gender"]:checked')?.value || 'Other'
            };

            // Check if email already exists
            if (records.some(r => r.email.toLowerCase() === newEmployee.email.toLowerCase())) {
                alert('An employee with this email is already registered in the database!');
                return;
            }

            records.push(newEmployee);
            saveEmployees(records);

            showToast(`Employee #${nextId} (${newEmployee.fullName}) successfully inserted into database!`);
            employeeForm.reset();
        });
    }

    if (resetDataBtn) {
        resetDataBtn.addEventListener('click', () => {
            if (confirm('Reset database to default sample employees?')) {
                saveEmployees(DEFAULT_RECORDS);
                showToast('Database reset to initial sample records.');
            }
        });
    }

    // Modal Handlers
    if (viewCodeBtn && codeModal) {
        viewCodeBtn.addEventListener('click', () => {
            codeModal.classList.remove('hidden');
        });
    }

    if (closeModalBtn && codeModal) {
        closeModalBtn.addEventListener('click', () => {
            codeModal.classList.add('hidden');
        });
    }

    if (codeModal) {
        codeModal.addEventListener('click', (e) => {
            if (e.target === codeModal) {
                codeModal.classList.add('hidden');
            }
        });
    }

    // Set today as max join date
    const joinDateInput = document.getElementById('joinDate');
    if (joinDateInput) {
        joinDateInput.value = new Date().toISOString().split('T')[0];
    }

    // Initial render
    renderTable();
});
