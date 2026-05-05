const appState = {
  currentScreen: 'home',
  selectedProfiles: new Set(['mobilite']),
  activeFilters: new Set(['accessible', 'rampe', 'toilettes']),
  selectedPlaceId: 'bibliotheque',
  offline: false,
  simpleMode: false,
  highContrast: false,
};

const places = [
  {
    id: 'bibliotheque',
    name: 'Bibliotheque universitaire',
    building: 'Batiment A',
    distance: '120 m',
    level: 'Niveau 0',
    type: 'Service et etudes',
    description: 'Grand espace de travail avec entree accessible, ascenseur et toilettes PMR.',
    features: ['Ascenseur', 'Rampe', 'Toilettes PMR', 'Accueil accessible'],
    tags: ['accessible', 'ascenseur', 'rampe', 'toilettes', 'accueil'],
    status: 'Ouvert',
    x: 46,
    y: 43,
  },
  {
    id: 'amphi-x',
    name: 'Amphitheatre X',
    building: 'Batiment B',
    distance: '210 m',
    level: 'Niveau 1',
    type: 'Cours',
    description: 'Acces conseille par l ascenseur central. Porte large cote galerie.',
    features: ['Ascenseur', 'Entree adaptee', 'Places PMR'],
    tags: ['accessible', 'ascenseur', 'entree'],
    status: 'Ouvert',
    x: 69,
    y: 61,
  },
  {
    id: 'scolarite',
    name: 'Service scolarite',
    building: 'Batiment C',
    distance: '260 m',
    level: 'Niveau 0',
    type: 'Administration',
    description: 'Accueil administratif avec comptoir accessible et file prioritaire.',
    features: ['Accueil accessible', 'Rampe', 'Signaletique claire'],
    tags: ['accessible', 'rampe', 'accueil'],
    status: 'Ouvert',
    x: 23,
    y: 66,
  },
  {
    id: 'toilettes-a',
    name: 'Toilettes PMR',
    building: 'Batiment A',
    distance: '95 m',
    level: 'Niveau 0',
    type: 'Sanitaires',
    description: 'Toilettes adaptees proches de la bibliotheque.',
    features: ['Toilettes PMR', 'Accessible fauteuil'],
    tags: ['accessible', 'toilettes'],
    status: 'Ouvert',
    x: 57,
    y: 36,
  },
  {
    id: 'ascenseur-b',
    name: 'Ascenseur central',
    building: 'Batiment B',
    distance: '180 m',
    level: 'Niveau 0',
    type: 'Equipement',
    description: 'Ascenseur principal du batiment B. Un signalement indique une attente longue.',
    features: ['Ascenseur', 'Alerte temps reel'],
    tags: ['ascenseur', 'signalement'],
    status: 'Attention',
    x: 76,
    y: 32,
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
      || `${place.name} ${place.building} ${place.type} ${place.features.join(' ')}`
        .toLowerCase()
        .includes(normalizedQuery);

    const matchesFilters = appState.activeFilters.size === 0
      || [...appState.activeFilters].some((filter) => place.tags.includes(filter));

    return matchesSearch && matchesFilters;
  });

  list.innerHTML = results.map((place) => `
    <button class="place-row ${place.id === appState.selectedPlaceId ? 'is-selected' : ''}" data-place-id="${place.id}" type="button">
      <span class="place-row__icon">${place.building.slice(-1)}</span>
      <span>
        <strong>${place.name}</strong>
        <small>${place.building} - ${place.distance} - ${place.features.slice(0, 3).join(' - ')}</small>
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

  places.forEach((place) => {
    const pin = document.createElement('button');
    pin.type = 'button';
    pin.className = `map-pin ${place.id === appState.selectedPlaceId ? 'is-selected' : ''}`;
    pin.style.left = `${place.x}%`;
    pin.style.top = `${place.y}%`;
    pin.dataset.placeId = place.id;
    pin.textContent = place.building.slice(-1);
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
  $('#selectedPlaceFeatures').innerHTML = place.features.map((feature) => `<span>${feature}</span>`).join('');
  $('#selectedPlaceStatus').textContent = place.status;
  $('#destinationSelect').value = place.id;
  renderMapPins();
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
