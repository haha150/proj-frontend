import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnBookingComponent } from './unbooking.component';

const routes: Routes = [
    { path: '', component: UnBookingComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnBookingRoutingModule { }
