import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/user.entity.js';
import { HousingType } from '../../../types/entities/housingType.enum.js';
import { Comforts } from '../../../types/entities/comforts.enum.js';
import { Coordinate } from '../../../types/entities/coordinate.type.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RentalOfferEntity extends defaultClasses.Base { }

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class RentalOfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public name!: string;

  @prop({ trim: true })
  public description!: string;

  @prop()
  public imagePreview!: string;

  @prop()
  public images!: string[];

  @prop()
  public premiumFlag!: boolean;

  @prop()
  public favouriteFlag!: boolean;

  @prop()
  public rating!: number;

  @prop({
    type: () => String,
    enum: HousingType
  })
  public housingType!: HousingType;

  @prop()
  public countOfRooms!: number;

  @prop()
  public countOfGuests!: number;

  @prop()
  public rentalPrice!: number;

  @prop({
    type: () => String,
    enum: Comforts
  })
  public comforts!: Comforts[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({
    type: () => Number,
  })
  public coordinates!: Coordinate;
}

export const RentalOfferModel = getModelForClass(RentalOfferEntity);
