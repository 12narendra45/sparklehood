import './style.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import Mainapp from './Mainapp';



function App() {
  return (
    <Provider store={store}>
      <Mainapp/>
    </Provider>
  );
}

export default App;
