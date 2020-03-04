import { async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { planOptions, UpdateSubscriptionsComponent } from './update-subscriptions.component';
import { UpdateSubscriptionsModule } from 'src/app/update-subscriptions/update-subscriptions.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { SubscriptionProperties } from 'src/app/fake-backend';
import { UpdateSubscriptionsService } from 'src/app/update-subscriptions/update-subscriptions.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

const fakeProperties : SubscriptionProperties = {
  plan : 'good',
  name : 'Good',
  seats : 5,
  cost : 50,
};

fdescribe( 'UpdateSubscriptionsComponent', () => {
  let component : UpdateSubscriptionsComponent;
  let fixture : ComponentFixture<UpdateSubscriptionsComponent>;
  let injector : Injector;
  let service : UpdateSubscriptionsService;
  let router : Router;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      imports: [
        UpdateSubscriptionsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ]
    } )
    .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent(UpdateSubscriptionsComponent);
    component = fixture.componentInstance;
    injector = getTestBed();
    service = injector.get( UpdateSubscriptionsService );
    router = injector.get( Router );
    fixture.detectChanges();
  });

  describe( 'ngOnInit()', () => {
    it( 'should get current subscription, set it, and update form controls', fakeAsync( () => {
      const getSubsSpy : jasmine.Spy = spyOn( service, 'getCurrentSubscription' )
        .and.returnValue( of( fakeProperties ) );
      const seatsControlSpy : jasmine.Spy = spyOn( ( component as any ).seatsControl, 'setValue' );
      const loadingSubjectSpy : jasmine.Spy = spyOn( ( component as any ).loadingSubject, 'next' );
      const planControlSpy : jasmine.Spy = spyOn( ( component as any ).planOptionsControl, 'setValue' );
      component.ngOnInit();
      expect( getSubsSpy ).toHaveBeenCalled();
      tick();
      expect( seatsControlSpy ).toHaveBeenCalledWith( fakeProperties.seats );
      expect( planControlSpy ).toHaveBeenCalledWith( planOptions[ fakeProperties.plan ] );
      expect( ( component as any ).currentSubscriptions ).not.toBeUndefined();
      expect( loadingSubjectSpy ).toHaveBeenCalledWith( false );
    } ) );
  } );

  describe( 'getErrorMessage()', () => {
    it( 'should return appropriate error messages', () => {
      let errorObj : any = {
        errors : {
          required : true,
        },
      };
      expect( component.getErrorMessage( errorObj ) ).toBe( 'This field is required.' );
      errorObj = {
        errors : {
          min : true,
        },
      };
      expect( component.getErrorMessage( errorObj ) ).toBe( 'At least one seat must be selected.' );
    } );
  } );

  describe( 'updateSubscription()', () => {
    it( 'should pass properties from form controls to update endpoint', fakeAsync( () => {
      component.planOptionsControl.setValue( 'Good', { emitEvent : false } );
      component.seatsControl.setValue( 10, { emitEvent : false } );
      const updateSpy : jasmine.Spy = spyOn( service, 'update' ).and.returnValue( of( {} ) );
      const routerSpy : jasmine.Spy = spyOn( router, 'navigate' );
      component.updateSubscription();
      expect( updateSpy ).toHaveBeenCalledWith( {
        plan : 'good',
        name : 'Good',
        seats : 10,
        cost : 100
      } );
      tick();
      expect( routerSpy ).toHaveBeenCalledWith( [ '/summary' ] );
    } ) );
  } );
} );
