import React from "react";
import {Comment} from "./comment";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
// import {Operation} from "../../reducer/root-reducer";

const spliteComments = (part = 1, comments) => {
  const length = comments.length;
  if (length > 1 && part === 1) {
    const firstPart = comments.slice(0, length / 2);
    return firstPart;
  } else if (length > 1 && part === 2) {
    const secondPart = comments.slice(length / 2, length);
    return secondPart;
  } else {
    return null;
  }
};

export const FilmReview = (props) => {
  const {comments, commentsFirstPart, commentsSecondPart} = props;
  console.log(props);
  // const comments = getComments
  return <div className="movie-card__reviews movie-card__row">
    <div className="movie-card__reviews-col">
      {comments.length >= 1 ? commentsFirstPart.map((it) => <Comment key={it.id} comment={it} />) : <p>There is no comments yet</p>}
    </div>
    <div className="movie-card__reviews-col">
      {comments.length >= 2 ? commentsSecondPart.map((it) => <Comment key={it.id} comment={it} />) : null }
    </div>
  </div>;
};

const mapStateToProps = (state) => {
  return {
    commentsFirstPart: spliteComments(1, state.filterReducer.comments),
    commentsSecondPart: spliteComments(2, state.filterReducer.comments),
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getComments: (id) => {
//       dispatch(Operation.loadComments(id));
//     }
//   }
// }

export default withRouter(connect(mapStateToProps)(FilmReview));
