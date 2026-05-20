import './sass/style.scss'

/**
 * Header Navigation
 *
 * Handles the mobile navigation toggle by updating the menu visibility state
 * and toggle button's `aria-expanded` attribute.
 */

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const primaryNav = document.querySelector('[data-primary-nav]');

function closePrimaryNav() {
    if (!header || !navToggle || !primaryNav) {
        return;
    }

    primaryNav.dataset.visible = 'false';
    navToggle.setAttribute('aria-expanded', 'false');
    header.classList.remove('site-header--menu-open');
}

function togglePrimaryNav() {
    if (!header || !navToggle || !primaryNav) {
        return;
    }

    const isVisible = primaryNav.dataset.visible === 'true';

    primaryNav.dataset.visible = String(!isVisible);
    navToggle.setAttribute('aria-expanded', String(!isVisible));
    header.classList.toggle('site-header--menu-open', !isVisible);
}

if (navToggle && primaryNav) {
    navToggle.addEventListener('click', togglePrimaryNav);

    primaryNav.addEventListener('click', (event) => {
        const clickedLink = event.target.closest('a');

        if (clickedLink) {
            closePrimaryNav();
        }
    });
}

/*
 * Parallax backgrounds
 *
 * Creates a reusable parallax effect by updating a CSS custom property on any
 * element using the data-parallax attribute. The element's background-position
 * can then use this custom property to shift its background image independently
 * from its content.
 *
 * The effect is disabled for users who prefer reduced motion.
 */

const parallaxItems = document.querySelectorAll('[data-parallax]');
const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
);

function updateParallaxItem(item) {
    if (prefersReducedMotion.matches) {
        item.style.setProperty('--hero-parallax-offset', '0px');
        return;
    }

    const itemRect = item.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const itemIsVisible =
        itemRect.bottom > 0 && itemRect.top < viewportHeight;

    if (!itemIsVisible) {
        return;
    }

    const strength = Number(item.dataset.parallaxStrength || -120);
    const scrollProgress = itemRect.top / viewportHeight;
    const parallaxOffset = scrollProgress * strength;

    item.style.setProperty('--hero-parallax-offset', `${parallaxOffset}px`);
}

function updateParallaxItems() {
    parallaxItems.forEach(updateParallaxItem);
}

if (parallaxItems.length) {
    updateParallaxItems();

    window.addEventListener('scroll', updateParallaxItems, {
        passive: true,
    });

    window.addEventListener('resize', updateParallaxItems);
}
