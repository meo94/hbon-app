import React from 'react';
import { connect } from 'react-redux';

// import store from '../../../redux/store';
import {
    doIncreaseCounter,
    doDecreaseCounter,
    doResetCounter
} from '../../../redux/example/counter/actions';

const INIT_STATE = {
    inputNumber: 1,
};

class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INIT_STATE };
    }

    onChange = event => {
        event.preventDefault();

        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // onIncreaseCounter = value => store.dispatch(doIncreaseCounter(value));
    // onDecreaseCounter = value => store.dispatch(doDecreaseCounter(value));
    // onResetCounter = () => store.dispatch(doResetCounter());

    render() {
        const { onIncreaseCounter, onDecreaseCounter, onResetCounter, count, limit } = this.props;

        const inputNumber = Number(this.state.inputNumber);
        const increaseDisabled = limit < count + inputNumber;
        const decreaseDisabled = count - inputNumber < 0;

        return (
            <div>
                <h2>Counter (Limit {limit} )</h2>
                <input type='number' name="inputNumber" value={inputNumber} onChange={this.onChange} />
                <br />
                <button disabled={decreaseDisabled} onClick={() => onDecreaseCounter(inputNumber)}>-</button>
                <span>{count}</span>
                <button disabled={increaseDisabled} onClick={() => onIncreaseCounter(inputNumber)}>+</button>

                <button onClick={onResetCounter}>Reset</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    count: state.example.counter.count,
    limit: state.example.counter.limit,
});

const mapDispatchToProps = dispatch => ({
    onIncreaseCounter: value => dispatch(doIncreaseCounter(value)),
    onDecreaseCounter: value => dispatch(doDecreaseCounter(value)),
    onResetCounter: () => dispatch(doResetCounter()),
});
export default connect(
    mapStateToProps, 
    mapDispatchToProps,
)(Counter);