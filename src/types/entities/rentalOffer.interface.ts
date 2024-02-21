import { City } from './city.enum.js';
import { Comforts } from './comfortsType.interface.js';
import { Coordinate } from './coordinate.type.js';
import { HousingType } from './housingType.enum.js';
import { User } from './user.interface.js';

export interface RentalOffer {
    name: string,
    description: string,
    publicationDate: Date,
    city: City,
    imagePreview: string,
    images: string[],
    premiumFlag: boolean,
    favouriteFlag: boolean,
    rating: number,
    housingType: HousingType,
    countOfRooms: number,
    countOfGuests: number,
    rentalPrice: number,
    comforts: Comforts[],
    author: User,
    coordinates: Coordinate
}
