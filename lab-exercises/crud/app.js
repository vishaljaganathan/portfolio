import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDnSRrd6njovTMqMbN7iHU7b4-Z1ZomBhE",
    authDomain: "webtechnology-96e5c.firebaseapp.com",
    projectId: "webtechnology-96e5c",
    storageBucket: "webtechnology-96e5c.firebasestorage.app",
    messagingSenderId: "77388901986",
    appId: "1:77388901986:web:1134e4d6186d6f47ca6b3b",
    measurementId: "G-2XT40BR7X5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('userForm');
const userIdInput = document.getElementById('userId');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const roleInput = document.getElementById('role');
const formTitle = document.getElementById('formTitle');
const formBadge = document.getElementById('formBadge');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const usersGrid = document.getElementById('usersGrid');
const loader = document.getElementById('loader');
const emptyState = document.getElementById('emptyState');
const setupOverlay = document.getElementById('setupOverlay');
const dismissSetupBtn = document.getElementById('dismissSetupBtn');
const toastContainer = document.getElementById('toastContainer');

let usersList = [];
let isDemoMode = false;

window.editUser = editUser;
window.deleteUser = deleteUser;

const getUserId = (user) => user.id || user._id || (typeof user._id === 'object' ? user._id.$oid : user._id);

function init() {
    fetchUsers();
    form.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', resetForm);
    searchInput.addEventListener('input', handleSearch);
    dismissSetupBtn.addEventListener('click', enableDemoMode);
}

async function fetchUsers() {
    if (isDemoMode) return renderUsers();

    showLoader(true);

    try {
        const snapshot = await getDocs(collection(db, 'users'));
        usersList = snapshot.docs.map(docSnap => ({ ...docSnap.data(), id: docSnap.id }));
        renderUsers();

        if (usersList.length > 0) {
            showToast('Data loaded successfully', 'success');
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        const message = error?.code === 'failed-precondition'
            ? 'Firestore is not enabled for this project.'
            : error?.code === 'permission-denied'
                ? 'Firestore rules are blocking access.'
                : 'Failed to connect to database';

        showToast(message, 'error');
        emptyState.classList.remove('hidden');
        usersGrid.classList.add('hidden');
    } finally {
        showLoader(false);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        role: roleInput.value
    };

    const id = userIdInput.value;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    if (isDemoMode) {
        if (id) {
            const index = usersList.findIndex(u => getUserId(u) === id);
            if (index !== -1) usersList[index] = { ...usersList[index], ...userData };
            showToast('User updated successfully (Demo)', 'success');
        } else {
            usersList.push({ id: 'mock_' + Date.now(), ...userData });
            showToast('User created successfully (Demo)', 'success');
        }
        resetForm();
        renderUsers();
        submitBtn.disabled = false;
        return;
    }

    try {
        if (id) {
            await updateDoc(doc(db, 'users', id), userData);
            showToast('User updated successfully', 'success');
        } else {
            await addDoc(collection(db, 'users'), userData);
            showToast('User added successfully', 'success');
        }

        resetForm();
        fetchUsers();
    } catch (error) {
        console.error('Error saving user:', error);
        showToast('Failed to save user data', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = id ? '<i class="fas fa-save"></i> Update User' : '<i class="fas fa-plus-circle"></i> Add User';
    }
}

async function deleteUser(id, name) {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    if (isDemoMode) {
        usersList = usersList.filter(u => getUserId(u) !== id);
        renderUsers();
        showToast('User deleted (Demo)', 'success');
        return;
    }

    try {
        await deleteDoc(doc(db, 'users', id));
        showToast('User deleted successfully', 'success');
        fetchUsers();
    } catch (error) {
        console.error('Error deleting user:', error);
        showToast('Failed to delete user', 'error');
    }
}

function renderUsers(usersToRender = usersList) {
    usersGrid.innerHTML = '';

    if (usersToRender.length === 0) {
        emptyState.classList.remove('hidden');
        usersGrid.classList.add('hidden');
        return;
    }

    emptyState.classList.add('hidden');
    usersGrid.classList.remove('hidden');

    usersToRender.forEach(user => {
        const idStr = getUserId(user);
        const name = user.name || 'Unknown';
        const email = user.email || 'No email';
        const role = user.role || 'User';

        const card = document.createElement('div');
        card.className = 'user-card';
        card.innerHTML = `
            <div class="user-info">
                <div class="user-avatar">${name.charAt(0).toUpperCase()}</div>
                <div class="user-details">
                    <h3>${name}</h3>
                    <p><i class="fas fa-envelope"></i> ${email}</p>
                </div>
            </div>
            <div class="user-meta">
                <span class="user-role">${role}</span>
                <div class="user-actions">
                    <button onclick="editUser('${idStr}')" class="btn btn-icon-small btn-secondary" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteUser('${idStr}', '${name}')" class="btn btn-icon-small btn-danger" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        usersGrid.appendChild(card);
    });
}

function editUser(idStr) {
    const user = usersList.find(u => getUserId(u) === idStr);
    if (!user) return;

    userIdInput.value = idStr;
    nameInput.value = user.name || '';
    emailInput.value = user.email || '';
    roleInput.value = user.role || '';

    formTitle.textContent = 'Edit User';
    formBadge.textContent = 'Edit Mode';
    submitBtn.innerHTML = '<i class="fas fa-save"></i> <span>Update User</span>';
    cancelBtn.classList.remove('hidden');
    document.querySelector('.form-panel').scrollIntoView({ behavior: 'smooth' });
}

function resetForm() {
    form.reset();
    userIdInput.value = '';
    formTitle.textContent = 'Add New User';
    formBadge.textContent = 'Create Mode';
    submitBtn.innerHTML = '<i class="fas fa-plus-circle"></i> <span>Add User</span>';
    cancelBtn.classList.add('hidden');
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const filtered = usersList.filter(user => {
        const name = String(user.name || '').toLowerCase();
        const email = String(user.email || '').toLowerCase();
        const role = String(user.role || '').toLowerCase();
        return name.includes(term) || email.includes(term) || role.includes(term);
    });
    renderUsers(filtered);
}

function showLoader(show) {
    if (show) {
        loader.classList.remove('hidden');
        emptyState.classList.add('hidden');
        usersGrid.classList.add('hidden');
    } else {
        loader.classList.add('hidden');
    }
}

function enableDemoMode() {
    isDemoMode = true;
    setupOverlay.classList.add('hidden');
    usersList = [
        { id: 'mock_1', name: 'Alice Smith', email: 'alice@example.com', role: 'Admin' },
        { id: 'mock_2', name: 'Bob Johnson', email: 'bob@example.com', role: 'Developer' },
        { id: 'mock_3', name: 'Carol Williams', email: 'carol@example.com', role: 'Designer' }
    ];
    renderUsers();
    showToast('Demo Mode enabled with mock data', 'success');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

init();
