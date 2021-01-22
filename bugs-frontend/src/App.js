import logo from './logo.svg';
import './App.css';
import configureStore from "./store/configureStore";
// import StoreContext from './contexts/storeContext';
import { Provider } from "react-redux";
import BugsList from './components/BugsList';
import Bugs from "./components/Bugs";

const store = configureStore();

// Every components below StoreContext will be able to access to this store value
// function App() {
//   return (
//     <StoreContext.Provider value={store}>
//       <Bugs />
//     </StoreContext.Provider>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <Bugs />
//     </Provider>
//   );
// }

function App() {
  return (
    <Provider store={store}>
      <BugsList />
    </Provider>
  );
}

export default App;
