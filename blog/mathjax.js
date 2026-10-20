// Math in essays, set with MathJax as on alexwang.ai: $...$ inline and $$...$$ on its own line. A few macros are
// defined first (\transpose, \inverse, \parens), then the page is typeset.
(() => {
  const macros = document.createElement('div');
  macros.id = 'mathjax-macros';
  macros.hidden = true;
  macros.textContent = String.raw`\[
    \newcommand{\transpose}{{}^\top}
    \newcommand{\inverse}{^{-1}}
    \DeclarePairedDelimiters{\parens}{(}{)}
  \]`;
  document.body.prepend(macros);

  window.MathJax = {
    loader: { load: ['[tex]/mathtools', '[tex]/ams'] },
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']],
      displayMath: [['$$', '$$'], ['\\[', '\\]']],
      packages: { '[+]': ['mathtools', 'ams'] }
    },
    startup: {
      typeset: false,
      ready: () => {
        MathJax.startup.defaultReady();
        MathJax.startup.promise
          .then(() => MathJax.typesetPromise([macros]))
          .then(() => MathJax.typesetPromise());
      }
    }
  };

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js';
  script.defer = true;
  document.head.append(script);
})();
