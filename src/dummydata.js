let restaurants = [
  {
    name: "Kosuke",
    description: `Kosuke is a dedicated ramen joint with an extensive list of ramens
you can choose to devour. From rich, thick, tonkotsu black garlic,
to more light, but still savoury shio ramen, there is a choice for
everyone!`,
    rating: 5,
    category: "Ramen",
    location: "Sydney",
    pricing: "average",
  },
  {
    name: "Ramen Zundo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna ex, porttitor vel libero vitae, elementum condimentum elit. Nam quis nisi fringilla, posuere purus nec, ultrices ante. Phasellus consequat sapien a erat tempor, scelerisque tempor odio ultrices. Etiam at ipsum dapibus, blandit ipsum sit amet, euismod elit. Curabitur posuere rhoncus.",
    rating: 4,
    category: "Ramen",
    location: "Sydney",
    pricing: "low",
  },
  {
    name: "RaRa Ramen",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna ex, porttitor vel libero vitae, elementum condimentum elit. Nam quis nisi fringilla, posuere purus nec, ultrices ante. Phasellus consequat sapien a erat tempor, scelerisque tempor odio ultrices. Etiam at ipsum dapibus, blandit ipsum sit amet, euismod elit. Curabitur posuere rhoncus.",
    rating: 4,
    category: "Ramen",
    location: "Sydney",
    pricing: "high",
  },
  {
    name: "Ippudo",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna ex, porttitor vel libero vitae, elementum condimentum elit. Nam quis nisi fringilla, posuere purus nec, ultrices ante. Phasellus consequat sapien a erat tempor, scelerisque tempor odio ultrices. Etiam at ipsum dapibus, blandit ipsum sit amet, euismod elit. Curabitur posuere rhoncus.",
    rating: 4,
    category: "Ramen",
    location: "Sydney",
    pricing: "high",
  },
  {
    name: "Mary's Newtown",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna ex, porttitor vel libero vitae, elementum condimentum elit. Nam quis nisi fringilla, posuere purus nec, ultrices ante. Phasellus consequat sapien a erat tempor, scelerisque tempor odio ultrices. Etiam at ipsum dapibus, blandit ipsum sit amet, euismod elit. Curabitur posuere rhoncus.",
    rating: 4,
    category: "Burgers",
    location: "Sydney",
    pricing: "high",
  },
  {
    name: "Charcoal Fish",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna ex, porttitor vel libero vitae, elementum condimentum elit. Nam quis nisi fringilla, posuere purus nec, ultrices ante. Phasellus consequat sapien a erat tempor, scelerisque tempor odio ultrices. Etiam at ipsum dapibus, blandit ipsum sit amet, euismod elit. Curabitur posuere rhoncus.",
    rating: 5,
    category: "Burgers",
    location: "Sydney",
    pricing: "high",
  },
  {
    name: "Castello's Pizza",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna ex, porttitor vel libero vitae, elementum condimentum elit. Nam quis nisi fringilla, posuere purus nec, ultrices ante. Phasellus consequat sapien a erat tempor, scelerisque tempor odio ultrices. Etiam at ipsum dapibus, blandit ipsum sit amet, euismod elit. Curabitur posuere rhoncus.",
    rating: 5,
    category: "Pizza",
    location: "Sydney",
    pricing: "high",
  },
  {
    name: "Macchiato",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna ex, porttitor vel libero vitae, elementum condimentum elit. Nam quis nisi fringilla, posuere purus nec, ultrices ante. Phasellus consequat sapien a erat tempor, scelerisque tempor odio ultrices. Etiam at ipsum dapibus, blandit ipsum sit amet, euismod elit. Curabitur posuere rhoncus.",
    rating: 4,
    category: "Pizza",
    location: "Sydney",
    pricing: "high",
  },
];

export function getRestaurants() {
  return restaurants;
}

export function getRestaurant(name) {
  return restaurants.find((restaurant) => restaurant.name === name);
}
