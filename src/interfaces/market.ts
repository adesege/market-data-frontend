export interface MarketState {
  markets: ICreateMarket[],
  market: ICreateMarket,
}

export interface ICreateMarket {
  id?: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  address: string;
}

export interface IMarketWithCoordinates extends ICreateMarket {
  longitude: number;
  latitude: number;
}
