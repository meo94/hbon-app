import React from 'react';

const INIT_LOCAL_STATE = {};

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_LOCAL_STATE };
    }

    render() {
        return (
            <div>
                <h2>HomePage</h2>
            </div>
        );
    }
}

export default HomePage;