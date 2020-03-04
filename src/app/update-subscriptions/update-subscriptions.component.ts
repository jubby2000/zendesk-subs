import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UpdateSubscriptionsService } from 'src/app/update-subscriptions/update-subscriptions.service';
import { SubscriptionProperties } from 'src/app/fake-backend';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

export const planOptions = {
  basic : 'Basic',
  good : 'Good',
  better : 'Better',
  best : 'Best',
};

export const planCosts = {
  basic : 1,
  good : 10,
  better : 100,
  best : 1000
};

@Component( {
  selector : 'update-subscriptions',
  templateUrl : './update-subscriptions.component.html',
  styleUrls : [ './update-subscriptions.component.scss' ],
} )
export class UpdateSubscriptionsComponent implements OnInit, OnDestroy {
  public subscriptionForm : FormGroup = new FormGroup( {
    planOptionsControl : new FormControl( '', Validators.required ),
    seatsControl : new FormControl( null, [ Validators.required, Validators.min( 1 ) ] ),
  } );
  public planOptions : any = planOptions;
  private subscriptions : Subscription = new Subscription();
  private currentSubscriptions : SubscriptionProperties;
  private loadingSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>( true );
  public loading$ : Observable<boolean> = this.loadingSubject.asObservable();

  get subscriptionsUnchanged() : boolean {
    return this.currentSubscriptions.seats === this.seatsControl.value
      && this.currentSubscriptions.name === this.planOptionsControl.value;
  }

  get planOptionsControl() : FormControl {
    return this.subscriptionForm.get( 'planOptionsControl' ) as FormControl;
  }

  get seatsControl() : FormControl {
    return this.subscriptionForm.get( 'seatsControl' ) as FormControl;
  }

  get currentCost() : number {
    return ( this.seatsControl.value * planCosts[ this.planOptionsControl.value.toLowerCase() ] ) || 0;
  }

  constructor(
    private httpClient : HttpClient,
    private updateSubscriptionsService : UpdateSubscriptionsService,
    private router : Router,
  ) {}

  ngOnInit() {
    this.updateSubscriptionsService.getCurrentSubscription()
      .subscribe( ( currentSubscription : SubscriptionProperties ) => {
        this.loadingSubject.next( false );
        this.currentSubscriptions = currentSubscription;
        this.planOptionsControl.setValue( planOptions[ currentSubscription.plan ] );
        this.seatsControl.setValue( currentSubscription.seats );
      } );
  }

  public getErrorMessage( { errors } : FormControl ) : string {
    if ( errors ) {
      if ( errors.required ) {
        return 'This field is required.';
      }
      if ( errors.min ) {
        return 'At least one seat must be selected.';
      }
    }
  }

  public updateSubscription() : void {
    const planLowerCase : string = this.planOptionsControl.value.toLowerCase();
    const props : SubscriptionProperties = {
      plan : planLowerCase,
      name : this.planOptionsControl.value,
      seats : this.seatsControl.value,
      cost : this.seatsControl.value * planCosts[ planLowerCase ],
    };
    this.updateSubscriptionsService.update( props )
      .subscribe( () => {
        this.router.navigate( [ '/summary' ] );
      } );
  }

  public ngOnDestroy() : void {
    this.subscriptions.unsubscribe();
  }
}
