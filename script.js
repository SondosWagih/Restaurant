// Initialize AOS (Animate On Scroll) library
AOS.init({
    duration: 800, // Animation duration in milliseconds (increased for smoother effect)
    easing: 'ease-in-out', // Easing function for animation
    once: true, // Whether animation should happen only once - on scroll down
    mirror: false, // Whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // Defines which position of the element should trigger the animation
});

// Initialize Swiper for Special Offers section
const offersSwiper = new Swiper('.special-offers-slider', {
    loop: true,
    slidesPerView: 1,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    preventClicks: false,
    preventClicksPropagation: false,
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination', // Selector for pagination bullets container
        clickable: true, // Enable clicking on pagination bullets to navigate
    },
    // Optional: Add navigation arrows if desired
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },
});

// Initialize Swiper for Testimonials section
const testimonialsSwiper = new Swiper('.testimonials-slider', {
    direction: 'horizontal',
    loop: true,
    loopedSlides: 3,
    slidesPerView: 1,
    spaceBetween: 20, // Space between slides in px
    autoplay: { // Added autoplay for testimonials
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        // When window width is >= 768px (medium screens)
        768: {
            slidesPerView: 2, // Show 2 slides
            spaceBetween: 30, // Increase space between slides
        },
        // When window width is >= 1024px (large screens)
        1024: {
            slidesPerView: 3, // Show 3 slides
            spaceBetween: 40, // Increase space between slides
        }
    },
});

// Back to Top Button functionality
const backToTopButton = document.getElementById('backToTop');

// Add scroll event listener to window
window.addEventListener('scroll', () => {
    // Check if user has scrolled down more than 300 pixels
    if (window.pageYOffset > 300) {
        // If scrolled down, make button visible and opaque
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        // If at the top, make button invisible and transparent
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
});

// Add click event listener to back to top button
backToTopButton.addEventListener('click', () => {
    // Smoothly scroll to the top of the page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Optional: Highlight active menu category in navigation
document.addEventListener('DOMContentLoaded', () => {
    const menuNavItems = document.querySelectorAll('.menu-nav-item');
    const menuCategories = document.querySelectorAll('.menu-category');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all nav items
                menuNavItems.forEach(item => item.classList.remove('active'));

                // Add active class to the corresponding nav item
                const targetId = entry.target.id;
                const activeNavItem = document.querySelector(`.menu-nav-item[href="#${targetId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe each menu category
    menuCategories.forEach(category => {
        observer.observe(category);
    });

    // Handle click on menu navigation items to scroll smoothly and set active class
    menuNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the target element with offset for sticky header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // Added extra 20px for padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update active class immediately on click
                menuNavItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Set initial active state on page load
    // Find which section is currently in view or closest to top
    let currentActiveSection = null;
    for (let i = 0; i < menuCategories.length; i++) {
        const rect = menuCategories[i].getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActiveSection = menuCategories[i].id;
            break;
        }
    }
    if (currentActiveSection) {
        const initialActiveNavItem = document.querySelector(`.menu-nav-item[href="#${currentActiveSection}"]`);
        if (initialActiveNavItem) {
            initialActiveNavItem.classList.add('active');
        }
    } else if (menuNavItems.length > 0) {
        // If no section is in view, default to the first one
        menuNavItems[0].classList.add('active');
    }
});
