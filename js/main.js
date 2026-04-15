// ========================================
// Portfolio Website - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    ThemeToggle.init();
    Navigation.init();
    TypedText.init();
    Skills.init();
    PortfolioFilter.init();
    ContactForm.init();
    ScrollAnimations.init();
    ScrollToTop.init();
    Testimonials.init();
});

// ========================================
// Theme Toggle Module
// ========================================
const ThemeToggle = {
    init() {
        this.button = document.getElementById('themeToggle');
        this.html = document.documentElement;

        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.html.setAttribute('data-theme', savedTheme);

        this.button.addEventListener('click', () => this.toggle());
    },

    toggle() {
        const currentTheme = this.html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
};

// ========================================
// Navigation Module
// ========================================
const Navigation = {
    init() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.setupEventListeners();
        this.setupScrollSpy();
    },

    setupEventListeners() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.navToggle.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navToggle.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    },

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveLink(id);
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => observer.observe(section));
    },

    updateActiveLink(id) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }
};

// ========================================
// Typed Text Effect
// ========================================
const TypedText = {
    init() {
        this.element = document.querySelector('.typed-text');
        if (!this.element) return;

        this.texts = [
            'Web Developer',
            'WordPress Developer',
            'Front End Developer'
        ];
        this.currentIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseSpeed = 2000;

        this.type();
    },

    type() {
        const currentText = this.texts[this.currentIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let speed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            speed = this.pauseSpeed;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), speed);
    }
};

// ========================================
// Skills Animation
// ========================================
const Skills = {
    init() {
        this.skills = document.querySelectorAll('.progress');
        this.setupObserver();
    },

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target;
                    const value = progress.dataset.progress;
                    progress.style.width = value + '%';
                    observer.unobserve(progress);
                }
            });
        }, { threshold: 0.5 });

        this.skills.forEach(skill => observer.observe(skill));
    }
};

// ========================================
// Portfolio Filter
// ========================================
const PortfolioFilter = {
    init() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.items = document.querySelectorAll('.portfolio-item');

        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filter(button.dataset.filter));
        });
    },

    filter(category) {
        // Update active button
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-filter="${category}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        // Filter items with animation
        this.items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.classList.add('hidden');
            }
        });
    }
};

// ========================================
// Contact Form
// ========================================
const ContactForm = {
    init() {
        this.form = document.getElementById('contactForm');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    },

    handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);

        // Here you would typically send to a backend
        // For now, just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        this.form.reset();
    }
};

// ========================================
// Scroll Animations
// ========================================
const ScrollAnimations = {
    init() {
        this.elements = document.querySelectorAll('.section-title, .timeline-item, .service-card, .portfolio-card');
        this.setupObserver();
    },

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
};

// ========================================
// Scroll to Top Button
// ========================================
const ScrollToTop = {
    init() {
        this.button = document.getElementById('scrollToTop');
        if (!this.button) return;

        window.addEventListener('scroll', () => this.onScroll());
        this.button.addEventListener('click', () => this.scrollToTop());
    },

    onScroll() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// ========================================
// Testimonials Carousel
// ========================================
const Testimonials = {
    init() {
        this.container = document.querySelector('.testimonials-container');
        this.wrapper = document.querySelector('.testimonials-wrapper');
        this.dotsContainer = document.querySelector('.testimonials-dots');
        this.prevBtn = document.querySelector('.testimonial-prev');
        this.nextBtn = document.querySelector('.testimonial-next');
        this.cards = document.querySelectorAll('.testimonial-card');

        if (!this.wrapper || this.cards.length === 0) return;

        this.currentIndex = 0;
        this.initCarousel();
    },

    initCarousel() {
        // Ensure wrapper is properly sized
        this.wrapper.style.width = '100%';
        this.wrapper.style.transform = 'translateX(0%)';

        // Setup dots
        this.setupDots();

        // Setup event listeners
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Auto-play
        setInterval(() => this.next(), 5000);
    },

    setupDots() {
        this.cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('button');
        this.updateDots();
    },

    goToSlide(index) {
        this.currentIndex = index;
        const translateValue = `translateX(-${this.currentIndex * 100}%)`;
        this.wrapper.style.transform = translateValue;
        this.updateDots();
    },

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.goToSlide(this.currentIndex);
    },

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.cards.length;
        this.goToSlide(this.currentIndex);
    },

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
};
