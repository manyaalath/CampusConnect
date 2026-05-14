/**
 * CampusConnect – profile.js
 * Loads and renders a profile page from the shared `profiles` data in main.js.
 * Reads ?id= from the URL query string to pick the right profile.
 */

'use strict';

// ──────────────────────────────────────────
// EXTENDED PROFILE DATA
// Merges with the base `profiles` array from main.js
// ──────────────────────────────────────────
const profileExtras = {
  1: { school: 'School of Engineering', roll: 'CS2024001', email: 'sarah.malik@campus.edu', badges: ['Research Lead', "Dean's List"], interests: ['Machine Learning', 'Academic Research', 'Open Source', 'Mentoring'] },
  2: { school: 'School of Engineering', roll: 'ME2024035', email: 'manav.d@campus.edu', badges: ['Robotics Club', 'Active Member'], interests: ['Robotics', 'Photography', 'Inter-college Basketball', '3D Printing'] },
  3: { school: 'School of Design', roll: 'DA2025018', email: 'aisha.g@campus.edu', badges: ['Design Lead', 'Active Contributor'], interests: ['Illustration', 'Photography', 'Open Source', 'Typography'] },
  4: { school: 'School of Sciences', roll: 'PH2020004', email: 'james.wil@campus.edu', badges: ['Faculty Advisor', "Dean's List"], interests: ['Quantum Computing', 'Academic Research', 'Astrophysics', 'Open Source'] },
  5: { school: 'School of Business', roll: 'BA2023042', email: 'era@campus.edu', badges: ['Alumna', 'Active Contributor'], interests: ['Marketing Strategy', 'Entrepreneurship', 'Open Source', 'Photography'] },
  6: { school: 'School of Computing', roll: 'DS2026007', email: 'kevin@campus.edu', badges: ['AI Ethics Club', 'Active Member'], interests: ['Machine Learning', 'Open Source', 'Inter-college Basketball', 'Photography'] },
  7: { school: 'School of Social Sciences', roll: 'PS2024029', email: 's.sharma@campus.edu', badges: ['Peer Counselor', 'Active Contributor'], interests: ['Mental Health Advocacy', 'Photography', 'Yoga', 'Open Source'] },
  8: { school: 'School of Engineering', roll: 'EE2018003', email: 'd.kumar@campus.edu', badges: ['Lead Researcher', "Dean's List"], interests: ['IoT Systems', 'Academic Research', 'Football', 'Open Source'] },
  9: { school: 'School of Computing', roll: 'CS2025011', email: 'priya.s@campus.edu', badges: ['Dev Club Lead', 'Active Contributor'], interests: ['Web Development', 'Open Source', 'Machine Learning', 'Photography'] },
  10: { school: 'School of Engineering', roll: 'ME2010002', email: 'prof.aman@campus.edu', badges: ['Dept. Head', "Dean's List"], interests: ['Thermal Engineering', 'Academic Research', 'Mentoring', 'Open Source'] },
  11: { school: 'School of Design', roll: 'DA2026033', email: 'zara.a@campus.edu', badges: ['Illustration Club', 'Active Member'], interests: ['2D Animation', 'Photography', 'Open Source', 'Sculpture'] },
  12: { school: 'School of Social Sciences', roll: 'PS2015001', email: 'nina.p@campus.edu', badges: ['Associate Prof.', "Dean's List"], interests: ['Cognitive Science', 'Academic Research', 'Mindfulness', 'Open Source'] },
};

// Interest icon map
const interestIcons = {
  'Machine Learning': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  'Photography': '<svg viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><circle cx="10" cy="11" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M7 5l1-2h4l1 2" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  'Inter-college Basketball': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M10 2v16M2 10h16M5 4.5C7 7 7 13 5 15.5M15 4.5C13 7 13 13 15 15.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
  'Open Source': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M10 5v5l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'Academic Research': '<svg viewBox="0 0 20 20" fill="none"><path d="M4 4h12v12H4z" rx="2" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 8h4M8 12h2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  'Robotics': '<svg viewBox="0 0 20 20" fill="none"><rect x="6" y="7" width="8" height="8" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M10 7V4M8 4h4M7 11h.01M13 11h.01" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  '3D Printing': '<svg viewBox="0 0 20 20" fill="none"><path d="M10 3l7 4v6l-7 4-7-4V7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M10 3v14M3 7l7 4 7-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  'Illustration': '<svg viewBox="0 0 20 20" fill="none"><path d="M4 16l3-1 9-9-2-2-9 9-1 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13 5l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  'Typography': '<svg viewBox="0 0 20 20" fill="none"><path d="M4 5h12M10 5v11M7 16h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'Web Development': '<svg viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M7 9l-2 2 2 2M13 9l2 2-2 2M11 8l-2 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'Entrepreneurship': '<svg viewBox="0 0 20 20" fill="none"><path d="M10 3l2 4h4l-3.3 2.4 1.3 4L10 11l-4 2.4 1.3-4L4 7h4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  'Mental Health Advocacy': '<svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 17s-7-4.35-7-9a4 4 0 018 0 4 4 0 018 0c0 4.65-7 9-7 9z"/></svg>',
  'Yoga': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="5" r="2" stroke="currentColor" stroke-width="1.6"/><path d="M10 7v6M7 10l-3 3M13 10l3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  'Mindfulness': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.6"/><path d="M10 7v3l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'IoT Systems': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M5.2 5.2a7 7 0 009.6 0M5.2 14.8a7 7 0 009.6 0M2 10h2m12 0h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  'Football': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M10 6l2 4-2 4M10 6L8 10l2 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>',
  'Quantum Computing': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.6"/><ellipse cx="10" cy="10" rx="8" ry="4" stroke="currentColor" stroke-width="1.4"/><ellipse cx="10" cy="10" rx="8" ry="4" stroke="currentColor" stroke-width="1.4" transform="rotate(60 10 10)"/><ellipse cx="10" cy="10" rx="8" ry="4" stroke="currentColor" stroke-width="1.4" transform="rotate(120 10 10)"/></svg>',
  'Astrophysics': '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M14.4 5.6l-1.4 1.4M5.6 14.4l-1.4 1.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  'Marketing Strategy': '<svg viewBox="0 0 20 20" fill="none"><path d="M3 17l4-8 4 4 3-6 3 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '2D Animation': '<svg viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 8l5 2-5 2V8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  'Sculpture': '<svg viewBox="0 0 20 20" fill="none"><path d="M10 3c-3 0-6 3-6 7 0 2 1 4 3 5h6c2-1 3-3 3-5 0-4-3-7-6-7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  'Cognitive Science': '<svg viewBox="0 0 20 20" fill="none"><path d="M10 3C7 3 5 5 5 8c0 1 .5 2 1 2.5V14h8v-3.5C14.5 10 15 9 15 8c0-3-2-5-5-5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8 14v2h4v-2" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  'Thermal Engineering': '<svg viewBox="0 0 20 20" fill="none"><path d="M10 3v10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="10" cy="15" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M13 6h2M13 9h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  'Mentoring': '<svg viewBox="0 0 20 20" fill="none"><circle cx="8" cy="7" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M2 17c0-3 2.7-5 6-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14 11l2 2 3-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

const DEFAULT_ICON = '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M10 6v4l2 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// ──────────────────────────────────────────
// INIT
// ──────────────────────────────────────────
(function init() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'), 10);

  // Get base profile from main.js `profiles` array
  const base = (typeof profiles !== 'undefined') ? profiles.find(p => p.id === id) : null;
  const extra = profileExtras[id];

  if (!base || !extra) {
    showState('not-found');
    return;
  }

  renderProfile(base, extra);
  setupShareButton(base);
  setupHamburger();
})();

// ──────────────────────────────────────────
// RENDER
// ──────────────────────────────────────────
function renderProfile(base, extra) {
  showState('content');

  // Navbar avatar
  const navImg = document.getElementById('nav-avatar-img');
  navImg.src = base.image;
  navImg.alt = base.name;

  // Avatar
  const avatarEl = document.getElementById('profile-avatar');
  avatarEl.src = base.image;
  avatarEl.alt = `Photo of ${base.name}`;

  // Name
  document.getElementById('profile-name').textContent = base.name;

  // Role | Dept
  const roleLabel = base.role.charAt(0) + base.role.slice(1).toLowerCase();
  document.getElementById('profile-role-dept').textContent = `${roleLabel} | ${base.department}`;

  // Batch
  const batchText = base.batch ? `Batch of ${base.batch}` : extra.school;
  document.getElementById('profile-batch').textContent = batchText;

  // Badges
  const badgesEl = document.getElementById('profile-badges');
  extra.badges.forEach(b => {
    const span = document.createElement('span');
    span.className = 'profile-badge';
    span.textContent = b;
    badgesEl.appendChild(span);
  });

  // Academic Details
  document.getElementById('acad-department').textContent = extra.school;
  document.getElementById('acad-roll').textContent = extra.roll;
  const emailEl = document.getElementById('acad-email');
  emailEl.textContent = extra.email;
  emailEl.href = `mailto:${extra.email}`;

  // Skills
  const skillsEl = document.getElementById('skills-tags');
  base.skills.forEach(s => {
    const span = document.createElement('span');
    span.className = 'skill-pill';
    span.textContent = s;
    skillsEl.appendChild(span);
  });

  // Interests
  const interestsEl = document.getElementById('interests-grid');
  extra.interests.forEach(interest => {
    const icon = interestIcons[interest] || DEFAULT_ICON;
    const div = document.createElement('div');
    div.className = 'interest-item';
    div.innerHTML = `
      <span class="interest-icon" aria-hidden="true">${icon}</span>
      <span>${interest}</span>
    `;
    interestsEl.appendChild(div);
  });

  // Page title
  document.title = `${base.name} – CampusConnect`;
}

// ──────────────────────────────────────────
// SHARE BUTTON
// ──────────────────────────────────────────
function setupShareButton(base) {
  const shareBtn = document.getElementById('btn-share');
  const toast = document.getElementById('share-toast');

  shareBtn.addEventListener('click', async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${base.name} – CampusConnect`, url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast(toast);
      }
    } catch {
      // fallback
      try { await navigator.clipboard.writeText(url); showToast(toast); } catch { }
    }
  });
}

function showToast(toastEl) {
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 2500);
}

// ──────────────────────────────────────────
// HAMBURGER (mobile nav)
// ──────────────────────────────────────────
function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (!hamburger || !navLinks) return;

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

// ──────────────────────────────────────────
// STATE HELPERS
// ──────────────────────────────────────────
function showState(which) {
  document.getElementById('profile-loading').classList.add('hidden');
  document.getElementById('profile-not-found').classList.add('hidden');
  document.getElementById('profile-content').classList.add('hidden');

  const map = {
    'loading': 'profile-loading',
    'not-found': 'profile-not-found',
    'content': 'profile-content',
  };
  document.getElementById(map[which]).classList.remove('hidden');
}
