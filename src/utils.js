/* eslint-disable camelcase */
export const convertAppToApi = (AppPlaceData) => {
  return {
    bedrooms: AppPlaceData.bedrooms,
    city: AppPlaceData.city,
    description: AppPlaceData.description,
    goods: AppPlaceData.goods,
    host: {
      id: AppPlaceData.host.id,
      name: AppPlaceData.host.name,
      isPro: AppPlaceData.host.is_pro,
      avatarUrl: AppPlaceData.host.avatar_url,
    },
    id: AppPlaceData.id,
    images: AppPlaceData.images,
    is_favorite: AppPlaceData.isFavorite,
    is_premium: AppPlaceData.isPremium,
    location: AppPlaceData.location,
    max_adults: AppPlaceData.maxAdults,
    preview_image: AppPlaceData.previewImage,
    price: AppPlaceData.price,
    rating: AppPlaceData.rating,
    title: AppPlaceData.title,
    type: AppPlaceData.type
  };
};
/* eslint-enable */

export const convertApiToApp = (ApiPlaceData) => {
  return {
    bedrooms: ApiPlaceData.bedrooms,
    city: ApiPlaceData.city,
    description: ApiPlaceData.description,
    goods: ApiPlaceData.goods,
    host: ApiPlaceData.host,
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

export const convertCommentApiToApp = (ApiCommentData) => {
  return {
    comment: ApiCommentData.comment,
    date: ApiCommentData.date,
    id: ApiCommentData.id,
    rating: ApiCommentData.rating,
    user: {
      avatarUrl: ApiCommentData.user.avatar_url,
      id: ApiCommentData.user.id,
      isPro: ApiCommentData.user.is_pro,
      name: ApiCommentData.user.name
    },
  };
};
