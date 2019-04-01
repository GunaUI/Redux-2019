This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Outsourcing the action type

* Here we are going to outsource action type as constant.
* Inside store create a file actions.js
```jsx
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';
```
* now we can import this action constant in our reducer.js file
```jsx
// here * represent import everything...
import * as actionTypes from './actions';

//Replace hard coded string , Now we can use action types from actions file.
const reducer = (state = initialState, action) => {
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
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({value: state.counter,id: new Date()})
            }
        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter((result,index) =>{
                return result.id !== action.resultElId
            });
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};
```
* Same hard-coded string in couter.js also can be replaced from constant this will avoid typo error.

```jsx
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onIncrementConstCounter: () => dispatch({type: actionTypes.ADD,value: 5}),
        onDecrementConstCounter: () => dispatch({type: actionTypes.SUBTRACT,value: 5}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    };
};
```







