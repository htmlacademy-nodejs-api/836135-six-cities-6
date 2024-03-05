import { Container } from 'inversify';
import { RentalOfferService } from './offer-service.interface.js';
import { Component } from '../../../types/index.js';
import { DefaultRentalOfferService } from './default-offer-service.js';
import { RentalOfferEntity, RentalOfferModel } from './offer.entity.js';
import { types } from '@typegoose/typegoose';

export function createRentalOfferContainer() {
  const rentalOfferContainer = new Container();

  rentalOfferContainer.bind<RentalOfferService>(Component.RentalOfferService).to(DefaultRentalOfferService);
  rentalOfferContainer.bind<types.ModelType<RentalOfferEntity>>(Component.RentalOfferModel).toConstantValue(RentalOfferModel);

  return rentalOfferContainer;
}

