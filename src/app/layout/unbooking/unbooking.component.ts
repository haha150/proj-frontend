import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { NodeService } from '../../shared/services/node.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component( {
    selector: 'app-tables, app-modal',
    templateUrl: './unbooking.component.html',
    styleUrls: ['./unbooking.component.scss'],
    animations: [routerTransition()],
    providers: [NodeService]
} )

export class UnBookingComponent implements OnInit {

    key: string;
    unbooked: boolean;
    message: string = null;

    constructor( public router: Router, private route: ActivatedRoute, private nodeService: NodeService) { }
    ngOnInit() {
        this.route.queryParams.subscribe( params => {
            this.key = params['key'];
        } );

        if ( this.key === null || this.key === undefined ) {
            this.router.navigate( ['/booking'] );
        } else {
          this.nodeService.unbookNode(this.key)
            .subscribe(
                data => {
                  this.unbooked = true;
                  this.message = data;
                },
                error => {
                  this.unbooked = false;
                  this.message = 'Failed to unbook node!';
                });
        }

        setTimeout(() => {
            this.router.navigate( ['/booking'] );
        }, 5000 );
    }

}
