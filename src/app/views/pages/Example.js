import React from 'react';

import Counter from '../components/Counter';

const INIT_LOCAL_STATE = {};

class ExamplePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_LOCAL_STATE };
    }

    render() {
        return (
            <div>
                <h2>ExamplePage</h2>
                <Counter />
            </div>
        );
    }
}

export default ExamplePage;