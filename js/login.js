let userData = {};
let userInfo = document.querySelectorAll(".user-info");
let logginButton = document.getElementById("loggin-button");

userInfo.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    let property = event.target.name;
    let id = event.target.id;
    let input = document.getElementById(id);
    let inputValue = event.target.value;
    if (inputValue == "") {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
    userData[property] = inputValue;
    // console.log(userData);
  });
});

logginButton.addEventListener("click", () => {
  if (
    userData.email === undefined ||
    userData.password === undefined ||
    userData.email === "" ||
    userData.password === ""
  ) {
    alert("Faltan campos por llenar");
  } else {
    let token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    localStorage.setItem("token", token);
    window.location.href = "index.html";
  }
});
