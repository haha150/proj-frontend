import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
{ path: '', redirectTo: '/booking', pathMatch: 'full' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'booking', loadChildren: './booking/booking.module#BookingModule' },
            { path: 'unbook', loadChildren: './unbooking/unbooking.module#UnBookingModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
