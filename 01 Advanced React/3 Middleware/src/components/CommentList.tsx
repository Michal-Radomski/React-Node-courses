import React from "react";
import { connect } from "react-redux";

class CommentList extends React.Component<{ comments: string[] }, {}> {
  renderComments = () => {
    return this.props.comments.map((comment: string) => {
      return <li key={comment}>{comment}</li>;
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>
          <h4>Comments List</h4>
          <ul>{this.renderComments()}</ul>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return { comments: state.comments };
};

export default connect(mapStateToProps, null)(CommentList);
