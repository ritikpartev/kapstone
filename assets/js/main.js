// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        body.style.overflow = 'auto';
    } else {
        mobileMenu.style.display = 'block';
        body.style.overflow = 'hidden';
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        mobileMenu.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Simple Active Navigation - No manual mapping needed!
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove all existing active states
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active-nav');
    });
    
    // Find and activate matching navigation links
    document.querySelectorAll('.nav-link[href]').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active-nav');
        }
    });
}

// Initialize active navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavigation();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section, .content-section, .usp-card, .tech-project-card');
    sections.forEach(section => observer.observe(section));
});