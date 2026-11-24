// ============================================
// TourVista - Destinations Page
// Destination Data and Card Rendering
// ============================================

const destinations = [
    {
        name: "Goa",
        type: "beach",
        description: "Explore beautiful beaches, nightlife and Portuguese heritage.",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600"
    },
    {
        name: "Manali",
        type: "mountain",
        description: "Enjoy snow-covered mountains and beautiful valleys.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600"
    },
    {
        name: "Jaipur",
        type: "heritage",
        description: "Discover royal palaces, forts and rich Rajasthani culture.",
        image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=600"
    },
    {
        name: "Bali",
        type: "international",
        description: "Experience tropical beaches and beautiful landscapes.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600"
    },
    {
        name: "Shimla",
        type: "mountain",
        description: "Explore scenic hills and peaceful mountain views.",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600"
    },
    {
        name: "Agra",
        type: "heritage",
        description: "Visit the Taj Mahal and explore Mughal architecture.",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600"
    }
];

// Select HTML elements
const destGrid = document.getElementById("dest-grid");
const noResults = document.getElementById("no-results");

// Display destination cards
function displayDestinations(destinationList) {

    destGrid.innerHTML = "";

    if (destinationList.length === 0) {
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    destinationList.forEach(destination => {

        const card = document.createElement("div");

        card.className = "destination-card";

        card.innerHTML = `
            <img src="${destination.image}" alt="${destination.name}">

            <div class="destination-info">
                <h3>${destination.name}</h3>

                <p>${destination.description}</p>

                <span>${destination.type}</span>

                <br><br>

                <a href="places.html?destination=${encodeURIComponent(destination.name)}"
                   class="btn-primary">
                   View Places
                </a>
            </div>
        `;

        destGrid.appendChild(card);

    });
}

// Initially display all destinations
displayDestinations(destinations);
// ============================================
// Search and Category Filter
// ============================================

const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const searchButton = document.getElementById("searchBtn");

// Filter destinations
function filterDestinations() {

    const searchValue = searchInput.value.toLowerCase().trim();
    const selectedType = typeFilter.value.toLowerCase();

    const filteredDestinations = destinations.filter(destination => {

        const matchesName = destination.name
            .toLowerCase()
            .includes(searchValue);

        const matchesType = selectedType === "" ||
            destination.type === selectedType;

        return matchesName && matchesType;

    });

    displayDestinations(filteredDestinations);
}

// Search button click
searchButton.addEventListener("click", filterDestinations);

// Search using Enter key
searchInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        filterDestinations();
    }

});

// Filter when category changes
typeFilter.addEventListener("change", filterDestinations);