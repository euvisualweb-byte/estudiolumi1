document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Alto real del navbar fijo -> variable CSS (--nav-h) para que el video del hero no quede tapado
    const navContainer = navbar.querySelector('.nav-container');
    const setNavHeight = () => {
        const h = (navContainer ? navContainer.offsetHeight : navbar.offsetHeight) + 1; // +1 por el borde inferior
        document.documentElement.style.setProperty('--nav-h', h + 'px');
    };
    setNavHeight();
    window.addEventListener('resize', setNavHeight);
    window.addEventListener('load', setNavHeight);

    // Hero Carousel Logic (10 Projects)
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (slides.length && prevBtn && nextBtn && dotsContainer) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval;

    // Create dots dynamically
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });

        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlide(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlide(currentIndex);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    // Auto play carousel every 6 seconds
    function startInterval() {
        slideInterval = setInterval(nextSlide, 6000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    } // fin carrusel (solo en páginas que lo tienen)
    }

    startInterval();

    // Intersection Observer for scroll reveal animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal styles and observe
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
});
