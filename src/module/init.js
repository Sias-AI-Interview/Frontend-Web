import { dict } from "./dict.js";

document.title = dict.appTitle;
document
    .querySelector("meta[name='description']")
    ?.setAttribute("content", dict.seoDescription);
