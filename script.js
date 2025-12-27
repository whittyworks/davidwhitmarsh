// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section, .experience-item, .skill-category, .highlight-card, .feature-card, .topic-card');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add subtle parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    const scrolled = window.pageYOffset;
    if (hero && scrolled < 600) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// Download button handler
const downloadButtons = document.querySelectorAll('.download-btn, .contact-btn.secondary[href="#"]');
downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // If no actual href is set, prevent default and show message
        if (button.getAttribute('href') === '#') {
            e.preventDefault();
            alert('Please upload your resume PDF and update the link in the HTML file.');
        }
    });
});

// Newsletter subscription form handler
const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = subscribeForm.querySelector('input[type="email"]').value;
        
        // Here you would normally send to your email service
        // For now, just show a success message
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        subscribeForm.reset();
    });
}

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    if (window.innerWidth <= 768) {
        // Add mobile menu functionality here if needed
    }
};

window.addEventListener('resize', createMobileMenu);
document.addEventListener('DOMContentLoaded', createMobileMenu);