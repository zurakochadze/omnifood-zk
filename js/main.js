"use strict";

/////////////////////////////////////////////////
// MOBILE NAVIGATION
/////////////////////////////////////////////////
const btnNav = document.querySelector(".btn__mobile--nav");
const header = document.querySelector(".header");

btnNav.addEventListener("click", () => header.classList.toggle("nav__open"));

/////////////////////////////////////////////////
// SMOOTH SCROLL
/////////////////////////////////////////////////
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const href = link.getAttribute("href");
    console.log(href);

    // 1) Scroll back to the top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // 2) Scroll to the other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // 3) Close mobile nav
    if (link.classList.contains("main__nav--link"))
      header.classList.toggle("nav__open");
  });
});

/////////////////////////////////////////////////
// STICKY NAV
/////////////////////////////////////////////////
const sectionHero = document.querySelector(".section__hero");

const headerObs = new IntersectionObserver(
  (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting) {
      document.body.classList.add("sticky");
    }

    if (entry.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "90px",
  }
);

headerObs.observe(sectionHero);

/////////////////////////////////////////////////
// REVEALING ELEMENTS ON SCROLL
/////////////////////////////////////////////////
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObs.observe(section);
  section.classList.add("section--hidden");
});

/////////////////////////////////////////////////
// PRICING BUTTON TOGGLE
/////////////////////////////////////////////////

const monthlyBtn = document.getElementById("monthlyBtn");
const yearlyBtn = document.getElementById("yearlyBtn");
const starterPlan = document.getElementById("starterPlan");
const completePlan = document.getElementById("completePlan");

monthlyBtn.addEventListener("click", () => {
  // Update pricing plan content for Monthly
  starterPlan.querySelector(".plan__name").textContent = "Starter";
  starterPlan.querySelector(".plan__price").textContent = "$399";
  starterPlan.querySelector(".plan__text").textContent =
    "per month. That's just $13 per meal!";

  completePlan.querySelector(".plan__name").textContent = "Complete";
  completePlan.querySelector(".plan__price").textContent = "$649";
  completePlan.querySelector(".plan__text").textContent =
    "per month. That's just $11 per meal!";

  // Toggle button styles
  monthlyBtn.classList.add("plan__toggle--btn-active");
  yearlyBtn.classList.remove("plan__toggle--btn-active");
});

yearlyBtn.addEventListener("click", () => {
  // Update pricing plan content for Yearly
  starterPlan.querySelector(".plan__name").textContent = "Starter";
  starterPlan.querySelector(".plan__price").textContent = "$4300";
  starterPlan.querySelector(".plan__text").textContent =
    "per year. That's just $9 per meal!";

  completePlan.querySelector(".plan__name").textContent = "Complete";
  completePlan.querySelector(".plan__price").textContent = "$7500";
  completePlan.querySelector(".plan__text").textContent =
    "per year. That's just $7 per meal!";

  // Toggle button styles
  yearlyBtn.classList.add("plan__toggle--btn-active");
  monthlyBtn.classList.remove("plan__toggle--btn-active");
});

/////////////////////////////////////////////////
// ACCORDEON - FAQ
////////////////////////////////////////////////
const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((faqItem) => {
  const faqTrigger = faqItem.querySelector(".faq__item-trigger");
  const faqButton = faqItem.querySelector(".faq__item-btn-arrow");
  const faqAnswer = faqItem.querySelector(".faq__item-answer");

  faqTrigger.addEventListener("click", () => {
    const isOpen = faqItem.classList.contains("faq__item-open");

    // Toggle open/closed state and button rotation
    faqItem.classList.toggle("faq__item-open");
    faqButton.classList.toggle("rotate-up", !isOpen);

    // Update visibility and max-height for the answer content
    if (isOpen) {
      faqAnswer.style.maxHeight = "0";
      faqAnswer.style.visibility = "hidden";
    } else {
      faqAnswer.style.maxHeight = "1000px";
      faqAnswer.style.visibility = "visible";
    }
  });
});
