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
