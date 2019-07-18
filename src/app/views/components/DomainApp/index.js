import React from 'react';
import uuidv4 from 'uuid/v4';
import { connect } from 'react-redux';

import {
    doAddItemToDomain,
    doModifyItemToDomain,
    doRemoveItemToDomain,

    doAddItemsToDomain,
    doModifyItemsToDomain,
    doRemoveItemsToDomain,
} from '../../../redux/shared/domain';

const INIT_STATE = {
    name: '',
}

class DomainApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INIT_STATE };
    }

    render() {
        const {
            onAddItem, onModifyItem, onRemoveItem,
            onAddItems, onModifyItems, onRemoveItems,
        } = this.props;
        return (
            <div>
                <input type='text' name='name' value={name} onChange={this.onChange} />
                <button onClick={}>Add</button>
            </div>
        );
    }

    onChange = event => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
}

const mapStateToProps = state => ({
    cities: state.domain.cities,
});

const mapDispatchToProps = dispatch => ({
    onAddItem: (node, id, value) => dispatch(doAddItemToDomain(node, id, value)),
    onModifyItem: (node, id, value) => dispatch(doModifyItemToDomain(node, id, value)),
    onRemoveItem: (node, id) => dispatch(doRemoveItemToDomain(node, id)),
    onAddItems: (node, items) => dispatch(doAddItemsToDomain(node, items)),
    onModifyItems: (node, items) => dispatch(doModifyItemsToDomain(node, items)),
    onRemoveItems: (node, ids) => dispatch(doRemoveItemsToDomain(node, ids)),
});

export default connect(
    mapStateToProps, mapDispatchToProps
)(DomainApp)