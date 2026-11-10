# 汉语乐园 · Chinese Playground 🐼

A free, no-install web game for learning and mastering Mandarin Chinese — friendly enough for children, detailed enough for adults.

**Play it:** open `index.html` through any web server, or turn on GitHub Pages for this repository (Settings → Pages → deploy from branch, root folder) and visit the site it gives you.

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## What is inside

| Part | What you get |
| --- | --- |
| 🗣️ **Daily Chinese** | 10 everyday topics, 140 sentences: greetings, at home, at school, shopping, food, travelling, time & weather, body & health, hobbies, numbers/colours/nature |
| 📚 **Classics** | 10 Tang poems (静夜思, 春晓, 登鹳雀楼, 咏鹅, 悯农, 游子吟, 江雪, 绝句, 望庐山瀑布, 画), 三字经, 论语 and famous sayings, 10 idiom fables (守株待兔, 亡羊补牢, 画蛇添足, 狐假虎威, 井底之蛙, 揠苗助长, 孔融让梨, 曹冲称象, 司马光砸缸, 愚公移山) with two original classical texts, and 6 history stories (汉字, 大禹治水, 孔子, 秦始皇和长城, 四大发明, 丝绸之路) |
| 🎮 **7 memory games** | Memory Match, Listen & Pick, Balloon Pop, Sentence Builder, Tone Master, Fill the Blank, Stroke Hero |
| 🔬 **Character Lab** | 30 picture-characters animated from drawing → oracle bone → seal script → modern, plus ~45 characters explained as "sums" of their parts |

### Every sentence

* **Pinyin above every character**, coloured by tone — one button hides or shows it (and another hides the English).
* A **speaker button in front of each sentence** (and a 🐢 slow button); "Play all" reads the whole lesson.
* **Tap any word** to open its card:
  * hear the word and each character, with an animated tone contour;
  * watch the **stroke order**, step through it **stroke by stroke**, then **write it yourself** with finger or mouse;
  * see **how the character evolved** or how it is built from parts, and four modern brush styles;
  * meanings, other words that use the character, and links to dictionaries, etymology sites and videos.
* Animated emoji scenes for every story, a moral for each fable, and reference websites and video searches for every lesson.

Stars, levels (小书童 → 状元), badges, a day streak and best game scores are saved in the browser on your own device.

## Sound

Speech uses the browser's built-in Chinese voice (Web Speech API). Chrome, Edge and Safari normally have one. If you hear nothing, add a "Chinese (Mandarin, zh-CN)" text-to-speech voice in your device settings, then pick it on the **Me** page.

## Project layout

```
index.html            the single page
css/style.css         all styling and animations
js/core.js            word list parser, pinyin helpers, speech, sounds, saved progress
js/ui.js              pages, sentence cards, word/character popup
js/games.js           the seven games
js/evolution.js       ancient-script sketches and character "sums"
data/lexicon.js       ~800 words: characters | pinyin | English | emoji
data/daily.js         Daily Chinese lessons
data/classics.js      poems, sayings, fables, history
data/chars.js         generated per-character dictionary
vendor/               Hanzi Writer + stroke data for the 720 characters used
tools/build.js        checks every sentence and regenerates data/chars.js and vendor/
```

### Adding a lesson

1. Add sentences to `data/daily.js` or `data/classics.js` as `['我 想 买 苹果 。', 'I want to buy apples.', '🍎🛒']` — words separated by spaces.
2. Add any new words to `data/lexicon.js` as `苹果|píng guǒ|apple|🍎`. For a one-off reading, write it inline: `行/háng/row,_line`.
3. Run the checker, which also bundles stroke data for new characters:

```bash
cd tools && npm install && npm run build
```

## Credits and licences

* Stroke animation: [Hanzi Writer](https://hanziwriter.org) (MIT). Stroke data: [Make Me a Hanzi](https://github.com/skishore/makemeahanzi) (Arphic Public License, see `vendor/hanzi/ARPHICPL.TXT`).
* Character readings and meanings in `data/chars.js`: [CC-CEDICT](https://www.mdbg.net/chinese/dictionary?page=cc-cedict) (CC BY-SA 4.0).
* The poems and classical texts are ancient public-domain works; the simple retellings, translations and lesson sentences were written for this project.
* The oracle-bone and seal-script drawings are simplified teaching sketches, not rubbings — the app links to [汉字字源](https://hanziyuan.net/) for real examples.
