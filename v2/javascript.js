"use strict";

const STORAGE_KEY = "tin11_hk2_mcq_v1";

const els = {
  examTitle: document.getElementById("examTitle"),
  examSection: document.getElementById("examSection"),
  summary: document.getElementById("summary"),
  toggleAnswerBtn: document.getElementById("toggleAnswerBtn"),
  resetBtn: document.getElementById("resetBtn"),
  openPaletteBtn: document.getElementById("openPaletteBtn"),
  closePaletteBtn: document.getElementById("closePaletteBtn"),
  paletteDesktop: document.getElementById("paletteDesktop"),
  paletteMobile: document.getElementById("paletteMobile"),
  overlay: document.getElementById("overlay"),
  qPosition: document.getElementById("qPosition"),
  qNumber: document.getElementById("qNumber"),
  answerChip: document.getElementById("answerChip"),
  questionText: document.getElementById("questionText"),
  options: document.getElementById("options"),
  prevBtn: document.getElementById("prevBtn"),
  clearBtn: document.getElementById("clearBtn"),
  nextBtn: document.getElementById("nextBtn")
};

let data = null;
let questions = [];

const state = {
  current: 0,
  answers: {},
  showAnswers: false
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const saved = JSON.parse(raw);

    if (typeof saved.current === "number") state.current = saved.current;
    if (saved.answers && typeof saved.answers === "object") state.answers = saved.answers;
    if (typeof saved.showAnswers === "boolean") state.showAnswers = saved.showAnswers;
  } catch (_) {}
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

function normalizeState() {
  const validNumbers = new Set(questions.map((q) => String(q.number)));

  Object.keys(state.answers).forEach((key) => {
    if (!validNumbers.has(String(key))) {
      delete state.answers[key];
    }
  });

  if (state.current < 0) state.current = 0;
  if (state.current > questions.length - 1) state.current = Math.max(questions.length - 1, 0);
}

function optionKey(optionRaw) {
  const match = optionRaw.trim().match(/^[A-D]/i);
  return match ? match[0].toUpperCase() : "";
}

function selectedOf(question) {
  return state.answers[question.number] || "";
}

function getCounts() {
  const answered = questions.filter((q) => !!selectedOf(q)).length;
  const correct = questions.filter((q) => selectedOf(q) === q.answer).length;
  return { answered, correct };
}

function renderHeader() {
  els.examTitle.textContent =
    data?.meta?.subtitleRaw || data?.meta?.titleRaw || "Ôn tập";
  els.examSection.textContent =
    data?.meta?.sectionRaw || "";

  const { answered, correct } = getCounts();

  els.summary.textContent = state.showAnswers
    ? `${answered}/${questions.length} · ${correct} đúng`
    : `${answered}/${questions.length}`;

  els.toggleAnswerBtn.classList.toggle("active", state.showAnswers);
  els.toggleAnswerBtn.setAttribute("aria-pressed", String(state.showAnswers));
}

function classForPaletteButton(question) {
  const selected = selectedOf(question);
  const classes = ["q-btn"];

  if (selected) {
    if (state.showAnswers) {
      classes.push(selected === question.answer ? "correct" : "wrong");
    } else {
      classes.push("answered");
    }
  }

  if (questions[state.current]?.number === question.number) {
    classes.push("current");
  }

  return classes.join(" ");
}

function renderPaletteInto(container) {
  container.innerHTML = questions
    .map(
      (q) =>
        `<button type="button" class="${classForPaletteButton(q)}" data-number="${q.number}" aria-label="Câu ${q.number}">${q.number}</button>`
    )
    .join("");
}

function renderPalette() {
  renderPaletteInto(els.paletteDesktop);
  renderPaletteInto(els.paletteMobile);
}

function renderQuestion() {
  const q = questions[state.current];
  if (!q) return;

  const selected = selectedOf(q);

  els.qPosition.textContent = `${q.number}/${questions.length}`;
  els.qNumber.textContent = `Câu ${q.number}`;
  els.answerChip.hidden = !state.showAnswers;
  els.answerChip.textContent = `Đáp án: ${q.answer}`;
  els.questionText.textContent = q.question;
  els.questionText.scrollTop = 0;

  const fragment = document.createDocumentFragment();

  q.options.forEach((raw) => {
    const key = optionKey(raw);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option-btn";
    btn.dataset.key = key;
    btn.textContent = raw;

    if (!state.showAnswers && selected === key) {
      btn.classList.add("selected");
    }

    if (state.showAnswers) {
      if (key === q.answer) btn.classList.add("correct");
      if (selected === key) btn.classList.add("selected");
      if (selected === key && key !== q.answer) btn.classList.add("wrong");
    }

    btn.addEventListener("click", () => {
      state.answers[q.number] = key;
      saveState();
      render();
    });

    fragment.appendChild(btn);
  });

  els.options.innerHTML = "";
  els.options.appendChild(fragment);

  els.prevBtn.disabled = state.current === 0;
  els.nextBtn.disabled = state.current === questions.length - 1;
  els.clearBtn.disabled = !selected;
}

function render() {
  renderHeader();
  renderPalette();
  renderQuestion();
}

function goTo(index) {
  state.current = Math.max(0, Math.min(index, questions.length - 1));
  saveState();
  render();
}

function clearCurrent() {
  const q = questions[state.current];
  if (!q) return;

  delete state.answers[q.number];
  saveState();
  render();
}

function toggleAnswers() {
  state.showAnswers = !state.showAnswers;
  saveState();
  render();
}

function resetAll() {
  if (!confirm("Xóa toàn bộ lựa chọn?")) return;

  state.answers = {};
  state.current = 0;
  saveState();
  render();
}

function openOverlay() {
  els.overlay.hidden = false;
}

function closeOverlay() {
  els.overlay.hidden = true;
}

function bindEvents() {
  els.toggleAnswerBtn.addEventListener("click", toggleAnswers);
  els.resetBtn.addEventListener("click", resetAll);

  els.prevBtn.addEventListener("click", () => goTo(state.current - 1));
  els.nextBtn.addEventListener("click", () => goTo(state.current + 1));
  els.clearBtn.addEventListener("click", clearCurrent);

  els.openPaletteBtn.addEventListener("click", openOverlay);
  els.closePaletteBtn.addEventListener("click", closeOverlay);

  [els.paletteDesktop, els.paletteMobile].forEach((container) => {
    container.addEventListener("click", (event) => {
      const btn = event.target.closest("[data-number]");
      if (!btn) return;

      goTo(Number(btn.dataset.number) - 1);
      closeOverlay();
    });
  });

  els.overlay.addEventListener("click", (event) => {
    if (event.target === els.overlay) closeOverlay();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeOverlay();
  });

  document.addEventListener("keydown", (event) => {
    if (!els.overlay.hidden && event.key === "Escape") {
      closeOverlay();
      return;
    }

    const tag = document.activeElement?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(state.current - 1);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      goTo(state.current + 1);
      return;
    }

    const map = {
      "1": "A",
      "2": "B",
      "3": "C",
      "4": "D",
      a: "A",
      b: "B",
      c: "C",
      d: "D",
      A: "A",
      B: "B",
      C: "C",
      D: "D"
    };

    const key = map[event.key];
    if (!key) return;

    const q = questions[state.current];
    if (!q) return;

    state.answers[q.number] = key;
    saveState();
    render();
  });
}

async function init() {
  try {
    const response = await fetch("question.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Không tải được question.json");

    data = await response.json();
    questions = Array.isArray(data.questions) ? data.questions : [];

    loadState();
    normalizeState();
    bindEvents();
    render();
  } catch (error) {
    console.error(error);
    els.examTitle.textContent = "Không tải được dữ liệu";
    els.examSection.textContent = "Hãy mở bằng localhost / Live Server.";
    els.summary.textContent = "Lỗi";
    els.questionText.textContent = "Không tải được question.json";
    els.options.innerHTML = "";
  }
}

init();