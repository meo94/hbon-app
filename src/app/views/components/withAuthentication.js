import React from 'react';
import { connect } from 'react-redux';

import { onAuthUserListener } from '../../services/auth';
import { doSetAuthUser } from '../../redux/session/actions';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.props.onSetAuthUser(JSON.parse(localStorage.getItem('hbon.authUser')));
        }

        componentDidMount() {
            this.listener = onAuthUserListener(authUser => {
                localStorage.setItem('hbon.authUser', JSON.stringify(authUser));
                this.props.onSetAuthUser(authUser);
            }, () => {
                localStorage.removeItem('hbon.authUser');
                this.props.onSetAuthUser(null);
            });
        }

        componentWillUnmount() {

        }

        render() {
            return <Component {...this.props} />
        }
    }

    const mapStateToProps = state => ({});
    const mapDispatchToProps = dispatch => ({
        onSetAuthUser: authUser => dispatch(doSetAuthUser(authUser)),
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(WithAuthentication);
}

export default withAuthentication;