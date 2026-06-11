/* =============================================================================
 * MOBILE MENU
 *
 * Version: 1.0.0 (06/06/2026)
 * Author: Stu Colwey
 *
 * -----------------------------------------------------------------------------
 *
 * Manages the mobile primary navigation interaction. This includes toggling
 * the menu visibility, keeping the toggle button's ARIA state in sync,
 * applying the relevant header class while the menu is open, and closing the
 * menu once a navigation link has been selected.
 *
 * This module depends on the header state so the logo and header styling
 * remain consistent while the menu is open or closed.
 *
 * ========================================================================== */

import { header, updateHeaderLogo } from './header.js';

export function initMobileNav() {
    const navToggle = document.querySelector('[data-nav-toggle]');
    const primaryNav = document.querySelector('[data-primary-nav]');

    function closePrimaryNav() {
        if (!header || !navToggle || !primaryNav) {
            return;
        }

        primaryNav.dataset.visible = 'false';
        navToggle.setAttribute('aria-expanded', 'false');
        header.classList.remove('site-header--menu-open');

        updateHeaderLogo();
    }

    function togglePrimaryNav() {
        if (!header || !navToggle || !primaryNav) {
            return;
        }

        const isVisible = primaryNav.dataset.visible === 'true';

        primaryNav.dataset.visible = String(!isVisible);
        navToggle.setAttribute('aria-expanded', String(!isVisible));
        header.classList.toggle('site-header--menu-open', !isVisible);

        updateHeaderLogo();
    }

    function handleOutsideClick(event) {
        if (!header || !navToggle || !primaryNav) {
            return;
        }

        const isVisible = primaryNav.dataset.visible === 'true';
        const clickedInsideNav = primaryNav.contains(event.target);
        const clickedToggle = navToggle.contains(event.target);

        if (isVisible && !clickedInsideNav && !clickedToggle) {
            closePrimaryNav();
        }
    }

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', togglePrimaryNav);

        primaryNav.addEventListener('click', (event) => {
            const clickedLink = event.target.closest('a');

            if (clickedLink) {
                closePrimaryNav();
            }
        });

        document.addEventListener('click', handleOutsideClick);
    }
}
