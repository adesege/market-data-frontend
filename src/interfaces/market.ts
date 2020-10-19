export interface MarketState {
  markets: ICreateMarketResponse[]
}

export interface ICreateMarket {
  name: string;
  description: string;
  category: string;
  images: string[];
  address: string;
}

export interface ICreateMarketResponse extends ICreateMarket {
  id: string;
  longitude: number;
  latitude: number;
}
