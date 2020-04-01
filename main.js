const getData = path => {
  return fetch(path).then(res => res.json());
};
const $ = selector => document.querySelector(selector);

const colorPreview = color => {
  const existPreview = $("div.preview");
  if (existPreview) existPreview.remove();

  const pageWrapper = $("div.pageWrapper");
  const preview = document.createElement("div");
  preview.classList.add(`preview`);
  preview.style.backgroundColor = color.hexValue;
  preview.title = "Kliknij aby zamknąć";
  preview.addEventListener("click", () => preview.remove());

  const previewCaption = document.createElement("div");
  previewCaption.classList.add("previewCaption");
  previewCaption.textContent = color.name.toUpperCase();

  preview.appendChild(previewCaption);
  pageWrapper.appendChild(preview);
};

const generateCards = async palette => {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(button => button.classList.remove("active"));

  const button = $(`.btn.${palette}`);
  button.classList.add("active");

  const container = $("div.container");
  const title = $("h1.title");
  title.textContent = palette.toUpperCase();
  container.textContent = "";
  const colors = await getData(`./assets/Colors${palette}.json`);

  colors.forEach(item => {
    const color = document.createElement("div");
    color.classList.add("card");
    color.style.backgroundColor = item.hexValue;
    color.addEventListener("click", () => colorPreview(item));

    const caption = document.createElement("div");
    caption.classList.add("card__caption");
    caption.textContent = item.name;

    color.appendChild(caption);
    container.appendChild(color);
  });
};

window.document.addEventListener("DOMContentLoaded", async () => {
  const ralBtn = $("button#ralBtn");
  const ncsBtn = $("button#ncsBtn");

  generateCards("Ral");

  ralBtn.addEventListener("click", () => generateCards("Ral"));
  ncsBtn.addEventListener("click", () => generateCards("Ncs"));
});
