import { Router, Route, ReactLocation } from '@tanstack/react-location';
import { Root } from '@features/mics/Root';

const routes: Route[] = [{ path: '/', element: <Root /> }];

const location = new ReactLocation();

export const AppRoutes = () => {
  return <Router routes={routes} location={location} />;
};
