import React from "react";
import { connect } from "react-redux";

import { fetchBlog } from "../../actions";

class BlogShow extends React.Component<
  { fetchBlog: (arg0: string) => void; match: { params: { _id: string } }; blog: Blog },
  {}
> {
  componentDidMount() {
    this.props.fetchBlog(this.props.match.params._id);
    // console.log(process.env.REACT_APP_amazon_AWS_S3_bucketName);
  }

  renderImage() {
    if (this.props.blog.imageUrl) {
      return <img alt="Blog pic" src={`${process.env.REACT_APP_amazon_AWS_S3_bucketName}` + this.props.blog.imageUrl} />;
    }
  }

  render() {
    if (!this.props.blog) {
      return "";
    }

    const { title, content } = this.props.blog;

    return (
      <div>
        <h3>{title}</h3>
        <p>{content}</p>
        {this.renderImage()}
      </div>
    );
  }
}

function mapStateToProps({ blogs }: any, ownProps: { match: { params: { _id: string } } }) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
