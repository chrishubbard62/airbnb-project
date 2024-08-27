// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import './index.css'
import SpotsContainer from './components/SpotsContainer';
import SpotDetailsContainer from './components/SpotDetailsContainer';
import SpotForm from './components/SpotForm';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsContainer current={false}/>
      },
      {
        path: '/:spotId',
        element: <SpotDetailsContainer />
      },
      {
        path: '/spots/new',
        element: <SpotForm newSpot={true}/>
      },
      {
        path: '/spots/current',
        element: <SpotsContainer current={true} />
      },
      {
        path: '/spots/:id/edit',
        element: <SpotForm newSpot={false}/>
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
