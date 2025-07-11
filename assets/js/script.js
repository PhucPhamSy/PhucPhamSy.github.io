// assets/js/script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Smooth scrolling for navigation links & Active Nav Highlighting ---
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight; // Get header height for scroll offset

    // Smooth scroll on click
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - headerHeight - 10, // Adjust for fixed header and add a small buffer
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for highlighting active section in nav
    const observerOptions = {
        root: null, // viewport
        // rootMargin: '-50% 0px -50% 0px', // This threshold is for centering
        rootMargin: `-${headerHeight + 1}px 0px 0px 0px`, // Adjust rootMargin to consider header height for top of viewport
        threshold: 0 // Observe as soon as any part of the section enters the rootMargin
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Check if the section is currently intersecting the top of the viewport
            // and is the first section from the top that is intersecting
            if (entry.isIntersecting && entry.intersectionRect.top <= headerHeight + 1) { // Check if section is at or above header level
                const currentSectionId = '#' + entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === currentSectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Fallback for when scrolling very fast or at the very top of the page
        const firstSection = document.getElementById('about');
        if (window.scrollY < firstSection.offsetTop - headerHeight - 10) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('nav ul li a[href="#about"]').classList.add('active');
        }
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Dark Mode Toggle Logic ---
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    // Function to set theme
    // `isLightMode` is true if we want light mode, false if we want dark mode
    function setTheme(isLightMode) {
        if (isLightMode) {
            body.classList.add('light-mode'); // Add light-mode class
            darkModeToggle.textContent = '☀️'; // Sun icon for light mode
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode'); // Remove light-mode class (default is dark)
            darkModeToggle.textContent = '🌙'; // Moon icon for dark mode
            localStorage.setItem('theme', 'dark');
        }
    }

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        setTheme(true); // Apply light mode if saved
    } else {
        setTheme(false); // Default to dark mode or apply saved dark mode
    }

    // Add event listener for toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            // Toggle theme based on current state: if body has light-mode, switch to dark (false), else switch to light (true)
            setTheme(body.classList.contains('light-mode') ? false : true);
        });
    }

    // --- Typing Effect for Name (h1) ---
    const nameElement = document.querySelector('.profile-info h1'); // Target the h1 inside .profile-info
    if (nameElement) { // Check if the element exists
        const nameText = nameElement.textContent; // Store original text
        nameElement.textContent = ''; // Clear text for typing effect

        let i = 0;
        function typeWriter() {
            if (i < nameText.length) {
                nameElement.textContent += nameText.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Typing speed
            }
        }
        // Start typing effect when DOM is ready
        typeWriter();
    }
});