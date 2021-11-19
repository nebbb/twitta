import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import "./TweetCard.css";
import {
  likeATweet,
  removeLikedTweet,
  removeTweet,
  updateTweet,
} from "../../store/tweets";
import { Link } from "react-router-dom";

export default function TweetCard({ tweet, user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [editInput, setEditInput] = useState("");

  const tweetUserLike =
    tweet["like_array"].find(
      (like_obj) => like_obj["user_id"] === user["id"]
    ) || false;

  function likeATweetFun() {
    const data = {
      user_id: user["id"],
      tweet_id: tweet["id"],
    };
    dispatch(likeATweet(data));
  }

  function removeATweetFun() {
    const data = {
      tweet_id: tweet.id,
      like_id: tweetUserLike.id,
    };
    dispatch(removeLikedTweet(data));
  }

  // <button onClick={deleteATweetFun}>Remove</button>
  // <form onSubmit={updateATweetFun}>
  //   <input
  //     placeholder="Edit tweet"
  //     value={editInput}
  //     onChange={(e) => setEditInput(e.target.value)}
  //   />
  //   <button>Update</button>
  // </form>
  function updateATweetFun(e) {
    e.preventDefault();
    const data = { tweet: editInput, id: tweet.id };
    dispatch(updateTweet(data));
    setEditInput("");
  }

  function deleteATweetFun() {
    dispatch(removeTweet(tweet.id));
  }

  function redirectToDetailsFun(e) {
    e.stopPropagation();
    history.push(`/status/${tweet.id}`);
  }

  function showDropdown(e) {
    // (element x - body x) + adjustments
    // (element y - body y) + adjustments
    const elementRadius = e.currentTarget.getBoundingClientRect();
    const boundingVariable = document.querySelector(".tweet-option-dd");
    const bodyRect = document.body.getBoundingClientRect();

    boundingVariable.style.display = "block";
    boundingVariable.style.position = "absolute";
    boundingVariable.style.left = `${
      elementRadius.left - bodyRect.left - 220
    }px`;
    boundingVariable.style.top = `${elementRadius.top - bodyRect.top}px`;
    return;
  }

  return (
    <div className="tweet__card--container">
      <div className="tweet__card--top">
        <div className="tweet__card--profile-pic">
          <img
            src={tweet["user"]["profile_pic"]}
            className="tweet__card--profile-img"
            alt="profile-pic"
          />
        </div>
        <div className="tweet__card--content">
          <div className="tweet__card--content-top">
            <span
              className="tweet__username"
              onClick={(e) => redirectToDetailsFun(e)}
            >{`@${tweet["user"]["username"]}`}</span>
            <span className="tweet__dot">·</span>
            <span className="tweet__created">{`${tweet["sent_date"]}`}</span>
            <button onClick={showDropdown} className="dont-remove">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                class="dont-remove r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
              >
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                </g>
              </svg>
            </button>
          </div>
          <div className="tweet__card--content-bottom">
            <span className="tweet__content">{tweet["tweet"]}</span>
          </div>
        </div>
      </div>
      <div className="tweet__card--bottom">
        <div className="tweet__card--image">
          {tweet["image"] ? (
            <img
              src={tweet["image"]}
              className="tweet__card--tweet-img"
              alt="tweet-img"
            />
          ) : null}
        </div>
        <div className="tweet__card--details">
          <div className="tweet__icon">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
            >
              <g>
                <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
              </g>
            </svg>
            <span>{tweet["comment_count"]}</span>
          </div>
          <div className="tweet__icon">
            {tweet["like_array"].find(
              (like_obj) => like_obj["user_id"] === user["id"]
            ) ? (
              <button onClick={removeATweetFun}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-4qtqp09 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                >
                  <g>
                    <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12z"></path>
                  </g>
                </svg>
              </button>
            ) : (
              <button onClick={likeATweetFun}>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                >
                  <g>
                    <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                  </g>
                </svg>
              </button>
            )}

            <span>{tweet["like_count"]}</span>
          </div>
          <div className="tweet__icon">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
            >
              <g>
                <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
