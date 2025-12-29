// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
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

// Flying Bird Animation - Scroll-based with direction changes
const flyingBird = document.querySelector('.flying-bird');
let birdDirection = 1; // 1 = left to right, -1 = right to left
let lastDirectionChange = Date.now();

function updateBirdPosition() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show bird after scrolling 10% down the page
    if (scrollPosition > windowHeight * 0.1) {
        // Calculate vertical position based on scroll (moves down as you scroll)
        const scrollProgress = scrollPosition / (documentHeight - windowHeight);
        const verticalPosition = 15 + (scrollProgress * 70); // 15% to 85% of viewport height
        
        // Calculate horizontal position based on scroll and direction
        const horizontalProgress = (scrollPosition % 2000) / 2000; // Creates back and forth motion
        let horizontalPosition;
        
        if (birdDirection === 1) {
            // Moving left to right
            horizontalPosition = horizontalProgress * 100;
        } else {
            // Moving right to left
            horizontalPosition = 100 - (horizontalProgress * 100);
        }
        
        // Apply position
        flyingBird.style.left = horizontalPosition + '%';
        flyingBird.style.top = verticalPosition + '%';
        
        // Check if it's time to flip direction (every 3 seconds)
        const currentTime = Date.now();
        if (currentTime - lastDirectionChange > 3000) {
            birdDirection *= -1; // Flip direction
            lastDirectionChange = currentTime;
            
            // Toggle flipped class for image flip
            if (birdDirection === -1) {
                flyingBird.classList.add('flipped');
            } else {
                flyingBird.classList.remove('flipped');
            }
        }
    }
}

// Update bird position on scroll
window.addEventListener('scroll', updateBirdPosition);

// Also update on interval to handle direction changes when not scrolling
setInterval(updateBirdPosition, 100);