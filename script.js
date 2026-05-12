// Revital Landing Page — interactivity

(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Treatment card → preselect interest in the form, then smooth-scroll to it.
  const interestSelect = $('#interest');
  $$('.card').forEach((card) => {
    card.addEventListener('click', () => {
      const value = card.dataset.interest;
      if (value && interestSelect) {
        interestSelect.value = value;
        interestSelect.style.color = 'var(--ink)';
      }
      const form = $('#form');
      if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Keep the select color in sync once a value is chosen.
  if (interestSelect) {
    interestSelect.addEventListener('change', () => {
      interestSelect.style.color = interestSelect.value ? 'var(--ink)' : 'var(--muted)';
    });
  }

  // Lead form: log the data and swap to the success state.
  const form = $('#lead-form');
  const success = $('#form-success');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const data = Object.fromEntries(new FormData(form).entries());
      console.log('[Revital] lead submit →', data);
      form.hidden = true;
      success.hidden = false;
      // Scroll the success card into view on mobile.
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Sticky bottom CTA fades in once the user has scrolled past the hero.
  const sticky = $('#sticky-cta');
  if (sticky) {
    const threshold = 460;
    const update = () => {
      const past = window.scrollY > threshold;
      sticky.classList.toggle('is-visible', past);
      sticky.setAttribute('aria-hidden', past ? 'false' : 'true');
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Single-open FAQ — closing peers when one opens.
  const faqItems = $$('.faq__item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => { if (other !== item) other.open = false; });
      }
    });
  });

  // Nav anchor links: native smooth scroll already handles this via CSS,
  // but on iOS Safari we account for the sticky header so headings don't get clipped.
  const nav = $('#nav');
  if (nav) {
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const offset = nav.getBoundingClientRect().height + 12;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  }
})();
