// ==============================================================
// Exercise 8: Contact Management Controller (CRUD)
// ==============================================================

const STORAGE_KEY = 'lab_exercise_contacts_db';

const INITIAL_CONTACTS = [
    {
        id: 1,
        name: 'Vishal Jaganathan',
        phone: '+91 9876543210',
        email: 'vishal@example.com',
        category: 'Work',
        notes: 'MCA Scholar & Full Stack Web Developer'
    },
    {
        id: 2,
        name: 'Aravind Kumar',
        phone: '+91 9845123456',
        email: 'aravind.k@example.com',
        category: 'Friends',
        notes: 'Web Technology Project Partner'
    },
    {
        id: 3,
        name: 'Dr. R. Subramanian',
        phone: '+91 9443219870',
        email: 'hod.cs@pondiuni.ac.in',
        category: 'Work',
        notes: 'Head of Department, Computer Science (Pondicherry University)'
    },
    {
        id: 4,
        name: 'Sneha Reddy',
        phone: '+91 9811223344',
        email: 'sneha.reddy@example.com',
        category: 'Personal',
        notes: 'UI/UX Designer at Sri Aurobindo Infotech'
    }
];

function getStoredContacts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        try {
            return JSON.parse(data);
        } catch (e) {
            return INITIAL_CONTACTS;
        }
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CONTACTS));
    return INITIAL_CONTACTS;
}

function saveContacts(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    renderContacts();
}

let activeFilter = 'all';
let currentSearch = '';
let isEditing = false;

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactSearch = document.getElementById('contactSearch');
    const filterPills = document.querySelectorAll('.pill-btn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const resetContactsBtn = document.getElementById('resetContactsBtn');

    // Code modal
    const openCodeBtn = document.getElementById('openCodeModalBtn');
    const closeCodeBtn = document.getElementById('closeCodeModalBtn');
    const codeModal = document.getElementById('codeModal');

    // Search input
    if (contactSearch) {
        contactSearch.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            renderContacts();
        });
    }

    // Filter pills
    filterPills.forEach(btn => {
        btn.addEventListener('click', () => {
            filterPills.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.getAttribute('data-filter');
            renderContacts();
        });
    });

    // Form submit (Add or Edit)
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const contacts = getStoredContacts();
            const idInput = document.getElementById('contactId').value;
            const name = document.getElementById('contactName').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const category = document.getElementById('contactCategory').value;
            const notes = document.getElementById('contactNotes').value.trim();

            if (isEditing && idInput) {
                // UPDATE existing contact
                const id = parseInt(idInput, 10);
                const index = contacts.findIndex(c => c.id === id);
                if (index !== -1) {
                    contacts[index] = { id, name, phone, email, category, notes };
                    saveContacts(contacts);
                    showToast(`Contact "${name}" updated successfully!`);
                }
                resetForm();
            } else {
                // CREATE new contact
                const newId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
                const newContact = { id: newId, name, phone, email, category, notes };
                contacts.unshift(newContact);
                saveContacts(contacts);
                showToast(`Contact "${name}" added successfully!`);
                contactForm.reset();
            }
        });
    }

    // Cancel edit
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', resetForm);
    }

    // Reset contacts
    if (resetContactsBtn) {
        resetContactsBtn.addEventListener('click', () => {
            if (confirm('Reset contacts directory to default demo list?')) {
                saveContacts(INITIAL_CONTACTS);
                resetForm();
                showToast('Contacts directory reset to initial list.');
            }
        });
    }

    // Modal
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

    renderContacts();
});

function renderContacts() {
    const grid = document.getElementById('contactsGrid');
    const totalBadge = document.getElementById('totalBadge');
    if (!grid) return;

    let contacts = getStoredContacts();

    // Category filter
    if (activeFilter !== 'all') {
        contacts = contacts.filter(c => c.category.toLowerCase() === activeFilter.toLowerCase());
    }

    // Search filter
    if (currentSearch) {
        contacts = contacts.filter(c =>
            c.name.toLowerCase().includes(currentSearch) ||
            c.phone.toLowerCase().includes(currentSearch) ||
            c.email.toLowerCase().includes(currentSearch) ||
            (c.notes && c.notes.toLowerCase().includes(currentSearch))
        );
    }

    if (totalBadge) {
        totalBadge.textContent = `${contacts.length} Contact${contacts.length === 1 ? '' : 's'}`;
    }

    if (contacts.length === 0) {
        grid.innerHTML = `
            <div class="empty-box">
                <i class="fas fa-address-book"></i>
                <h3>No Contacts Found</h3>
                <p>No contact matches your current search or filter criteria.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = contacts.map(c => {
        const initials = getInitials(c.name);
        const catClass = `cat-${(c.category || 'personal').toLowerCase()}`;
        return `
            <div class="contact-card">
                <div>
                    <div class="contact-top">
                        <div class="contact-avatar">${initials}</div>
                        <div class="contact-name-box">
                            <h3>${escapeHtml(c.name)}</h3>
                            <span class="cat-badge ${catClass}">${escapeHtml(c.category || 'General')}</span>
                        </div>
                    </div>

                    <div class="contact-details">
                        <div class="contact-row">
                            <i class="fas fa-phone"></i>
                            <a href="tel:${escapeHtml(c.phone)}">${escapeHtml(c.phone)}</a>
                        </div>
                        <div class="contact-row">
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>
                        </div>
                    </div>

                    ${c.notes ? `<div class="contact-notes"><i class="fas fa-info-circle"></i> ${escapeHtml(c.notes)}</div>` : ''}
                </div>

                <div class="contact-actions">
                    <button class="card-action-btn btn-edit" onclick="startEditContact(${c.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="card-action-btn btn-delete" onclick="deleteContactEntry(${c.id})">
                        <i class="fas fa-trash-alt"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function getInitials(name) {
    if (!name) return 'C';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

window.startEditContact = function(id) {
    const contacts = getStoredContacts();
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    isEditing = true;
    document.getElementById('contactId').value = contact.id;
    document.getElementById('contactName').value = contact.name;
    document.getElementById('contactPhone').value = contact.phone;
    document.getElementById('contactEmail').value = contact.email;
    document.getElementById('contactCategory').value = contact.category || 'Personal';
    document.getElementById('contactNotes').value = contact.notes || '';

    // Switch Form UI
    document.getElementById('formHeading').innerHTML = '<i class="fas fa-edit"></i> Edit Contact';
    const badge = document.getElementById('formModeBadge');
    badge.textContent = `Editing #${contact.id}`;
    badge.className = 'mode-badge edit';

    document.getElementById('saveBtnText').textContent = 'Update Contact';
    document.getElementById('cancelEditBtn').classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('contactName').focus();
};

window.deleteContactEntry = function(id) {
    const contacts = getStoredContacts();
    const contact = contacts.find(c => c.id === id);
    if (!contact) return;

    if (confirm(`Are you sure you want to delete contact "${contact.name}"?`)) {
        const filtered = contacts.filter(c => c.id !== id);
        saveContacts(filtered);
        if (isEditing && document.getElementById('contactId').value == id) {
            resetForm();
        }
        showToast(`Contact "${contact.name}" removed from database.`);
    }
};

function resetForm() {
    isEditing = false;
    const form = document.getElementById('contactForm');
    if (form) form.reset();
    document.getElementById('contactId').value = '';

    document.getElementById('formHeading').innerHTML = '<i class="fas fa-user-plus"></i> Add New Contact';
    const badge = document.getElementById('formModeBadge');
    badge.textContent = 'Create Mode';
    badge.className = 'mode-badge add';

    document.getElementById('saveBtnText').textContent = 'Save Contact';
    document.getElementById('cancelEditBtn').classList.add('hidden');
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
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
