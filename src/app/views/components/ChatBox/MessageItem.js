import React from 'react';

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { authUser, message, onRemoveMessage } = this.props;

        return (
            <li>
                <strong>{message.username}</strong>: {message.text}
                <button onClick={() => onRemoveMessage(message.id)}>Remove</button>
            </li>
        );
    }
}

export default MessageItem;