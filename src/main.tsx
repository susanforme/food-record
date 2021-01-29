import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloProvider } from '@apollo/client';
import client from './api';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import './assets/css/common.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
