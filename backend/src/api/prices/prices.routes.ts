import { Application, Request, Response } from 'express';
import config from '../../config';
import pricesUpdater from '../../tasks/price-updater';
import coinGeckoApi from '../../tasks/price-feeds/coingecko-api';

class PricesRoutes {
  public initRoutes(app: Application): void {
    app
      .get(config.MEMPOOL.API_URL_PREFIX + 'prices', this.$getCurrentPrices.bind(this))
      .get(config.MEMPOOL.API_URL_PREFIX + 'crypto-prices', this.$getCryptoPrices.bind(this))
    ;
  }

  private $getCurrentPrices(req: Request, res: Response): void {
    res.header('Pragma', 'public');
    res.header('Cache-control', 'public');
    res.setHeader('Expires', new Date(Date.now() + 360_0000 / config.MEMPOOL.PRICE_UPDATES_PER_HOUR).toUTCString());

    res.json(pricesUpdater.getLatestPrices());
  }

  private async $getCryptoPrices(req: Request, res: Response): Promise<void> {
    try {
      res.header('Pragma', 'public');
      res.header('Cache-control', 'public');
      res.setHeader('Expires', new Date(Date.now() + 5 * 60 * 1000).toUTCString());

      const data = await coinGeckoApi.$getMarkets();
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch cryptocurrency market data' });
    }
  }
}

export default new PricesRoutes();
