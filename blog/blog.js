// Contents for an essay, as on alexwang.ai: built from the section headings, pinned in the left margin on wide
// screens and folded above the essay on narrow ones. The section being read is marked as you scroll.
(() => {
  const content = document.querySelector('.post-content');
  const headings = content ? Array.from(content.querySelectorAll('h2[id], h3[id]')) : [];
  if (headings.length < 2) return;

  const toc = document.createElement('details');
  toc.className = 'toc';
  toc.innerHTML = '<summary>Contents</summary><nav><ul></ul></nav>';
  let list = toc.querySelector('ul');
  let sub = null;
  const links = headings.map(heading => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = '#' + heading.id;
    link.textContent = heading.firstChild.textContent.trim();
    item.append(link);
    if (heading.tagName === 'H3' && list.lastElementChild) {
      if (!sub) sub = list.lastElementChild.appendChild(document.createElement('ul'));
      sub.append(item);
    } else {
      sub = null;
      list.append(item);
    }
    return link;
  });
  content.before(toc);

  const wide = matchMedia('(min-width: 1360px)');
  const open = () => { toc.open = wide.matches; };
  open();
  wide.addEventListener('change', open);

  const mark = () => {
    const current = headings.findLastIndex(heading => heading.getBoundingClientRect().top < innerHeight / 3);
    links.forEach((link, i) => link.classList.toggle('is-active', i === current));
  };
  addEventListener('scroll', mark, { passive: true });
  mark();
})();

// The seal closes an essay: it is set after the last word of the last paragraph or list item, and links home.
(() => {
  const blocks = Array.from(document.querySelectorAll('.post-content :is(p, li)'))
    .filter(el => !el.closest('.footnotes, .callout, figure, table'));
  const last = blocks.pop();
  if (!last) return;
  const root = new URL('../../../', location.href).href;
  last.insertAdjacentHTML('beforeend',
    '<a class="seal-link" href="' + root + '" aria-label="Home"><img class="seal" src="' + root + 'basic/seal.webp" alt="Seal of Yingpeng Ma"></a>');
})();

// Notes: each footnote is also set as a sidenote beside its paragraph; on wide screens the sidenotes replace
// the list of notes at the foot of the essay.
document.querySelectorAll('.post-content .footnote-ref').forEach(ref => {
  const note = document.getElementById(decodeURIComponent(ref.hash.slice(1)));
  if (!note) return;
  const side = document.createElement('span');
  side.className = 'sidenote';
  side.innerHTML = '<sup>' + ref.textContent + '</sup> ' + Array.from(note.children, el => el.innerHTML).join('<br>');
  side.querySelectorAll('.footnote-backref').forEach(el => el.remove());
  ref.parentElement.after(side);   // right after the <sup>, so the note floats level with its sentence
});

// Cite this post: a BibTeX entry built from the essay's title, date and address, with a copy button.
(() => {
  const article = document.querySelector('.post');
  const title = article && article.querySelector('.post-title');
  const time = document.querySelector('.post-header__date');
  if (!title || !time) return;
  const date = new Date(time.getAttribute('datetime') + 'T00:00:00');
  const year = date.getFullYear();
  const slug = location.pathname.split('/').filter(Boolean).pop();
  const url = 'https://yingpengma.github.io' + location.pathname;
  const bibtex = [
    '@article{ma' + year + slug.replace(/[^a-z0-9]/gi, '').toLowerCase() + ',',
    '  author = {Yingpeng Ma},',
    '  title = {' + title.textContent.trim() + '},',
    '  journal = {yingpengma.github.io},',
    '  year = {' + year + '},',
    '  month = {' + date.toLocaleString('en-US', { month: 'short' }) + '},',
    '  url = {' + url + '}',
    '}'
  ].join('\n');

  const cite = document.createElement('details');
  cite.className = 'citation';
  cite.innerHTML = '<summary>Cite this post</summary><div class="citation__box"><button type="button" class="citation__copy" aria-live="polite">Copy</button><pre></pre></div>';
  cite.querySelector('pre').textContent = bibtex;
  const copy = cite.querySelector('.citation__copy');
  copy.addEventListener('click', async () => {
    let done = false;
    try { await navigator.clipboard.writeText(bibtex); done = true; } catch { done = false; }
    copy.textContent = done ? 'Copied' : 'Copy failed';
    clearTimeout(copy.reset);
    copy.reset = setTimeout(() => { copy.textContent = 'Copy'; }, 1600);
  });
  article.append(cite);
})();

// You might also like: up to three other essays, read from the writing list so new posts appear here by themselves.
(() => {
  const article = document.querySelector('.post');
  if (!article) return;
  const here = new URL('./', location.href).href;
  fetch(new URL('../../', location.href))
    .then(res => res.text())
    .then(html => {
      const list = new DOMParser().parseFromString(html, 'text/html');
      const base = new URL('../../', location.href);
      // Every post on the list page, from both Selected writings and All posts, newest first and each once.
      const seen = new Set();
      const others = Array.from(list.querySelectorAll('.post-list .post-preview'))
        .map(item => ({ item, href: new URL(item.querySelector('a').getAttribute('href'), base).href }))
        .filter(post => post.href !== here && !seen.has(post.href) && seen.add(post.href))
        .sort((a, b) => b.item.querySelector('time').getAttribute('datetime').localeCompare(a.item.querySelector('time').getAttribute('datetime')))
        .slice(0, 3);
      if (!others.length) return;
      const more = document.createElement('section');
      more.className = 'more';
      more.innerHTML = '<h2 class="section-title">You might also like</h2><ul class="post-list"></ul>';
      others.forEach(({ item, href }) => {
        const li = document.createElement('li');
        li.className = 'post-preview';
        li.innerHTML = item.querySelector('.post-preview__date').outerHTML + '<h3 class="post-preview__title"><a></a></h3>';
        const link = li.querySelector('a');
        link.href = href;
        link.textContent = item.querySelector('.post-preview__title').textContent.trim();
        more.querySelector('ul').append(li);
      });
      article.append(more);
    })
    .catch(() => {});
})();
