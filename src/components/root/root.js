import React, { useEffect } from "react"
import Header from "../header/header.js"
import { Outlet, useLocation, useParams } from "react-router-dom"
import { useDispatch } from "react-redux";
import { loadData } from "../data/dataSlice.js";

export default function Root() {
    const location = useLocation();
    const dispatch = useDispatch();
    let { filter, subreddit, id, title } = useParams();

    useEffect(() => {
      
      let params = [
          filter,
          subreddit,
          id,
          title
      ]

      dispatch(loadData({
        path: location.pathname, 
        params
      }))
    }, [dispatch, location, filter, subreddit, id, title])

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}