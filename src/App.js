import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Root from './components/root/root.js';
import PostHandler from './components/postHandler/postHandler';
import OpenPost from './components/openPost/openPost';
import { loadUrl } from './app/api';
import { useDispatch } from 'react-redux';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> } >
    <Route index element={ <PostHandler /> } />
    <Route path='/:filter' element={ <PostHandler /> } />
    <Route path='/r/:subreddit/comments/:id/:title' element={ <OpenPost /> } />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}