import { isLogged, evaluateInput } from "./modules/utils.js";
import { createNavLiks } from "./modules/domElements.js";

let postData = {};
let postInfo = document.querySelectorAll(".post-info");
let alredyLogged = isLogged();
let tagInput = document.getElementById("tag-input");
let uploadPostButton = document.getElementById("upload-boton");

createNavLiks(alredyLogged, "nav-links-wrapper");

postInfo.forEach((input) => {
  input.addEventListener("keyup", (event) => {
    let property = event.target.name;
    let id = event.target.id;
    let input = document.getElementById(id);
    let inputValue = event.target.value;
    //alert(inputValue);
    if (inputValue == "") {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
    } else {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
    }
    postData[property] = inputValue;
    //console.log(postData);
  });
});

const createTag = (tagValue, wrapperId) => {
  let wrapper = document.getElementById(wrapperId);
  let tag = document.createElement("span");
  tag.classList.add(..."badge text-bg-secondary me-1".split(" "));
  tag.textContent = `# ${tagValue}`;

  let deleteTagButton = document.createElement("button");
  deleteTagButton.setAttribute("type", "button");
  deleteTagButton.textContent = "X";
  deleteTagButton.addEventListener("click", (event) => {
    var tagContainer = deleteTagButton.parentNode;
    tagContainer.remove();
    postData.tags = postData.tags.filter((item) => item !== tagValue);
    postData.tags.length === 0 ? delete postData.tags : null;
    //console.log(postData.tags);
  });

  tag.append(deleteTagButton);
  wrapper.append(tag);
};

tagInput.addEventListener("keydown", (event) => {
  let value = event.target.value;
  let id = event.target.id;
  if (event.key === " " && value === "") {
    event.preventDefault();
  } else {
    if (event.key === " ") {
      if (postData.tags === undefined) {
        postData["tags"] = [];
        postData.tags.push(value);
        createTag(value, "tags-wrapper");
      } else {
        if (postData.tags.length < 4 && !postData.tags.includes(value)) {
          postData.tags.push(value);
          createTag(value, "tags-wrapper");
        } else {
          alert("ya existe");
        }
      }
      document.getElementById(id).value = null;
      event.preventDefault();
    }
  }
});

uploadPostButton.addEventListener("click", () => {
  if (
    evaluateInput(postData.title) &&
    evaluateInput(postData.content) &&
    evaluateInput(postData.image) &&
    evaluateInput(postData.date) &&
    evaluateInput(postData.tags)
  ) {
    alert("Subir post");
  } else {
    alert("Faltan campos");
  }
});
