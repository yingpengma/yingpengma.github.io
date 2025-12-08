(function(){
  // Simple particle-line background with mouse attraction
  const canvas = document.getElementById('lines-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = 0, height = 0, dpi = window.devicePixelRatio || 1;
  const config = {
    particleCount: 60,
    maxVelocity: 0.6,
    connectionDistance: 120,
    mouseInfluenceRadius: 150,
    particleSize: 2,
    lineWidth: 0.7,
    color: 'rgba(120,140,200,', // base, alpha appended
  };

  let particles = [];
  const mouse = { x: null, y: null };

  function resize() {
    dpi = window.devicePixelRatio || 1;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpi);
    canvas.height = Math.floor(height * dpi);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
  }

  function rand(min, max){ return Math.random()*(max-min)+min }

  function createParticles(){
    particles = [];
    const count = Math.max(20, Math.min(120, Math.round((width*height)/60000 * config.particleCount)));
    for (let i=0;i<count;i++){
      particles.push({
        x: rand(0,width),
        y: rand(0,height),
        vx: rand(-config.maxVelocity, config.maxVelocity),
        vy: rand(-config.maxVelocity, config.maxVelocity),
      });
    }
  }

  function update(){
    for (let p of particles){
      // mouse attraction
      if (mouse.x !== null){
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < config.mouseInfluenceRadius && dist > 0){
          const force = (1 - dist / config.mouseInfluenceRadius) * 0.6;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // slow down
      p.vx *= 0.98;
      p.vy *= 0.98;

      // wrap edges
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    }
  }

  function draw(){
    ctx.clearRect(0,0,width,height);

    // draw lines
    for (let i=0;i<particles.length;i++){
      const a = particles[i];
      for (let j=i+1;j<particles.length;j++){
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx*dx + dy*dy;
        const maxD2 = config.connectionDistance * config.connectionDistance;
        if (d2 <= maxD2){
          const alpha = 1 - (d2 / maxD2);
          ctx.strokeStyle = config.color + (0.08 * alpha) + ')';
          ctx.lineWidth = config.lineWidth * alpha;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // draw particles
    for (let p of particles){
      ctx.fillStyle = config.color + '0.95)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, config.particleSize, 0, Math.PI*2);
      ctx.fill();
    }
  }

  let rafId = null;
  function loop(){
    update();
    draw();
    rafId = window.requestAnimationFrame(loop);
  }

  function onMouseMove(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }
  function onMouseLeave(){ mouse.x = null; mouse.y = null }

  function onResizeDebounced(){
    resize();
    createParticles();
  }

  // init
  resize();
  createParticles();
  window.addEventListener('resize', onResizeDebounced);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);

  // start
  loop();

  // expose a small API to stop/start if needed
  window.__linesBg = {
    stop: function(){ if (rafId) window.cancelAnimationFrame(rafId); rafId = null; },
    start: function(){ if (!rafId) loop(); },
  };
})();
