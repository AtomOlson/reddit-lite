import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import defaultUserIcon from '../../assets/default-user-icon.png';
import { getUserIcons, loadUserIcon, setUserIcons } from "../data/dataSlice";
import { useDispatch, useSelector } from "react-redux";

let done = false;
const usersLoaded = {}

export default function Comments({comments}) {
  const userIcons = useSelector(getUserIcons);
  const dispatch = useDispatch();

  const [showRepliesMap, setShowRepliesMap] = useState({}); // Local state for determining if comment is open

  const toggleReplies = (commentId) => {
    setShowRepliesMap(prevState => ({
      ...prevState,
      [commentId]: !prevState[commentId]
    }));
  };

  const initComments = (comments.length < 15) ? comments.length : 15;

  const [numComments, setNumComments] = useState(initComments);
  let prevComments = 0;

  const loadIcons = () => {
    if(numComments < comments.length) {
      for(let i = prevComments; i < numComments; i++) {
        const user = comments[i].data.author;
        if(!userIcons[user]) {
         // count++;
         // console.log(count)
          //dispatch(setUserIcons({user}));
          //dispatch(loadUserIcon(user))
        }
      }
    }
  }

  const showMoreComments = () => {
    //prevComments = numComments;
    //loadIcons();
    setNumComments(prev => {
      if(prev + 15 > comments.length) {
        return comments.length;
      } else {
        return prev + 15;
      }
    })
  }

  const [ isMounted, setIsMounted ] = useState(false)


 if(!done) {
   //setIsMounted(true)
   done = true;
   loadIcons();
 }
    



  

const addUserForIcons = (user) => {
  if(!userIcons[user]) {
    dispatch(setUserIcons({[user]: 'no icon'}));
    dispatch(loadUserIcon(user));
  }
}
  

for(const user in userIcons) {
  if(user === 'no icon') {
    //dispatch(setUserIcons({[user]: 'setting icon'}))
    
  }
}
  

  const loadIcon = (user) => {
    if(!usersLoaded[user]) {
      usersLoaded[user] = true;
      dispatch(loadUserIcon(user))
    }
  }

  return (
    <section>
      {comments.slice(0, numComments + 1).map(comment => {
        const commentId = comment.data.id;
        const user = comment.data.author;
        const iconUrl = userIcons[user] || defaultUserIcon;
        const replies = comment.data.replies ? comment.data.replies.data.children : undefined;
        // console.log(comment.data.body)
        // console.log(replies)

        //addUserForIcons(user);

        loadIcon(user)

        // Checks to remove blank replies
        function checkReplies() {
          if(!replies) return false;
          return replies[0].kind !== 'more'
        }


        return (
          <div className="comment" key={uuidv4()}>
            <div className="commentHead">
              <img className="commentUserIcon" src={iconUrl} alt="" />
              <h4 className="commentAuthor">{user}</h4>
            </div>
            <div className="commentData">
              <div className="commentLine"></div>
              <div className="commentBody">
                <p className="commentText">{comment.data.body}</p>
                {checkReplies() && (
                  <button onClick={() => toggleReplies(commentId)}>
                    {showRepliesMap[commentId] ? "Hide replies" : "Show replies"}
                  </button>
                )}

                {replies && showRepliesMap[commentId] && replies.map(reply => {
                  if (reply.kind === 't1') return <Comments comments={[reply]} key={uuidv4()} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
      {(numComments < comments.length) ? // button that shows more comments if there is more to show
      <button onClick={showMoreComments}>Show more replies</button> :
      ''}
    </section>
  );

}