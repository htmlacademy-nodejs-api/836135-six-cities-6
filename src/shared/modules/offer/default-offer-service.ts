import { inject, injectable } from 'inversify';
import { RentalOfferService } from './offer-service.interface.js';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { RentalOfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './index.js';

@injectable()
export class DefaultRentalOfferService implements RentalOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RentalOfferModel) private readonly rentalOfferModel: types.ModelType<RentalOfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<RentalOfferEntity>> {
    const result = await this.rentalOfferModel.create(dto);
    this.logger.info(`Новое предложение создано: ${dto.name}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<RentalOfferEntity> | null> {
    return this.rentalOfferModel.findById(offerId).exec();
  }
}
