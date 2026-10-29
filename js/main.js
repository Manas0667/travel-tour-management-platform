// ============================================
// TourVista - Travel & Tour Management Platform
// Member 2: Homepage & Destinations Search & Filter Logic
// File: js/main.js
// ============================================

// Step 1: HTML elements ko unke ID ke zariye select karna
const searchBtn = document.getElementById('searchBtn');
const searchDest = document.getElementById('searchDest');
const searchType = document.getElementById('searchType');
const searchResult = document.getElementById('searchResult');

// Step 2: Destinations section ke sabhi destination cards ko select karna
const destinationCards = document.querySelectorAll('#destinations .card');

// Step 3: Main function jo Search button click hone par chalega
function filterDestinations() {
  // User ke enter kiye gaye values lena (lowercase + trim karke)
  const destValue = searchDest.value.toLowerCase().trim();
  const typeValue = searchType.value.toLowerCase().trim();

  let matchCount = 0;

  // Step 4: Sabhi cards par loop chalana using forEach()
  destinationCards.forEach(function (card) {
    const cardTitle = card.querySelector('h3').textContent.toLowerCase();
    const cardType = (card.getAttribute('data-type') || '').toLowerCase();

    // Check 1: Destination name match ya search box empty
    const matchesName = (destValue === '' || cardTitle.includes(destValue) || cardType.includes(destValue));

    // Check 2: Tour type dropdown match ya All Types (empty)
    const matchesType = (typeValue === '' || cardType === typeValue);

    // Step 5: Dono conditions match hone par card show karna, warna hide karna
    if (matchesName && matchesType) {
      card.style.display = 'block'; // Card dikhana
      matchCount++;
    } else {
      card.style.display = 'none';  // Card chhupana
    }
  });

  // Step 6: Result message update karna
  if (destValue === '' && typeValue === '') {
    // Agar dono search fields empty/reset hain, to message clear karna
    searchResult.textContent = '';
  } else if (matchCount === 0) {
    // Agar koi card match nahi hua, to "No destinations found" message dikhana
    searchResult.textContent = 'No destinations found';
  } else {
    // Agar matches mile, to count show karna
    searchResult.textContent = 'Showing ' + matchCount + ' destination(s).';
  }
}

// Step 7: Search button par click event listener lagana
// (Search tabhi execute hogi jab user 'Search Tours' button click karega)
searchBtn.addEventListener('click', filterDestinations);

// User search box me 'Enter' key dabakar bhi search trigger kar sakta hai
searchDest.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    filterDestinations();
  }
});

// Mobile menu toggle ke liye simple code
const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
}
