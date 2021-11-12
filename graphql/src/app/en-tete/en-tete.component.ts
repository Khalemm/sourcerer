import { Component, OnInit } from '@angular/core';
import { Apollo,gql } from 'apollo-angular';

@Component({
  selector: 'app-en-tete',
  templateUrl: './en-tete.component.html',
  styleUrls: ['./en-tete.component.css']
})
export class EnTeteComponent implements OnInit {
  user: any | undefined;
  countCommits: any[] = [];
  countCommit: number | undefined;
  loading = true;
  error: any;
  constructor(private apollo: Apollo) { }
  
  ngOnInit(): void {
    this.userQuery();
    console.log(this.user);
  }
  userQuery(){
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
          repositories(first: 100) {
            totalCount
            nodes {
              name
              defaultBranchRef {
                target {
                  ... on Commit {
                    history{
                      totalCount
                    }
                  }
                }
              }
            }
          }
        }
      }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.user = result?.data?.user;
      for(let i=0; i< Object.keys(this.user["repositories"]["nodes"]).length; i++) {
        this.countCommits.push(this.user["repositories"]["nodes"][i]["defaultBranchRef"]["target"]["history"]["totalCount"])
      } 
      this.countCommit = eval(this.countCommits.join("+"))
      this.error = result.error;
      this.loading = result.loading;
    });
  }

}
