document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('promo-popup');
  const redirectUrl = 'https://whatsappad.vercel.app/';
  const STORAGE_KEY = 'popupLastShown';

  function shouldShowPopup() {
    const today = new Date().toDateString();
    return localStorage.getItem(STORAGE_KEY) !== today;
  }

  function showPopup() {
    popup.classList.remove('hidden');
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
  }

  function handleRedirect() {
    window.open(redirectUrl, '_blank', 'noopener');
    popup.classList.add('hidden');
  }

  // Show after 2 seconds
  if (shouldShowPopup()) {
    setTimeout(showPopup, 2000);
  }

  // Click handling
  popup.addEventListener('click', handleRedirect);
  popup.querySelector('.popup-content')
    .addEventListener('click', e => e.stopPropagation());
  popup.querySelector('.unlock-btn')
    .addEventListener('click', handleRedirect);
  popup.querySelector('.close-btn')
    .addEventListener('click', handleRedirect);
});