import { IsString } from 'class-validator';
import { OfferBaseDto } from './offer.base.dto';

const iosValidations = ['iphone', 'ipad'];
const androidValidations = ['android', 'google'];

const isDesktop = ({ platform }) =>
  platform.toLowerCase().includes('desktop') ? 1 : 0;

const isAndroid = ({ platform, device }) => {
  return platform.toLowerCase().includes('mobile') &&
    androidValidations.some((t) => device.split('_').includes(t))
    ? 1
    : 0;
};

const isIos = ({ platform, device }) => {
  return platform.toLowerCase().includes('mobile') &&
    iosValidations.some((t) => device.split('_').includes(t))
    ? 1
    : 0;
};

export class Provider1Dto extends OfferBaseDto {
  @IsString()
  platform: string;

  @IsString()
  device: string;

  @IsString()
  get offer_id(): string {
    return this.name;
  }

  set offer_id(value: string) {
    this.name = value;
  }

  set offer_name(value: string) {
    this.description = value;
  }
  set call_to_action(value: string) {
    this.requirements = value;
  }

  set offer_url(value: string) {
    this.offerUrlTemplate = value;
  }

  set image_url(value: string) {
    this.thumbnail = value;
  }

  get isDesktop() {
    return isDesktop({ platform: this.platform });
  }
  get isAndroid() {
    return isAndroid({ platform: this.platform, device: this.device });
  }
  get isIos() {
    return isIos({ platform: this.platform, device: this.device });
  }
}
