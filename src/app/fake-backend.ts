// backendless pattern from https://jasonwatmore.com/post/2019/05/02/angular-7-mock-backend-example-for-backendless-development

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

export interface SubscriptionProperties {
  plan : string;
  name : string;
  seats : number;
  cost : number;
}

export interface Subscriptions {
  current : SubscriptionProperties;
  previous : SubscriptionProperties;
}

const subscriptions : Subscriptions = {
  current : {
    plan : 'good',
    name : 'Good',
    seats : 5,
    cost : 50,
  },
  previous : {
    plan : null,
    name : null,
    seats : null,
    cost : null,
  }
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept( request : HttpRequest<any>, next : HttpHandler ) : Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    // wrap in delayed observable to simulate server api call
    return of( null )
      .pipe( mergeMap( handleRoute ) )
      .pipe( materialize() ) // call materialize and dematerialize to ensure delay even if an error is thrown
      .pipe( delay( 500 ) )
      .pipe( dematerialize() );

    // route functions

    function handleRoute() {
      switch ( true ) {
        case url.endsWith( '/api/current' ) && method === 'GET':
          return getSubscription();
        case url.endsWith( '/api/current' ) && method === 'PUT':
          return updateSubscription();
        case url.endsWith( '/api/preview' ) && method === 'GET':
          return getSummaryDetails();
        default:
          // pass through any requests not handled above
          return next.handle( request );
      }
    }

// route functions

    function getSubscription() {
      return ok( subscriptions.current );
    }

    function updateSubscription() {
      subscriptions.previous = {
        plan : subscriptions.current.plan,
        name : subscriptions.current.name,
        seats : subscriptions.current.seats,
        cost : subscriptions.current.cost,
      };
      subscriptions.current = body;
      return ok( subscriptions.current );
    }

    function getSummaryDetails() {
      return ok( subscriptions );
    }

    // helper functions

    function ok( responseBody? ) {
      return of( new HttpResponse( { status : 200, body : responseBody } ) );
    }

    function unauthorized() {
      return throwError( { status : 401, error : { message : 'Unauthorized' } } );
    }

    function error( message ) {
      return throwError( { error : { message } } );
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide : HTTP_INTERCEPTORS,
  useClass : FakeBackendInterceptor,
  multi : true
};
