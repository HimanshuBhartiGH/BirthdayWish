(() => {
const floatingHearts = document.querySelector('.floating-hearts');
const heartSymbols = ['♥', '♡', '✦', '·'];
for (let i = 0; i < 22; i += 1) {
const heart = document.createElement('span');
heart.className = 'floating-heart';
heart.textContent = heartSymbols[i % heartSymbols.length];
heart.style.left = `${Math.random() * 100}%`;
heart.style.setProperty('--drift', `${-70 + Math.random() * 140}px`);
heart.style.animationDuration = `${13 + Math.random() * 18}s`;
heart.style.animationDelay = `${-Math.random() * 24}s`;
heart.style.fontSize = `${10 + Math.random() * 16}px`;
heart.style.color = i % 3 === 0 ? '#ffc89c' : '#ff6b91';
floatingHearts.appendChild(heart);
}
const quotes = [
['Life is sweeter with you by my side.', '- Anshu'],
['You complete me in every way.', '- Always & Forever'],
['You make every day brighter just by being you.', '- My Easiest Yes'],
['To the prettiest face and the loveliest soul', '- Just Because It’s True']
];
const quoteText = document.getElementById('quoteText');
const quoteAuthor = document.getElementById('quoteAuthor');
let quoteIndex = 0;
document.getElementById('quoteNext').addEventListener('click', () => {
quoteText.style.opacity = '0';
quoteAuthor.style.opacity = '0';
window.setTimeout(() => {
quoteIndex = (quoteIndex + 1) % quotes.length;
quoteText.textContent = quotes[quoteIndex][0];
quoteAuthor.textContent = quotes[quoteIndex][1];
quoteText.style.opacity = '1';
quoteAuthor.style.opacity = '1';
}, 180);
});
const albumMemories = [
{ image: 'images/image1.jpg', alt: 'Soft pink flowers for the first love album memory', quote: 'The best thing I ever found was you.', source: '— Anshu to Pihu', caption: 'the beginning · January 2019' },
{ image: 'images/image9.jpg', alt: 'A couple sharing a loving moment', quote: 'You make my ordinary days feel extraordinary.', source: '— for Pihu', caption: 'two hearts, one rhythm' },
{ image: 'images/image3.jpg', alt: 'A couple embracing in a romantic moment', quote: 'I found my favorite place in your arms.', source: '— always yours', caption: 'safe place · always' },
{ image: 'images/image4.jpg', alt: 'Hands held together in love', quote: 'With you, every road feels like home.', source: '— Anshu ♥ Pihu', caption: 'wherever we go' },
{ image: 'images/image5.jpg', alt: 'A joyful portrait representing a favorite smile', quote: 'Your smile is still my favorite view.', source: '— love, Anshu', caption: 'my favorite view' },
{ image: 'images/image6.jpg', alt: 'A romantic sunset scene for a love memory', quote: 'Some souls just recognize each other.', source: '— our kind of magic', caption: 'our kind of magic' },
{ image: 'images/image7.jpg', alt: 'A romantic flower image for a forever promise', quote: 'I would choose you in every lifetime.', source: '— Anshu to Pihu', caption: 'a promise in bloom' },
{ image: 'images/image8.jpg', alt: 'A couple walking together toward a bright future', quote: 'The story is my favorite because it is ours.', source: '— forever, Pihu', caption: 'to be continued · forever' }
];
const albumRotator = document.getElementById('albumRotator');
const albumRotorCard = document.getElementById('albumRotorCard');
const albumImage = document.getElementById('albumImage');
const albumQuote = document.getElementById('albumQuote');
const albumSource = document.getElementById('albumSource');
const albumCaption = document.getElementById('albumCaption');
const albumCounter = document.getElementById('albumCounter');
const albumDots = document.getElementById('albumDots');
let albumIndex = 0;
let albumChanging = false;
let albumTimer;
albumMemories.forEach((_, index) => {
const dot = document.createElement('span');
dot.className = `album-dot${index === 0 ? ' active' : ''}`;
albumDots.appendChild(dot);
});
function renderAlbum(index) {
const memory = albumMemories[index];
albumQuote.textContent = `“${memory.quote}”`;
albumSource.textContent = memory.source;
albumCaption.textContent = memory.caption;
albumCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(albumMemories.length).padStart(2, '0')}`;
albumImage.style.opacity = '0';
albumImage.onload = () => { albumImage.style.opacity = '1'; };
albumImage.src = memory.image;
albumImage.alt = memory.alt;
albumDots.querySelectorAll('.album-dot').forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
}
function rotateAlbum(direction = 1) {
if (albumChanging) return;
albumChanging = true;
albumRotorCard.classList.add('flipping');
window.setTimeout(() => {
albumIndex = (albumIndex + direction + albumMemories.length) % albumMemories.length;
renderAlbum(albumIndex);
albumRotorCard.classList.remove('flipping');
albumChanging = false;
}, 300);
}
function restartAlbumLoop() {
window.clearInterval(albumTimer);
albumTimer = window.setInterval(() => rotateAlbum(1), 3600);
}
document.getElementById('albumNext').addEventListener('click', (event) => { event.stopPropagation(); rotateAlbum(1); restartAlbumLoop(); });
document.getElementById('albumPrev').addEventListener('click', (event) => { event.stopPropagation(); rotateAlbum(-1); restartAlbumLoop(); });
albumRotorCard.addEventListener('click', () => { rotateAlbum(1); restartAlbumLoop(); });
albumRotorCard.addEventListener('keydown', (event) => {
if (event.key === 'Enter' || event.key === ' ') {
event.preventDefault();
rotateAlbum(1);
restartAlbumLoop();
}
});
renderAlbum(0);
restartAlbumLoop();
const calcForm = document.getElementById('calcForm');
const calculatorCard = document.getElementById('calculatorCard');
const backToCalculator = document.getElementById('backToCalculator');
const calcNameA = document.getElementById('calcNameA');
const calcNameB = document.getElementById('calcNameB');
const calcScore = document.getElementById('calcScore');
const calcTitle = document.getElementById('calcTitle');
const calcQuote = document.getElementById('calcQuote');
const loveNumber = document.getElementById('loveNumber');
const numberMessage = document.getElementById('numberMessage');
function nameKey(name) {
return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}
function calculateLove(event) {
event.preventDefault();
const first = calcNameA.value.trim();
const second = calcNameB.value.trim();
if (!first || !second) return;
const firstKey = nameKey(first);
const secondKey = nameKey(second);
const isAnshuPihu = (firstKey === 'anshu' && secondKey === 'pihu') || (firstKey === 'pihu' && secondKey === 'anshu');
let score;
let number;
let title;
let quote;
if (isAnshuPihu) {
score = 100;
number = 100;
title = 'Strong & healthy love';
quote = 'Anshu and Pihu have a rare kind of love — strong, honest, healthy, and still choosing each other every day.';
} else {
const combined = `${firstKey}${secondKey}`;
let hash = 0;
for (let i = 0; i < combined.length; i += 1) hash = (hash * 31 + combined.charCodeAt(i)) % 10000;
score = 58 + (hash % 40);
number = 1 + (hash % 99);
if (score >= 90) {
title = 'A naturally strong bond';
quote = `${first} and ${second} have a strong connection — keep it healthy with honesty, laughter, and care.`;
} else if (score >= 75) {
title = 'A beautiful connection';
quote = `${first} and ${second} have something sweet growing between them. Give it patience, kindness, and plenty of smiles.`;
} else if (score >= 65) {
title = 'A lovely beginning';
quote = `${first} and ${second} have a lovely spark. The best relationships grow stronger through little acts of care.`;
} else {
title = 'A little spark to grow';
quote = `${first} and ${second} have a playful beginning. Every strong love story starts with curiosity and a little courage.`;
}
}
calcScore.innerHTML = `${score}<span>%</span>`;
calcTitle.textContent = title;
calcQuote.textContent = `“${quote}”`;
loveNumber.textContent = number;
calcNameA.value = '';
calcNameB.value = '';
calculatorCard.classList.add('flipped');
}
calcForm.addEventListener('submit', calculateLove);
backToCalculator.addEventListener('click', () => calculatorCard.classList.remove('flipped'));
const numberQuotes = {
1: 'One story, two hearts, and a lifetime of choosing each other.',
2: 'Two names, one beautiful team: Anshu and Pihu.',
3: 'Three little words will always say it best: I love you.',
4: 'A love built on four things: honesty, respect, laughter, and care.',
5: 'Five reasons are never enough to explain why Pihu is Anshu’s favorite person.',
6: 'Six letters in “always” — the promise hiding inside this number.',
7: 'Lucky seven says this love deserves more memories, more adventures, and more kisses.',
8: 'Turn eight sideways and it becomes forever — just like Anshu and Pihu.',
9: 'Nine little stars are wishing this love a lifetime of soft, happy days.'
};
const numberCard = document.getElementById('numberGameCard');
const backToNumber = document.getElementById('backToNumber');
document.querySelectorAll('.number-choice').forEach((button) => {
button.addEventListener('click', () => {
document.querySelectorAll('.number-choice').forEach((choice) => choice.classList.remove('selected'));
button.classList.add('selected');
const chosen = button.dataset.loveNumber;
numberMessage.classList.add('lucky-picked');
numberMessage.textContent = `Love number ${chosen}: ${numberQuotes[chosen]}`;
document.getElementById('chosenLoveNumber').textContent = chosen;
numberCard.classList.add('flipped');
});
});
backToNumber.addEventListener('click', () => {
numberCard.classList.remove('flipped');
numberMessage.classList.remove('lucky-picked');
});
function burstHearts(origin, count) {
const rect = origin.getBoundingClientRect();
for (let i = 0; i < count; i += 1) {
const piece = document.createElement('span');
piece.textContent = i % 3 === 0 ? '♥' : '✦';
piece.style.position = 'fixed';
piece.style.zIndex = '30';
piece.style.left = `${rect.left + rect.width / 2}px`;
piece.style.top = `${rect.top + rect.height / 2}px`;
piece.style.color = i % 2 ? '#ffc89c' : '#ffb5c7';
piece.style.fontSize = `${12 + Math.random() * 13}px`;
piece.style.pointerEvents = 'none';
piece.style.transition = 'transform 900ms cubic-bezier(.18,.8,.25,1), opacity 900ms ease';
document.body.appendChild(piece);
const x = (Math.random() - .5) * 260;
const y = -80 - Math.random() * 190;
requestAnimationFrame(() => {
piece.style.transform = `translate(${x}px, ${y}px) rotate(${Math.random() * 80 - 40}deg)`;
piece.style.opacity = '0';
});
window.setTimeout(() => piece.remove(), 950);
}
}
const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) entry.target.classList.add('visible');
});
}, { threshold: .14 });
revealItems.forEach((item) => observer.observe(item));
const cakeStage = document.getElementById('cakeStage');
const cakeVisual = document.getElementById('cakeVisual');
const cakeCandles = document.querySelectorAll('.real-candle');
const giftWrap = document.getElementById('giftWrap');
const giftBox = giftWrap.querySelector('.gift-box');
const cakeStatus = document.getElementById('cakeStatus');
const birthdayLyrics = document.getElementById('birthdayLyrics');
let candleIsOut = false;
let cakeIsCut = false;
function showBirthdayLyrics() {
birthdayLyrics.classList.remove('show');
void birthdayLyrics.offsetWidth;
birthdayLyrics.classList.add('show');
}
function extinguishCandle(event) {
if (event) event.stopPropagation();
if (candleIsOut || cakeIsCut) return;
candleIsOut = true;
cakeVisual.classList.add('flame-out');
showBirthdayLyrics();
cakeStatus.textContent = 'Happy Birthday Pihu! Happy Birthday dear pihu';
}
function cutCake(event) {
if (event) event.stopPropagation();
if (!candleIsOut || cakeIsCut) return;
cakeIsCut = true;
cakeVisual.classList.add('cut');
showBirthdayLyrics();
cakeStatus.textContent = 'Happy Birthday Pihu! Happy Birthday dear pihu — the cake is opening for your gift.';
window.setTimeout(() => {
cakeStage.classList.add('cake-cut');
giftWrap.classList.add('show');
cakeStatus.textContent = 'The cake is cut. Tap the gift to open your message.';
}, 700);
}
function openGift(event) {
if (event) event.stopPropagation();
if (!cakeIsCut || giftWrap.classList.contains('open')) return;
giftWrap.classList.add('open');
cakeStatus.textContent = 'A little message from Anshu, made only for Pihu. ♥';
burstHearts(giftWrap, 20);
}
cakeCandles.forEach((candle) => {
candle.addEventListener('click', extinguishCandle);
candle.addEventListener('keydown', (event) => {
if (event.key === 'Enter' || event.key === ' ') {
event.preventDefault();
extinguishCandle(event);
}
});
});
cakeVisual.addEventListener('click', cutCake);
cakeVisual.addEventListener('keydown', (event) => {
if (event.target !== cakeVisual) return;
if (event.key === 'Enter' || event.key === ' ') {
event.preventDefault();
cutCake(event);
}
});
giftBox.addEventListener('click', openGift);
giftBox.addEventListener('keydown', (event) => {
if (event.key === 'Enter' || event.key === ' ') {
event.preventDefault();
openGift(event);
}
});
const openSurprise = document.getElementById('openSurprise');
const surpriseNote = document.getElementById('surpriseNote');
openSurprise.addEventListener('click', () => {
const isOpen = surpriseNote.classList.toggle('open');
openSurprise.innerHTML = isOpen ? 'close the surprise <span aria-hidden="true">↺</span>' : 'open your surprise <span aria-hidden="true">♥</span>';
if (isOpen) burstHearts(surpriseNote, 14);
});
})();
