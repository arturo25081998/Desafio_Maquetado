const isLogged = () => {
  let token = localStorage.getItem("token");
  return token ? true : false;
};

export { isLogged };
