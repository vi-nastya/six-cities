export const MOCK_CITIES = [{
  name: `City1`,
  location: {
    latitude: 52.0,
    longitude: 4.5,
    zoom: 10
  }
},
{
  name: `City2`,
  location: {
    latitude: 20.4,
    longitude: 10.1,
    zoom: 3
  }
}
];

export const MOCK_USER = {
  id: 4,
  isPro: false,
  name: `Max`,
  avatarUrl: `img/1.png`
};

export const MOCK_OFFERS = [{
  id: 1,
  city: MOCK_CITIES[0],
  previewImage: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: false,
  isPremium: false,
  rating: 4.8,
  type: `apartment`,
  bedrooms: 3,
  maxAdults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 56,
    longitude: 3,
    zoom: 8
  }
},
{
  id: 2,
  city: MOCK_CITIES[1],
  previewImage: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: true,
  isPremium: false,
  rating: 3.5,
  type: `apartment`,
  bedrooms: 1,
  maxAdults: 4,
  price: 1,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 52,
    longitude: 30,
    zoom: 8
  }
},
{
  id: 3,
  city: MOCK_CITIES[0],
  previewImage: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: false,
  isPremium: true,
  rating: 2,
  type: `apartment`,
  bedrooms: 3,
  maxAdults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 56,
    longitude: 3,
    zoom: 8
  }
}
];

export const MOCK_OFFER_UPDATED_FAVORITE = {
  id: 1,
  city: MOCK_CITIES[0],
  previewImage: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: true,
  isPremium: false,
  rating: 4.8,
  type: `apartment`,
  bedrooms: 3,
  maxAdults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 56,
    longitude: 3,
    zoom: 8
  }
};

export const MOCK_OFFERS_UPDATED_FAVORITE = [{
  id: 1,
  city: MOCK_CITIES[0],
  previewImage: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: true,
  isPremium: false,
  rating: 4.8,
  type: `apartment`,
  bedrooms: 3,
  maxAdults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 56,
    longitude: 3,
    zoom: 8
  }
},
{
  id: 2,
  city: MOCK_CITIES[1],
  previewImage: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: true,
  isPremium: false,
  rating: 3.5,
  type: `apartment`,
  bedrooms: 1,
  maxAdults: 4,
  price: 1,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 52,
    longitude: 30,
    zoom: 8
  }
},
{
  id: 3,
  city: MOCK_CITIES[0],
  previewImage: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  isFavorite: false,
  isPremium: true,
  rating: 2,
  type: `apartment`,
  bedrooms: 3,
  maxAdults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 56,
    longitude: 3,
    zoom: 8
  }
}
];


export const MOCK_REVIEWS = [{
  id: 1,
  user: MOCK_USER,
  rating: 4,
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  date: `2019-05-08T14:13:56.569Z`
}];

export const MOCK_AUTH = {
  id: 4,
  isPro: false,
  name: `Max`,
  email: `max@test.com`,
  avatarUrl: `img/1.png`
};


/* eslint-disable camelcase */
export const MOCK_AUTH_SERVER = {
  id: 4,
  is_pro: false,
  name: `Max`,
  email: `max@test.com`,
  avatar_url: `img/1.png`
};


export const MOCK_USER_SERVER = {
  id: 4,
  is_pro: false,
  name: `Max`,
  avatar_url: `img/1.png`
};

export const MOCK_REVIEWS_SERVER = [{
  id: 1,
  user: MOCK_USER_SERVER,
  rating: 4,
  comment: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  date: `2019-05-08T14:13:56.569Z`
}];


export const MOCK_OFFERS_SERVER = [{
  id: 1,
  city: MOCK_CITIES[0],
  preview_image: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  is_favorite: false,
  is_premium: false,
  rating: 4.8,
  type: `apartment`,
  bedrooms: 3,
  max_adults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER_SERVER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 56,
    longitude: 3,
    zoom: 8
  }
},
{
  id: 2,
  city: MOCK_CITIES[1],
  preview_image: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  is_favorite: true,
  is_premium: false,
  rating: 3.5,
  type: `apartment`,
  bedrooms: 1,
  max_adults: 4,
  price: 1,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER_SERVER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 52,
    longitude: 30,
    zoom: 8
  }
},
{
  id: 3,
  city: MOCK_CITIES[0],
  preview_image: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  is_favorite: false,
  is_premium: true,
  rating: 2,
  type: `apartment`,
  bedrooms: 3,
  max_adults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER_SERVER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 56,
    longitude: 3,
    zoom: 8
  }
}
];

export const MOCK_OFFER_UPDATED_FAVORITE_SERVER = {
  id: 1,
  city: MOCK_CITIES[0],
  preview_image: `img/1.png`,
  images: [`img/1.png`, `img/2.png`],
  title: `Beautiful & luxurious studio at great location`,
  is_favorite: true,
  is_premium: false,
  rating: 4.8,
  type: `apartment`,
  bedrooms: 3,
  max_adults: 4,
  price: 120,
  goods: [`Heating`, `Kitchen`, `Cable TV`, `Washing machine`, `Coffee machine`, `Dishwasher`],
  host: MOCK_USER_SERVER,
  description: `A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.`,
  location: {
    latitude: 56,
    longitude: 3,
    zoom: 8
  }
};
/* eslint-enable */
