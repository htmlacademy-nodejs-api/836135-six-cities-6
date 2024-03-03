// import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
// import { RentalOffer } from '../../../types/index.js';
// import { City } from '../../../types/entities/city.enum.js';
// import { HousingType } from '../../../types/entities/housingType.enum.js';

const CHUNK_SIZE = 16384;

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    // this.rawData = readFileSync(this.filename, 'utf-8');
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }

  // public toArray(): RentalOffer[] {
  //   if (!this.rawData) {
  //     throw new Error('Файл не прочитан');
  //   }

  //   return this.rawData
  //     .split('\n')
  //     .filter((row) => row.trim().length > 0)
  //     .map((line) => line.split('\t'))
  //     .map(([name, description, publicationDate, city, imagePreview, image, premiumFlag, favouriteFlag, rating, housingType, countOfRooms, countOfGuests, rentalPrice, comforts, author, coordinates]) => ({
  //       name,
  //       description,
  //       publicationDate: new Date(publicationDate),
  //       city: city as City,
  //       imagePreview,
  //       images: image.split(';')
  //         .map((img) => img),
  //       premiumFlag: Boolean(premiumFlag),
  //       favouriteFlag: Boolean(favouriteFlag),
  //       rating: Number.parseFloat(rating),
  //       housingType: housingType as HousingType,
  //       countOfRooms: Number.parseInt(countOfRooms, 10),
  //       countOfGuests: Number.parseInt(countOfGuests, 10),
  //       rentalPrice: Number.parseInt(rentalPrice, 10),
  //       comforts: comforts.split(';'),
  //       author: ([author.split(';')]
  //         .map(([username, email, password, avatar, isPro]) => ({
  //           username,
  //           email,
  //           password,
  //           avatar,
  //           isPro: Boolean(isPro)
  //         })))[0],
  //       coordinates: ([coordinates.split(';')]
  //         .map(([latitude, longitude]) => ({
  //           latitude: Number.parseFloat(latitude),
  //           longitude: Number.parseFloat(longitude)
  //         })))[0]
  //     }));
  // }
}
