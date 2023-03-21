import { Injectable } from '@nestjs/common';

import { OfferBaseDto } from './offer.base.dto';

const iosValidations = ['iphone', 'ipad'];
const androidValidations = ['android', 'google'];

const isDesktop = ({ platform }) =>
  platform.toLowerCase().includes('desktop') ? 1 : 0;

const isAndroid = ({ platform, device }) => {
  return platform.toLowerCase().includes('mobile') &&
    androidValidations.includes(device.toLowerCase())
    ? 1
    : 0;
};

const isIos = ({ platform, device }) => {
  return platform.toLowerCase().includes('mobile') &&
    iosValidations.includes(device.toLowerCase())
    ? 1
    : 0;
};

@Injectable()
export class PayloadTransformer {
  transformToBase(provider): OfferBaseDto {
    const basePayload = new OfferBaseDto();
    const { platform, device } = provider;
    basePayload.name = provider.offer_id;
    basePayload.description = provider.offer_name;
    basePayload.requirements = provider.call_to_action;
    basePayload.offerUrlTemplate = provider.offer_url;
    basePayload.thumbnail = provider.image_url;
    // I don't really like this validation part. this part can be improved based on data that we are receiving
    // here could be used regex or some other smart way to validate depend on how we are receiving data
    basePayload.isDesktop = isDesktop({ platform });
    basePayload.isAndroid = isAndroid({ platform, device });
    basePayload.isIos = isIos({ platform, device });
    return basePayload;
  }
}
