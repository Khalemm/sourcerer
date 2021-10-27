import { Component, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';

@Component({
  selector: 'app-firstquery',
  templateUrl: './firstquery.component.html',
  styleUrls: ['./firstquery.component.css']
})
export class FirstqueryComponent implements OnInit {
  rates: any[] | undefined;
  loading = true;
  error: any;
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: gql`
        {
          rates(currency: "USD") {
            currency
            rate
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.rates = result?.data?.rates;
      this.loading = result.loading;
      this.error = result.error;
    });
  }

}
