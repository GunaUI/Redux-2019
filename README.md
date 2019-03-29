This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Setting up reducer and store - Basic Example
* install redux to our project.

```jsx
npm install --save redux
```
* Lets understand the basic flow of redux using simple example
    * Reducer
    * Store
    * Subscription
    * Dispatching Action
* Since react is a standalone state container let us run with node.js
* To run this file in node

```jsx
node redux-basics.js
```
```jsx
//  Node syntax to include redux
const redux = require('redux');
// Create constant name createStore help us to create a new redux store for us
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

// Reducer
// Reducer is strongly connect to the store , which is the only thing that will update the state in the end.
// This reducer will receive two arguments one is current state and action.
// Then finally the function has to return updated state.
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }
    return state;
};

// Store
// Here we are executing the create store..
// Store needs to be initialised with the reducer
// We need to pass the reducer to the createStore function.
const store = createStore(rootReducer);
// Verifying the state , it will pull out the state from the store.
console.log(store.getState());

// Subscription
// subscribe is executed whenever the state updated...
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
// Dispatch function needs to have a javascript object with "type" : "action", name "type" need not to be changed.ie don't mistype as any other key...
// INC_COUNTER , ADD_COUNTER are actions and "value: 10" is optional payload.
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
```

## Connecting react application to redux

* Now we already installed redux and with that we can create a store.
* This store should be created right before our application starts. so index.js is the right place.
* To connect react with redux we need react-redux package , It allow us to hook up our redux store to react application
```jsx
npm install --save react-redux
```
```jsx
// import createStore function from redux
import { createStore } from 'redux';
// Special package to connect redux to react.
import { Provider } from 'react-redux';

import reducer from './store/reducer';
// store needs reducer ...
const store = createStore(reducer);
// We wrap our app component inside Provider component from react-redux and then hook our redux store.
// Provider is kind of helper component that allow us to inject redux's store to react component.
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

```
* Now we need reducer (logic) for our store.

```jsx
const initialState = {
    counter: 0
}
const reducer = (state = initialState, action) => {
    if (action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1
        }
    }
    return state;
};
export default reducer;
```
* Now we have to connect our counter container with the store.

* As of now counter.js manages its state on their own.But actually we have to receive state from the redux.

```jsx
// connect is a kind of function which returns a function, we will use wrap export actually.
import { connect } from 'react-redux';
// mapStateToProps return State from redux , from that we could get access to "counter" from global state managed by redux .(we setup in reducer.js)
const mapStateToProps = state => {
    return {
        ctr: state.counter
    };
};
// dispating manages which kind of actions i want to dispatch in this container
const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: 'INCREMENT'}),
        onDecrementCounter: () => dispatch({type: 'DECREMENT'}),
        onIncrementConstCounter: () => dispatch({type: 'ADD',value: 5}),
        onDecrementConstCounter: () => dispatch({type: 'SUBTRACT',value: 5})
    };
};
//We will pass two pieces of information, state and action.
export default connect(mapStateToProps, mapDispatchToProps)(Counter);

```
* Now we have to access "counter" state from "ctr" as follows

```jsx
<CounterOutput value={this.props.ctr} />
```
* We could call "onIncrementCounter" as follows

```jsx
<CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
<CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
<CounterControl label="Add 5" clicked={this.props.onIncrementConstCounter}  />
<CounterControl label="Subtract 5" clicked={this.props.onDecrementConstCounter}  />
```
* we can improve our reducer logic little bit
```jsx
const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {

    switch ( action.type ) {
        case 'INCREMENT':
            return {
                counter: state.counter + 1
            }
        case 'DECREMENT':
            return {
                counter: state.counter - 1
            }
        case 'ADD':
            return {
                counter: state.counter + action.value
            }
        case 'SUBTRACT':
            return {
                counter: state.counter - action.value
            }
    }
    return state;
};

export default reducer;
```







