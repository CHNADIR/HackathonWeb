const places = [
  {
    id: 'bu',
    name: 'Bibliotheque universitaire',
    short: 'BU',
    building: 'Batiment BU',
    level: 'Niveau 0',
    distance: '120 m',
    tags: ['accessible', 'ascenseur', 'toilettes', 'rampe'],
    description: 'Entree adaptee, ascenseur, rampe et toilettes PMR.',
    x: 45,
    y: 45,
  },
  {
    id: 'batiment-a',
    name: 'Batiment A',
    short: 'A',
    building: 'Batiment A',
    level: 'Niveau 0',
    distance: '150 m',
    tags: ['accessible', 'ascenseur', 'rampe'],
    description: 'Salles A001 a A094, Amphi 4 et acces par rampe.',
    x: 56,
    y: 64,
  },
  {
    id: 'mde',
    name: 'Maison de l etudiant',
    short: 'MDE',
    building: 'Batiment MDE',
    level: 'Niveau 0',
    distance: '200 m',
    tags: ['accessible', 'accueil', 'rampe'],
    description: 'Vie etudiante, accompagnement et services sociaux.',
    x: 36,
    y: 72,
  },
  {
    id: 'handicap',
    name: 'Service accueil handicap',
    short: 'SAH',
    building: 'Service etudiant',
    level: 'Niveau 0',
    distance: '140 m',
    tags: ['accessible', 'accueil'],
    description: 'Accueil et accompagnement des etudiants en situation de handicap.',
    x: 26,
    y: 50,
  },
  {
    id: 'scolarite',
    name: 'Service de la scolarite',
    short: 'G',
    building: 'Batiment G',
    level: 'Niveau 1',
    distance: '190 m',
    tags: ['accessible', 'ascenseur', 'accueil'],
    description: 'Inscriptions, transferts, diplomes et informations administratives.',
    x: 32,
    y: 58,
  },
  {
    id: 'amphi-x',
    name: 'Amphi X et Amphi Y',
    short: 'X',
    building: 'Batiment J',
    level: 'Niveau 0',
    distance: '280 m',
    tags: ['accessible', 'entree'],
    description: 'Amphitheatres avec entrees adaptees et places PMR.',
    x: 82,
    y: 62,
  },
];

const routeSteps = [
  'Sortir par l entree principale cote Metro M13.',
  'Suivre l allee large vers le batiment A.',
  'Prendre la rampe bleue et eviter les escaliers.',
  'Entrer par la porte accessible indiquee.',
];

let selectedPlace = places[0];
let activeFilter = 'all';
let activeLevel = 'all';

const placeList = document.querySelector('#placeList');
const markerLayer = document.querySelector('#markerLayer');
const searchInput = document.querySelector('#searchInput');
const selectedName = document.querySelector('#selectedName');
const selectedMeta = document.querySelector('#selectedMeta');
const selectedDescription = document.querySelector('#selectedDescription');
const selectedTags = document.querySelector('#selectedTags');
const routeTitle = document.querySelector('#routeTitle');
const routeStepsList = document.querySelector('#routeSteps');
const reportForm = document.querySelector('#reportForm');
const reportMessage = document.querySelector('#reportMessage');
const destinationSelect = document.querySelector('#destinationSelect');
const reportPlace = document.querySelector('#reportPlace');
const profileSummary = document.querySelector('#profileSummary');

function matchesFilters(place) {
  const query = searchInput.value.trim().toLowerCase();
  const content = `${place.name} ${place.building} ${place.level} ${place.tags.join(' ')}`.toLowerCase();
  const matchesSearch = !query || content.includes(query);
  const matchesTags = activeFilter === 'all' || place.tags.includes(activeFilter);
  const matchesLevel = activeLevel === 'all' || place.level === activeLevel;
  return matchesSearch && matchesTags && matchesLevel;
}

function renderPlaces() {
  const visiblePlaces = places.filter(matchesFilters);

  placeList.innerHTML = visiblePlaces.map((place) => `
    <button class="place-card ${place.id === selectedPlace.id ? 'is-selected' : ''}" type="button" data-place="${place.id}">
      <span>${place.short}</span>
      <strong>${place.name}</strong>
      <small>${place.building} - ${place.level} - ${place.distance}</small>
    </button>
  `).join('');

  if (visiblePlaces.length === 0) {
    placeList.innerHTML = '<p class="empty">Aucun lieu trouve.</p>';
  }

  document.querySelectorAll('[data-place]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedPlace = places.find((place) => place.id === button.dataset.place) || places[0];
      renderAll();
    });
  });
}

function renderMarkers() {
  markerLayer.innerHTML = places.filter(matchesFilters).map((place) => `
    <button class="map-marker ${place.id === selectedPlace.id ? 'is-selected' : ''}" type="button" data-place="${place.id}" style="left:${place.x}%;top:${place.y}%">
      ${place.short}
    </button>
  `).join('');

  markerLayer.querySelectorAll('[data-place]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedPlace = places.find((place) => place.id === button.dataset.place) || places[0];
      renderAll();
    });
  });
}

function renderDetails() {
  selectedName.textContent = selectedPlace.name;
  selectedMeta.textContent = `${selectedPlace.building} - ${selectedPlace.level} - ${selectedPlace.distance}`;
  selectedDescription.textContent = selectedPlace.description;
  selectedTags.innerHTML = selectedPlace.tags.map((tag) => `<span>${tag}</span>`).join('');
  routeTitle.textContent = `Itineraire vers ${selectedPlace.name}`;
  routeStepsList.innerHTML = routeSteps.map((step) => `<li>${step}</li>`).join('');
}

function renderAll() {
  renderPlaces();
  renderMarkers();
  renderDetails();
}

function showView(viewName) {
  document.querySelectorAll('.view').forEach((view) => {
    view.classList.toggle('is-active', view.dataset.view === viewName);
  });
  document.querySelectorAll('[data-view-link]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.viewLink === viewName);
  });
}

function syncProfileSummary() {
  const selected = [...document.querySelectorAll('.profile-option input:checked')]
    .map((input) => input.value);
  profileSummary.textContent = selected.length ? selected.join(', ') : 'Aucun profil selectionne';
}

destinationSelect.innerHTML = places
  .map((place) => `<option value="${place.id}">${place.name}</option>`)
  .join('');
reportPlace.innerHTML = destinationSelect.innerHTML;

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => {
      item.classList.toggle('is-active', item.dataset.filter === activeFilter);
    });
    renderAll();
  });
});

document.querySelectorAll('.profile-option input').forEach((input) => {
  input.addEventListener('change', () => {
    input.closest('.profile-option').classList.toggle('is-selected', input.checked);
    syncProfileSummary();
  });
});

document.querySelectorAll('[data-view-link]').forEach((button) => {
  button.addEventListener('click', () => showView(button.dataset.viewLink));
});

document.querySelectorAll('[data-level]').forEach((button) => {
  button.addEventListener('click', () => {
    activeLevel = button.dataset.level;
    document.querySelectorAll('[data-level]').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    renderAll();
  });
});

destinationSelect.addEventListener('change', () => {
  selectedPlace = places.find((place) => place.id === destinationSelect.value) || places[0];
  renderAll();
});

searchInput.addEventListener('input', renderAll);

reportForm.addEventListener('submit', (event) => {
  event.preventDefault();
  reportMessage.textContent = 'Signalement envoye. BlueAccess proposera un autre trajet si necessaire.';
  reportForm.reset();
});

syncProfileSummary();
renderAll();
