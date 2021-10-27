import { Component, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';


@Component({
  selector: 'app-firstquery',
  templateUrl: './firstquery.component.html',
  styleUrls: ['./firstquery.component.css']
})
export class FirstqueryComponent implements OnInit {
  user: any | undefined;
  loading = true;
  error: any;
  constructor(private apollo: Apollo) { }
  
  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: gql`
        { 
          user(login:"Majdi") { 
            id
            bio
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.user = result?.data?.user;
      this.error = result.error;
      this.loading = result.loading;
    });
  }

}
