This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Redux
* You might already know redux, it's often named together with react but it's a standalone third party library.

* It is a library often used in react projects  to make state management, the management of application state easier because that can be hard in more complex react projects.

* We already saw that in our course project, there we already had some cases like where we have to pass data around through query props, where state management became unnecessarily difficult.

* Therefore in this module, we'll learn about redux, a solution to this problem which can help us make our state manageble again.

* For that, let's first understand what exactly state is and what exactly redux then is and how it works.

### State
So what is state?

* State for example are the ingredients we added to our burger, that's part of our application state, the application state of our burger builder application.The information, which ingredients we added is crucial because it determines what we need to render to the screen,how should our burger preview look like there?

* It's also important behind the scenes when we store that burger on a server and we need to submit all these ingredients in the HTTP request. Another example would be the question, whether the user is authenticated or not,that can be super important as it might determine the options we're showing in the menu or the access we're granting to certain components.

* Also interesting is UI statelike is a given modal open, is a backdrop open, should it be open? That's super important too, it's less about data like ingredients and user authentication is, it's more about our pure UI only state.

* And of course the list goes on and on,you can add more and more examples here,now these really just are some examples. What's now so complex about state?
Why do we need extra library for that?Let's take a closer look.

* Passing Query from component A to component B can very difficult and we have to use routing query parameter for that. but not very elegant way.

* why we should not save state in global variable ?? why do we have to take complicated routing with query parameter. The reason is that react's reactivity system doesn't react to changes in some global variable you defined. and its good that doesn't that makes its efficient.

* However the global store is someting interesting , thats exactly what react is about.

### Redux flow 
* How does redux manage data and how does it updates data.

#### Central store
* This store stores the entire application state.you can think about like a giant javascript object.

* In React component - wants to get the apps state. we can't directly get state form central store and  that would not be picked by react's reactivity system

#### Actions
* First building blocks besides the central store are actions which are dispatched from your javascript code (React app). Action is just a information package in the end with a type something like add ingredient or remove ingredient.

* Possibly it also holds the "payload" for example the action add ingredient we need to also pass the information which ingredient. So its infromation package sending to the redux.

* This action doesn't directly reach the central store, this action don't have any logic just information. like message...

#### Reducers
* The thing that changing the store is "Reducers" (multiple reducers into one root reducer), Which is directly connected to the store in the end.

* So the "Actions" reaches the "Reducer", since the action contains the type , the reducers  can checks the type of action. eg addIngredients

* And we then define logic for the type of action in the reducer.

* Reducer in the end receives the action (Pure sync functions) and updates the state. it has to execute sync code only no side effect no HTTP request...

* So reducer is just input in and output out no delay...

* Reducer updated the Central store with new state and replaces the old state, and that has to be done in a immutable way, ie even the old state will add as new object. beacause objects are reference type in Javascript , so we want to make sure we don't accidentlty make changes in the old one.

Now the store is updated with new updated state.

#### Subscription model
* How do get back the updated state to the component from central store. for that we use the subcription model.

* The store triggers all the subcriptions whenever the state changes. 

* And then our component can subscribe to store's update and then it receives the update automatically. This is how simple it is!!

* It works through the subcription model , in simply say hey!! i want to get notified whenever the state changes.

* and also hey!! i want to get update the state and here is my action describes the plan. This is the redux flow.




