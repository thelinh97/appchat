import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, } from "react-router-dom";
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './store'

var firebaseConfig = {
  apiKey: "AIzaSyDb5QXQk7BROScOYOZgsnZH5Uxueav0RS0",
  authDomain: "web-messenger-1f3cc.firebaseapp.com",
  databaseURL: "https://web-messenger-1f3cc.firebaseio.com",
  projectId: "web-messenger-1f3cc",
  storageBucket: "web-messenger-1f3cc.appspot.com",
  messagingSenderId: "6485573747",
  appId: "1:6485573747:web:623dfc5793444dbb286a06",
  measurementId: "G-PPPC9TDX16"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
 
window.store = store

ReactDOM.render(
    <Provider store={ store }>
      <Router>
          <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
