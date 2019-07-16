import React from 'react';
import { connect } from 'react-redux';

// import { doListenToFirebaseMessages } from '../../redux/shared/firebaseActions';
import { doListenToMessages } from '../../redux/shared/firestoreActions';

const INIT_LOCAL_STATE = {};

class ClassroomPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_LOCAL_STATE };
    }

    componentDidMount() {
        // this.props.onListenToFirebaseMessages();
        this.props.onListenToMessages();
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
    // onListenToFirebaseMessages: () => dispatch(doListenToFirebaseMessages())
    onListenToMessages: () => dispatch(doListenToMessages()),
});
export default connect(null, mapDispatchToProps)(ClassroomPage);