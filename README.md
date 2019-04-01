This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Combining the multiple reducers
* How to combine multiple reducers into single reducer...
* Let us split reducer.js into two seperate reducers one for counter reducer and another one for results reducer.
* store/reducers/counter.js

```jsx
import * as actionTypes from '../actions';

const initialState = {
    counter: 0
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.INCREMENT:
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value
            }
    }
    return state;
};

export default reducer;
```
* store/reducers/result.js
```jsx
import * as actionTypes from '../actions';

const initialState = {
    results: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};

export default reducer;
```

* Combine above two reducers into one ...
```jsx
//We need to import combineReducers with createStore from redux
import { createStore , combineReducers} from 'redux';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

// Then we have to combine above two reducers into one with combineReducers
// here ctr and res is the global variable it can be accessed in component and containers, this global variable can't be accessed inside reducer.
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
```

* Change the corresponding global variable changes in other files too... to access the reducer values..
```jsx
const mapStateToProps = state => {
    return {
        storedCtr: state.ctr.counter,
        storedResults: state.res.results
    };
};
```

* Note:
```jsx
    // We have to sent current state to the reducer as payload value, this reducers don't have access to global variables...
    onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result})
```
* Refer : Types of state in Refer-Pdf folder... regarding when and where we have to user redux state and when to avoid
* Next refer redux assignment.







