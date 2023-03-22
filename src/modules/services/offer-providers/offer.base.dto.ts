import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsDefined,
} from 'class-validator';
import { Exclude } from 'class-transformer';

enum OfferBoxSizeEnum {
  large = 'large',
  small = 'small',
}

export class OfferBaseDto {
  @IsString()
  @IsDefined()
  name: string;

  @IsString()
  @IsOptional()
  slug: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  requirements: string;

  @IsString()
  @IsOptional()
  thumbnail: string;

  @IsEnum(OfferBoxSizeEnum)
  @IsOptional()
  boxSize: OfferBoxSizeEnum;

  @IsNumber()
  @IsOptional()
  @Exclude()
  _isDesktop: number;
  public get isDesktop(): number {
    return this._isDesktop;
  }
  public set isDesktop(value: any) {
    this._isDesktop = value;
  }

  // indicates if offer is available for android
  @IsNumber()
  @IsOptional()
  @Exclude()
  _isAndroid: number;
  public get isAndroid(): number {
    return this._isAndroid;
  }
  public set isAndroid(value: any) {
    this._isAndroid = value;
  }

  // indicates if offer is available for ios
  @IsNumber()
  @IsOptional()
  _isIos: number;
  public get isIos(): number {
    return this._isIos;
  }
  public set isIos(value: any) {
    this._isIos = value;
  }

  // offer url template
  @IsString()
  @IsOptional()
  offerUrlTemplate: string;

  @IsString()
  @IsOptional()
  providerName: string;

  @IsString()
  @IsOptional()
  externalOfferId: string;
}
