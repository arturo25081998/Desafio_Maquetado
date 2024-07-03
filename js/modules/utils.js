const isLogged = () => {
  let token = localStorage.getItem("token");
  return token ? true : false;
};

const evaluateInput = (inputValue) => {
  if (inputValue === undefined || inputValue === "") {
    return false;
  } else {
    return true;
  }
};
const createReactions = () => {
  let reactions = ["like", "unicorn", "Exploding head", "Raised hands", "fire"];
  reactions = reactions.map((reaction) => ({
    reaction: reaction,
    quantity: Math.floor(Math.random() * 101),
  }));
  return reactions;
};

export { isLogged, evaluateInput, createReactions };
