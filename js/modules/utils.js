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

const getRandomUser = (array) => {
  const indice = Math.floor(Math.random() * array.length);
  return array[indice];
};

const getRandomDate = () => {
  let today = new Date();
  let randomDays = Math.floor(Math.random() * 90);
  let randomDate = new Date(today);
  randomDate.setDate(today.getDate() - randomDays);
  return randomDate;
};

export {
  isLogged,
  evaluateInput,
  createReactions,
  getRandomUser,
  getRandomDate,
};
