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

// Function to reset all projects to default (no highlight)
function resetProjects() {
  projectCards.forEach(card => {
    card.classList.remove('highlight'); // Remove highlight class
  });
}

// Function to highlight projects based on category
function highlightProjects(categoryId) {
  projectCards.forEach(card => {
    if (card.getAttribute('data-category') === categoryId) {
      card.classList.add('highlight'); // Add highlight class
    } else {
      card.classList.remove('highlight'); // Remove highlight class
    }
  });
}

// Add event listeners to dropdown categories
projectCategories.forEach(category => {
  category.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const categoryId = this.getAttribute('href'); // Get the category ID (e.g., #hypersonics)
    const targetSection = document.querySelector('#projects'); // Get the projects section
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' }); // Scroll to the projects section
    }
    highlightProjects(categoryId); // Highlight projects for the selected category
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