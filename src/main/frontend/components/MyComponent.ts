import {Component, View} from 'angular2/angular2'
import {MyTable} from 'components/MyTable'

@Component({
    selector: 'my-app'
})
@View({
    templateUrl: 'templates/MyComponent.html',
    directives: [MyTable]
})
export class MyComponent {
    name:string;
    state:boolean;

    constructor() {
        this.name = 'Alice';
        this.state = true;
    }

    changeName() {
        if (this.state) {
            this.name = 'Bob';
        } else this.name = 'Alice';

        this.state = !this.state;

    }

}