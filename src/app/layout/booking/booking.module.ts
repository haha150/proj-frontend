import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingComponent} from './booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { PageHeaderModule } from './../../shared';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        BookingRoutingModule,
        PageHeaderModule,
        NgbModule.forRoot(),
        FormsModule
    ],
    declarations: [BookingComponent],
})
export class BookingModule { }
