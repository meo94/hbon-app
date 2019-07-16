import React from 'react';

import AppRouter from './views/routes';
import withAuthentication from './views/components/withAuthentication';

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <AppRouter />
            </div>
        );
    }
}

export default withAuthentication(App);