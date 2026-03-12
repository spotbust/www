/* ========================================
   SPOTBUST — GSAP Animations
   Parallax, Flying Finger, Scroll Reveals
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, ScrollToPlugin);

    // ---- HERO PARALLAX BACKGROUND ----
    const heroBg = document.querySelector('.hero-bg');
    const heroSub = document.querySelector('.hero-sub');

    if (heroBg) {
        // Parallax movement (scroll-triggered)
        gsap.to(heroBg, {
            yPercent: 25,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            }
        });

        // Continuous flickering effect - independent of scroll
        const flickerTl = gsap.timeline({ repeat: -1 });

        flickerTl.to(heroBg, {
            filter: 'grayscale(45%) contrast(1.15) brightness(0.25)',
            duration: 0.2,
        })
            .to(heroBg, {
                filter: 'grayscale(40%) contrast(1.2) brightness(0.35)',
                duration: 0.1,
            })
            .to(heroBg, {
                filter: 'grayscale(50%) contrast(1.3) brightness(0.2)',
                duration: 0.18,
            })
            .to(heroBg, {
                filter: 'grayscale(38%) contrast(1.1) brightness(0.4)',
                duration: 0.22,
            })
            .to(heroBg, {
                filter: 'grayscale(42%) contrast(1.25) brightness(0.3)',
                duration: 0.29,
            }, '-=0.38');
    }

    // Subline faded weg
    if (heroSub) {
        gsap.to(heroSub, {
            y: -40,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: '40% top',
                scrub: true,
            }
        });
    }


    // ---- PARALLAX DIVIDER IMAGES ----
    document.querySelectorAll('.parallax-divider .parallax-img').forEach(img => {
        gsap.to(img, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
                trigger: img.closest('.parallax-divider'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
    });


    // ---- FLYING FINGER ----
    const finger = document.getElementById('flying-finger');
    if (finger) {
        initFlyingFinger(finger);
    }


    // ---- SECTION TITLE REVEALS ----
    document.querySelectorAll('.section-title').forEach(title => {
        gsap.from(title, {
            x: -80,
            opacity: 0,
            rotation: -5,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    });


    // ---- GIG ITEMS STAGGER REVEAL ----
    // Warten bis Gigs geladen sind (per MutationObserver)
    const gigList = document.getElementById('gig-list');
    if (gigList) {
        const observer = new MutationObserver(() => {
            const items = gigList.querySelectorAll('.gig-item');
            if (items.length > 0) {
                observer.disconnect();
                gsap.from(items, {
                    y: 30,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: gigList,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse',
                    }
                });
            }
        });
        observer.observe(gigList, { childList: true, subtree: true });
    }


    // ---- MEDIA GRID ITEMS ----
    document.querySelectorAll('.media-item').forEach((item, i) => {
        gsap.from(item, {
            y: 40,
            opacity: 0,
            rotation: (i % 2 === 0) ? -3 : 3,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
            }
        });
    });


    // ---- KONTAKT SECTION ----
    const emailLink = document.querySelector('.email-link');
    if (emailLink) {
        gsap.from(emailLink, {
            scale: 0.5,
            opacity: 0,
            rotation: -8,
            duration: 0.7,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '#kontakt',
                start: 'top 75%',
                toggleActions: 'play none none reverse',
            }
        });
    }

});


/* =============================================
   FLYING FINGER — simple scroll animation
   Starts as header logo, animates to 50vh on scroll
   ============================================= */

function initFlyingFinger(finger) {

    const fingerText = document.getElementById('finger-text');

    // Initial state: positioned in center horizontally, top of page
    gsap.set(finger, {
        left: 'calc(50vw - 2rem)',
        top: '2.5rem',
        width: '60px',
        opacity: 0,
        rotation: 0,
        scale: 2,
    });

    gsap.set(fingerText, {
        top: '1rem',
        scale: 1,
        opacity: 1,
    });

    // Animation during hero: move down to 50vh (stays centered horizontally)
    gsap.to(finger, {
        opacity: 1,
        top: 'calc(90vh - 2rem)',
        width: '120px',
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#hero',
            start: 'center top',
            end: 'bottom top',
            scrub: true,
        }
    });

    // Text grows and becomes transparent during hero
    gsap.to(fingerText, {
        top: 'calc(50vh + 80px)',
        scale: 2,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        }
    });

    /*/ Animation during gigs: move to left side (stays at 50vh vertically)
    gsap.to(finger, {
        left: '2rem',
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '#hero',
            start: 'center top',
            end: 'bottom top',
            scrub: true,
        }
    });
/*/

}
