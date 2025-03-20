import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Componenet/Layout'
import Error from './Componenet/Error'
import Home from './Componenet/Home'
import Profile from './Componenet/Profile'
import Comments from './Componenet/Comments'
import Register from './Componenet/Register'
import Login from './Componenet/Login'
import MyProfile from './Componenet/MyProfile'


import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import CommentContextProvider from './Context/CommentContext'
import CreatePost from './Componenet/CreatePost'
import UpdatePost from './Componenet/UpdatePost'
import Favpost from './Componenet/Favpost'
import RestPasswordPart3 from './Componenet/RestPasswordPart3'


function App() {

  let routes = createBrowserRouter([{
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/myProfile", element: < MyProfile /> },
      { path: "/comments/:id", element: <Comments /> },
      { path: "/createPost", element: <CreatePost /> },
      { path: "/favorite", element: < Favpost /> },
      { path: "/updatePost/:id", element: <UpdatePost /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/change", element: <RestPasswordPart3 /> },
      { path: "*", element: <Error /> },

    ]
  }])

  const queryClient = new QueryClient()


  return (
    <>
    <CommentContextProvider>
   
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes}>


        </RouterProvider>
      </QueryClientProvider>
   
      </CommentContextProvider>
    </>
  )
}

export default App
