import { Injectable } from '@nestjs/common';

import { OfferBaseDto } from './offer.base.dto';

const MAPPING_SCHEMA = [
  'externalOfferId:campaign_id',
  'name:name',
  'offerUrlTemplate:tracking_url',
  'requirements:instructions',
  'description:description',
  'isDesktop:web',
  'isAndroid:android',
  'isIos:ios',
];

@Injectable()
export class PayloadTransformer {
  transformToBase(provider): OfferBaseDto {
    const basePayload = new OfferBaseDto();

    const { Offer, OS } = provider;

    return MAPPING_SCHEMA.reduce((acc, schema) => {
      const [baseKey, providerKey] = schema;
      if (basePayload[baseKey]) {
        acc[baseKey] = Offer[providerKey] || OS[providerKey];
      }
      return acc;
    }, {}) as OfferBaseDto;
  }
}
