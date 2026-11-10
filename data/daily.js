/* Daily Chinese lessons.
   Each sentence: [ "space separated words", "English", "emoji scene" ]
   Words are looked up in data/lexicon.js. A word may be overridden inline as  字/pin yin/gloss_with_underscores */
window.LC = window.LC || {};
LC.daily = [
{
  id: 'greetings', zh: '打招呼', title: 'Greetings', emoji: '👋', color: '#ff8a5c',
  intro: 'Say hello, tell your name and be polite. These are the very first sentences every learner needs!',
  tip: 'Chinese has 4 tones. 你好 is written nǐ hǎo, but two 3rd tones in a row sound like "ní hǎo".',
  refs: [
    ['Wikipedia: Pinyin', 'https://en.wikipedia.org/wiki/Pinyin'],
    ['Wikipedia: Four tones', 'https://en.wikipedia.org/wiki/Standard_Chinese_phonology#Tones'],
    ['Video: Chinese greetings for kids', 'https://www.youtube.com/results?search_query=chinese+greetings+for+kids+%E4%BD%A0%E5%A5%BD'],
    ['Video: Pinyin song 拼音歌', 'https://www.youtube.com/results?search_query=%E6%8B%BC%E9%9F%B3%E6%AD%8C+pinyin+song']
  ],
  sentences: [
    ['你好 ！', 'Hello!', '👋😀'],
    ['早上 好 ， 老师 ！', 'Good morning, teacher!', '🌅👩‍🏫'],
    ['你 叫 什么 名字 ？', 'What is your name?', '🤔📛'],
    ['我 叫 小明 。', 'My name is Xiaoming.', '🙋‍♂️'],
    ['你 今年 几 岁 ？', 'How old are you this year?', '🎂❓'],
    ['我 今年 八 岁 。', 'I am eight years old this year.', '🎂8️⃣'],
    ['你 是 哪 国 人 ？', 'Which country are you from?', '🌏❓'],
    ['我 是 中国 人 。', 'I am Chinese.', '🇨🇳🙂'],
    ['很 高兴 认识 你 。', 'Very happy to meet you.', '🤝😊'],
    ['你 好 吗 ？ 我 很 好 ， 谢谢 ！', 'How are you? I am very well, thanks!', '😀👍'],
    ['谢谢 你 ！ 不客气 。', 'Thank you! You are welcome.', '🙏😊'],
    ['对不起 ！ 没关系 。', 'Sorry! It does not matter.', '🙇💛'],
    ['再见 ， 明天 见 ！', 'Goodbye, see you tomorrow!', '👋🌞'],
    ['晚安 ， 做 个 好 梦 。', 'Good night, sweet dreams.', '🌙💤']
  ]
},
{
  id: 'home', zh: '在家', title: 'At Home', emoji: '🏠', color: '#ffb84d',
  intro: 'Family members, rooms and the things we do at home every day.',
  tip: '的 (de) is like "apostrophe-s": 我的家 = my home. Measure words go between a number and a noun: 一只猫 = one cat.',
  refs: [
    ['Video: Family members in Chinese', 'https://www.youtube.com/results?search_query=family+members+in+chinese+for+kids+%E6%88%91%E7%9A%84%E5%AE%B6'],
    ['Wikipedia: Chinese classifiers (measure words)', 'https://en.wikipedia.org/wiki/Chinese_classifier'],
    ['Wikipedia: Chinese kinship', 'https://en.wikipedia.org/wiki/Chinese_kinship']
  ],
  sentences: [
    ['这 是 我 的 家 。', 'This is my home.', '🏠❤️'],
    ['我 家 有 五 口 人 。', 'There are five people in my family.', '👨‍👩‍👧‍👦'],
    ['爸爸 、 妈妈 、 哥哥 、 妹妹 和 我 。', 'Dad, Mom, older brother, younger sister and me.', '👨👩👦👧🙋'],
    ['妈妈 在 厨房 做 饭 。', 'Mom is cooking in the kitchen.', '👩‍🍳🍲'],
    ['爸爸 在 客厅 看 书 。', 'Dad is reading in the living room.', '👨📖🛋️'],
    ['我 每天 七 点 起床 。', 'I get up at seven o\'clock every day.', '⏰🛏️'],
    ['我 先 刷牙 ， 再 洗脸 。', 'First I brush my teeth, then I wash my face.', '🪥🧼'],
    ['吃饭 以前 要 洗手 。', 'Wash your hands before eating.', '🧼🙌🍚'],
    ['我 帮 妈妈 打扫 房间 。', 'I help Mom clean the room.', '🧹✨'],
    ['我 家 有 一 只 小 猫 。', 'My family has a little cat.', '🐱'],
    ['奶奶 给 我 讲 故事 。', 'Grandma tells me a story.', '👵📚'],
    ['晚上 我们 一起 看 电视 。', 'In the evening we watch TV together.', '🌃📺'],
    ['九 点 了 ， 该 睡觉 了 。', 'It is nine o\'clock, time to sleep.', '🕘😴'],
    ['我 爱 我 的 家 。', 'I love my home.', '🏡💖']
  ]
},
{
  id: 'school', zh: '在学校', title: 'At School', emoji: '🏫', color: '#5cc8ff',
  intro: 'Classroom language: asking the teacher, borrowing a pencil and playing with friends.',
  tip: '吗 (ma) at the end turns a sentence into a yes/no question. "A 不 A" does the same: 多不多 = many or not many?',
  refs: [
    ['Video: Classroom Chinese', 'https://www.youtube.com/results?search_query=classroom+chinese+phrases+for+kids'],
    ['Video: School objects in Chinese 文具', 'https://www.youtube.com/results?search_query=%E6%96%87%E5%85%B7+school+supplies+in+chinese'],
    ['Wikipedia: Education in China', 'https://en.wikipedia.org/wiki/Education_in_China']
  ],
  sentences: [
    ['我 是 小学生 。', 'I am a primary school pupil.', '🎒🙂'],
    ['我 每天 走路 去 学校 。', 'I walk to school every day.', '🚶🏫'],
    ['上课 了 ， 请 坐 好 。', 'Class is starting, please sit properly.', '🔔🪑'],
    ['请 打开 书 ， 翻 到 第 十 页 。', 'Please open your book and turn to page ten.', '📖🔟'],
    ['老师 ， 我 有 一 个 问题 。', 'Teacher, I have a question.', '🙋❓'],
    ['这个 字 怎么 读 ？', 'How do you read this character?', '🔤🤔'],
    ['请 再 说 一 遍 。', 'Please say it one more time.', '🔁👂'],
    ['我 喜欢 学 中文 。', 'I like learning Chinese.', '😍🀄'],
    ['今天 的 作业 多 不 多 ？', 'Is there a lot of homework today?', '📝📚'],
    ['我 的 铅笔 在 哪里 ？', 'Where is my pencil?', '✏️🔍'],
    ['你 可以 借 我 一 块 橡皮 吗 ？', 'Can you lend me an eraser?', '🤲🧽'],
    ['下课 以后 我们 去 操场 玩 。', 'After class we go to the playground to play.', '🏃⚽'],
    ['他 是 我 的 好 朋友 。', 'He is my good friend.', '👦🤝👦'],
    ['好好 学习 ， 天天 向上 。', 'Study well and make progress every day.', '📚🚀']
  ]
},
{
  id: 'shopping', zh: '购物', title: 'Shopping', emoji: '🛒', color: '#ff6f91',
  intro: 'Ask the price, bargain a little, pick a colour and pay — at the market or the supermarket.',
  tip: 'Money: 块 (kuài) is the everyday word for yuan 元. 斤 (jīn) is half a kilogram. 两 is used instead of 二 before measure words.',
  refs: [
    ['Video: Shopping in Chinese', 'https://www.youtube.com/results?search_query=shopping+in+chinese+%E5%A4%9A%E5%B0%91%E9%92%B1'],
    ['Wikipedia: Renminbi (Chinese money)', 'https://en.wikipedia.org/wiki/Renminbi'],
    ['Wikipedia: Chinese numerals', 'https://en.wikipedia.org/wiki/Chinese_numerals']
  ],
  sentences: [
    ['我 想 买 苹果 。', 'I want to buy apples.', '🍎🛒'],
    ['这个 多少 钱 ？', 'How much is this?', '💰❓'],
    ['苹果 五 块 钱 一 斤 。', 'Apples are five yuan per jin (half kilo).', '🍎5️⃣'],
    ['太 贵 了 ， 便宜 一点儿 吧 。', 'Too expensive, a little cheaper please.', '😮💸'],
    ['我 要 两 斤 。', 'I want two jin.', '✌️⚖️'],
    ['你 有 没有 大 一点儿 的 ？', 'Do you have a bigger one?', '📏⬆️'],
    ['这 件 衣服 很 漂亮 。', 'This piece of clothing is very pretty.', '👗✨'],
    ['我 可以 试试 吗 ？', 'May I try it?', '🙋👕'],
    ['我 喜欢 红色 的 。', 'I like the red one.', '🔴😍'],
    ['可以 用 手机 付 钱 吗 ？', 'Can I pay with my phone?', '📱💳'],
    ['一共 三十 块 。', 'Thirty yuan altogether.', '🧾3️⃣0️⃣'],
    ['给 你 钱 。 找 你 五 块 。', 'Here is the money. Here is five yuan change.', '💵🤝'],
    ['超市 在 哪里 ？', 'Where is the supermarket?', '🏬🔍'],
    ['谢谢 ， 欢迎 再 来 ！', 'Thank you, welcome to come again!', '🙏🚪']
  ]
},
{
  id: 'food', zh: '吃饭', title: 'Food & Eating', emoji: '🥟', color: '#f9a825',
  intro: 'Order dumplings, ask for tea and say the food is delicious.',
  tip: '了 (le) often shows a change: 我饿了 = I have become hungry. 好吃 literally means "good to eat".',
  refs: [
    ['Video: Food in Chinese for kids', 'https://www.youtube.com/results?search_query=food+in+chinese+for+kids+%E9%A3%9F%E7%89%A9'],
    ['Wikipedia: Chinese cuisine', 'https://en.wikipedia.org/wiki/Chinese_cuisine'],
    ['Wikipedia: Jiaozi (dumplings)', 'https://en.wikipedia.org/wiki/Jiaozi'],
    ['Wikipedia: Chopsticks', 'https://en.wikipedia.org/wiki/Chopsticks']
  ],
  sentences: [
    ['我 饿 了 。', 'I am hungry.', '😋🍽️'],
    ['你 想 吃 什么 ？', 'What would you like to eat?', '🤔🍜'],
    ['我 想 吃 饺子 。', 'I want to eat dumplings.', '🥟🥟'],
    ['请 给 我 菜单 。', 'Please give me the menu.', '📋🙏'],
    ['我 要 一 碗 米饭 。', 'I want a bowl of rice.', '🍚'],
    ['我 不 吃 辣 的 。', 'I do not eat spicy food.', '🌶️🙅'],
    ['这个 菜 真 好吃 ！', 'This dish is really delicious!', '😋👍'],
    ['你 想 喝 什么 ？ 我 想 喝 水 。', 'What would you like to drink? I want water.', '🥤💧'],
    ['请 给 我 一 杯 茶 。', 'Please give me a cup of tea.', '🍵'],
    ['中国 人 用 筷子 吃饭 。', 'Chinese people eat with chopsticks.', '🥢🍚'],
    ['早饭 我 吃 面包 ， 喝 牛奶 。', 'For breakfast I eat bread and drink milk.', '🍞🥛'],
    ['多 吃 蔬菜 和 水果 身体 好 。', 'Eating more vegetables and fruit is good for your body.', '🥦🍇💪'],
    ['我 吃 饱 了 。', 'I am full.', '😌🍽️'],
    ['服务员 ， 买单 ！', 'Waiter, the bill please!', '🧑‍🍳🧾']
  ]
},
{
  id: 'travel', zh: '旅行', title: 'Travelling', emoji: '✈️', color: '#4dd0a7',
  intro: 'Buy a ticket, ask the way, visit the Great Wall and take photos.',
  tip: 'Directions: 左 left, 右 right, 前 front, 后 back. 怎么走 = "how do I walk (there)?"',
  refs: [
    ['Video: Asking directions in Chinese', 'https://www.youtube.com/results?search_query=asking+directions+in+chinese+%E6%80%8E%E4%B9%88%E8%B5%B0'],
    ['Wikipedia: Great Wall of China', 'https://en.wikipedia.org/wiki/Great_Wall_of_China'],
    ['Wikipedia: Beijing', 'https://en.wikipedia.org/wiki/Beijing'],
    ['Wikipedia: High-speed rail in China', 'https://en.wikipedia.org/wiki/High-speed_rail_in_China']
  ],
  sentences: [
    ['我们 去 北京 旅行 。', 'We are travelling to Beijing.', '🧳🏯'],
    ['你 怎么 去 ？ 我 坐 飞机 去 。', 'How are you going? I am going by plane.', '✈️☁️'],
    ['我 要 一 张 去 上海 的 票 。', 'I want one ticket to Shanghai.', '🎫🌆'],
    ['火车 几 点 开 ？', 'What time does the train leave?', '🚄🕐'],
    ['请问 ， 洗手间 在 哪里 ？', 'Excuse me, where is the restroom?', '🚻❓'],
    ['火车站 怎么 走 ？', 'How do I get to the train station?', '🚉🧭'],
    ['一直 往 前 走 ， 然后 左 转 。', 'Go straight ahead, then turn left.', '⬆️↩️'],
    ['地铁 又 快 又 方便 。', 'The subway is both fast and convenient.', '🚇⚡'],
    ['我 想 去 长城 。', 'I want to go to the Great Wall.', '🧱🏔️'],
    ['这里 的 风景 真 美 ！', 'The scenery here is really beautiful!', '🏞️😍'],
    ['请 给 我们 拍 一 张 照片 。', 'Please take a photo of us.', '📸😁'],
    ['我 迷路 了 ， 请 帮 帮 我 。', 'I am lost, please help me.', '😟🗺️'],
    ['我们 住 在 这 家 酒店 。', 'We are staying in this hotel.', '🏨🛎️'],
    ['一路平安 ！', 'Have a safe trip!', '🙌🛫']
  ]
},
{
  id: 'weather', zh: '时间和天气', title: 'Time & Weather', emoji: '🌦️', color: '#7e9bff',
  intro: 'Tell the time, the day and the date, and talk about the four seasons.',
  tip: 'Days and months are just numbers: 星期一 = Monday (week-one), 三月 = March (three-month).',
  refs: [
    ['Video: Days of the week in Chinese', 'https://www.youtube.com/results?search_query=days+of+the+week+in+chinese+song'],
    ['Video: Weather in Chinese 天气', 'https://www.youtube.com/results?search_query=weather+in+chinese+for+kids+%E5%A4%A9%E6%B0%94'],
    ['Wikipedia: Chinese calendar', 'https://en.wikipedia.org/wiki/Chinese_calendar'],
    ['Wikipedia: 24 solar terms', 'https://en.wikipedia.org/wiki/Solar_term']
  ],
  sentences: [
    ['现在 几 点 ？', 'What time is it now?', '🕒❓'],
    ['现在 三 点 半 。', 'It is half past three now.', '🕞'],
    ['今天 星期 几 ？ 今天 星期一 。', 'What day is it today? Today is Monday.', '📅1️⃣'],
    ['今天 几 月 几 号 ？', 'What is the date today?', '🗓️❓'],
    ['今天 天气 怎么样 ？', 'How is the weather today?', '🌤️❓'],
    ['今天 是 晴天 ， 太阳 出来 了 。', 'Today is sunny, the sun has come out.', '☀️😎'],
    ['外面 下雨 了 ， 带 上 雨伞 。', 'It is raining outside, take an umbrella.', '🌧️☔'],
    ['春天 来 了 ， 花 开 了 。', 'Spring has come, the flowers are blooming.', '🌸🌱'],
    ['夏天 很 热 ， 我 爱 吃 冰淇淋 。', 'Summer is hot, I love eating ice cream.', '🥵🍦'],
    ['秋天 的 树叶 变 黄 了 。', 'The autumn leaves have turned yellow.', '🍂🍁'],
    ['冬天 很 冷 ， 会 下雪 。', 'Winter is cold, it will snow.', '🥶❄️'],
    ['一 年 有 四 个 季节 。', 'A year has four seasons.', '🌸☀️🍂❄️'],
    ['明天 是 我 的 生日 。', 'Tomorrow is my birthday.', '🎂🎈'],
    ['祝 你 生日 快乐 ！', 'Happy birthday to you!', '🎉🎁']
  ]
},
{
  id: 'health', zh: '身体和健康', title: 'Body & Health', emoji: '🩺', color: '#ef6c9c',
  intro: 'Name parts of the body and tell the doctor what hurts.',
  tip: '怎么了 = "what is wrong?" Add 疼 (téng, hurt) after a body part: 头疼 = headache, 肚子疼 = tummy ache.',
  refs: [
    ['Video: Body parts in Chinese song', 'https://www.youtube.com/results?search_query=body+parts+in+chinese+song+%E5%A4%B4%E8%82%A9%E8%86%80%E8%84%9A'],
    ['Video: At the doctor in Chinese', 'https://www.youtube.com/results?search_query=at+the+doctor+chinese+lesson+%E7%9C%8B%E5%8C%BB%E7%94%9F'],
    ['Wikipedia: Traditional Chinese medicine', 'https://en.wikipedia.org/wiki/Traditional_Chinese_medicine']
  ],
  sentences: [
    ['你 怎么 了 ？', 'What is wrong with you?', '😟❓'],
    ['我 头 疼 。', 'I have a headache.', '🤕'],
    ['我 感冒 了 。', 'I have caught a cold.', '🤧'],
    ['我 肚子 不 舒服 。', 'My tummy does not feel well.', '😣🫃'],
    ['你 应该 去 看 医生 。', 'You should go to see a doctor.', '👨‍⚕️🏥'],
    ['请 张开 嘴 。', 'Please open your mouth.', '😮👅'],
    ['一 天 吃 三 次 药 。', 'Take the medicine three times a day.', '💊3️⃣'],
    ['多 喝 水 ， 多 休息 。', 'Drink more water and rest more.', '💧🛌'],
    ['我 有 两 只 眼睛 ， 一 张 嘴 。', 'I have two eyes and one mouth.', '👀👄'],
    ['我 用 耳朵 听 ， 用 眼睛 看 。', 'I listen with my ears and look with my eyes.', '👂👁️'],
    ['每天 运动 身体 好 。', 'Exercising every day is good for the body.', '🏃‍♀️💪'],
    ['早 睡 早 起 身体 好 。', 'Early to bed and early to rise keeps you healthy.', '🌙🌞'],
    ['你 好 一点儿 了 吗 ？ 好 多 了 。', 'Are you a bit better? Much better.', '🙂👍'],
    ['祝 你 早日 康复 ！', 'Get well soon!', '💐🍀']
  ]
},
{
  id: 'hobbies', zh: '爱好', title: 'Hobbies & Play', emoji: '🎨', color: '#ab7df6',
  intro: 'Talk about what you like to do: drawing, swimming, football, music and kung fu.',
  tip: '喜欢 + verb = like doing. 会 + verb = know how to do. 加油 (add oil!) means "Go for it!"',
  refs: [
    ['Video: Hobbies in Chinese', 'https://www.youtube.com/results?search_query=hobbies+in+chinese+%E7%88%B1%E5%A5%BD+lesson'],
    ['Wikipedia: Giant panda', 'https://en.wikipedia.org/wiki/Giant_panda'],
    ['Wikipedia: Chinese martial arts (kung fu)', 'https://en.wikipedia.org/wiki/Chinese_martial_arts'],
    ['Wikipedia: Kites in China', 'https://en.wikipedia.org/wiki/Kite#History']
  ],
  sentences: [
    ['你 喜欢 做 什么 ？', 'What do you like to do?', '🤔🎯'],
    ['我 喜欢 画画 。', 'I like drawing.', '🎨🖌️'],
    ['我 会 游泳 。', 'I can swim.', '🏊'],
    ['他 喜欢 踢 足球 。', 'He likes playing football.', '⚽🦶'],
    ['她 唱歌 唱 得 很 好听 。', 'She sings very nicely.', '🎤🎶'],
    ['我 每天 弹 钢琴 。', 'I play the piano every day.', '🎹'],
    ['我 喜欢 看 书 ， 也 喜欢 听 音乐 。', 'I like reading and I also like listening to music.', '📚🎧'],
    ['周末 我 去 公园 放 风筝 。', 'At the weekend I go to the park to fly a kite.', '🪁🌳'],
    ['我们 一起 玩 游戏 吧 ！', 'Let us play a game together!', '🎮🤗'],
    ['你 会 说 中文 吗 ？ 会 一点儿 。', 'Can you speak Chinese? A little.', '🗣️🀄'],
    ['熊猫 喜欢 吃 竹子 。', 'Pandas like eating bamboo.', '🐼🎋'],
    ['我 最 喜欢 的 动物 是 熊猫 。', 'My favourite animal is the panda.', '🐼💖'],
    ['我 想 学 功夫 。', 'I want to learn kung fu.', '🥋'],
    ['加油 ！ 你 真 棒 ！', 'Go for it! You are really great!', '💪🌟']
  ]
},
{
  id: 'nature', zh: '数字、颜色和大自然', title: 'Numbers, Colours & Nature', emoji: '🌈', color: '#3ec6c6',
  intro: 'Count to ten thousand, name the colours and look at the sun, moon, mountains and animals. Many of these characters began as little pictures — tap them to watch them evolve!',
  tip: 'Tap 日 月 山 水 火 木 人 口 马 鱼 鸟 雨 to see how each one grew from an ancient drawing.',
  refs: [
    ['Video: Count 1–10 in Chinese song', 'https://www.youtube.com/results?search_query=count+1+to+10+in+chinese+song'],
    ['Video: Colours in Chinese 颜色歌', 'https://www.youtube.com/results?search_query=%E9%A2%9C%E8%89%B2%E6%AD%8C+colors+in+chinese'],
    ['Wikipedia: Chinese number gestures', 'https://en.wikipedia.org/wiki/Chinese_number_gestures'],
    ['Wikipedia: Chinese character classification (pictograms)', 'https://en.wikipedia.org/wiki/Chinese_character_classification']
  ],
  sentences: [
    ['一 、 二 、 三 、 四 、 五 。', 'One, two, three, four, five.', '🖐️'],
    ['六 、 七 、 八 、 九 、 十 。', 'Six, seven, eight, nine, ten.', '🔟'],
    ['一 百 、 一 千 、 一 万 。', 'One hundred, one thousand, ten thousand.', '💯'],
    ['天 是 蓝色 的 。', 'The sky is blue.', '🟦☁️'],
    ['草 是 绿色 的 。', 'The grass is green.', '🌿🟩'],
    ['雪 是 白色 的 。', 'Snow is white.', '❄️⬜'],
    ['香蕉 是 黄色 的 。', 'Bananas are yellow.', '🍌🟨'],
    ['太阳 从 东方 升 起来 。', 'The sun rises in the east.', '🌄'],
    ['月亮 又 大 又 圆 。', 'The moon is big and round.', '🌕'],
    ['天 上 有 很多 星星 。', 'There are many stars in the sky.', '🌟✨'],
    ['山 上 有 很多 树 。', 'There are many trees on the mountain.', '⛰️🌲'],
    ['小 鸟 在 天 上 飞 。', 'The little bird flies in the sky.', '🐦☁️'],
    ['鱼 在 水 里 游 。', 'The fish swims in the water.', '🐟🌊'],
    ['马 跑 得 很 快 。', 'The horse runs very fast.', '🐎💨']
  ]
}
];
