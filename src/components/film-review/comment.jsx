import React from 'react';
import PropTypes from "prop-types";

const timeOptions = {
  year: `numeric`,
  month: `long`,
  day: `numeric`,
};

export const Comment = (props) => {
  const {comment} = props;
  const date = new Date(comment.date);
  return <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment.comment}</p>

      <footer className="review__details">
        <cite className="review__author">{comment.user.name}</cite>
        <time className="review__date" dateTime="2016-12-24">{date.toLocaleString(`en-US`, timeOptions)}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{comment.rating}</div>
  </div>;
};

Comment.propTypes = {
  comment: PropTypes.object,
};
