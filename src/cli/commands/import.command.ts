import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { errorColor, successColor } from '../../shared/libs/chalk/chalk.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { DefaultRentalOfferService, RentalOfferModel, RentalOfferService } from '../../shared/modules/offer/index.js';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { RentalOffer } from '../../types/index.js';

export class ImportCommand implements Command {
  private userService: UserService;
  private rentalOfferService: RentalOfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);
    this.logger = new ConsoleLogger();
    this.rentalOfferService = new DefaultRentalOfferService(this.logger, RentalOfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(successColor(`${count} строк импортировано`));
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: RentalOffer) {
    const author = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.rentalOfferService.create({
      authorId: author.id,
      name: offer.name,
      description: offer.description,
      publicationDate: offer.publicationDate,
      city: offer.city,
      imagePreview: offer.imagePreview,
      images: offer.images,
      premiumFlag: offer.premiumFlag,
      favouriteFlag: offer.favouriteFlag,
      rating: offer.rating,
      housingType: offer.housingType,
      countOfRooms: offer.countOfRooms,
      countOfGuests: offer.countOfGuests,
      rentalPrice: offer.rentalPrice,
      comforts: offer.comforts,
      coordinates: offer.coordinates,
    });

  }

  public getCommandName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(errorColor(`Невозможно импортировать данные из файла ${filename}`));
      console.error(errorColor(getErrorMessage(error)));
    }
  }
}
