// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Add active class to navigation items on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const headerHeight = document.querySelector('header').offsetHeight; // Lấy chiều cao của header

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Adjust offset based on header height for accurate highlighting
        if (window.pageYOffset >= sectionTop - headerHeight - 10) { // Thêm 10px buffer
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add animation to sections when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            // Optionally, unobserve after animation to save resources
            // observer.unobserve(entry.target); 
        } else {
            // Optional: remove animate class when out of view (for repeated animations)
            // entry.target.classList.remove('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add typing effect to name
const nameElement = document.querySelector('h1');
const nameText = nameElement.textContent; // Store original text
nameElement.textContent = ''; // Clear text for typing effect

let i = 0;
function typeWriter() {
    if (i < nameText.length) {
        nameElement.textContent += nameText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Dark mode toggle logic
const darkModeToggle = document.querySelector('.dark-mode-toggle');

// Function to set dark mode state
const setDarkMode = (isEnabled) => {
    if (isEnabled) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
};

// Check for dark mode preference on load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }
    typeWriter(); // Start typing effect when DOM is ready
});

// Toggle dark mode on button click
darkModeToggle.addEventListener('click', () => {
    const isDarkModeEnabled = document.body.classList.contains('dark-mode');
    setDarkMode(!isDarkModeEnabled);
});