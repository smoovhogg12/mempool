import { query } from '../../utils/axios-query';
import logger from '../../logger';

export interface CryptoMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  atl: number;
  atl_change_percentage: number;
  last_updated: string;
}

class CoinGeckoApi {
  private readonly url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h';

  private cachedData: CryptoMarketData[] | null = null;
  private lastFetchTime: number = 0;
  private readonly cacheDurationMs: number = 5 * 60 * 1000; // 5 minutes

  /** @asyncUnsafe */
  public async $getMarkets(): Promise<CryptoMarketData[]> {
    const now = Date.now();
    if (this.cachedData && (now - this.lastFetchTime) < this.cacheDurationMs) {
      return this.cachedData;
    }

    try {
      const response = await query(this.url) as CryptoMarketData[];
      if (response && Array.isArray(response)) {
        this.cachedData = response;
        this.lastFetchTime = now;
        return response;
      }
    } catch (e) {
      logger.warn(`Could not fetch cryptocurrency market data from CoinGecko. Reason: ${e instanceof Error ? e.message : e}`);
    }

    return this.cachedData ?? [];
  }
}

export default new CoinGeckoApi();
