export const convertUserApiToApp = (ApiUserData) => {
  return {
    avatarUrl: ApiUserData.avatar_url,
    id: ApiUserData.id,
    isPro: ApiUserData.is_pro,
    name: ApiUserData.name
  };
};

export const convertCommentApiToApp = (ApiCommentData) => {
  return {
    comment: ApiCommentData.comment,
    date: ApiCommentData.date,
    id: ApiCommentData.id,
    rating: ApiCommentData.rating,
    user: convertUserApiToApp(ApiCommentData.user),
  };
};

export const convertApiToApp = (ApiPlaceData) => {
  return {
    bedrooms: ApiPlaceData.bedrooms,
    city: ApiPlaceData.city,
    description: ApiPlaceData.description,
    goods: ApiPlaceData.goods,
    host: convertUserApiToApp(ApiPlaceData.host),
    id: ApiPlaceData.id,
    images: ApiPlaceData.images,
    isFavorite: ApiPlaceData.is_favorite,
    isPremium: ApiPlaceData.is_premium,
    location: ApiPlaceData.location,
    maxAdults: ApiPlaceData.max_adults,
    previewImage: ApiPlaceData.preview_image,
    price: ApiPlaceData.price,
    rating: ApiPlaceData.rating,
    title: ApiPlaceData.title,
    type: ApiPlaceData.type
  };
};

export const getRandomNumber = (maxNumber) => Math.floor(Math.random() * maxNumber);
