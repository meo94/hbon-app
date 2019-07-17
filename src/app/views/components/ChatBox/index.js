import React from 'react';
import { connect } from 'react-redux';

import MessageList from './MessageList';
import {
    doAddMessage, doRemoveMessage,
    selectMessages
} from '../../../redux/messages';

const INIT_STATE = {
    inputText: '',
}

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE };
    }

    onChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    onAddMessage = (event) => {
        event.preventDefault();

        doAddMessage({
            text: this.state.inputText,
            user: this.props.authUser,
        });
    }

    onRemoveMessage = id => {
        doRemoveMessage(id);
    }

    render() {
        const { messages, authUser } = this.props;
        const { inputText } = this.state;

        return (
            <div>
                {messages &&
                    (<MessageList authUser={authUser}
                        messages={messages}
                        onRemoveMessage={this.onRemoveMessage}
                    />)
                }
                {!messages && (<div>There are no messages...</div>)}
                <form onSubmit={this.onAddMessage}>
                    <input type='text' name='inputText' value={inputText} onChange={this.onChange} />
                    <button type='submit'>Send</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authUser: state.authUser,
    messages: selectMessages(state),
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps, mapDispatchToProps,
)(ChatBox);