// ============================================
// TourVista - Travel & Tour Management Platform
// Member 2: Homepage & Destinations Search Logic
// File: js/main.js
// ============================================

// Step 1: HTML elements ko unke ID ke zariye select karna
const searchBtn = document.getElementById('searchBtn');
const searchDest = document.getElementById('searchDest');
const searchType = document.getElementById('searchType');
const searchResult = document.getElementById('searchResult');

// Step 2: Destinations section ke sabhi destination cards ko select karna
const destinationCards = document.querySelectorAll('#destinations .card');

// Step 3: Search button par 'click' event listener lagana
searchBtn.addEventListener('click', function () {
  // User ke enter kiye gaye values lena aur lowercase + trim karna
  const destValue = searchDest.value.toLowerCase().trim();
  const typeValue = searchType.value.toLowerCase().trim();

  // Kitne cards match hue unhe count karne ke liye variable
  let matchCount = 0;

  // Step 4: Sabhi destination cards par forEach loop chalana
  destinationCards.forEach(function (card) {
    // Har card ka title (Goa, Manali, etc.) aur data-type lena
    const cardTitle = card.querySelector('h3').textContent.toLowerCase();
    const cardType = (card.getAttribute('data-type') || '').toLowerCase();

    // Check 1: Kya destination name match karta hai?
    // Agar search box empty hai, to matchesName true hoga
    const matchesName = (destValue === '' || cardTitle.includes(destValue));

    // Check 2: Kya tour type match karta hai?
    // Agar dropdown me koi type select nahi kiya, to matchesType true hoga
    const matchesType = (typeValue === '' || cardType === typeValue);

    // Step 5: if/else se card ko show ya hide karna
    if (matchesName && matchesType) {
      card.style.display = 'block'; // Card dikhana
      matchCount++;
    } else {
      card.style.display = 'none';  // Card chhupana
    }
  });

  // Step 6: Search result message update karna
  if (destValue === '' && typeValue === '') {
    // Agar dono inputs khali hain, to sabhi cards dikhenge aur message clear ho jayega
    searchResult.textContent = '';
  } else if (matchCount === 0) {
    // Agar koi card match nahi hua, to "not found" message dikhana
    searchResult.textContent = 'No destinations found matching your search.';
  } else {
    // Agar match mil gaya, to count show karna
    searchResult.textContent = 'Showing ' + matchCount + ' destination(s).';
  }
});

// Bonus: Mobile menu toggle ke liye simple code
const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
}
