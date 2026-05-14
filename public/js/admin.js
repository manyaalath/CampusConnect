/**
 * CampusConnect – admin.js
 * Handles Add New Member form: validation, submission, discard, and hamburger nav.
 */

'use strict';

// ──────────────────────────────────────────
// DOM REFS
// ──────────────────────────────────────────
const form        = document.getElementById('add-member-form');
const btnDiscard  = document.getElementById('btn-discard');
const successModal = document.getElementById('success-modal');
const modalBody   = document.getElementById('modal-body');
const modalClose  = document.getElementById('modal-close');
const toast       = document.getElementById('admin-toast');
const hamburger   = document.getElementById('hamburger');
const navLinks    = document.querySelector('.nav-links');

// Field references
const fields = {
  name:       document.getElementById('field-name'),
  email:      document.getElementById('field-email'),
  role:       document.getElementById('field-role'),
  department: document.getElementById('field-department'),
  batch:      document.getElementById('field-batch'),
  skills:     document.getElementById('field-skills'),
};

const errors = {
  name:       document.getElementById('error-name'),
  email:      document.getElementById('error-email'),
  role:       document.getElementById('error-role'),
  department: document.getElementById('error-department'),
};

// ──────────────────────────────────────────
// VALIDATION
// ──────────────────────────────────────────
const validators = {
  name:       v => v.trim().length >= 2 ? '' : 'Please enter a full name (at least 2 characters).',
  email:      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid campus email address.',
  role:       v => v ? '' : 'Please select an institutional role.',
  department: v => v.trim().length >= 2 ? '' : 'Please enter the academic department.',
};

function validateField(key) {
  if (!validators[key]) return true;
  const msg = validators[key](fields[key].value);
  if (errors[key]) {
    errors[key].textContent = msg;
    fields[key].classList.toggle('input-error', !!msg);
  }
  return !msg;
}

function validateAll() {
  return ['name', 'email', 'role', 'department'].map(validateField).every(Boolean);
}

// Live validation on blur
Object.keys(validators).forEach(key => {
  fields[key].addEventListener('blur', () => validateField(key));
  fields[key].addEventListener('input', () => {
    if (fields[key].classList.contains('input-error')) validateField(key);
  });
});

// ──────────────────────────────────────────
// SUBMIT
// ──────────────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!validateAll()) return;

  const name       = fields.name.value.trim();
  const email      = fields.email.value.trim();
  const roleValue  = fields.role.value;
  const department = fields.department.value.trim();
  const batch      = fields.batch.value.trim();
  const skillsRaw  = fields.skills.value.trim();

  // Simulate registration
  const roleLabel = roleValue === 'FACULTY' ? 'Faculty' : 'Student';
  const skillsArr = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

  const summaryLines = [
    `<strong>${name}</strong> has been registered as a <strong>${roleLabel}</strong>.`,
    department ? `Department: ${department}` : '',
    batch      ? `Batch: ${batch}` : '',
    skillsArr.length ? `Skills: ${skillsArr.join(', ')}` : '',
    `Email: <a href="mailto:${email}" style="color:var(--primary)">${email}</a>`,
  ].filter(Boolean).join('<br/>');

  modalBody.innerHTML = summaryLines;
  successModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

// ──────────────────────────────────────────
// DISCARD
// ──────────────────────────────────────────
btnDiscard.addEventListener('click', () => {
  form.reset();

  // Clear errors
  Object.keys(errors).forEach(key => {
    if (errors[key]) errors[key].textContent = '';
    if (fields[key]) fields[key].classList.remove('input-error');
  });

  showToast('Form cleared.');
});

// ──────────────────────────────────────────
// MODAL CLOSE
// ──────────────────────────────────────────
modalClose.addEventListener('click', closeModal);
successModal.addEventListener('click', (e) => {
  if (e.target === successModal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !successModal.classList.contains('hidden')) closeModal();
});

function closeModal() {
  successModal.classList.add('hidden');
  document.body.style.overflow = '';
  form.reset();
  Object.keys(errors).forEach(key => {
    if (errors[key]) errors[key].textContent = '';
    if (fields[key]) fields[key].classList.remove('input-error');
  });
}

// ──────────────────────────────────────────
// TOAST
// ──────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ──────────────────────────────────────────
// HAMBURGER
// ──────────────────────────────────────────
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}
