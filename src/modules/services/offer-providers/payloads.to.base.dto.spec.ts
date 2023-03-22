import * as Provider1 from './provider1.service';
import * as Provider2 from './provider2.service';

const provider1PayloadMock = {
  query: {
    pubid: '1',
    appid: 1,
    country: '',
    platform: 'all',
  },
  response: {
    currency_name: 'Coins',
    offers_count: 2729,
    // this will be array of offers
    // this can be multiple, so please consider this
    offers: [
      {
        // should be mapped to `externalOfferId`
        offer_id: '19524555',
        // should be mapped to `name`
        offer_name: 'MyGym - iOS',
        // should be mapped to `description`
        offer_desc: 'Play and reach level 23 within 14 days.',
        // should be mapped to `requirements`
        call_to_action: 'Play and reach level 23 within 14 days.',
        disclaimer: 'This offer rewards within 24 hours. New users only.',
        // should be mapped to offerUrlTemplate
        offer_url: 'https://some.url',
        offer_url_easy: 'https://some.url',
        payout: 10.675,
        payout_type: 'cpe',
        amount: 8873,
        // should be mapped to `thumbnail`
        image_url: 'https://some.url',
        image_url_220x124: 'https://some.url',
        countries: ['NZ'],
        // combine platform and device to map to `isDesktop`, `isAndroid`, `isIos`
        platform: 'mobile',
        device: 'iphone_ipad',
        category: {
          '9': 'Mobile Apps',
        },
        last_modified: 1645095666,
        preview_url: 'https://some.url',
        package_id: 'idnumbers',
        verticals: [
          {
            vertical_id: '4',
            vertical_name: 'Lifestyle',
          },
          {
            vertical_id: '11',
            vertical_name: 'Health',
          },
        ],
      },
    ],
  },
};

const provider2PayloadMock = {
  status: 'success',
  data: {
    // offers from offer2 provider
    '15828': {
      Offer: {
        // should be mapped to `externalOfferId`
        campaign_id: 15828,
        store_id: null,
        tracking_type: 'CPA',
        campaign_vertical: 'professional_finance',
        currency_name_singular: 'coin',
        currency_name_plural: 'coins',
        network_epc: '4.8359',
        // should be mapped to `icon`
        icon: 'https://some.url',
        // should be mapped to `name`
        name: 'Sofi',
        // should be mapped to `offerUrlTemplate`
        tracking_url: 'https://some.url',
        // should be mapped to `requirements`
        instructions:
          'Register with VALID personal information, Make a minimum deposit of $50,Redeem your points! *New Users Only!',
        disclaimer: null,
        // should be mapped to `description`
        description:
          'SoFi is a one-stop shop for your finances, designed to help you Get Your Money Right.',
        short_description: 'Make a Deposit to Earn!',
        offer_sticker_text_1: 'RECOMMENDED',
        offer_sticker_text_2: null,
        offer_sticker_text_3: null,
        offer_sticker_color_1: 'D100BC',
        offer_sticker_color_2: 'FFFFFF',
        offer_sticker_color_3: 'FFFFFF',
        sort_order_setting: null,
        category_1: 'free',
        category_2: null,
        amount: 53550,
        payout_usd: 69.25,
        start_datetime: '2022-04-19 11:58:30',
        end_datetime: '2042-04-19 04:59:00',
        is_multi_reward: false,
      },
      Country: {
        include: {
          US: {
            id: 243,
            code: 'US',
            name: 'United States',
          },
        },
        exclude: [],
      },
      State: {
        include: [],
        exclude: [],
      },
      City: {
        include: [],
        exclude: [],
      },
      Connection_Type: {
        cellular: true,
        wifi: true,
      },
      Device: {
        include: [],
        exclude: [],
      },
      OS: {
        // this should be mapped to `isAndroid`
        android: false,
        // this should be mapped to `isIos`
        ios: true,
        // this should be mapped to `isDesktop`
        web: true,
        min_ios: null,
        max_ios: null,
        min_android: null,
        max_android: null,
      },
    },
  },
};

describe('PayloadsToBaseDto: Provider1 Transform', () => {
  const providerTransform = new Provider1.PayloadTransformer();
  const { offers } = provider1PayloadMock.response as any;
  offers.push(
    {
      ...offers[0],
      offer_id: 111,
    },
    {
      ...offers[0],
      offer_id: undefined,
    },
  );

  it('provider1: Offer should be successfully transformed', async () => {
    const offer = offers[0];
    const transformedData = await providerTransform.transformToBase(offers[0]);
    expect(transformedData.name).toBe(offer.offer_id);
    expect(transformedData.description).toBe(offer.offer_name);
    expect(transformedData.requirements).toBe(offer.call_to_action);
    expect(transformedData.offerUrlTemplate).toBe(offer.offer_url);
    expect(transformedData.thumbnail).toBe(offer.image_url);
    expect(transformedData.isDesktop).toBe(0);
    expect(transformedData.isAndroid).toBe(0);
    expect(transformedData.isIos).toBe(1);
  });
  it('provider1: Offer should be failed transformed cuz offer_id validation not passed string to be integer', async () => {
    try {
      await providerTransform.transformToBase(offers[1]);
    } catch (error) {
      expect(error.message).toBe('validation Error');
      expect(Array.isArray(error.data)).toBe(true);
    }
  });
  it('provider1: Offer should be failed transformed cuz name is required', async () => {
    try {
      await providerTransform.transformToBase(offers[2]);
    } catch (error) {
      expect(error.message).toBe('validation Error');
      expect(Array.isArray(error.data)).toBe(true);
    }
  });
});
describe('PayloadsToBaseDto: Provider2 Transform', () => {
  const providerTransform = new Provider2.PayloadTransformer();
  const offers = Object.values(provider2PayloadMock.data);

  it('provider2: Offer should be successfully transformed', async () => {
    const offer = offers[0];
    const { Offer } = offer;
    const transformedData = await providerTransform.transformToBase(offers[0]);
    expect(transformedData.name).toBe(Offer.name);
    expect(transformedData.description).toBe(Offer.description);
    expect(transformedData.requirements).toBe(Offer.instructions);
    expect(transformedData.offerUrlTemplate).toBe(offer.Offer.tracking_url);
    expect(transformedData.isDesktop).toBe(1);
    expect(transformedData.isAndroid).toBe(0);
    expect(transformedData.isIos).toBe(1);
  });

  it('provider2: Offer should be failed transformed cuz offer_id validation not passed string to be integer', async () => {
    try {
      const offer = { ...offers[0] } as any;
      offer.Offer.name = 123;
      await providerTransform.transformToBase(offer);
    } catch (error) {
      expect(error.message).toBe('validation Error');
      expect(Array.isArray(error.data)).toBe(true);
    }
  });
  it('provider2: Offer should be failed transformed cuz name is required', async () => {
    try {
      const offer = { ...offers[0] } as any;
      offer.Offer.name = undefined;
      await providerTransform.transformToBase(offer);
    } catch (error) {
      expect(error.message).toBe('validation Error');
      expect(Array.isArray(error.data)).toBe(true);
    }
  });
});
