// CineRecap - Movie Recap Dashboard Logic
// Entirely public & instant access (No login or auth required)

// Initial Movie Recap Dataset
const sampleRecaps = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        rating: 8.8,
        readTime: 8,
        filmLength: 148,
        director: "Christopher Nolan",
        summary: "Dom Cobb is a skilled thief who extracts valuable secrets from deep within the subconscious during dream states. To gain his normal life back, he is hired for an impossible 'inception': planting an idea instead of stealing one.",
        beats: [
            "<strong>Act I:</strong> Cobb is recruited by Saito to break up a rival energy conglomerate by entering the dreams of heir Robert Fischer.",
            "<strong>Act II:</strong> The team builds a 3-level dream sequence (Rainy City -> Hotel -> Snow Fortress). Unforeseen projections attack them due to Fischer's subconscious training.",
            "<strong>Act III:</strong> Cobb confronts the memory projection of his deceased wife Mal in Limbo to rescue Saito and complete inception."
        ],
        ending: "Cobb returns to America and reunites with his children. He spins his totem top to check if he is still dreaming, but turns away to join his family before seeing if it falls, leaving the reality open-ended.",
        themes: ["Grief and guilt", "Perception of reality", "Subconscious influence", "Catharsis through letting go"]
    },
    {
        id: 2,
        title: "Shutter Island",
        year: 2010,
        genre: "Thriller",
        rating: 8.2,
        readTime: 6,
        filmLength: 138,
        director: "Martin Scorsese",
        summary: "In 1954, U.S. Marshal Teddy Daniels investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on Shutter Island.",
        beats: [
            "<strong>Act I:</strong> Teddy and new partner Chuck arrive at Ashecliffe Hospital to find missing patient Rachel Solando.",
            "<strong>Act II:</strong> Teddy experiences vivid migraines, discovers sinister medical trials, and suspects the doctors are performing lobotomies.",
            "<strong>Act III:</strong> Teddy scales the lighthouse expecting to uncover the conspiracy, only to find Dr. Cawley waiting with a board of evidence."
        ],
        ending: "Teddy is actually Andrew Laeddis, the hospital's most dangerous patient, who killed his wife after she drowned their children. The entire investigation was an elaborate roleplay experiment to snap him out of his delusion.",
        themes: ["Trauma denial", "Guilt and coping mechanisms", "Institutional ethics"]
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.7,
        readTime: 10,
        filmLength: 169,
        director: "Christopher Nolan",
        summary: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft to find a new habitable planet.",
        beats: [
            "<strong>Act I:</strong> Dust storms ruin Earth's crops. Cooper discovers gravitational anomalies leading to secret NASA facilities.",
            "<strong>Act II:</strong> Cooper leads the Endurance crew through a wormhole near Saturn to explore planets near Gargantua black hole.",
            "<strong>Act III:</strong> Cooper sacrifices himself into the Tesseract black hole, communicating quantum data across time to his daughter Murph via a watch second-hand."
        ],
        ending: "Murph solves the gravity equation, enabling humanity to leave Earth in giant stations. Cooper is rescued and sets off to reunite with Brand on Edmunds' planet.",
        themes: ["Parental love beyond space & time", "Human survival instinct", "Relativity of time"]
    },
    {
        id: 4,
        title: "The Prestige",
        year: 2006,
        genre: "Drama",
        rating: 8.5,
        readTime: 7,
        filmLength: 130,
        director: "Christopher Nolan",
        summary: "After a tragic accident, two stage magicians in 1890s London engage in a battle to create the ultimate illusion while sacrificing everything they have.",
        beats: [
            "<strong>Act I:</strong> Rivalry sparks between Robert Angier and Alfred Borden after Angier's wife drowns during a failed escape trick.",
            "<strong>Act II:</strong> Borden reveals 'The Transported Man'. Obsessed, Angier seeks out Nikola Tesla to build a real teleportation machine.",
            "<strong>Act III:</strong> Angier uses Tesla's machine, which duplicates him, leaving a clone to drown in a water tank each performance."
        ],
        ending: "Borden was actually twin brothers sharing one life. One brother is executed, while the surviving twin kills Angier and reclaims his daughter.",
        themes: ["Obsession vs sacrifice", "Duality of identity", "The cost of perfection"]
    },
    {
        id: 5,
        title: "Get Out",
        year: 2017,
        genre: "Horror",
        rating: 7.8,
        readTime: 5,
        filmLength: 104,
        director: "Jordan Peele",
        summary: "A young African-American man visits his white girlfriend's parents for the weekend, where his uneasiness about their reception reaches a boiling point.",
        beats: [
            "<strong>Act I:</strong> Chris visits Rose Armitage's family estate and notices strange, docile behavior from the Black groundskeepers.",
            "<strong>Act II:</strong> Missy hypnotizes Chris into 'The Sunken Place'. Chris realizes the family auctions Black bodies to elderly white buyers.",
            "<strong>Act III:</strong> Chris uses cotton stuffing from a chair to block hypnosis and fights his way out of the Armitage house."
        ],
        ending: "Chris escapes with the help of his TSA friend Rod, leaving Rose behind as the Armitage house burns down.",
        themes: ["Modern racial dynamics", "Subconscious subjugation", "Trust and betrayal"]
    },
    {
        id: 6,
        title: "Mad Max: Fury Road",
        year: 2015,
        genre: "Action",
        rating: 8.1,
        readTime: 4,
        filmLength: 120,
        director: "George Miller",
        summary: "In a post-apocalyptic wasteland, Max teams up with Imperator Furiosa to flee from a cult leader and his army in a high-octane armored truck chase.",
        beats: [
            "<strong>Act I:</strong> Max is captured by War Boys but escapes during Furiosa's high-speed rebellion with Immortan Joe's wives.",
            "<strong>Act II:</strong> They trek across the desert toward the 'Green Place', battling war rigs and storm hazards.",
            "<strong>Act III:</strong> Finding the Green Place destroyed, they turn around to fight back and conquer Immortan Joe's Citadel."
        ],
        ending: "Furiosa kills Immortan Joe and liberates the Citadel, restoring water to the people, while Max slips away into the crowd.",
        themes: ["Redemption", "Resource scarcity", "Freedom from tyranny"]
    }
];

// App State
let recaps = [...sampleRecaps];
let activeGenre = "All";
let currentSort = "popular";
let currentView = "grid";

// DOM Elements
const recapGrid = document.getElementById("recapGrid");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const genreFilters = document.getElementById("genreFilters");
const sortSelect = document.getElementById("sortSelect");
const themeToggle = document.getElementById("themeToggle");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const recapModal = document.getElementById("recapModal");
const closeModalBtn = document.getElementById("closeModal");
const addRecapBtn = document.getElementById("addRecapBtn");
const addModal = document.getElementById("addModal");
const closeAddModalBtn = document.getElementById("closeAddModal");
const cancelAddBtn = document.getElementById("cancelAddBtn");
const addRecapForm = document.getElementById("addRecapForm");
const toggleSpoilerBtn = document.getElementById("toggleSpoilerBtn");
const modalEndingContent = document.getElementById("modalEndingContent");

// Render Recaps
function renderRecaps() {
    let filtered = recaps.filter(item => {
        const query = searchInput.value.toLowerCase();
        const matchesSearch = item.title.toLowerCase().includes(query) ||
                              item.genre.toLowerCase().includes(query) ||
                              item.summary.toLowerCase().includes(query) ||
                              item.director.toLowerCase().includes(query);
        const matchesGenre = activeGenre === "All" || item.genre === activeGenre;
        return matchesSearch && matchesGenre;
    });

    // Sort
    if (currentSort === "popular" || currentSort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === "newest") {
        filtered.sort((a, b) => b.year - a.year);
    } else if (currentSort === "duration") {
        filtered.sort((a, b) => a.readTime - b.readTime);
    }

    recapGrid.className = `recap-grid ${currentView === 'list' ? 'list-view' : ''}`;
    
    if (filtered.length === 0) {
        recapGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-film-slash" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p style="font-size: 1.1rem;">No movie recaps match your search or filter criteria.</p>
            </div>
        `;
        return;
    }

    recapGrid.innerHTML = filtered.map(item => `
        <div class="card" onclick="openRecapModal(${item.id})">
            <div>
                <div class="card-top">
                    <span class="genre-tag">${item.genre}</span>
                    <span class="card-rating"><i class="fa-solid fa-star"></i> ${item.rating}</span>
                </div>
                <h3 class="card-title">${item.title} (${item.year})</h3>
                <div class="card-meta">
                    <span><i class="fa-solid fa-video"></i> ${item.director}</span>
                </div>
                <p class="card-summary">${item.summary}</p>
            </div>
            <div class="card-footer">
                <span class="read-time"><i class="fa-solid fa-clock"></i> ${item.readTime} min recap</span>
                <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); openRecapModal(${item.id})">Read Breakdown</button>
            </div>
        </div>
    `).join('');

    document.getElementById("totalRecapsCount").innerText = recaps.length;
}

// Modal Logic
function openRecapModal(id) {
    const item = recaps.find(r => r.id === id);
    if (!item) return;

    document.getElementById("modalGenre").innerText = item.genre;
    document.getElementById("modalTitle").innerText = `${item.title} (${item.year})`;
    document.getElementById("modalMeta").innerHTML = `
        <span><i class="fa-solid fa-user-ninja"></i> Dir: ${item.director}</span> | 
        <span><i class="fa-solid fa-star" style="color: #f59e0b;"></i> ${item.rating} / 10</span> | 
        <span><i class="fa-solid fa-stopwatch"></i> ${item.readTime} min read</span>
    `;
    document.getElementById("modalExecutiveSummary").innerText = item.summary;
    
    const beatsList = document.getElementById("modalPlotBeats");
    beatsList.innerHTML = item.beats.map(beat => `<div class="beat-item"><p>${beat}</p></div>`).join('');

    modalEndingContent.innerText = item.ending;
    modalEndingContent.classList.add("blurred");
    toggleSpoilerBtn.innerHTML = `<i class="fa-solid fa-eye"></i> Show Spoilers`;

    const themesList = document.getElementById("modalThemes");
    themesList.innerHTML = item.themes.map(t => `<li>${t}</li>`).join('');

    recapModal.classList.add("active");
}

function closeModal() {
    recapModal.classList.remove("active");
}

// Event Listeners
searchInput.addEventListener("input", (e) => {
    clearSearchBtn.style.display = e.target.value ? "block" : "none";
    renderRecaps();
});

clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearSearchBtn.style.display = "none";
    renderRecaps();
});

genreFilters.addEventListener("click", (e) => {
    if (e.target.classList.contains("pill")) {
        document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
        e.target.classList.add("active");
        activeGenre = e.target.dataset.genre;
        renderRecaps();
    }
});

sortSelect.addEventListener("change", (e) => {
    currentSort = e.target.value;
    renderRecaps();
});

themeToggle.addEventListener("click", () => {
    const currentTheme = document.body.getAttribute("data-theme");
    if (currentTheme === "light") {
        document.body.removeAttribute("data-theme");
        themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;
    } else {
        document.body.setAttribute("data-theme", "light");
        themeToggle.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
});

gridViewBtn.addEventListener("click", () => {
    currentView = "grid";
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
    renderRecaps();
});

listViewBtn.addEventListener("click", () => {
    currentView = "list";
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
    renderRecaps();
});

toggleSpoilerBtn.addEventListener("click", () => {
    if (modalEndingContent.classList.contains("blurred")) {
        modalEndingContent.classList.remove("blurred");
        toggleSpoilerBtn.innerHTML = `<i class="fa-solid fa-eye-slash"></i> Hide Spoilers`;
    } else {
        modalEndingContent.classList.add("blurred");
        toggleSpoilerBtn.innerHTML = `<i class="fa-solid fa-eye"></i> Show Spoilers`;
    }
});

closeModalBtn.addEventListener("click", closeModal);

// Add Recap Modal Logic
addRecapBtn.addEventListener("click", () => addModal.classList.add("active"));
closeAddModalBtn.addEventListener("click", () => addModal.classList.remove("active"));
cancelAddBtn.addEventListener("click", () => addModal.classList.remove("active"));

addRecapForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newRecap = {
        id: Date.now(),
        title: document.getElementById("inputTitle").value,
        year: parseInt(document.getElementById("inputYear").value),
        genre: document.getElementById("inputGenre").value,
        rating: parseFloat(document.getElementById("inputRating").value),
        readTime: parseInt(document.getElementById("inputReadTime").value),
        filmLength: 120,
        director: "User Added",
        summary: document.getElementById("inputSummary").value,
        beats: ["<strong>Full Plot:</strong> " + document.getElementById("inputSummary").value],
        ending: document.getElementById("inputEnding").value,
        themes: ["Custom Submission"]
    };

    recaps.unshift(newRecap);
    renderRecaps();
    addRecapForm.reset();
    addModal.classList.remove("active");
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
    if (e.target === recapModal) closeModal();
    if (e.target === addModal) addModal.classList.remove("active");
});

// Initialize on Load
renderRecaps();
