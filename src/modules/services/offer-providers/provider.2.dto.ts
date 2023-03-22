import { OfferBaseDto } from './offer.base.dto';

export class Provider2Dto extends OfferBaseDto {
  set campaign_id(value: number | string) {
    this.externalOfferId = value.toString();
  }

  set tracking_url(value: string) {
    this.offerUrlTemplate = value;
  }
  set instructions(value: string) {
    this.requirements = value;
  }

  set ios(value) {
    this._isIos = value === true ? 1 : 0;
  }

  set android(value) {
    this._isAndroid = value === true ? 1 : 0;
  }

  set web(value) {
    this._isDesktop = value === true ? 1 : 0;
  }
}
