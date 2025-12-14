
import { routes } from './Route';
import { RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/useContext';

function App() {

  return (
    <>
      <AppProvider>
        <RouterProvider router={routes} />
      </AppProvider>
    </>
  )
}

export default App