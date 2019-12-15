/* eslint-disable camelcase */
export const convertUserApiToApp = (ApiUserData) => {
  return {
    avatarUrl: ApiUserData.avatar_url,
    id: ApiUserData.id,
    isPro: ApiUserData.is_pro,
    name: ApiUserData.name
  };
};

// export const convertAppToApi = (AppPlaceData) => {
//   return {
//     bedrooms: AppPlaceData.bedrooms,
//     city: AppPlaceData.city,
//     description: AppPlaceData.description,
//     goods: AppPlaceData.goods,
//     host: {
//       id: AppPlaceData.host.id,
//       name: AppPlaceData.host.name,
//       is_pro: AppPlaceData.host.isPro,
//       avatar_url: AppPlaceData.host.avatarUrl,
//     },
//     id: AppPlaceData.id,
//     images: AppPlaceData.images,
//     is_favorite: AppPlaceData.isFavorite,
//     is_premium: AppPlaceData.isPremium,
//     location: AppPlaceData.location,
//     max_adults: AppPlaceData.maxAdults,
//     preview_image: AppPlaceData.previewImage,
//     price: AppPlaceData.price,
//     rating: AppPlaceData.rating,
//     title: AppPlaceData.title,
//     type: AppPlaceData.type
//   };
// };

export const convertCommentApiToApp = (ApiCommentData) => {
  return {
    comment: ApiCommentData.comment,
    date: ApiCommentData.date,
    id: ApiCommentData.id,
    rating: ApiCommentData.rating,
    user: convertUserApiToApp(ApiCommentData.user),
  };
};
/* eslint-enable */

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

