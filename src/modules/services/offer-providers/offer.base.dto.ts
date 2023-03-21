import { IsString, IsNumber, IsEnum, IsOptional } from 'class-validator';

enum OfferBoxSizeEnum {
  large = 'large',
  small = 'small',
}

export class OfferBaseDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsString()
  thumbnail: string;

  @IsEnum(OfferBoxSizeEnum)
  boxSize: OfferBoxSizeEnum;

  @IsNumber()
  isDesktop: number;

  // indicates if offer is available for android
  @IsNumber()
  isAndroid: number;

  // indicates if offer is available for ios
  @IsNumber()
  isIos: number;

  // offer url template
  @IsString()
  offerUrlTemplate: string;

  @IsString()
  @IsOptional()
  providerName: string;

  @IsString()
  @IsOptional()
  externalOfferId: string;
}
