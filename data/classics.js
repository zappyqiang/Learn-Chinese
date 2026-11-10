/* Classic poems, sayings, fables and history stories found in Chinese school textbooks.
   Same sentence format as data/daily.js. The poems and classical texts are ancient public-domain works;
   the modern retellings and English translations were written for this project. */
window.LC = window.LC || {};
(function () {
  var yt = function (q) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(q); };
  var bili = function (q) { return 'https://search.bilibili.com/all?keyword=' + encodeURIComponent(q); };
  var gsw = function (q) { return 'https://so.gushiwen.cn/search.aspx?value=' + encodeURIComponent(q); };
  var baike = function (q) { return 'https://baike.baidu.com/item/' + encodeURIComponent(q); };
  var wiki = function (q) { return 'https://en.wikipedia.org/wiki/' + q; };
  var zwiki = function (q) { return 'https://zh.wikipedia.org/wiki/' + encodeURIComponent(q); };
  function stdRefs(zh, extra) {
    return (extra || []).concat([
      ['古诗文网: ' + zh, gsw(zh)],
      ['百度百科: ' + zh, baike(zh)],
      ['Video (YouTube): ' + zh, yt(zh + ' 动画')],
      ['Video (Bilibili): ' + zh, bili(zh + ' 动画')]
    ]);
  }

  LC.classics = [
  /* ───────────── POEMS ───────────── */
  {
    id: 'yonge', kind: 'poem', zh: '咏鹅', title: 'Ode to the Goose', author: '骆宾王 Luò Bīnwáng', era: 'Tang dynasty, about 626–684', emoji: '🦢', grade: 'Grade 1',
    intro: 'Written when the poet was only seven years old! He watched geese swimming in a pond and made this poem on the spot.',
    scene: { bg: 'pond', actors: [['🦢', 'swim', 18, 52], ['🦢', 'swim2', 55, 60], ['🌿', 'sway', 6, 70], ['🌿', 'sway', 88, 72], ['☁️', 'drift', 20, 8]] },
    refs: stdRefs('咏鹅', [['Wikipedia: Luo Binwang', wiki('Luo_Binwang')]]),
    sentences: [
      ['鹅 ， 鹅 ， 鹅 ，', 'Goose, goose, goose,', '🦢🦢🦢'],
      ['曲 项 向 天 歌 。', 'you bend your neck and sing to the sky.', '🦢🎵☁️'],
      ['白 毛 浮 绿 水 ，', 'White feathers float on the green water,', '🤍💚'],
      ['红 掌 拨 清 波 。', 'red feet paddle the clear waves.', '🔴🌊']
    ]
  },
  {
    id: 'hua', kind: 'poem', zh: '画', title: 'A Painting', author: '(traditional riddle poem)', era: 'Often attributed to Wang Wei, Tang dynasty', emoji: '🖼️', grade: 'Grade 1',
    intro: 'A riddle! The mountain keeps its colour, the water makes no sound, the flowers never fade and the bird is not scared. What is it? — A painting!',
    scene: { bg: 'paper', actors: [['⛰️', 'still', 15, 30], ['🌸', 'sway', 60, 55], ['🐦', 'still', 78, 28], ['🧒', 'walk', 5, 68]] },
    refs: stdRefs('画 远看山有色'),
    sentences: [
      ['远 看 山 有 色 ，', 'From far away the mountain has colour,', '⛰️🎨'],
      ['近 听 水 无 声 。', 'up close the water makes no sound.', '💧🤫'],
      ['春 去 花 还 在 ，', 'Spring is gone but the flowers are still there,', '🌸'],
      ['人 来 鸟 不 惊 。', 'people come near but the bird is not startled.', '🚶🐦']
    ]
  },
  {
    id: 'jingyesi', kind: 'poem', zh: '静夜思', title: 'Quiet Night Thoughts', author: '李白 Lǐ Bái', era: 'Tang dynasty, 701–762', emoji: '🌕', grade: 'Grade 1',
    intro: 'Li Bai is far from home. Bright moonlight in front of his bed looks like frost, and looking at the moon makes him miss his hometown.',
    scene: { bg: 'night', actors: [['🌕', 'glow', 70, 10], ['🛏️', 'still', 12, 62], ['🧔', 'nod', 30, 55], ['✨', 'twinkle', 30, 15], ['✨', 'twinkle', 50, 28]] },
    refs: stdRefs('静夜思', [['Wikipedia: Quiet Night Thought', wiki('Quiet_Night_Thought')], ['Wikipedia: Li Bai', wiki('Li_Bai')]]),
    sentences: [
      ['床 前 明月 光 ，', 'Before my bed, the bright moon\'s light —', '🛏️🌕'],
      ['疑 是 地 上 霜 。', 'I wonder if it is frost on the ground.', '❄️🤔'],
      ['举 头 望 明月 ，', 'I lift my head and gaze at the bright moon,', '🙄🌕'],
      ['低 头 思 故乡 。', 'I lower my head and think of home.', '😔🏡']
    ]
  },
  {
    id: 'chunxiao', kind: 'poem', zh: '春晓', title: 'Spring Dawn', author: '孟浩然 Mèng Hàorán', era: 'Tang dynasty, 689–740', emoji: '🌸', grade: 'Grade 1',
    intro: 'A cosy spring morning. The poet sleeps late, wakes to birdsong and wonders how many flowers last night\'s storm blew down.',
    scene: { bg: 'dawn', actors: [['🌅', 'rise', 70, 40], ['🐦', 'fly', 10, 15], ['🌸', 'fall', 30, 5], ['🌸', 'fall2', 55, 0], ['😴', 'nod', 12, 65]] },
    refs: stdRefs('春晓', [['Wikipedia: Meng Haoran', wiki('Meng_Haoran')]]),
    sentences: [
      ['春 眠 不 觉 晓 ，', 'Sleeping in spring, I did not notice the dawn,', '😴🌅'],
      ['处处 闻 啼 鸟 。', 'everywhere I hear birds singing.', '🐦🎶'],
      ['夜 来 风雨 声 ，', 'In the night came the sound of wind and rain —', '🌬️🌧️'],
      ['花 落 知 多少 。', 'who knows how many flowers fell?', '🌸🍃']
    ]
  },
  {
    id: 'guanquelou', kind: 'poem', zh: '登鹳雀楼', title: 'Climbing Stork Tower', author: '王之涣 Wáng Zhīhuàn', era: 'Tang dynasty, 688–742', emoji: '🏯', grade: 'Grade 2',
    intro: 'To see further, climb higher! The last two lines are one of the most quoted sayings in China.',
    scene: { bg: 'sunset', actors: [['🌇', 'sink', 68, 18], ['⛰️', 'still', 55, 45], ['🏯', 'still', 10, 40], ['🧍', 'climb', 16, 60], ['🌊', 'wave', 40, 78]] },
    refs: stdRefs('登鹳雀楼', [['Wikipedia: Wang Zhihuan', wiki('Wang_Zhihuan')], ['Wikipedia: Yellow River', wiki('Yellow_River')]]),
    sentences: [
      ['白日 依 山 尽 ，', 'The bright sun sinks behind the mountains,', '🌇⛰️'],
      ['黄河 入 海 流 。', 'the Yellow River flows into the sea.', '🌊➡️'],
      ['欲 穷 千里 目 ，', 'If you want to see a thousand miles,', '👀🔭'],
      ['更 上 一 层 楼 。', 'climb one more floor of the tower.', '🏯⬆️']
    ]
  },
  {
    id: 'minnong', kind: 'poem', zh: '悯农', title: 'Pity the Farmers', author: '李绅 Lǐ Shēn', era: 'Tang dynasty, 772–846', emoji: '🌾', grade: 'Grade 2',
    intro: 'Every grain of rice in your bowl took hard work under the hot sun. This poem teaches us not to waste food.',
    scene: { bg: 'field', actors: [['☀️', 'glow', 70, 6], ['👨‍🌾', 'dig', 30, 55], ['🌾', 'sway', 10, 68], ['🌾', 'sway', 60, 70], ['💧', 'drip', 36, 50]] },
    refs: stdRefs('悯农 锄禾日当午', [['Wikipedia: Li Shen', wiki('Li_Shen')]]),
    sentences: [
      ['锄 禾 日 当 午 ，', 'Hoeing the crops under the midday sun,', '👨‍🌾☀️'],
      ['汗 滴 禾 下 土 。', 'sweat drips onto the soil beneath the plants.', '💦🌱'],
      ['谁 知 盘 中 餐 ，', 'Who knows that the food on our plate —', '🍚❓'],
      ['粒粒 皆 辛苦 。', 'every single grain — comes from hard work.', '🌾💪']
    ]
  },
  {
    id: 'youziyin', kind: 'poem', zh: '游子吟', title: 'Song of the Travelling Son', author: '孟郊 Mèng Jiāo', era: 'Tang dynasty, 751–814', emoji: '🧵', grade: 'Grade 5',
    intro: 'A mother sews clothes for her son before his long journey. Can a little blade of grass ever repay the warm spring sunshine?',
    scene: { bg: 'room', actors: [['👵', 'nod', 22, 52], ['🧵', 'sew', 36, 58], ['👕', 'still', 44, 62], ['🕯️', 'flicker', 70, 50], ['🧳', 'still', 84, 66]] },
    refs: stdRefs('游子吟', [['Wikipedia: Meng Jiao', wiki('Meng_Jiao')]]),
    sentences: [
      ['慈母 手 中 线 ，', 'The thread in a loving mother\'s hand', '👵🧵'],
      ['游子 身 上 衣 。', 'becomes the clothes on her travelling son.', '🧥🚶'],
      ['临 行 密密 缝 ，', 'Before he leaves she sews stitch after stitch,', '🪡🪡'],
      ['意 恐 迟迟 归 。', 'afraid he will be slow to return.', '😢⏳'],
      ['谁 言 寸草 心 ，', 'Who says the heart of a tiny blade of grass', '🌱💚'],
      ['报 得 三春 晖 。', 'can ever repay the sunshine of spring?', '🌞🌷']
    ]
  },
  {
    id: 'jiangxue', kind: 'poem', zh: '江雪', title: 'River Snow', author: '柳宗元 Liǔ Zōngyuán', era: 'Tang dynasty, 773–819', emoji: '🎣', grade: 'Grade 2',
    intro: 'A silent world covered in snow — no birds, no footprints — only one old man fishing alone. Read the first character of each line: 千 万 孤 独 — "utterly alone".',
    scene: { bg: 'snow', actors: [['❄️', 'fall', 20, 0], ['❄️', 'fall2', 50, 0], ['❄️', 'fall', 78, 0], ['🏔️', 'still', 10, 30], ['🏔️', 'still', 70, 28], ['🛶', 'bob', 40, 66], ['🎣', 'bob', 48, 58]] },
    refs: stdRefs('江雪', [['Wikipedia: River Snow', wiki('River_Snow')], ['Wikipedia: Liu Zongyuan', wiki('Liu_Zongyuan')]]),
    sentences: [
      ['千 山 鸟 飞 绝 ，', 'A thousand mountains — no bird in flight,', '🏔️🚫🐦'],
      ['万 径 人 踪 灭 。', 'ten thousand paths — no human footprint.', '🛤️🚫👣'],
      ['孤 舟 蓑笠 翁 ，', 'A lone boat, an old man in straw cloak and hat,', '🛶👴'],
      ['独 钓 寒 江 雪 。', 'fishing alone in the cold river snow.', '🎣❄️']
    ]
  },
  {
    id: 'jueju', kind: 'poem', zh: '绝句', title: 'Quatrain', author: '杜甫 Dù Fǔ', era: 'Tang dynasty, 712–770', emoji: '🐦', grade: 'Grade 2',
    intro: 'Four lines, four pictures: yellow orioles, white egrets, snowy mountains through a window and boats at the door. Count the colours!',
    scene: { bg: 'day', actors: [['🐤', 'hop', 14, 50], ['🐤', 'hop2', 24, 52], ['🌳', 'sway', 12, 58], ['🕊️', 'fly', 5, 12], ['🏔️', 'still', 62, 30], ['⛵', 'bob', 70, 68]] },
    refs: stdRefs('绝句 两个黄鹂鸣翠柳', [['Wikipedia: Du Fu', wiki('Du_Fu')]]),
    sentences: [
      ['两 个 黄鹂 鸣 翠 柳 ，', 'Two golden orioles sing in the green willows,', '🐤🐤🌳'],
      ['一 行/háng/row,_line 白鹭 上 青天 。', 'a row of white egrets flies up into the blue sky.', '🕊️🕊️🟦'],
      ['窗 含 西岭 千秋 雪 ，', 'My window frames the western peaks with snow of a thousand autumns,', '🪟🏔️'],
      ['门 泊 东吴 万里 船 。', 'at my door are moored boats from faraway Eastern Wu.', '🚪⛵']
    ]
  },
  {
    id: 'lushan', kind: 'poem', zh: '望庐山瀑布', title: 'Viewing the Waterfall at Mount Lu', author: '李白 Lǐ Bái', era: 'Tang dynasty, 701–762', emoji: '🏞️', grade: 'Grade 2',
    intro: 'Li Bai loved big imagination: the waterfall is so tall it looks like the Milky Way falling from heaven!',
    scene: { bg: 'day', actors: [['☀️', 'glow', 74, 6], ['⛰️', 'still', 30, 28], ['🌫️', 'drift', 28, 18], ['💦', 'fall', 40, 20], ['💦', 'fall2', 44, 10], ['🧔', 'nod', 80, 64]] },
    refs: stdRefs('望庐山瀑布', [['Wikipedia: Mount Lu', wiki('Mount_Lu')], ['Wikipedia: Li Bai', wiki('Li_Bai')]]),
    sentences: [
      ['日 照 香炉 生 紫 烟 ，', 'Sunlight on Incense-Burner Peak makes purple mist rise,', '☀️⛰️🟣'],
      ['遥 看 瀑布 挂 前 川 。', 'from afar the waterfall hangs like a river in front.', '👀🏞️'],
      ['飞流 直 下 三 千 尺 ，', 'The flying stream plunges straight down three thousand feet —', '💦⬇️'],
      ['疑 是 银河 落 九天 。', 'I wonder if the Milky Way has fallen from the ninth heaven.', '🌌✨']
    ]
  },

  /* ───────────── SAYINGS ───────────── */
  {
    id: 'sanzijing', kind: 'saying', zh: '三字经', title: 'Three Character Classic (opening)', author: '王应麟 Wáng Yìnglín (attributed)', era: 'Song dynasty, 13th century', emoji: '📜', grade: 'Traditional first reader',
    intro: 'For 700 years Chinese children began reading with this book. Every line has exactly three characters, so it is easy to chant and remember.',
    scene: { bg: 'paper', actors: [['👶', 'bounce', 15, 55], ['❤️', 'pulse', 30, 40], ['👨‍🏫', 'nod', 60, 52], ['📜', 'float', 80, 40]] },
    refs: stdRefs('三字经', [['Wikipedia: Three Character Classic', wiki('Three_Character_Classic')]]),
    sentences: [
      ['人 之 初 ， 性 本 善 。', 'People at birth are naturally good.', '👶💗'],
      ['性 相 近 ， 习 相 远 。', 'Their natures are similar; their habits make them different.', '👫↔️'],
      ['苟 不 教 ， 性 乃 迁 。', 'If they are not taught, their nature will change for the worse.', '📕⚠️'],
      ['教 之 道 ， 贵 以 专 。', 'The right way to teach is to value concentration.', '🎯👩‍🏫'],
      ['玉 不 琢 ， 不 成 器 。', 'Jade that is not polished cannot become a useful thing.', '💎🔨'],
      ['人 不 学 ， 不 知 义 。', 'A person who does not learn cannot know what is right.', '🧑‍🎓⚖️']
    ]
  },
  {
    id: 'lunyu', kind: 'saying', zh: '论语', title: 'Sayings of Confucius (Analects)', author: '孔子 Kǒngzǐ and his students', era: 'Spring and Autumn period, about 500 BC', emoji: '🧙‍♂️', grade: 'Grades 3–7',
    intro: 'Confucius was a great teacher. His students wrote down what he said in a book called 论语 (Lúnyǔ). These lines are memorised by every Chinese student.',
    scene: { bg: 'paper', actors: [['👴', 'nod', 20, 50], ['🧑‍🎓', 'bounce', 50, 58], ['🧑‍🎓', 'bounce2', 64, 58], ['📚', 'float', 82, 45]] },
    refs: stdRefs('论语', [['Wikipedia: Analects', wiki('Analects')], ['Wikipedia: Confucius', wiki('Confucius')], ['Chinese Text Project: 论语 (full text)', 'https://ctext.org/analects/zhs']]),
    sentences: [
      ['学 而 时 习 之 ， 不 亦 说/yuè/pleased_(old_reading_of_悦) 乎 ？', 'To learn and practise it often — is that not a pleasure?', '📖😊'],
      ['有 朋 自 远方 来 ， 不 亦 乐 乎 ？', 'Friends come from far away — is that not a joy?', '🧳🤗'],
      ['三 人 行 ， 必 有 我 师 焉 。', 'When three people walk together, one of them can surely be my teacher.', '🚶🚶🚶'],
      ['温 故 而 知 新 ， 可以 为 师 矣 。', 'Review the old and learn the new — then you can be a teacher.', '🔁💡'],
      ['知 之 为 知 之 ， 不 知 为 不 知 ， 是 知/zhì/wisdom_(old_reading_of_智) 也 。', 'When you know, say you know; when you do not know, say so — that is wisdom.', '🙋🤷'],
      ['敏 而 好/hào/to_be_fond_of 学 ， 不 耻 下 问 。', 'Be quick and eager to learn, and never ashamed to ask those below you.', '⚡❓'],
      ['己 所 不 欲 ， 勿 施 于 人 。', 'Do not do to others what you would not want for yourself.', '🤝💛']
    ]
  },
  {
    id: 'mingju', kind: 'saying', zh: '名言警句', title: 'Famous Wise Sayings', author: '老子, 荀子, 杜甫 and folk wisdom', era: 'Many centuries', emoji: '💡', grade: 'Grades 2–6',
    intro: 'Short lines that Chinese parents and teachers love to quote about effort, time and study.',
    scene: { bg: 'dawn', actors: [['🚶', 'walk', 5, 62], ['⛰️', 'still', 70, 34], ['⏳', 'pulse', 40, 30], ['📚', 'float', 86, 60]] },
    refs: [
      ['Wikipedia: Tao Te Ching (老子)', wiki('Tao_Te_Ching')], ['Wikipedia: Xunzi', wiki('Xunzi_(book)')],
      ['古诗文网: 名句', 'https://so.gushiwen.cn/mingjus/'], ['Video: 名言警句 for kids', yt('小学生 名言警句')]
    ],
    sentences: [
      ['千里 之 行 ， 始 于 足 下 。', 'A journey of a thousand miles begins under your feet. — Laozi', '👣🛤️'],
      ['不 积 跬步 ， 无 以 至 千里 。', 'Without adding up small steps, you cannot reach a thousand miles. — Xunzi', '🐾➕'],
      ['少壮 不 努力 ， 老大 徒 伤悲 。', 'If you do not work hard when young, you will be sad for nothing when old.', '🧒💪👴'],
      ['读书 破 万 卷 ， 下 笔 如 有 神 。', 'Read ten thousand books and your pen will write as if by magic. — Du Fu', '📚🖌️✨'],
      ['一 寸 光阴 一 寸 金 ， 寸 金 难 买 寸 光阴 。', 'An inch of time is an inch of gold, but gold cannot buy an inch of time.', '⏳🪙'],
      ['书 山 有 路 勤 为 径 ， 学 海 无 涯 苦 作 舟 。', 'Hard work is the path up the mountain of books; effort is the boat on the endless sea of learning.', '⛰️📚⛵']
    ]
  },

  /* ───────────── FABLES & STORIES ───────────── */
  {
    id: 'shouzhu', kind: 'story', zh: '守株待兔', title: 'Waiting by the Stump for a Rabbit', author: '《韩非子》 Hán Fēizǐ', era: 'Warring States period, about 250 BC', emoji: '🐇', grade: 'Grade 3',
    intro: 'A farmer gets a free rabbit by luck — and then waits for luck to come again. Idiom meaning: do not sit and hope for a lucky accident; work for it!',
    moral: 'Good luck does not repeat itself. Keep working.',
    scene: { bg: 'field', actors: [['🌳', 'still', 46, 46], ['🐇', 'dash', 0, 66], ['👨‍🌾', 'nod', 74, 56], ['🌾', 'sway', 86, 70], ['💤', 'float', 80, 40]] },
    refs: stdRefs('守株待兔', [['Wikipedia: Han Feizi', wiki('Han_Feizi')], ['Wikipedia: Chengyu (idioms)', wiki('Chengyu')]]),
    sentences: [
      ['古时候 ， 有 一 个 农夫 在 田 里 种地 。', 'Long ago, a farmer was working in his field.', '👨‍🌾🌾'],
      ['田 里 有 一 个 树桩 。', 'In the field there was a tree stump.', '🪵'],
      ['一 只 兔子 跑 得 太 快 ， 撞 在 树桩 上 死 了 。', 'A rabbit ran too fast, crashed into the stump and died.', '🐇💥🪵'],
      ['农夫 高兴 地 把 兔子 带 回 家 。', 'The farmer happily took the rabbit home.', '😄🐇🏠'],
      ['从此 他 不 再 种地 ， 天天 坐 在 树桩 旁边 等 兔子 。', 'From then on he stopped farming and sat by the stump every day waiting for rabbits.', '🧘🪵⏳'],
      ['可是 再 也 没有 兔子 来 ， 他 的 田 里 长/zhǎng/to_grow 满 了 草 。', 'But no rabbit ever came again, and his field filled up with weeds.', '🌿🌿😞']
    ],
    original: {
      note: 'The original classical text (文言文) — 39 characters, studied in Grade 3.',
      sentences: [
        ['宋 人 有 耕 者 。', 'In the state of Song there was a man who ploughed.', '👨‍🌾'],
        ['田 中 有 株 ， 兔 走/zǒu/to_run_(old_meaning) 触 株 ， 折 颈 而 死 。', 'In his field was a stump; a rabbit ran into it, broke its neck and died.', '🐇💥'],
        ['因 释 其 耒 而 守 株 ， 冀 复 得/dé/to_get 兔 。', 'So he put down his plough and guarded the stump, hoping to get another rabbit.', '🪵👀'],
        ['兔 不 可 复 得/dé/to_get ， 而 身 为 宋国 笑 。', 'No rabbit could be got again, and he became the joke of Song.', '😂']
      ]
    }
  },
  {
    id: 'wangyang', kind: 'story', zh: '亡羊补牢', title: 'Mending the Pen After a Sheep is Lost', author: '《战国策》 Zhànguó Cè', era: 'Warring States period', emoji: '🐑', grade: 'Grade 2',
    intro: 'A wolf steals a sheep through a hole in the fence. Is it too late to fix it? Idiom meaning: it is never too late to fix a mistake.',
    moral: 'When something goes wrong, fix it right away — better late than never.',
    scene: { bg: 'field', actors: [['🐑', 'bounce', 20, 62], ['🐑', 'bounce2', 34, 66], ['🐺', 'sneak', 78, 60], ['🔨', 'dig', 56, 58], ['🧑‍🌾', 'nod', 50, 52]] },
    refs: stdRefs('亡羊补牢', [['Wikipedia: Zhan Guo Ce', wiki('Zhan_Guo_Ce')]]),
    sentences: [
      ['从前 ， 有 一 个 人 养 了 很多 羊 。', 'Once upon a time, a man kept many sheep.', '🧑‍🌾🐑🐑'],
      ['一 天 早上 ， 他 发现 少 了 一 只 羊 。', 'One morning he found that one sheep was missing.', '😮🐑❓'],
      ['原来 羊圈 破 了 一 个 洞 ， 狼 从 洞 里 进来 ， 把 羊 叼 走 了 。', 'It turned out the sheep pen had a hole; a wolf came in through it and carried the sheep off.', '🕳️🐺🐑'],
      ['邻居 说 ： “ 快 把 羊圈 修 好 吧 ！ ”', 'His neighbour said: "Quick, fix the pen!"', '🗣️🔨'],
      ['他 说 ： “ 羊 已经 丢 了 ， 还/hái/still 修 羊圈 做 什么 ？ ”', 'He said: "The sheep is already lost, why bother fixing the pen?"', '🤷'],
      ['第二 天 ， 又 少 了 一 只 羊 。', 'The next day, another sheep was gone.', '😱🐑'],
      ['他 很 后悔 ， 马上 把 洞 补 好 了 。', 'He was very sorry and mended the hole at once.', '😔🔨🕳️'],
      ['从此 ， 他 的 羊 再 也 没有 丢 过 。', 'From then on he never lost a sheep again.', '🐑🐑😊']
    ]
  },
  {
    id: 'huashe', kind: 'story', zh: '画蛇添足', title: 'Drawing Legs on a Snake', author: '《战国策》 Zhànguó Cè', era: 'Warring States period', emoji: '🐍', grade: 'Grade 3 / Grade 6',
    intro: 'A drawing contest for a pot of wine — and one man is too clever for his own good. Idiom meaning: ruining something by adding what is not needed.',
    moral: 'When the job is done, stop. Doing too much can spoil it.',
    scene: { bg: 'paper', actors: [['🐍', 'slither', 20, 60], ['🦶', 'pop', 44, 66], ['🍶', 'bounce', 70, 50], ['🧑‍🎨', 'nod', 84, 56]] },
    refs: stdRefs('画蛇添足'),
    sentences: [
      ['几 个 人 得到 一 壶 酒 。', 'Several men got a pot of wine.', '🍶👥'],
      ['他们 说 ： “ 谁 先 画 好 一 条 蛇 ， 谁 就 喝 这 壶 酒 。 ”', 'They said: "Whoever finishes drawing a snake first drinks this wine."', '🖌️🐍🏁'],
      ['有 一 个 人 最 先 画 好 了 。', 'One man finished first.', '🥇'],
      ['他 看 别人 还/hái/still 没 画 完 ， 就 给 蛇 画 上 了 脚 。', 'He saw the others had not finished, so he added feet to his snake.', '🐍🦶🦶'],
      ['另 一 个 人 画 好 了 ， 拿 起 酒 壶 说 ： “ 蛇 没有 脚 ， 你 画 的 不 是 蛇 ！ ”', 'Another man finished, picked up the wine pot and said: "Snakes have no feet — what you drew is not a snake!"', '🙅🐍'],
      ['最后 ， 画 脚 的 人 没有 喝 到 酒 。', 'In the end, the man who drew the feet got no wine.', '😭🍶']
    ]
  },
  {
    id: 'hujia', kind: 'story', zh: '狐假虎威', title: 'The Fox Borrows the Tiger\'s Might', author: '《战国策》 Zhànguó Cè', era: 'Warring States period', emoji: '🦊', grade: 'Grade 2',
    intro: 'A clever fox tricks a hungry tiger. Idiom meaning: someone weak who bullies others by using a powerful person\'s name.',
    moral: 'Do not be fooled by people who borrow someone else\'s power.',
    scene: { bg: 'forest', actors: [['🦊', 'strut', 30, 62], ['🐯', 'strut2', 14, 58], ['🐰', 'flee', 60, 68], ['🦌', 'flee2', 70, 60], ['🌲', 'still', 88, 44], ['🌲', 'still', 2, 46]] },
    refs: stdRefs('狐假虎威'),
    sentences: [
      ['老虎 抓住 了 一 只 狐狸 。', 'A tiger caught a fox.', '🐯🦊'],
      ['狐狸 说 ： “ 你 不 能 吃 我 ， 我 是 森林 里 的 大王 ！ ”', 'The fox said: "You cannot eat me, I am the king of the forest!"', '🦊👑'],
      ['“ 不 信 ， 你 跟 在 我 后面 走 一 走 。 ”', '"If you do not believe me, walk along behind me."', '🦊➡️🐯'],
      ['小 动物 们 看见 老虎 ， 都 吓 得 跑 了 。', 'The little animals saw the tiger and all ran away in fright.', '🐰🦌💨'],
      ['老虎 以为 大家 害怕 狐狸 。', 'The tiger thought everyone was afraid of the fox.', '🐯🤔'],
      ['其实 ， 大家 怕 的 是 老虎 自己 。', 'Actually, the one they feared was the tiger himself.', '😅🐯']
    ]
  },
  {
    id: 'jingdi', kind: 'story', zh: '井底之蛙', title: 'The Frog at the Bottom of the Well', author: '《庄子》 Zhuāngzǐ', era: 'Warring States period, about 300 BC', emoji: '🐸', grade: 'Grade 2 (坐井观天)',
    intro: 'A frog thinks the sky is only as big as the mouth of its well. Idiom meaning: a person who has seen very little of the world.',
    moral: 'The world is much bigger than what we can see from where we sit. Go and look!',
    scene: { bg: 'well', actors: [['🐸', 'hop', 44, 68], ['🐢', 'peek', 60, 12], ['☁️', 'drift', 30, 4], ['💧', 'drip', 36, 40]] },
    refs: stdRefs('井底之蛙', [['Wikipedia: Zhuangzi', wiki('Zhuangzi_(book)')]]),
    sentences: [
      ['一 只 青蛙 住 在 井 里 。', 'A frog lived in a well.', '🐸🕳️'],
      ['它 觉得 井 里 是 世界 上 最 好 的 地方 。', 'It thought the well was the best place in the world.', '🐸😌'],
      ['一 天 ， 一 只 海龟 来 到 井 边 。', 'One day, a sea turtle came to the edge of the well.', '🐢👋'],
      ['青蛙 说 ： “ 你 看 ， 天 只 有 井口 那么 大 ！ ”', 'The frog said: "Look, the sky is only as big as the mouth of the well!"', '🐸⭕'],
      ['海龟 说 ： “ 大海 很 大 很 大 ， 看 不 到 边 。 ”', 'The turtle said: "The sea is so, so big, you cannot see its edge."', '🐢🌊'],
      ['青蛙 听 了 ， 才 知道 外面 的 世界 那么 大 。', 'Hearing this, the frog finally learned how big the world outside was.', '🐸😲🌍']
    ]
  },
  {
    id: 'yamiao', kind: 'story', zh: '揠苗助长', title: 'Pulling Up Seedlings to Help Them Grow', author: '《孟子》 Mèngzǐ', era: 'Warring States period, about 300 BC', emoji: '🌱', grade: 'Grade 2',
    intro: 'An impatient farmer "helps" his plants grow by pulling them up. Idiom meaning: spoiling things by being too eager for quick results.',
    moral: 'Growing takes time. Be patient — you cannot rush it.',
    scene: { bg: 'field', actors: [['🌱', 'pull', 20, 68], ['🌱', 'pull2', 36, 68], ['🌱', 'pull', 52, 68], ['👨‍🌾', 'dig', 66, 56], ['☀️', 'glow', 80, 6]] },
    refs: stdRefs('揠苗助长', [['Wikipedia: Mencius', wiki('Mencius_(book)')]]),
    sentences: [
      ['有 一 个 农夫 ， 觉得 禾苗 长/zhǎng/to_grow 得 太 慢 。', 'There was a farmer who felt his seedlings were growing too slowly.', '👨‍🌾🌱🐌'],
      ['他 把 禾苗 一 棵 一 棵 往 上 拔 。', 'He pulled the seedlings upward, one by one.', '🌱⬆️'],
      ['回 到 家 ， 他 说 ： “ 今天 累 坏 了 ， 我 帮 禾苗 长高 了 ！ ”', 'Back home he said: "I am worn out today — I helped the seedlings grow taller!"', '😮‍💨🏠'],
      ['他 的 儿子 跑 到 田 里 一 看 ， 禾苗 都 死 了 。', 'His son ran to the field to look — the seedlings had all died.', '🏃🥀'],
      ['做 事情 不 能 太 着急 。', 'We must not be too hasty when we do things.', '⏳🙂']
    ]
  },
  {
    id: 'kongrong', kind: 'story', zh: '孔融让梨', title: 'Kong Rong Gives Away the Bigger Pears', author: 'Traditional story (also in 三字经: 融四岁，能让梨)', era: 'Eastern Han dynasty, about AD 157', emoji: '🍐', grade: 'Grade 1',
    intro: 'Four-year-old Kong Rong takes the smallest pear and leaves the big ones for his brothers. A favourite story about sharing and respect.',
    moral: 'Think of others first, and share.',
    scene: { bg: 'room', actors: [['🍐', 'bounce', 30, 58], ['🍐', 'bounce2', 42, 60], ['🍐', 'bounce', 54, 58], ['👦', 'nod', 14, 54], ['👨', 'nod', 78, 48]] },
    refs: stdRefs('孔融让梨', [['Wikipedia: Kong Rong', wiki('Kong_Rong')]]),
    sentences: [
      ['孔融 四 岁 的 时候 ， 就 很 懂 礼貌 。', 'When Kong Rong was four years old, he already had very good manners.', '👦🙇'],
      ['一 天 ， 爸爸 买 了 一些 梨 。', 'One day, Dad bought some pears.', '👨🍐🍐'],
      ['孔融 拿 了 一 个 最 小 的 梨 。', 'Kong Rong took the smallest pear.', '🤏🍐'],
      ['爸爸 问 ： “ 你 为什么 拿 最 小 的 ？ ”', 'Dad asked: "Why did you take the smallest one?"', '👨❓'],
      ['孔融 说 ： “ 我 年纪 小 ， 应该 吃 小 的 ， 大 的 给 哥哥 吃 。 ”', 'Kong Rong said: "I am young, so I should eat the small one; the big ones are for my older brothers."', '👦💬🍐'],
      ['爸爸 听 了 很 高兴 。', 'Dad was very happy to hear this.', '👨😊']
    ]
  },
  {
    id: 'caochong', kind: 'story', zh: '曹冲称象', title: 'Cao Chong Weighs the Elephant', author: '《三国志》 Records of the Three Kingdoms', era: 'About AD 200', emoji: '🐘', grade: 'Grade 2',
    intro: 'How do you weigh an elephant without a giant scale? A six-year-old boy solves it with a boat, a line and some stones — real science!',
    moral: 'Use your brain: a hard problem can be swapped for an easier one.',
    scene: { bg: 'pond', actors: [['⛵', 'bob', 34, 56], ['🐘', 'bob', 40, 46], ['🪨', 'pop', 70, 66], ['🪨', 'pop', 78, 68], ['👦', 'bounce', 10, 58]] },
    refs: stdRefs('曹冲称象', [['Wikipedia: Cao Chong', wiki('Cao_Chong')], ['Wikipedia: Archimedes\' principle (the science)', wiki('Archimedes%27_principle')]]),
    sentences: [
      ['有 人 送 给 曹操 一 头 大象 。', 'Someone gave Cao Cao an elephant.', '🎁🐘'],
      ['曹操 想 知道 大象 有 多 重/zhòng/heavy 。', 'Cao Cao wanted to know how heavy the elephant was.', '🤔⚖️'],
      ['可是 没有 那么 大 的 秤 。', 'But there was no scale that big.', '⚖️❌'],
      ['他 的 儿子 曹冲 说 ： “ 我 有 办法 ！ ”', 'His son Cao Chong said: "I have an idea!"', '👦💡'],
      ['先 把 大象 牵 到 船 上 ， 在 船 边 画 一 条 线 。', 'First lead the elephant onto a boat and draw a line on the side of the boat at the water.', '🐘⛵✏️'],
      ['再 把 石头 放 到 船 上 ， 让 水 到 线 的 地方 。', 'Then put stones on the boat until the water reaches the line.', '🪨⛵🌊'],
      ['称 一 称 石头 ， 就 知道 大象 多 重/zhòng/heavy 了 。', 'Weigh the stones, and you know how heavy the elephant is.', '🪨⚖️✅']
    ]
  },
  {
    id: 'simaguang', kind: 'story', zh: '司马光砸缸', title: 'Sima Guang Smashes the Vat', author: '《宋史》 History of Song', era: 'Northern Song dynasty, about AD 1026', emoji: '🏺', grade: 'Grade 3 (first classical text!)',
    intro: 'A child falls into a huge water vat. Everyone runs away — except young Sima Guang, who stays calm and thinks fast.',
    moral: 'Stay calm in an emergency and think of a new way.',
    scene: { bg: 'day', actors: [['🏺', 'shake', 44, 54], ['🪨', 'throw', 20, 50], ['👦', 'nod', 12, 58], ['💦', 'splash', 52, 64], ['🧒', 'flee', 74, 62]] },
    refs: stdRefs('司马光砸缸', [['Wikipedia: Sima Guang', wiki('Sima_Guang')]]),
    sentences: [
      ['司马光 小 时候 和 朋友 们 在 院子 里 玩 。', 'When Sima Guang was little, he was playing with friends in the courtyard.', '👦👧🏡'],
      ['一 个 小朋友 掉 进 了 大 水缸 里 。', 'One child fell into a big water vat.', '🧒💦🏺'],
      ['别 的 孩子 都 吓 跑 了 。', 'The other children all ran away in fright.', '😱🏃'],
      ['司马光 拿 起 一 块 大 石头 ， 用力 砸 破 了 水缸 。', 'Sima Guang picked up a big stone and smashed the vat with all his strength.', '🪨💥🏺'],
      ['水 流 出来 了 ， 小朋友 得救 了 。', 'The water flowed out and the child was saved.', '💦🙌']
    ],
    original: {
      note: 'The original classical text (文言文) — the very first classical Chinese passage in the Grade 3 textbook.',
      sentences: [
        ['群 儿 戏 于 庭 ，', 'A group of children were playing in the courtyard.', '👦👧'],
        ['一 儿 登 瓮 ， 足 跌 没/mò/to_sink 水 中 。', 'One child climbed onto a vat, slipped and sank into the water.', '🧒🏺💦'],
        ['众 皆 弃 去 ，', 'Everyone abandoned him and left.', '🏃🏃'],
        ['光 持 石 击 瓮 破 之 ，', 'Guang took a stone and struck the vat and broke it;', '🪨💥'],
        ['水 迸 ， 儿 得/dé/to_get 活 。', 'the water burst out, and the child lived.', '💦😀']
      ]
    }
  },
  {
    id: 'yugong', kind: 'story', zh: '愚公移山', title: 'The Foolish Old Man Moves the Mountains', author: '《列子》 Lièzǐ', era: 'Warring States period', emoji: '⛰️', grade: 'Grade 8 (classical text)',
    intro: 'Two huge mountains block an old man\'s door. He decides to dig them away, basket by basket. Idiom meaning: with determination, anything can be done.',
    moral: 'Keep going, a little every day, and even mountains will move.',
    scene: { bg: 'day', actors: [['⛰️', 'shrink', 30, 28], ['⛰️', 'shrink', 56, 30], ['👴', 'dig', 16, 60], ['🧺', 'bounce', 26, 68], ['👦', 'dig', 78, 62]] },
    refs: stdRefs('愚公移山', [['Wikipedia: The Foolish Old Man Removes the Mountains', wiki('The_Foolish_Old_Man_Removes_the_Mountains')]]),
    sentences: [
      ['愚公 的 家 门 前 有 两 座 大 山 。', 'In front of Yugong\'s house stood two big mountains.', '🏠⛰️⛰️'],
      ['出 门 很 不 方便 。', 'Going out was very inconvenient.', '🚶😩'],
      ['愚公 说 ： “ 我们 把 山 搬 走 吧 ！ ”', 'Yugong said: "Let us move the mountains away!"', '👴💪'],
      ['有 人 笑 他 ： “ 你 这么 老 ， 怎么 搬 得 完 ？ ”', 'Someone laughed at him: "You are so old, how can you ever finish?"', '😆👉👴'],
      ['愚公 说 ： “ 我 有 儿子 ， 儿子 有 孙子 。 山 不 会 长高 ， 一定 能 搬 完 ！ ”', 'Yugong said: "I have sons, and my sons have grandsons. The mountains will not grow taller — we will surely finish!"', '👴👨👦'],
      ['这个 故事 告诉 我们 ： 只要 坚持 ， 就 能 成功 。', 'This story tells us: if we keep at it, we can succeed.', '🏆✨']
    ]
  },

  /* ───────────── HISTORY ───────────── */
  {
    id: 'hanzi', kind: 'history', zh: '汉字的故事', title: 'The Story of Chinese Characters', author: 'History', era: 'From about 1250 BC to today', emoji: '🐢', grade: 'Culture',
    intro: 'Chinese writing is more than 3,000 years old. The oldest characters we can read were scratched on turtle shells and ox bones.',
    scene: { bg: 'paper', actors: [['🐢', 'bob', 12, 58], ['🦴', 'float', 30, 50], ['✍️', 'sew', 50, 54], ['📜', 'float', 70, 46], ['📱', 'pop', 88, 56]] },
    timeline: [
      ['甲骨文', 'Oracle bone script', '~1250 BC', 'Carved on turtle shells and bones to ask questions of the ancestors.'],
      ['金文', 'Bronze script', '~1000 BC', 'Cast on bronze pots and bells; rounder and thicker.'],
      ['小篆', 'Small seal script', '221 BC', 'The First Emperor made everyone use one script.'],
      ['隶书', 'Clerical script', '~200 BC', 'Flatter and faster to write with a brush.'],
      ['楷书', 'Regular script', '~AD 200', 'The neat standard style we still learn today.'],
      ['简体字', 'Simplified characters', '1956', 'Fewer strokes, easier to learn and write.']
    ],
    refs: [
      ['Wikipedia: Chinese characters', wiki('Chinese_characters')], ['Wikipedia: Oracle bone script', wiki('Oracle_bone_script')],
      ['Wikipedia: Chinese bronze inscriptions', wiki('Chinese_bronze_inscriptions')], ['Wikipedia: Seal script', wiki('Seal_script')],
      ['Wikipedia: Cangjie (legendary inventor of writing)', wiki('Cangjie')],
      ['汉字字源 Chinese Etymology (see real ancient forms)', 'https://hanziyuan.net/'],
      ['Video: evolution of Chinese characters', yt('汉字的演变 动画')], ['Video (Bilibili): 汉字的故事', bili('汉字的故事 甲骨文 动画')]
    ],
    sentences: [
      ['汉字 有 三千 多 年 的 历史 。', 'Chinese characters have more than three thousand years of history.', '🀄⏳'],
      ['很久 以前 ， 人们 把 字 刻 在 龟甲 和 骨头 上 。', 'Long, long ago, people carved characters on turtle shells and bones.', '🐢🦴✍️'],
      ['这 种/zhǒng/kind,_type 字 叫 甲骨文 。', 'This kind of writing is called oracle bone script.', '🦴🔤'],
      ['很多 汉字 一 开始 是 一 幅 画 。', 'Many characters began as a picture.', '🖼️➡️字'],
      ['“ 日 ” 像 太阳 ， “ 月 ” 像 月亮 ， “ 山 ” 像 三 座 山 。', '"日" looks like the sun, "月" like the moon, and "山" like three peaks.', '☀️🌙⛰️'],
      ['后来 ， 字 慢慢 变成 了 今天 的 样子 。', 'Later, the characters slowly changed into how they look today.', '🔄✨']
    ]
  },
  {
    id: 'dayu', kind: 'history', zh: '大禹治水', title: 'Yu the Great Tames the Flood', author: 'Legend / early history', era: 'About 2000 BC', emoji: '🌊', grade: 'Grade 2',
    intro: 'A hero who beat a terrible flood not by blocking the water, but by digging channels to lead it to the sea.',
    scene: { bg: 'pond', actors: [['🌊', 'wave', 10, 62], ['🌊', 'wave', 50, 66], ['👷', 'dig', 30, 52], ['⛏️', 'dig', 40, 56], ['🏠', 'still', 80, 46]] },
    refs: [['Wikipedia: Yu the Great', wiki('Yu_the_Great')], ['Wikipedia: Great Flood (China)', wiki('Great_Flood_(China)')], ['百度百科: 大禹治水', baike('大禹治水')], ['Video: 大禹治水', yt('大禹治水 动画')], ['Video (Bilibili): 大禹治水', bili('大禹治水 动画')]],
    sentences: [
      ['很久 以前 ， 黄河 常常 发 大 水 。', 'Long, long ago, the Yellow River often flooded.', '🌊🏚️'],
      ['大禹 带 着 人们 挖 河道 ， 让 水 流 到 大海 。', 'Yu the Great led the people to dig channels so the water could flow to the sea.', '⛏️🌊➡️'],
      ['他 工作 了 十三 年 。', 'He worked for thirteen years.', '📆💪'],
      ['他 三 次 路过 家 门口 ， 都 没有 进去 。', 'Three times he passed his own front door, and never went in.', '🚪🚶'],
      ['最后 ， 洪水 退 了 ， 人们 过 上 了 好 日子 。', 'At last the flood went down and people lived good days.', '🌈🏡']
    ]
  },
  {
    id: 'kongzi', kind: 'history', zh: '孔子', title: 'Confucius, the Great Teacher', author: 'History', era: '551–479 BC', emoji: '👴', grade: 'Culture',
    intro: 'Confucius believed everyone could learn. Teachers\' Day in some places is celebrated on his birthday.',
    scene: { bg: 'paper', actors: [['👴', 'nod', 18, 50], ['🧑‍🎓', 'bounce', 46, 60], ['🧑‍🎓', 'bounce2', 60, 60], ['🧑‍🎓', 'bounce', 74, 60], ['📜', 'float', 86, 40]] },
    refs: [['Wikipedia: Confucius', wiki('Confucius')], ['Wikipedia: Analects', wiki('Analects')], ['Wikipedia: Temple of Confucius, Qufu', wiki('Temple_of_Confucius,_Qufu')], ['Video: 孔子的故事', yt('孔子的故事 动画')], ['Video (Bilibili): 孔子', bili('孔子 动画 小学')]],
    sentences: [
      ['孔子 是 中国 古代 伟大 的 老师 。', 'Confucius was a great teacher of ancient China.', '👴🎓'],
      ['他 生活 在 两千 五百 多 年 前 。', 'He lived more than two thousand five hundred years ago.', '⏳📜'],
      ['他 有 三千 个 学生 。', 'He had three thousand students.', '🧑‍🎓🧑‍🎓🧑‍🎓'],
      ['他 说 ： 每 个 人 都 有 值得 我 学习 的 地方 。', 'He said: everybody has something worth learning from.', '🤝💡'],
      ['他 的 话 写 在 《 论语 》 这 本 书 里 。', 'His words are written in the book called the Analects.', '📖✍️']
    ]
  },
  {
    id: 'qin', kind: 'history', zh: '秦始皇和长城', title: 'The First Emperor and the Great Wall', author: 'History', era: '221 BC', emoji: '🧱', grade: 'Culture',
    intro: 'The First Emperor joined many kingdoms into one country, and made everyone use the same writing — one reason Chinese characters survived for so long.',
    scene: { bg: 'sunset', actors: [['🧱', 'pop', 10, 56], ['🧱', 'pop', 26, 50], ['🧱', 'pop', 42, 46], ['🧱', 'pop', 58, 50], ['🧱', 'pop', 74, 56], ['🐉', 'float', 40, 14], ['👑', 'pulse', 88, 30]] },
    refs: [['Wikipedia: Qin Shi Huang', wiki('Qin_Shi_Huang')], ['Wikipedia: Great Wall of China', wiki('Great_Wall_of_China')], ['Wikipedia: Terracotta Army', wiki('Terracotta_Army')], ['Video: 长城的故事', yt('长城的故事 动画')], ['Video (Bilibili): 秦始皇 统一文字', bili('秦始皇 统一文字 动画')]],
    sentences: [
      ['两千 多 年 前 ， 秦始皇 统一 了 中国 。', 'More than two thousand years ago, the First Emperor of Qin unified China.', '👑🗺️'],
      ['他 让 大家 写 一样 的 字 ， 用 一样 的 钱 。', 'He made everyone write the same characters and use the same money.', '✍️🪙'],
      ['他 还/hái/also 把 北方 的 墙 连 起来 ， 变成 了 长城 。', 'He also joined up the walls in the north, and they became the Great Wall.', '🧱🧱🧱'],
      ['长城 有 两万 多 公里 长/cháng/long 。', 'The Great Wall is more than twenty thousand kilometres long.', '📏🏔️'],
      ['它 像 一 条 长长 的 龙 。', 'It looks like a long, long dragon.', '🐉'],
      ['不 到 长城 非 好汉 ！', 'You are not a true hero until you have reached the Great Wall!', '💪🧱']
    ]
  },
  {
    id: 'faming', kind: 'history', zh: '四大发明', title: 'The Four Great Inventions', author: 'History', era: 'Han to Song dynasties', emoji: '🧭', grade: 'Culture',
    intro: 'Paper, printing, the compass and gunpowder — four inventions from ancient China that changed the whole world.',
    scene: { bg: 'paper', actors: [['📄', 'float', 12, 50], ['🖨️', 'bounce', 34, 56], ['🧭', 'spin', 56, 52], ['🎆', 'pop', 78, 30], ['🎇', 'pop', 88, 50]] },
    refs: [['Wikipedia: Four Great Inventions', wiki('Four_Great_Inventions')], ['Wikipedia: Cai Lun (paper)', wiki('Cai_Lun')], ['Wikipedia: Bi Sheng (movable type)', wiki('Bi_Sheng')], ['Video: 四大发明', yt('四大发明 动画')], ['Video (Bilibili): 四大发明', bili('四大发明 动画')]],
    sentences: [
      ['中国 古代 有 四 大 发明 。', 'Ancient China had four great inventions.', '4️⃣💡'],
      ['造纸术 ： 蔡伦 改进 了 造 纸 的 方法 。', 'Papermaking: Cai Lun improved the way of making paper.', '📄🌿'],
      ['印刷术 ： 毕昇 发明 了 活字 印刷 。', 'Printing: Bi Sheng invented movable-type printing.', '🔠🖨️'],
      ['指南针 ： 它 可以 告诉 我们 方向 。', 'The compass: it can tell us the direction.', '🧭➡️'],
      ['火药 ： 人们 用 它 做 烟花 。', 'Gunpowder: people use it to make fireworks.', '🎆🎇'],
      ['这些 发明 改变 了 世界 。', 'These inventions changed the world.', '🌍✨']
    ]
  },
  {
    id: 'silu', kind: 'history', zh: '丝绸之路', title: 'The Silk Road', author: 'History', era: 'From 138 BC', emoji: '🐫', grade: 'Culture',
    intro: 'A long road across deserts and mountains that carried silk, tea, fruit, music and ideas between China and the West.',
    scene: { bg: 'desert', actors: [['🐫', 'walk', 0, 58], ['🐫', 'walk2', 0, 62], ['☀️', 'glow', 78, 6], ['🏜️', 'still', 60, 50], ['🍇', 'pop', 88, 66]] },
    refs: [['Wikipedia: Silk Road', wiki('Silk_Road')], ['Wikipedia: Zhang Qian', wiki('Zhang_Qian')], ['Wikipedia: Chang\'an (today Xi\'an)', wiki('Chang%27an')], ['Video: 丝绸之路', yt('丝绸之路 张骞 动画')], ['Video (Bilibili): 丝绸之路', bili('丝绸之路 动画')]],
    sentences: [
      ['两千 多 年 前 ， 张骞 从 长安 出发 ， 向 西 走 。', 'More than two thousand years ago, Zhang Qian set out from Chang\'an and travelled west.', '🧭🚶'],
      ['他 走 了 很 远 很 远 的 路 。', 'He travelled a very, very long way.', '🏜️👣'],
      ['后来 ， 商人 们 骑 着 骆驼 ， 把 丝绸 和 茶 带 到 西方 。', 'Later, merchants riding camels carried silk and tea to the West.', '🐫🧣🍵'],
      ['他们 也 带 回 了 葡萄 和 核桃 。', 'They also brought back grapes and walnuts.', '🍇🌰'],
      ['这 条 路 叫 丝绸之路 。', 'This road is called the Silk Road.', '🛤️🐫']
    ]
  }
  ];
})();
