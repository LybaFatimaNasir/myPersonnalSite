// ===== Terminal "test run" sequence =====
const assertions = [
  { text: "4+ years of experience in QA &amp; test automation", status: "pass" },
  { text: "API testing — Postman, Bruno, SQL", status: "pass" },
  { text: "CI/CD — Jenkins, Azure DevOps, JIRA", status: "pass" },
  { text: "ISTQB CTFL v4.0 certified — 85%", status: "pass" },
  { text: "Playwright automation", status: "progress" }
];

const outputEl = document.getElementById("typedOutput");
const summaryEl = document.getElementById("termSummary");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderLine(item){
  const div = document.createElement("div");
  div.className = "line";
  const icon = item.status === "pass"
    ? '<span class="check">✓</span>'
    : '<span class="pending-icon">⧗</span>';
  div.innerHTML = `${icon}${item.text}`;
  return div;
}

function runSequence(){
  if(reduceMotion){
    assertions.forEach(a => outputEl.appendChild(renderLine(a)));
    showSummary();
    return;
  }
  let i = 0;
  function next(){
    if(i >= assertions.length){ showSummary(); return; }
    const line = renderLine(assertions[i]);
    line.style.animationDelay = "0s";
    outputEl.appendChild(line);
    i++;
    setTimeout(next, 420);
  }
  next();
}

function showSummary(){
  const passed = assertions.filter(a => a.status === "pass").length;
  const inProgress = assertions.filter(a => a.status === "progress").length;
  summaryEl.innerHTML = `<span class="pass-count">${passed} passed</span> · <span class="prog-count">${inProgress} in progress</span> · career.spec.js`;
}

runSequence();

// ===== Nav toggle (mobile) =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(".section, .hero");

if("IntersectionObserver" in window){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(el => observer.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add("is-visible"));
}
