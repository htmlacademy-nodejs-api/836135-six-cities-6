import { Container } from 'inversify';
import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { Component } from './types/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/user.container.js';
import { createRentalOfferContainer } from './shared/modules/offer/offer.container.js';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createRentalOfferContainer(),
  );
  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
