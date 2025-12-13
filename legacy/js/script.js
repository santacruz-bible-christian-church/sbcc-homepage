document.addEventListener('DOMContentLoaded', () => {
    /* Mobile Navigation */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });

    /* Scroll Sections Active Link */
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const sectionLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

            if (sectionLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    sectionLink.classList.add('active');
                } else {
                    sectionLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    /* Header Background on Scroll */
    function scrollHeader() {
        const header = document.getElementById('header');
        if (this.scrollY >= 50) {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; // Keep shadow or remove if preferred
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    }
    window.addEventListener('scroll', scrollHeader);

    /* Form Validation */
    const prayerForm = document.getElementById('prayer-form');
    const messageBox = document.getElementById('prayer-message-box');

    if (prayerForm) {
        prayerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const messageInput = document.getElementById('prayer-message');
            const messageValue = messageInput.value.trim();

            if (messageValue === '') {
                showMessage('Please enter your prayer request.', 'error');
                return;
            }

            // Simulate sending
            const submitBtn = prayerForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showMessage('Your prayer request has been received. We will be praying for you!', 'success');
                prayerForm.reset();
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;

                // Clear success message after 5 seconds
                setTimeout(() => {
                    messageBox.innerText = '';
                }, 5000);
            }, 1500);
        });
    }

    function showMessage(text, type) {
        messageBox.innerText = text;
        messageBox.className = 'form-message ' + type;
    }

    /* Scroll Reveal Animation */
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        // reset: true
    });

    // Note: Since we are using Vanilla JS and didn't include ScrollReveal library in HTML, 
    // we will implement a simple Intersection Observer instead for animations.

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation class to elements
    document.querySelectorAll('.section-title, .ministry-card, .announcement-card, .about-content, .contact-container').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add CSS class for animation via JS
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-fade-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
