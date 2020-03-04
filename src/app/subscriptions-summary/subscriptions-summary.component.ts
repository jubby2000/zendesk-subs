import { Component, OnInit } from '@angular/core';
import { SubscriptionsSummaryService } from 'src/app/subscriptions-summary/subscriptions-summary.service';
import { SubscriptionProperties, Subscriptions } from 'src/app/fake-backend';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component( {
  selector : 'subscriptions-summary',
  templateUrl : './subscriptions-summary.component.html',
  styleUrls : [ './subscriptions-summary.component.scss' ]
})
export class SubscriptionsSummaryComponent implements OnInit {
  private prevSubscriptionSubject : Subject<SubscriptionProperties> = new Subject<SubscriptionProperties>();
  public prevSubscription$ : Observable<SubscriptionProperties> = this.prevSubscriptionSubject.asObservable();
  private currentSubscriptionSubject : Subject<SubscriptionProperties> = new Subject<SubscriptionProperties>();
  public currentSubscription$ : Observable<SubscriptionProperties> = this.currentSubscriptionSubject.asObservable();
  private loadingSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>( true );
  public loading$ : Observable<boolean> = this.loadingSubject.asObservable();

  constructor(
    private subscriptionsSummaryService : SubscriptionsSummaryService,
  ) {}

  public ngOnInit() : void {
    this.subscriptionsSummaryService.getPrevAndCurrentSubscriptions()
      .subscribe( ( subscriptions : Subscriptions ) => {
        this.prevSubscriptionSubject.next( subscriptions.previous );
        this.currentSubscriptionSubject.next( subscriptions.current );
        this.loadingSubject.next( false );
    } );
  }

}
