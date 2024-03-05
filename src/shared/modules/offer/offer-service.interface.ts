import { CreateOfferDto } from './index.js';
import { DocumentType } from '@typegoose/typegoose';
import { RentalOfferEntity } from './index.js';

export interface RentalOfferService {
    create(dto: CreateOfferDto): Promise<DocumentType<RentalOfferEntity>>;
    findById(offerId: string): Promise<DocumentType<RentalOfferEntity> | null>;
}
