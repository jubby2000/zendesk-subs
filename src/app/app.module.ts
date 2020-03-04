import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateSubscriptionsModule } from 'src/app/update-subscriptions/update-subscriptions.module';
import { SubscriptionsSummaryModule } from 'src/app/subscriptions-summary/subscriptions-summary.module';
import { RouterModule, Routes } from '@angular/router';
import { UpdateSubscriptionsComponent } from 'src/app/update-subscriptions/update-subscriptions.component';
import { SubscriptionsSummaryComponent } from 'src/app/subscriptions-summary/subscriptions-summary.component';

const appRoutes : Routes = [
  { path: 'update-subscription', component : UpdateSubscriptionsComponent },
  { path: 'summary', component : SubscriptionsSummaryComponent },
  { path: '',
    redirectTo: 'update-subscription',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports : [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UpdateSubscriptionsModule,
    SubscriptionsSummaryModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
