const createNavLiks = (isLogged, wrapperId) => {
  let wrapper = document.getElementById(wrapperId);
  let navItems = [];
  if (isLogged) {
    let postButton = document.createElement("a");
    postButton.classList.add(..."btn btn-outline-primary".split(" "));
    postButton.textContent = "Create post";
    postButton.setAttribute("href", "createPost.html");

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
  //console.log(navItems);
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

const createPostCard = (postObject) => {
  let { content, date, image, reactions, tags, title, key } = postObject;

  let sumaReacciones = postObject.reactions.reduce(
    (total, reaccion) => total + reaccion.quantity,
    0
  );

  let divCard = document.createElement("div");
  divCard.classList.add(..."card card__post w-100 mb-4".split(" "));

  let postImageLink = document.createElement("a");
  postImageLink.classList.add("text-decoration-none");
  postImageLink.setAttribute("href", `post-detail.html?postKey=${key}`);

  let postImage = document.createElement("img");
  postImage.setAttribute("src", image);
  postImage.classList.add(..."card-img-top post-picture".split(" "));

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let postInfoWrapper = document.createElement("div");
  postInfoWrapper.classList.add(..."user__wrapper d-flex".split(" "));

  let userWrapperImage = document.createElement("div");
  userWrapperImage.classList.add(..."user__wrapper--image".split(" "));

  let creatorImage = document.createElement("img");
  creatorImage.classList.add("rounded-circle");
  creatorImage.setAttribute("src", "img/profile.jpg");

  let userWrapperInfo = document.createElement("div");
  userWrapperInfo.classList.add(
    ..."user__wrapper--info d-flex flex-column".split(" ")
  );

  let creatorUser = document.createElement("a");
  creatorUser.textContent = "Arturo Juarez";

  let creationDate = document.createElement("a");
  creationDate.textContent = date;

  let postTitle = document.createElement("a");
  postTitle.setAttribute("href", `post-detail.html?postKey=${key}`);
  postTitle.textContent = title;
  postTitle.classList.add("fs-5");

  let tagsWrapper = document.createElement("div");
  tagsWrapper.classList.add(..."tendecys d-flex gap-2".split(" "));
  tags.forEach((tag) => {
    let tagItem = document.createElement("button");
    tagItem.classList.add(..."btn btn-trend btn-sm".split(" "));
    tagItem.textContent = `# ${tag}`;
    tagsWrapper.append(tagItem);
  });

  let reactionsCommentsWrapper = document.createElement("div");
  reactionsCommentsWrapper.classList.add(
    ..."reactions__wrapper mt-2 d-flex mb-3 w-100 gap-3".split(" ")
  );

  let reactionsWrapper = document.createElement("div");
  reactionsWrapper.classList.add(
    ..."ractions__wrapper--reaction d-flex align-items-center".split(" ")
  );

  let iconLike = document.createElement("img");
  let iconUnicorn = document.createElement("img");
  let iconExploading = document.createElement("img");
  let iconRaised = document.createElement("img");
  let iconFire = document.createElement("img");
  let reactionsNumber = document.createElement("a");
  reactionsNumber.classList.add("text-decoration-none");
  reactionsNumber.textContent = `${sumaReacciones} reactions`;

  iconLike.setAttribute("src", "img/like.svg");
  iconUnicorn.setAttribute("src", "img/unicorn.svg");
  iconExploading.setAttribute("src", "img/exploding-head.svg");
  iconRaised.setAttribute("src", "img/raised-hands.svg");
  iconFire.setAttribute("src", "img/fire.svg");

  reactionsWrapper.append(
    iconLike,
    iconUnicorn,
    iconExploading,
    iconRaised,
    iconFire,
    reactionsNumber
  );

  let commentsWrapper = document.createElement("div");
  commentsWrapper.classList.add(..."ractions__wrapper--comments".split(" "));
  let iconComments = document.createElement("img");
  iconComments.setAttribute("src", "img/comments.svg");
  let commentsNumber = document.createElement("a");
  commentsNumber.classList.add("text-decoration-none");
  commentsNumber.textContent = `${sumaReacciones} reactions`;

  commentsWrapper.append(iconComments, commentsNumber);

  reactionsCommentsWrapper.append(reactionsWrapper, commentsWrapper);

  userWrapperImage.append(creatorImage);
  userWrapperInfo.append(
    creatorUser,
    creationDate,
    postTitle,
    tagsWrapper,
    reactionsCommentsWrapper
  );
  postInfoWrapper.append(userWrapperImage, userWrapperInfo);
  cardBody.append(postInfoWrapper);
  postImageLink.append(postImage);
  divCard.append(postImageLink, cardBody);

  console.log(postObject);
  return divCard;
};

const createDiscussCard = (tag) => {
  let divCard = document.createElement("div");
  divCard.classList.add(..."card w-100 mt-3".split(" "));

  let cardList = document.createElement("ul");
  cardList.classList.add(..."list-group list-group-flush".split(" "));
  cardList.setAttribute("id", `discuss-${tag}`);

  let itemTitle = document.createElement("li");
  itemTitle.classList.add(..."list-group-item list__item--title".split(" "));

  let title = document.createElement("h5");
  title.textContent = `#${tag}`;

  let text = document.createElement("p");
  text.textContent = "Discussion threads targeting the whole community";

  itemTitle.append(title, text);
  cardList.append(itemTitle);
  divCard.append(cardList);
  //console.log(divCard);
  return divCard;
};

const createPostDiscussion = (postObject) => {
  let { key, title } = postObject;

  let itemPost = document.createElement("li");
  itemPost.classList.add(
    ..."list-group-item list__item--post d-flex flex-column".split(" ")
  );

  let titleContainer = document.createElement("a");
  titleContainer.setAttribute("href", `post-detail.html?postKey=${key}`);
  titleContainer.textContent = title;

  let comments = document.createElement("a");
  comments.textContent = "20 comments";

  itemPost.append(titleContainer, comments);
  return itemPost;
};

const createComment = (comment) => {
  let { content, user, image, date } = comment;
  let divCol = document.createElement("div");
  divCol.classList.add("col-sm-12");

  let divContainer = document.createElement("div");
  divContainer.classList.add(..."row ms-3 mt-3".split(" "));

  let colImage = document.createElement("div");
  colImage.classList.add(..."col-sm-1".split(" "));

  let userImage = document.createElement("img");
  userImage.classList.add("rounded-circle");
  userImage.setAttribute("src", image);
  userImage.setAttribute("width", "36px");

  let colComment = document.createElement("div");
  colComment.classList.add(..."col-sm-11".split(" "));

  let card = document.createElement("div");
  card.classList.add(..."card w-100".split(" "));

  let cardBody = document.createElement("div");
  cardBody.classList.add(..."card-body".split(" "));

  let userName = document.createElement("h6");
  userName.classList.add(..."mb-2 fw-normal text-dark".split(" "));
  userName.textContent = user;

  let commentDate = document.createElement("span");
  commentDate.classList.add("fw-light");
  commentDate.textContent = ` • ${date}`;

  let commentContainer = document.createElement("p");
  commentContainer.textContent = content;

  userName.append(commentDate);
  cardBody.append(userName, commentContainer);
  card.append(cardBody);
  colComment.append(card);
  colImage.append(userImage);
  divContainer.append(colImage, colComment);
  divCol.append(divContainer);

  return divCol;
};

export {
  createNavLiks,
  createCardIsLogged,
  createPostCard,
  createDiscussCard,
  createPostDiscussion,
  createComment,
};
