document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Links (Bootstrap's ScrollSpy can handle this)
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Navigation Toggle (Bootstrap's Collapse takes care of this)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.navbar-collapse');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('collapse');
        });
    }

    // Typing Animation (if you want to use custom animation)
    const typingElements = document.querySelectorAll('.animate-typing');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.setAttribute('aria-label', text);
        
        let index = 0;
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100); // Adjust speed as needed
            }
        }
        type();
    });

    // Modal Functionality (Bootstrap's modal handling)
    const modal = new bootstrap.Modal(document.getElementById('modal'));
    const modalImage = document.getElementById('modal-image');
    const closeModalButton = document.getElementById('close-modal');

    document.querySelectorAll('.project-card img').forEach(image => {
        image.addEventListener('click', () => {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modal.show();
        });
    });

    closeModalButton.addEventListener('click', () => {
        modal.hide();
    });

    // Skill Level Animation (Bootstrap Progress Bar for skill levels)
    const skillElements = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                entry.target.style.width = level + '%';
            }
        });
    }, { threshold: 0.5 });

    skillElements.forEach(skill => observer.observe(skill));

    // Debounced Scroll Event for Header (no custom logic, just adding a class to header on scroll)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Form Validation (Leverage Bootstrap's built-in form validation)
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                form.classList.add('was-validated');
            }
        });
    }

    // Lazy Loading (Use IntersectionObserver for lazy loading images)
    if ('IntersectionObserver' in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        let lazyImages = document.querySelectorAll("img.lazy");
        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

