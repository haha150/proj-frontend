import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map'
import { Node } from '../models/node';

@Injectable()
export class NodeService {

    constructor( private http: Http ) { }

    getNodes() {
        const headers = new Headers( { 'Content-Type': 'application/json' } );
        const options = new RequestOptions( { headers: headers } );
        return this.http.get( 'http://localhost:8080/rest/nodes', options )
            .map(( response: Response ) => response.json() );
    }

    addNode( node: Node ) {
        const headers = new Headers( { 'Content-Type': 'application/json' } );
        const options = new RequestOptions( { headers: headers } );
        return this.http.put( 'http://localhost:8080/rest/node/add', node, options )
            .map(( response: Response ) => response.json() );
    }

    deleteNode( node: Node ) {
        return this.http.delete( 'http://localhost:8080/rest/node/delete/' + node.id )
            .map(( response: Response ) => response.text() );
    }

    bookNode( node: Node, bookedBy: string, bookedUntil: string ) {
        const headers = new Headers( { 'Content-Type': 'application/json' } );
        const options = new RequestOptions( { headers: headers } );
        return this.http.post( 'http://localhost:8080/rest/node/book/' + node.id + '?bookedBy='
            + bookedBy + '&bookedUntil=' + bookedUntil, options )
            .map(( response: Response ) => response.json() );
    }

    editNode( node: Node ) {
        const headers = new Headers( { 'Content-Type': 'application/json' } );
        const options = new RequestOptions( { headers: headers } );
        return this.http.post( 'http://localhost:8080/rest/node/update', node, options )
            .map(( response: Response ) => response.json() );
    }

    unbookNode( key: string ) {
        return this.http.delete( 'http://localhost:8080/rest/node/unbook/' + key )
            .map(( response: Response ) => response.text() );
    }

}
