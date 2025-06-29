import Blog, { BlogI, CommentI } from "../models/blog.model";

export const addCommentService = async (blogId: string, comments: CommentI[]): Promise<BlogI> => {
  const blog = (await Blog.findOneAndUpdate({ _id: blogId }, { $push: { comments } }, { new: true })) as BlogI;
  return blog;
};
