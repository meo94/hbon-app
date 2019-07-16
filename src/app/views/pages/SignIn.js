import React, { Fragment } from 'react';

import { doSignInWithEmailAndPassword } from '../../services/auth';

const INIT_STATE = {
    email: '',
    password: '',
    error: null,
    isProcessing: false,
}

class SignInPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INIT_STATE };
    }

    onSignIn = event => {
        event.preventDefault();
        this.setState({ isProcessing: true });
        const { email, password } = this.state;

        doSignInWithEmailAndPassword(email, password)
            .then(() => this.setState({ isProcessing: false }))
            .catch(error => this.setState({ error, isProcessing: false }));
    }

    onChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <Fragment>
                <form onSubmit={this.onSignIn}>
                    <input type='text' name='email' value={email} onChange={this.onChange} />
                    <input type='password' name='password' value={password} onChange={this.onChange} />
                    <button type='submit'>Sign In</button>
                    {error && <p><strong>{error.code}: </strong>{error.message}</p>}
                </form>
            </Fragment>
        )
    }
}

export default SignInPage;