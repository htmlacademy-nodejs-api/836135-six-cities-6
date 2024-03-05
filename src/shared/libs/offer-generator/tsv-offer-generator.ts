import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { MockServerData} from '../../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import { HousingType } from '../../../types/entities/housingType.enum.js';
import { UserType } from '../../../types/entities/userType.enum.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const comforts = getRandomItems<string>(this.mockData.comforts).join(';');
    const title = getRandomItem<string>(this.mockData.names);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const imagePreview = getRandomItem<string>(this.mockData.imagePreview);
    const images = getRandomItem(this.mockData.images).join(';');
    const email = getRandomItem(this.mockData.emails);
    const avatar = getRandomItem(this.mockData.avatars);
    const user = getRandomItem(this.mockData.users);
    const cityInfo = getRandomItem(this.mockData.cities);
    const housingType = getRandomItem([HousingType.Apartment, HousingType.Hotel, HousingType.House, HousingType.Room]);
    const premium = Boolean(generateRandomValue(0, 1));
    const favourite = Boolean(generateRandomValue(0, 1));
    const countOfRooms = generateRandomValue(MIN_ROOMS, MAX_ROOMS);
    const countOfGuests = generateRandomValue(MIN_GUESTS, MAX_GUESTS);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day');
    const userType = getRandomItem([UserType.Pro, UserType.Regular]);
    const { city, coordinates } = cityInfo;
    const coordinateString = coordinates.join(';');
    const { username, password } = user;

    const userInfoString = `${username};${email};${password};${avatar};${userType}`;

    return [
      title, description, createdDate, city, imagePreview, images, premium, favourite, rating, housingType, countOfRooms, countOfGuests, price, comforts, userInfoString, coordinateString
    ].join('\t');
  }
}
