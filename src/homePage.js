import { hideSections } from "./utils.js";
let homePage = document.querySelector(".home-page");

export function showHomePage() {
  hideSections();
  homePage.style.display = "flex";
  document.querySelector("main").innerHTML = homePage;
}
