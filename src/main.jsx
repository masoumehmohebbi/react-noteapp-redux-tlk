import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './features/store.js';
import Providers from './components/Providers.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Providers>
      <App />
    </Providers>
  </Provider>,
);
