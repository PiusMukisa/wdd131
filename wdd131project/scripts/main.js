// DOM Elements
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const header = document.querySelector('header');

// Dark Mode Toggle
modeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Update icon and text
  const icon = modeToggle.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    modeToggle.innerHTML = `${icon.outerHTML} Light Mode`;
    
    // Save preference
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    modeToggle.innerHTML = `${icon.outerHTML} Dark Mode`;
    
    // Save preference
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    const icon = modeToggle.querySelector('i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    modeToggle.innerHTML = `${icon.outerHTML} Light Mode`;
  }
  
  // Initialize animations for viewport elements
  initAnimations();
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger icon to X
  const hamburger = mobileMenuToggle.querySelector('.hamburger');
  hamburger.classList.toggle('active');
  
  if (hamburger.classList.contains('active')) {
    hamburger.style.transform = 'rotate(45deg)';
    hamburger.style.background = 'transparent';
    
    // Create X shape
    hamburger.style.setProperty('--before-transform', 'rotate(45deg)');
    hamburger.style.setProperty('--after-transform', 'rotate(-45deg)');
    hamburger.style.setProperty('--before-top', '0');
    hamburger.style.setProperty('--after-top', '0');
  } else {
    hamburger.style.transform = 'rotate(0)';
    hamburger.style.background = 'var(--dark-text)';
    
    // Reset to hamburger
    hamburger.style.setProperty('--before-transform', 'rotate(0)');
    hamburger.style.setProperty('--after-transform', 'rotate(0)');
    hamburger.style.setProperty('--before-top', '-8px');
    hamburger.style.setProperty('--after-top', '8px');
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('active') && 
      !navMenu.contains(e.target) && 
      !mobileMenuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    
    // Reset hamburger icon
    const hamburger = mobileMenuToggle.querySelector('.hamburger');
    hamburger.classList.remove('active');
    hamburger.style.transform = 'rotate(0)';
    hamburger.style.background = 'var(--dark-text)';
    hamburger.style.setProperty('--before-transform', 'rotate(0)');
    hamburger.style.setProperty('--after-transform', 'rotate(0)');
    hamburger.style.setProperty('--before-top', '-8px');
    hamburger.style.setProperty('--after-top', '8px');
  }
});

// Close mobile menu when window is resized larger
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    
    // Reset hamburger icon
    const hamburger = mobileMenuToggle.querySelector('.hamburger');
    hamburger.classList.remove('active');
    hamburger.style.transform = 'rotate(0)';
    hamburger.style.background = 'var(--dark-text)';
  }
});

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    header.style.height = '70px';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    header.style.height = 'auto';
  }
});

// Image Lazy Loading with Fade-in Animation
const lazyLoadImages = () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          
          img.onload = () => {
            img.style.transition = 'opacity 0.5s ease';
            img.style.opacity = '1';
          };
          
          img.src = img.getAttribute('data-src') || img.src;
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Initialize animations for elements when they enter viewport
function initAnimations() {
  // Select elements to animate
  const animationElements = document.querySelectorAll('.feature-card, .about-text, .about-image, .testimonial');
  
  if ('IntersectionObserver' in window) {
    const animationObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeIn 0.8s ease forwards';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    animationElements.forEach(element => {
      // Set initial opacity
      element.style.opacity = '0';
      animationObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    animationElements.forEach(element => {
      element.style.opacity = '1';
    });
  }
  
  // Initialize lazy loading for images
  lazyLoadImages();
}