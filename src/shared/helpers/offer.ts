import { RentalOffer } from '../../types/index.js';
import { HousingType } from '../../types/entities/housingType.enum.js';
import { City } from '../../types/entities/city.enum.js';


export function createOffer(offerData: string): RentalOffer {
  const [
    name,
    description,
    publicationDate,
    city,
    imagePreview,
    imagesGroup,
    premiumFlag,
    favouriteFlag,
    rating,
    housingType,
    countOfRooms,
    countOfGuests,
    rentalPrice,
    comforts,
    userInfo,
    coordinateInfo
  ] = offerData.replace('\n', '').split('\t');

  const author = ([userInfo.split(';')]
    .map(([username, email, password, avatar, isPro]) => ({
      username,
      email,
      password,
      avatar,
      isPro: Boolean(isPro)
    })))[0];

  const coordinates = ([coordinateInfo.split(';')]
    .map(([latitude, longitude]) => ({
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude)
    })))[0];

  const images = imagesGroup.split(';')
    .map((img) => img);

  return {
    name,
    description,
    publicationDate: new Date(publicationDate),
    city: city as City,
    imagePreview,
    images,
    premiumFlag: Boolean(premiumFlag),
    favouriteFlag: Boolean(favouriteFlag),
    rating: Number.parseFloat(rating),
    housingType: housingType as HousingType,
    countOfRooms: Number.parseInt(countOfRooms, 10),
    countOfGuests: Number.parseInt(countOfGuests, 10),
    rentalPrice: Number.parseInt(rentalPrice, 10),
    comforts: comforts.split(';'),
    author,
    coordinates
  };

}


