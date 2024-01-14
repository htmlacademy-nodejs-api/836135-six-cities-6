import { User } from './user.interface.js';

// type City = 'Paris' | 'Cologne' | 'Brussels' | 'Amsterdam' | 'Hamburg' | 'Dusseldorf';
// type HousingType = 'apartment' | 'house' | 'room' | 'hotel';
// type Comforts = 'Breakfast' | 'Air conditioning' | 'Laptop friendly workspace' | 'Baby seat' | 'Washer' | 'Towels' | 'Fridge';

enum City {
    Paris = 'Paris',
    Cologne = 'Cologne',
    Brussels = 'Brussels',
    Amsterdam = 'Amsterdam',
    Hamburg = 'Hamburg',
    Dusseldorf = 'Dusseldorf'
}

enum HousingType {
    Apartment = 'apartment',
    House = 'house',
    Room = 'room',
    Hotel = 'hotel'
}

enum Comforts {
    Breakfast = 'Breakfast',
    AirConditioning = 'Air conditioning',
    Laptop = 'Laptop friendly workspace',
    BabySeat = 'Baby seat',
    Washer = 'Washer',
    Towels = 'Towels',
    Fridge = 'Fridge'
}

interface Coordinate {
    latitude: number,
    longitude: number
}

type PremiumFlag = 'premium' | '';
type FavouriteFlag = 'favourite' | '';

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
