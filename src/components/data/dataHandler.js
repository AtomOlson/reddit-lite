import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { loadUrl } from "../../app/api";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, loadData, setComments, setOpenPost, setPosts } from "./dataSlice";
import { getFilters } from "../filter/filterSlice";

export default function DataHandler() {
  const location = useLocation();
  const dispatch = useDispatch();

 

  let { filter, subreddit, id, title } = useParams();
  
  // useEffect(() => {
  //   const filters = [ 'best', 'hot', 'new', 'top', 'rising' ];
  //   const fetchData = async() => {
  //     const data = await loadData(location.pathname);

  //     console.log(data)

  //     // console.log(location.pathname);
  //     // console.log(`/r/${subreddit}/comments/${id}/${title}/`);

  //     if(location.pathname === '/'  || filters.includes(filter)) { // Gets the data for plain posts
  //       dispatch(setPosts(data.data.children))
  //     } else if(location.pathname === `/r/${subreddit}/comments/${id}/${title}/`) { // Gets data for open post
  //       dispatch(setOpenPost(data[0].data.children[0].data));
  //       dispatch(setComments(data[1].data.children));
  //     }
  //   } 

  //   fetchData();
    
  // }, [location, filter, subreddit, id, title, dispatch])

  // useEffect(() => {
  //   const filters = [ 'best', 'hot', 'new', 'top', 'rising' ];
  //   dispatch(loadData(location.pathname));

  //   // console.log(location.pathname);
  //   // console.log(`/r/${subreddit}/comments/${id}/${title}/`);

  //   if(location.pathname === '/'  || filters.includes(filter)) { // Gets the data for plain posts
  //     dispatch(setPosts(data.data.children))
  //   } else if(location.pathname === `/r/${subreddit}/comments/${id}/${title}/`) { // Gets data for open post
  //     dispatch(setOpenPost(data[0].data.children[0].data));
  //     dispatch(setComments(data[1].data.children));
  //   }
    
  // }, [location, filter, subreddit, id, title, dispatch])

  


  return <></>
}