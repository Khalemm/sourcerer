import { Component, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';

@Component({
  selector: 'app-en-tete',
  templateUrl: './en-tete.component.html',
  styleUrls: ['./en-tete.component.css']
})
export class EnTeteComponent implements OnInit {
  user: any | undefined;
  loading = true;
  error: any;
  constructor(private apollo: Apollo) { }
  
  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: gql`
      {
        user(login: "Khalemm") {
          id
          bio
          name
          login
          location
          twitterUsername
          websiteUrl
          avatarUrl
          email
          followers {
            totalCount
          }
          following {
            totalCount
          }
          company
          repositories{
            totalCount
          }
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
