/* =============================================================================
 * HEADER NAVIGATION
 *
 * Version: 1.0.0 (06/06/2026)
 * Author: Stu Cowley
 * -----------------------------------------------------------------------------
 *
 * Manages the visual state of the site header. This includes tracking when the
 * user has scrolled beyond the header threshold and updating the logo asset so
 * it remains appropriate for the current header background/state.
 *
 * The header logo may also be affected by external header states, such as when
 * the mobile menu is open, so this module exposes shared header-state
 * behaviour that other modules can call when needed.
 *
 * ========================================================================== */

export const header = document.querySelector('[data-header]');
const headerLogo = document.querySelector('[data-header-logo]');

export function updateHeaderLogo() {
    if (!header || !headerLogo) {
        return;
    }

    const isScrolled = header.classList.contains('site-header--scrolled');
    const isMenuOpen = header.classList.contains('site-header--menu-open');
    const logoSrc =
        isScrolled || isMenuOpen
            ? headerLogo.dataset.logoPrimary
            : headerLogo.dataset.logoLight;

    if (logoSrc && headerLogo.getAttribute('src') !== logoSrc) {
        headerLogo.setAttribute('src', logoSrc);
    }
}

export function initHeader() {
    function updateHeaderScrollState() {
        if (!header) {
            return;
        }

        const isScrolled = window.scrollY > 10;

        header.classList.toggle('site-header--scrolled', isScrolled);
        updateHeaderLogo();
    }

    updateHeaderScrollState();

    window.addEventListener('scroll', updateHeaderScrollState, {
        passive: true,
    });
}
