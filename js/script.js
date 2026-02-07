// Fix image paths - try multiple formats if first fails
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg && profileImg.src.includes('placeholder')) {
        // If still using placeholder, try to load actual image
        const tryPaths = [
            'aset/jiangyan.jpg',
            './aset/jiangyan.jpg'
        ];
        
        let pathIndex = 0;
        const tryNextPath = () => {
            if (pathIndex < tryPaths.length) {
                profileImg.src = tryPaths[pathIndex];
                pathIndex++;
            }
        };
        
        profileImg.onerror = tryNextPath;
        tryNextPath();
    }
});

// Animate skill bars on page load
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    
    // Add delay for each skill bar to create staggered effect
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            // Get target width from CSS variable
            const computedStyle = window.getComputedStyle(bar);
            const targetWidth = computedStyle.getPropertyValue('--target-width').trim();
            
            if (targetWidth) {
                // Set width directly to trigger CSS transition
                bar.style.width = targetWidth;
            } else {
                // Fallback: try to get width from inline style
                const inlineWidth = bar.style.width;
                if (inlineWidth && inlineWidth !== '0%') {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = inlineWidth;
                    }, 100);
                }
            }
        }, 300 + (index * 80)); // Start after 300ms, stagger by 80ms per bar
    });
});

// Navigation Menu Toggle (Mobile)
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Adjust offset based on section (home needs more space)
                const sectionId = target.getAttribute('id');
                const offset = sectionId === 'home' ? 100 : 90; // Extra space for home section
                const offsetTop = target.offsetTop - offset;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id], div[id="home"], div[id="skills"], div[id="projects"], div[id="games"], div[id="services"]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    function highlightActiveSection() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        highlightActiveSection();
    });
    
    // Initial highlight
    highlightActiveSection();
});

// Audio Background Control
document.addEventListener('DOMContentLoaded', function() {
    const audioControl = document.getElementById('audioControl');
    const backgroundAudio = document.getElementById('backgroundAudio');
    const audioIcon = document.getElementById('audioIcon');
    const audioText = document.getElementById('audioText');
    
    // Load saved audio state
    const savedMuted = localStorage.getItem('audioMuted') === 'true';
    
    if (backgroundAudio && audioControl) {
        // Set initial state
        if (savedMuted) {
            backgroundAudio.muted = true;
            audioControl.classList.add('muted');
            audioIcon.classList.remove('fa-volume-up');
            audioIcon.classList.add('fa-volume-mute');
            audioText.textContent = 'Sound Off';
        } else {
            // Try to play audio (will fail if user hasn't interacted)
            backgroundAudio.volume = 0.3; // Set volume to 30%
            backgroundAudio.muted = false;
        }
        
        // Toggle audio on click
        audioControl.addEventListener('click', function() {
            if (backgroundAudio.muted) {
                // Unmute
                backgroundAudio.muted = false;
                audioControl.classList.remove('muted');
                audioIcon.classList.remove('fa-volume-mute');
                audioIcon.classList.add('fa-volume-up');
                audioText.textContent = 'Sound On';
                localStorage.setItem('audioMuted', 'false');
                
                // Try to play (may require user interaction)
                backgroundAudio.play().catch(err => {
                    console.log('Audio play failed:', err);
                });
            } else {
                // Mute
                backgroundAudio.muted = true;
                audioControl.classList.add('muted');
                audioIcon.classList.remove('fa-volume-up');
                audioIcon.classList.add('fa-volume-mute');
                audioText.textContent = 'Sound Off';
                localStorage.setItem('audioMuted', 'true');
            }
        });
        
        // Auto-play on first user interaction
        let hasInteracted = false;
        const enableAudio = () => {
            if (!hasInteracted && !savedMuted) {
                backgroundAudio.play().catch(err => {
                    console.log('Auto-play prevented:', err);
                });
                hasInteracted = true;
            }
        };
        
        // Listen for any user interaction
        document.addEventListener('click', enableAudio, { once: true });
        document.addEventListener('keydown', enableAudio, { once: true });
        document.addEventListener('touchstart', enableAudio, { once: true });
    }
});

// Random quote rotation (optional)
const quotes = [
    {
        text: "Just survive",
        author: "— Me, probably"
    },
    {
        text: "Enjoy aja",
        author: "— Unknown"
    },
    {
        text: "The best code is the code you don't have to write.",
        author: "— AI-Assisted Developer"
    }
];

// Uncomment untuk auto-rotate quotes setiap hari
// const quoteBox = document.querySelector('.quote-box blockquote');
// const quoteAuthor = document.querySelector('.quote-box p');
// const today = new Date().getDate();
// const selectedQuote = quotes[today % quotes.length];
// quoteBox.textContent = `"${selectedQuote.text}"`;
// quoteAuthor.textContent = selectedQuote.author;

