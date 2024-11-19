import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './pages/MainPage.jsx'
import Layout from './layout/Layout.jsx'
import Students from './pages/Students.jsx'
import Form from './pages/Form.jsx'


const router = createBrowserRouter([
{
  path: '/',
  element: <Layout />,
  children: [
    {
      path:'/',
      element: <MainPage />
    },
    {
      path:'/students',
      element: < Students />
    },
    {
      path: '/students/add',
      element: <Form />
    }
]
}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {router} />
  </StrictMode>,
)