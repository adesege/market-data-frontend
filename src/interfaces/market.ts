export interface MarketState {
  market: any[]
}

export interface ICreateMarket {
  name: string;
  description: string;
  category: string;
  images: string[];
  address: string;
}

export interface ICreateMarketResponse extends ICreateMarket {

}
