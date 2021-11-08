import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {APOLLO_OPTIONS} from 'apollo-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import {HttpLink} from 'apollo-angular/http';
import {createHttpLink, InMemoryCache} from '@apollo/client/core'
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { EnTeteComponent } from './en-tete/en-tete.component';
import { OverviewComponent } from './overview/overview.component';
import { LanguagesComponent } from './languages/languages.component';
import { CommitsComponent } from './commits/commits.component';


const gitToken ='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';

const gitUri = 'https://api.github.com/graphql'; // <-- add the URL of the GraphQL server here => https://github.com/settings/tokens

@NgModule({
  declarations: [
    AppComponent,
    EnTeteComponent,
    OverviewComponent,
    LanguagesComponent,
    CommitsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const cache = new InMemoryCache();
        return {
          link: httpLink.create({
            uri: "https://api.github.com/graphql",
            headers:new HttpHeaders().set('Authorization',`Bearer ${gitToken}` )
          }),
          cache
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }