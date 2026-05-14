/**
 * CampusConnect – main.js
 * Directory page logic: data, rendering, search, filter, pagination
 */

'use strict';

// ──────────────────────────────────────────
// DATA
// ──────────────────────────────────────────
const profiles = [
  {
    id: 1,
    name: 'Dr. Sarah Malik',
    role: 'FACULTY',
    department: 'Computer Science',
    meta: 'Research Lead • Senior Professor',
    batch: null,
    skills: ['Python', 'AI', 'NLP'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: 2,
    name: 'Manav Dahiya',
    role: 'STUDENT',
    department: 'Mechanical Engineering',
    meta: 'Batch of 2024 • Robotics Club',
    batch: '2024',
    skills: ['CAD', 'Robotics', 'MATLAB'],
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    id: 3,
    name: 'Aisha Gupta',
    role: 'STUDENT',
    department: 'Digital Arts',
    meta: 'Batch of 2025 • Design Lead',
    batch: '2025',
    skills: ['UI/UX', 'Figma', 'Procreate'],
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80',
  },
  {
    id: 4,
    name: 'Dr. James Wil',
    role: 'FACULTY',
    department: 'Physics',
    meta: 'Quantum Lab • Faculty Advisor',
    batch: null,
    skills: ['Quantum', 'Optics', 'LaTeX'],
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?w=400&q=80',
  },
  {
    id: 5,
    name: 'Era Khan',
    role: 'STUDENT',
    department: 'Business Administration',
    meta: 'Batch of 2023 • Alumna',
    batch: '2023',
    skills: ['Marketing', 'Strategy', 'Data'],
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
  },
  {
    id: 6,
    name: 'Kevin Joseph',
    role: 'STUDENT',
    department: 'Data Science',
    meta: 'Batch of 2026 • AI Ethics Club',
    batch: '2026',
    skills: ['SQL', 'Tableau', 'Statistics'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: 7,
    name: 'Soniya Sharma',
    role: 'STUDENT',
    department: 'Psychology',
    meta: 'Batch of 2024 • Peer Counselor',
    batch: '2024',
    skills: ['Clinical', 'Counselling', 'Research'],
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=400&q=80',
  },
  {
    id: 8,
    name: 'Dhruv Kumar',
    role: 'FACULTY',
    department: 'Electrical Engineering',
    meta: 'Circuits Lab • Lead Researcher',
    batch: null,
    skills: ['Circuits', 'Power', 'Embedded'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    id: 9,
    name: 'Priya Sharma',
    role: 'STUDENT',
    department: 'Computer Science',
    meta: 'Batch of 2025 • Dev Club Lead',
    batch: '2025',
    skills: ['React', 'Node.js', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
  },
  {
    id: 10,
    name: 'Prof. Aman Sahni',
    role: 'FACULTY',
    department: 'Mechanical Engineering',
    meta: 'Thermal Lab • Dept. Head',
    batch: null,
    skills: ['Thermodynamics', 'FEA', 'SolidWorks'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  },
  {
    id: 11,
    name: 'Zara Ahmed',
    role: 'STUDENT',
    department: 'Digital Arts',
    meta: 'Batch of 2026 • Illustration Club',
    batch: '2026',
    skills: ['Illustration', 'Animation', 'Blender'],
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&q=80',
  },
  {
    id: 12,
    name: 'Dr. Nina Patel',
    role: 'FACULTY',
    department: 'Psychology',
    meta: 'Cognitive Lab • Associate Prof.',
    batch: null,
    skills: ['Cognitive', 'Research', 'Statistics'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  },
];

// ──────────────────────────────────────────
// STATE
// ──────────────────────────────────────────
const CARDS_PER_PAGE = 8;

const state = {
  query: '',
  department: 'all',
  role: 'all',
  batch: 'all',
  page: 1,
};

// ──────────────────────────────────────────
// DOM REFS
// ──────────────────────────────────────────
const searchInput = document.getElementById('search-input');
const profileGrid = document.getElementById('profile-grid');
const emptyState = document.getElementById('empty-state');
const clearFiltersBtn = document.getElementById('clear-filters');
const prevBtn = document.getElementById('prev-page');
const nextBtn = document.getElementById('next-page');
const pageNumbersEl = document.getElementById('page-numbers');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

// Filter buttons & dropdowns
const filterConfigs = [
  { btnId: 'filter-dept', dropId: 'dropdown-dept', stateKey: 'department' },
  { btnId: 'filter-role', dropId: 'dropdown-role', stateKey: 'role' },
  { btnId: 'filter-batch', dropId: 'dropdown-batch', stateKey: 'batch' },
];

// ──────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────
function createCard(p) {
  const card = document.createElement('article');
  card.className = 'profile-card';
  card.setAttribute('role', 'listitem');

  const badgeClass = p.role === 'FACULTY' ? 'role-badge--faculty' : 'role-badge--student';
  const badgeLabel = p.role.charAt(0) + p.role.slice(1).toLowerCase();

  const skillsHTML = p.skills
    .map(s => `<span class="skill-tag">${s}</span>`)
    .join('');

  card.innerHTML = `
    <div class="card-image-wrapper">
      <img src="${p.image}" alt="Photo of ${p.name}" loading="lazy" />
      <span class="role-badge ${badgeClass}">${badgeLabel}</span>
    </div>
    <div class="card-body">
      <h2 class="card-name">${p.name}</h2>
      <p class="card-dept">${p.department}</p>
      <p class="card-meta">${p.meta}</p>
      <div class="card-skills" aria-label="Skills: ${p.skills.join(', ')}">${skillsHTML}</div>
      <a href="profile.html?id=${p.id}" class="btn-view-profile" aria-label="View profile of ${p.name}">View Profile</a>
    </div>
  `;
  return card;
}

function getFiltered() {
  const q = state.query.toLowerCase().trim();
  return profiles.filter(p => {
    const matchQuery =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q) ||
      p.skills.some(s => s.toLowerCase().includes(q));

    const matchDept = state.department === 'all' || p.department === state.department;
    const matchRole = state.role === 'all' || p.role === state.role;
    const matchBatch = state.batch === 'all' ||
      (p.batch && p.batch === state.batch);

    return matchQuery && matchDept && matchRole && matchBatch;
  });
}

function getTotalPages(filtered) {
  return Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));
}

// ──────────────────────────────────────────
// RENDER
// ──────────────────────────────────────────
function render() {
  const filtered = getFiltered();
  const totalPages = getTotalPages(filtered);

  // Clamp page
  if (state.page > totalPages) state.page = totalPages;
  if (state.page < 1) state.page = 1;

  const start = (state.page - 1) * CARDS_PER_PAGE;
  const slice = filtered.slice(start, start + CARDS_PER_PAGE);

  // Grid
  profileGrid.innerHTML = '';
  if (slice.length === 0) {
    emptyState.classList.remove('hidden');
    profileGrid.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    profileGrid.classList.remove('hidden');
    slice.forEach(p => profileGrid.appendChild(createCard(p)));
  }

  // Pagination
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  prevBtn.disabled = state.page <= 1;
  nextBtn.disabled = state.page >= totalPages;

  pageNumbersEl.innerHTML = '';

  // Always show: 1, current±1, last, with ellipsis
  const pages = buildPageList(state.page, totalPages);

  pages.forEach(item => {
    if (item === '…') {
      const el = document.createElement('span');
      el.className = 'page-ellipsis';
      el.textContent = '…';
      el.setAttribute('aria-hidden', 'true');
      pageNumbersEl.appendChild(el);
    } else {
      const btn = document.createElement('button');
      btn.className = 'page-btn' + (item === state.page ? ' active' : '');
      btn.textContent = item;
      btn.setAttribute('aria-label', `Page ${item}`);
      if (item === state.page) btn.setAttribute('aria-current', 'page');
      btn.addEventListener('click', () => {
        state.page = item;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      pageNumbersEl.appendChild(btn);
    }
  });
}

function buildPageList(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total]);
  for (let i = current - 1; i <= current + 1; i++) {
    if (i >= 1 && i <= total) pages.add(i);
  }
  const sorted = [...pages].sort((a, b) => a - b);

  const result = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) result.push('…');
    result.push(p);
    prev = p;
  }
  return result;
}

// ──────────────────────────────────────────
// EVENTS – Search
// ──────────────────────────────────────────
searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  state.page = 1;
  render();
});

// ──────────────────────────────────────────
// EVENTS – Filters (dropdowns)
// ──────────────────────────────────────────
filterConfigs.forEach(({ btnId, dropId, stateKey }) => {
  const btn = document.getElementById(btnId);
  const drop = document.getElementById(dropId);

  // Toggle open
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drop.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
      drop.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  // Select item
  drop.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', () => {
      const val = li.dataset.value;
      state[stateKey] = val;
      state.page = 1;

      // Update active
      drop.querySelectorAll('li').forEach(l => l.classList.remove('active'));
      li.classList.add('active');

      // Update button label
      const label = val === 'all'
        ? btn.textContent.replace(/[^\w\s]/g, '').trim().split(' ')[0]
        : li.textContent;

      // Reset button label to base name + chevron
      const baseName = { 'filter-dept': 'Department', 'filter-role': 'Role', 'filter-batch': 'Batch' }[btnId];
      const chevron = btn.querySelector('svg').outerHTML;
      btn.innerHTML = (val === 'all' ? baseName : li.textContent) + ' ' + chevron;
      btn.classList.toggle('active-filter', val !== 'all');

      closeAllDropdowns();
      render();
    });
  });
});

function closeAllDropdowns() {
  filterConfigs.forEach(({ btnId, dropId }) => {
    document.getElementById(dropId).classList.remove('open');
    const b = document.getElementById(btnId);
    b.classList.remove('open');
    b.setAttribute('aria-expanded', 'false');
  });
}

// Close dropdowns on outside click
document.addEventListener('click', closeAllDropdowns);

// ──────────────────────────────────────────
// EVENTS – Clear filters
// ──────────────────────────────────────────
clearFiltersBtn.addEventListener('click', () => {
  state.query = '';
  state.department = 'all';
  state.role = 'all';
  state.batch = 'all';
  state.page = 1;
  searchInput.value = '';

  // Reset all dropdowns to first item
  filterConfigs.forEach(({ btnId, dropId }) => {
    const drop = document.getElementById(dropId);
    const firstLi = drop.querySelector('li');
    drop.querySelectorAll('li').forEach(l => l.classList.remove('active'));
    firstLi.classList.add('active');

    const btn = document.getElementById(btnId);
    const baseName = { 'filter-dept': 'Department', 'filter-role': 'Role', 'filter-batch': 'Batch' }[btnId];
    const chevron = btn.querySelector('svg').outerHTML;
    btn.innerHTML = baseName + ' ' + chevron;
    btn.classList.remove('active-filter');
  });

  render();
});

// ──────────────────────────────────────────
// EVENTS – Pagination arrows
// ──────────────────────────────────────────
prevBtn.addEventListener('click', () => {
  if (state.page > 1) {
    state.page--;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

nextBtn.addEventListener('click', () => {
  const total = getTotalPages(getFiltered());
  if (state.page < total) {
    state.page++;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// ──────────────────────────────────────────
// EVENTS – Hamburger menu
// ──────────────────────────────────────────
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

// ──────────────────────────────────────────
// INIT
// ──────────────────────────────────────────
render();
