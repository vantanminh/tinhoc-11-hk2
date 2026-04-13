const STORAGE_KEY = "tin11_hk2_tracnghiem_v1";
const APP_VERSION = 1;
const ANSWER_ORDER = ["A", "B", "C", "D"];

const modeLabels = {
  smart: "Thông minh",
  all: "Tất cả câu",
  unseen: "Chưa học",
  review: "Cần ôn",
  learning: "Đang học",
  mastered: "Đã chắc",
};

const statusLabels = {
  unseen: "Chưa học",
  learning: "Đang học",
  review: "Cần ôn",
  mastered: "Đã chắc",
};

const QUESTIONS_DATA_URL = "questions.json";
const QUESTIONS_CACHE_KEY = `tin11_hk2_questions_cache_v${APP_VERSION}`;

let sectionConfig = [];
let assetNotes = [];
let questions = [];
let questionsById = {};

const currentPage = document.body.dataset.page || "home";
const getById = (id) => document.getElementById(id);

const dom = {
  navLinks: Array.from(document.querySelectorAll("[data-page-link]")),

  homeAttempted: getById("homeAttempted"),
  homeAccuracy: getById("homeAccuracy"),
  homeReview: getById("homeReview"),
  homeSessionSummary: getById("homeSessionSummary"),
  homeSessionMeta: getById("homeSessionMeta"),
  homeSectionOverview: getById("homeSectionOverview"),

  sectionChips: getById("sectionChips"),
  modeSelect: getById("modeSelect"),
  countSelect: getById("countSelect"),
  shuffleToggle: getById("shuffleToggle"),
  buildSessionBtn: getById("buildSessionBtn"),
  continueSmartBtn: getById("continueSmartBtn"),
  sessionMetaText: getById("sessionMetaText"),

  statAttempted: getById("statAttempted"),
  statAttemptedDetail: getById("statAttemptedDetail"),
  statUnseen: getById("statUnseen"),
  statLearning: getById("statLearning"),
  statReview: getById("statReview"),
  statMastered: getById("statMastered"),
  statAccuracy: getById("statAccuracy"),
  statAccuracyDetail: getById("statAccuracyDetail"),
  statsSectionGrid: getById("statsSectionGrid"),
  reviewQuestionList: getById("reviewQuestionList"),

  questionPanel: document.querySelector(".question-panel"),
  questionSectionBadge: getById("questionSectionBadge"),
  questionStatusBadge: getById("questionStatusBadge"),
  currentIndexLabel: getById("currentIndexLabel"),
  totalCountLabel: getById("totalCountLabel"),
  sessionProgressBar: getById("sessionProgressBar"),
  questionTitle: getById("questionTitle"),
  questionCode: getById("questionCode"),
  questionImageWrap: getById("questionImageWrap"),
  questionImage: getById("questionImage"),
  questionImageNote: getById("questionImageNote"),
  questionNote: getById("questionNote"),
  optionsList: getById("optionsList"),
  feedbackBox: getById("feedbackBox"),
  prevBtn: getById("prevBtn"),
  toggleReviewBtn: getById("toggleReviewBtn"),
  nextBtn: getById("nextBtn"),

  sessionResultText: getById("sessionResultText"),
  sessionAnswered: getById("sessionAnswered"),
  sessionCorrect: getById("sessionCorrect"),
  sessionWrong: getById("sessionWrong"),
  sessionRemaining: getById("sessionRemaining"),
  questionNavigator: getById("questionNavigator"),
  jumpInput: getById("jumpInput"),
  jumpBtn: getById("jumpBtn"),

  dataOverview: getById("dataOverview"),
  syncDataBox: getById("syncDataBox"),
  exportBtn: getById("exportBtn"),
  copyBtn: getById("copyBtn"),
  importBtn: getById("importBtn"),
  resetProgressBtn: getById("resetProgressBtn"),
  syncMessage: getById("syncMessage"),
  assetNotesList: getById("assetNotesList"),

  toast: getById("toast"),
};

let state = createDefaultState();
let toastTimer = null;

bootstrap();

async function bootstrap() {
  highlightActivePage();

  try {
    const data = await loadQuestionData();
    applyQuestionData(data);
  } catch (error) {
    console.error(error);
    showBootstrapError(
      window.location.protocol === "file:"
        ? "Không thể tải questions.json khi mở trực tiếp bằng file://. Hãy chạy bằng local server một lần để cache dữ liệu, hoặc mở lại sau khi đã có cache trước đó."
        : "Không thể tải questions.json. Hãy kiểm tra file dữ liệu hoặc cách bạn đang chạy web."
    );
    return;
  }

  state = loadState();
  init();
}

async function loadQuestionData() {
  try {
    const response = await fetch(QUESTIONS_DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Không tải được questions.json (${response.status}).`);
    }

    const data = await response.json();
    validateQuestionData(data);
    cacheQuestionData(data);
    return data;
  } catch (error) {
    const cached = getCachedQuestionData();
    if (cached) {
      return cached;
    }
    throw error;
  }
}

function validateQuestionData(data) {
  if (!data || !Array.isArray(data.sectionConfig) || !Array.isArray(data.assetNotes) || !Array.isArray(data.questions)) {
    throw new Error("Định dạng questions.json không hợp lệ.");
  }
}

function applyQuestionData(data) {
  sectionConfig = data.sectionConfig;
  assetNotes = data.assetNotes;
  questions = data.questions;
  questionsById = Object.fromEntries(questions.map((item) => [item.id, item]));
}

function cacheQuestionData(data) {
  try {
    localStorage.setItem(QUESTIONS_CACHE_KEY, JSON.stringify(data));
  } catch (error) {
    // bo qua neu trinh duyet chan localStorage
  }
}

function getCachedQuestionData() {
  try {
    const cached = JSON.parse(localStorage.getItem(QUESTIONS_CACHE_KEY) || "null");
    validateQuestionData(cached);
    return cached;
  } catch (error) {
    return null;
  }
}

function showBootstrapError(message) {
  document
    .querySelectorAll(".hero-card, .quick-grid, .split-panel, .page-heading, .practice-layout, .stats-grid, .data-layout, .site-footer")
    .forEach((element) => {
      element.classList.add("hidden");
    });

  const errorCard = document.createElement("section");
  errorCard.className = "card";
  errorCard.innerHTML = `<p class="section-label">Lỗi tải dữ liệu</p><h1>Không thể khởi động bộ câu hỏi.</h1><p class="lead-text">${message}</p>`;

  const shell = document.querySelector(".shell");
  const header = document.querySelector(".site-header");

  if (shell && header) {
    shell.insertBefore(errorCard, header.nextSibling);
  } else if (shell) {
    shell.appendChild(errorCard);
  } else {
    alert(message);
  }
}

function init() {
  bindEvents();

  if (currentPage === "practice" && !state.session.questionIds.length) {
    buildSession(null, { notify: false, scroll: false });
    return;
  }

  renderAll();
}

function bindEvents() {
  if (dom.modeSelect) {
    dom.modeSelect.addEventListener("change", () => {
      state.settings.mode = dom.modeSelect.value;
      saveState();
      renderSettings();
    });
  }

  if (dom.countSelect) {
    dom.countSelect.addEventListener("change", () => {
      state.settings.count = dom.countSelect.value === "all" ? "all" : Number(dom.countSelect.value);
      saveState();
      renderSettings();
    });
  }

  if (dom.shuffleToggle) {
    dom.shuffleToggle.addEventListener("change", () => {
      state.settings.shuffle = !!dom.shuffleToggle.checked;
      saveState();
      renderSettings();
    });
  }

  if (dom.buildSessionBtn) {
    dom.buildSessionBtn.addEventListener("click", () => {
      buildSession();
    });
  }

  if (dom.continueSmartBtn) {
    dom.continueSmartBtn.addEventListener("click", () => {
      buildSession({
        mode: "smart",
        count: 10,
        shuffle: true,
      });
    });
  }

  if (dom.prevBtn) {
    dom.prevBtn.addEventListener("click", () => {
      goToQuestion(state.session.currentIndex - 1);
    });
  }

  if (dom.nextBtn) {
    dom.nextBtn.addEventListener("click", () => {
      goToQuestion(state.session.currentIndex + 1);
    });
  }

  if (dom.toggleReviewBtn) {
    dom.toggleReviewBtn.addEventListener("click", () => {
      toggleManualReview();
    });
  }

  if (dom.jumpBtn) {
    dom.jumpBtn.addEventListener("click", jumpToPosition);
  }

  if (dom.jumpInput) {
    dom.jumpInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        jumpToPosition();
      }
    });
  }

  if (dom.exportBtn) {
    dom.exportBtn.addEventListener("click", exportData);
  }

  if (dom.copyBtn) {
    dom.copyBtn.addEventListener("click", copyData);
  }

  if (dom.importBtn) {
    dom.importBtn.addEventListener("click", importData);
  }

  if (dom.resetProgressBtn) {
    dom.resetProgressBtn.addEventListener("click", resetAllProgress);
  }

  if (dom.questionPanel) {
    window.addEventListener("keydown", handleKeyboard);
  }
}

function createDefaultState() {
  return {
    questionStats: {},
    settings: {
      selectedSection: "all",
      mode: "smart",
      count: 20,
      shuffle: true,
    },
    session: {
      questionIds: [],
      answers: {},
      currentIndex: 0,
      createdAt: 0,
    },
  };
}

function createEmptyStat() {
  return {
    attempts: 0,
    correct: 0,
    wrong: 0,
    streak: 0,
    lastResult: null,
    lastAnsweredAt: 0,
    manualReview: false,
  };
}

function normalizeSettings(raw = {}) {
  const validSectionIds = new Set(sectionConfig.map((item) => item.id));
  const validModes = new Set(Object.keys(modeLabels));
  let count = raw.count;

  if (count !== "all") {
    count = Number(count);
  }

  const validCounts = new Set([10, 15, 20, 30, 40, "all"]);

  return {
    selectedSection: validSectionIds.has(raw.selectedSection) ? raw.selectedSection : "all",
    mode: validModes.has(raw.mode) ? raw.mode : "smart",
    count: validCounts.has(count) ? count : 20,
    shuffle: raw.shuffle !== undefined ? !!raw.shuffle : true,
  };
}

function normalizeStats(rawStats = {}) {
  const normalized = {};

  questions.forEach((question) => {
    const source = rawStats[question.id] || rawStats[String(question.id)];
    if (!source) return;

    const correct = Math.max(0, Number(source.correct) || 0);
    const wrong = Math.max(0, Number(source.wrong) || 0);
    const attemptsSource = Math.max(0, Number(source.attempts) || 0);
    const attempts = Math.max(attemptsSource, correct + wrong);

    normalized[question.id] = {
      attempts,
      correct,
      wrong,
      streak: Math.max(0, Number(source.streak) || 0),
      lastResult: source.lastResult === "correct" || source.lastResult === "wrong" ? source.lastResult : null,
      lastAnsweredAt: Math.max(0, Number(source.lastAnsweredAt) || 0),
      manualReview: !!source.manualReview,
    };
  });

  return normalized;
}

function normalizeSession(rawSession = {}) {
  const validIds = new Set(questions.map((item) => item.id));
  const questionIds = Array.isArray(rawSession.questionIds)
    ? rawSession.questionIds.map(Number).filter((id) => validIds.has(id))
    : [];

  const answers = {};
  if (rawSession.answers && typeof rawSession.answers === "object") {
    Object.entries(rawSession.answers).forEach(([id, value]) => {
      const numericId = Number(id);
      if (!validIds.has(numericId) || !questionIds.includes(numericId)) return;
      const selected = String(value.selected || "").toUpperCase();
      if (!ANSWER_ORDER.includes(selected)) return;

      answers[numericId] = {
        selected,
        isCorrect: !!value.isCorrect,
        answeredAt: Math.max(0, Number(value.answeredAt) || 0),
      };
    });
  }

  const maxIndex = Math.max(questionIds.length - 1, 0);
  const currentIndex = Math.min(Math.max(Number(rawSession.currentIndex) || 0, 0), maxIndex);

  return {
    questionIds,
    answers,
    currentIndex,
    createdAt: Math.max(0, Number(rawSession.createdAt) || 0),
  };
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw) return createDefaultState();

    const fresh = createDefaultState();
    fresh.questionStats = normalizeStats(raw.questionStats || {});
    fresh.settings = normalizeSettings(raw.settings || {});
    fresh.session = normalizeSession(raw.session || {});
    return fresh;
  } catch (error) {
    return createDefaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(getPersistedState()));
  } catch (error) {
    // im lặng để tránh làm gián đoạn trải nghiệm trên máy chặn storage
  }
}

function getPersistedState() {
  return {
    version: APP_VERSION,
    questionStats: state.questionStats,
    settings: state.settings,
    session: state.session,
  };
}

function highlightActivePage() {
  dom.navLinks.forEach((link) => {
    const isCurrent = link.dataset.pageLink === currentPage;
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function formatDateTime(timestamp) {
  return timestamp ? new Date(timestamp).toLocaleString("vi-VN") : "chưa có";
}

function truncateText(text, maxLength = 88) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

function getStorageSizeLabel() {
  const size = JSON.stringify(getPersistedState()).length;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

function getSelectedSectionMeta() {
  return sectionConfig.find((item) => item.id === state.settings.selectedSection) || sectionConfig[0];
}

function getStat(questionId) {
  return state.questionStats[questionId] || createEmptyStat();
}

function ensureStat(questionId) {
  if (!state.questionStats[questionId]) {
    state.questionStats[questionId] = createEmptyStat();
  }
  return state.questionStats[questionId];
}

function getAccuracy(stat) {
  return stat.attempts ? stat.correct / stat.attempts : 0;
}

function getQuestionStatus(questionId) {
  const stat = state.questionStats[questionId];
  if (!stat) return "unseen";
  if (stat.manualReview) return "review";
  if (stat.attempts === 0) return "unseen";

  const accuracy = getAccuracy(stat);

  if (stat.lastResult === "wrong" || accuracy < 0.6) {
    return "review";
  }

  if (stat.attempts >= 3 && accuracy >= 0.8 && stat.streak >= 2) {
    return "mastered";
  }

  return "learning";
}

function getPriority(questionId) {
  const stat = state.questionStats[questionId];

  if (!stat) return 1000;
  if (stat.attempts === 0) return stat.manualReview ? 1100 : 1000;

  const accuracy = getAccuracy(stat);
  const daysSince = stat.lastAnsweredAt
    ? Math.max(0, (Date.now() - stat.lastAnsweredAt) / 86400000)
    : 30;

  let score = 0;
  score += Math.round((1 - accuracy) * 220);
  score += Math.min(daysSince * 4, 120);

  if (stat.manualReview) score += 350;
  if (stat.lastResult === "wrong") score += 250;
  if (stat.streak === 0) score += 80;
  if (stat.streak >= 2) score -= 60;

  return score;
}

function getPoolBySection(sectionId = state.settings.selectedSection) {
  if (sectionId === "all") return [...questions];
  return questions.filter((item) => item.sectionId === sectionId);
}

function getRequestedCount(total) {
  if (state.settings.count === "all") return total;
  return Math.min(Number(state.settings.count) || total, total);
}

function getGlobalMetrics() {
  let attempted = 0;
  let totalAttempts = 0;
  let totalCorrect = 0;
  let unseen = 0;
  let learning = 0;
  let review = 0;
  let mastered = 0;

  questions.forEach((question) => {
    const stat = getStat(question.id);
    const status = getQuestionStatus(question.id);

    if (stat.attempts > 0) attempted += 1;
    totalAttempts += stat.attempts;
    totalCorrect += stat.correct;

    if (status === "unseen") unseen += 1;
    if (status === "learning") learning += 1;
    if (status === "review") review += 1;
    if (status === "mastered") mastered += 1;
  });

  return {
    attempted,
    totalAttempts,
    totalCorrect,
    unseen,
    learning,
    review,
    mastered,
    accuracy: totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
  };
}

function getSectionMetrics(sectionId) {
  const pool = getPoolBySection(sectionId);
  let attempted = 0;
  let totalAttempts = 0;
  let totalCorrect = 0;
  let unseen = 0;
  let learning = 0;
  let review = 0;
  let mastered = 0;

  pool.forEach((question) => {
    const stat = getStat(question.id);
    const status = getQuestionStatus(question.id);

    if (stat.attempts > 0) attempted += 1;
    totalAttempts += stat.attempts;
    totalCorrect += stat.correct;

    if (status === "unseen") unseen += 1;
    if (status === "learning") learning += 1;
    if (status === "review") review += 1;
    if (status === "mastered") mastered += 1;
  });

  return {
    total: pool.length,
    attempted,
    totalAttempts,
    totalCorrect,
    unseen,
    learning,
    review,
    mastered,
    accuracy: totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
  };
}

function getSessionMetrics() {
  const total = state.session.questionIds.length;
  const answers = Object.values(state.session.answers);
  const answered = answers.length;
  const correct = answers.filter((item) => item.isCorrect).length;
  const wrong = answered - correct;

  return {
    total,
    answered,
    correct,
    wrong,
    remaining: Math.max(total - answered, 0),
  };
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildSession(customSettings = null, options = {}) {
  const notify = options.notify !== false;
  const shouldScroll = options.scroll !== false;

  state.settings = normalizeSettings({ ...state.settings, ...(customSettings || {}) });

  const pool = getPoolBySection(state.settings.selectedSection);
  let selected = [];
  let usedFallback = false;

  switch (state.settings.mode) {
    case "smart":
      selected = [...pool]
        .map((item) => ({
          item,
          priority: getPriority(item.id),
          tie: Math.random(),
        }))
        .sort((a, b) => (b.priority - a.priority) || (a.tie - b.tie))
        .map((entry) => entry.item);
      break;

    case "all":
      selected = [...pool];
      break;

    default:
      selected = pool.filter((item) => getQuestionStatus(item.id) === state.settings.mode);
      break;
  }

  if (!selected.length) {
    selected = [...pool];
    usedFallback = true;
  }

  const requestedCount = getRequestedCount(selected.length);

  if (state.settings.mode === "smart") {
    selected = selected.slice(0, requestedCount);
    if (state.settings.shuffle) shuffleArray(selected);
  } else {
    if (state.settings.shuffle) shuffleArray(selected);
    selected = selected.slice(0, requestedCount);
  }

  state.session = {
    questionIds: selected.map((item) => item.id),
    answers: {},
    currentIndex: 0,
    createdAt: Date.now(),
  };

  saveState();
  renderAll();
  if (shouldScroll && currentPage === "practice") {
    scrollQuestionIntoView();
  }

  if (notify) {
    showToast(
      usedFallback
        ? `Bộ lọc hiện chưa có câu phù hợp. Mình đã chuyển sang tất cả câu trong phần đã chọn (${state.session.questionIds.length} câu).`
        : `Đã tạo lượt học ${state.session.questionIds.length} câu.`,
      usedFallback ? "info" : "success"
    );
  }
}

function renderAll() {
  renderHomeOverview();
  renderSectionChips();
  renderSettings();
  renderGlobalStats();
  renderSectionSummaryCards(dom.homeSectionOverview);
  renderSectionSummaryCards(dom.statsSectionGrid);
  renderReviewQuestionList();
  renderDataOverview();
  renderAssetNotes();
  renderSessionOverview();
  renderCurrentQuestion();
  renderNavigator();
}

function renderSectionChips() {
  if (!dom.sectionChips) return;

  dom.sectionChips.innerHTML = "";

  sectionConfig.forEach((section) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `chip ${state.settings.selectedSection === section.id ? "active" : ""}`;
    button.innerHTML = `<span>${section.title}</span><small>${section.subtitle}</small>`;
    button.addEventListener("click", () => {
      state.settings.selectedSection = section.id;
      saveState();
      renderSectionChips();
      renderSettings();
    });
    dom.sectionChips.appendChild(button);
  });
}

function renderSettings() {
  if (!dom.modeSelect || !dom.countSelect || !dom.shuffleToggle || !dom.sessionMetaText) {
    return;
  }

  dom.modeSelect.value = state.settings.mode;
  dom.countSelect.value = String(state.settings.count);
  dom.shuffleToggle.checked = !!state.settings.shuffle;

  const section = getSelectedSectionMeta();
  const countLabel =
    state.settings.count === "all" ? "tất cả câu trong phần" : `${state.settings.count} câu`;

  dom.sessionMetaText.textContent =
    `Đang chọn: ${section.title} • ${modeLabels[state.settings.mode]} • ${countLabel} • ` +
    `${state.settings.shuffle ? "có đảo câu" : "giữ nguyên thứ tự"}. ` +
    `Nhấn “Áp dụng & tạo lượt học” để làm mới lượt.`;
}

function renderGlobalStats() {
  const metrics = getGlobalMetrics();

  if (dom.statAttempted) {
    dom.statAttempted.textContent = `${metrics.attempted}/${questions.length}`;
  }
  if (dom.statAttemptedDetail) {
    dom.statAttemptedDetail.textContent = `${metrics.totalAttempts} lượt trả lời`;
  }
  if (dom.statUnseen) {
    dom.statUnseen.textContent = metrics.unseen;
  }
  if (dom.statLearning) {
    dom.statLearning.textContent = metrics.learning;
  }
  if (dom.statReview) {
    dom.statReview.textContent = metrics.review;
  }
  if (dom.statMastered) {
    dom.statMastered.textContent = metrics.mastered;
  }
  if (dom.statAccuracy) {
    dom.statAccuracy.textContent = `${metrics.accuracy}%`;
  }
  if (dom.statAccuracyDetail) {
    dom.statAccuracyDetail.textContent = `${metrics.totalCorrect} câu đúng / ${metrics.totalAttempts} lần trả lời`;
  }
}

function renderHomeOverview() {
  const metrics = getGlobalMetrics();
  const sessionMetrics = getSessionMetrics();

  if (dom.homeAttempted) {
    dom.homeAttempted.textContent = `${metrics.attempted}/${questions.length}`;
  }

  if (dom.homeAccuracy) {
    dom.homeAccuracy.textContent = `${metrics.accuracy}%`;
  }

  if (dom.homeReview) {
    dom.homeReview.textContent = String(metrics.review);
  }

  if (dom.homeSessionSummary) {
    dom.homeSessionSummary.textContent = sessionMetrics.total
      ? `Lượt hiện tại đã trả lời ${sessionMetrics.answered}/${sessionMetrics.total} câu.`
      : "Chưa có lượt học nào được tạo.";
  }

  if (dom.homeSessionMeta) {
    dom.homeSessionMeta.textContent = sessionMetrics.total
      ? `Đúng ${sessionMetrics.correct} • Sai ${sessionMetrics.wrong} • Tạo lúc ${formatDateTime(state.session.createdAt)}.`
      : "Vào trang làm bài để tạo hoặc tiếp tục lượt học.";
  }
}

function renderSectionSummaryCards(container) {
  if (!container) return;

  container.innerHTML = "";

  sectionConfig
    .filter((section) => section.id !== "all")
    .forEach((section) => {
      const metrics = getSectionMetrics(section.id);
      const progress = metrics.total ? Math.round((metrics.attempted / metrics.total) * 100) : 0;
      const card = document.createElement("article");
      card.className = "section-summary-card";
      card.innerHTML = `
        <div class="section-summary-head">
          <div>
            <h3>${section.title}</h3>
            <p>${section.subtitle}</p>
          </div>
          <strong>${metrics.attempted}/${metrics.total}</strong>
        </div>
        <div class="meter"><span style="width: ${progress}%"></span></div>
        <div class="section-tags">
          <span>Chưa học ${metrics.unseen}</span>
          <span>Đang học ${metrics.learning}</span>
          <span>Cần ôn ${metrics.review}</span>
          <span>Đã chắc ${metrics.mastered}</span>
        </div>
        <p class="section-summary-note">Độ chính xác ${metrics.accuracy}%</p>
      `;
      container.appendChild(card);
    });
}

function renderReviewQuestionList() {
  if (!dom.reviewQuestionList) return;

  const reviewQuestions = questions
    .filter((question) => getQuestionStatus(question.id) === "review")
    .sort((left, right) => getPriority(right.id) - getPriority(left.id))
    .slice(0, 12);

  dom.reviewQuestionList.innerHTML = "";

  if (!reviewQuestions.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "Chưa có câu nào đang ở trạng thái cần ôn.";
    dom.reviewQuestionList.appendChild(empty);
    return;
  }

  reviewQuestions.forEach((question) => {
    const stat = getStat(question.id);
    const item = document.createElement("article");
    item.className = "review-item";

    const content = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = `Câu ${question.id}. ${truncateText(question.stem)}`;

    const meta = document.createElement("p");
    meta.textContent = `${question.sectionTitle} • Sai ${stat.wrong} lần • Cập nhật ${formatDateTime(stat.lastAnsweredAt)}`;

    content.appendChild(title);
    content.appendChild(meta);

    const side = document.createElement("div");
    side.className = "review-item-meta";

    const tag = document.createElement("span");
    tag.textContent = stat.manualReview ? "Đã đánh dấu" : "Sai gần đây";

    const accuracy = document.createElement("span");
    accuracy.textContent = stat.attempts ? `${Math.round(getAccuracy(stat) * 100)}% đúng` : "Chưa trả lời";

    side.appendChild(tag);
    side.appendChild(accuracy);

    item.appendChild(content);
    item.appendChild(side);
    dom.reviewQuestionList.appendChild(item);
  });
}

function renderDataOverview() {
  if (!dom.dataOverview) return;

  const metrics = getGlobalMetrics();
  const sessionMetrics = getSessionMetrics();
  const cards = [
    { label: "Đã học", value: `${metrics.attempted}/${questions.length}` },
    { label: "Cần ôn", value: String(metrics.review) },
    { label: "Lượt hiện tại", value: sessionMetrics.total ? `${sessionMetrics.answered}/${sessionMetrics.total}` : "Chưa tạo" },
    { label: "Dung lượng", value: getStorageSizeLabel() },
  ];

  dom.dataOverview.innerHTML = "";

  cards.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "data-point";
    card.innerHTML = `<span>${entry.label}</span><strong>${entry.value}</strong>`;
    dom.dataOverview.appendChild(card);
  });
}

function renderSessionOverview() {
  if (!dom.sessionAnswered || !dom.sessionCorrect || !dom.sessionWrong || !dom.sessionRemaining) {
    return;
  }

  const metrics = getSessionMetrics();

  dom.sessionAnswered.textContent = metrics.answered;
  dom.sessionCorrect.textContent = metrics.correct;
  dom.sessionWrong.textContent = metrics.wrong;
  dom.sessionRemaining.textContent = metrics.remaining;

  if (dom.sessionResultText) {
    dom.sessionResultText.textContent = metrics.answered
      ? `${metrics.correct} đúng • ${metrics.wrong} sai`
      : "Chưa trả lời";
  }

  if (dom.jumpInput) {
    dom.jumpInput.max = metrics.total || 1;
    dom.jumpInput.placeholder = metrics.total ? `1 - ${metrics.total}` : "1";
  }
}

function getCurrentQuestion() {
  if (!state.session.questionIds.length) return null;
  const questionId = state.session.questionIds[state.session.currentIndex];
  return questionsById[questionId] || null;
}

function renderCurrentQuestion() {
  if (!dom.questionTitle || !dom.questionSectionBadge || !dom.questionStatusBadge) {
    return;
  }

  const question = getCurrentQuestion();
  const total = state.session.questionIds.length;

  if (!question) {
    dom.questionSectionBadge.textContent = "Chưa có lượt học";
    dom.questionStatusBadge.className = "badge";
    dom.questionStatusBadge.textContent = "Không có dữ liệu";
    dom.currentIndexLabel.textContent = "0";
    dom.totalCountLabel.textContent = "0";
    dom.sessionProgressBar.style.width = "0%";
    dom.questionTitle.textContent = "Chưa có câu hỏi phù hợp. Hãy tạo lượt học mới.";
    dom.questionCode.className = "question-code hidden";
    dom.questionCode.textContent = "";
    dom.questionImageWrap.classList.add("hidden");
    dom.questionImage.removeAttribute("src");
    dom.questionImageNote.className = "inline-note warning hidden";
    dom.questionImageNote.textContent = "";
    dom.questionNote.className = "inline-note hidden";
    dom.questionNote.textContent = "";
    dom.optionsList.innerHTML = "";
    dom.feedbackBox.className = "feedback-box hidden";
    dom.feedbackBox.textContent = "";
    dom.prevBtn.disabled = true;
    dom.nextBtn.disabled = true;
    dom.toggleReviewBtn.disabled = true;
    return;
  }

  const answerInfo = state.session.answers[question.id];
  const status = getQuestionStatus(question.id);

  dom.questionSectionBadge.className = "badge badge-accent";
  dom.questionSectionBadge.textContent = question.sectionTitle;
  dom.questionStatusBadge.className = `badge status-${status}`;
  dom.questionStatusBadge.textContent = statusLabels[status];

  dom.currentIndexLabel.textContent = String(state.session.currentIndex + 1);
  dom.totalCountLabel.textContent = String(total);
  dom.sessionProgressBar.style.width = `${((state.session.currentIndex + 1) / total) * 100}%`;

  dom.questionTitle.textContent = `Câu ${question.id}. ${question.stem}`;

  if (question.code) {
    dom.questionCode.textContent = question.code;
    dom.questionCode.classList.remove("hidden");
  } else {
    dom.questionCode.textContent = "";
    dom.questionCode.classList.add("hidden");
  }

  if (question.image) {
    dom.questionImage.alt = `Ảnh minh họa câu ${question.id}`;
    dom.questionImage.onerror = () => {
      dom.questionImageWrap.classList.add("hidden");
      dom.questionImageNote.className = "inline-note warning";
      dom.questionImageNote.textContent =
        (question.imageNote ? `${question.imageNote} ` : "") +
        `Không tải được ảnh: ${question.image}`;
    };
    dom.questionImage.src = question.image;
    dom.questionImageWrap.classList.remove("hidden");
  } else {
    dom.questionImageWrap.classList.add("hidden");
    dom.questionImage.removeAttribute("src");
    dom.questionImage.onerror = null;
  }

  if (question.imageNote) {
    dom.questionImageNote.className = "inline-note warning";
    dom.questionImageNote.textContent = question.imageNote;
  } else {
    dom.questionImageNote.className = "inline-note warning hidden";
    dom.questionImageNote.textContent = "";
  }

  if (question.note) {
    dom.questionNote.className = "inline-note";
    dom.questionNote.textContent = question.note;
  } else {
    dom.questionNote.className = "inline-note hidden";
    dom.questionNote.textContent = "";
  }

  dom.optionsList.innerHTML = "";

  ANSWER_ORDER.forEach((key) => {
    if (!(key in question.options)) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";

    const keyNode = document.createElement("span");
    keyNode.className = "option-key";
    keyNode.textContent = key;

    const textNode = document.createElement("span");
    textNode.className = "option-text";
    textNode.textContent = question.options[key];

    button.appendChild(keyNode);
    button.appendChild(textNode);

    if (answerInfo) {
      button.disabled = true;

      if (key === answerInfo.selected) {
        button.classList.add("selected");
      }

      if (key === question.answer) {
        button.classList.add("correct");
      } else if (key === answerInfo.selected && !answerInfo.isCorrect) {
        button.classList.add("wrong");
      }
    } else {
      button.addEventListener("click", () => {
        submitAnswer(question.id, key);
      });
    }

    dom.optionsList.appendChild(button);
  });

  if (answerInfo) {
    const correctText = `${question.answer}. ${question.options[question.answer]}`;
    dom.feedbackBox.className = `feedback-box ${answerInfo.isCorrect ? "success" : "error"}`;
    dom.feedbackBox.textContent = answerInfo.isCorrect
      ? `Chính xác! Đáp án: ${correctText}`
      : `Chưa đúng. Bạn chọn ${answerInfo.selected}. Đáp án đúng: ${correctText}`;
  } else {
    dom.feedbackBox.className = "feedback-box hidden";
    dom.feedbackBox.textContent = "";
  }

  const currentStat = getStat(question.id);
  dom.toggleReviewBtn.disabled = false;
  dom.toggleReviewBtn.textContent = currentStat.manualReview
    ? "Bỏ đánh dấu cần ôn"
    : "Đánh dấu cần ôn";

  dom.prevBtn.disabled = state.session.currentIndex <= 0;
  dom.nextBtn.disabled = state.session.currentIndex >= total - 1;
}

function renderNavigator() {
  if (!dom.questionNavigator) return;

  dom.questionNavigator.innerHTML = "";

  state.session.questionIds.forEach((id, index) => {
    const button = document.createElement("button");
    button.type = "button";

    const answerInfo = state.session.answers[id];
    const status = getQuestionStatus(id);

    let className = "nav-btn";
    if (answerInfo) {
      className += answerInfo.isCorrect ? " answered-correct" : " answered-wrong";
    } else {
      className += ` status-${status}`;
    }
    if (index === state.session.currentIndex) {
      className += " current";
    }

    button.className = className;
    button.textContent = String(id);
    button.title = `Câu ${id} • ${statusLabels[status]}`;
    button.addEventListener("click", () => {
      goToQuestion(index);
    });

    dom.questionNavigator.appendChild(button);
  });
}

function submitAnswer(questionId, selectedKey) {
  if (state.session.answers[questionId]) return;

  const question = questionsById[questionId];
  if (!question) return;

  const isCorrect = selectedKey === question.answer;

  state.session.answers[questionId] = {
    selected: selectedKey,
    isCorrect,
    answeredAt: Date.now(),
  };

  updateQuestionStats(questionId, isCorrect);
  saveState();
  renderGlobalStats();
  renderSessionOverview();
  renderCurrentQuestion();
  renderNavigator();

  showToast(
    isCorrect ? "Chính xác!" : `Chưa đúng • Đáp án ${question.answer}`,
    isCorrect ? "success" : "error"
  );
}

function updateQuestionStats(questionId, isCorrect) {
  const stat = ensureStat(questionId);

  stat.attempts += 1;
  stat.lastAnsweredAt = Date.now();

  if (isCorrect) {
    stat.correct += 1;
    stat.streak += 1;
    stat.lastResult = "correct";

    if (stat.manualReview && stat.streak >= 2) {
      stat.manualReview = false;
    }
  } else {
    stat.wrong += 1;
    stat.streak = 0;
    stat.lastResult = "wrong";
    stat.manualReview = true;
  }
}

function toggleManualReview() {
  const question = getCurrentQuestion();
  if (!question) return;

  const stat = ensureStat(question.id);
  stat.manualReview = !stat.manualReview;

  saveState();
  renderGlobalStats();
  renderCurrentQuestion();
  renderNavigator();

  showToast(
    stat.manualReview
      ? `Đã đánh dấu câu ${question.id} là cần ôn.`
      : `Đã bỏ đánh dấu cần ôn cho câu ${question.id}.`,
    "info"
  );
}

function goToQuestion(index) {
  const total = state.session.questionIds.length;
  if (!total) return;
  if (index < 0 || index >= total) return;

  state.session.currentIndex = index;
  saveState();
  renderSessionOverview();
  renderCurrentQuestion();
  renderNavigator();
  scrollQuestionIntoView();
}

function jumpToPosition() {
  if (!dom.jumpInput) return;

  const total = state.session.questionIds.length;
  if (!total) return;

  const value = Number(dom.jumpInput.value);
  if (!value || value < 1 || value > total) {
    showToast(`Vui lòng nhập vị trí từ 1 đến ${total}.`, "error");
    return;
  }

  goToQuestion(value - 1);
}

function scrollQuestionIntoView() {
  if (window.innerWidth <= 980 && dom.questionPanel) {
    dom.questionPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function handleKeyboard(event) {
  const activeTag = document.activeElement ? document.activeElement.tagName : "";
  const isTypingField = ["INPUT", "TEXTAREA", "SELECT"].includes(activeTag);
  if (isTypingField) return;

  const currentQuestion = getCurrentQuestion();
  if (!currentQuestion) return;

  const key = event.key.toLowerCase();

  if (["a", "b", "c", "d"].includes(key)) {
    event.preventDefault();
    submitAnswer(currentQuestion.id, key.toUpperCase());
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    goToQuestion(state.session.currentIndex + 1);
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    goToQuestion(state.session.currentIndex - 1);
  }
}

function renderAssetNotes() {
  if (!dom.assetNotesList) return;

  dom.assetNotesList.innerHTML = "";

  assetNotes.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `Câu ${item.id}${item.required ? "" : " (tùy chọn)"}: ${item.text}`;
    dom.assetNotesList.appendChild(li);
  });

  const hint = document.createElement("li");
  hint.textContent =
    `Cách thêm ảnh: trong javascript.js, tìm câu tương ứng và thêm thuộc tính image: "images/q55.png" (ví dụ).`;
  dom.assetNotesList.appendChild(hint);
}

function exportData() {
  if (!dom.syncDataBox || !dom.syncMessage) return;

  const payload = {
    app: "TinHoc11-HK2-TracNghiem",
    exportedAt: new Date().toISOString(),
    ...getPersistedState(),
  };

  dom.syncDataBox.value = JSON.stringify(payload, null, 2);
  dom.syncMessage.textContent = `Đã tạo dữ liệu xuất lúc ${new Date().toLocaleString("vi-VN")}.`;
  showToast("Đã tạo dữ liệu xuất.", "success");
}

async function copyData() {
  if (!dom.syncDataBox || !dom.syncMessage) return;

  if (!dom.syncDataBox.value.trim()) {
    exportData();
  }

  const text = dom.syncDataBox.value;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      dom.syncDataBox.focus();
      dom.syncDataBox.select();
      dom.syncDataBox.setSelectionRange(0, dom.syncDataBox.value.length);
      const copied = document.execCommand("copy");
      if (!copied) {
        throw new Error("copy_failed");
      }
    }

    dom.syncMessage.textContent = "Đã copy dữ liệu vào clipboard.";
    showToast("Đã copy dữ liệu.", "success");
  } catch (error) {
    dom.syncDataBox.focus();
    dom.syncDataBox.select();
    dom.syncDataBox.setSelectionRange(0, dom.syncDataBox.value.length);
    showToast("Không thể copy tự động. Đoạn JSON đã được bôi chọn để bạn copy thủ công.", "info");
  }
}

function importData() {
  if (!dom.syncDataBox || !dom.syncMessage) return;

  const raw = dom.syncDataBox.value.trim();

  if (!raw) {
    showToast("Bạn chưa dán dữ liệu để nhập.", "error");
    return;
  }

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    showToast("Dữ liệu không phải JSON hợp lệ.", "error");
    return;
  }

  const statsSource = parsed.questionStats || parsed;
  const normalizedStats = normalizeStats(statsSource);
  const normalizedSettings = normalizeSettings(parsed.settings || state.settings);
  const normalizedSession = normalizeSession(parsed.session || {});

  if (!confirm("Nhập dữ liệu sẽ ghi đè tiến trình hiện tại. Tiếp tục?")) {
    return;
  }

  state.questionStats = normalizedStats;
  state.settings = normalizedSettings;
  state.session = normalizedSession;

  saveState();

  if (currentPage === "practice" && !state.session.questionIds.length) {
    buildSession(null, { notify: false, scroll: false });
  } else {
    renderAll();
  }

  dom.syncMessage.textContent = `Đã nhập dữ liệu thành công lúc ${new Date().toLocaleString("vi-VN")}.`;
  showToast("Đã nhập dữ liệu thành công.", "success");
}

function resetAllProgress() {
  if (!confirm("Bạn chắc chắn muốn xóa toàn bộ tiến trình và lượt học hiện tại?")) {
    return;
  }

  state = createDefaultState();

  if (dom.syncDataBox) {
    dom.syncDataBox.value = "";
  }

  if (dom.syncMessage) {
    dom.syncMessage.textContent = "Đã xóa toàn bộ tiến trình.";
  }

  if (currentPage === "practice") {
    buildSession(null, { notify: false, scroll: false });
  } else {
    saveState();
    renderAll();
  }

  showToast("Đã xóa toàn bộ tiến trình.", "success");
}

function showToast(message, type = "info") {
  if (!dom.toast) return;

  clearTimeout(toastTimer);

  dom.toast.textContent = message;
  dom.toast.className = `toast ${type}`;

  toastTimer = setTimeout(() => {
    dom.toast.classList.add("hidden");
  }, 2400);
}