import React from 'react';

import MessageItem from './MessageItem';

const MessageList = (props) => {
    const { authUser, messages, onRemoveMessage } = props;

    return (
        <ul>
            {messages.map(mesage =>
                (<MessageItem authUser={authUser}
                    message={mesage}
                    onRemoveMessage={onRemoveMessage}
                    key={mesage.id}
                >
                </MessageItem>)
            )}
        </ul>
    );
}

export default MessageList;