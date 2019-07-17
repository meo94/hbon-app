import React from 'react';

import ActivityBoard from '../components/ActivityBoard';
import ChatBox from '../components/ChatBox';

const INIT_LOCAL_STATE = {};
class ClassroomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_LOCAL_STATE };
    }

    render() {
        return (
            <div>
                <h2>Classroom</h2>
                <ActivityBoard/>
                <ChatBox />
            </div>
        );
    }
}

export default ClassroomPage;