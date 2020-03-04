import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionProperties } from 'src/app/fake-backend';
import { HttpClient } from '@angular/common/http';

@Injectable( { providedIn : 'root' } )
export class UpdateSubscriptionsService {

  constructor(
    private httpClient : HttpClient,
  ) {}

  public update( subscriptionProperties : SubscriptionProperties ) : Observable<any> {
    return this.httpClient.put( '/api/current', subscriptionProperties );
  }

  public getCurrentSubscription() : Observable<any> {
    return this.httpClient.get( '/api/current' );
  }
}
