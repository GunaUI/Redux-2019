This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Updating-State-Immutably
* Lets dive into more state management, lets add new result state into reducer.js
```jsx
const initialState = {
    counter: 0,
    results:[]
}
```
* Now we are having one more state in reducer , how can we update and send the updated state
```jsx
const initialState = {
    counter: 0,
    results:[]
}

const reducer = (state = initialState, action) => {

    switch ( action.type ) {
        case 'INCREMENT':
                // One way->here new javascript object... with the updated copy state, its technically new object.
                const newState = Object.assign({}, state);
                newState.counter = state.counter + 1;
                return newState;
        case 'DECREMENT':
            return {
                // shorterway -> here we are spreading the old state ie all properties and values and the update the actual properties as per your need...
                // Do it immutably
                ...state,
                counter: state.counter - 1
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.value
            }
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.value
            }
        case 'STORE_RESULT':
            return {
                ...state,
                // concat() returns the new updated array with old array + data you updated...
                // Don't use push() if we do that we are chaning the original array.. eventhough you use state spread operator, that doesn't prevent you this is not a good practice
                // state.results.concat(state.counter) - snapshot of the counter and push it to the result array.
                results: state.results.concat({value: state.counter,id: new Date()})
            }
    }
    return state;
};
```

* Now we have to use it into our couter component , there we can bind  the new state to props.
```jsx
const mapStateToProps = state => {
    return {
        ctr: state.counter,
        // state.results refers to our reducer object.. which we are update and return from reducer...
        // storedResults we can access the results to our component JSX
        storedResults: state.results
    };
};
```
* Now we can use storedResults value
```jsx
<ul>
    {this.props.storedResults.map(strResult => (
        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
    ))}
</ul>
```
## Updating-Array-Immutably

```jsx
const mapDispatchToProps = dispatch => {
    return {
        onDeleteResult: (id) => dispatch({type: 'DELETE_RESULT', resultElId: id})
    };
};
```

```jsx
case 'DELETE_RESULT':
    // const newArray = [...state.results]
    // newArray.splice(action.resultElIds,1)
    const updatedArray = state.results.filter((result,index) =>{
        return result.id !== action.resultElId
    });
    return {
        ...state,
        results: updatedArray
    }
```

* Refer Immutable Update Patterns on reduxjs.org: http://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html






