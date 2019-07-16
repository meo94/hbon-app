import React from 'react';
import { connect } from 'react-redux';

import { doListenToMessages, doRemoveListenToMessages } from '../../redux/messages';

const INIT_LOCAL_STATE = {};
class ClassroomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_LOCAL_STATE };
    }

    componentDidMount() {
       this.props.onListenToMessages();
    }

    componentWillUnmount() {
        this.props.onRemoveListenToMessages();
    }

    render() {
        return (
            <div>
                <h2>Classroom</h2>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    onListenToMessages: () => dispatch(doListenToMessages()),
    onRemoveListenToMessages: () => dispatch(doRemoveListenToMessages()),
});
export default connect(null, mapDispatchToProps)(ClassroomPage);