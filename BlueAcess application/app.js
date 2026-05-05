const screens = document.querySelectorAll('.screen');
const navButtons = document.querySelectorAll('[data-screen]');
const profileOptions = document.querySelectorAll('.profile-option input');
const levelButtons = document.querySelectorAll('.level-tab');
const placeCards = document.querySelectorAll('.place-card');
const routeButton = document.querySelector('[data-route-button]');
const searchInput = document.querySelector('#search');

function showScreen(name) {
  screens.forEach((screen) => {
    screen.classList.toggle('is-active', screen.dataset.view === name);
  });

  navButtons.forEach((button) => {
    button.classList.toggle('is-active', button.dataset.screen === name);
  });
}

document.querySelectorAll('[data-go]').forEach((button) => {
  button.addEventListener('click', () => showScreen(button.dataset.go));
});

navButtons.forEach((button) => {
  button.addEventListener('click', () => showScreen(button.dataset.screen));
});

profileOptions.forEach((input) => {
  input.addEventListener('change', () => {
    input.closest('.profile-option').classList.toggle('is-selected', input.checked);
  });
});

levelButtons.forEach((button) => {
  button.addEventListener('click', () => {
    levelButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
  });
});

placeCards.forEach((card) => {
  card.addEventListener('click', () => {
    placeCards.forEach((item) => item.classList.remove('is-selected'));
    card.classList.add('is-selected');
    routeButton.textContent = `Itineraire vers ${card.dataset.shortName}`;
  });
});

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();

  placeCards.forEach((card) => {
    const content = card.textContent.toLowerCase();
    card.hidden = query && !content.includes(query);
  });
});
