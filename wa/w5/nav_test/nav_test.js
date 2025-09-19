// Mobile UI button functionality
const navToggle = document.querySelector('.navbar-button');
const navMenu = document.querySelector('.navbar-menu');
const navBurger = document.querySelectorAll('.hamburger');

function toggleMenu() {
    var shown = navMenu.classList.toggle("show");
    navToggle.setAttribute("aria-expanded", shown);

    // Hamburger-to-X transition, animations handled in CSS
    navBurger.forEach(navBurger => navBurger.classList.toggle('x'))
}

navToggle.addEventListener('click', toggleMenu);