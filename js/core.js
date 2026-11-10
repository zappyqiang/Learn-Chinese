/* Core: lexicon, sentence parser, pinyin helpers, speech, sounds, saved progress.
   This file has no DOM dependencies at load time so tools/build.js can reuse it. */
(function () {
  var LC = window.LC = window.LC || {};

  /* ---------- lexicon ---------- */
  LC.lexicon = {};
  (LC.lexiconRaw || '').split('\n').forEach(function (line) {
    line = line.trim(); if (!line) return;
    var p = line.split('|');
    LC.lexicon[p[0]] = { w: p[0], py: p[1], en: p[2], emoji: p[3] || '' };
  });

  var PUNCT = /^[，。！？、：；“”‘’《》（）…—]+$/;
  LC.isPunct = function (s) { return PUNCT.test(s); };

  /* "我 想 买 苹果 。"  ->  [{w,py,en,emoji}|{punct,w}]   inline override: 行/háng/row,_line */
  LC.parse = function (text) {
    return sandhi(text.trim().split(/\s+/).map(function (tok) {
      if (PUNCT.test(tok)) return { w: tok, punct: true };
      if (tok.indexOf('/') > 0) {
        var p = tok.split('/'), base = LC.lexicon[p[0]] || {};
        return { w: p[0], py: p[1], en: (p[2] || base.en || '').replace(/_/g, ' '), emoji: p[3] || base.emoji || '', special: true };
      }
      var e = LC.lexicon[tok];
      if (!e) return { w: tok, missing: true, py: '', en: '' };
      return { w: e.w, py: e.py, en: e.en, emoji: e.emoji };
    }));
  };
  /* Tone changes that learners' books write out: 一 → yí before a 4th tone, yì before tones 1–3; 不 → bú before a 4th tone. */
  function sandhi(toks) {
    toks.forEach(function (t, i) {
      if (t.punct || t.special || (t.w !== '一' && t.w !== '不')) return;
      var prev = toks[i - 1], next = toks[i + 1];
      if (!next || next.punct || !next.py) return;
      var nt = LC.toneOf(next.py.split(' ')[0]);
      if (t.w === '不') { if (nt === 4) t.py = 'bú'; return; }
      if (prev && prev.w === '第') return;
      if (prev && prev.w === next.w) { t.py = 'yi'; return; }
      t.py = nt === 4 ? 'yí' : nt === 5 ? 'yí' : 'yì';
    });
    return toks;
  }
  LC.plain = function (text) { return text.replace(/\/[^\s]*/g, '').replace(/\s+/g, ''); };

  /* ---------- pinyin ---------- */
  var TONE_MARKS = ['āēīōūǖ', 'áéíóúǘ', 'ǎěǐǒǔǚ', 'àèìòùǜ'];
  LC.toneOf = function (syl) {
    for (var t = 0; t < 4; t++) for (var i = 0; i < syl.length; i++) if (TONE_MARKS[t].indexOf(syl[i].toLowerCase()) >= 0) return t + 1;
    return 5;
  };
  LC.stripTone = function (syl) {
    var plain = 'aeiouü';
    return syl.split('').map(function (ch) {
      for (var t = 0; t < 4; t++) { var i = TONE_MARKS[t].indexOf(ch); if (i >= 0) return plain[i]; }
      return ch;
    }).join('');
  };
  LC.withTone = function (plainSyl, tone) {
    if (tone > 4) return plainSyl;
    var s = plainSyl, i = s.indexOf('a');
    if (i < 0) i = s.indexOf('e');
    if (i < 0 && s.indexOf('ou') >= 0) i = s.indexOf('o');
    if (i < 0) { for (var k = s.length - 1; k >= 0; k--) if ('iouü'.indexOf(s[k]) >= 0) { i = k; break; } }
    if (i < 0) return s;
    return s.slice(0, i) + TONE_MARKS[tone - 1]['aeiouü'.indexOf(s[i])] + s.slice(i + 1);
  };
  LC.toneInfo = [null,
    { n: 1, name: 'First tone', zh: '一声', desc: 'High and flat — like singing one long high note: “laaa”.', path: 'M8 14 L72 14' },
    { n: 2, name: 'Second tone', zh: '二声', desc: 'Rising — like asking “What?”', path: 'M8 44 L72 12' },
    { n: 3, name: 'Third tone', zh: '三声', desc: 'Dips down, then comes back up — like a slow “we-ell…”.', path: 'M8 26 Q34 78 72 16' },
    { n: 4, name: 'Fourth tone', zh: '四声', desc: 'Falls sharply — like a firm “No!”', path: 'M8 10 L72 54' },
    { n: 5, name: 'Neutral tone', zh: '轻声', desc: 'Light and short — just a quick, soft tap.', path: 'M34 34 L46 34' }
  ];

  if (typeof document === 'undefined') return;   // ---- everything below needs a browser ----

  /* ---------- saved progress ---------- */
  var KEY = 'learn-chinese-v1';
  var S = { stars: 0, pinyin: true, english: true, rate: 0.85, voice: '', sound: true, sent: {}, words: {}, chars: {}, games: {}, days: [], badges: {} };
  try { var saved = JSON.parse(localStorage.getItem(KEY) || '{}'); for (var k in saved) S[k] = saved[k]; } catch (e) {}
  LC.state = S;
  LC.save = function () { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
  LC.addStars = function (n, why) {
    S.stars += n; LC.touchDay(); LC.save();
    if (LC.onStars) LC.onStars(n, why);
  };
  LC.touchDay = function () {
    var d = new Date(), t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    if (S.days[S.days.length - 1] !== t) { S.days.push(t); if (S.days.length > 400) S.days.shift(); }
  };
  LC.streak = function () {
    var n = 0, d = new Date();
    for (;;) {
      var t = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      if (S.days.indexOf(t) < 0) { if (n === 0 && d.toDateString() === new Date().toDateString()) { d.setDate(d.getDate() - 1); if (S.days.indexOf(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()) < 0) break; continue; } break; }
      n++; d.setDate(d.getDate() - 1);
    }
    return n;
  };
  LC.markSentence = function (key) { if (!S.sent[key]) { S.sent[key] = 1; LC.addStars(1, 'sentence'); return true; } return false; };
  LC.markWord = function (w) { if (!S.words[w]) { S.words[w] = { seen: 1, ok: 0, bad: 0 }; LC.addStars(1, 'word'); } else S.words[w].seen++; LC.save(); };
  LC.scoreWord = function (w, ok) { var r = S.words[w] || (S.words[w] = { seen: 0, ok: 0, bad: 0 }); if (ok) r.ok++; else r.bad++; LC.save(); };
  LC.levels = [
    [0, '小书童', 'Little Page', '🐣'], [30, '学徒', 'Apprentice', '🐼'], [80, '书生', 'Student', '📚'], [160, '秀才', 'Scholar', '🎓'],
    [280, '举人', 'Graduate', '🏮'], [450, '进士', 'Master', '🐯'], [700, '状元', 'Top Scholar', '🐉']
  ];
  LC.level = function () {
    var cur = 0; LC.levels.forEach(function (l, i) { if (S.stars >= l[0]) cur = i; });
    var next = LC.levels[cur + 1];
    return { i: cur, zh: LC.levels[cur][1], en: LC.levels[cur][2], emoji: LC.levels[cur][3], next: next ? next[0] : null, base: LC.levels[cur][0] };
  };

  /* ---------- speech ---------- */
  var synth = window.speechSynthesis, voices = [];
  function loadVoices() { voices = synth ? synth.getVoices().filter(function (v) { return /^zh|cmn/i.test(v.lang); }) : []; if (LC.onVoices) LC.onVoices(voices); }
  if (synth) { loadVoices(); synth.addEventListener && synth.addEventListener('voiceschanged', loadVoices); }
  LC.voices = function () { return voices; };
  LC.pickVoice = function () {
    if (!voices.length) return null;
    var byName = voices.filter(function (v) { return v.name === S.voice; })[0]; if (byName) return byName;
    var pref = voices.filter(function (v) { return /zh[-_]CN|cmn-Hans/i.test(v.lang); });
    var nice = pref.filter(function (v) { return /Xiaoxiao|Tingting|Ting-Ting|Google|Natural|Lili|Meijia|Yunxi/i.test(v.name); })[0];
    return nice || pref[0] || voices[0];
  };
  LC.canSpeak = function () { return !!synth; };
  /* speak(text, {rate, onend, onstart}) */
  LC.speak = function (text, opt) {
    opt = opt || {};
    if (!synth) { if (opt.onend) opt.onend(); LC.toast && LC.toast('Sorry, this browser cannot speak. Try Chrome, Edge or Safari.'); return; }
    synth.cancel();
    var u = new SpeechSynthesisUtterance(text.replace(/[“”《》]/g, ''));
    var v = LC.pickVoice(); if (v) u.voice = v;
    u.lang = v ? v.lang : 'zh-CN';
    u.rate = opt.rate || S.rate; u.pitch = 1.05;
    var done = false, fin = function () { if (done) return; done = true; clearTimeout(guard); if (opt.onend) opt.onend(); };
    u.onend = fin; u.onerror = fin;
    var guard = setTimeout(fin, 1500 + text.length * 900);
    if (opt.onstart) opt.onstart();
    LC._utter = u;                       // keep a reference (Chrome garbage-collects utterances)
    setTimeout(function () { synth.speak(u); }, 40);
    if (!voices.length && !LC._warned) { LC._warned = true; LC.toast && LC.toast('No Chinese voice found yet — install a Chinese (zh-CN) voice in your device settings for the best sound.', 6000); }
  };
  LC.stopSpeak = function () { if (synth) synth.cancel(); };

  /* ---------- little sound effects (no audio files needed) ---------- */
  var ac;
  function beep(freq, t0, dur, type, vol) {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, ac.currentTime + t0);
      g.gain.exponentialRampToValueAtTime(vol || 0.18, ac.currentTime + t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + t0 + dur);
      o.connect(g); g.connect(ac.destination); o.start(ac.currentTime + t0); o.stop(ac.currentTime + t0 + dur + 0.05);
    } catch (e) {}
  }
  LC.sfx = function (name) {
    if (!S.sound) return;
    if (name === 'ok') { beep(660, 0, 0.12); beep(880, 0.1, 0.18); }
    else if (name === 'bad') { beep(200, 0, 0.25, 'sawtooth', 0.08); }
    else if (name === 'tap') { beep(520, 0, 0.06, 'triangle', 0.1); }
    else if (name === 'flip') { beep(400, 0, 0.05, 'triangle', 0.08); }
    else if (name === 'pop') { beep(900, 0, 0.05, 'square', 0.06); beep(300, 0.04, 0.08, 'triangle', 0.08); }
    else if (name === 'win') { [523, 659, 784, 1047].forEach(function (f, i) { beep(f, i * 0.12, 0.25); }); }
    else if (name === 'star') { beep(1200, 0, 0.08, 'sine', 0.08); beep(1600, 0.07, 0.12, 'sine', 0.08); }
  };

  /* ---------- tiny DOM helpers ---------- */
  LC.h = function (tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) for (var a in attrs) {
      var v = attrs[a]; if (v == null || v === false) continue;
      if (a === 'class') el.className = v; else if (a === 'html') el.innerHTML = v; else if (a === 'text') el.textContent = v;
      else if (a === 'style' && typeof v === 'object') for (var s in v) el.style.setProperty(s, v[s]);
      else if (a.slice(0, 2) === 'on') el.addEventListener(a.slice(2), v); else el.setAttribute(a, v);
    }
    (kids == null ? [] : Array.isArray(kids) ? kids : [kids]).forEach(function (k) { if (k == null || k === false) return; el.appendChild(typeof k === 'object' ? k : document.createTextNode(String(k))); });
    return el;
  };
  LC.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  LC.sample = function (a, n) { return LC.shuffle(a).slice(0, n); };

  /* ---------- content lookups ---------- */
  LC.allLessons = function () { return LC.daily.concat(LC.classics); };
  LC.findLesson = function (id) { return LC.allLessons().filter(function (l) { return l.id === id; })[0]; };
  LC.lessonSentences = function (l) { return l.sentences.concat(l.original ? l.original.sentences : []); };
  LC.lessonWords = function (l) {
    var seen = {}, out = [];
    LC.lessonSentences(l).forEach(function (s) { LC.parse(s[0]).forEach(function (t) { if (t.punct || t.missing || seen[t.w]) return; seen[t.w] = 1; out.push(t); }); });
    return out;
  };
  LC.lessonProgress = function (l) {
    var all = LC.lessonSentences(l), n = 0;
    all.forEach(function (s, i) { if (S.sent[l.id + ':' + i]) n++; });
    return { done: n, total: all.length, pct: Math.round(100 * n / all.length) };
  };
  /* word pools for the games */
  LC.pool = function (id) {
    var lessons = id === 'all' ? LC.allLessons() : id === 'daily' ? LC.daily : id === 'classics' ? LC.classics : [LC.findLesson(id)].filter(Boolean);
    var seen = {}, out = [];
    lessons.forEach(function (l) { LC.lessonWords(l).forEach(function (t) { if (!seen[t.w] && !t.special) { seen[t.w] = 1; out.push(t); } }); });
    return out;
  };
})();
