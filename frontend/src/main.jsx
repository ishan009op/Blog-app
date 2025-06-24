import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Create from './Components/Create.jsx'
import Info from './Components/Info.jsx'
import Home from './Components/Home.jsx'
import Update from './Components/Update.jsx'
import Register from './Components/Register.jsx'
import Login from './Components/Login.jsx'

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[{
      path:'/',
      element:<Register/>,
},
{
  path:'/create',
  element:<Create/>
},
{
  path:'/home',
  element:<Home/>
},
{
  path:'/login',
  element:<Login/>
},
{
  path:'/info/:id',
  element:<Info/>
}
,
{
  path:'/update/:id',
  element:<Update/>
}
]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)
