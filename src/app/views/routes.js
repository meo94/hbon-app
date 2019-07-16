import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ExamplePage from './pages/Example';
import HomePage from './pages/Home';
import SignInPage from './pages/SignIn';
import ClassroomPage from './pages/Classroom';

export const ROUTES = {
    ExamplePage: '/example',

    HomePage: '/home',
    SignInPage: '/signin',
    ClassroomPage: '/classroom',
}

const AppRouter = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path={ROUTES.ExamplePage} component={ExamplePage} />

            <Route path={ROUTES.HomePage} component={HomePage} />
            <Route path={ROUTES.SignInPage} component={SignInPage} />
            <Route path={ROUTES.ClassroomPage} component={ClassroomPage} />
        </Switch>
    </Router>
);

export default AppRouter;