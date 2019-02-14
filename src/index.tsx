import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import TodoListContainer from './components/TodoListContainer';
import configureStore from './store/configureStore';
import './styles.css';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <TodoListContainer />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
