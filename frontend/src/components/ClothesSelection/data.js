import top from "./../../assets/tshirt.png";
import bottom from "./../../assets/pants.png";
import onepiece from "./../../assets/jumpsuit.png";
import shoes from "./../../assets/shoes.png";
import cropTop from "./../../assets/crop-top.png";
import shirt from "./../../assets/shirt.png";
import blouse from "./../../assets/blouse.png";
import shorts from "./../../assets/shorts.png";
import skirt from "./../../assets/skirt.png";
import dress from "./../../assets/dress.png";
import overall from "./../../assets/overall.png";
import suit from "./../../assets/suit.png";
import heel from "./../../assets/heel.png";
import dressShoes from "./../../assets/dress-shoes.png";
import boots from "./../../assets/boots.png";
import jumper from "./../../assets/jumper.png";
import jacket from "./../../assets/jacket.png";
import accessories from "./../../assets/accessories.png";
import swimwear from "./../../assets/swimwear.png";
import trunks from "./../../assets/trunks.png";
import bikini from "./../../assets/bikini.png";
import onepieceSwim from "./../../assets/onepiece-swim.png";
import speedo from "./../../assets/speedo.png";
import trench from "./../../assets/trench.png";
import blazer from "./../../assets/blazer.png";
import raincoat from "./../../assets/rain-coat.png";
import cardigan from "./../../assets/cardi.png";
import jersey from "./../../assets/jersey.png";
import hoodie from "./../../assets/hoodie.png";
import gloves from "./../../assets/gloves.png";
import scarf from "./../../assets/scarf.png";
import glasses from "./../../assets/glasses.png";
import cap from "./../../assets/cap.png";

// Defining an array of objects for the clothes items and their images
export const clothesItems = [
  { src: top, name: "TOPS" },
  { src: bottom, name: "BOTTOMS" },
  { src: jumper, name: "JUMPERS" },
  { src: jacket, name: "JACKETS" },
  { src: onepiece, name: "ONEPIECE" },
  { src: swimwear, name: "SWIMWEAR" },
  { src: shoes, name: "SHOES" },
  { src: accessories, name: "ACCESSORIES" },
];
// Defining an object that maps each clothes item to an array of its sub-selection items and their images
export const subSelectionItemsByClothesItem = {
  TOPS: [
    {
      src: top,
      name: "Tshirt",
      category_id: 1,
      sleeves: ["straps", "short sleeves", "3/4 sleeves", "long sleeves"],
      style: ["crew neck", "V neck", "Henley", "Polo"],
      pattern: ["striped", "Graphic", "baseball", "floral"],
    },
    {
      src: shirt,
      name: "shirt",
      category_id: 2,
      sleeves: ["short sleeves", "3/4 sleeves", "long sleeves"],
      style: ["flannel", "dress", "Hawaiian", "oxford"],
      pattern: ["striped", "Graphic", "checkered", "animal print", "floral"],
    },
    {
      src: blouse,
      name: "blouse",
      category_id: 3,
      sleeves: ["straps", "short sleeves", "3/4 sleeves", "long sleeves"],
      style: ["peplum", "wrap", "tunic", "button-down"],
      pattern: ["striped", "Graphic", "checkered", "animal print", "floral"],
    },
    {
      src: cropTop,
      name: "crop-top",
      category_id: 4,
      sleeves: ["straps", "short sleeves", "3/4 sleeves", "long sleeves"],
      style: ["bralette", "wrap", "off-shoulder", "hoodie"],
      pattern: ["striped", "Graphic", "checkered", "animal print", "floral"],
    },
  ],
  BOTTOMS: [
    {
      src: bottom,
      name: "pants",
      category_id: 5,
      style: [
        "jeans",
        "leggings",
        "cargo",
        "chinos",
        "dress-pants",
        "sweatpants",
      ],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: shorts,
      name: "shorts",
      category_id: 6,
      style: ["denim ", "cargo", "bermuda", "board", "athletic", "bike"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: skirt,
      name: "skirt",
      category_id: 7,
      style: ["mini", "maxi", "pencil", "pleated", "wrap"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
  ],
  JUMPERS: [
    {
      src: jumper,
      name: "jumper",
      category_id: 16,
      style: ["crew neck", "V neck", "turtle neck"],
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "christmas",
        "abstract",
        "floral",
      ],
    },
    {
      src: cardigan,
      name: "cardigan",
      category_id: 17,
      style: ["crew neck", "V neck", "turtle neck"],
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
    {
      src: hoodie,
      name: "hoodie",
      category_id: 18,
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
    {
      src: jersey,
      name: "jersey",
      category_id: 19,
      style: ["crew neck", "V neck", "turtle neck"],
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
  ],
  JACKETS: [
    {
      src: jacket,
      name: "jacket",
      category_id: 20,
      style: ["bomber", "leather", "parka", "denim"],
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
    {
      src: blazer,
      name: "blazer",
      category_id: 21,
      style: ["double breasted", "single breasted", "velvet"],
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
    {
      src: raincoat,
      name: "raincoat",
      category_id: 22,
      style: ["trench", "poncho", "anorak", "parka"],
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
    {
      src: trench,
      name: "trenchcoat",
      category_id: 23,
      style: ["classic", "military", "long"],
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
  ],
  ONEPIECE: [
    {
      src: onepiece,
      name: "jumpsuit",
      category_id: 8,
      style: ["classic", "culotte", "wide-leg", "skinny"],
      sleeves: ["straps", "short sleeves", "3/4 sleeves", "long sleeves"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: dress,
      name: "dress",
      category_id: 9,
      style: ["mini", "knee-high", "3/4", "maxi"],
      sleeves: ["straps", "short sleeves", "3/4 sleeves", "long sleeves"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: suit,
      name: "suit",
      category_id: 10,
      style: ["catsuit", "tuxedo", "business", "three-piece"],
      sleeves: ["straps", "short sleeves", "3/4 sleeves", "long sleeves"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: overall,
      name: "overalls",
      category_id: 11,
      style: ["denim", "shortalls", "skirtalls", "corduroy", "utility"],
      sleeves: ["straps", "short sleeves", "3/4 sleeves", "long sleeves"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
  ],
  SWIMWEAR: [
    {
      src: onepieceSwim,
      name: "onepiece",
      category_id: 24,
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
    {
      src: bikini,
      name: "bikini",
      category_id: 25,
      sleeves: ["straps", "short sleeves", "3/4 sleeves", "long sleeves"],
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
    {
      src: trunks,
      name: "trunks",
      category_id: 26,
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
    {
      src: speedo,
      name: "speedo",
      category_id: 27,
      pattern: [
        "striped",
        "Graphic",
        "animal print",
        "geometric",
        "abstract",
        "floral",
      ],
    },
  ],
  SHOES: [
    {
      src: shoes,
      name: "sneakers",
      category_id: 12,
      style: ["running shoes", "high-tops", "low-tops", "retro"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: heel,
      name: "Heels",
      category_id: 13,
      style: ["stiletto", "platform", "block", "flare"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: dressShoes,
      name: "dress-shoes",
      category_id: 14,
      style: ["flats", "loafers", "oxford", "derby"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: boots,
      name: "boots",
      category_id: 15,
      style: ["chelsea", "combat", "work", "hiking", "gumboots"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
  ],
  ACCESSORIES: [
    {
      src: cap,
      name: "hat",
      category_id: 28,
      style: ["cap", "beanie", "fedora", "beret"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: glasses,
      name: "glasses",
      category_id: 29,
      style: ["aviator", "wayfarer", "sport", "butterfly"],
    },
    {
      src: scarf,
      name: "scarf",
      category_id: 30,
      style: ["shawl", "infinity", "pashmina", "bandana"],
      pattern: ["striped", "checkered", "animal print", "floral"],
    },
    {
      src: gloves,
      name: "gloves",
      category_id: 31,
      style: ["winter", "fingerless", "ski", "dress"],
    },
  ],
};
