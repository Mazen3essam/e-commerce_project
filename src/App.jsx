import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Layout from "./components/Layout/Layout";
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CartContextProvider from './context/cartContext';
import { Toaster } from 'react-hot-toast';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import Wishlist from './components/Wishlist/Wishlist';

let query = new QueryClient()

let x = createBrowserRouter([
  { path: "", element: <Layout/>, children:[
    { index: true, element:<Home/>},
    { path: "cart", element:<ProtectedRoute><Cart/></ProtectedRoute>},
    { path: "wishlist", element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    { path: "categories", element:<ProtectedRoute><Categories/></ProtectedRoute>},
    { path: "categoryDetails/:categoryName/:id", element:<CategoryDetails/>},
    { path: "products", element:<ProtectedRoute><Products/></ProtectedRoute>},
    { path: "productDetails/:categoryName/:id", element:<ProductDetails/>},
    { path: "login", element:<Login/>},
    { path: "register", element:<Register/>},
    { path: "*", element:<Notfound/>},
  ]},
])



function App() {

  return <>

    <QueryClientProvider client={query}>
      <UserContextProvider>
        <CartContextProvider>
          <RouterProvider router={x}></RouterProvider>
          <Toaster/>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </>
}

export default App
