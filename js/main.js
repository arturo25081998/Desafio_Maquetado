import { isLogged } from "./modules/utils.js";
import {
  createNavLiks,
  createCardIsLogged,
  createPostCard,
  createDiscussCard,
  createPostDiscussion,
} from "./modules/domElements.js";
import { getAllPosts } from "./modules/apiPosts.js";

let alredyLogged = isLogged();
let filterButtons = document.querySelectorAll(".button-filter");
let postsArray = await getAllPosts();
let inputSearch = document.getElementById("search-by-title");
let tagsToDiscuss = ["css", "javascript", "html"];

const addPostCards = (cardsWrapperId, postsArray) => {
  let cardsWrapper = document.getElementById(cardsWrapperId);
  while (cardsWrapper.firstChild) {
    cardsWrapper.removeChild(cardsWrapper.firstChild);
  }
  postsArray.forEach((post) => {
    let postCard = createPostCard(post);
    cardsWrapper.append(postCard);
  });
};

inputSearch.addEventListener("keyup", (event) => {
  let value = event.target.value.toLowerCase();
  let result = postsArray.filter((post) =>
    post.title.toLowerCase().includes(value)
  );
  addPostCards("posts-wrapper", result);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    switch (button.id) {
      case "relevant":
        let relevant = postsArray.filter((post) => post.relevant === true);
        addPostCards("posts-wrapper", relevant);
        break;
      case "top":
        let top = postsArray.map((post) => {
          let sumaReacciones = post.reactions.reduce(
            (total, reaccion) => total + reaccion.quantity,
            0
          );
          return {
            ...post,
            totalReactions: sumaReacciones,
          };
        });
        top = top.filter((post) => post.totalReactions > 250);
        top = top.sort((a, b) => b.totalReactions - a.totalReactions);
        addPostCards("posts-wrapper", top);
        break;
      case "latest":
        let latest = postsArray.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        addPostCards("posts-wrapper", latest);
        break;
    }
  });
});

const createDiscussCards = (wrapperId, tags) => {
  let cardsWrapper = document.getElementById(wrapperId);
  while (cardsWrapper.firstChild) {
    cardsWrapper.removeChild(cardsWrapper.firstChild);
  }
  tags.forEach((tag) => {
    let discussCard = createDiscussCard(tag);
    cardsWrapper.append(discussCard);
    let listWrapperTag = document.getElementById(`discuss-${tag}`);
    let postsWithTag = postsArray.filter((post) => post.tags.includes(tag));
    postsWithTag = postsWithTag.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    //console.log(postsWithTag);
    postsWithTag = postsWithTag.slice(0, 5);
    postsWithTag.forEach((post) => {
      let discussionPost = createPostDiscussion(post);
      listWrapperTag.append(discussionPost);
    });
  });
};

createDiscussCards("discussion-tags", tagsToDiscuss);
addPostCards("posts-wrapper", postsArray);
createNavLiks(alredyLogged, "nav-links-wrapper");
createCardIsLogged(alredyLogged, "login-Card-Wrapper");
