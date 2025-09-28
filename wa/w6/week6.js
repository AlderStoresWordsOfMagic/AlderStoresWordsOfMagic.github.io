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
detLocToggle.addEventListener('click', toggleDetLoc);


// Filter for past games, select a date range and show only games in that range
const pastEvents = document.querySelectorAll('.grid-layout-events-past-event');
const filterPastEvents = document.querySelector('#grid-layout-events-past-filter');

function displayPastEvents() {
    pastEvents.forEach(element => {
        element.style.display = (element.getAttribute('data-number') == filterPastEvents.valueAsNumber) ? "block" : "none"
    });
}
filterPastEvents.addEventListener('input', displayPastEvents)