import { generatePalette, isHexColor, hexToCSSHSL } from "./modules/utils";
import { Color } from "./modules/Color.js";
import { forEach } from "lodash-es";
import * as convert from "color-convert";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const colorContainer = document.querySelector("main");
// Cherche l'élément <form> dans le DOM
const formElement = document.querySelector("form");

const notyf = new Notyf();

function displayColor(input, palette) {
  // Efface tout le contenu de l'élément <main>
  colorContainer.innerHTML = "";

  // Cherche l'élément header dans le DOM
  const header = document.querySelector("header");
  // Ajoute la classe "minimized" au header
  header.classList.add("minimized");

  // Reçoit l'input du formulaire, et modifie la variable css "--shadow-color"
  // avec ce qui sort de la fonction hexToCSSHSL.
  document.documentElement.style.setProperty(
    "--shadow-color",
    hexToCSSHSL(input)
  );

  // Crée un tableau avec les index de la palette que nous souhaitons
  // transformer en hex pour le dégradé. On le map ensuite de telle sorte
  // à recevoir en retour les valeur hex pour chaque couleur de la palette
  // à l'index du tableau de départ. On ajoute également un "#" au début
  // des chaînes de caractère.
  const gradientColors = [
    0,
    Math.round(palette.length / 2),
    palette.length - 1,
  ].map((index) => `#${convert.hsl.hex(palette[index])}`);

  // Utilise les valeurs du tableau gradientColors pour modifier le dégradé.
  document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(
    ","
  )}`;

  // Redéfinis background-size
  document.body.style.backgroundSize = `400% 400%`;

  // Prend chaque élément dans le tableau palette, instancie une classe avec
  // ses données et appelle la méthode display() dessus.
  palette.map((c) => new Color(c).display(colorContainer));
}

const handleForm = (e) => {
  try {
    // Empêche le refresh lors de la soumission du formulaire
    e.preventDefault();
    // Cherche la valeur de l'élément <input>
    const inputValue = e.target.firstElementChild.value;
    // Vérifie que la valeur soit bien un code hexadécimal
    if (!isHexColor(inputValue)) {
      // Si ce n'est pas le cas, balancer l'erreur
      throw new Error(`${inputValue} is not a valid Hexadecimal color`);
    }

    // Crée la palette à partir du code hexadécimal
    const palette = generatePalette(inputValue);
    // Affiche dans la console la valeur d'entrée et la palette
    console.log(inputValue, palette);

    displayColor(inputValue, palette);
  } catch (err) {
    // Attrape les erreurs du block try et les affiche dans la console.
    console.error(err);
    notyf.error(err.message);
  }
};

// Lorsque le formulaire est soumis, appèle le callback handleForm
formElement.addEventListener("submit", handleForm);

const handleClick = async (e) => {
  const color = e.target.closest(".color").dataset.color;

  await navigator.clipboard.writeText(color);
  notyf.success(`copied ${color} to clipboard`);
};

colorContainer.addEventListener("click", handleClick);
