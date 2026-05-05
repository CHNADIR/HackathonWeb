const appState = {
  currentScreen: 'home',
  selectedProfiles: new Set(['mobilite']),
  activeFilters: new Set(['accessible', 'ascenseur', 'toilettes']),
  selectedPlaceId: 'bu',
  currentLevel: 'Niveau 0',
  offline: false,
  simpleMode: false,
  highContrast: false,
};

const places = [
  {
    id: 'entree-universite',
    name: 'Entree universite - Metro M13',
    building: 'Acces principal',
    distance: '0 m',
    level: 'Niveau 0',
    type: 'Acces campus',
    rooms: 'Metro Saint-Denis Universite, bus 11, 154, 253, 255, 256, 268, 356, 361',
    description: 'Point de depart principal depuis le metro M13 Saint-Denis Universite et les arrets de bus.',
    features: ['Entree adaptee', 'Chemin large', 'Point de depart'],
    tags: ['accessible', 'entree', 'accueil'],
    status: 'Ouvert',
    x: 12,
    y: 82,
  },
  {
    id: 'bu',
    name: 'Bibliotheque universitaire',
    building: 'Batiment A',
    distance: '120 m',
    level: 'Niveau 0',
    type: 'Bibliotheque',
    rooms: 'BU',
    description: 'Bibliotheque universitaire indiquee sur le plan au niveau 0, proche des batiments A et B.',
    features: ['Entree adaptee', 'Ascenseur', 'Toilettes PMR', 'Espace de travail'],
    tags: ['accessible', 'ascenseur', 'toilettes', 'entree'],
    status: 'Ouvert',
    x: 44,
    y: 43,
  },
  {
    id: 'batiment-a',
    name: 'Batiment A',
    building: 'Batiment A',
    distance: '150 m',
    level: 'Niveau 0',
    type: 'Salles et amphitheatres',
    rooms: 'A001-A010, A013, A026-A037, A041-A053, A061-A090, A093, A094, Amphi 4',
    description: 'Grand batiment de cours. Le plan indique les salles A001 a A094 au niveau 0 et les amphitheatres proches.',
    features: ['Entree adaptee', 'Rampe', 'Ascenseur', 'Salles de cours'],
    tags: ['accessible', 'rampe', 'ascenseur', 'entree'],
    status: 'Ouvert',
    x: 55,
    y: 61,
  },
  {
    id: 'batiment-a-n1',
    name: 'Batiment A - Niveau 1',
    building: 'Batiment A',
    distance: '170 m',
    level: 'Niveau 1',
    type: 'Salles de cours',
    rooms: 'A100-A105, A111-A122, A126-A154, A160-A193, Amphi 1, Amphi 2, Amphi 3',
    description: 'Niveau 1 du batiment A avec salles A100 a A193 et amphitheatres 1, 2 et 3.',
    features: ['Ascenseur', 'Salles de cours', 'Amphitheatres'],
    tags: ['accessible', 'ascenseur'],
    status: 'Ouvert',
    x: 56,
    y: 56,
  },
  {
    id: 'batiment-b1',
    name: 'Batiment B1',
    building: 'Batiment B1',
    distance: '190 m',
    level: 'Niveau 0',
    type: 'Salles et amphitheatre',
    rooms: 'B001-B007, Amphi B1',
    description: 'Batiment B1 du plan niveau 0 avec salles B001 a B007 et Amphi B1.',
    features: ['Entree adaptee', 'Ascenseur', 'Amphi'],
    tags: ['accessible', 'ascenseur', 'entree'],
    status: 'Ouvert',
    x: 63,
    y: 73,
  },
  {
    id: 'batiment-b2',
    name: 'Batiment B2',
    building: 'Batiment B2',
    distance: '210 m',
    level: 'Niveau 0',
    type: 'Salles et amphitheatre',
    rooms: 'B030-B039, Amphi B2',
    description: 'Batiment B2 du plan niveau 0 avec salles B030 a B039 et Amphi B2.',
    features: ['Entree adaptee', 'Ascenseur', 'Amphi'],
    tags: ['accessible', 'ascenseur', 'entree'],
    status: 'Ouvert',
    x: 58,
    y: 29,
  },
  {
    id: 'batiment-c',
    name: 'Batiment C',
    building: 'Batiment C',
    distance: '230 m',
    level: 'Niveau 0',
    type: 'Salles de cours',
    rooms: 'C001-C007, C008-C012, C021-C031, Coupole',
    description: 'Batiment C au niveau 0 avec salles C001 a C031 et la Coupole.',
    features: ['Entree adaptee', 'Signaletique claire'],
    tags: ['accessible', 'entree'],
    status: 'Ouvert',
    x: 76,
    y: 42,
  },
  {
    id: 'batiment-d',
    name: 'Batiment D',
    building: 'Batiment D',
    distance: '260 m',
    level: 'Niveau 0',
    type: 'Salles et services',
    rooms: 'D001, D006, D011',
    description: 'Batiment D visible sur les niveaux 0 a 3, avec salles D001, D006 et D011 au niveau 0.',
    features: ['Entree adaptee', 'Ascenseur'],
    tags: ['accessible', 'ascenseur', 'entree'],
    status: 'Ouvert',
    x: 79,
    y: 24,
  },
  {
    id: 'batiment-g',
    name: 'Batiment G',
    building: 'Batiment G',
    distance: '160 m',
    level: 'Niveau 0',
    type: 'Services et salles',
    rooms: 'G014, G015',
    description: 'Batiment G indique sur le plan niveau 0, proche des services et de la zone centrale.',
    features: ['Accueil accessible', 'Rampe', 'Services'],
    tags: ['accessible', 'rampe', 'accueil'],
    status: 'Ouvert',
    x: 32,
    y: 58,
  },
  {
    id: 'mde',
    name: 'Maison de l etudiant',
    building: 'Batiment MDE',
    distance: '200 m',
    level: 'Niveau 0',
    type: 'Vie etudiante',
    rooms: 'MDE, services vie etudiante',
    description: 'Maison de l etudiant presente sur le plan, avec services de vie etudiante et accompagnement.',
    features: ['Accueil accessible', 'Rampe', 'Service social'],
    tags: ['accessible', 'rampe', 'accueil'],
    status: 'Ouvert',
    x: 44,
    y: 76,
  },
  {
    id: 'crous',
    name: 'CROUS',
    building: 'Batiment CROUS',
    distance: '250 m',
    level: 'Niveau 0',
    type: 'Service etudiant',
    rooms: 'CROUS',
    description: 'Service social et restauration etudiante localises dans la zone CROUS du plan.',
    features: ['Accueil accessible', 'Service social', 'Restauration'],
    tags: ['accessible', 'accueil'],
    status: 'Ouvert',
    x: 72,
    y: 76,
  },
  {
    id: 'amphi-x-y',
    name: 'Amphi X et Amphi Y',
    building: 'Batiment J',
    distance: '280 m',
    level: 'Niveau 0',
    type: 'Amphitheatres',
    rooms: 'Amphi X, Amphi Y',
    description: 'Amphis X et Y situes dans la zone du batiment J selon le plan niveau 0.',
    features: ['Places PMR', 'Entree adaptee'],
    tags: ['accessible', 'entree'],
    status: 'Ouvert',
    x: 86,
    y: 63,
  },
  {
    id: 'point-info',
    name: 'Point accueil information',
    building: 'Service etudiant',
    distance: '110 m',
    level: 'Niveau 0',
    type: 'Accueil',
    rooms: 'Point accueil information',
    description: 'Point d information utile aux etudiants, reference dans la liste des services du plan.',
    features: ['Accueil accessible', 'Information', 'Orientation'],
    tags: ['accessible', 'accueil'],
    status: 'Ouvert',
    x: 21,
    y: 49,
  },
  {
    id: 'accueil-handicap',
    name: 'Service accueil handicap',
    building: 'Service etudiant',
    distance: '140 m',
    level: 'Niveau 0',
    type: 'Accessibilite',
    rooms: 'Accueil handicap',
    description: 'Service d accueil handicap mentionne dans les services utiles aux etudiants du plan.',
    features: ['Accueil accessible', 'Accompagnement', 'Information handicap'],
    tags: ['accessible', 'accueil'],
    status: 'Ouvert',
    x: 28,
    y: 45,
  },
  {
    id: 'scolarite',
    name: 'Service de la scolarite',
    building: 'Batiment G',
    distance: '190 m',
    level: 'Niveau 1',
    type: 'Administration',
    rooms: 'G114, G115, G116, G116 bis, G117',
    description: 'Service de la scolarite et inscriptions, indique sur le plan autour des salles G114 a G117.',
    features: ['Accueil accessible', 'Ascenseur', 'File prioritaire'],
    tags: ['accessible', 'ascenseur', 'accueil'],
    status: 'Ouvert',
    x: 34,
    y: 53,
  },
  {
    id: 'ufr-mitsic',
    name: 'UFR MITSIC - Informatique',
    building: 'Batiment A',
    distance: '210 m',
    level: 'Niveau 1',
    type: 'Departement',
    rooms: 'A150, A168, A170, A181, A183',
    description: 'Secteur informatique et mathematiques reference dans la liste des secretariats pedagogiques.',
    features: ['Ascenseur', 'Salles de cours', 'Secretariat'],
    tags: ['accessible', 'ascenseur'],
    status: 'Ouvert',
    x: 59,
    y: 50,
  },
  {
    id: 'ufr-arts',
    name: 'UFR Arts',
    building: 'Batiment A',
    distance: '240 m',
    level: 'Niveau 0',
    type: 'Departement',
    rooms: 'A029, A030, A031, A065, A069, A079, A080',
    description: 'UFR Arts et formations cinema, theatre, danse, musique et arts plastiques.',
    features: ['Entree adaptee', 'Ascenseur', 'Secretariat'],
    tags: ['accessible', 'ascenseur', 'entree'],
    status: 'Ouvert',
    x: 54,
    y: 67,
  },
  {
    id: 'toilettes-pmr-a',
    name: 'Toilettes PMR - Batiment A',
    building: 'Batiment A',
    distance: '130 m',
    level: 'Niveau 0',
    type: 'Sanitaires',
    rooms: 'Zone A niveau 0',
    description: 'Point sanitaire accessible a prioriser dans les trajets vers la BU et le batiment A.',
    features: ['Toilettes PMR', 'Accessible fauteuil'],
    tags: ['accessible', 'toilettes'],
    status: 'Ouvert',
    x: 50,
    y: 54,
  },
];

const routeSteps = [
  {
    icon: '01',
    title: 'Sortir par l entree principale',
    detail: 'Restez sur le chemin large devant le hall.',
    profiles: ['mobilite', 'visuel', 'cognitif'],
  },
  {
    icon: '02',
    title: 'Suivre la rampe bleue',
    detail: 'Avancez tout droit pendant 45 metres. La pente est douce.',
    profiles: ['mobilite', 'visuel', 'cognitif'],
  },
  {
    icon: '03',
    title: 'Tourner a gauche vers le batiment A',
    detail: 'Repere visuel: grande facade vitree de la bibliotheque.',
    profiles: ['auditif', 'cognitif'],
  },
  {
    icon: '04',
    title: 'Entrer par la porte automatique',
    detail: 'La porte accessible est sur votre droite. Vous etes arrive.',
    profiles: ['mobilite', 'visuel', 'auditif', 'cognitif'],
  },
];

const profileLabels = {
  mobilite: 'Mobilite reduite',
  visuel: 'Deficience visuelle',
  auditif: 'Deficience auditive',
  cognitif: 'Troubles cognitifs',
};

const filterLabels = {
  accessible: 'Accessible',
  rampe: 'Rampes',
  ascenseur: 'Ascenseurs',
  toilettes: 'Toilettes PMR',
  accueil: 'Accueil',
  signalement: 'Signalements',
  entree: 'Entrees adaptees',
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function setScreen(screenName) {
  appState.currentScreen = screenName;
  $$('.screen').forEach((screen) => {
    screen.classList.toggle('is-active', screen.dataset.screen === screenName);
  });
  $$('.nav-item').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.screen === screenName);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPlaces(query = '') {
  const normalizedQuery = query.trim().toLowerCase();
  const list = $('#placeList');
  const results = places.filter((place) => {
    const matchesSearch = !normalizedQuery
      || `${place.name} ${place.building} ${place.type} ${place.level} ${place.rooms} ${place.features.join(' ')}`
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesFilters = appState.activeFilters.size === 0
      || [...appState.activeFilters].some((filter) => place.tags.includes(filter));

    const matchesLevel = appState.currentLevel === 'all' || place.level === appState.currentLevel;

    return matchesSearch && matchesFilters && matchesLevel;
  });

  list.innerHTML = results.map((place) => `
    <button class="place-row ${place.id === appState.selectedPlaceId ? 'is-selected' : ''}" data-place-id="${place.id}" type="button">
      <span class="place-row__icon">${getPlaceCode(place)}</span>
      <span>
        <strong>${place.name}</strong>
        <small>${place.building} - ${place.level} - ${place.distance}</small>
      </span>
      <em>${place.status}</em>
    </button>
  `).join('');

  if (results.length === 0) {
    list.innerHTML = '<p class="empty-state">Aucun lieu ne correspond a cette recherche.</p>';
  }

  $$('.place-row').forEach((row) => {
    row.addEventListener('click', () => {
      appState.selectedPlaceId = row.dataset.placeId;
      renderSelectedPlace();
      renderPlaces($('#searchInput').value);
    });
  });
}

function renderMapPins() {
  const map = $('#campusMap');
  map.querySelectorAll('.map-pin').forEach((pin) => pin.remove());

  places
    .filter((place) => appState.currentLevel === 'all' || place.level === appState.currentLevel)
    .forEach((place) => {
    const pin = document.createElement('button');
    pin.type = 'button';
    pin.className = `map-pin ${place.id === appState.selectedPlaceId ? 'is-selected' : ''}`;
    pin.style.left = `${place.x}%`;
    pin.style.top = `${place.y}%`;
    pin.dataset.placeId = place.id;
    pin.textContent = getPlaceCode(place);
    pin.setAttribute('aria-label', place.name);
    pin.addEventListener('click', () => {
      appState.selectedPlaceId = place.id;
      renderSelectedPlace();
      renderPlaces($('#searchInput').value);
    });
    map.appendChild(pin);
  });
}

function renderSelectedPlace() {
  const place = places.find((item) => item.id === appState.selectedPlaceId) || places[0];
  $('#selectedPlaceName').textContent = place.name;
  $('#selectedPlaceMeta').textContent = `${place.building} - ${place.distance}`;
  $('#selectedPlaceDescription').textContent = place.description;
  $('#selectedPlaceFeatures').innerHTML = [place.rooms, ...place.features].map((feature) => `<span>${feature}</span>`).join('');
  $('#selectedPlaceStatus').textContent = place.status;
  $('#destinationSelect').value = place.id;
  renderMapPins();
}

function getPlaceCode(place) {
  if (place.id === 'entree-universite') {
    return 'M13';
  }
  if (place.building.includes('BU')) {
    return 'BU';
  }
  if (place.building.includes('MDE')) {
    return 'ME';
  }
  if (place.building.includes('CROUS')) {
    return 'CR';
  }
  const match = place.building.match(/Batiment ([A-Z][0-9]?)/);
  return match ? match[1] : 'i';
}

function renderProfileSummary() {
  const selected = [...appState.selectedProfiles];
  $('#profileSummary').textContent = selected.length
    ? selected.map((profile) => profileLabels[profile]).join(', ')
    : 'Aucun profil selectionne';

  $$('.profile-card input').forEach((input) => {
    input.checked = appState.selectedProfiles.has(input.value);
    input.closest('.profile-card').classList.toggle('is-selected', input.checked);
  });
}

function renderFilters() {
  $$('.filter-chip').forEach((button) => {
    button.classList.toggle('is-active', appState.activeFilters.has(button.dataset.filter));
  });
  $$('.level-chip').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.level === appState.currentLevel);
  });
}

function renderRoute() {
  const destination = places.find((place) => place.id === $('#destinationSelect').value) || places[0];
  const selectedProfiles = [...appState.selectedProfiles];
  const avoids = [];

  if (selectedProfiles.includes('mobilite')) {
    avoids.push('escaliers', 'pentes fortes', 'passages etroits');
  }
  if (selectedProfiles.includes('visuel')) {
    avoids.push('zones sans repere sonore');
  }
  if (selectedProfiles.includes('cognitif')) {
    avoids.push('trajets complexes');
  }

  $('#routeTitle').textContent = `Vers ${destination.name}`;
  $('#routeMeta').textContent = `${destination.distance} - ${destination.level} - ${destination.building}`;
  $('#routeAvoids').textContent = avoids.length ? avoids.join(', ') : 'aucun obstacle specifique';

  $('#routeSteps').innerHTML = routeSteps.map((step) => {
    const isImportant = step.profiles.some((profile) => appState.selectedProfiles.has(profile));
    return `
      <li class="${isImportant ? 'is-important' : ''}">
        <span>${step.icon}</span>
        <div>
          <strong>${appState.simpleMode ? simplifyStep(step.title) : step.title}</strong>
          <p>${appState.simpleMode ? simplifyStep(step.detail) : step.detail}</p>
        </div>
      </li>
    `;
  }).join('');
}

function simplifyStep(text) {
  return text
    .replace('Sortir par l entree principale', 'Sors par l entree')
    .replace('Suivre la rampe bleue', 'Va tout droit')
    .replace('Tourner a gauche vers le batiment A', 'Tourne a gauche')
    .replace('Entrer par la porte automatique', 'Entre par la porte')
    .replace('Avancez tout droit pendant 45 metres. La pente est douce.', 'Avance tout droit.')
    .replace('La porte accessible est sur votre droite. Vous etes arrive.', 'La porte est a droite. Tu es arrive.');
}

function addReport(event) {
  event.preventDefault();
  const placeId = $('#reportPlace').value;
  const type = $('#reportType').value;
  const description = $('#reportDescription').value.trim();
  const place = places.find((item) => item.id === placeId);

  if (!description) {
    $('#reportFeedback').textContent = 'Ajoutez une description pour envoyer le signalement.';
    return;
  }

  place.status = 'Signale';
  if (!place.tags.includes('signalement')) {
    place.tags.push('signalement');
  }

  $('#reportFeedback').textContent = `Signalement envoye: ${type} a ${place.name}. Un autre itineraire sera propose.`;
  $('#reportDescription').value = '';
  renderSelectedPlace();
  renderPlaces($('#searchInput').value);
}

function togglePreference(button) {
  const pref = button.dataset.preference;

  if (pref === 'offline') {
    appState.offline = !appState.offline;
    button.classList.toggle('is-active', appState.offline);
    $('#offlineStatus').textContent = appState.offline
      ? 'Mode hors ligne actif: carte et itineraire principal disponibles.'
      : 'Mode hors ligne inactif.';
  }

  if (pref === 'simple') {
    appState.simpleMode = !appState.simpleMode;
    button.classList.toggle('is-active', appState.simpleMode);
    document.body.classList.toggle('simple-mode', appState.simpleMode);
    renderRoute();
  }

  if (pref === 'contrast') {
    appState.highContrast = !appState.highContrast;
    button.classList.toggle('is-active', appState.highContrast);
    document.body.classList.toggle('high-contrast', appState.highContrast);
  }
}

function bindEvents() {
  $$('[data-go-to]').forEach((button) => {
    button.addEventListener('click', () => setScreen(button.dataset.goTo));
  });

  $$('.nav-item').forEach((button) => {
    button.addEventListener('click', () => setScreen(button.dataset.screen));
  });

  $$('.profile-card input').forEach((input) => {
    input.addEventListener('change', () => {
      if (input.checked) {
        appState.selectedProfiles.add(input.value);
      } else {
        appState.selectedProfiles.delete(input.value);
      }
      renderProfileSummary();
      renderRoute();
    });
  });

  $$('.filter-chip').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      if (appState.activeFilters.has(filter)) {
        appState.activeFilters.delete(filter);
      } else {
        appState.activeFilters.add(filter);
      }
      renderFilters();
      renderPlaces($('#searchInput').value);
    });
  });

  $$('.level-chip').forEach((button) => {
    button.addEventListener('click', () => {
      appState.currentLevel = button.dataset.level;
      renderFilters();
      renderMapPins();
      renderPlaces($('#searchInput').value);
    });
  });

  $('#searchInput').addEventListener('input', (event) => renderPlaces(event.target.value));
  $('#destinationSelect').addEventListener('change', (event) => {
    appState.selectedPlaceId = event.target.value;
    renderSelectedPlace();
    renderRoute();
  });
  $('#startRouteButton').addEventListener('click', () => {
    renderRoute();
    setScreen('route');
  });
  $('#reportForm').addEventListener('submit', addReport);

  $$('.preference-button').forEach((button) => {
    button.addEventListener('click', () => togglePreference(button));
  });
}

function populateSelects() {
  const destinationOptions = places.map((place) => `<option value="${place.id}">${place.name}</option>`).join('');
  $('#destinationSelect').innerHTML = destinationOptions;
  $('#reportPlace').innerHTML = destinationOptions;
}

function init() {
  populateSelects();
  bindEvents();
  renderProfileSummary();
  renderFilters();
  renderSelectedPlace();
  renderPlaces();
  renderRoute();
}

init();
