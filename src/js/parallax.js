/* =============================================================================
 *
 * PARALLAX
 *
 * Version: 1.0.0 (12/06/2026)
 * Author: Stu Cowley
 *
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

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

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

export function initParallax() {
    const parallaxItems = document.querySelectorAll('[data-parallax]');

    if (!parallaxItems.length) {
        return;
    }

    function updateParallaxItems() {
        parallaxItems.forEach(updateParallaxItem);
    }

    updateParallaxItems();

    window.addEventListener('scroll', updateParallaxItems, {
        passive: true,
    });

    window.addEventListener('resize', updateParallaxItems);
}
