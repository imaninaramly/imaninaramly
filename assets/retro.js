(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const PAL = {
    k:'#1b1433', w:'#ffffff',
    h:'#dcb8f2', H:'#b48ad9', e:'#8a5a3c', E:'#b98556',
    s:'#f0bb94', S:'#d39a74', b:'#f38c9a', m:'#b3474f',
    j:'#1f8f9c', J:'#146270', g:'#5d3fb0', G:'#3f2a80',
    p:'#2a3478', P:'#1c2456', o:'#3b2f55',
    y:'#ffd36e', Y:'#e8a93c', l:'#dcd0ff', L:'#b9a3ff',
    c:'#f6a667', C:'#d9803f', v:'#5b4a86', r:'#ff5a6e',
    n:'#8f88d6', N:'#5f589e', t:'#6b3f5c', T:'#4c2a42',
    f:'#ff9ec7', F:'#e0689f', q:'#ffd3e8',
    x:'#4fd1a5', X:'#2b8f76', u:'#52e0c4', U:'#2a9c86',
    z:'#a9a6c9', Z:'#77749c', d:'#c27a45', D:'#8f5330', O:'#ff8f70'
  };

  const mirror = (rows, odd) => rows.map(r => r + [...(odd ? r.slice(0, -1) : r)].reverse().join(''));
  const grid = (w, h) => Array.from({length: h}, () => Array(w).fill('.'));
  const outline = g => {
    const o = g.map(r => r.slice());
    for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) {
      if (g[y][x] !== '.') continue;
      if ([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy]) => { const c = g[y+dy]?.[x+dx]; return c && c !== '.' && c !== 'k'; })) o[y][x] = 'k';
    }
    return o.map(r => r.join(''));
  };
  const rect = (g, x0, y0, x1, y1, ch) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) g[y][x] = typeof ch === 'function' ? ch(x, y) : ch; };

  const tree = () => {
    const g = grid(40, 44);
    rect(g, 17, 24, 22, 41, x => x >= 21 ? 'T' : 't');
    rect(g, 14, 41, 25, 42, 't');
    for (let i = 0; i < 7; i++) { g[27-i][16-i] = g[27-i][17-i] = 't'; g[26-i][23+i] = g[26-i][24+i] = 't'; }
    const blobs = [[20,13,11],[9,18,7],[31,18,7],[13,8,7],[27,8,7],[20,21,8]];
    for (let y = 1; y < 43; y++) for (let x = 1; x < 39; x++) {
      const b = blobs.find(([cx,cy,r]) => (x-cx)**2 + (y-cy)**2 <= r*r);
      if (!b) continue;
      const rel = (y - b[1]) / b[2];
      let ch = rel > .4 ? 'F' : (rel < -.45 && x < b[0]) ? 'q' : 'f';
      if ((x*7 + y*11) % 19 === 0) ch = 'w';
      g[y][x] = ch;
    }
    return outline(g);
  };
  const lamp = () => {
    const g = grid(18, 46);
    rect(g, 3, 6, 4, 41, x => x === 4 ? 'N' : 'n');
    rect(g, 3, 5, 12, 6, 'n');
    rect(g, 9, 7, 15, 8, 'N');
    rect(g, 10, 9, 14, 11, 'y');
    rect(g, 1, 40, 6, 44, 'N');
    rect(g, 2, 38, 5, 39, 'n');
    return outline(g);
  };
  const plant = open => {
    const g = grid(20, 18);
    for (let y = 1; y < 12; y++) for (let x = 4; x < 16; x++) if ((x-9.5)**2 + (y-6)**2 <= 26) g[y][x] = 'r';
    if (open) { rect(g, 5, 5, 14, 8, 'k'); [6,9,12].forEach(x => { g[5][x] = 'w'; g[8][x+1] = 'w'; }); }
    else rect(g, 6, 6, 13, 7, 'k');
    [[7,3],[12,3],[13,10],[6,10]].forEach(([x,y]) => g[y][x] = 'w');
    rect(g, 9, 11, 10, 17, 'x');
    rect(g, 5, 13, 8, 14, 'x'); rect(g, 11, 13, 14, 14, 'x');
    return outline(g);
  };
  const pipe = () => {
    const g = grid(20, 14);
    rect(g, 1, 1, 18, 4, x => x >= 15 ? 'U' : x === 3 ? 'l' : 'u');
    rect(g, 3, 5, 16, 13, x => x >= 13 ? 'U' : x === 5 ? 'l' : 'u');
    const o = outline(g); o[13] = o[13].replace(/u|U|l/g, 'k');
    return o;
  };
  const door = () => {
    const g = grid(22, 30);
    for (let y = 1; y < 29; y++) for (let x = 1; x < 21; x++) {
      if (y >= 10 || (x-10.5)**2 + (y-10)**2 <= 90) g[y][x] = (y % 4 === 0 || (x + (Math.floor(y/4) % 2) * 3) % 6 === 0) ? 'Z' : 'z';
    }
    for (let y = 5; y < 29; y++) for (let x = 5; x < 17; x++) {
      if (y >= 12 || (x-10.5)**2 + (y-12)**2 <= 34) g[y][x] = x % 3 === 0 ? 'D' : 'd';
    }
    rect(g, 5, 15, 16, 15, 'D'); rect(g, 5, 23, 16, 23, 'D');
    g[19][14] = g[19][13] = 'y';
    return outline(g);
  };
  const flag = ph => {
    const g = grid(16, 32);
    rect(g, 2, 3, 2, 28, 'n');
    rect(g, 1, 1, 3, 2, 'y');
    for (let y = 3; y <= 11; y++) for (let x = 3; x <= 3 + 10 - Math.abs(y - 7) * 2; x++) {
      const yy = y + ((x + ph) % 4 < 2 ? 0 : 1);
      g[yy][x] = 'O';
    }
    rect(g, 1, 29, 3, 30, 'N');
    return outline(g);
  };

  const PLAYER = mirror([
    ".......kkkk", ".....kkhhhh", "....khhhhhh", "...khhhhhhh",
    "..kEhhhhhhh", ".kEEEhhhhhh", ".kEeEhhssss", ".kEeEhsssss",
    ".kEeEhskwss", ".kEEEhskkss", "..kEhsbbsss", "...khgGssms",
    "...khgGsssm", "...kwwhSsss", "..kjjjhhhhh", "..kjjjjjhhh",
    ".kjJjjjjjjh", ".kjJjjjjjjj", ".kjJjjjjjjj", ".kjJjjjjjjw",
    ".kJJjjjjjjw", "..kJJJJJJJw", "...kppppppp", "...kpppPppk",
    "...kpppPppk", "...kpppPppk", "..koooooook", "..kkkkkkkk."
  ]);
  const step = (rows, from, to) => rows.map((r, y) => {
    if (y < 23) return r;
    const src = rows[y + 1] || '.'.repeat(r.length);
    return r.slice(0, from) + src.slice(from, to) + r.slice(to);
  });
  const blink = rows => rows.map((r, y) => y === 8 ? r.slice(0, 7) + 'ss' + r.slice(9, 13) + 'ss' + r.slice(15) : r);

  const SPRITES = {
    player: PLAYER,
    playerW1: step(PLAYER, 0, 11),
    playerW2: step(PLAYER, 11, 22),
    playerBlink: blink(PLAYER),
    star: mirror(["....k", "...ky", "...ky", "kkkky", "kyyyy", ".kyyy", "..kyy", ".kyyk", ".kyk.", "kk..."], true),
    heart: [".kk.kk.", "krrkrrk", "krwrrrk", "krrrrrk", ".krrrk.", "..krk..", "...k..."],
    coin: ["..kkkk..", ".kyyyyk.", "kyywyyYk", "kywyyyYk", "kyyyyyYk", "kyyyyYYk", ".kYYYYk.", "..kkkk.."],
    coin2: ["...kk...", "..kyyk..", "..kwyk..", "..kyyk..", "..kyyk..", "..kyYk..", "..kYYk..", "...kk..."],
    coin3: ["...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk...", "...kk..."],
    cloud: [
      "....kkkk........", "..kkwwwwkk.kkk..", ".kwwwwwwwwkwwwk.", "kwwwwwwwwwwwwwwk",
      "kwwllwwwwwwllwwk", "kLLLLLLLLLLLLLLk", ".kkkkkkkkkkkkkk."
    ],
    cat: [
      "k...k.........", "kkkkk.........", "kckck.........", "kcbck.........",
      ".kcckkkkkk....", ".kcccccccck..k", ".kcCcccCcck.kc", ".kcccccccckkck",
      ".kcCcccCccckck", ".kccccccccck..", ".kckkckkkckk..", ".kk..kk..kk..."
    ],
    catW: [
      "k...k.........", "kkkkk.........", "kckck.........", "kcbck.........",
      ".kcckkkkkk...k", ".kcccccccck.kc", ".kcCcccCcckkck", ".kcccccccckck.",
      ".kcCcccCccck..", ".kccccccccck..", ".kkckkkckkck..", "..kk..kk..kk.."
    ],
    bat: ["k.........k", "kk..k.k..kk", "kvvkvvvkvvk", ".kvvrvrvvk.", "..kvvvvvk..", "....kvk...."],
    bat2: ["...........", "....k.k....", ".kkkvvvkkk.", "kvvvrvrvvvk", "kvkvvvvvkvk", "k..kkvkk..k"],
    key: [".kkk......", "kyyyk.....", "ky.yykkkkk", "kyyyyyyyyk", ".kkk.kykyk", ".....k.k.k"],
    tree: tree(), lamp: lamp(), pipe: pipe(), door: door(),
    plant: plant(false), plantOpen: plant(true),
    flag: flag(0), flag2: flag(2)
  };

  const cache = {};
  const bitmap = name => {
    if (cache[name]) return cache[name];
    const rows = SPRITES[name];
    const c = document.createElement('canvas');
    c.width = rows[0].length; c.height = rows.length;
    const ctx = c.getContext('2d');
    rows.forEach((row, y) => [...row].forEach((ch, x) => { if (PAL[ch]) { ctx.fillStyle = PAL[ch]; ctx.fillRect(x, y, 1, 1); } }));
    return cache[name] = c;
  };
  const draw = (canvas, name) => {
    if (canvas._s === name) return;
    const b = bitmap(name);
    if (canvas.width !== b.width || canvas.height !== b.height) {
      canvas.width = b.width; canvas.height = b.height;
      canvas.style.setProperty('--w', b.width); canvas.style.setProperty('--h', b.height);
    }
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, b.width, b.height);
    ctx.drawImage(b, 0, 0);
    canvas._s = name;
  };

  document.querySelectorAll('canvas[data-s]').forEach(c => draw(c, c.dataset.s));

  /* --- frame animations: data-anim="a,b,c" data-fps --- */
  const anims = [...document.querySelectorAll('canvas[data-anim]')].map(c => ({
    c, frames: c.dataset.anim.split(','), fps: +c.dataset.fps || 6, t: Math.random()
  }));

  /* --- title letters --- */
  document.querySelectorAll('.wave').forEach(el => {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.innerHTML = `<span aria-hidden="true" style="animation:none">${[...text].map((ch, i) => ch === ' ' ? ' ' : `<span style="--i:${i}">${ch}</span>`).join('')}</span>`;
  });

  /* --- ribbons --- */
  document.querySelectorAll('.ribbon[data-text]').forEach(r => {
    const track = document.createElement('div');
    track.className = 'ribbon-track';
    track.innerHTML = Array(16).fill(`<span>${r.dataset.text}<b>★</b></span>`).join('');
    r.appendChild(track);
  });

  /* --- tiles stagger --- */
  document.querySelectorAll('.tiles').forEach(t => [...t.children].forEach((el, i) => el.style.setProperty('--i', i)));

  /* --- photo crop --- */
  const photos = document.querySelectorAll('canvas[data-photo]');
  if (photos.length) {
    const img = new Image();
    img.onload = () => photos.forEach(c => {
      const N = 720;
      c.width = N; c.height = N;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 225, 280, 360, 360, 0, 0, N, N);
    });
    img.src = photos[0].dataset.photo;
  }

  /* --- coins + HUD counter --- */
  const counter = document.getElementById('coins');
  let coins = 0;
  try { coins = +localStorage.getItem('coins') || 0; } catch (e) {}
  const showCoins = () => { if (counter) counter.textContent = String(coins).padStart(2, '0'); };
  showCoins();
  const plus = (host, x, y, text = '+1') => {
    const p = document.createElement('span');
    p.className = 'plus1'; p.textContent = text;
    p.style.left = x + 'px'; p.style.top = y + 'px';
    host.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  };
  const addCoin = () => {
    coins++;
    try { localStorage.setItem('coins', coins); } catch (e) {}
    showCoins();
    const box = counter?.parentElement;
    if (box) { box.classList.remove('bump'); void box.offsetWidth; box.classList.add('bump'); }
  };
  const collect = coin => {
    if (coin.classList.contains('got')) return;
    coin.classList.add('got');
    const host = coin.offsetParent || coin.parentElement;
    plus(host, coin.offsetLeft, coin.offsetTop - 10);
    addCoin();
    setTimeout(() => coin.classList.remove('got'), 5000);
  };
  document.querySelectorAll('.coin').forEach(c => {
    c.addEventListener('pointerenter', () => collect(c));
    c.addEventListener('click', () => collect(c));
  });
  document.querySelectorAll('.qblock').forEach(q => q.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); q.click(); }
  }));
  document.querySelectorAll('.qblock').forEach(q => q.addEventListener('click', () => {
    const host = q.parentElement;
    host.style.position = 'relative';
    plus(host, q.offsetLeft + q.offsetWidth / 2 - 12, q.offsetTop - 16, '+1');
    addCoin();
  }));

  /* --- dialogs --- */
  document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.open)?.showModal()));
  document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

  /* --- jumping --- */
  const jump = (c, h, d) => {
    if (c.classList.contains('jump')) return false;
    if (h) c.style.setProperty('--jh', h + 'px');
    if (d) c.style.setProperty('--jd', d + 's');
    c.classList.add('jump');
    c.addEventListener('animationend', () => c.classList.remove('jump'), {once: true});
    return true;
  };

  /* --- walkers --- */
  const walkers = [...document.querySelectorAll('[data-walk]')].map(el => {
    const c = el.querySelector('canvas');
    const w = {
      el, c,
      idleFrame: c.dataset.s,
      frames: el.dataset.walk.split(','),
      min: +el.dataset.min || 0, max: +el.dataset.max || 50,
      speed: +el.dataset.speed || 50,
      faceLeft: el.dataset.face === 'left',
      auto: el.hasAttribute('data-auto'),
      x: 0, dir: Math.random() < .5 ? -1 : 1, t: 0, pause: 0, blink: 2 + Math.random() * 3
    };
    const pw = () => el.parentElement.clientWidth;
    w.x = pw() * (w.min + Math.random() * (w.max - w.min)) / 100;
    el.addEventListener('click', () => { jump(c, +el.dataset.jh || 90, .8); w.pause = 0; });
    return w;
  });
  const place = w => {
    const flip = w.faceLeft ? (w.dir > 0 ? -1 : 1) : (w.dir < 0 ? -1 : 1);
    w.el.style.transform = `translateX(${w.x}px) scaleX(${w.el.dataset.noflip != null ? 1 : flip})`;
  };
  walkers.forEach(place);

  const hit = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;

  let last = performance.now();
  const loop = now => {
    const dt = Math.max(0, Math.min(.05, (now - last) / 1000)); last = now;

    anims.forEach(a => {
      a.t += dt;
      draw(a.c, a.frames[Math.floor(a.t * a.fps) % a.frames.length]);
    });

    walkers.forEach(w => {
      const W = w.el.parentElement.clientWidth, ew = w.el.offsetWidth;
      const lo = W * w.min / 100, hi = Math.max(lo, W * w.max / 100 - ew);
      const air = w.c.classList.contains('jump');
      w.t += dt;
      if (w.pause > 0 && !air) {
        w.pause -= dt;
        w.blink -= dt;
        draw(w.c, w.blink < 0 && w.blink > -.15 && SPRITES[w.idleFrame + 'Blink'] ? w.idleFrame + 'Blink' : w.idleFrame);
        if (w.blink < -.15) w.blink = 2 + Math.random() * 3;
      } else {
        w.x += w.dir * w.speed * (air ? 1.9 : 1) * dt;
        if (w.x > hi) { w.x = hi; w.dir = -1; w.pause = w.auto ? 0 : .6 + Math.random(); }
        if (w.x < lo) { w.x = lo; w.dir = 1; w.pause = w.auto ? 0 : .6 + Math.random(); }
        if (!w.auto && Math.random() < dt * .25) w.pause = 1 + Math.random() * 2;
        if (!w.auto && w.frames.length > 1 && Math.random() < dt * .12) jump(w.c, +w.el.dataset.jh || 90, .8);
        draw(w.c, air ? w.frames[0] : w.frames[Math.floor(w.t * 7) % w.frames.length]);
        place(w);
      }
      if (w.auto) {
        const cx = w.x + ew / 2;
        w.el.parentElement.querySelectorAll('[data-obstacle]').forEach(o => {
          const ox = o.offsetLeft + o.offsetWidth / 2;
          const d = (ox - cx) * w.dir;
          if (d > 0 && d < (o.offsetWidth + ew) / 2 + 24) jump(w.c, +w.el.dataset.jh || 150, 1);
        });
        const r = w.c.getBoundingClientRect();
        w.el.parentElement.querySelectorAll('.coin:not(.got)').forEach(coin => {
          if (hit(r, coin.getBoundingClientRect())) collect(coin);
        });
      }
    });
    requestAnimationFrame(loop);
  };
  if (!reduce) requestAnimationFrame(loop);

  /* --- reveal on scroll --- */
  document.documentElement.classList.add('js');
  const reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) reveals.forEach(el => el.classList.add('on'));
  else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
    }), {threshold: .15});
    reveals.forEach((el, i) => { el.style.animationDelay = `${(i % 3) * 90}ms`; io.observe(el); });
  }

  /* --- typewriter --- */
  document.querySelectorAll('[data-type]').forEach(el => {
    const text = el.textContent.trim();
    if (reduce) return;
    const sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = text;
    const vis = document.createElement('span'); vis.setAttribute('aria-hidden', 'true');
    const caret = document.createElement('span'); caret.className = 'caret'; caret.setAttribute('aria-hidden', 'true'); caret.textContent = '▼';
    el.textContent = ''; el.append(sr, vis, caret);
    let i = 0, started = false;
    const tick = () => { vis.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(tick, 22); };
    new IntersectionObserver((es, o) => { if (es[0].isIntersecting && !started) { started = true; tick(); o.disconnect(); } }).observe(el);
  });

  /* --- shooting stars --- */
  const sky = document.querySelector('.hero');
  if (sky && !reduce) setInterval(() => {
    if (document.hidden) return;
    const s = document.createElement('i');
    s.className = 'shooting';
    s.style.left = 40 + Math.random() * 60 + '%';
    s.style.top = 60 + Math.random() * 180 + 'px';
    sky.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  }, 3800);

  /* --- click sparkles --- */
  if (!reduce) addEventListener('pointerdown', e => {
    const colors = ['#ffd36e', '#52e0c4', '#ff8f70', '#b9a3ff'];
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('i');
      const a = i / 8 * Math.PI * 2, r = 26 + Math.random() * 18;
      s.className = 'spark';
      s.style.left = e.clientX - 3 + 'px'; s.style.top = e.clientY - 3 + 'px';
      s.style.background = colors[i % 4];
      s.style.setProperty('--dx', Math.cos(a) * r + 'px');
      s.style.setProperty('--dy', Math.sin(a) * r + 'px');
      document.body.appendChild(s);
      s.addEventListener('animationend', () => s.remove());
    }
  });

  /* --- scroll XP bar --- */
  const bar = document.createElement('div');
  bar.className = 'xpbar'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.setProperty('--p', max > 0 ? scrollY / max : 0);
  };
  addEventListener('scroll', onScroll, {passive: true}); onScroll();

  /* --- pixel wipe between pages --- */
  if (!reduce) document.addEventListener('click', e => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname) || (url.pathname === location.pathname && url.hash)) return;
    e.preventDefault();
    const wipe = document.createElement('div');
    wipe.className = 'wipe';
    wipe.innerHTML = Array.from({length: 8}, (_, i) => `<i style="--i:${i}"></i>`).join('') + '<b>LOADING...</b>';
    document.body.appendChild(wipe);
    setTimeout(() => { location.href = url.href; }, 420);
  });
  addEventListener('pageshow', e => { if (e.persisted) document.querySelectorAll('.wipe').forEach(w => w.remove()); });

  /* --- dashed wires (Level 01 stage) --- */
  const stage = document.querySelector('.stage');
  if (stage) {
    const wires = stage.querySelector('.wires');
    const con = stage.querySelector('.console');
    const drawWires = () => {
      if (innerWidth <= 720) { wires.innerHTML = ''; return; }
      const s = stage.getBoundingClientRect(), c = con.getBoundingClientRect();
      const cx = c.left + c.width / 2, cy = c.top + c.height / 2;
      wires.setAttribute('viewBox', `0 0 ${s.width} ${s.height}`);
      wires.innerHTML = [...stage.querySelectorAll('[data-wire]')].map(el => {
        const r = el.getBoundingClientRect();
        const x = Math.max(r.left, Math.min(cx, r.right)), y = Math.max(r.top, Math.min(cy, r.bottom));
        return `<line x1="${cx - s.left}" y1="${cy - s.top}" x2="${x - s.left}" y2="${y - s.top}"/>`;
      }).join('');
    };
    addEventListener('resize', drawWires);
    addEventListener('load', drawWires);
    document.fonts?.ready.then(drawWires);
    setTimeout(drawWires, 900);
    drawWires();
  }
})();
