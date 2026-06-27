/**
 * AURELIA - PREMIUM WEDDING & EVENT MANAGEMENT HTML TEMPLATE
 * File: main.js
 * Description: Light/Dark Mode Controller, Scroll Reveal Animations,
 *              Sticky Navigation Header, and custom luxury interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbarScroll();
  initScrollReveal();
  initInteractiveShowcase();
  initLuxuryCursor();
  initMobileDrawer();
  initSearchOverlay();
  initMagneticButtons();
  initParallaxTiltCards();
  initFlowerAnimation();
  initCounters();
  initVideoHero();
});

/**
 * 1. Theme Configuration & Toggle System (Enhanced to support multiple buttons)
 */
function initThemeToggle() {
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  // Set correct icon upon load across all toggle controls
  updateAllToggleIcons(currentTheme);

  // Selector for all theme toggles in the workspace (floating or navbar)
  const toggles = document.querySelectorAll('#themeToggleBtn, #themeToggleBtnNavbar');
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateAllToggleIcons(targetTheme);
    });
  });
}

function updateAllToggleIcons(theme) {
  const toggles = document.querySelectorAll('#themeToggleBtn, #themeToggleBtnNavbar');
  toggles.forEach(toggleBtn => {
    if (!toggleBtn) return;
    
    if (theme === 'dark') {
      // Show sun icon for switching to light mode
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      `;
    } else {
      // Show moon icon for switching to dark mode
      toggleBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      `;
    }
  });
}

/**
 * 2. Sticky Premium Header & Navigation Scroll State
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-luxury');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately to capture initial page position
}

/**
 * 3. Intersection Observer Scroll Reveal Animation System
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade-in, .reveal-slide-up, .reveal-zoom-in');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep animations clean & performant
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

/**
 * 4. Interactive Live Showcase Custom Behaviors (E.g. Gallery filters or dynamic color updates)
 */
function initInteractiveShowcase() {
  // Live color variables update demonstration helper
  const colorSwatchDemo = document.querySelectorAll('.color-swatch-demo');
  if (colorSwatchDemo.length > 0) {
    colorSwatchDemo.forEach(swatch => {
      swatch.addEventListener('click', () => {
        const hex = swatch.getAttribute('data-hex');
        const name = swatch.getAttribute('data-name');
        
        const feedbackEl = document.getElementById('swatchFeedback');
        if (feedbackEl) {
          feedbackEl.innerHTML = `Copied Color: <strong>${name}</strong> (${hex})`;
          navigator.clipboard.writeText(hex).then(() => {
            feedbackEl.classList.remove('opacity-0');
            setTimeout(() => {
              feedbackEl.classList.add('opacity-0');
            }, 2000);
          });
        }
      });
    });
  }
}

/**
 * 5. Premium Custom Luxury Cursor
 */
function initLuxuryCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const circle = document.querySelector('.custom-cursor-circle');
  if (!dot || !circle) return;

  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  // Track absolute client positions
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Snap inner active dot instantly
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Smooth frame loop for outer follower circle lag
  function updateFollower() {
    const ease = 0.12; // Interpolation damping coefficient
    circleX += (mouseX - circleX) * ease;
    circleY += (mouseY - circleY) * ease;
    
    circle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
    requestAnimationFrame(updateFollower);
  }
  requestAnimationFrame(updateFollower);

  // Bind expansion feedback on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, textarea, select, .card-luxury, .color-swatch-demo, .navbar-brand');
  hoverables.forEach(node => {
    node.addEventListener('mouseenter', () => {
      circle.classList.add('cursor-expanded');
      if (node.tagName === 'A' || node.classList.contains('btn') || node.classList.contains('btn-navbar-control')) {
        circle.classList.add('cursor-gold');
      }
    });
    node.addEventListener('mouseleave', () => {
      circle.classList.remove('cursor-expanded', 'cursor-gold');
    });
  });
}

/**
 * 6. Luxury Mobile Drawer Navigation Control
 */
function initMobileDrawer() {
  const toggler = document.querySelector('.navbar-toggler');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('closeMobileDrawer');
  const backdrop = document.getElementById('mobileDrawerBackdrop');

  if (!drawer) return;

  // Intercept default mobile collapser to trigger our drawer
  if (toggler) {
    toggler.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      drawer.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
    });
  }

  const hideDrawer = () => {
    drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
  };

  if (closeBtn) closeBtn.addEventListener('click', hideDrawer);
  if (backdrop) backdrop.addEventListener('click', hideDrawer);
}

/**
 * 7. Full Screen Global Search Popup Overlay
 */
function initSearchOverlay() {
  const triggers = document.querySelectorAll('.search-trigger');
  const overlay = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('closeSearch');
  const input = document.getElementById('searchInput');

  if (!overlay) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('active');
      if (input) {
        // Soft timeout to wait for fade animation
        setTimeout(() => input.focus(), 250);
      }
    });
  });

  const hideSearch = () => {
    overlay.classList.remove('active');
    if (input) input.value = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', hideSearch);
  
  // Close search overlay with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      hideSearch();
    }
  });
}

/**
 * 8. Magnetic Pull Buttons Interaction
 */
function initMagneticButtons() {
  const magneticNodes = document.querySelectorAll('.magnetic-target');
  
  magneticNodes.forEach(node => {
    node.addEventListener('mousemove', (e) => {
      const rect = node.getBoundingClientRect();
      
      // Calculate mouse displacement from center of target element
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      // Soft pull translate (strength coefficient: 0.28)
      node.style.transform = `translate3d(${x * 0.28}px, ${y * 0.28}px, 0)`;
      node.style.transition = 'transform 0.08s ease-out';
    });
    
    node.addEventListener('mouseleave', () => {
      // Revert back smoothly
      node.style.transform = 'translate3d(0, 0, 0)';
      node.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
}

/**
 * 9. Interactive 3D Card Tilt Parallax Movement
 */
function initParallaxTiltCards() {
  const tiltCards = document.querySelectorAll('.parallax-tilt');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // cursor coordinates relative to card
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Compute tilt angle (limiting max deflection angle to 8 degrees)
      const rotateY = ((x - centerX) / centerX) * 8;
      const rotateX = -((y - centerY) / centerY) * 8;
      
      // Perform hardware-accelerated perspective rotations & soft scale
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.boxShadow = '0 15px 35px rgba(var(--color-navy-rgb), 0.12)';
      card.style.transition = 'transform 0.05s ease-out, box-shadow 0.2s ease';
    });
    
    card.addEventListener('mouseleave', () => {
      // Revert card alignments smoothly
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.boxShadow = 'var(--shadow-sm)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease';
    });
  });
}

/**
 * 10. Interactive Floating Flower Petals Canvas
 */
function initFlowerAnimation() {
  const canvas = document.getElementById('flowersCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;
  
  window.addEventListener('resize', () => {
    if (!canvas) return;
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });
  
  const petalCount = 35;
  const petals = [];
  
  // Custom floral colors (Rose pink, gold-tinted soft peach, ivory, champagne)
  const colors = [
    'rgba(183, 110, 121, 0.45)', // Rose Gold
    'rgba(242, 218, 222, 0.55)', // Soft Pink
    'rgba(230, 213, 195, 0.5)',  // Champagne
    'rgba(250, 249, 246, 0.6)'   // Ivory
  ];
  
  for (let i = 0; i < petalCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      r: Math.random() * 6 + 4,
      d: Math.random() * petalCount,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 1.2 + 0.8,
      oscillationSpeed: Math.random() * 0.02 + 0.01,
      oscillationDistance: Math.random() * 30 + 10,
      angle: Math.random() * 360,
      spinSpeed: Math.random() * 2 - 1,
      shapeType: Math.floor(Math.random() * 3) // different leaf/petal profiles
    });
  }
  
  let mouseX = -1000;
  let mouseY = -1000;
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  
  function drawPetals() {
    ctx.clearRect(0, 0, width, height);
    
    petals.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle * Math.PI / 180);
      ctx.fillStyle = p.color;
      
      // Draw asymmetric organic petal curves
      ctx.beginPath();
      if (p.shapeType === 0) {
        // Classic heart-ish rose petal
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.r * 1.5, -p.r * 1.5, -p.r * 2, p.r * 0.5, 0, p.r * 2);
        ctx.bezierCurveTo(p.r * 2, p.r * 0.5, p.r * 1.5, -p.r * 1.5, 0, 0);
      } else if (p.shapeType === 1) {
        // Elliptical slender blossom petal
        ctx.ellipse(0, 0, p.r, p.r * 1.8, 0, 0, 2 * Math.PI);
      } else {
        // Organic rounded teardrop
        ctx.moveTo(0, -p.r);
        ctx.quadraticCurveTo(-p.r * 1.4, -p.r, -p.r, p.r);
        ctx.quadraticCurveTo(0, p.r * 1.6, p.r, p.r);
        ctx.quadraticCurveTo(p.r * 1.4, -p.r, 0, -p.r);
      }
      ctx.fill();
      ctx.restore();
      
      // Update coordinates
      p.y += p.speed;
      p.angle += p.spinSpeed;
      p.x += Math.sin(p.y * p.oscillationSpeed) * 0.5;
      
      // Mouse push effect
      const dx = p.x - mouseX;
      const dy = p.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        const pushX = (dx / dist) * force * 5;
        const pushY = (dy / dist) * force * 5;
        p.x += pushX;
        p.y += pushY;
      }
      
      // Reset position when hitting bottom or edges
      if (p.y > height) {
        p.y = -20;
        p.x = Math.random() * width;
        p.speed = Math.random() * 1.2 + 0.8;
      }
      if (p.x > width) p.x = 0;
      if (p.x < 0) p.x = width;
    });
    
    requestAnimationFrame(drawPetals);
  }
  
  requestAnimationFrame(drawPetals);
}

/**
 * 11. Luxury Ticking Counters Animation
 */
function initCounters() {
  const counterEls = document.querySelectorAll('.counter-number');
  if (counterEls.length === 0) return;
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target'), 10);
        const suffix = target.getAttribute('data-suffix') || '';
        let currentVal = 0;
        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        
        function updateNumber(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease-out cubic formula
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          currentVal = Math.floor(easeProgress * targetVal);
          target.textContent = currentVal + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            target.textContent = targetVal + suffix;
          }
        }
        
        requestAnimationFrame(updateNumber);
        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  counterEls.forEach(el => counterObserver.observe(el));
}

/**
 * 12. Cinematic Video Lightbox Popup Controls
 */
function initVideoHero() {
  const playBtn = document.querySelector('.btn-video-play-pulse');
  const modal = document.getElementById('luxuryVideoModal');
  const closeBtn = document.getElementById('closeVideoModal');
  const iframe = document.getElementById('luxuryVideoIframe');
  
  if (!playBtn || !modal) return;
  
  const videoUrl = playBtn.getAttribute('data-video-url');
  
  playBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
    if (iframe && videoUrl) {
      iframe.src = videoUrl + "?autoplay=1&mute=0";
    }
  });
  
  const hideVideo = () => {
    modal.classList.remove('active');
    if (iframe) {
      iframe.src = '';
    }
  };
  
  if (closeBtn) closeBtn.addEventListener('click', hideVideo);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideVideo();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      hideVideo();
    }
  });
}

