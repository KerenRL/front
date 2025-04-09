import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import PerfumeView from '../../features/perfume/presentation/pages/PerfumeView';
import StoreView from '../../features/store/presentation/pages/StoreView';

export const navigationWrapper = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <PerfumeView /> },
      { path: '/stores', element: <StoreView /> },
    ],
  },
]);