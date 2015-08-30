import {bootstrap,bind} from 'angular2/angular2';
import {routerInjectables,LocationStrategy, HTML5LocationStrategy} from 'angular2/router';
import {App} from 'components/App';

bootstrap(App, [
    routerInjectables,
    bind(LocationStrategy).toClass(HTML5LocationStrategy)
]);
