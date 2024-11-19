import {
  addPostDB,
  deletePostByIdDB,
  getPostbyIdDB,
  getPostsDB,
  updatePostDB,
} from "../database.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await getPostsDB();
    res.status(200).json({
      success: true,
      message: posts,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

export const getPost = async (req, res) => {
  const postId = req.params.postid;
  try {
    const result = await getPostbyIdDB(postId);
    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

export const uploadPost = async (req, res) => {
  try {
    const { title, content, imageURLs, userid } = req.body;
    const result = await addPostDB(userid, title, content, imageURLs);
    res.status(200).json({
      success: true,
      message: result,
    });
  } catch (err) {
    res.status(404).json(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postid;
    // delete comments, likes and then post
    const result = await deletePostByIdDB(postId);
    res.status(200).json({
      success: true,
      message: result, // string
    });
  } catch (err) {
    res.status(404).json(err);
  }
};
export const updatePost = async (req, res) => {
  try {
    const { postid } = req.params;
    const { title, content, images } = req.body;
    const result = await updatePostDB(postid, title, content, images);
    res.status(200).json({
      success: true,
      message: result, // string
    });
  } catch (err) {
    res.status(404).json(err);
  }
};
