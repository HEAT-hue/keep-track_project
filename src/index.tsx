import ReactDOM from 'react-dom/client';
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryProvider } from './contexts';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// // Set some default config for all queries
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,        // Data becomes stale immediately
//       cacheTime: 6 * (60 * 1000)    // 6 mins of cache data
//     }
//   }
// });

root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <QueryProvider>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
// root.render(
//   <BrowserRouter>
//     {/* <React.StrictMode> */}
//     <QueryClientProvider client={queryClient}>
//       <App />
//       <ReactQueryDevtools initialIsOpen={false} />
//     </QueryClientProvider>
//     {/* </React.StrictMode> */}
//   </BrowserRouter>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
