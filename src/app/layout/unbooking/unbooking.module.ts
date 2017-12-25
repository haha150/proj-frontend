import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnBookingComponent} from './unbooking.component';
import { UnBookingRoutingModule } from './unbooking-routing.module';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        UnBookingRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot(),
        FormsModule
    ],
    declarations: [UnBookingComponent],
})
export class UnBookingModule { }
