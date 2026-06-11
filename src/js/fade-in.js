/* =============================================================================
 * FADE IN
 *
 * Version: 1.0.0 (11/06/2026)
 * Author: Stu Cowley
 * -----------------------------------------------------------------------------
 *
 * Applies a fade-in animation to selected content elements as they enter the
 * viewport. Elements can opt out with the `data-fade-ignore` attribute.
 *
 * ========================================================================== */

const fadeSelectors = [
    'main section',
    'main article',
    'main div',
    'main h1',
    'main h2',
    'main h3',
    'main h4',
    'main h5',
    'main h6',
    'main ul',
    'main ol',
    'main li',
    'main img',
    'main form'
];

export function initFadeIn() {
    const elements = document.querySelectorAll(fadeSelectors.join(','));

    if (!elements.length) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('fade-in--active');
                observerInstance.unobserve(entry.target);
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -64px 0px',
        }
    );

    elements.forEach((element) => {
        if (element.hasAttribute('data-fade-ignore')) {
            return;
        }

        element.classList.add('fade-in');
        observer.observe(element);
    });
}
