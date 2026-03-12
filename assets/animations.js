// Brain Bee - Premium Animation System
// Smooth scroll animations, Intersection Observer, Scroll spy

(function() {
  'use strict';

  // ============ SMOOTH SCROLL ANIMATIONS ============
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation classes based on element type
        const el = entry.target;
        
        if (el.classList.contains('fade-in-up') === false) {
          el.classList.add('fade-in-up');
        }
        
        if (el.classList.contains('card') || el.classList.contains('-card')) {
          el.style.animation = 'fadeInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        }
        
        // Stop observing once animated
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  // Observe all cards and sections
  document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
      '.format-card, .timeline-item, .goal-card, .intro-card, .detail-card, .reward-item'
    );
    
    elementsToAnimate.forEach(el => {
      observer.observe(el);
    });
  });

  // ============ STAT COUNTER ANIMATION ============
  function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16); // ~60fps
    const startTime = Date.now();

    const counter = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(counter);
      }
      element.textContent = Math.floor(current).toLocaleString();
    }, 16);
  }

  // Animate stats on scroll into view
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector('.stat-number');
        if (statNumber && !statNumber.dataset.animated) {
          const text = statNumber.textContent.trim();
          const number = parseInt(text.replace(/[^0-9]/g, '')) || 0;
          
          if (number > 0) {
            animateCounter(statNumber, number);
            statNumber.dataset.animated = 'true';
            statObserver.unobserve(entry.target);
          }
        }
      }
    });
  }, { threshold: 0.5 });

  document.addEventListener('DOMContentLoaded', () => {
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => statObserver.observe(item));
  });

  // ============ HEADER SCROLL EFFECT ============
  const header = document.querySelector('header');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = scrollY;
  }, { passive: true });

  // ============ NAVIGATION SCROLL SPY ============
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section[id], div[id]');

  function updateActiveNav() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href')?.includes(currentSection)) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  document.addEventListener('DOMContentLoaded', updateActiveNav);

  // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ============ CTA BUTTON RIPPLE EFFECT ============
  const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.animation = 'ripple 0.6s ease-out';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============ MOBILE MENU TOGGLE ============
  function setupMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Check if menu button exists
    let menuButton = document.querySelector('.menu-toggle');
    if (!menuButton) {
      menuButton = document.createElement('button');
      menuButton.className = 'menu-toggle';
      menuButton.innerHTML = '☰';
      menuButton.setAttribute('aria-label', 'Toggle menu');
      header.appendChild(menuButton);
    }

    menuButton.addEventListener('click', () => {
      nav.classList.toggle('mobile-active');
      menuButton.classList.toggle('active');
    });

    // Close menu on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('mobile-active');
        menuButton.classList.remove('active');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', setupMobileMenu);

  console.log('✨ Brain Bee animations loaded successfully!');
})();
