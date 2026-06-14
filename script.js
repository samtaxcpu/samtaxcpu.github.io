const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    navLinks.classList.remove("open");
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
const projectDotsContainer = document.getElementById("projectDots");

const autoAdvanceDelay = 5000;

let currentProjectPage = 0;
let autoAdvanceTimer = null;
let projectsPerPage = getProjectsPerPage();
let totalProjectPages = getTotalProjectPages();

function getProjectsPerPage() {
  if (window.innerWidth <= 720) {
    return 1;
  }

  return 3;
}

function getTotalProjectPages() {
  return Math.ceil(projectCards.length / projectsPerPage);
}

function buildProjectDots() {
  if (!projectDotsContainer) return;

  projectDotsContainer.innerHTML = "";

  for (let i = 0; i < totalProjectPages; i++) {
    const dot = document.createElement("button");

    dot.classList.add("carousel-dot");
    dot.setAttribute("aria-label", `Show project page ${i + 1}`);

    dot.addEventListener("click", () => {
      showProjectPage(i);
      resetAutoAdvanceTimer();
    });

    projectDotsContainer.appendChild(dot);
  }
}

function updateProjectDots() {
  if (!projectDotsContainer) return;

  const dots = Array.from(projectDotsContainer.querySelectorAll(".carousel-dot"));

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentProjectPage);
  });
}

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

  updateProjectDots();
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

function refreshCarouselForScreenSize() {
  const firstVisibleProjectIndex = currentProjectPage * projectsPerPage;

  projectsPerPage = getProjectsPerPage();
  totalProjectPages = getTotalProjectPages();

  currentProjectPage = Math.floor(firstVisibleProjectIndex / projectsPerPage);

  if (currentProjectPage >= totalProjectPages) {
    currentProjectPage = 0;
  }

  buildProjectDots();
  showProjectPage(currentProjectPage);
}

if (projectCards.length) {
  buildProjectDots();
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

window.addEventListener("resize", () => {
  refreshCarouselForScreenSize();
  resetAutoAdvanceTimer();
});