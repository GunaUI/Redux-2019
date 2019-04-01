import * as actionTypes from './actions';

const initialState = {
    counter: 0,
    results:[]
}

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
            // const newArray = [...state.results]
            // newArray.splice(action.id,1)
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

export default reducer;