import { async, ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from '@angular/core/testing';
import { SubscriptionsSummaryComponent } from './subscriptions-summary.component';
import { SubscriptionsSummaryModule } from 'src/app/subscriptions-summary/subscriptions-summary.module';
import { SubscriptionsSummaryService } from 'src/app/subscriptions-summary/subscriptions-summary.service';
import { Injector } from '@angular/core';
import { of } from 'rxjs';
import { Subscriptions } from 'src/app/fake-backend';
import { RouterTestingModule } from '@angular/router/testing';

const fakeSubs : Subscriptions = {
  current : {
    plan : 'good',
    name : 'Good',
    seats : 5,
    cost : 50,
  },
  previous : {
    plan : 'best',
    name : 'Best',
    seats : 5,
    cost : 5000,
  }
};

describe( 'SubscriptionsSummaryComponent', () => {
  let component : SubscriptionsSummaryComponent;
  let fixture : ComponentFixture<SubscriptionsSummaryComponent>;
  let service : SubscriptionsSummaryService;
  let injector : Injector;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      imports : [
        SubscriptionsSummaryModule,
        RouterTestingModule,
      ],
    } )
    .compileComponents();
  } ) );

  beforeEach( () => {
    fixture = TestBed.createComponent( SubscriptionsSummaryComponent );
    component = fixture.componentInstance;
    injector = getTestBed();
    service = injector.get( SubscriptionsSummaryService );
    fixture.detectChanges();
  } );

  describe( 'ngOnInit()', () => {
    it( 'should get data and pass updates to current, previous, and loading subscriptions', fakeAsync( () => {
      const getSubsSpy : jasmine.Spy = spyOn( service, 'getPrevAndCurrentSubscriptions' )
        .and.returnValue( of( fakeSubs ) );
      const prevSubjectSpy : jasmine.Spy = spyOn( ( component as any ).prevSubscriptionSubject, 'next' );
      const currentSubjectSpy : jasmine.Spy = spyOn( ( component as any ).currentSubscriptionSubject, 'next' );
      const loadingSubjectSpy : jasmine.Spy = spyOn( ( component as any ).loadingSubject, 'next' );
      component.ngOnInit();
      expect( getSubsSpy ).toHaveBeenCalled();
      tick();
      expect( prevSubjectSpy ).toHaveBeenCalledWith( fakeSubs.previous );
      expect( currentSubjectSpy ).toHaveBeenCalledWith( fakeSubs.current );
      expect( loadingSubjectSpy ).toHaveBeenCalledWith( false );
    } ) );
  } );
} );
