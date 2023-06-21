import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { loadUrl } from "../../app/api";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, setPosts } from "./dataSlice";
import { getFilters } from "../filter/filterSlice";

export default function DataHandler() {
  const location = useLocation();
  const dispatch = useDispatch();

  const filters = [ 'best', 'hot', 'new', 'top', 'rising' ];

  let { filter, subreddit, id, title } = useParams();

  useEffect(() => {
    const fetchData = async() => {
      const data = await loadUrl(`https://www.reddit.com${location.pathname}.json`);

      if(location.pathname === '/'  || filters.includes(filter)) { // Gets the data for plain posts
        handlePosts(data.data)
      } else if(false) {

      }
      function handlePosts(data) {
        dispatch(setPosts(data.children))
        console.log(data.children)
      }

      function handleOpenPost(data) {

      }

      function handleSubreddit(data) {

      }

      function handleUser(data) {

      }
    } 

    
    fetchData();
  }, [location])

  


  return <></>
}