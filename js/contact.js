// Contact form (Formspree) and copy-to-clipboard buttons.
import { track } from './util.js';

export function initCopyButtons() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = 'Copied';
    } catch (err) {
      const range = document.createRange();
      const target = btn.previousElementSibling || btn;
      range.selectNodeContents(target);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      btn.textContent = 'Selected';
    }
    setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
  });
}

export function initContactForm(endpoint) {
  const form = document.getElementById('contactForm');
  if (!form || !endpoint) return;
  const status = document.getElementById('cf-status');
  const submit = document.getElementById('cf-submit');
  const rules = {
    'cf-name': (v) => (v.trim() ? '' : 'Please enter your name.'),
    'cf-email': (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.'),
    'cf-subject': (v) => (v.trim() ? '' : 'Please add a subject.'),
    'cf-message': (v) => (v.trim().length >= 10 ? '' : 'Please write a message of at least 10 characters.')
  };

  const check = (id) => {
    const el = document.getElementById(id);
    const msg = rules[id](el.value);
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (msg) el.setAttribute('aria-describedby', `${id}-err`); else el.removeAttribute('aria-describedby');
    document.getElementById(`${id}-err`).textContent = msg;
    return !msg;
  };
  Object.keys(rules).forEach((id) => document.getElementById(id).addEventListener('blur', () => check(id)));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    const ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) {
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    if (form.elements._gotcha.value) return;
    submit.disabled = true;
    submit.textContent = 'Sending...';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      status.classList.add('is-ok');
      status.textContent = 'Thank you. Your message has been sent.';
      track('contact-form-sent');
    } catch (err) {
      status.classList.add('is-err');
      status.textContent = 'Your message could not be sent. Please try again, or email me directly.';
    } finally {
      submit.disabled = false;
      submit.textContent = 'Send message';
    }
  });
}
