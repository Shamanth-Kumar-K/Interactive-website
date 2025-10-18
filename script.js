// ---------- CAROUSEL ----------
const slides = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dotsContainer = document.querySelector('.dots');
let currentSlide = 0;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  if(i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dots span');

function showSlide(index) {
  slides.forEach(img => img.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  slides[index].classList.add('active');
  dots[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function goToSlide(i) {
  currentSlide = i;
  showSlide(currentSlide);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-slide every 4s
let slideInterval = setInterval(nextSlide, 4000);

// Pause on hover
document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(slideInterval));
document.querySelector('.carousel').addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 4000));

// ---------- QUIZ ----------
const quizData = [
  { question: "Which language is used for styling web pages?", options: ["HTML", "JQuery", "CSS", "XML"], correct: 2 },
  { question: "Which is not a JavaScript framework?", options: ["React", "Angular", "Vue", "Django"], correct: 3 },
  { question: "Which symbol is used for comments in JavaScript?", options: ["//", "/* */", "#", "<!-- -->"], correct: 0 },
  { question: "Which HTML tag is used to include JavaScript?", options: ["<script>", "<js>", "<javascript>", "<link>"], correct: 0 },
  { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Model", "Display Object Model", "Document Orientation Model"], correct: 0 }
];

let currentQ = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');

function loadQuestion() {
  feedbackEl.textContent = '';
  const q = quizData[currentQ];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = '';
  q.options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      if(i === q.correct) {
        btn.classList.add('correct');
        feedbackEl.textContent = '✅ Correct!';
        score++;
      } else {
        btn.classList.add('incorrect');
        feedbackEl.textContent = `❌ Wrong! Correct answer: ${q.options[q.correct]}`;
      }
      Array.from(optionsEl.children).forEach(b => b.disabled = true);
      setTimeout(() => {
        currentQ++;
        if(currentQ < quizData.length) loadQuestion();
        else showScore();
      }, 1500);
    };
    optionsEl.appendChild(btn);
  });
}

function showScore() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = '';
  feedbackEl.textContent = '';
  scoreEl.textContent = `Your Score: ${score}/${quizData.length}`;
}

loadQuestion();


// ---------- API ----------
const getJokeBtn = document.getElementById('getJokeBtn');
const jokeBox = document.getElementById('jokeBox');

getJokeBtn.addEventListener('click', async () => {
  jokeBox.style.opacity = 0;
  jokeBox.textContent = "Loading joke...";
  try {
    const res = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await res.json();
    setTimeout(() => {
      jokeBox.textContent = `${data.setup} 😂 ${data.punchline}`;
      jokeBox.style.opacity = 1;
    }, 500);
  } catch (err) {
    jokeBox.textContent = "Failed to fetch joke 😞";
    jokeBox.style.opacity = 1;
  }
});
