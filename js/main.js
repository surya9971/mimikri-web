/* Mimikri web — scroll reveal + small delights */

// ---------- scroll reveal (toggles both ways: down reveals, scrolling back hides) ----------
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) e.target.classList.toggle("in", e.isIntersecting);
  },
  { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// stagger children of any [data-stagger] container
document.querySelectorAll("[data-stagger]").forEach((wrap) => {
  [...wrap.children].forEach((child, i) => {
    child.style.setProperty("--d", `${i * 0.1}s`);
  });
});

// ---------- phone mockup: rotating gameplay cards ----------
const CARDS = [
  { word: "SHAH RUKH KHAN", hint: "King of romance", deck: "INDIAN STARS" },
  { word: "SHOLAY", hint: "1975 · Kitne aadmi the?", deck: "BOLLYWOOD" },
  { word: "KAJRA RE", hint: "Bunty Aur Babli · 2005", deck: "HIT HINDI SONGS" },
  { word: "MS DHONI", hint: "Captain Cool", deck: "CRICKET" },
  { word: "BAAHUBALI", hint: "Why did Kattappa…", deck: "SOUTH CINEMA" },
  { word: "FLIPPING A PANCAKE", hint: "Toss it up!", deck: "ACT IT OUT" },
];
const wordEl = document.querySelector(".phone-screen .word");
const hintEl = document.querySelector(".phone-screen .hint");
const deckEl = document.querySelector(".phone-screen .deckname");
const timerEl = document.querySelector(".phone-screen .timer");

if (wordEl) {
  let i = 0;
  let t = 60;
  setInterval(() => {
    i = (i + 1) % CARDS.length;
    t = t <= 8 ? 60 : t - Math.floor(Math.random() * 5 + 4);
    wordEl.style.opacity = 0;
    setTimeout(() => {
      wordEl.textContent = CARDS[i].word;
      hintEl.textContent = CARDS[i].hint;
      deckEl.textContent = CARDS[i].deck;
      timerEl.textContent = `0:${String(t).padStart(2, "0")}`;
      wordEl.style.opacity = 1;
    }, 220);
  }, 2600);
  wordEl.style.transition = "opacity 0.22s ease";
}

// ---------- footer year ----------
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
