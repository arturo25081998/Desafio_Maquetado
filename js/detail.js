import {
  isLogged,
  evaluateInput,
  getRandomUser,
  getRandomDate,
} from "./modules/utils.js";
import {
  createNavLiks,
  createComment,
  createPostDiscussion,
  createDiscussCard,
} from "./modules/domElements.js";
import {
  getPostByKey,
  uploadComment,
  getAllComments,
  getAllPosts,
} from "./modules/apiPosts.js";

let users = [
  {
    name: "Ana",
    location: "Madrid, España",
    education: "Universidad Autónoma de Madrid",
    image: "https://randomuser.me/api/portraits/men/74.jpg",
  },
  {
    name: "Pedro",
    location: "Santiago, Chile",
    education: "Pontificia Universidad Católica de Chile",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
  },
  {
    name: "María",
    location: "Bogotá, Colombia",
    education: "Universidad de los Andes",
    image: "https://randomuser.me/api/portraits/women/95.jpg",
  },
  {
    name: "Juan",
    location: "Ciudad de México, México",
    education: "Universidad Nacional Autónoma de México",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sofía",
    location: "Lima, Perú",
    education: "Universidad Peruana Cayetano Heredia",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    name: "Carlos",
    location: "Barcelona, España",
    education: "Universitat de Barcelona",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Laura",
    location: "São Paulo, Brasil",
    education: "Universidade de São Paulo",
    image: "https://randomuser.me/api/portraits/men/66.jpg",
  },
  {
    name: "Diego",
    location: "Medellín, Colombia",
    education: "Universidad EAFIT",
    image: "https://randomuser.me/api/portraits/women/61.jpg",
  },
  {
    name: "Valentina",
    location: "Caracas, Venezuela",
    education: "Universidad Central de Venezuela",
    image: "https://randomuser.me/api/portraits/women/59.jpg",
  },
  {
    name: "Andrés",
    location: "Quito, Ecuador",
    education: "Universidad San Francisco de Quito",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    name: "Gabriela",
    location: "Lisboa, Portugal",
    education: "Universidade de Lisboa",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "Miguel",
    location: "Buenos Aires, Argentina",
    education: "Universidad de Buenos Aires",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    name: "Paula",
    location: "Roma, Italia",
    education: "Università degli Studi di Roma La Sapienza",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Jorge",
    location: "Ciudad de Guatemala, Guatemala",
    education: "Universidad de San Carlos de Guatemala",
    image: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    name: "Fernanda",
    location: "Montevideo, Uruguay",
    education: "Universidad de la República",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "Manuel",
    location: "San Juan, Puerto Rico",
    education: "Universidad de Puerto Rico",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Isabela",
    location: "San José, Costa Rica",
    education: "Universidad de Costa Rica",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    name: "Camila",
    location: "Panamá, Panamá",
    education: "Universidad de Panamá",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "José",
    location: "Asunción, Paraguay",
    education: "Universidad Nacional de Asunción",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Luis",
    location: "Tegucigalpa, Honduras",
    education: "Universidad Nacional Autónoma de Honduras",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];
let alredyLogged = isLogged();
let url = window.location.href;
let urlObject = new URL(url);
let params = new URLSearchParams(urlObject.search);
let postKey = params.get("postKey");
let uploadCommentButton = document.getElementById("button-upload-comment");
let commentInput = document.getElementById("comment-info");
let tagsToDiscuss = ["css", "javascript", "html"];
let postsArray = await getAllPosts();
let commentData = {};

commentInput.addEventListener("keyup", (event) => {
  //alert("hola");
  //let property = event.target.name;
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
  commentData["content"] = inputValue;
});

uploadCommentButton.addEventListener("click", async () => {
  if (evaluateInput(commentData.content)) {
    let user = getRandomUser(users);
    let actualDate = new Date();
    commentData["user"] = user.name;
    commentData["image"] = user.image;
    commentData["date"] = getRandomDate();
    if (alredyLogged) {
      //alert("esta enviando el comentario");
      let response = await uploadComment(commentData, postKey);
      if (response !== null) {
        printComments("comments-wrapper");
        commentInput.value = null;
        commentInput.classList.remove("is-valid");
        commentData["content"] = "";
      }
    } else {
      alert("Necesitas iniciar sesion para comentar.");
    }

    //console.log(response);
  }
});

const printPostDetails = async () => {
  let postData = await getPostByKey(postKey);
  let { content, title, reactions, image, tags, date } = postData;
  let tagsWrapper = document.getElementById("tags-wrapper");
  let totalReactions = 0;

  date = new Date(date);
  let options = { month: "short", day: "numeric", year: "numeric" };
  let resetDate = Intl.DateTimeFormat("en-US", options).format(date);

  document.getElementById("post-image").setAttribute("src", image);
  document.getElementById("post-title").textContent = title;
  document.getElementById("post-content").textContent = content;
  document.getElementById("post-date").textContent = resetDate;

  while (tagsWrapper.firstChild) {
    tagsWrapper.removeChild(tagsWrapper.firstChild);
  }
  tags.forEach((tag) => {
    let tagButton = document.createElement("button");
    tagButton.textContent = `# ${tag}`;
    tagButton.classList.add("btn", "btn-trend", "btn-sm", "fs-6");
    tagsWrapper.append(tagButton);
  });

  reactions.forEach((reaction) => {
    totalReactions = totalReactions + parseInt(reaction.quantity);
    switch (reaction.reaction) {
      case "like":
        document.getElementById("like-reaction").textContent =
          reaction.quantity;
        break;
      case "unicorn":
        document.getElementById("unicorn-reaction").textContent =
          reaction.quantity;
        break;
      case "Raised hands":
        document.getElementById("raised-reaction").textContent =
          reaction.quantity;
        break;
      case "Exploding head":
        document.getElementById("exploding-reaction").textContent =
          reaction.quantity;
        break;
      case "fire":
        document.getElementById("fire-reaction").textContent =
          reaction.quantity;
        break;
    }
  });
  document.getElementById("total-reaction").textContent = totalReactions;
};

const printComments = async (wrapperId) => {
  let commentsWrapper = document.getElementById(wrapperId);
  let commentsArray = await getAllComments(postKey);
  let totalComments = 0;
  while (commentsWrapper.firstChild) {
    commentsWrapper.removeChild(commentsWrapper.firstChild);
  }
  if (commentsArray !== null) {
    commentsArray = commentsArray.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    commentsArray.forEach((commentItem) => {
      let commentElement = createComment(commentItem);
      commentsWrapper.append(commentElement);
      console.log(commentItem.content);
      totalComments++;
    });
  }
  document.getElementById("total-comments").textContent = totalComments;
  document.getElementById("summary-comments").textContent = totalComments;
};

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

printComments("comments-wrapper");
printPostDetails();
createDiscussCards("discussion-tags", tagsToDiscuss);
createNavLiks(alredyLogged, "nav-links-wrapper");
