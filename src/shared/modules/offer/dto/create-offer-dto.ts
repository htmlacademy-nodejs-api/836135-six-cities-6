import { City } from '../../../../types/entities/city.enum.js';
import { Comforts } from '../../../../types/entities/comforts.enum.js';
import { Coordinate } from '../../../../types/entities/coordinate.type.js';
import { HousingType } from '../../../../types/entities/housingType.enum.js';

export class CreateOfferDto {
  public name: string;
  public description: string;
  public publicationDate: Date;
  public city: City;
  public imagePreview: string;
  public images: string[];
  public premiumFlag: boolean;
  public favouriteFlag: boolean;
  public rating: number;
  public housingType: HousingType;
  public countOfRooms: number;
  public countOfGuests: number;
  public rentalPrice: number;
  public comforts: Array<Comforts>;
  public authorId: string;
  public coordinates: Coordinate;
}
