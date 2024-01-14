import { City } from './city.enum.js';
import { Comforts } from './comfortsType.enum.js';
import { Coordinate } from './coordinate.type.js';
import { FavouriteFlag, PremiumFlag } from './flags.type.js';
import { HousingType } from './housingType.enum.js';
import { User } from './user.interface.js';

// type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
// type HousingType = 'apartment' | 'house' | 'room' | 'hotel';
// type Comforts = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

export interface RentalOffer {
    name: string,
    description: string,
    publicationDate: Date,
    city: City,
    imagePreview: string,
    image: string[],
    premiumFlag: PremiumFlag,
    favouriteFlag: FavouriteFlag,
    rating: number,
    housingType: HousingType,
    countOfRooms: number,
    countOfGuests: number,
    rentalPrice: number,
    comforts: Comforts | Comforts[],
    author: User,
    coordinates: Coordinate
}
