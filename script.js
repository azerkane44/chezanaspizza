// ================================
// CHEZ ANAS PIZZA – JavaScript
// ================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- BURGER MENU ---- */
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    // Fermer le menu au clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  /* ---- NAVBAR SCROLL ---- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(17,17,17,0.97)';
        navbar.style.backdropFilter = 'blur(8px)';
      } else {
        navbar.style.background = '#111';
        navbar.style.backdropFilter = 'none';
      }
    });
  }

  /* ---- FILTRES MENU ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards  = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards
      menuCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });

      // Show/hide categories if empty
      document.querySelectorAll('.menu-category').forEach(cat => {
        const visible = cat.querySelectorAll('.menu-card:not(.hidden)');
        cat.style.display = visible.length === 0 ? 'none' : '';
      });
    });
  });

  /* ---- FORMULAIRE DE CONTACT ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      const name    = document.getElementById('name');
      const email   = document.getElementById('email');
      const message = document.getElementById('message');
      const success = document.getElementById('formSuccess');

      // Reset errors
      ['nameError','emailError','messageError'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '';
      });

      // Validate name
      if (!name.value.trim()) {
        document.getElementById('nameError').textContent = 'Veuillez entrer votre nom.';
        name.focus();
        isValid = false;
      }

      // Validate email
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(email.value.trim())) {
        document.getElementById('emailError').textContent = 'Veuillez entrer une adresse e-mail valide.';
        if (isValid) email.focus();
        isValid = false;
      }

      // Validate message
      if (!message.value.trim() || message.value.trim().length < 10) {
        document.getElementById('messageError').textContent = 'Le message doit faire au moins 10 caractères.';
        if (isValid) message.focus();
        isValid = false;
      }

      if (isValid) {
        // Simulate send (no backend)
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        setTimeout(() => {
          form.reset();
          success.style.display = 'block';
          submitBtn.textContent = 'Envoyer le message ✉️';
          submitBtn.disabled = false;

          setTimeout(() => {
            success.style.display = 'none';
          }, 6000);
        }, 1200);
      }
    });

    // Live validation on blur
    ['name','email','message'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('blur', () => {
          const err = document.getElementById(id + 'Error');
          if (err) err.textContent = '';
        });
      }
    });
  }

  /* ---- ANIMATION SCROLL (fade-in cards) ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.feature-card, .pizza-card, .menu-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
