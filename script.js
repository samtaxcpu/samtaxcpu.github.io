const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

const placeholderLinks = document.querySelectorAll(".placeholder-link");

placeholderLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (href === "#") {
      event.preventDefault();
      alert("This page is a placeholder for now. Build this section later.");
    }
  });
});

/* Featured Projects Carousel */

const projectCards = Array.from(document.querySelectorAll(".featured-project-card"));
const projectPrev = document.getElementById("projectPrev");
const projectNext = document.getElementById("projectNext");
const projectDots = Array.from(document.querySelectorAll("#projectDots .carousel-dot"));

const projectsPerPage = 3;
const autoAdvanceDelay = 5000;

let currentProjectPage = 0;
let autoAdvanceTimer = null;

const totalProjectPages = Math.ceil(projectCards.length / projectsPerPage);

function showProjectPage(pageIndex) {
  if (!projectCards.length) return;

  if (pageIndex < 0) {
    currentProjectPage = totalProjectPages - 1;
  } else if (pageIndex >= totalProjectPages) {
    currentProjectPage = 0;
  } else {
    currentProjectPage = pageIndex;
  }

  const startIndex = currentProjectPage * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  projectCards.forEach((card, index) => {
    const shouldShow = index >= startIndex && index < endIndex;

    if (shouldShow) {
      card.classList.remove("is-hidden");
    } else {
      card.classList.add("is-hidden");
    }
  });

  projectDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentProjectPage);
  });
}

function goToNextProjectPage() {
  showProjectPage(currentProjectPage + 1);
}

function goToPreviousProjectPage() {
  showProjectPage(currentProjectPage - 1);
}

function resetAutoAdvanceTimer() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
  }

  autoAdvanceTimer = setTimeout(() => {
    goToNextProjectPage();
    resetAutoAdvanceTimer();
  }, autoAdvanceDelay);
}

if (projectCards.length) {
  showProjectPage(0);
  resetAutoAdvanceTimer();
}

if (projectNext) {
  projectNext.addEventListener("click", () => {
    goToNextProjectPage();
    resetAutoAdvanceTimer();
  });
}

if (projectPrev) {
  projectPrev.addEventListener("click", () => {
    goToPreviousProjectPage();
    resetAutoAdvanceTimer();
  });
}

projectDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showProjectPage(index);
    resetAutoAdvanceTimer();
  });
});