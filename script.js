
"use strict";

// ========================================
// 1. NAVIGASI MOBILE
// ========================================
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup navigasi" : "Buka navigasi"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka navigasi");
    menuToggle.textContent = "☰";
  });
});

// ========================================
// 2. INDIKATOR PROGRES HALAMAN
// ========================================
const progressBar = document.getElementById("progressBar");

function updateProgress() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const progress =
    scrollableHeight > 0
      ? (window.scrollY / scrollableHeight) * 100
      : 0;

  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ========================================
// 3. ANIMASI SAAT SCROLL
// ========================================
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// ========================================
// 4. FILTER HARDWARE
// ========================================
const filterButtons = document.querySelectorAll(".filter-btn");
const hardwareCards = document.querySelectorAll(".device-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    hardwareCards.forEach((card) => {
      const matches =
        category === "all" ||
        card.dataset.category === category;

      card.hidden = !matches;
    });
  });
});

// ========================================
// 5. DATA KUIS: 10 PERTANYAAN
// ========================================
const questions = [
  {
    question: "Apa yang dimaksud dengan hardware?",
    answers: [
      "Program untuk mengedit foto",
      "Komponen fisik pada sistem komputer",
      "Sistem operasi komputer",
      "Bahasa pemrograman"
    ],
    correct: 1,
    explanation:
      "Hardware adalah komponen fisik, seperti CPU, RAM, monitor, dan keyboard."
  },
  {
    question: "Komponen yang menjalankan instruksi dan operasi utama komputer adalah ...",
    answers: [
      "Monitor",
      "Printer",
      "CPU",
      "Speaker"
    ],
    correct: 2,
    explanation:
      "CPU menjalankan instruksi program serta melakukan operasi aritmetika dan logika."
  },
  {
    question: "Apa fungsi utama RAM?",
    answers: [
      "Menyimpan data sementara saat komputer bekerja",
      "Mencetak dokumen",
      "Menghasilkan suara",
      "Menghubungkan kabel jaringan secara fisik"
    ],
    correct: 0,
    explanation:
      "RAM menampung data dan instruksi yang sedang digunakan. RAM umumnya bersifat volatil."
  },
  {
    question: "Manakah yang termasuk perangkat input?",
    answers: [
      "Monitor",
      "Printer",
      "Speaker",
      "Keyboard"
    ],
    correct: 3,
    explanation:
      "Keyboard digunakan untuk memasukkan huruf, angka, simbol, dan perintah."
  },
  {
    question: "Apa fungsi motherboard?",
    answers: [
      "Mencetak gambar",
      "Menghubungkan berbagai komponen komputer",
      "Menyimpan semua file secara permanen dengan sendirinya",
      "Menggantikan fungsi seluruh software"
    ],
    correct: 1,
    explanation:
      "Motherboard menyediakan jalur dan koneksi bagi komponen seperti CPU, RAM, dan perangkat lainnya."
  },
  {
    question: "Manakah contoh sistem operasi?",
    answers: [
      "Microsoft Word",
      "Google Chrome",
      "Linux",
      "Keyboard"
    ],
    correct: 2,
    explanation:
      "Linux adalah keluarga sistem operasi. Word dan Chrome merupakan aplikasi."
  },
  {
    question: "Software adalah ...",
    answers: [
      "Kumpulan program dan instruksi digital",
      "Komponen yang selalu bisa disentuh secara fisik",
      "Hanya kabel penghubung komputer",
      "Nama lain untuk monitor"
    ],
    correct: 0,
    explanation:
      "Software berupa program dan instruksi yang dijalankan oleh sistem komputer."
  },
  {
    question: "Apa fungsi device driver?",
    answers: [
      "Menggantikan CPU",
      "Menambah kapasitas fisik RAM secara otomatis",
      "Mengubah monitor menjadi keyboard",
      "Membantu sistem operasi berkomunikasi dengan perangkat keras"
    ],
    correct: 3,
    explanation:
      "Driver memungkinkan sistem operasi menggunakan perangkat keras melalui antarmuka yang sesuai."
  },
  {
    question: "Ketika mengetik lalu huruf muncul di layar, perangkat output yang digunakan adalah ...",
    answers: [
      "Mouse",
      "Monitor",
      "Keyboard",
      "Mikrofon"
    ],
    correct: 1,
    explanation:
      "Monitor menampilkan hasil visual dari proses yang dilakukan komputer."
  },
  {
    question: "Bagaimana hubungan hardware dan software?",
    answers: [
      "Hardware tidak pernah membutuhkan instruksi",
      "Software selalu berbentuk komponen fisik",
      "Keduanya bekerja sama agar sistem komputer dapat menjalankan tugas",
      "Keduanya memiliki fungsi yang selalu sama"
    ],
    correct: 2,
    explanation:
      "Hardware menjalankan operasi fisik, sedangkan software menyediakan instruksi. Keduanya saling mendukung."
  }
];

// ========================================
// 6. ELEMEN KUIS
// ========================================
const quizCounter = document.getElementById("quizCounter");
const quizProgress = document.getElementById("quizProgress");
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const quizArea = document.getElementById("quizArea");
const quizResult = document.getElementById("quizResult");

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let answered = false;

// ========================================
// 7. TAMPILKAN PERTANYAAN
// ========================================
function renderQuestion() {
  const item = questions[currentQuestion];

  selectedAnswer = null;
  answered = false;

  quizCounter.textContent =
    `Soal ${currentQuestion + 1} / ${questions.length}`;

  quizProgress.style.width =
    `${((currentQuestion + 1) / questions.length) * 100}%`;

  questionText.textContent = item.question;
  answerList.replaceChildren();

  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";

  nextQuestion.disabled = true;
  nextQuestion.textContent =
    currentQuestion === questions.length - 1
      ? "Lihat Hasil →"
      : "Jawab & Lanjut →";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = String.fromCharCode(65 + index);

    const answerText = document.createElement("span");
    answerText.textContent = answer;

    button.append(letter, answerText);

    button.addEventListener("click", () => {
      if (answered) return;

      selectedAnswer = index;

      answerList.querySelectorAll(".answer-option").forEach((option) => {
        option.classList.remove("selected");
      });

      button.classList.add("selected");
      nextQuestion.disabled = false;
      quizFeedback.textContent = "Pilihanmu sudah dipilih. Klik tombol untuk memeriksa jawaban.";
    });

    answerList.appendChild(button);
  });
}

// ========================================
// 8. PERIKSA JAWABAN DAN SKOR
// ========================================
nextQuestion.addEventListener("click", () => {
  if (selectedAnswer === null || answered) return;

  const item = questions[currentQuestion];
  const options = answerList.querySelectorAll(".answer-option");

  answered = true;

  options.forEach((option, index) => {
    option.disabled = true;

    if (index === item.correct) {
      option.classList.add("correct");
    }

    if (index === selectedAnswer && index !== item.correct) {
      option.classList.add("wrong");
    }
  });

  if (selectedAnswer === item.correct) {
    score++;
    quizFeedback.textContent = `Benar! ${item.explanation}`;
    quizFeedback.className = "quiz-feedback good";
  } else {
    quizFeedback.textContent = `Belum tepat. ${item.explanation}`;
    quizFeedback.className = "quiz-feedback bad";
  }

  nextQuestion.textContent =
    currentQuestion === questions.length - 1
      ? "Lihat Hasil →"
      : "Soal Berikutnya →";
});

// ========================================
// 9. HASIL AKHIR
// ========================================
function showResult() {
  const percentage = Math.round((score / questions.length) * 100);

  let message;

  if (percentage === 100) {
    message = "Sempurna! Kamu menjawab semua soal dengan benar.";
  } else if (percentage >= 80) {
    message = "Hebat! Pemahamanmu sudah sangat baik.";
  } else if (percentage >= 60) {
    message = "Bagus! Pelajari lagi beberapa konsep untuk meningkatkan hasil.";
  } else {
    message = "Jangan menyerah. Baca kembali materi, lalu coba lagi.";
  }

  quizArea.hidden = true;
  quizResult.hidden = false;
  quizProgress.style.width = "100%";
  quizCounter.textContent = "Quiz selesai";

  const title = document.createElement("h3");
  title.textContent = "MISSION COMPLETE";

  const scoreElement = document.createElement("div");
  scoreElement.className = "result-score";
  scoreElement.textContent = `${percentage}%`;

  const details = document.createElement("div");
  details.className = "result-detail";
  details.textContent =
    `Jawaban benar: ${score} dari ${questions.length} soal.`;

  const description = document.createElement("p");
  description.textContent = message;

  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "btn btn-primary";
  retry.textContent = "Ulangi Quiz ↻";

  retry.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    answered = false;

    quizResult.hidden = true;
    quizResult.replaceChildren();
    quizArea.hidden = false;

    renderQuestion();
  });

  quizResult.replaceChildren(
    title,
    scoreElement,
    details,
    description,
    retry
  );
}

// ========================================
// 10. LANJUT KE SOAL BERIKUTNYA
// ========================================
nextQuestion.addEventListener("click", () => {
  // Jawaban baru diproses satu kali oleh handler sebelumnya.
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
});

// Mulai quiz.
renderQuestion();

// ========================================
// 11. NAVIGASI AKTIF SESUAI BAGIAN HALAMAN
// ========================================
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    { rootMargin: "-25% 0px -65% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}
