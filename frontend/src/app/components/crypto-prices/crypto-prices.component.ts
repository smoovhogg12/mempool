import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '@app/services/api.service';
import { SeoService } from '@app/services/seo.service';
import { CryptoMarketData } from '@interfaces/node-api.interface';

@Component({
  selector: 'app-crypto-prices',
  templateUrl: './crypto-prices.component.html',
  styleUrls: ['./crypto-prices.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CryptoPricesComponent implements OnInit {
  cryptoMarkets$: Observable<CryptoMarketData[]>;
  isLoading = true;

  constructor(
    private apiService: ApiService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.seoService.setTitle($localize`:@@crypto-prices.title:Cryptocurrency Prices`);
    this.seoService.setDescription($localize`:@@crypto-prices.description:Live cryptocurrency prices, market caps, and 24-hour changes for the top digital assets.`);

    this.cryptoMarkets$ = this.apiService.getCryptoPrices$().pipe(
      map((data) => {
        this.isLoading = false;
        return data;
      }),
      catchError(() => {
        this.isLoading = false;
        return of([]);
      }),
    );
  }

  trackById(_: number, item: CryptoMarketData): string {
    return item.id;
  }
}
