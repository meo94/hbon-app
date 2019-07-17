import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import AppRouter from './views/routes';
import withAuthentication from './views/components/withAuthentication';

import { doListenToMessages, doRemoveListenToMessages } from '../app/redux/messages';

class App extends React.Component {
    componentDidMount() {
        this.props.onListenToMessages();
    }

    componentWillUnmount() {
        this.props.onRemoveListenToMessages();
    }

    render() {
        return (
            <div>
                <AppRouter />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onListenToMessages: () => dispatch(doListenToMessages()),
    onRemoveListenToMessages: () => dispatch(doRemoveListenToMessages()),
});

export default compose(
    withAuthentication,
    connect(null, mapDispatchToProps),
)(App);