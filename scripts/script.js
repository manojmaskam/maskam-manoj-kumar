
// Animate particles in the certificates section
document.addEventListener('DOMContentLoaded', function () {
    const particles = document.querySelectorAll('.particle');

    // Position particles randomly
    particles.forEach(particle => {
        // Random size between 4px and 12px
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;

        // Random animation duration between 20s and 40s
        const duration = Math.random() * 20 + 20;
        particle.style.animation = `float ${duration}s linear infinite`;

        // Random delay for staggered animation
        particle.style.animationDelay = `-${Math.random() * 20}s`;
    });
});

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
});

// Update active nav link on scroll
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Set initial active link
    setActiveLink();

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        setActiveLink();
    });

    // Update active link on click
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            navLinks.forEach(lnk => lnk.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    function setActiveLink() {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        // First, check all sections
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Special case for contact section
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
            current = 'contact';
        }

        // If in education section but not scrolled to it yet
        const educationSection = document.getElementById('education');
        if (educationSection) {
            const educationTop = educationSection.offsetTop;
            const educationHeight = educationSection.offsetHeight;
            if (scrollPosition >= educationTop && scrollPosition < educationTop + educationHeight) {
                current = 'education';
            }
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href').substring(1); // Remove the '#'

            // Special handling for education section
            if (linkHref === 'education' && current === 'education') {
                link.classList.add('active');
            }
            // Regular section matching
            else if (linkHref === current) {
                link.classList.add('active');
            }
        });
    }
});