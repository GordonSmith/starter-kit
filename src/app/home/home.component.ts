import 'rxjs/add/operator/finally';

import { Component, OnInit } from '@angular/core';

import { QuoteService } from './quote.service';

declare const hpccsystems: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  quote: string;
  isLoading: boolean;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .finally(() => { this.isLoading = false; })
      .subscribe((quote: string) => { this.quote = quote; });

    hpccsystems.require(['src/chart/Column'], function (Column: any) {
      const widget = new Column()
        .target('vizPlaceholder')
        .columns(['Subject', 'Result'])
        .data([
          ['English', 45],
          ['Irish', 28],
          ['Math', 98],
          ['Geography', 48],
          ['Science', 82]
        ])
        .render()
        ;
    });
  }

}
