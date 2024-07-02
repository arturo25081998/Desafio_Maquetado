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
export { isLogged, evaluateInput };
