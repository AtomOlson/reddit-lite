import React from "react";

import upvoteIcon from '../../assets/upvote-icon.png';
import downvoteIcon from '../../assets/downvote-icon.png';
import commentIcon from '../../assets/comment-icon.png';
import { Link } from "react-router-dom";

export default function Post({data, open}) {
  const {
    subreddit,
    author, 
    title,
    url_overridden_by_dest, // img src
    is_video,
    created, // Epoch seconds time created
    secure_media_embed, // Object for media embed
    ups,
    downs,
    num_comments,
    selftext, // Post text
    permalink // Link to full post
  } = data;


  // Gets media for specific types
  function media() {
    if(is_video) { // Video

      const { fallback_url } = data.secure_media.reddit_video;

      return (
        <video src={fallback_url} 
              className="postVideo"
              controls
            />
      )
    } else { 
      if(Object.keys(secure_media_embed).length > 0) { // Other video link. etc: YouTube
        return (
          <iframe src={secure_media_embed.media_domain_url} 
                  title="Media embed" 
                  className="postVideo">
                </iframe>
        )
      } else if(url_overridden_by_dest) { // Image
        return (
          <img src={url_overridden_by_dest} 
              alt="" 
              className="postImg"
              />
        )
      } else if(selftext) {
        return (
          <p className="postText">{selftext}</p>
        )
      }
    }
  }

  // Gets the amount of time since posted
  function getTime() {
    const minutesAgo = ((Date.now() / 1000) - created) / 60; // Gets the number of minutes since posting

    if(minutesAgo < 5) return 'just now';
    else if(minutesAgo < 60) return `${Math.round(minutesAgo)} minutes ago`;
    else if(minutesAgo < 60 * 24) return `${Math.round(minutesAgo / 60)} hours ago`;
    else return `${Math.round((minutesAgo / 60) / 24)} days ago`
  }

  // Gets and rounds the amount of votes and comments
  function roundAmount(amount) {
    if(amount < 1000) return amount;
    else if(amount < 100000) return `${(amount / 1000).toFixed(1)}K`;
    else if(amount < 1000000) return `${Math.round(amount / 1000)}K`;
    else return `${(amount / 100000).toFixed(1)}M`;
  }

  // Gets the link to the main post
  function getLink() {
    if(subreddit) {
      return permalink
    }
  }

  return (
    <div className={open ? 'openPost' : 'post'} >
      <div className="postVote">
        <img className="postVoteIcon" src={upvoteIcon} alt="" />
        <p>{roundAmount(ups - downs)}</p>
        <img className="postVoteIcon" src={downvoteIcon} alt="" />
      </div>
      <Link to={open ? url_overridden_by_dest : getLink()}
            className="postMain" >
        {subreddit ? <p className="postSubreddit">r/{subreddit} </p> : ''}
        <p className="postAuthor">- Posted by u/{author} {getTime()}</p>
        <h3 className="postTitle">{title}</h3>
        {media()}
        <div className="postComments">
          <img className="postCommentIcon" 
              src={commentIcon} 
              alt="" 
            />
          <p className="postCommentNum">{roundAmount(num_comments)}</p>
        </div>
        
        
      </Link>
    </div>
  )

}