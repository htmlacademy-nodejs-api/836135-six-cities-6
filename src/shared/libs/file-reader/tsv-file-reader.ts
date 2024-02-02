import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { RentalOffer } from '../../../types/entities/index.js';
import { City } from '../../../types/entities/city.enum.js';
import { HousingType } from '../../../types/entities/housingType.enum.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): RentalOffer[] {
    if (!this.rawData) {
      throw new Error('Файл не прочитан');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, publicationDate, city, imagePreview, image, premiumFlag, favouriteFlag, rating, housingType, countOfRooms, countOfGuests, rentalPrice, comforts, author, coordinates]) => ({
        name,
        description,
        publicationDate: new Date(publicationDate),
        city: City[city as keyof typeof City],
        imagePreview,
        image: image.split(';')
          .map((img) => img),
        premiumFlag: Boolean(premiumFlag),
        favouriteFlag: Boolean(favouriteFlag),
        rating: Number.parseFloat(rating),
        housingType: HousingType[housingType as keyof typeof HousingType],
        countOfRooms: Number.parseInt(countOfRooms, 10),
        countOfGuests: Number.parseInt(countOfGuests, 10),
        rentalPrice: Number.parseInt(rentalPrice, 10),
        comforts: comforts.split(';'),
        author: ([author.split(';')]
          .map(([username, email, password, avatar, isPro]) => ({
            username,
            email,
            password,
            avatar,
            isPro: Boolean(isPro)
          })))[0],
        coordinates: {
          latitude: Number.parseInt(coordinates.slice(0, coordinates.indexOf(';'))),
          longitude: Number.parseInt(
            coordinates
            .slice(coordinates.indexOf(';') + 1, coordinates.length)
            .replace('\r', ''))
        }
        // coordinates: ([coordinates.split(';')]
        //   .map(([latitude, longitude]) => ({
        //     latitude: Number.parseFloat(latitude),
        //     longitude: Number.parseFloat(longitude)
        //   })))[0]
      }));
  }
}
