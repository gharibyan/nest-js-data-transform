import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { OfferBaseDto } from './offer.base.dto';
import { Provider2Dto } from './provider.2.dto';

interface ValidationError extends Error {
  data: Array<{ [key: string]: string }>;
}

@Injectable()
export class PayloadTransformer {
  async transformToBase(data: any): Promise<OfferBaseDto> {
    const { Offer, OS } = data;
    const dtoClass = Provider2Dto;
    const transformedData = plainToInstance(dtoClass, {
      ...Offer,
      ...OS,
    });
    const errors = await validate(transformedData);
    const arrayErrors = errors.map((error) => error.constraints);
    if (errors.length > 0) {
      const err = new Error('validation Error') as ValidationError;
      err.data = arrayErrors;
      throw err;
    }
    return transformedData;
  }
}
