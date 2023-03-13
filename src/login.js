import { get } from "./data/api.js";
import { showHomePage } from "./homePage.js";
import {
  checkUserState,
  hideSections,
  showNotification,
  toggleLoading,
} from "./utils.js";
let loginPage = document.querySelector(".login-page");

export function showLoginPage() {
  hideSections();
  loginPage.style.display = "block";
  document.querySelector("main").replaceChildren(loginPage);
  let form = document.querySelector("#login-form");
  form.addEventListener("submit", loginUser);
}

async function loginUser(e) {
  e.preventDefault();
  toggleLoading(true, "Signing you in...");
  let formData = new FormData(e.target);
  let { email, password } = Object.fromEntries(formData.entries());
  if (email == "" || password == "") {
    return showNotification("All fields are required!", "red");
  }
  let users = await get("/chatApp/users");
  let user = null;
  let userId = null;
  for (const [userIdd, userInfo] of Object.entries(users)) {
    if (userInfo.email === email && userInfo.password === password) {
      user = userInfo;
      userId = userIdd;
    }
  }
  toggleLoading(false);
  if (user != null) {
    localStorage.setItem(
      "userData",
      JSON.stringify({
        email: user.email,
        username: user.username,
        password: user.password,
        id: userId,
      })
    );
    checkUserState();
    showHomePage();
  } else {
    showNotification("Invalid username or password!", "red");
  }
}
