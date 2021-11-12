import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {
  repositories: any | undefined;
  countCommits: any[] = [];
  countCommit: number | undefined;
  loading = true;
  error: any;
  constructor(private apollo: Apollo) { }
  
  ngOnInit(): void {
    this.userQuery();
  }
  userQuery(){
    this.apollo
    .watchQuery({
      query: gql`
      {
        user(login: "Khalemm") {
          repositories(first: 100, privacy: PUBLIC) {
            totalCount
            nodes {
              name
              defaultBranchRef {
                target {
                  ... on Commit {
                    pushedDate
                    history {
                      totalCount
                    }
                  }
                  repository {
                    languages(first: 100) {
                      nodes {
                        color
                        name
                      }
                    }
                  }
                }
              }
              createdAt
              updatedAt
              url
              collaborators {
                totalCount
              }
            }
          }
        }
      }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.repositories = result?.data?.user;
      for(let i=0; i< Object.keys(this.repositories["repositories"]["nodes"]).length; i++) {
        this.countCommits.push(this.repositories["repositories"]["nodes"][i]["defaultBranchRef"]["target"]["history"]["totalCount"])
      } 
      this.countCommit = eval(this.countCommits.join("+"))
      this.error = result.error;
      this.loading = result.loading;
    });
  }
}
