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
    selectAllItems,
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
            cities,
        } = this.props;
        const { name } = this.state;

        return (
            <div>
                <h2>Domain App</h2>
                <input type='text' name='name' value={name} onChange={this.onChange} />
                <button onClick={() => onAddItem('domain.cities', uuidv4(), { name })}>Add</button>

                <h3>Domain List</h3>
                {cities && cities.map(city =>
                    (<li key={city.id}>
                        <strong>Id</strong>: {city.id} |
                        <strong>Name</strong>: {city.name}
                        <button onClick={() => onModifyItem('domain.cities', city.id, { name })}>Update</button>
                        <button onClick={() => onRemoveItem('domain.cities', city.id)}>Remove</button>
                    </li>)
                )}

                <button onClick={() => onAddItems('domain.cities', [
                    { id: uuidv4(), value: { name: 'HN' } },
                    { id: uuidv4(), value: { name: 'HCM' } },
                    { id: uuidv4(), value: { name: 'DN' } },
                ]
                )}>Add Items</button>
                <button onClick={() => onModifyItems('domain.cities',
                    cities.slice(0, 3).map(city => {
                        return { id: city.id, value: { name } };
                    })
                )}>Update Items</button>

                <button onClick={() => onRemoveItems('domain.cities',
                    cities.slice(0, 3).map(city => city.id)
                )}>Remove Items</button>


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
    cities: selectAllItems(state, 'domain.cities'),
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