// Links within the site: pressing one starts loading the page it points to, and clicking it flicks a short stroke
// of ink across the words you clicked before the page follows. Where the browser supports cross-document view
// transitions (stylesheet.css), the old page then fades into the new one.
(() => {
  const DURATION = 320;   // ms for the stroke
  const INK = '36, 37, 37';
  const still = matchMedia('(prefers-reduced-motion: reduce)');

  // A link counts if it stays on this site, opens here, and goes somewhere other than this page.
  const ours = (link, event) => link
    && !link.target
    && !link.hasAttribute('download')
    && link.origin === location.origin
    && !(link.pathname === location.pathname && link.hash)
    && !(event && (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button));

  // Prefetch on press, so the page is mostly loaded by the time the button comes up.
  const fetched = new Set();
  addEventListener('pointerdown', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!ours(link, event) || fetched.has(link.href)) return;
    fetched.add(link.href);
    const hint = document.createElement('link');
    hint.rel = 'prefetch';
    hint.href = link.href;
    document.head.append(hint);
  }, { passive: true });

  let canvas = null;
  let leaving = false;

  // A cheap, repeatable noise for the bristles: the same bristle skips in the same places along the stroke.
  const noise = (i, x) => {
    const n = Math.sin(i * 127.1 + Math.floor(x) * 311.7) * 43758.5453;
    const m = Math.sin(i * 127.1 + Math.floor(x + 1) * 311.7) * 43758.5453;
    const f = x - Math.floor(x);
    return (n - Math.floor(n)) * (1 - f) + (m - Math.floor(m)) * f;
  };

  // The stroke: a brush lands at the left of the words, presses down, swells, and lifts off at the right,
  // drying as it goes, with a few drops thrown off the tip.
  function flick(rect, done) {
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.className = 'ink-flick';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.append(canvas);
    }
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.hidden = false;
    canvas.width = Math.round(innerWidth * dpr);
    canvas.height = Math.round(innerHeight * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';

    const rand = (a, b) => a + Math.random() * (b - a);
    const wide = Math.min(Math.max(rect.height * 0.32, 4.5), 13);          // half the stroke's width
    const x0 = rect.left - wide * 0.3, x1 = rect.right + wide * 0.6;
    const y0 = rect.top + rect.height * rand(0.55, 0.65), y1 = y0 + rand(-0.25, 0.15) * rect.height;
    const cx = x0 + (x1 - x0) * 0.6, cy = Math.min(y0, y1) - rand(0.05, 0.2) * rect.height;   // a slight upward bow
    const at = s => {
      const o = 1 - s;
      return [o * o * x0 + 2 * o * s * cx + s * s * x1, o * o * y0 + 2 * o * s * cy + s * s * y1];
    };
    const length = Math.hypot(x1 - x0, y1 - y0);
    const steps = Math.max(Math.ceil(length / 2), 12);
    const bristles = 22;
    const seed = Math.random() * 100;
    const press = s => (0.8 + 0.3 * Math.sin(Math.PI * Math.min(s * 1.25, 1))) * (1 - 0.45 * s);
    const drops = Array.from({ length: 4 }, (_, i) => ({
      leave: rand(0.82, 0.95),
      reach: rand(0.5, 1.1) * wide * (1 + i * 0.6),
      angle: rand(-0.35, 0.25),
      size: rand(0.6, 1.8) * Math.max(wide * 0.12, 0.8)
    }));

    let drawn = 0;
    const start = performance.now();
    requestAnimationFrame(function frame(now) {
      const t = Math.min((now - start) / DURATION, 1);
      const reach = Math.min(t / 0.62, 1);                                  // the tip keeps its speed as it lifts
      const upto = Math.floor(reach * steps);
      for (let k = drawn; k < upto; k++) {
        const s0 = k / steps, s1 = (k + 1) / steps;
        const [ax, ay] = at(s0), [bx, by] = at(s1);
        const nx = -(by - ay), ny = bx - ax, nl = Math.hypot(nx, ny) || 1;
        const w = wide * press(s1);
        const dry = 0.12 + 0.4 * Math.max(0, (s1 - 0.7) / 0.3);
        for (let b = 0; b < bristles; b++) {
          const off = (b / (bristles - 1)) * 2 - 1;                            // across the brush, -1 to 1
          const edge = Math.abs(off);
          if (noise(b + seed, s1 * 9) < dry + 0.35 * edge * edge) continue;  // this bristle runs dry here
          const o = off * w;
          ctx.strokeStyle = `rgba(${INK}, ${0.82 + 0.15 * noise(b + 50 + seed, s1 * 4)})`;
          ctx.lineWidth = (2 * w / bristles) * 1.9;
          ctx.beginPath();
          ctx.moveTo(ax + nx / nl * o, ay + ny / nl * o);
          ctx.lineTo(bx + nx / nl * o, by + ny / nl * o);
          ctx.stroke();
        }
        if (k === 0) {                                                      // a round, full mark where it lands
          ctx.fillStyle = `rgba(${INK}, 0.9)`;
          ctx.beginPath();
          ctx.ellipse(ax, ay, w * 0.75, w * 0.95, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      drawn = upto;
      // drops thrown on past the end, the way the brush was moving
      const [ex, ey] = at(1), [px, py] = at(0.97);
      const heading = Math.atan2(ey - py, ex - px);
      drops.forEach(drop => {
        if (reach < drop.leave || drop.done) return;
        if (t < 0.95) return;
        const a = heading + drop.angle;
        ctx.fillStyle = `rgba(${INK}, 0.85)`;
        ctx.beginPath();
        ctx.arc(ex + Math.cos(a) * drop.reach, ey + Math.sin(a) * drop.reach, drop.size, 0, Math.PI * 2);
        ctx.fill();
        drop.done = true;
      });
      if (t < 1) requestAnimationFrame(frame);
      else done();
    });
  }

  addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');
    if (event.defaultPrevented || !ours(link, event)) return;
    if (leaving) { event.preventDefault(); return; }
    if (still.matches || document.visibilityState !== 'visible') return;
    if (link.classList.contains('seal-link')) return;   // the seal is a stamp, not words: it just goes home

    // the line of the link nearest the click, or its tallest line when clicked from the keyboard
    const range = document.createRange();
    range.selectNodeContents(link);
    const lines = Array.from(range.getClientRects()).filter(r => r.width > 2 && r.height > 2);
    const away = r => Math.max(r.top - event.clientY, event.clientY - r.bottom, 0) + Math.max(r.left - event.clientX, event.clientX - r.right, 0);
    const rect = event.detail ? lines.sort((a, b) => away(a) - away(b))[0] : lines.sort((a, b) => b.height - a.height)[0];
    if (!rect) return;

    event.preventDefault();
    leaving = true;
    flick(rect, () => { location.href = link.href; });
  });

  // Coming back with the browser's back button shows the page as it was left; clear the ink.
  addEventListener('pageshow', () => {
    leaving = false;
    if (canvas) {
      canvas.hidden = true;
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
  });
})();
