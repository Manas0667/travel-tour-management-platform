var destinations = [
  {
    id: "goa",
    name: "Goa",
    type: "beach",
    description: "Famous for golden beaches, vibrant nightlife, seafood, and Portuguese heritage.",
    cardImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1400&q=80",
    places: [
      {
        name: "Baga Beach",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
        description: "One of Goa's most popular beaches, famous for water sports, beach shacks, and lively nightlife. Perfect for water activities and sunset walks."
      },
      {
        name: "Calangute Beach",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80",
        description: "Known as the 'Queen of Beaches', Calangute is the largest and most visited beach in North Goa. It offers a variety of beach activities and local cuisine."
      },
      {
        name: "Fort Aguada",
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80",
        description: "A well-preserved 17th-century Portuguese fort at the mouth of the Mandovi River. It offers stunning views of the Arabian Sea and is a must-visit heritage site."
      },
      {
        name: "Dudhsagar Falls",
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
        description: "One of India's tallest waterfalls at 310 meters, located on the Goa-Karnataka border. The name means 'Sea of Milk' due to its milky white cascading waters."
      },
      {
        name: "Anjuna Beach",
        image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80",
        description: "Famous for its scenic beauty, the weekly flea market, and trance parties. Anjuna is a favourite among backpackers and those who seek an alternative beach experience."
      }
    ]
  },
  {
    id: "manali",
    name: "Manali",
    type: "mountain",
    description: "Snow-covered Himalayan peaks, river rafting, and thrilling Solang Valley adventures.",
    cardImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1400&q=80",
    places: [
      {
        name: "Solang Valley",
        image: "https://images.unsplash.com/photo-1517823382935-51bfcb0ec6d3?w=600&q=80",
        description: "A side valley at the top of the Kullu Valley, Solang Valley is famous for its skiing, paragliding, and zorbing. It offers panoramic views of snow-capped mountains and glaciers."
      },
      {
        name: "Rohtang Pass",
        image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80",
        description: "A high mountain pass in the Himalayas at 3,978 metres above sea level. Rohtang Pass connects the Kullu Valley to the Lahaul and Spiti Valleys and is covered in snow for most of the year."
      },
      {
        name: "Hadimba Temple",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
        description: "An ancient cave temple dedicated to the goddess Hadimba, surrounded by a dense cedar forest. Its unique pagoda-style wooden architecture makes it one of the most photographed structures in Manali."
      },
      {
        name: "Old Manali",
        image: "https://images.unsplash.com/photo-1573394585218-e62aea3f04da?w=600&q=80",
        description: "A charming village full of apple orchards, cosy cafes, and traditional Himachali culture. Old Manali is a peaceful retreat away from the busy tourist circuit, popular among long-term travellers."
      },
      {
        name: "Atal Tunnel",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
        description: "The world's longest highway tunnel above 10,000 feet, connecting Manali to Leh even during winters. This engineering marvel provides all-year connectivity to the Lahaul-Spiti district."
      }
    ]
  },
  {
    id: "kashmir",
    name: "Kashmir",
    type: "mountain",
    description: "Paradise on Earth — Dal Lake, Gulmarg, and stunning Mughal gardens.",
    cardImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&q=80",
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1400&q=80",
    places: [
      {
        name: "Dal Lake",
        image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
        description: "The jewel of Kashmir, Dal Lake is famous for its scenic beauty, traditional shikaras (wooden boats), and floating houseboats. The vibrant floating vegetable market here is a unique experience."
      },
      {
        name: "Gulmarg",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
        description: "Known as the 'Meadow of Flowers', Gulmarg is one of the top ski resorts in Asia. At an altitude of 2,650 metres, it offers world-class skiing, gondola rides, and breathtaking Himalayan views."
      },
      {
        name: "Pahalgam",
        image: "https://images.unsplash.com/photo-1573835796614-ce72dc820b02?w=600&q=80",
        description: "Called the 'Valley of Shepherds', Pahalgam is set in a stunning valley with the Lidder River flowing through it. It is a base camp for the Amarnath Yatra pilgrimage and offers excellent trekking."
      },
      {
        name: "Sonamarg",
        image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80",
        description: "Meaning 'Meadow of Gold', Sonamarg sits at an altitude of 2,740 metres along the Sindh River. Surrounded by glaciers, it is a gateway to mountain treks and alpine lakes like Vishansar and Krishansar."
      },
      {
        name: "Nishat Garden",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
        description: "The 'Garden of Bliss', Nishat Bagh is a terraced Mughal garden on the eastern shore of Dal Lake. Built in 1633 by Asif Khan, it features 12 terraces representing the 12 signs of the Zodiac."
      }
    ]
  },
  {
    id: "jaipur",
    name: "Jaipur",
    type: "heritage",
    description: "The Pink City — Amber Fort, City Palace, and vibrant Rajasthani culture.",
    cardImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1400&q=80",
    places: [
      {
        name: "Hawa Mahal",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
        description: "The iconic 'Palace of Winds', Hawa Mahal is a five-storey palace with 953 small windows (jharokhas) built in 1799. It allowed royal ladies to observe street festivals while remaining unseen."
      },
      {
        name: "Amber Fort",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
        description: "A stunning hilltop fortress built in 1592, Amber Fort is known for its artistic Hindu style elements. The Sheesh Mahal (Hall of Mirrors) inside is decorated with thousands of tiny mirror tiles."
      },
      {
        name: "City Palace",
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80",
        description: "A magnificent royal complex in the heart of Jaipur that blends Rajput, Mughal, and European architecture. It houses a museum with royal artefacts, paintings, costumes, and weapons."
      },
      {
        name: "Jal Mahal",
        image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
        description: "The 'Water Palace', a five-storey palace seemingly floating in the middle of Man Sagar Lake. The palace was once a hunting lodge and retreat for the Maharajas of Jaipur."
      },
      {
        name: "Jantar Mantar",
        image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=600&q=80",
        description: "A UNESCO World Heritage Site, Jantar Mantar is an astronomical observation site built in the early 18th century. It features the world's largest stone sundial and 19 astronomical instruments."
      }
    ]
  },
  {
    id: "kerala",
    name: "Kerala",
    type: "beach",
    description: "God's Own Country — tranquil backwaters, lush tea gardens, and pristine beaches.",
    cardImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1400&q=80",
    places: [
      {
        name: "Alleppey Backwaters",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80",
        description: "Experience the magic of Kerala on a traditional houseboat gliding through serene backwaters. The network of canals, rivers, and lakes is unique to Kerala and a UNESCO tentative World Heritage Site."
      },
      {
        name: "Munnar",
        image: "https://images.unsplash.com/photo-1573394585218-e62aea3f04da?w=600&q=80",
        description: "A scenic hill station in the Western Ghats at 1,600 metres, famous for its vast tea plantations. Munnar offers stunning landscapes, misty peaks, and pleasant cool weather throughout the year."
      },
      {
        name: "Varkala Beach",
        image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80",
        description: "Unlike the flat coastline common on the Kerala coast, Varkala is a unique cliff beach. The 15-metre high cliffs run parallel to the beach and are known for natural mineral water springs."
      },
      {
        name: "Periyar Wildlife Sanctuary",
        image: "https://images.unsplash.com/photo-1517823382935-51bfcb0ec6d3?w=600&q=80",
        description: "One of the most popular wildlife sanctuaries in India, located in Thekkady. It is home to elephants, tigers, leopards, and a variety of birds. Boat rides on Periyar Lake are a highlight."
      },
      {
        name: "Kochi Fort",
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80",
        description: "Fort Kochi is a historic port town known for its colonial architecture, Chinese fishing nets, and Jewish Synagogue. The area reflects Kerala's centuries of international trade and cultural exchange."
      }
    ]
  },
  {
    id: "agra",
    name: "Agra",
    type: "heritage",
    description: "Home to the Taj Mahal — a symbol of eternal love and Mughal architectural brilliance.",
    cardImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1400&q=80",
    places: [
      {
        name: "Taj Mahal",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
        description: "One of the Seven Wonders of the World, the Taj Mahal is an ivory-white marble mausoleum commissioned by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. A UNESCO World Heritage Site."
      },
      {
        name: "Agra Fort",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80",
        description: "A UNESCO World Heritage Site built in red sandstone, Agra Fort was the main residence of the Mughal emperors. It contains palaces, audience halls, mosques, and gardens within its massive walls."
      },
      {
        name: "Fatehpur Sikri",
        image: "https://images.unsplash.com/photo-1573835796614-ce72dc820b02?w=600&q=80",
        description: "A UNESCO World Heritage Site, Fatehpur Sikri is a magnificent fortified ancient city. Built by Emperor Akbar in 1571, it served briefly as the Mughal capital before being abandoned due to water scarcity."
      },
      {
        name: "Mehtab Bagh",
        image: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
        description: "A large garden complex on the opposite bank of the Yamuna River from the Taj Mahal. It offers the best sunset views of the Taj and is believed to be the site of a proposed 'Black Taj Mahal'."
      },
      {
        name: "Itmad-ud-Daulah",
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80",
        description: "Often called the 'Baby Taj', this small mausoleum was the first Mughal structure built entirely from marble. It is known for its delicate pietra dura (inlaid marble) work, which later inspired the Taj Mahal."
      }
    ]
  }
];

var destGrid     = document.getElementById('dest-grid');
var noResults    = document.getElementById('no-results');
var searchInput  = document.getElementById('searchInput');
var typeFilter   = document.getElementById('typeFilter');
var searchBtn    = document.getElementById('searchBtn');

var placesDetail  = document.getElementById('places-detail');
var detailSection = document.getElementById('destinations-section');

var detailBannerImg   = document.getElementById('detail-banner-img');
var detailDestName    = document.getElementById('detail-dest-name');
var detailDestTagline = document.getElementById('detail-dest-tagline');
var placesGrid        = document.getElementById('places-grid');
var btnBack           = document.getElementById('btn-back');

function renderDestinations(list) {
  destGrid.innerHTML = '';

  if (list.length === 0) {
    noResults.style.display = 'block';
    return;
  }

  noResults.style.display = 'none';

  list.forEach(function(dest) {
    var card = document.createElement('div');
    card.className = 'dest-card';
    card.setAttribute('data-id', dest.id);
    card.setAttribute('data-type', dest.type);

    card.innerHTML =
      '<img src="' + dest.cardImage + '" alt="' + dest.name + ' destination" loading="lazy">' +
      '<div class="dest-card-body">' +
        '<h3>' + dest.name + '</h3>' +
        '<span class="dest-type">' + dest.type + '</span>' +
        '<p>' + dest.description + '</p>' +
        '<button class="btn-view-places" data-dest-id="' + dest.id + '">🗺️ View Places</button>' +
      '</div>';

    destGrid.appendChild(card);
  });

  attachViewPlacesHandlers();
}

function filterDestinations() {
  var keyword = searchInput.value.toLowerCase().trim();
  var typeVal = typeFilter.value.toLowerCase();

  var filtered = destinations.filter(function(dest) {
    var nameMatch = (keyword === '' || dest.name.toLowerCase().includes(keyword));
    var typeMatch = (typeVal  === '' || dest.type === typeVal);
    return nameMatch && typeMatch;
  });

  renderDestinations(filtered);
}

if (searchBtn) {
  searchBtn.addEventListener('click', filterDestinations);
}

if (searchInput) {
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      filterDestinations();
    }
  });
}

if (typeFilter) {
  typeFilter.addEventListener('change', filterDestinations);
}

function attachViewPlacesHandlers() {
  var buttons = document.querySelectorAll('.btn-view-places');

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var destId = btn.getAttribute('data-dest-id');
      openDestinationDetail(destId);
    });
  });
}

function openDestinationDetail(destId) {
  var dest = null;
  for (var i = 0; i < destinations.length; i++) {
    if (destinations[i].id === destId) {
      dest = destinations[i];
      break;
    }
  }

  if (!dest) return;

  detailBannerImg.src   = dest.image;
  detailBannerImg.alt   = dest.name + ' banner';
  detailDestName.textContent    = '📍 ' + dest.name;
  detailDestTagline.textContent = dest.description;

  placesGrid.innerHTML = '';

  var headingEl = document.getElementById('places-section-heading');
  if (headingEl) {
    headingEl.textContent = 'Popular Places in ' + dest.name;
  }

  dest.places.forEach(function(place) {
    var card = document.createElement('div');
    card.className = 'place-card';
    card.innerHTML =
      '<img src="' + place.image + '" alt="' + place.name + '" loading="lazy">' +
      '<div class="place-card-body">' +
        '<h3>' + place.name + '</h3>' +
        '<p>' + place.description + '</p>' +
      '</div>';
    placesGrid.appendChild(card);
  });

  detailSection.style.display = 'none';
  placesDetail.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (btnBack) {
  btnBack.addEventListener('click', function() {
    placesDetail.classList.remove('active');
    detailSection.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

var menuBtn = document.getElementById('menuBtn');
var navEl   = document.querySelector('nav');

if (menuBtn && navEl) {
  menuBtn.addEventListener('click', function() {
    navEl.classList.toggle('open');
  });
}

renderDestinations(destinations);
