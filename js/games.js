/* Seven little games for remembering words, tones, strokes and classic lines. */
(function () {
  var LC = window.LC, h = LC.h, S = LC.state, ui = LC.ui;
  var G = LC.games = {}, timers = [], alive = 0;
  function later(fn, ms) { var id = alive; timers.push(setTimeout(function () { if (id === alive) fn(); }, ms)); }
  G.stop = function () { alive++; timers.forEach(clearTimeout); timers = []; };

  LC.gameList = [
    { id: 'match', emoji: '🃏', name: 'Memory Match', zh: '翻翻乐', desc: 'Flip the cards and pair each word with its meaning.', color: '#ff8a5c' },
    { id: 'listen', emoji: '👂', name: 'Listen & Pick', zh: '听一听', desc: 'Hear a word and tap the right characters.', color: '#5cc8ff' },
    { id: 'balloon', emoji: '🎈', name: 'Balloon Pop', zh: '打气球', desc: 'Pop the balloon that matches the meaning before it flies away! A star for every first-try pop.', color: '#ff6f91' },
    { id: 'build', emoji: '🧩', name: 'Sentence Builder', zh: '连词成句', desc: 'Put the mixed-up words back in the right order.', color: '#4dd0a7' },
    { id: 'tone', emoji: '🎵', name: 'Tone Master', zh: '声调大师', desc: 'Listen and choose the right tone: mā, má, mǎ or mà?', color: '#ab7df6' },
    { id: 'blank', emoji: '📜', name: 'Fill the Blank', zh: '填空', desc: 'A word is missing from a famous line. Which one?', color: '#f9a825' },
    { id: 'write', emoji: '✍️', name: 'Stroke Hero', zh: '写字小英雄', desc: 'Write characters from memory, stroke by stroke.', color: '#3ec6c6' }
  ];
  function meta(id) { return LC.gameList.filter(function (g) { return g.id === id; })[0]; }

  G.menu = function () {
    ui.render([
      h('div', { class: 'page-head' }, [h('h1', null, '🎮 Games 游戏'), h('p', null, 'Playing is the best way to remember. Every right answer earns stars ⭐. Pick a game — you can choose which lesson\'s words to play with inside.')]),
      h('div', { class: 'grid games' }, LC.gameList.map(function (g) {
        var r = S.games[g.id];
        return h('a', { class: 'card game', href: '#game/' + g.id, style: { '--c': g.color } }, [h('div', { class: 'card-emoji' }, g.emoji), h('div', { class: 'card-zh', lang: 'zh-Hans' }, g.zh), h('div', { class: 'card-en' }, g.name), h('p', null, g.desc), h('div', { class: 'card-p' }, r ? 'Best: ' + r.best + ' ⭐ · played ' + r.plays + '×' : 'Not played yet')]);
      })),
      h('div', { class: 'tip' }, [h('span', { class: 'panda' }, '🐼'), h('p', null, 'Tip: finish a lesson first, then open its games from the bottom of the lesson page to practise exactly those words.')])
    ]);
  };

  function sentencesOf(poolId) {
    var lessons = poolId === 'all' ? LC.allLessons() : poolId === 'daily' ? LC.daily : poolId === 'classics' ? LC.classics : [LC.findLesson(poolId)].filter(Boolean);
    var out = [];
    lessons.forEach(function (l) { LC.lessonSentences(l).forEach(function (s) { out.push({ s: s, toks: LC.parse(s[0]), lesson: l }); }); });
    return out;
  }

  G.start = function (id, poolId) {
    var g = meta(id); if (!g) return G.menu();
    poolId = poolId || S.lastPool || 'daily'; if (poolId !== 'all' && poolId !== 'daily' && poolId !== 'classics' && !LC.findLesson(poolId)) poolId = 'daily';
    S.lastPool = poolId; LC.save();
    var sel = h('select', { class: 'poolsel', 'aria-label': 'Choose words', onchange: function () { location.hash = '#game/' + id + '/' + sel.value; } }, [
      opt('daily', '🗣️ All Daily Chinese'), opt('classics', '📚 All Classics'), opt('all', '🌏 Everything'),
      h('optgroup', { label: 'Daily Chinese' }, LC.daily.map(function (l) { return opt(l.id, l.emoji + ' ' + l.zh + ' ' + l.title); })),
      h('optgroup', { label: 'Classics' }, LC.classics.map(function (l) { return opt(l.id, l.emoji + ' ' + l.zh + ' ' + l.title); }))
    ]);
    function opt(v, t) { return h('option', { value: v, selected: v === poolId ? 'selected' : null }, t); }
    var scoreEl = h('b', null, '0'), roundEl = h('span', { class: 'round' }), stage = h('div', { class: 'gstage g-' + id });
    var back = LC.findLesson(poolId) ? h('a', { class: 'back', href: '#lesson/' + poolId }, '← ' + LC.findLesson(poolId).zh) : h('a', { class: 'back', href: '#games' }, '← Games');
    ui.render([back, h('div', { class: 'ghead', style: { '--c': g.color } }, [h('h1', null, g.emoji + ' ' + g.name + ' ', h('span', { lang: 'zh-Hans' }, g.zh)), h('div', { class: 'gmeta' }, [sel, roundEl, h('span', { class: 'gscore' }, ['⭐ ', scoreEl])])]), h('p', { class: 'note' }, g.desc), stage]);
    alive++; var score = 0, missed = {};
    var ctx = {
      stage: stage, poolId: poolId, words: LC.pool(poolId).filter(function (t) { return !/^[A-Z]/.test(t.py) || t.w.length <= 2; }), sentences: sentencesOf(poolId),
      point: function (n) { score += (n == null ? 1 : n); scoreEl.textContent = score; scoreEl.parentNode.classList.remove('bump'); void scoreEl.offsetWidth; scoreEl.parentNode.classList.add('bump'); },
      round: function (i, n) { roundEl.textContent = 'Round ' + i + ' / ' + n; },
      miss: function (t) { if (t && t.w) { missed[t.w] = t; LC.scoreWord(t.w, false); } },
      hit: function (t) { if (t && t.w) LC.scoreWord(t.w, true); },
      finish: function (msg) {
        var r = S.games[id] || (S.games[id] = { best: 0, plays: 0 }); r.plays++; var record = score > r.best; if (record) r.best = score;
        LC.addStars(score, 'game'); LC.sfx('win'); if (score > 0) ui.confetti(record ? 40 : 20);
        var m = Object.keys(missed).map(function (k) { return missed[k]; });
        stage.innerHTML = ''; stage.className = 'gstage gend';
        stage.appendChild(h('div', { class: 'endbox' }, [
          h('div', { class: 'end-e' }, score >= 8 ? '🏆' : score >= 4 ? '🎉' : '🐼'),
          h('h2', null, msg || (score >= 8 ? '太棒了! Fantastic!' : score >= 4 ? '很好! Well done!' : '加油! Keep going!')),
          h('p', null, ['You earned ', h('b', null, score + ' ⭐'), record && r.plays > 1 ? ' — a new record!' : '']),
          h('div', { class: 'hero-btns' }, [h('button', { class: 'btn big', onclick: function () { G.start(id, poolId); } }, '🔁 Play again'), h('a', { class: 'btn ghost big', href: '#games' }, '🎮 Other games')]),
          m.length ? h('h3', null, '🔁 Words to look at again') : null,
          m.length ? h('div', { class: 'wordgrid small' }, m.map(ui.wordChip)) : null
        ]));
      }
    };
    if (ctx.words.length < 6) { stage.appendChild(h('p', null, 'Not enough words here — choose another lesson above.')); return; }
    games[id](ctx);
  };

  function wordFace(t, showPy) {
    return [showPy ? h('small', { class: 'gpy' }, t.py) : null, h('span', { class: 'ghz', lang: 'zh-Hans' }, t.w)];
  }
  function distinct(pool, t, n, key) {
    key = key || function (x) { return x.w; };
    return LC.shuffle(pool.filter(function (x) { return key(x) !== key(t) && x.en !== t.en; })).slice(0, n);
  }
  var games = {};

  /* ---------- 1. Memory match ---------- */
  games.match = function (c) {
    var picks = LC.sample(c.words.filter(function (t) { return t.w.length <= 3; }), 6), cards = [], open = [], lock = false, found = 0, tries = 0;
    picks.forEach(function (t) { cards.push({ t: t, side: 'zh' }); cards.push({ t: t, side: 'en' }); });
    cards = LC.shuffle(cards);
    var board = h('div', { class: 'board' }), info = h('p', { class: 'note center' }, 'Find the 6 pairs. Fewer tries = more stars!');
    cards.forEach(function (cd) {
      var el = h('button', { class: 'mcard', 'aria-label': 'card' }, [h('span', { class: 'mfront' }, '🐼'), h('span', { class: 'mback' }, cd.side === 'zh' ? wordFace(cd.t, S.pinyin) : [h('span', { class: 'memoji' }, cd.t.emoji), h('span', { class: 'men' }, cd.t.en)])]);
      cd.el = el;
      el.addEventListener('click', function () {
        if (lock || el.classList.contains('open')) return;
        el.classList.add('open'); LC.sfx('flip'); open.push(cd);
        if (cd.side === 'zh') LC.speak(cd.t.w);
        if (open.length < 2) return;
        tries++; lock = true;
        var a = open[0], b = open[1]; open = [];
        if (a.t === b.t) {
          later(function () { a.el.classList.add('ok'); b.el.classList.add('ok'); LC.sfx('ok'); LC.speak(a.t.w); c.hit(a.t); lock = false; found++; info.textContent = found + ' of 6 pairs found · ' + tries + ' tries';
            if (found === 6) { c.point(Math.max(3, 10 - Math.max(0, tries - 8))); later(function () { c.finish(); }, 1100); } }, 350);
        } else {
          c.miss(a.t); later(function () { a.el.classList.remove('open'); b.el.classList.remove('open'); lock = false; info.textContent = found + ' of 6 pairs found · ' + tries + ' tries'; }, 1100);
        }
      });
      board.appendChild(el);
    });
    c.stage.appendChild(info); c.stage.appendChild(board);
  };

  /* ---------- shared quiz loop ---------- */
  function quiz(c, total, makeRound) {
    var i = 0;
    function next() {
      if (i >= total) return c.finish();
      i++; c.round(i, total); c.stage.innerHTML = '';
      makeRound(function (ok, t, delay) {
        if (ok) { c.point(); c.hit(t); LC.sfx('ok'); } else { c.miss(t); LC.sfx('bad'); }
        later(next, delay || (ok ? 1100 : 2300));
      }, i);
    }
    next();
  }
  function choices(opts, isRight, render, onPick, cls) {
    var done = false, box = h('div', { class: 'choices ' + (cls || '') });
    opts.forEach(function (o) {
      var b = h('button', { class: 'choice' }, render(o));
      b.addEventListener('click', function () {
        if (done) return; done = true;
        var ok = isRight(o); b.classList.add(ok ? 'right' : 'wrong');
        if (!ok) Array.prototype.forEach.call(box.children, function (x, k) { if (isRight(opts[k])) x.classList.add('right'); });
        onPick(ok, o);
      });
      box.appendChild(b);
    });
    return box;
  }

  /* ---------- 2. Listen & pick ---------- */
  games.listen = function (c) {
    var qs = LC.sample(c.words, 10);
    quiz(c, qs.length, function (done, i) {
      var t = qs[i - 1], opts = LC.shuffle([t].concat(distinct(c.words, t, 3)));
      var reveal = h('div', { class: 'reveal' });
      var hint = h('button', { class: 'btn ghost small', onclick: function () { reveal.textContent = t.py; } }, '💡 Pinyin hint');
      var spk = h('button', { class: 'bigspk', 'aria-label': 'Listen again', onclick: function () { LC.speak(t.w); } }, '🔊');
      c.stage.appendChild(h('div', { class: 'qbox' }, [spk, h('p', null, 'Which word did you hear?'), hint, reveal]));
      c.stage.appendChild(choices(opts, function (o) { return o === t; }, function (o) { return wordFace(o, false); }, function (ok) {
        reveal.innerHTML = ''; reveal.appendChild(h('span', null, [h('b', { lang: 'zh-Hans' }, t.w), ' ' + t.py + ' — ' + t.emoji + ' ' + t.en]));
        done(ok, t);
      }));
      later(function () { LC.speak(t.w); }, 350);
      if (!LC.voices().length) reveal.textContent = '(no Chinese voice on this device — pinyin: ' + t.py + ')';
    });
  };

  /* ---------- 3. Balloon pop ---------- */
  games.balloon = function (c) {
    var qs = LC.sample(c.words, 10), lives = 3, colors = ['#ff6b6b', '#ffa94d', '#ffd43b', '#69db7c', '#4dabf7', '#b197fc', '#f783ac'];
    var i = 0;
    function round() {
      if (i >= qs.length || lives <= 0) return c.finish(lives <= 0 ? 'No more lives — 再来一次! Try again!' : null);
      var t = qs[i++], over = false, slipped = false; c.round(i, qs.length); c.stage.innerHTML = '';
      var opts = LC.shuffle([t].concat(distinct(c.words, t, 4)));
      var sky = h('div', { class: 'sky' });
      c.stage.appendChild(h('div', { class: 'qbox slim' }, [h('span', { class: 'qemoji' }, t.emoji), h('b', { class: 'qen' }, t.en), h('span', { class: 'lives' }, '❤️'.repeat(lives) + '🤍'.repeat(3 - lives))]));
      c.stage.appendChild(sky);
      function end(ok) { if (over) return; over = true; if (ok) { if (!slipped) c.point(); c.hit(t); } else { lives--; c.miss(t); LC.sfx('bad'); Array.prototype.forEach.call(sky.children, function (b) { if (b._t === t) b.classList.add('show'); }); } later(round, ok ? 900 : 1900); }
      opts.forEach(function (o, k) {
        var b = h('button', { class: 'balloon', style: { left: 4 + k * 19 + '%', '--bc': colors[(k + i) % colors.length], 'animation-duration': 8 + Math.random() * 3 + 's', 'animation-delay': Math.random() * 1.2 + 's' } }, wordFace(o, S.pinyin));
        b._t = o;
        b.addEventListener('click', function () {
          if (over) return;
          if (o === t) { b.classList.add('pop'); LC.sfx('pop'); LC.speak(t.w); end(true); }
          else { slipped = true; b.classList.add('nope'); LC.sfx('bad'); c.miss(o); }
        });
        if (o === t) b.addEventListener('animationend', function (e) { if (e.animationName === 'balloon-up') end(false); });
        sky.appendChild(b);
      });
    }
    round();
  };

  /* ---------- 4. Sentence builder ---------- */
  games.build = function (c) {
    var qs = LC.sample(c.sentences.filter(function (x) { var n = x.toks.filter(function (t) { return !t.punct; }).length; return n >= 3 && n <= 9; }), 6);
    if (!qs.length) { c.stage.appendChild(h('p', null, 'No sentences of the right length here — choose another lesson.')); return; }
    quiz(c, qs.length, function (done, i) {
      var q = qs[i - 1], words = q.toks.filter(function (t) { return !t.punct; }), answer = words.map(function (t) { return t.w; }).join('');
      var line = h('div', { class: 'bline', lang: 'zh-Hans' }), bank = h('div', { class: 'bank' }), placed = [], fails = 0, finished = false;
      var msg = h('p', { class: 'note center' }, 'Tap the words in the right order.');
      LC.shuffle(words.map(function (t, k) { return { t: t, k: k }; })).forEach(function (it) {
        var b = h('button', { class: 'tile-w' }, wordFace(it.t, S.pinyin)); it.el = b;
        b.addEventListener('click', function () {
          if (finished) return; LC.sfx('tap');
          var at = placed.indexOf(it);
          if (at >= 0) { placed.splice(at, 1); bank.appendChild(b); } else { placed.push(it); line.appendChild(b); LC.speak(it.t.w, { rate: 1 }); }
          line.classList.remove('bad');
          if (placed.length === words.length) check();
        });
        bank.appendChild(b);
      });
      function check() {
        if (placed.map(function (p) { return p.t.w; }).join('') === answer) {
          finished = true; line.classList.add('good'); LC.speak(LC.plain(q.s[0])); msg.textContent = '✅ ' + LC.plain(q.s[0]); done(fails < 2, words[0], 2600);
        } else {
          fails++; line.classList.add('bad'); LC.sfx('bad');
          if (fails >= 3) { finished = true; msg.textContent = 'The answer: ' + LC.plain(q.s[0]); LC.speak(LC.plain(q.s[0])); done(false, words[0], 3200); }
          else msg.textContent = 'Not yet — tap a word to take it back. (' + (3 - fails) + ' tries left)';
        }
      }
      c.stage.appendChild(h('div', { class: 'qbox slim' }, [h('span', { class: 'qemoji' }, q.s[2] || q.lesson.emoji), h('b', { class: 'qen' }, q.s[1]), ui.speakBtn(LC.plain(q.s[0]), 'mini', null, 'Hear the sentence')]));
      c.stage.appendChild(line); c.stage.appendChild(msg); c.stage.appendChild(bank);
    });
  };

  /* ---------- 5. Tone master ---------- */
  games.tone = function (c) {
    var items = [];
    c.words.forEach(function (t) { var sy = t.py.split(' '); Array.from(t.w).forEach(function (ch, k) { var tone = LC.toneOf(sy[k] || ''); if (tone < 5) items.push({ ch: ch, syl: sy[k].toLowerCase(), tone: tone, t: t }); }); });
    var seen = {}; items = items.filter(function (x) { if (seen[x.ch + x.syl]) return false; seen[x.ch + x.syl] = 1; return true; });
    var qs = LC.sample(items, 10);
    quiz(c, qs.length, function (done, i) {
      var q = qs[i - 1], base = LC.stripTone(q.syl);
      c.stage.appendChild(h('div', { class: 'qbox' }, [h('div', { class: 'qchar', lang: 'zh-Hans' }, q.ch), h('button', { class: 'bigspk small', 'aria-label': 'Listen', onclick: function () { LC.speak(q.ch, { rate: 0.6 }); } }, '🔊'), h('p', null, 'Which tone is it?'), h('small', { class: 'note' }, 'from ' + q.t.w + ' — ' + q.t.en)]));
      c.stage.appendChild(choices([1, 2, 3, 4], function (o) { return o === q.tone; }, function (o) {
        var ti = LC.toneInfo[o];
        return [h('span', { class: 'tonepy t' + o }, LC.withTone(base, o)), h('span', { html: '<svg viewBox="0 0 80 64" class="tonesvg mini"><path d="' + ti.path + '" class="tl t' + o + '"/></svg>' }), h('small', null, ti.zh)];
      }, function (ok) { LC.speak(q.ch, { rate: 0.6 }); done(ok, q.t); }, 'tones'));
      later(function () { LC.speak(q.ch, { rate: 0.6 }); }, 350);
    });
  };

  /* ---------- 6. Fill the blank ---------- */
  games.blank = function (c) {
    var qs = LC.sample(c.sentences.filter(function (x) { return x.toks.filter(function (t) { return !t.punct; }).length >= 3; }), 8);
    quiz(c, qs.length, function (done, i) {
      var q = qs[i - 1], idxs = [];
      q.toks.forEach(function (t, k) { if (!t.punct && t.w.length <= 2) idxs.push(k); });
      if (!idxs.length) q.toks.forEach(function (t, k) { if (!t.punct) idxs.push(k); });
      var hole = idxs[Math.floor(Math.random() * idxs.length)], t = q.toks[hole];
      var others = LC.lessonWords(q.lesson).filter(function (x) { return x.w.length === t.w.length && x.w !== t.w; });
      if (others.length < 3) others = others.concat(c.words.filter(function (x) { return x.w.length === t.w.length && x.w !== t.w; }));
      var opts = LC.shuffle([t].concat(LC.shuffle(others).filter(function (x, k, a) { return a.findIndex(function (y) { return y.w === x.w; }) === k; }).slice(0, 3)));
      var gap = h('span', { class: 'gap' }, '？');
      var line = h('div', { class: 'bline static', lang: 'zh-Hans' }, q.toks.map(function (x, k) { return k === hole ? gap : x.punct ? h('span', { class: 'punct' }, x.w) : h('span', { class: 'fixed' }, wordFace(x, S.pinyin)); }));
      c.stage.appendChild(h('div', { class: 'qbox slim' }, [h('span', { class: 'qemoji' }, q.lesson.emoji), h('b', { class: 'qen' }, q.s[1]), h('small', { class: 'note' }, q.lesson.zh + ' ' + q.lesson.title)]));
      c.stage.appendChild(line);
      c.stage.appendChild(choices(opts, function (o) { return o.w === t.w; }, function (o) { return wordFace(o, S.pinyin); }, function (ok) {
        gap.textContent = t.w; gap.classList.add(ok ? 'good' : 'bad'); LC.speak(LC.plain(q.s[0])); done(ok, t, ok ? 2200 : 3200);
      }));
    });
  };

  /* ---------- 7. Stroke hero ---------- */
  games.write = function (c) {
    var chars = {}, list;
    c.words.forEach(function (t) { var sy = t.py.split(' '); Array.from(t.w).forEach(function (ch, k) { var d = LC.chars[ch]; if (d && d.s >= 2 && d.s <= 11) chars[ch] = { ch: ch, py: sy[k], t: t, s: d.s }; }); });
    list = LC.sample(Object.keys(chars).map(function (k) { return chars[k]; }), 5);
    if (!window.HanziWriter) { c.stage.appendChild(h('p', null, 'The stroke library could not be loaded.')); return; }
    var i = 0;
    function next() {
      if (i >= list.length) return c.finish();
      var q = list[i++]; c.round(i, list.length); c.stage.innerHTML = '';
      var target = h('div', { class: 'writer' }, h('div', { class: 'grid-bg', html: '<svg viewBox="0 0 100 100"><rect x="1" y="1" width="98" height="98"/><path d="M50 1V99M1 50H99M1 1L99 99M99 1L1 99"/></svg>' }));
      var msg = h('p', { class: 'note center' }, 'Write the character — ' + q.s + ' strokes. A hint appears if you miss twice.');
      var peek = h('button', { class: 'btn ghost small', onclick: function () { peeked = true; w.cancelQuiz(); w.animateCharacter({ onComplete: function () { later(startQuiz, 500); } }); } }, '👀 Show me first'), peeked = false;
      c.stage.appendChild(h('div', { class: 'qbox slim' }, [h('span', { class: 'qemoji' }, q.t.emoji), h('b', { class: 'qen' }, [h('span', { class: 't' + LC.toneOf(q.py) }, q.py), ' — ' + (LC.lexicon[q.ch] ? LC.lexicon[q.ch].en : 'from ' + q.t.w + ' (' + q.t.en + ')')]), ui.speakBtn(q.ch, 'mini')]));
      c.stage.appendChild(target); c.stage.appendChild(msg); c.stage.appendChild(peek);
      var size = Math.min(260, Math.max(200, Math.floor(window.innerWidth * 0.6)));
      var w = window.HanziWriter.create(target, q.ch, { width: size, height: size, padding: 10, showOutline: false, showCharacter: false, strokeColor: '#c92a2a', drawingColor: '#343a40', drawingWidth: 26, highlightColor: '#ffa94d', outlineColor: '#e3d9c6', charDataLoader: ui.loadCharData });
      function startQuiz() {
        w.hideCharacter({ duration: 0 });
        w.quiz({ showHintAfterMisses: 2, onCorrectStroke: function () { LC.sfx('tap'); }, onMistake: function () { LC.sfx('bad'); },
          onComplete: function (d) {
            var pts = peeked ? 1 : d.totalMistakes <= 1 ? 2 : d.totalMistakes <= 4 ? 1 : 0;
            c.point(pts); if (pts) { LC.sfx('ok'); c.hit(q.t); } else c.miss(q.t);
            S.chars[q.ch] = 1; LC.save(); LC.speak(q.ch);
            msg.textContent = d.totalMistakes === 0 && !peeked ? 'Perfect! 🌟 +2' : pts ? 'Good! +' + pts + ' (' + d.totalMistakes + ' slips)' : 'Finished — practise this one again later.';
            later(next, 1800);
          } });
      }
      LC.speak(q.ch); startQuiz();
    }
    next();
  };
})();
