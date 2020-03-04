import { Component, Input } from '@angular/core';

@Component( {
  selector : 'subscription-summary-card',
  templateUrl : './subscription-summary-card.component.html',
  styleUrls : [ './subscription-summary-card.component.scss' ],
} )

export class SubscriptionSummaryCardComponent {
  @Input() public name : string;
  @Input() public seats : number;
  @Input() public cost : number;
  @Input() public title : string;
  @Input() public planNameChanged : boolean;
  @Input() public seatsChanged : boolean;
}
