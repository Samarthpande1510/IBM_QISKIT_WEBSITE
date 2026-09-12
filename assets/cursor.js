(function () {
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pointerFine = window.matchMedia('(pointer: fine)').matches;

  if (pointerFine) {
    document.body.classList.add('cursor-hidden');
  }

  var qcRing = document.getElementById('qc-ring');
  var qcDot = document.getElementById('qc-dot');
  if (qcRing && qcDot && pointerFine) {
    var px = innerWidth / 2, py = innerHeight / 2;
    var rx = px, ry = py;
    var state = 'default';

    function setState(next) {
      if (next === state) return;
      state = next;
      ['is-clickable', 'is-text'].forEach(function (c) {
        qcRing.classList.toggle(c, c === 'is-' + next);
        qcDot.classList.toggle(c, c === 'is-' + next);
      });
    }

    function classify(target) {
      var el = target && target.nodeType === 1 ? target : null;
      if (!el) return setState('default');
      if (el.closest('input, textarea, select, [contenteditable="true"]')) return setState('text');
      if (el.closest('a, button, summary, .btn, .btn-quiet, .menu-btn, .switch button, .code-tabs button, .fab-btn, .map')) return setState('clickable');
      setState('default');
    }

    addEventListener('pointermove', function (e) {
      px = e.clientX; py = e.clientY;
      qcRing.classList.add('is-visible');
      qcDot.classList.add('is-visible');
      classify(e.target);
    }, { passive: true });

    addEventListener('pointerdown', function () {
      qcRing.classList.remove('is-burst');
      void qcRing.offsetWidth;
      qcRing.classList.add('is-burst');
    });

    ['pointerleave', 'blur'].forEach(function (ev) {
      addEventListener(ev, function () {
        qcRing.classList.remove('is-visible');
        qcDot.classList.remove('is-visible');
      });
    });

    (function frame() {
      var ease = reduced ? 1 : 0.19;
      rx += (px - rx) * ease;
      ry += (py - ry) * ease;
      qcDot.style.transform = 'translate3d(' + px + 'px,' + py + 'px,0)';
      qcRing.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      requestAnimationFrame(frame);
    })();
  }

  if (!reduced && pointerFine) {
    var interferenceCanvas = document.getElementById('quantum-interference');
    if (interferenceCanvas) {
      var interferenceCtx = interferenceCanvas.getContext('2d');
      var interferenceWaves = [];
      var maxConcurrentWaves = 5;

      function resizeInterferenceCanvas() {
        var ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        interferenceCanvas.width = Math.max(1, Math.round(window.innerWidth * ratio));
        interferenceCanvas.height = Math.max(1, Math.round(window.innerHeight * ratio));
        interferenceCanvas.style.width = window.innerWidth + 'px';
        interferenceCanvas.style.height = window.innerHeight + 'px';
        interferenceCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
      }

      function emitRipple(x, y) {
        if (interferenceWaves.length >= maxConcurrentWaves) {
          interferenceWaves.shift();
        }

        interferenceWaves.push({
          x: x,
          y: y,
          radius: 0,
          speed: 140,
          life: 0,
          ttl: 0.55,
          maxRadius: 180
        });
      }

      function tickInterferenceFrame(time) {
        var elapsed = Math.min(0.032, (time - (tickInterferenceFrame.lastTime || time)) / 1000 || 0.016);
        tickInterferenceFrame.lastTime = time;

        interferenceCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        interferenceCtx.globalCompositeOperation = 'screen';

        for (var i = interferenceWaves.length - 1; i >= 0; i--) {
          var wave = interferenceWaves[i];
          wave.life += elapsed;
          wave.radius = (wave.life / wave.ttl) * wave.maxRadius;

          var progress = wave.life / wave.ttl;
          if (progress >= 1) {
            interferenceWaves.splice(i, 1);
            continue;
          }

          var alpha = (1 - progress) * 0.35;
          var lineWidth = 0.8 + (1 - progress) * 0.8;

          interferenceCtx.beginPath();
          interferenceCtx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          interferenceCtx.strokeStyle = 'rgba(255, 116, 184, ' + alpha + ')';
          interferenceCtx.lineWidth = lineWidth;
          interferenceCtx.shadowBlur = 6;
          interferenceCtx.shadowColor = 'rgba(255, 116, 184, 0.4)';
          interferenceCtx.stroke();
        }

        interferenceCtx.shadowBlur = 0;
        interferenceCtx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(tickInterferenceFrame);
      }

      document.addEventListener('pointerdown', function (event) {
        emitRipple(event.clientX, event.clientY);
      }, { passive: true });
      window.addEventListener('resize', resizeInterferenceCanvas);
      resizeInterferenceCanvas();
      requestAnimationFrame(tickInterferenceFrame);
    }
  }
})();