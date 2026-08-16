document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Simple mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        // In a full implementation, this would open a mobile sidebar or dropdown
        alert('Mobile menu clicked - This would open a mobile navigation drawer.');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple hero image 3D tilt effect on mousemove for desktop
    const heroImageWrapper = document.querySelector('.hero-image-wrapper');
    if (heroImageWrapper && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            heroImageWrapper.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset on mouse leave window
        document.addEventListener('mouseleave', () => {
            heroImageWrapper.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(2deg)';
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // Consultation Modal Logic
    const modal = document.getElementById('consultationModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const consultationForm = document.getElementById('consultationForm');
    const ctaButtons = document.querySelectorAll('.btn-primary');

    if (modal && closeModalBtn && consultationForm) {
        // Open modal on click
        ctaButtons.forEach(btn => {
            if (btn.textContent.trim().toLowerCase().includes('consult')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    modal.classList.add('active');
                });
            }
        });

        // Close modal on X click
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Handle form submission and redirect to Calendly
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // In a real application, you would capture this data and send it to your backend/CRM
            const name = document.getElementById('modalName').value;
            const email = document.getElementById('modalEmail').value;
            
            // Redirect to Calendly (Replace with your actual Calendly link)
            // You can also pass parameters to calendly via URL if needed
            const calendlyUrl = "https://calendly.com/"; 
            
            // Show a brief loading state on the button
            const submitBtn = consultationForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = "Redirecting...";
            
            setTimeout(() => {
                window.location.href = calendlyUrl;
            }, 500);
        });
    }

    // Scroll Animations Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible if you only want it to animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to all elements with the animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });
});
