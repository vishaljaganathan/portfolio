import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc
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

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const dashboardMessage = document.getElementById('dashboardMessage');
const userTableBody = document.getElementById('userTableBody');
const welcomeUser = document.getElementById('welcomeUser');
const logoutBtn = document.getElementById('logoutBtn');
const toast = document.getElementById('toast');

const userCountEl = document.getElementById('userCount');
const adminCountEl = document.getElementById('adminCount');
const employeeCountEl = document.getElementById('employeeCount');

const DEMO_USERS = [
    { name: 'Vishal Admin', email: 'admin@company.com', password: 'admin123', role: 'admin' },
    { name: 'Rahul Employee', email: 'employee@company.com', password: 'emp123', role: 'employee' },
    { name: 'Sita Admin', email: 'sita@company.com', password: 'admin123', role: 'admin' },
    { name: 'Arun Employee', email: 'arun@company.com', password: 'emp123', role: 'employee' }
];

let currentUser = null;
let users = [];

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
}

function getUsersFallback() {
    const saved = localStorage.getItem('companyWebUsers');
    if (saved) {
        return JSON.parse(saved);
    }

    localStorage.setItem('companyWebUsers', JSON.stringify(DEMO_USERS));
    return DEMO_USERS;
}

async function loadUsers() {
    try {
        const snapshot = await getDocs(collection(db, 'companyUsers'));
        const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        users = list.length ? list : getUsersFallback();
    } catch (error) {
        console.warn('Firebase unavailable, using demo data:', error);
        users = getUsersFallback();
    }

    updateStats();
    return users;
}

function updateStats() {
    userCountEl.textContent = users.length;
    adminCountEl.textContent = users.filter(u => u.role === 'admin').length;
    employeeCountEl.textContent = users.filter(u => u.role === 'employee').length;
}

function renderDashboard() {
    if (!currentUser) {
        dashboard.classList.add('hidden');
        return;
    }

    dashboard.classList.remove('hidden');
    welcomeUser.textContent = `Welcome, ${currentUser.name}`;

    const visibleUsers = currentUser.role === 'employee'
        ? users.filter(user => user.role === 'admin')
        : users.filter(user => user.role === 'employee');

    const title = currentUser.role === 'employee'
        ? 'Admin Details'
        : 'Employee Details';

    dashboardMessage.textContent = `${title} for ${currentUser.name}`;

    if (!visibleUsers.length) {
        userTableBody.innerHTML = `
            <tr>
                <td colspan="3">No records available.</td>
            </tr>
        `;
        return;
    }

    userTableBody.innerHTML = visibleUsers.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
        </tr>
    `).join('');
}

async function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();
    const role = document.getElementById('regRole').value;

    if (!name || !email || !password) {
        showToast('Please fill all fields');
        return;
    }

    const userList = await loadUsers();
    const exists = userList.some(user => user.email.toLowerCase() === email.toLowerCase());

    if (exists) {
        showToast('User already exists');
        return;
    }

    try {
        await addDoc(collection(db, 'companyUsers'), {
            name,
            email,
            password,
            role
        });

        const saveList = [...userList, { name, email, password, role }];
        users = saveList;
        localStorage.setItem('companyWebUsers', JSON.stringify(saveList));
        updateStats();
        showToast('Registration successful');
        registerForm.reset();
    } catch (error) {
        console.warn('Firestore write failed; using demo storage instead.', error);
        const saveList = [...userList, { name, email, password, role }];
        users = saveList;
        localStorage.setItem('companyWebUsers', JSON.stringify(saveList));
        updateStats();
        showToast('Registration successful (demo mode)');
        registerForm.reset();
    }
}

async function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    const userList = await loadUsers();
    const matchedUser = userList.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);

    if (!matchedUser) {
        showToast('Invalid email or password');
        return;
    }

    currentUser = matchedUser;
    renderDashboard();
    loginForm.reset();
    showToast('Login successful');
}

function logoutUser() {
    currentUser = null;
    dashboard.classList.add('hidden');
    showToast('Logged out successfully');
}

registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);
logoutBtn.addEventListener('click', logoutUser);

loadUsers();
renderDashboard();
