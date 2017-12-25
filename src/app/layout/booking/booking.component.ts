import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Node } from '../../shared/models/node';
import { ModalDismissReasons, NgbModal, NgbModalRef, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NodeService } from '../../shared/services/node.service';

@Component( {
    selector: 'app-tables, app-modal',
    templateUrl: './booking.component.html',
    styleUrls: ['./booking.component.scss'],
    animations: [routerTransition()],
    providers: [NodeService]
} )

export class BookingComponent implements OnInit {

    closeResult: string;
    modalNodeRef: NgbModalRef;
    modelNode: any = {};
    selectedNode: Node;
    modelUntilDate: any;
    nodes: Node[];
    allPermissions = false;
    minDate: NgbDateStruct;

    constructor( private modalService: NgbModal, private nodeService: NodeService ) { }
    ngOnInit() {
        const d = new Date();
        this.minDate = { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
        this.getNodes();
    }

    getNodes() {
        this.nodeService.getNodes()
            .subscribe(
            data => {
                this.nodes = data;
                if ( this.nodes === null ) {
                    this.nodes = [];
                    this.allPermissions = false;
                } else {
                    this.allPermissions = true;
                }
            },
            error => {
                console.log( 'Failed to get nodes: ' + error );
                this.nodes = [];
                this.allPermissions = false;
            } );
    }

    openModal( modal ) {
        this.modelNode = {};
        this.modelUntilDate = null;
        this.modalNodeRef = this.modalService.open( modal );
        this.modalNodeRef.result.then(( result ) => {
            this.closeResult = `Closed with: ${result}`;
        }, ( reason ) => {
            this.closeResult = `Dismissed ${this.getDismissReason( reason )}`;
        } );
    }

    setClickedRow( node ) {
        if ( node.isSelected === true ) {
            node.isSelected = false;
            this.selectedNode = null;
        } else {
            if ( node.status === 'FREE' ) {
                node.isSelected = true;
                this.selectedNode = node;
                this.resetCheckboxes( node.id );
            }
        }
    }

    resetCheckboxes( id ) {
        for ( let i = 0; i < this.nodes.length; i++ ) {
            if ( this.nodes[i].id !== id ) {
                this.nodes[i].isSelected = false;
            }
        }
    }

    isANodeSelected() {
        for ( let i = 0; i < this.nodes.length; i++ ) {
            if ( this.nodes[i].isSelected ) {
                return true;
            }
        }
        return false;
    }

    bookNode() {
        console.log( 'booking node..' + this.selectedNode.name );
        const date = this.modelUntilDate.year + '-' + this.modelUntilDate.month + '-' + this.modelUntilDate.day;
        this.nodeService.bookNode( this.selectedNode, this.modelNode.bookedBy, date )
            .subscribe(
            data => {
                this.updateNode( data );
                this.modalNodeRef.close();
            },
            error => {
                alert( 'Failed to book node: ' + error );
            } );
    }

    editNode() {
        this.nodeService.editNode( this.modelNode )
            .subscribe(
            data => {
                this.updateNode( data );
                this.modalNodeRef.close();
            },
            error => {
                alert( 'Failed to update node: ' + error );
            } );
    }

    deleteSelectedNode() {
        this.nodeService.deleteNode( this.selectedNode )
            .subscribe(
            data => {
                this.nodes.splice( this.getNodeIndex(), 1 );
                this.modalNodeRef.close();
            },
            error => {
                alert( 'Failed to delete node: ' + error );
            } );
    }

    addNode() {
        this.nodeService.addNode( this.modelNode )
            .subscribe(
            data => {
                data.status = 'FREE';
                this.nodes.push( data );
                this.modalNodeRef.close();
            },
            error => {
                alert( 'Failed to add node: ' + error );
            } );
    }

    setModelNode() {
        this.modelNode = Object.assign( {}, this.selectedNode );
    }

    updateNode( node: Node ) {
        for ( let i = 0; i < this.nodes.length; i++ ) {
            if ( this.nodes[i].id === node.id ) {
                this.nodes[i] = node;
                break;
            }
        }
    }

    getNodeIndex() {
        for ( let i = 0; i < this.nodes.length; i++ ) {
            if ( this.nodes[i].id === this.selectedNode.id ) {
                return i;
            }
        }
        return null;
    }

    getDismissReason( reason: any ): string {
        if ( reason === ModalDismissReasons.ESC ) {
            return 'by pressing ESC';
        } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
