import { isLogged } from "./modules/utils.js";
import { createNavLiks, createCardIsLogged } from "./modules/domElements.js";

let alredyLogged = isLogged();
createNavLiks(alredyLogged, "nav-links-wrapper");
createCardIsLogged(alredyLogged, "login-Card-Wrapper");
