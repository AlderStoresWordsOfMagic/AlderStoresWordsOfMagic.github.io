// Mobile UI button functionality
const navToggle = document.querySelector('.navbar-button');
const navMenu = document.querySelector('.navbar-menu');
const navBurger = document.querySelectorAll('.hamburger');

function toggleMenu() {
    var shown = navMenu.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", shown);

    // Hamburger-to-X transition, animations handled in CSS
    navBurger.forEach(navBurger => navBurger.classList.toggle('x'));
}
navToggle.addEventListener('click', toggleMenu);




// Dropdowns
const detLocToggle = document.querySelector('.button-details-loc');
const detLocMenu = document.querySelector('.grid-layout-events-details-loc');

function toggleDetLoc() {
    var shown = detLocMenu.classList.toggle("show");
    detLocToggle.setAttribute("aria-expanded", shown);
    detLocToggle.innerHTML = (shown ? "&#9660; Location And Time" : "&#9658; Location And Time");
}
if (detLocToggle) {
    detLocToggle.addEventListener('click', toggleDetLoc)
};


// Filter for past games, select a date range and show only games in that range
const pastEvents = document.querySelectorAll('.grid-layout-events-past-event');
const filterPastEvents = document.querySelector('#grid-layout-events-past-filter');

function displayPastEvents() {
    if (pastEvents) {
        pastEvents.forEach(element => {
            element.style.display = (element.getAttribute('data-number') == filterPastEvents.valueAsNumber) ? "block" : "none"
        });
    }
}
if (filterPastEvents) {
    filterPastEvents.addEventListener('input', displayPastEvents)
};




// Form data persistence and clearing

// Add data-wipe button for later
const dataClearButton = document.getElementById('button-footer-clear-data')

// Add opt-out button for later
const optOutButton = document.getElementById('button-footer-opt-out')


// Save form data as user updates form
if (filterPastEvents) {
    filterPastEvents.addEventListener('input', function(e) {
        if (!(localStorage.getItem('optedOut'))) {
            localStorage.setItem('formData', JSON.stringify({"formDataVal": e.target.value}) || {});
            dataClearButton.innerHTML = "Clear Site Data"
            dataClearButton.classList.add('emphasis')
        }
    });
}

// Restore form data on page load
if (localStorage.getItem('formData')) { /* Check to make sure the data exists before loading it */
    if (filterPastEvents) {
        filterPastEvents.value = JSON.parse(localStorage.getItem('formData')).formDataVal;
        displayPastEvents() // Auto-refresh shown divs, since the function is normally only run on input
    };
    dataClearButton.classList.add('emphasis')
}

// This data is necessary because a quality-of-life function of the site would not work without it. It has no personal ties.
// Users can control it to an absolute degree, as it is a basic number box with no limits outside of dates beyond the club's formation.

// Update formatting of opt-out button on page load
if (localStorage.getItem('optedOut')) {
    optOutButton.innerHTML = "Opted Out"
}


// Function to wipe data
function wipeUserData() {
    /* List of persistent keys that should not be cleared, such as the opt-out flag */
    var persistentKeys = [
        "optedOut"
    ];

    /* Loop through each form and reset it */
    var inputs = document.getElementsByTagName('input');
    for (var c = 0; c < inputs.length; c++) {
        inputs[c].value = "";
    };

    /* Clears the browser localStorage where everything from this site is */
    for (var d = 0; d < localStorage.length; d++) {
        var curKey = localStorage.key(d)
        if (persistentKeys.indexOf(curKey) === -1) { /* If the key is not present in the list of persistent keys */
            localStorage.removeItem(curKey)
        }
    }
    
    dataClearButton.innerHTML = "No Data Saved"
    dataClearButton.classList.remove('emphasis')

    displayPastEvents()
}

// Button to wipe data
dataClearButton.addEventListener('click', wipeUserData)

// Button to opt out
optOutButton.addEventListener('click', function() {

    if (localStorage.getItem('optedOut')) {
        localStorage.removeItem('optedOut', 'optedOut');
        optOutButton.innerHTML = "Opt-Out of Data Collection"
    }
    else {
        wipeUserData() /* Done first so setting the opt-out flag is safe */
        localStorage.setItem('optedOut', 'optedOut');
        optOutButton.innerHTML = "Opted Out"
    };
});




// Modal box implementation

// Get the modal
var modal = document.getElementById("modal-data");
var modalBtn = document.getElementById("button-footer-data"); // Change to opt-out later
var modalSpan = document.getElementsByClassName("modal-close")[0];


modalBtn.onclick = function() {
    modal.style.display = "block";
}

// Close the modal
modalSpan.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}