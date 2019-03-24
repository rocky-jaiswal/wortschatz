import Root from '../containers/Root';

interface RouteDefinition {
  sequence: number;
  exact: boolean;
  path: string;
  // tslint:disable-next-line:no-any
  component: any;
}

interface Routes {
  [propName: string]: RouteDefinition;
}

const routes: Routes = {
  root: {
    sequence: 1,
    component: Root,
    exact: true,
    path: '/'
  }
};

export default routes;
