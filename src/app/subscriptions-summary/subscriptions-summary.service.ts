import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable( { providedIn : 'root'} )
export class SubscriptionsSummaryService {

  constructor(
    private httpClient : HttpClient,
  ) {}

  public getPrevAndCurrentSubscriptions() : Observable<any> {
    return this.httpClient.get( '/api/preview' );
  }
}
