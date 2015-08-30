import { Component, View } from 'angular2/angular2';
import { Router,RouteConfig,RouterOutlet,RouterLink } from 'angular2/router';
import {MyComponent} from 'components/MyComponent'
import {MyTable} from 'components/MyTable'
import {Hello} from 'components/Hello'

@Component({
    selector: 'app'
})
@View({
    directives: [RouterOutlet, RouterLink],
    template: `
    <nav>
        <button [router-link]=["/view.home"]>Start</button>
        <button [router-link]=["/view.table"]>Table</button>
        <button [router-link]=["/view.hello"]>Hello</button>
    </nav>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
@RouteConfig([
    {path: '/', component: MyComponent, as: 'view.home'},
    {path: '/app/table', component: MyTable, as: 'view.table'},
    {path: '/app/hello', component: Hello, as: 'view.hello'}
])
export class App {

}