document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // --- Loader Animation ---
  const tlLoader = gsap.timeline({
    onComplete: () => {
      document.querySelector('.loader').style.display = 'none';
      initAnimations();
    }
  });

  tlLoader
    .to('.loader-progress', { width: '100%', duration: 1.5, ease: 'power2.inOut' })
    .to('.loader', { yPercent: -100, duration: 0.8, ease: 'power3.inOut', delay: 0.2 });


  // --- Mobile Menu ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileClose = document.querySelector('.mobile-close');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-links a');

  if(mobileToggle && mobileClose && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    mobileClose.addEventListener('click', () => {
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // --- Navbar Scroll & Active Tracking ---
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if(navbar) {
    window.addEventListener('scroll', () => {
      // Background effect
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Active Section Tracking
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
        }
      });
    });
  }

  // --- Auto Categories Interaction ---
  const catItems = document.querySelectorAll('.auto-cat-item');
  if(catItems.length > 0) {
    catItems.forEach(item => {
      item.addEventListener('click', () => {
        catItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        // You can add logic here to change the background image or content based on the active category
      });
    });
  }

  // --- Number Counter Animation ---
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-num');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            snap: { innerHTML: 1 },
            ease: "power2.out",
            onUpdate: function() {
              counter.innerHTML = Math.round(this.targets()[0].innerHTML);
            }
          });
        }
      });
    });
  }

  // --- Main Animations Initialization ---
  function initAnimations() {
    // Hero Animations
    gsap.from('.gs-reveal', {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.2
    });

    // Reveal Up
    gsap.utils.toArray('.gs-reveal-up').forEach(element => {
      const delay = element.dataset.delay || 0;
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: delay
      });
    });

    // Reveal Right
    gsap.utils.toArray('.gs-reveal-right').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Reveal Left
    gsap.utils.toArray('.gs-reveal-left').forEach(element => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });
    });

    // Parallax Images
    gsap.utils.toArray('.about-image, .services-bg, .features-bg').forEach(img => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom", 
          end: "bottom top",
          scrub: true
        }
      });
    });

    animateCounters();
  }

  // --- Form Submission Prevention (for demo purposes) ---
  const form = document.getElementById('contactForm');
  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.submit-btn span');
      const originalText = btn.textContent;
      btn.textContent = 'Sending...';
      
      setTimeout(() => {
        btn.textContent = 'Message Sent!';
        form.reset();
        setTimeout(() => {
          btn.textContent = originalText;
        }, 3000);
      }, 1500);
    });
  }
});

// --- Copy to Clipboard Function ---
function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    const originalContent = element.innerHTML;
    element.innerHTML = '<i class="ph ph-check" style="color: #28a745;"></i>';
    element.classList.add('copied');
    
    // Show a small toast or tooltip if needed
    const tooltip = element.getAttribute('title');
    element.setAttribute('title', 'Copied!');
    
    setTimeout(() => {
      element.innerHTML = originalContent;
      element.classList.remove('copied');
      element.setAttribute('title', tooltip);
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

