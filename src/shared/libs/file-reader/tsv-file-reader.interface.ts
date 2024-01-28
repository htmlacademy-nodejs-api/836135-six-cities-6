import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { RentalOffer } from '../../../types/entities/index.js';

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
        city,
        imagePreview,
        image,
        premiumFlag,
        favouriteFlag,
        rating,
        housingType,
        countOfRooms,
        countOfGuests,
        rentalPrice: Number.parseInt(rentalPrice, 10),
        comforts: comforts.split(';')
          .map((comfort) => ({comfort})),
        author,
        coordinates: coordinates.split(';')
          .map((coordinate) => ({coordinate}))
      }));
  }
}
