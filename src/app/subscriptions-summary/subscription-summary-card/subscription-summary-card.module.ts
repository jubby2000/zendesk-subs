import { NgModule } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { SubscriptionSummaryCardComponent } from 'src/app/subscriptions-summary/subscription-summary-card/subscription-summary-card.component';
import { MatCardModule } from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule( {
  imports : [
    MatCardModule,
    CommonModule,
  ],
  exports : [ SubscriptionSummaryCardComponent ],
  declarations : [ SubscriptionSummaryCardComponent ],
  entryComponents : [ SubscriptionSummaryCardComponent ],
} )
export class SubscriptionSummaryCardModule {
}
