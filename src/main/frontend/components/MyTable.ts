import {Component, View, NgFor} from 'angular2/angular2';
import {TableItem} from 'interfaces/TableItem';

@Component({
    selector: 'my-table'
})
@View({
    templateUrl: 'templates/MyTable.html',
    directives: [NgFor]
})
export class MyTable {

    items:Array<TableItem>;
    lastId:number;

    constructor() {
        this.lastId = 1;
        this.items = [{
            id: this.lastId++,
            name: 'Alice'
        }];
    }

    addItem() {
        this.items.push({
            id: this.lastId++,
            name: (this.lastId % 2 === 0) ? 'Alice' : 'Bob'
        });
    }

}