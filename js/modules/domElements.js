const createNavLiks = (isLogged, wrapperId) => {
  let wrapper = document.getElementById(wrapperId);
  let navItems = [];
  if (isLogged) {
    let postButton = document.createElement("a");
    postButton.classList.add(..."btn btn-outline-primary".split(" "));
    postButton.textContent = "Create post";

    let notificationButton = document.createElement("a");
    notificationButton.classList.add(
      ..."btn btn-light btn__special bg-white".split(" ")
    );
    notificationButton.textContent = "Notification";

    let logOutButton = document.createElement("button");
    logOutButton.classList.add(..."btn btn-outline-danger".split(" "));
    logOutButton.textContent = "Log Out";
    logOutButton.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "index.html";
    });

    let userPicture = document.createElement("img");
    userPicture.setAttribute("src", "img/profile.jpg");
    userPicture.classList.add("img-profile", "rounded-circle");
    navItems.push(notificationButton, postButton, logOutButton, userPicture);
  } else {
    let loginButton = document.createElement("a");
    loginButton.classList.add(..."btn btn__special".split(" "));
    loginButton.textContent = "Login";
    loginButton.setAttribute("href", "enter.html");

    let createAccountButton = document.createElement("a");
    createAccountButton.classList.add(..."btn btn-outline-primary".split(" "));
    createAccountButton.textContent = "Create Acount";
    createAccountButton.setAttribute("href", "enter.html");
    navItems.push(loginButton, createAccountButton);
  }
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }
  console.log(navItems);

  navItems.forEach((item) => {
    wrapper.append(item);
  });
};

const createCardIsLogged = (isLogged, wrapperId) => {
  let wrapper = document.getElementById(wrapperId);
  while (wrapper.firstChild) {
    wrapper.removeChild(wrapper.firstChild);
  }
  if (!isLogged) {
    let card = document.createElement("div");
    card.classList.add(..."card w-100 mb-2".split(" "));

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let cardTitle = document.createElement("h6");
    cardTitle.classList.add(..."fw-bold fs-9".split(" "));
    cardTitle.textContent =
      "DEV Community is a community of 1,679,531 amazing developers";

    let cardText = document.createElement("p");
    cardText.classList.add(
      ..."fs-8 lh-sm fw-lighter text-body-secondary mb-3".split(" ")
    );
    cardText.textContent =
      "We're a place where coders share, stay up-to-date and grow their careers.";

    let createAccountButton = document.createElement("a");
    createAccountButton.classList.add(
      ..."btn btn-outline-primary w-100 mb-1".split(" ")
    );
    createAccountButton.textContent = "Create Acount";
    createAccountButton.setAttribute("href", "enter.html");

    let loginButton = document.createElement("a");
    loginButton.classList.add(..."btn btn__special w-100".split(" "));
    loginButton.textContent = "Login";
    loginButton.setAttribute("href", "enter.html");
    cardBody.append(cardTitle, cardText, createAccountButton, loginButton);
    card.append(cardBody);
    wrapper.append(card);
  }
};

export { createNavLiks, createCardIsLogged };
