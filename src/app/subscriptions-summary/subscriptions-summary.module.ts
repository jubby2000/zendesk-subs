import { NgModule } from '@angular/core';

import { SubscriptionsSummaryComponent } from 'src/app/subscriptions-summary/subscriptions-summary.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatProgressSpinnerModule } from '@angular/material';
import { fakeBackendProvider } from 'src/app/fake-backend';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubscriptionSummaryCardModule } from 'src/app/subscriptions-summary/subscription-summary-card/subscription-summary-card.module';

@NgModule( {
  imports : [
    MatCardModule,
    HttpClientModule,
    RouterModule,
    MatFormFieldModule,
    CommonModule,
    SubscriptionSummaryCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  entryComponents : [ SubscriptionsSummaryComponent ],
  exports : [ SubscriptionsSummaryComponent ],
  declarations : [ SubscriptionsSummaryComponent ],
  providers : [ fakeBackendProvider ],
} )
export class SubscriptionsSummaryModule {}
