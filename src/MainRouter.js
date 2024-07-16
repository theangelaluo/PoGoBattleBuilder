import { Route, Switch } from 'react-router-dom';
import React from 'react';
import App from './App';
import { TeamsPage } from './TeamsPage';

class MainRouter extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact={true} path="/" component={App} />
                <Route exact={true} path="/viewTeams" component={TeamsPage} />
            </Switch>
        )

    }  

}

export default MainRouter;