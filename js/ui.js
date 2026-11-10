/* Views: home, lessons, stories, character lab, progress — plus the word/character popup. */
(function () {
  var LC = window.LC, h = LC.h, S = LC.state;
  var view = document.getElementById('view');
  var ui = LC.ui = {};

  /* ============ small widgets ============ */
  var toastEl = document.getElementById('toast'), toastTimer;
  LC.toast = function (msg, ms) {
    toastEl.textContent = msg; toastEl.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, ms || 2600);
  };
  ui.confetti = function (n) {
    var box = h('div', { class: 'confetti' }), bits = ['🎉', '⭐', '🌟', '🎊', '🏮', '🐼', '🌸', '✨'];
    for (var i = 0; i < (n || 26); i++) {
      box.appendChild(h('span', { text: bits[i % bits.length], style: { left: Math.random() * 100 + '%', 'animation-delay': Math.random() * 0.6 + 's', 'font-size': 18 + Math.random() * 22 + 'px' } }));
    }
    document.body.appendChild(box); setTimeout(function () { box.remove(); }, 3200);
  };
  function refreshTop() {
    var lv = LC.level();
    document.getElementById('stars').textContent = S.stars;
    document.getElementById('level').textContent = lv.emoji + ' ' + lv.zh;
    document.getElementById('level').title = lv.en;
  }
  var lastLevel = LC.level().i;
  LC.onStars = function (n) {
    refreshTop();
    var el = document.getElementById('starbox'); el.classList.remove('bump'); void el.offsetWidth; el.classList.add('bump');
    var lv = LC.level();
    if (lv.i > lastLevel) { lastLevel = lv.i; LC.sfx('win'); ui.confetti(40); LC.toast('Level up! You are now ' + lv.zh + ' — ' + lv.en + ' ' + lv.emoji, 5000); }
  };
  function toneClass(syl) { return 't' + LC.toneOf(syl); }
  function refList(refs) {
    return h('ul', { class: 'refs' }, refs.map(function (r) {
      var icon = /youtube|bilibili/i.test(r[1]) ? '🎬' : /wikipedia/i.test(r[1]) ? '🌐' : '🔗';
      return h('li', null, h('a', { href: r[1], target: '_blank', rel: 'noopener' }, icon + ' ' + r[0]));
    }));
  }
  function speakBtn(text, cls, rate, label) {
    var b = h('button', { class: 'spk ' + (cls || ''), title: label || 'Listen', 'aria-label': label || 'Listen' }, rate ? '🐢' : '🔊');
    b.addEventListener('click', function (e) {
      e.stopPropagation(); b.classList.add('on');
      LC.speak(text, { rate: rate, onend: function () { b.classList.remove('on'); } });
    });
    return b;
  }
  ui.speakBtn = speakBtn;

  /* ============ sentence card ============ */
  function wordEl(t) {
    if (t.punct) return h('span', { class: 'punct' }, t.w);
    var syl = t.py.split(' ');
    var b = h('button', { class: 'word' + (LC.evolution[t.w] ? ' pictograph' : ''), title: t.en },
      Array.from(t.w).map(function (c, i) {
        return h('span', { class: 'ch' }, [h('span', { class: 'py ' + toneClass(syl[i] || '') }, syl[i] || ''), h('span', { class: 'hz' }, c)]);
      }));
    b.addEventListener('click', function () { LC.sfx('tap'); ui.openWord(t); });
    return b;
  }
  ui.wordEl = wordEl;
  function sentenceCard(lesson, idx, s) {
    var key = lesson.id + ':' + idx, toks = LC.parse(s[0]), plain = LC.plain(s[0]);
    var card = h('div', { class: 'sent' + (S.sent[key] ? ' done' : ''), 'data-key': key });
    function play(rate) {
      card.classList.add('speaking');
      LC.speak(plain, { rate: rate, onend: function () { card.classList.remove('speaking'); } });
      if (LC.markSentence(key)) { card.classList.add('done'); LC.sfx('star'); }
    }
    card._play = function (onend) {
      card.classList.add('speaking'); card.scrollIntoView({ block: 'center', behavior: 'smooth' });
      if (LC.markSentence(key)) card.classList.add('done');
      LC.speak(plain, { onend: function () { card.classList.remove('speaking'); onend && onend(); } });
    };
    var spk = h('button', { class: 'spk big', title: 'Listen to the sentence', 'aria-label': 'Listen to the sentence', onclick: function () { play(); } }, '🔊');
    var slow = h('button', { class: 'spk slow', title: 'Listen slowly', 'aria-label': 'Listen slowly', onclick: function () { play(0.55); } }, '🐢');
    card.appendChild(h('div', { class: 'sent-btns' }, [spk, slow]));
    card.appendChild(h('div', { class: 'sent-body' }, [
      h('div', { class: 'zh', lang: 'zh-Hans' }, toks.map(wordEl)),
      h('div', { class: 'en' }, s[1])
    ]));
    card.appendChild(h('div', { class: 'sent-emoji', 'aria-hidden': 'true' }, Array.from(s[2] || '').length ? splitEmoji(s[2]).map(function (e, i) {
      return h('span', { style: { 'animation-delay': i * 0.25 + 's' } }, e);
    }) : null));
    card.appendChild(h('span', { class: 'tick', title: 'Learned' }, '⭐'));
    return card;
  }
  function splitEmoji(str) {
    if (window.Intl && Intl.Segmenter) return Array.from(new Intl.Segmenter().segment(str), function (x) { return x.segment; });
    return [str];
  }

  /* ============ animated scene for stories ============ */
  var ANIM = {
    still: ['none', 0], swim: ['a-swim', 7], swim2: ['a-swim', 9, -3], sway: ['a-sway', 3], drift: ['a-drift', 16], walk: ['a-walk', 12], walk2: ['a-walk', 12, -5],
    glow: ['a-pulse', 3], pulse: ['a-pulse', 1.6], nod: ['a-nod', 2.4], twinkle: ['a-twinkle', 1.8], rise: ['a-rise', 8], sink: ['a-sink', 8], fly: ['a-fly', 9],
    fall: ['a-fall', 5], fall2: ['a-fall', 6.5, -2], climb: ['a-climb', 6], wave: ['a-sway', 2.4], dig: ['a-dig', 1.1], drip: ['a-drip', 1.6], sew: ['a-dig', 1.4],
    flicker: ['a-twinkle', 0.9], bob: ['a-bob', 3], hop: ['a-hop', 1.2], hop2: ['a-hop', 1.2, -0.5], bounce: ['a-hop', 1.8], bounce2: ['a-hop', 1.8, -0.8], float: ['a-bob', 4],
    dash: ['a-dash', 4], sneak: ['a-sneak', 6], slither: ['a-slither', 5], pop: ['a-pop', 2.6], strut: ['a-strut', 7], strut2: ['a-strut', 7, 0.5], flee: ['a-flee', 7], flee2: ['a-flee', 7, 0.4],
    peek: ['a-peek', 5], pull: ['a-pull', 3], pull2: ['a-pull', 3, -1.4], shake: ['a-shake', 2.6], 'throw': ['a-throw', 2.6], splash: ['a-splash', 2.6], shrink: ['a-shrink', 9], spin: ['a-spin', 4]
  };
  function scene(sc) {
    var box = h('div', { class: 'scene bg-' + sc.bg, 'aria-hidden': 'true' });
    sc.actors.forEach(function (a) {
      var an = ANIM[a[1]] || ANIM.still;
      box.appendChild(h('span', { class: 'actor', style: { left: a[2] + '%', top: a[3] + '%', animation: an[0] === 'none' ? 'none' : an[0] + ' ' + an[1] + 's ease-in-out ' + (an[2] || 0) + 's infinite' } }, a[0]));
    });
    return box;
  }

  /* ============ toolbar shared by lessons ============ */
  function applyToggles() {
    document.body.classList.toggle('hide-py', !S.pinyin);
    document.body.classList.toggle('hide-en', !S.english);
  }
  function toolbar(cards) {
    var playing = false, i = 0;
    var bPy = h('button', { class: 'tool', onclick: function () { S.pinyin = !S.pinyin; LC.save(); applyToggles(); sync(); LC.sfx('tap'); } });
    var bEn = h('button', { class: 'tool', onclick: function () { S.english = !S.english; LC.save(); applyToggles(); sync(); LC.sfx('tap'); } });
    var bAll = h('button', { class: 'tool play', onclick: function () {
      if (playing) { playing = false; LC.stopSpeak(); sync(); return; }
      playing = true; i = 0; sync(); next();
    } });
    function next() {
      if (!playing || !document.body.contains(cards[0])) { playing = false; return; }
      if (i >= cards.length) { playing = false; sync(); LC.sfx('win'); return; }
      cards[i++]._play(function () { setTimeout(next, 500); });
    }
    function sync() {
      bPy.textContent = (S.pinyin ? '🙈 Hide' : '👀 Show') + ' Pinyin 拼音'; bPy.classList.toggle('off', !S.pinyin);
      bEn.textContent = (S.english ? '🙈 Hide' : '👀 Show') + ' English'; bEn.classList.toggle('off', !S.english);
      bAll.textContent = playing ? '⏹ Stop' : '▶ Play all';
    }
    sync();
    ui._stopPlay = function () { playing = false; };
    return h('div', { class: 'toolbar' }, [bPy, bEn, bAll, h('span', { class: 'hint' }, '👉 Tap 🔊 to listen · tap any word to explore it')]);
  }

  /* ============ lesson / story page ============ */
  function lessonPage(id) {
    var l = LC.findLesson(id); if (!l) return home();
    var isDaily = LC.daily.indexOf(l) >= 0, list = isDaily ? LC.daily : LC.classics, at = list.indexOf(l);
    var cards = [], n = 0;
    function block(sents) { return sents.map(function (s) { var c = sentenceCard(l, n++, s); cards.push(c); return c; }); }
    var main = block(l.sentences), orig = l.original ? block(l.original.sentences) : null;
    var kids = [
      h('a', { class: 'back', href: isDaily ? '#daily' : '#classics' }, '← ' + (isDaily ? 'Daily Chinese 日常汉语' : 'Classics 经典')),
      h('div', { class: 'lesson-head', style: { '--c': l.color || '#e8590c' } }, [
        h('div', { class: 'lesson-emoji' }, l.emoji),
        h('div', null, [
          h('h1', null, [h('span', { class: 'zh-title', lang: 'zh-Hans' }, l.zh), ' ', h('span', { class: 'en-title' }, l.title), ui.speakBtn(l.zh, 'mini')]),
          l.author ? h('p', { class: 'byline' }, [l.author, ' · ', l.era, l.grade ? h('span', { class: 'grade' }, '📘 ' + l.grade) : null]) : null,
          h('p', { class: 'intro' }, l.intro)
        ])
      ]),
      l.scene ? scene(l.scene) : null,
      l.tip ? h('div', { class: 'tip' }, [h('span', { class: 'panda' }, '🐼'), h('p', null, l.tip)]) : null,
      toolbar(cards),
      h('div', { class: 'sents' + (l.kind === 'poem' ? ' poem' : '') }, main),
      l.moral ? h('div', { class: 'moral' }, [h('b', null, '💡 The lesson of the story: '), l.moral]) : null,
      orig ? h('section', { class: 'orig' }, [h('h2', null, '📜 原文 · The original classical text'), h('p', { class: 'note' }, l.original.note), h('div', { class: 'sents poem' }, orig)]) : null,
      l.timeline ? h('section', null, [h('h2', null, '🕰️ 3,000 years of Chinese writing'), h('div', { class: 'timeline' }, l.timeline.map(function (t, i) {
        return h('div', { class: 'tl', style: { 'animation-delay': i * 0.15 + 's' } }, [h('b', { lang: 'zh-Hans' }, t[0]), h('span', { class: 'tl-en' }, t[1]), h('span', { class: 'tl-date' }, t[2]), h('p', null, t[3])]);
      })), h('p', { class: 'note' }, ['Want to watch real characters change? Open the ', h('a', { href: '#lab' }, 'Character Lab 🔬'), '.'])]) : null,
      h('section', { class: 'practice' }, [
        h('h2', null, '🎮 Practise this ' + (isDaily ? 'lesson' : 'text')),
        h('div', { class: 'chips' }, [
          h('a', { class: 'chip', href: '#game/match/' + l.id }, '🃏 Memory Match'),
          h('a', { class: 'chip', href: '#game/listen/' + l.id }, '👂 Listen & Pick'),
          h('a', { class: 'chip', href: '#game/build/' + l.id }, '🧩 Sentence Builder'),
          h('a', { class: 'chip', href: '#game/balloon/' + l.id }, '🎈 Balloon Pop'),
          h('a', { class: 'chip', href: '#game/tone/' + l.id }, '🎵 Tone Master'),
          !isDaily ? h('a', { class: 'chip', href: '#game/blank/' + l.id }, '📜 Fill the Blank') : null,
          h('a', { class: 'chip', href: '#game/write/' + l.id }, '✍️ Stroke Hero')
        ])
      ]),
      h('section', null, [h('h2', null, '📖 Words in this ' + (isDaily ? 'lesson' : 'text')), h('div', { class: 'wordgrid' }, LC.lessonWords(l).map(wordChip))]),
      h('section', null, [h('h2', null, '🔗 Learn more — websites and videos'), refList(l.refs || [])]),
      h('div', { class: 'pager' }, [
        at > 0 ? h('a', { class: 'btn ghost', href: '#lesson/' + list[at - 1].id }, '← ' + list[at - 1].zh) : h('span'),
        at < list.length - 1 ? h('a', { class: 'btn', href: '#lesson/' + list[at + 1].id }, list[at + 1].zh + ' →') : h('a', { class: 'btn', href: isDaily ? '#classics' : '#games' }, isDaily ? 'Next: the Classics 经典 →' : 'Play the games →')
      ])
    ];
    render(kids);
  }
  function wordChip(t) {
    return h('button', { class: 'wchip', onclick: function () { LC.sfx('tap'); ui.openWord(t); } }, [
      h('span', { class: 'wc-e' }, t.emoji || ''), h('span', { class: 'wc-h', lang: 'zh-Hans' }, t.w), h('span', { class: 'wc-p' }, t.py.replace(/ /g, '')), h('span', { class: 'wc-m' }, t.en)
    ]);
  }
  ui.wordChip = wordChip;

  /* ============ list pages ============ */
  function lessonCard(l) {
    var p = LC.lessonProgress(l);
    return h('a', { class: 'card', href: '#lesson/' + l.id, style: { '--c': l.color || '#e8590c' } }, [
      h('div', { class: 'card-emoji' }, l.emoji),
      h('div', { class: 'card-zh', lang: 'zh-Hans' }, l.zh),
      h('div', { class: 'card-en' }, l.title),
      l.author ? h('div', { class: 'card-by' }, l.author.split(' ')[0] + (l.grade ? ' · ' + l.grade : '')) : null,
      h('div', { class: 'bar' }, h('i', { style: { width: p.pct + '%' } })),
      h('div', { class: 'card-p' }, p.pct === 100 ? '✅ All ' + p.total + ' sentences!' : p.done + ' / ' + p.total + ' sentences')
    ]);
  }
  function dailyPage() {
    render([
      h('div', { class: 'page-head' }, [h('h1', null, '🗣️ Daily Chinese 日常汉语'), h('p', null, 'Ten everyday topics, 140 useful sentences. Listen, read, then tap any word to see how it is said, written and how it grew up.')]),
      h('div', { class: 'grid' }, LC.daily.map(lessonCard)),
      h('div', { class: 'tip' }, [h('span', { class: 'panda' }, '🐼'), h('p', null, 'Try this: first listen with pinyin showing. Then press “Hide Pinyin” and read the characters by yourself. 加油!')])
    ]);
  }
  function classicsPage() {
    var groups = [['poem', '🌙 古诗 Classic Poems', 'Tang-dynasty poems every Chinese child learns by heart.'], ['saying', '📜 名言 Wise Sayings', 'Short lines from Confucius, the Three Character Classic and more.'],
      ['story', '🦊 寓言故事 Fables & Idiom Stories', 'Funny old stories behind famous four-character idioms (成语).'], ['history', '🏯 历史故事 History Stories', 'Heroes, inventions and the story of Chinese writing itself.']];
    render([h('div', { class: 'page-head' }, [h('h1', null, '📚 Classics 经典'), h('p', null, 'Poems, sayings and stories from Chinese primary and secondary school textbooks — with pictures, sound and simple English.')])].concat(
      groups.map(function (g) {
        return h('section', null, [h('h2', null, g[1]), h('p', { class: 'note' }, g[2]), h('div', { class: 'grid' }, LC.classics.filter(function (l) { return l.kind === g[0]; }).map(lessonCard))]);
      })));
  }

  /* ============ home ============ */
  function home() {
    var lv = LC.level(), all = LC.allLessons();
    var nextL = all.filter(function (l) { return LC.lessonProgress(l).pct < 100; })[0] || all[0];
    var done = Object.keys(S.sent).length, words = Object.keys(S.words).length;
    var pictos = Object.keys(LC.evolution);
    var wod = LC.lexicon[pictos[new Date().getDate() % pictos.length]];
    render([
      h('div', { class: 'hero' }, [
        h('div', { class: 'hero-text' }, [
          h('h1', null, ['你好！', h('span', null, ' Welcome to the Chinese Playground')]),
          h('p', null, 'Learn real everyday Chinese, read the poems and stories Chinese children grow up with, and play games to remember every word.'),
          h('div', { class: 'hero-btns' }, [
            h('a', { class: 'btn big', href: '#lesson/' + nextL.id }, (done ? '▶ Continue: ' : '▶ Start: ') + nextL.zh + ' ' + nextL.emoji),
            h('a', { class: 'btn ghost big', href: '#games' }, '🎮 Play games')
          ])
        ]),
        h('div', { class: 'hero-art', 'aria-hidden': 'true' }, [h('span', { class: 'big-panda' }, '🐼'), h('span', { class: 'bubble', lang: 'zh-Hans' }, '加油！'), h('span', { class: 'lantern l1' }, '🏮'), h('span', { class: 'lantern l2' }, '🏮')])
      ]),
      h('div', { class: 'stats' }, [
        stat('⭐', S.stars, 'stars'), stat(lv.emoji, lv.zh, lv.en + (lv.next ? ' · ' + (lv.next - S.stars) + ' ⭐ to next level' : '')), stat('🔥', LC.streak(), 'day streak'), stat('🗣️', done, 'sentences heard'), stat('🔤', words, 'words explored')
      ]),
      h('h2', null, '🗺️ Your learning path'),
      h('div', { class: 'path' }, [
        pathCard('1', '🗣️', 'Daily Chinese', '日常汉语', 'Greetings, home, school, shopping, food, travel, weather, health, hobbies and nature.', '#daily', '#ff8a5c'),
        pathCard('2', '📚', 'Classics & History', '经典与历史', 'Tang poems, Confucius, idiom fables and history stories from school textbooks.', '#classics', '#7e9bff'),
        pathCard('3', '🎮', 'Memory Games', '游戏', 'Seven games to remember words, tones, strokes and famous lines.', '#games', '#4dd0a7'),
        pathCard('★', '🔬', 'Character Lab', '汉字实验室', 'Watch pictures turn into characters over 3,000 years.', '#lab', '#f9a825')
      ]),
      h('h2', null, '🔎 How every sentence works'),
      h('div', { class: 'howto' }, [
        how('🔊', 'Listen', 'The speaker button in front of each sentence reads it aloud. 🐢 reads it slowly.'),
        how('🙈', 'Hide the pinyin', 'One button hides or shows the pinyin above the characters — test yourself!'),
        how('👆', 'Tap a word', 'Hear it, see its tone, watch the strokes one by one, then write it yourself.'),
        how('🐢→字', 'See it evolve', 'Picture-characters morph from ancient drawings into today\'s writing.')
      ]),
      wod ? h('div', { class: 'wod' }, [h('div', null, [h('h2', null, '🌟 Picture-character of the day'), h('p', null, [LC.evolution[wod.w].story])]),
        h('button', { class: 'wod-char', lang: 'zh-Hans', onclick: function () { ui.openWord(wod); } }, [h('span', { class: 'wod-e' }, LC.evolution[wod.w].pic), wod.w, h('small', null, wod.py + ' · ' + wod.en)])]) : null
    ]);
    function stat(e, v, l) { return h('div', { class: 'stat' }, [h('span', { class: 'stat-e' }, e), h('b', null, String(v)), h('small', null, l)]); }
    function pathCard(n, e, t, zh, d, href, c) { return h('a', { class: 'pcard', href: href, style: { '--c': c } }, [h('span', { class: 'pnum' }, n), h('span', { class: 'pemoji' }, e), h('b', null, t), h('span', { class: 'pzh', lang: 'zh-Hans' }, zh), h('p', null, d)]); }
    function how(e, t, d) { return h('div', { class: 'how' }, [h('span', null, e), h('b', null, t), h('p', null, d)]); }
  }

  /* ============ character lab ============ */
  function labPage() {
    var results = h('div', { class: 'wordgrid' });
    var input = h('input', { class: 'search', type: 'search', placeholder: 'Search a word: 汉字, pinyin or English… (try “horse”, “ma”, 山)', 'aria-label': 'Search words' });
    function norm(s) { return s.split(' ').map(LC.stripTone).join('').toLowerCase(); }
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase(); results.innerHTML = '';
      if (!q) return;
      var hits = Object.keys(LC.lexicon).map(function (k) { return LC.lexicon[k]; }).filter(function (e) {
        return e.w.indexOf(q) >= 0 || norm(e.py).indexOf(q.replace(/\s/g, '')) === 0 || e.en.toLowerCase().indexOf(q) >= 0;
      }).slice(0, 40);
      if (!hits.length && LC.chars[q]) hits = [charToken(q)];
      hits.forEach(function (e) { results.appendChild(wordChip(e)); });
      if (!hits.length) results.appendChild(h('p', { class: 'note' }, 'No word found — try another spelling.'));
    });
    function tile(c, sub, cls) {
      return h('button', { class: 'tile ' + (cls || ''), onclick: function () { LC.sfx('tap'); ui.openWord(charToken(c)); } }, [h('span', { class: 'tile-e' }, sub), h('span', { class: 'tile-c', lang: 'zh-Hans' }, c), h('small', null, (charToken(c).py || '') + ' · ' + shortEn(charToken(c).en))]);
    }
    render([
      h('div', { class: 'page-head' }, [h('h1', null, '🔬 Character Lab 汉字实验室'), h('p', null, 'Chinese characters are not random squiggles — many began as drawings. Tap one to watch 3,000 years of history in a few seconds, then write it yourself.')]),
      input, results,
      h('h2', null, '🖼️ Picture characters 象形字 — from drawing to writing'),
      h('div', { class: 'tiles' }, Object.keys(LC.evolution).map(function (c) { return tile(c, LC.evolution[c].pic); })),
      h('h2', null, '➕ Built from parts 会意字 · 形声字'),
      h('p', { class: 'note' }, 'Most characters are made by joining simpler ones: one part often hints at the meaning, another at the sound.'),
      h('div', { class: 'tiles' }, Object.keys(LC.compounds).filter(function (c) { return LC.chars[c]; }).map(function (c) { return tile(c, LC.compounds[c].parts.map(function (p) { return p[0]; }).join('+'), 'compound'); })),
      h('h2', null, '🕰️ The five big steps'),
      h('div', { class: 'timeline' }, LC.findLesson('hanzi').timeline.map(function (t, i) {
        return h('div', { class: 'tl', style: { 'animation-delay': i * 0.12 + 's' } }, [h('b', { lang: 'zh-Hans' }, t[0]), h('span', { class: 'tl-en' }, t[1]), h('span', { class: 'tl-date' }, t[2]), h('p', null, t[3])]);
      })),
      h('p', null, h('a', { class: 'btn', href: '#lesson/hanzi' }, '📖 Read: 汉字的故事 The Story of Chinese Characters')),
      h('h2', null, '🔗 See the real ancient shapes'),
      refList([['汉字字源 Chinese Etymology — thousands of real oracle, bronze and seal forms', 'https://hanziyuan.net/'], ['Wikipedia: Oracle bone script', 'https://en.wikipedia.org/wiki/Oracle_bone_script'],
        ['Wikipedia: Chinese character classification (六书)', 'https://en.wikipedia.org/wiki/Chinese_character_classification'], ['Wikipedia: Stroke order', 'https://en.wikipedia.org/wiki/Stroke_order'],
        ['汉典 zdic.net — Chinese dictionary with 字源字形', 'https://www.zdic.net/'], ['Video: 汉字的演变 (evolution of characters)', 'https://www.youtube.com/results?search_query=' + encodeURIComponent('汉字的演变 动画')],
        ['Video (Bilibili): 甲骨文 动画', 'https://search.bilibili.com/all?keyword=' + encodeURIComponent('甲骨文 动画 汉字演变')]])
    ]);
  }
  function shortEn(s) { return (s || '').split(/[;,(]/)[0].trim(); }
  function charToken(c) {
    var e = LC.lexicon[c]; if (e) return e;
    var d = LC.chars[c]; return { w: c, py: d && d.r[0] ? d.r[0][0] : '', en: d && d.r[0] ? d.r[0][1] : '', emoji: '' };
  }
  ui.charToken = charToken;

  /* ============ progress & settings ============ */
  function progressPage() {
    var lv = LC.level(), pct = lv.next ? Math.round(100 * (S.stars - lv.base) / (lv.next - lv.base)) : 100;
    var voiceSel = h('select', { onchange: function () { S.voice = voiceSel.value; LC.save(); LC.speak('你好，我们一起学中文吧！'); } },
      [h('option', { value: '' }, 'Automatic')].concat(LC.voices().map(function (v) { return h('option', { value: v.name, selected: v.name === S.voice ? 'selected' : null }, v.name + ' (' + v.lang + ')'); })));
    var rate = h('input', { type: 'range', min: '0.5', max: '1.2', step: '0.05', value: S.rate, oninput: function () { S.rate = +rate.value; LC.save(); rateLbl.textContent = S.rate.toFixed(2) + '×'; } });
    var rateLbl = h('span', null, S.rate.toFixed(2) + '×');
    var snd = h('input', { type: 'checkbox', onchange: function () { S.sound = snd.checked; LC.save(); } }); snd.checked = S.sound;
    var badges = [
      ['👋', 'First hello', Object.keys(S.sent).length >= 1], ['🗣️', '50 sentences', Object.keys(S.sent).length >= 50], ['📚', '150 sentences', Object.keys(S.sent).length >= 150],
      ['🔤', '30 words explored', Object.keys(S.words).length >= 30], ['🧠', '150 words explored', Object.keys(S.words).length >= 150], ['✍️', '10 characters written', Object.keys(S.chars).length >= 10],
      ['🏠', 'Daily Chinese finished', LC.daily.every(function (l) { return LC.lessonProgress(l).pct === 100; })], ['🌙', 'All poems heard', LC.classics.filter(function (l) { return l.kind === 'poem'; }).every(function (l) { return LC.lessonProgress(l).pct === 100; })],
      ['🎮', 'Played every game', Object.keys(S.games).length >= 7], ['🔥', '7-day streak', LC.streak() >= 7], ['🐉', 'Top Scholar 状元', S.stars >= 700]
    ];
    render([
      h('div', { class: 'page-head' }, [h('h1', null, '🏆 My Progress 我的进步')]),
      h('div', { class: 'levelbox' }, [h('div', { class: 'lv-e' }, lv.emoji), h('div', { class: 'lv-main' }, [h('b', { lang: 'zh-Hans' }, lv.zh + ' · ' + lv.en), h('div', { class: 'bar fat' }, h('i', { style: { width: pct + '%' } })), h('small', null, lv.next ? S.stars + ' / ' + lv.next + ' ⭐ to the next level' : 'Highest level reached! 🎉')])]),
      h('div', { class: 'levels' }, LC.levels.map(function (l, i) { return h('span', { class: 'lvchip' + (i <= lv.i ? ' got' : '') }, l[3] + ' ' + l[1] + ' ' + l[2] + ' · ' + l[0] + '⭐'); })),
      h('h2', null, '🎖️ Badges'),
      h('div', { class: 'badges' }, badges.map(function (b) { return h('div', { class: 'badge' + (b[2] ? ' got' : '') }, [h('span', null, b[0]), h('small', null, b[1])]); })),
      h('h2', null, '📈 Lessons'),
      h('div', { class: 'plist' }, LC.allLessons().map(function (l) { var p = LC.lessonProgress(l); return h('a', { class: 'prow', href: '#lesson/' + l.id }, [h('span', null, l.emoji + ' ' + l.zh + ' ' + l.title), h('div', { class: 'bar' }, h('i', { style: { width: p.pct + '%' } })), h('small', null, p.pct + '%')]); })),
      h('h2', null, '🎮 Best game scores'),
      h('div', { class: 'chips' }, (LC.gameList || []).map(function (g) { return h('span', { class: 'chip static' }, g.emoji + ' ' + g.name + ': ' + (S.games[g.id] ? S.games[g.id].best + ' ⭐ (' + S.games[g.id].plays + ' plays)' : '—')); })),
      h('h2', null, '⚙️ Settings'),
      h('div', { class: 'settings' }, [
        h('label', null, ['Voice ', voiceSel]), h('label', null, ['Speaking speed ', rate, rateLbl]), h('label', null, [snd, ' Sound effects']),
        h('button', { class: 'btn ghost', onclick: function () { LC.speak('你好，我们一起学中文吧！'); } }, '🔊 Test the voice'),
        h('button', { class: 'btn danger', onclick: function () { if (confirm('Erase all stars and progress on this device?')) { localStorage.removeItem('learn-chinese-v1'); location.reload(); } } }, 'Reset my progress')
      ]),
      h('p', { class: 'note' }, LC.voices().length ? '' : 'No Chinese voice was found in this browser. On Windows, macOS, iOS, Android and ChromeOS you can add a “Chinese (Mandarin, zh-CN)” voice in the system language / text-to-speech settings; Chrome and Edge usually include one already.'),
      h('h2', null, '🔗 More places to learn'),
      refList([['Wikipedia: Standard Chinese (Mandarin)', 'https://en.wikipedia.org/wiki/Standard_Chinese'], ['Wikipedia: Pinyin', 'https://en.wikipedia.org/wiki/Pinyin'], ['Wikipedia: Chinese characters', 'https://en.wikipedia.org/wiki/Chinese_characters'],
        ['古诗文网 — classical poems and texts', 'https://www.gushiwen.cn/'], ['Chinese Text Project — the classics with translations', 'https://ctext.org/'], ['MDBG Chinese–English dictionary', 'https://www.mdbg.net/chinese/dictionary'],
        ['汉典 zdic.net', 'https://www.zdic.net/'], ['汉字字源 hanziyuan.net', 'https://hanziyuan.net/'], ['Video: Learn Chinese for kids', 'https://www.youtube.com/results?search_query=learn+chinese+for+kids'],
        ['Video: 小学语文 古诗 动画', 'https://www.youtube.com/results?search_query=' + encodeURIComponent('小学语文 古诗 动画')], ['Video (Bilibili): 成语故事 动画', 'https://search.bilibili.com/all?keyword=' + encodeURIComponent('成语故事 动画')]]),
      h('h2', null, 'Credits'),
      h('p', { class: 'note', html: 'Stroke animations: <a href="https://hanziwriter.org" target="_blank" rel="noopener">Hanzi Writer</a> (MIT) with stroke data from <a href="https://github.com/skishore/makemeahanzi" target="_blank" rel="noopener">Make Me a Hanzi</a> (Arphic Public License). Character readings and meanings: <a href="https://www.mdbg.net/chinese/dictionary?page=cc-cedict" target="_blank" rel="noopener">CC-CEDICT</a> (CC BY-SA 4.0). The poems and classical texts are ancient public-domain works. Ancient-script drawings are simplified teaching sketches made for this project.' })
    ]);
  }

  /* ============ word / character popup ============ */
  var modal = document.getElementById('modal'), modalBody = document.getElementById('modal-body'), writer = null, evoTimer = null, history = [];
  function closeModal() { modal.classList.remove('open'); LC.stopSpeak(); clearInterval(evoTimer); writer = null; history = []; modalBody.innerHTML = ''; }
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  ui.closeModal = closeModal;

  ui.openWord = function (t, keep) {
    if (!keep) history = []; history.push(t);
    clearInterval(evoTimer); LC.markWord(t.w);
    var chars = Array.from(t.w), syl = (t.py || '').split(' ');
    var tabs = h('div', { class: 'ctabs' }), panel = h('div', { class: 'cpanel' });
    function pick(i) {
      Array.prototype.forEach.call(tabs.children, function (b, k) { b.classList.toggle('on', k === i); });
      clearInterval(evoTimer); panel.innerHTML = ''; panel.appendChild(charPanel(chars[i], syl[i] || ''));
    }
    chars.forEach(function (c, i) { tabs.appendChild(h('button', { class: 'ctab', lang: 'zh-Hans', onclick: function () { LC.sfx('tap'); pick(i); LC.speak(c); } }, [h('small', { class: toneClass(syl[i] || '') }, syl[i] || ''), c])); });
    modalBody.innerHTML = '';
    modalBody.appendChild(h('div', { class: 'whead' }, [
      history.length > 1 ? h('button', { class: 'wback', onclick: function () { history.pop(); var p = history.pop(); ui.openWord(p, true); } }, '← ' + history[history.length - 2].w) : null,
      h('div', { class: 'wemoji' }, t.emoji || '🀄'),
      h('div', { class: 'wmain' }, [
        h('div', { class: 'wpy' }, syl.map(function (s) { return h('span', { class: toneClass(s) }, s + ' '); })),
        h('div', { class: 'wword', lang: 'zh-Hans' }, t.w),
        h('div', { class: 'wen' }, t.en)
      ]),
      h('div', { class: 'wbtns' }, [speakBtn(t.w, 'big', null, 'Listen'), speakBtn(t.w, 'slow', 0.5, 'Listen slowly')])
    ]));
    if (chars.length > 1) modalBody.appendChild(h('p', { class: 'note center' }, 'This word has ' + chars.length + ' characters — tap each one:'));
    if (chars.length > 1) modalBody.appendChild(tabs);
    modalBody.appendChild(panel);
    modal.classList.add('open'); modalBody.scrollTop = 0;
    pick(0);
    LC.speak(t.w);
  };

  function charPanel(c, syl) {
    var info = LC.chars[c] || { r: [] }, tone = LC.toneOf(syl || (info.r[0] ? info.r[0][0] : '')), ti = LC.toneInfo[tone];
    if (!syl && info.r[0]) syl = info.r[0][0];
    var box = h('div', { class: 'cp' });

    /* --- 1. sound --- */
    var toneSvg = '<svg viewBox="0 0 80 64" class="tonesvg"><path d="M4 4V60H78" class="ax"/><path d="' + ti.path + '" class="tl t' + tone + '" pathLength="1"/></svg>';
    box.appendChild(h('section', { class: 'cbox sound' }, [
      h('h3', null, '🔊 How to say it'),
      h('div', { class: 'soundrow' }, [
        speakBtn(c, 'big'), speakBtn(c, 'slow', 0.5),
        h('div', { class: 'bigpy t' + tone }, syl),
        h('div', { class: 'tonebox', html: toneSvg }),
        h('div', { class: 'tonetxt' }, [h('b', { class: 't' + tone }, ti.zh + ' · ' + ti.name), h('p', null, ti.desc)])
      ]),
      info.r.length > 1 ? h('p', { class: 'note' }, ['This character has more than one reading: ', info.r.map(function (r) { return r[0]; }).filter(function (x, i, a) { return a.indexOf(x) === i; }).join(' / ')]) : null
    ]));

    /* --- 2. writing --- */
    var target = h('div', { class: 'writer', id: 'writer-target' }), status = h('div', { class: 'wstatus' }, info.s ? info.s + ' strokes — press ▶ to watch them one by one' : '');
    var stepN = 0, mode = 'idle';
    function mk() {
      target.innerHTML = '';
      target.appendChild(h('div', { class: 'grid-bg', html: '<svg viewBox="0 0 100 100"><rect x="1" y="1" width="98" height="98"/><path d="M50 1V99M1 50H99M1 1L99 99M99 1L1 99"/></svg>' }));
      if (!window.HanziWriter || !info.s) { target.appendChild(h('div', { class: 'nochar', lang: 'zh-Hans' }, c)); return null; }
      var size = Math.min(240, Math.max(180, Math.floor(window.innerWidth * 0.5)));
      return window.HanziWriter.create(target, c, {
        width: size, height: size, padding: 10, showOutline: true, showCharacter: true, strokeAnimationSpeed: 1, delayBetweenStrokes: 280,
        strokeColor: '#c92a2a', radicalColor: '#1971c2', outlineColor: '#e3d9c6', drawingColor: '#343a40', drawingWidth: 26, highlightColor: '#ffa94d',
        charDataLoader: loadCharData
      });
    }
    writer = mk();
    var bPlay = h('button', { class: 'btn', onclick: function () { if (!writer) return; mode = 'anim'; writer.cancelQuiz(); stepN = 0; status.textContent = 'Watch the order: top to bottom, left to right.'; writer.animateCharacter({ onComplete: function () { status.textContent = 'Blue = the radical (the part that hints at the meaning). Now try ✍️ yourself!'; } }); } }, '▶ Watch');
    var bStep = h('button', { class: 'btn ghost', onclick: function () {
      if (!writer) return; writer.cancelQuiz();
      if (mode !== 'step' || stepN >= info.s) { mode = 'step'; stepN = 0; writer.hideCharacter({ duration: 0 }); }
      var k = stepN++; writer.animateStroke(k); status.textContent = 'Stroke ' + (k + 1) + ' of ' + info.s + (stepN >= info.s ? ' — finished! 🎉' : ''); LC.sfx('tap');
    } }, '👣 Stroke by stroke');
    var bQuiz = h('button', { class: 'btn ghost', onclick: function () {
      if (!writer) return; mode = 'quiz'; stepN = 0; status.textContent = 'Your turn! Draw each stroke with your finger or mouse.';
      writer.quiz({ showHintAfterMisses: 2, onCorrectStroke: function (d) { LC.sfx('tap'); status.textContent = 'Good! ' + (d.strokesRemaining ? d.strokesRemaining + ' more…' : ''); }, onMistake: function () { LC.sfx('bad'); status.textContent = 'Not quite — try that stroke again.'; },
        onComplete: function (d) { LC.sfx('win'); status.textContent = d.totalMistakes ? 'Done with ' + d.totalMistakes + ' slips. Try again for a perfect one!' : 'Perfect! 太棒了! 🌟'; if (!S.chars[c]) { S.chars[c] = 1; LC.addStars(d.totalMistakes ? 2 : 3, 'write'); } } });
    } }, '✍️ Write it');
    box.appendChild(h('section', { class: 'cbox write' }, [h('h3', null, '✍️ How to write it'), target, status, h('div', { class: 'wbtnrow' }, [bPlay, bStep, bQuiz])]));

    /* --- 4. meanings & example words --- */
    var ex = Object.keys(LC.lexicon).filter(function (w) { return w.length > 1 && w.indexOf(c) >= 0; }).slice(0, 10);
    box.appendChild(h('section', { class: 'cbox mean' }, [
      h('h3', null, '📖 What it means'),
      h('ul', { class: 'defs' }, info.r.length ? info.r.map(function (r) { return h('li', null, [h('b', { class: toneClass(r[0]) }, r[0]), ' — ' + r[1]]); }) : [h('li', null, (LC.lexicon[c] || {}).en || '')]),
      info.f ? h('p', { class: 'note' }, 'It is about the #' + info.f + ' most-used character in Chinese' + (info.f <= 300 ? ' — super useful! 🌟' : '.')) : null,
      ex.length ? h('h4', null, 'Words with ' + c) : null,
      ex.length ? h('div', { class: 'wordgrid small' }, ex.map(function (w) { var e = LC.lexicon[w]; return h('button', { class: 'wchip', onclick: function () { ui.openWord(e, true); } }, [h('span', { class: 'wc-e' }, e.emoji), h('span', { class: 'wc-h', lang: 'zh-Hans' }, e.w), h('span', { class: 'wc-p' }, e.py.replace(/ /g, '')), h('span', { class: 'wc-m' }, e.en)]); })) : null
    ]));

    /* --- 3. story / evolution --- */
    var evo = LC.evolution[c], comp = LC.compounds[c];
    if (evo) box.appendChild(evolutionBox(c, evo));
    if (comp) box.appendChild(compoundBox(c, comp));
    if (!evo && !comp) {
      var parts = (info.c || []).filter(function (p) { return /\p{Script=Han}/u.test(p[0]) && !/[㇀-㇯]/.test(p[0]); });
      box.appendChild(h('section', { class: 'cbox evo' }, [
        h('h3', null, '🧩 How it is built'),
        parts.length > 1 ? h('div', { class: 'sum' }, sumRow(parts.map(function (p) { return [p[0], p[1] || (LC.lexicon[p[0]] ? shortEn(LC.lexicon[p[0]].en) : '')]; }), c)) : h('p', { class: 'note' }, 'This character is a single piece — it cannot be split into smaller characters.'),
        scriptStyles(c)
      ]));
    }

    /* --- 5. references --- */
    var q = encodeURIComponent(c);
    box.appendChild(h('section', { class: 'cbox' }, [h('h3', null, '🔗 Look it up'), refList([
      ['汉字字源 — real ancient forms of ' + c, 'https://hanziyuan.net/#' + q], ['汉典 zdic — ' + c, 'https://www.zdic.net/hans/' + q], ['Wiktionary — ' + c + ' (etymology, glyph origin)', 'https://en.wiktionary.org/wiki/' + q],
      ['MDBG dictionary — ' + c, 'https://www.mdbg.net/chinese/dictionary?page=worddict&wdqb=' + q], ['Video: how to write ' + c, 'https://www.youtube.com/results?search_query=' + encodeURIComponent(c + ' 笔顺 怎么写')],
      ['Video: the story of ' + c, 'https://www.youtube.com/results?search_query=' + encodeURIComponent(c + ' 字的演变 汉字故事')], ['Video (Bilibili): ' + c + ' 字的演变', 'https://search.bilibili.com/all?keyword=' + encodeURIComponent(c + ' 字的演变')]
    ])]));
    return box;
  }

  function loadCharData(ch, onLoad, onError) {
    var hex = ch.codePointAt(0).toString(16);
    fetch('vendor/hanzi/' + hex + '.json').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(onLoad).catch(function () {
      fetch('https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/' + encodeURIComponent(ch) + '.json').then(function (r) { return r.json(); }).then(onLoad).catch(onError);
    });
  }
  ui.loadCharData = loadCharData;

  function sumRow(parts, result) {
    var out = [];
    parts.forEach(function (p, i) {
      if (i) out.push(h('span', { class: 'op', style: { 'animation-delay': i * 0.5 - 0.25 + 's' } }, '+'));
      var known = LC.chars[p[0]];
      out.push(h(known ? 'button' : 'span', { class: 'part', style: { 'animation-delay': i * 0.5 + 's' }, onclick: known ? function () { ui.openWord(charToken(p[0]), true); } : null }, [h('b', { lang: 'zh-Hans' }, p[0]), h('small', null, p[1] || '')]));
    });
    out.push(h('span', { class: 'op', style: { 'animation-delay': parts.length * 0.5 + 's' } }, '='));
    out.push(h('span', { class: 'part result', style: { 'animation-delay': parts.length * 0.5 + 0.3 + 's' } }, [h('b', { lang: 'zh-Hans' }, result), h('small', null, shortEn((LC.lexicon[result] || {}).en || ((LC.chars[result] || { r: [] }).r[0] || [])[1] || ''))]));
    return out;
  }
  function compoundBox(c, comp) {
    return h('section', { class: 'cbox evo' }, [h('h3', null, '🧩 How it is built — a little sum'), h('div', { class: 'sum' }, sumRow(comp.parts, c)), h('p', { class: 'story' }, comp.story), scriptStyles(c)]);
  }
  function scriptStyles(c) {
    return h('div', { class: 'styles' }, [
      h('h4', null, '🖌️ Brush styles of today'),
      h('div', { class: 'stylerow', lang: 'zh-Hans' }, [['f-song', '宋体', 'Print (Song)'], ['f-kai', '楷书', 'Regular brush'], ['f-xing', '行书', 'Running hand'], ['f-cao', '草书', 'Grass (very fast)']].map(function (s) {
        return h('div', { class: 'sty' }, [h('span', { class: s[0] }, c), h('small', null, s[1] + ' ' + s[2])]);
      }))
    ]);
  }
  function glyphSvg(paths) {
    return '<svg viewBox="0 0 100 100" class="glyph">' + paths.map(function (d, i) { return '<path pathLength="1" style="animation-delay:' + (i * 0.22) + 's" d="' + d + '"/>'; }).join('') + '</svg>';
  }
  function evolutionBox(c, evo) {
    var stages = [
      { k: 'pic', zh: '图画', en: 'The real thing', era: 'A picture of what the word means', html: '<span class="evo-pic">' + evo.pic + '</span>' },
      { k: 'oracle', zh: '甲骨文', en: 'Oracle bone script', era: 'about 1250 BC — scratched on turtle shell and bone', html: glyphSvg(evo.oracle) },
      { k: 'seal', zh: '小篆', en: 'Seal script', era: '221 BC — the First Emperor\'s official writing', html: glyphSvg(evo.seal) }
    ];
    if (evo.trad) stages.push({ k: 'trad', zh: '繁体', en: 'Traditional', era: 'Regular script, used for about 1,800 years (still used in Taiwan and Hong Kong)', html: '<span class="evo-kai f-kai">' + evo.trad + '</span>' });
    stages.push({ k: 'kai', zh: evo.trad ? '简体' : '楷书', en: evo.trad ? 'Simplified' : 'Regular script', era: evo.trad ? 'since 1956 — fewer strokes, the standard in mainland China' : 'from about AD 200 until today', html: '<span class="evo-kai f-kai">' + c + '</span>' });
    var stageEl = h('div', { class: 'evo-stage' }), cap = h('div', { class: 'evo-cap' }), dots = h('div', { class: 'evo-dots' }), cur = 0, auto = true;
    function show(i) {
      cur = i; var s = stages[i];
      stageEl.className = 'evo-stage st-' + s.k; stageEl.innerHTML = s.html;
      cap.innerHTML = ''; cap.appendChild(h('b', { lang: 'zh-Hans' }, s.zh + ' · ' + s.en)); cap.appendChild(h('small', null, s.era));
      Array.prototype.forEach.call(dots.children, function (d, k) { d.classList.toggle('on', k === i); d.classList.toggle('past', k < i); });
    }
    stages.forEach(function (s, i) { dots.appendChild(h('button', { class: 'evo-dot', onclick: function () { auto = false; clearInterval(evoTimer); bPlay.textContent = '▶ Play'; show(i); } }, [h('i'), h('span', { lang: 'zh-Hans' }, s.zh)])); });
    var bPlay = h('button', { class: 'btn ghost small', onclick: function () {
      if (auto) { auto = false; clearInterval(evoTimer); bPlay.textContent = '▶ Play'; } else start(true);
    } }, '⏸ Pause');
    function start(reset) { auto = true; bPlay.textContent = '⏸ Pause'; if (reset) show(0); clearInterval(evoTimer); evoTimer = setInterval(function () { show((cur + 1) % stages.length); }, 2600); }
    show(0); start();
    return h('section', { class: 'cbox evo' }, [
      h('h3', null, '🕰️ How ' + c + ' grew up — 3,000 years in 10 seconds'),
      h('div', { class: 'evo-wrap' }, [stageEl, h('div', { class: 'evo-side' }, [cap, h('p', { class: 'story' }, evo.story), bPlay])]),
      dots,
      h('p', { class: 'note' }, ['The ancient shapes here are simplified sketches. See real carved examples at ', h('a', { href: 'https://hanziyuan.net/#' + encodeURIComponent(c), target: '_blank', rel: 'noopener' }, '汉字字源'), '.']),
      scriptStyles(c)
    ]);
  }

  /* ============ router ============ */
  function render(kids) {
    LC.stopSpeak(); if (ui._stopPlay) ui._stopPlay(); if (LC.games && LC.games.stop) LC.games.stop();
    view.innerHTML = ''; view.appendChild(h('div', { class: 'page' }, kids)); window.scrollTo(0, 0);
  }
  ui.render = render;
  function route() {
    closeModal();
    var p = (location.hash || '#home').slice(1).split('/');
    Array.prototype.forEach.call(document.querySelectorAll('nav a'), function (a) {
      var key = a.getAttribute('href').slice(1);
      a.classList.toggle('on', key === p[0] || (key === 'daily' && p[0] === 'lesson' && LC.daily.some(function (l) { return l.id === p[1]; })) || (key === 'classics' && p[0] === 'lesson' && LC.classics.some(function (l) { return l.id === p[1]; })) || (key === 'games' && p[0] === 'game'));
    });
    if (p[0] === 'daily') dailyPage(); else if (p[0] === 'classics') classicsPage(); else if (p[0] === 'lesson') lessonPage(p[1]);
    else if (p[0] === 'lab') labPage(); else if (p[0] === 'progress') progressPage();
    else if (p[0] === 'games') LC.games.menu(); else if (p[0] === 'game') LC.games.start(p[1], p[2]);
    else home();
  }
  window.addEventListener('hashchange', route);
  LC.onVoices = function () { if ((location.hash || '').slice(1) === 'progress') progressPage(); };
  applyToggles(); refreshTop(); LC.touchDay(); LC.save();
  ui.start = route;
})();
