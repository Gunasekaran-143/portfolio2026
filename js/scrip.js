/**
 * Gunasekaran V - Portfolio Script
 * Academic Portfolio with Dark Mode, Animations, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM Elements =====
    const header = document.getElementById('header');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const themeToggle = document.getElementById('theme-toggle');
    const scrollTop = document.getElementById('scroll-top');
    const filterBtns = document.querySelectorAll('.filter__btn');
    const projectCards = document.querySelectorAll('.project__card');
    const skillBars = document.querySelectorAll('.skill__progress');
    const statNumbers = document.querySelectorAll('.stat__number');

    // ===== Navigation Menu =====
    const showMenu = () => {
        navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    /* =====================
   DARK / LIGHT THEME
===================== */

const themeButton = document.getElementById('theme-toggle');

const selectedTheme = localStorage.getItem('selected-theme');

if(selectedTheme === 'light'){
    document.body.classList.add('light-theme');
    themeButton.classList.replace('bx-moon', 'bx-sun');
}

themeButton.addEventListener('click', () => {

    document.body.classList.toggle('light-theme');

    if(document.body.classList.contains('light-theme')){
        themeButton.classList.replace('bx-moon', 'bx-sun');
        localStorage.setItem('selected-theme', 'light');
    }else{
        themeButton.classList.replace('bx-sun', 'bx-moon');
        localStorage.setItem('selected-theme', 'dark');
    }

});
    const hideMenu = () => {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    };

    navToggle?.addEventListener('click', showMenu);
    navClose?.addEventListener('click', hideMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hideMenu();
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            hideMenu();
        }
    });

    // ===== Sticky Header =====
    const handleScroll = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll to top button
        if (window.scrollY > 500) {
            scrollTop?.classList.add('show');
        } else {
            scrollTop?.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // ===== Active Navigation Link =====
    const sections = document.querySelectorAll('section[id]');

    const highlightNavLink = () => {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                navLink?.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);

    // ===== Dark Mode Toggle =====
    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            themeToggle?.classList.replace('bx-moon', 'bx-sun');
        }
    };

    const toggleTheme = () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle?.classList.replace('bx-moon', 'bx-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeToggle?.classList.replace('bx-sun', 'bx-moon');
            localStorage.setItem('theme', 'light');
        }
    };

    themeToggle?.addEventListener('click', toggleTheme);
    initTheme();

    // ===== Project Filtering =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const category = card.dataset.category;
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== Skill Bar Animation =====
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.dataset.width;
                bar.style.width = `${width}%`;
                observer.unobserve(bar);
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5
    });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ===== Counter Animation =====
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        };

        updateCounter();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => counterObserver.observe(num));

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Form Submission =====
    // const contactForm = document.querySelector('.contact__form');
    
    // contactForm?.addEventListener('submit', (e) => {
    //     // Netlify handles the form, but we can add custom handling
    //     const formData = new FormData(contactForm);
    //     const name = formData.get('name');
        
    //     // Optional: Show success message or handle errors
    //     console.log(`Form submitted by: ${name}`);
    // });

    // ===== Contact Form → WhatsApp =====
const contactForm = document.querySelector('.contact__form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const subject = formData.get('subject') || '';
    const message = formData.get('message') || '';

    const whatsappText =
`Hello Gunasekaran,

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

    const whatsappURL =
`https://wa.me/919360843877?text=${encodeURIComponent(whatsappText)}`;

    window.open(whatsappURL, '_blank');

    contactForm.reset();
});

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll(
        '.section__header, .hero__content, .hero__image, .about__image, .about__info, ' +
        '.timeline__item, .research__card, .publication, .project__card, .skills__category, ' +
        '.contact__info, .contact__form'
    );

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // ===== Lazy Loading Images =====
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    };

    const imageObserver = new IntersectionObserver(lazyLoad, {
        rootMargin: '50px'
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ===== Typing Effect for Hero =====
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    };

    // Optional: Uncomment to enable typing effect
    // const heroTitle = document.querySelector('.hero__title');
    // if (heroTitle) {
    //     typeWriter(heroTitle, 'Gunasekaran V', 150);
    // }

    // ===== Preloader (Optional) =====
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    console.log('Portfolio initialized successfully! 🚀');
});

