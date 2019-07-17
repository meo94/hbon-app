import React from 'react';
import { connect } from 'react-redux';

import {
    doSelectActivity,
    doNextActivity, doPreviousActivity,
} from '../../../redux/study/actions';

import {
    selectCurrentActivity, selectCurrentActivityAttempts, selectUnitActivities,
} from '../../../redux/study/selectors';

class ActivityBoard extends React.Component {
    constructor(props) {
        super(props);
    }

    onClickSelect = (activityId) => {
        this.props.onSelectActivity(activityId);
    }

    onShowExitActivityDialog = () => {
        console.log('Show Exit Activity Dialog');

    }

    render() {
        const { currentActivity, unitActivities } = this.props;

        return (
            <div>
                <div>
                    <h2>Unit Activity</h2>
                    {unitActivities && unitActivities.length > 0 &&
                        (<ul>
                            {unitActivities.map(activity =>
                                (<li key={activity.id}>
                                    <strong>Id: </strong>{activity.id}
                                    <strong>CourseId: </strong>{activity.courseId}
                                    <strong>UnitId: </strong>{activity.unitId}
                                    <strong>Name: </strong>{activity.name}
                                    <button onClick={() => this.onClickSelect(activity.id)}>Select</button>
                                </li>)
                            )}
                        </ul>)
                    }
                </div>

                <div>
                    <h2>Control Activity</h2>
                    <button onClick={this.props.onPreviousActivity}>Previous</button>
                    <button onClick={this.props.onNextActivity}>Next</button>
                    <button>Redo</button>
                </div>

                <div>
                    <h2>Selected Activity: {currentActivity.id}</h2>
                    <strong>CourseId: </strong>{currentActivity.courseId}
                    <strong>UnitId: </strong>{currentActivity.unitId}
                    <strong>Name: </strong>{currentActivity.name}
                    <br />
                    <button>Play</button>
                    <button>Pause</button>
                    <button>Exit</button>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentActivity: selectCurrentActivity(state),
    currentActivityAttempt: selectCurrentActivityAttempts(state),
    unitActivities: selectUnitActivities(state),
});

const mapDistpacthToProps = dispatch => ({
    onSelectActivity: (id) => dispatch(doSelectActivity(id)),
    onNextActivity: () => dispatch(doNextActivity()),
    onPreviousActivity: () => dispatch(doPreviousActivity()),

    onExitActivity: () => dispatch()
});

export default connect(
    mapStateToProps, mapDistpacthToProps,
)(ActivityBoard);