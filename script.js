// Declare navLinks once at the top
const navLinks = document.querySelectorAll('.nav-links a'); // Get all navigation links

// Smooth scroll for navigation links
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = this.getAttribute('href'); // Get the target section ID
    const targetSection = document.querySelector(targetId); // Find the target section
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
    }
  });
});

// Highlight active link on scroll
const sections = document.querySelectorAll('section'); // Get all sections

window.addEventListener('scroll', () => {
  let current = ''; // Variable to store the current section ID

  // Loop through each section to find the one in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop; // Top position of the section
    const sectionHeight = section.clientHeight; // Height of the section
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id'); // Set the current section ID
    }
  });

  // Loop through each navigation link to highlight the active one
  navLinks.forEach(link => {
    link.classList.remove('active'); // Remove the active class from all links
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active'); // Add the active class to the current link
    }
  });
});

// Filter and highlight projects by category
const projectCategories = document.querySelectorAll('.dropdown-content a');
const projectCards = document.querySelectorAll('.project-card');
const myProjectsLink = document.querySelector('.dropbtn'); // "My Projects" link
const activeCategoryText = document.getElementById('active-category');

function resetProjects() {
  projectCards.forEach(card => {
    card.style.display = 'block'; // Show all projects
  });
  activeCategoryText.textContent = ''; // Clear the active category
}

function filterProjects(categoryId) {
  projectCards.forEach(card => {
    const categories = card.getAttribute('data-category')?.split(' ') || [];
    if (categories.includes(categoryId)) {
      card.style.display = 'block'; // Show matching project
    } else {
      card.style.display = 'none'; // Hide non-matching project
    }
  });
}

projectCategories.forEach(category => {
  category.addEventListener('click', function(e) {
    e.preventDefault();
    const categoryId = this.getAttribute('href'); // e.g., "#rocketry"
    const categoryName = this.textContent; // e.g., "Rocketry"

    filterProjects(categoryId);

    // Update active category display
    activeCategoryText.innerHTML = `Current Category: ${categoryName} <span style="color: gray; font-weight: normal;">[Click on Projects to reset view]</span>`;

    // Scroll to projects
    const targetSection = document.querySelector('#projects');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});




// Add event listener to "My Projects" link to reset highlights
myProjectsLink.addEventListener('click', function (e) {
  e.preventDefault(); // Prevent default anchor behavior
  const targetSection = document.querySelector('#projects'); // Get the projects section
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the projects section
  }
  resetProjects(); // Reset all projects to default
});

// Typing Effect for Hero Section
const typedText = document.getElementById('typed-text');
const cursor = document.getElementById('cursor');
const text = "Hi, I'm Manish Tajpuriya"; // Replace with your name
let index = 0;

function type() {
  if (index < text.length) {
    typedText.textContent += text.charAt(index);
    index++;
    setTimeout(type, 100); // Adjust typing speed (100ms per character)
  } else {
    cursor.style.display = 'none'; // Hide cursor after typing is done
  }
}

type(); // Start the typing effect

// Hide Loading Animation
window.addEventListener('load', () => {
  const loading = document.getElementById('loading');
  loading.style.display = 'none';
});

// Combined modal handling in one clean function
function handleModalActions() {
  // 1. Open modal handler
  document.querySelectorAll('.learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('href');
      document.querySelector(modalId).style.display = 'flex';
    });
  });

  // 2. Universal close handler (all methods)
  document.addEventListener('click', function(e) {
    // Case 1: Close button clicked
    if (e.target.closest('.close-modal')) {
      e.preventDefault();
      e.stopPropagation(); // Prevent other handlers
      closeAllModals();
    }
    // Case 2: Modal overlay clicked
    else if (e.target.classList.contains('modal')) {
      closeAllModals();
    }
    // Case 3: Contact link clicked inside modal
    else if (e.target.closest('a[href="#contact"]')) {
      e.preventDefault();
      closeAllModals();
      scrollToContact();
    }
  });

  // 3. ESC key handler
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}

// Helper function to close all modals
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.style.display = 'none';
  });
}

// Helper function to scroll to contact
function scrollToContact() {
  setTimeout(() => {
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
  }, 10);
}

// Initialize all modal functionality
handleModalActions();

// Initialize Swiper with autoplay for all carousels
document.addEventListener('DOMContentLoaded', function() {
  const swipers = document.querySelectorAll('.swiper');
  
  swipers.forEach((swiperEl) => {
    new Swiper(swiperEl, {
      // Core parameters
      loop: true,
      autoplay: {
        delay: 1000,       // 3 second slide duration
        pauseOnMouseEnter: true,  // Pauses on hover
        disableOnInteraction: false // Continues after user interaction
      },
      
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      
      // Pagination dots
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      
      // Optional enhancements
      speed: 500,          // Transition speed (ms)
      effect: 'slide',      // 'fade' or 'cube' for different effects
      grabCursor: true      // Shows hand cursor on hover
    });
  });
});

document.querySelector('.btn').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default anchor behavior
  const projectsSection = document.getElementById('projects');
  projectsSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
});

function toggleSemester(id) {
  const element = document.getElementById(id);
  element.style.display = (element.style.display === "none" || element.style.display === "") ? "block" : "none";
}