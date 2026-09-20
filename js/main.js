// TourVista - Main JavaScript (Easy-to-Intermediate Level)

// ----------------------------------------
// 1. MOBILE NAVBAR TOGGLE
// ----------------------------------------
const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('nav');

menuBtn.addEventListener('click', function () {
  nav.classList.toggle('open');
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    nav.classList.remove('open');
  });
});

// ----------------------------------------
// 2. STICKY NAVBAR SHADOW ON SCROLL
// ----------------------------------------
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  }
});

// ----------------------------------------
// 3. SEARCH FUNCTIONALITY
// ----------------------------------------
const searchBtn = document.getElementById('searchBtn');
const searchResult = document.getElementById('searchResult');

searchBtn.addEventListener('click', function () {
  const dest = document.getElementById('searchDest').value.trim();
  const date = document.getElementById('searchDate').value;
  const type = document.getElementById('searchType').value;

  // Basic validation
  if (!dest && !date && !type) {
    searchResult.textContent = 'Please enter a destination, date, or tour type to search.';
    searchResult.style.color = '#fca5a5';
    return;
  }

  // Filter destination cards by keyword
  const cards = document.querySelectorAll('.card');
  let matchCount = 0;

  cards.forEach(function (card) {
    const name = card.querySelector('h3').textContent.toLowerCase();
    const cardType = card.getAttribute('data-type') || '';
    const destMatch = !dest || name.includes(dest.toLowerCase());
    const typeMatch = !type || cardType === type;

    if (destMatch && typeMatch) {
      card.style.display = 'block';
      matchCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // Scroll to destinations section
  document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });

  // Show feedback
  if (matchCount > 0) {
    searchResult.textContent = matchCount + ' destination(s) found for your search.';
    searchResult.style.color = '#90cdf4';
  } else {
    searchResult.textContent = 'No destinations matched. Showing all destinations.';
    searchResult.style.color = '#fca5a5';
    // Reset cards after 2 seconds
    setTimeout(function () {
      cards.forEach(function (card) { card.style.display = 'block'; });
      searchResult.textContent = '';
    }, 2000);
  }
});
