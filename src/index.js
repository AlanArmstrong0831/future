import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App'
import { Provider as BusProvider } from './hooks/useBus'

// redux
import { Provider } from 'react-redux'
import store from './redux'

// styles
import 'antd/dist/antd.min.css';
// import '@/assets/icons/iconfont'
// import '@/styles/index.less'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    // <App />
  // </React.StrictMode>
  <BusProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </BusProvider>,
);

// ReactDOM.render(
//   <BusProvider>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </BusProvider>,
//   document.getElementById('root')
// )


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
