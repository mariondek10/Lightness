import * as convert from "color-convert";

/* export class Color {
  #hsl;
  #hex;
  #element;

  constructor(hsl) {
    this.#hsl = hsl;

    this.#hex = `${convert.hsl.hex(hsl)}`;
    this.#element = this.#generateElement();
  }

  #generateElement() {
    const colorElement = document.createElement("div");

    colorElement.classList.add("color");
    //Attribut style du <div>:  ceci change la couleur de fond du <div>
    colorElement.style.backgroundColor = `#${this.#hex}`;
    //Attribut de donnée data-color:  Sera utilisé par la suite pour copie la valeur de couleur dans le presse-papier.
    colorElement.dataset.color = this.#hex;

    const colorElementP = document.createElement("p");
    colorElementP.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";
    colorElementP.value = this.#hex;

    colorElement.appendChild(colorElementP);

    return colorElement;
  }

  display(parentElement) {
    parentElement.appendChild(this.#element);
  }
} */

/*
class Card {
  constructor(value, suit) {
    this.value = value;
    this.suit = suit;
    this.element = this.#generateCardElement();
  }

  display() {
    document.querySelector(".deck").appendChild(this.element);
    this.element.addEventListener("click", this.#toggleHidden.bind(this));
    return this;
  }

  #generateCardElement() {
    //génère les éléments qui seront stockés ensuite dans l'élément carte
    const card = document.createElement("div");
    card.dataset.value = this.value;
    card.dataset.suit = this.suit;

    card.classList.add("card");
    card.classList.add("hidden");
    card.classList.add(`v${this.value}`);
    card.classList.add(this.suit.toLowerCase());

    const interior = document.createElement("div");
    interior.classList.add("interior");
    interior.insertAdjacentHTML("afterbegin", this.#generateCardInterior());
    card.appendChild(interior);
    return card;
*/

// modules/Color.js

import * as convert from "color-convert";

export class Color {
  // Crée un champ privé #hsl
  #hsl;
  // Crée un champ privé #hex
  #hex;
  // Crée un champ privé #element
  #element;

  constructor(hsl) {
    this.#hsl = hsl;

    // Converti la valeur hsl en hexadécimal
    this.#hex = `#${convert.hsl.hex(hsl)}`;

    // Crée l'élément
    this.#element = this.#generateElement();
  }

  #generateElement() {
    // Crée un élément <div>
    const colorElement = document.createElement("div");
    // Lui ajoute une class "color"
    colorElement.classList.add("color");
    // Ajoute l'attribut de donnée "data-color"
    colorElement.dataset.color = this.#hex;
    // Change la couleur de fond de l'élément
    colorElement.style.backgroundColor = this.#hex;

    //Crée un élément <p>
    const textElement = document.createElement("p");
    // Lui ajoute comme texte la valeur hexadécimale
    textElement.textContent = this.#hex;
    // Change la couleur du texte selon la luminosité de la couleur de fond
    textElement.style.color = this.#hsl[2] < 60 ? "#ffffff" : "#000000";
    // Ajoute l'élément <p> comme enfant du <div>
    colorElement.appendChild(textElement);

    // Retourne le <div>
    return colorElement;
  }

  display(parentElement) {
    // Ajoute this.#element comme enfant d'un élément parent passé en argument.
    parentElement.appendChild(this.#element);
  }
}
