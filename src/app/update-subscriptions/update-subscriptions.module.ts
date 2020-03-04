import { NgModule } from '@angular/core';

import { UpdateSubscriptionsComponent } from 'src/app/update-subscriptions/update-subscriptions.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { fakeBackendProvider } from 'src/app/fake-backend';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule( {
  imports : [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatTooltipModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports : [ UpdateSubscriptionsComponent ],
  declarations : [ UpdateSubscriptionsComponent ],
  entryComponents : [ UpdateSubscriptionsComponent ],
  providers : [ fakeBackendProvider ],
} )
export class UpdateSubscriptionsModule {}
