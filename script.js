// Declare navLinks once at the top
const navLinks = document.querySelectorAll('.nav-links a'); // Get all navigation links

// Smooth scroll for navigation links
navLinks.forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href'); // Get the target section ID
    // Let cross-page links (e.g. "index.html#about" on sub-pages) navigate normally
    if (!targetId || !targetId.startsWith('#')) {
      return;
    }
    // On mobile the "Projects" parent toggles its submenu instead of scrolling
    if (this.classList.contains('dropbtn') && window.matchMedia('(max-width: 768px)').matches) {
      return;
    }
    e.preventDefault(); // Prevent default anchor behavior
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
    card.style.display = ''; // Show all projects
  });
  activeCategoryText.textContent = ''; // Clear the active category
}

function filterProjects(categoryId) {
  projectCards.forEach(card => {
    const categories = card.getAttribute('data-category')?.split(' ') || [];
    if (categories.includes(categoryId)) {
      card.style.display = ''; // Show matching project
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

// Mobile hamburger menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinksList = document.querySelector('.nav-links');

if (menuToggle && navLinksList) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('active');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the menu after tapping a link (submenu parent handled separately)
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (link.classList.contains('dropbtn')) return;
      navLinksList.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const dropdown = navLinksList.querySelector('.dropdown');
      if (dropdown) dropdown.classList.remove('open');
    });
  });

  // Tap-to-open Projects submenu on touch screens
  const dropBtn = navLinksList.querySelector('.dropbtn');
  const dropdown = navLinksList.querySelector('.dropdown');
  if (dropBtn && dropdown) {
    dropBtn.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        dropdown.classList.toggle('open');
      }
    });
  }

  // Close the menu with the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navLinksList.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ===== Aerospace interactive layer (progressive enhancement) =====
(function aerospaceLayer() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1. Scroll progress bar + rocket back-to-top */
  const progressBar = document.getElementById('scroll-progress');
  const toTop = document.getElementById('to-top');

  function onScrollChrome() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progressBar) progressBar.style.width = pct.toFixed(2) + '%';
    if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScrollChrome, { passive: true });
  onScrollChrome();

  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* 2. Starfield canvas in hero (twinkle + occasional shooting star) */
  const canvas = document.getElementById('starfield');
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext('2d');
    const hero = document.getElementById('hero');
    let stars = [];
    let shooting = null;
    let running = true;
    let w = 0, h = 0;

    function resize() {
      const rect = hero.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(160, Math.floor((w * h) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 1.2,
        teal: Math.random() < 0.22
      }));
    }

    function maybeShoot(t) {
      if (!shooting && Math.random() < 0.004) {
        shooting = {
          x: Math.random() * w * 0.7 + w * 0.2,
          y: Math.random() * h * 0.3,
          vx: -(4 + Math.random() * 3),
          vy: 2 + Math.random() * 1.5,
          life: 1
        };
      }
    }

    function frame(t) {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      for (const s of stars) {
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(time * s.speed + s.phase));
        ctx.globalAlpha = tw * 0.85;
        ctx.fillStyle = s.teal ? '#64ffda' : '#ccd6f6';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      maybeShoot(t);
      if (shooting) {
        const grad = ctx.createLinearGradient(
          shooting.x, shooting.y,
          shooting.x + 70, shooting.y - 35
        );
        grad.addColorStop(0, 'rgba(100,255,218,0.9)');
        grad.addColorStop(1, 'rgba(100,255,218,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shooting.x, shooting.y);
        ctx.lineTo(shooting.x + 70, shooting.y - 35);
        ctx.stroke();
        shooting.x += shooting.vx;
        shooting.y += shooting.vy;
        shooting.life -= 0.02;
        if (shooting.life <= 0 || shooting.x < -90 || shooting.y > h + 40) shooting = null;
      }
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    // Pause when hero is off-screen or tab hidden
    if ('IntersectionObserver' in window && hero) {
      new IntersectionObserver((entries) => {
        const visible = entries[0].isIntersecting && document.visibilityState === 'visible';
        if (visible && !running) { running = true; requestAnimationFrame(frame); }
        else if (!visible) running = false;
      }).observe(hero);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !running) {
        const r = hero.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) { running = true; requestAnimationFrame(frame); }
      } else running = false;
    });
    requestAnimationFrame(frame);
  }

  /* 3. Simulated avionics telemetry ticker */
  const teleAlt = document.getElementById('tele-alt');
  if (teleAlt && !reduceMotion) {
    const teleVspd = document.getElementById('tele-vspd');
    const teleMach = document.getElementById('tele-mach');
    const teleHdg = document.getElementById('tele-hdg');
    let alt = 2682, hdg = 42, t = 0;
    setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      t += 1;
      const climb = Math.sin(t / 6) * 4 + (Math.random() - 0.5) * 2;
      alt = Math.max(2400, Math.min(2950, alt + climb));
      const vspd = climb * 2.4;
      const mach = 0.78 + Math.sin(t / 9) * 0.05 + Math.random() * 0.004;
      hdg = (hdg + (Math.random() - 0.45) * 0.8 + 360) % 360;
      teleAlt.textContent = Math.round(alt).toLocaleString('en-US') + ' m';
      if (teleVspd) teleVspd.textContent = (vspd >= 0 ? '+' : '') + vspd.toFixed(1) + ' m/s';
      if (teleMach) teleMach.textContent = mach.toFixed(2);
      if (teleHdg) teleHdg.textContent = String(Math.round(hdg)).padStart(3, '0') + '°';
    }, 900);
  }

  /* 4. Count-up flight stats */
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    const fmt = (val, suffix) => {
      const num = Math.round(val).toLocaleString('en-US');
      return num + (suffix || '');
    };
    const animate = (el) => {
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = fmt(target, suffix); return; }
      const dur = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(target * eased, suffix);
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const seen = new WeakSet();
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !seen.has(e.target)) {
          seen.add(e.target);
          animate(e.target);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => obs.observe(c));
  }

  /* 5. Animate skill bars on scroll */
  const bars = document.querySelectorAll('.skill .progress');
  if (bars.length) {
    bars.forEach((b) => {
      b.dataset.target = b.style.width || '80%';
      b.style.width = '0%';
    });
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.width = e.target.dataset.target;
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.35 });
      bars.forEach((b) => obs.observe(b));
    } else {
      bars.forEach((b) => { b.style.width = b.dataset.target; });
    }
  }

  /* 6. Reveal-on-scroll for cards, timeline, skills, posts */
  const revealSel = '.project-card, .timeline-content, .skill, .blog-post';
  const revealEls = document.querySelectorAll(revealSel);
  if (revealEls.length && !reduceMotion && 'IntersectionObserver' in window) {
    revealEls.forEach((el) => el.classList.add('reveal'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach((el) => obs.observe(el));
  }

  /* 7. Gentle 3D tilt on project cards (fine pointers only) */
  if (!reduceMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.project-card').forEach((card) => {
      card.classList.add('tilt');
      let raf = null;
      card.addEventListener('mousemove', (e) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            'perspective(900px) rotateY(' + (px * 4).toFixed(2) + 'deg)' +
            ' rotateX(' + (-py * 4).toFixed(2) + 'deg) translateX(4px)';
          raf = null;
        });
      });
      card.addEventListener('mouseleave', () => {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
        card.style.transform = '';
      });
    });
  }
})();