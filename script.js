document.addEventListener('DOMContentLoaded', function() {
    // Navigation scroll effect
    handleNavScroll();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Initialize skill progress bars
    initSkillProgressBars();
});

function handleNavScroll() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Add index to nav items for staggered animation
    navItems.forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Toggle menu icon
        const menuIcon = menuToggle.querySelector('i');
        if (menuIcon.classList.contains('fa-bars')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking on a link
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const menuIcon = menuToggle.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const menuIcon = menuToggle.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
    
    // Hide menu toggle on desktop
    function handleScreenSizeChange() {
        if (window.innerWidth >= 769) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const menuIcon = menuToggle.querySelector('i');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    }
    
    window.addEventListener('resize', handleScreenSizeChange);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the form data to a server
        // For now, we'll just show an alert
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}

// Initialize skill progress bars function
function initSkillProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    // Create intersection observer for progress bars
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when in viewport
                entry.target.style.width = entry.target.classList.contains('expert') ? '100%' : 
                                         entry.target.classList.contains('intermediate') ? '70%' : '30%';
                
                // Stop observing after animation
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Set initial width to 0 and observe each progress bar
    progressBars.forEach(bar => {
        bar.style.width = '0';
        progressObserver.observe(bar);
    });
}

// Video lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('video');
    
    // Intersection Observer to load videos when they come into view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                const src = source.getAttribute('src');
                
                if (src && !video.getAttribute('data-loaded')) {
                    video.load();
                    video.setAttribute('data-loaded', 'true');
                    videoObserver.unobserve(video);
                }
            }
        });
    }, { threshold: 0.1 });
    
    videos.forEach(video => {
        videoObserver.observe(video);
        
        // Add play/pause on click functionality
        video.addEventListener('click', function(e) {
            e.preventDefault();
            if (video.paused) {
                // Pause all other videos first
                videos.forEach(v => {
                    if (v !== video && !v.paused) {
                        v.pause();
                    }
                });
                video.play();
            } else {
                video.pause();
            }
        });
    });
});

// Add animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.skill-card, .service-card, .work-item, .about-image');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a slight delay for staggered animation effect
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, 100 * Array.from(animatedElements).indexOf(entry.target) % 3);
                elementObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    
    animatedElements.forEach(element => {
        elementObserver.observe(element);
    });
});