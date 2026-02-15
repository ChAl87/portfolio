document.addEventListener('DOMContentLoaded', () => {
    // ==============================================
    // DOM Elements
    // ==============================================
    const header = document.querySelector('.header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a'); // Updated selector
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // ==============================================
    // Mobile Menu Toggle
    // ==============================================
    hamburger.addEventListener('click', () => {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active'); // Added for CSS animation hooks if needed
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.classList.remove('active');
        }
    });

    // ==============================================
    // Header Scroll Effect (Glassmorphism)
    // ==============================================
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    // ==============================================
    // Card Glow Effect (Mouse Tracking)
    // ==============================================
    const cards = document.querySelectorAll('.skill-card, .project-card, .btn-primary');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ==============================================
    // Scroll Animations (Intersection Observer)
    // ==============================================
    const observerOptions = {
        root: null,
        threshold: 0.15, // Slightly higher threshold for better effect
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ==============================================
    // Smooth Scrolling & Focus Management
    // ==============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add logo to smooth scroll handling explicitly if not already covered
    const logoLink = document.querySelector('.logo a');
    
    const handleSmoothScroll = (e, anchor) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        
        if (targetId === '#home' || targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            return;
        }
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            
            // Accessibility: Set focus to the section
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus({preventScroll: true});
        }
    };

    smoothScrollLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => handleSmoothScroll(e, anchor));
    });
});
