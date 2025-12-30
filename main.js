// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Mobile dropdown toggle
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
        }
    });
});

// Scroll animations - Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Optional: Add active state to nav links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Newsletter form handling (you can replace this with your actual form submission logic)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Add your newsletter signup logic here
        // For now, just show an alert
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        e.target.reset();
    });
}

// Flying Bird Animation - Continuous scroll-based diagonal flight
const flyingBird = document.querySelector('.flying-bird');
const windowWidth = window.innerWidth;

function updateBirdPosition() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate how far through the page we are
    const scrollProgress = scrollPosition / (documentHeight - windowHeight);
    
    // Determine which "leg" of the journey (back and forth)
    // Each complete journey (left-to-right OR right-to-left) = 20% of page scroll
    const cycleProgress = (scrollProgress * 5) % 1; // 0 to 1 for current journey
    const cycleNumber = Math.floor(scrollProgress * 5); // Which journey we're on
    
    // Determine direction (even = left-to-right, odd = right-to-left)
    const isLeftToRight = cycleNumber % 2 === 0;
    
    // Calculate horizontal position (-20% to 120% to ensure fully off-screen)
    let horizontalPosition;
    if (isLeftToRight) {
        // Flying left to right
        horizontalPosition = -20 + (cycleProgress * 140);
        flyingBird.classList.remove('flipped');
    } else {
        // Flying right to left
        horizontalPosition = 120 - (cycleProgress * 140);
        flyingBird.classList.add('flipped');
    }
    
    // Calculate vertical position (moves down gradually as you scroll)
    const verticalPosition = 15 + (scrollProgress * 60); // 15% to 75% of viewport
    
    // Apply position
    flyingBird.style.left = horizontalPosition + '%';
    flyingBird.style.top = verticalPosition + '%';
    
    // Add slight bobbing with scroll
    const bobOffset = Math.sin(scrollPosition * 0.01) * 10;
    flyingBird.style.transform = `translateY(${bobOffset}px)`;
}

// Update bird position on scroll
window.addEventListener('scroll', updateBirdPosition);

// Initial position
updateBirdPosition();