// JD Auto shared interactions — no backend, no stored personal data.
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    const setOpen = open => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
  }
  // Gallery category filters and accessible dialog lightbox.
  const figures = [...document.querySelectorAll('.gallery-item')];
  const buttons = [...document.querySelectorAll('.gallery-filter')];
  const count = document.querySelector('.gallery-count');
  buttons.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    buttons.forEach(b => { const selected = b === button;b.classList.toggle('is-selected',selected);b.setAttribute('aria-pressed',String(selected)); });
    let visible = 0;
    figures.forEach(figure => {figure.hidden = category !== 'all' && figure.dataset.category !== category;if (!figure.hidden) visible++;});
    if (count) count.textContent = `Showing ${visible} ${visible === 1 ? 'photo' : 'photos'}`;
  }));
  const dialog = document.getElementById('gallery-lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    let index = 0;
    const show = i => {
      const visible = figures.filter(f => !f.hidden);
      if (!visible.length) return;
      index = (i + visible.length) % visible.length;
      const fig = visible[index];
      const original = fig.querySelector('img');
      const img = dialog.querySelector('img');
      img.src = original.src;img.alt = original.alt;
      dialog.querySelector('.lightbox-caption').textContent = fig.querySelector('figcaption')?.textContent || '';
    };
    figures.forEach(fig => fig.querySelector('.gallery-open')?.addEventListener('click', () => {
      show(figures.filter(f=>!f.hidden).indexOf(fig));dialog.showModal();
    }));
    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
    dialog.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
    dialog.addEventListener('click', e => {if(e.target===dialog)dialog.close();});
    dialog.addEventListener('keydown', e => {if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1);});
  }
  // Contact enquiry is a local preview, not a submission.
  const form = document.getElementById('enquiry-form');
  if (form) {
    const selected = new URLSearchParams(window.location.search).get('service');
    const service = form.querySelector('[name="service"]');
    if (selected && [...service.options].some(o => o.value === selected || o.text === selected)) service.value = selected;
    let previewText = '';
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      previewText = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nService: ${data.get('service')}\nMessage: ${data.get('message')}`;
      document.getElementById('preview-detail').textContent = previewText;
      document.getElementById('enquiry-preview').hidden = false;
      document.getElementById('form-feedback').hidden = false;
    });
    document.getElementById('copy-enquiry')?.addEventListener('click', async () => {
      const status = document.querySelector('.copy-status');
      try {await navigator.clipboard.writeText(previewText);status.textContent='Copied';}
      catch {status.textContent='Select the preview text to copy it manually.';}
    });
  }
})();
