const Post = require("../models/Post");
const Reply = require("../models/Reply");
const axios = require("axios");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// const getPosts = async (req, res) => {
//   try {
//     const posts = await Post.find().populate("replies");

//     // Function to create hierarchical structure
//     const buildPostHierarchy = async (posts) => {
//       const processedPosts = await Promise.all(
//         posts.map(async (post) => {
//           const {
//             _id,
//             title,
//             content,
//             userId,
//             userName,
//             date,
//             upvotes,
//             downvotes,
//             replies,
//           } = post;
//           const processedReplies = await buildReplyHierarchy(replies); // Pass the replies array itself
//           return {
//             _id,
//             title,
//             content,
//             userId,
//             userName,
//             date,
//             upvotes,
//             downvotes,
//             replies: processedReplies,
//           };
//         })
//       );
//       return processedPosts;
//     };

//     const buildReplyHierarchy = async (replies) => {
//       if (!replies || replies.length === 0) {
//         // Base case: No replies
//         return [];
//       }

//       const processedReplies = await Promise.all(
//         replies.map(async (reply) => {
//           const {
//             _id,
//             content,
//             userId,
//             userName,
//             date,
//             upvotes,
//             downvotes,
//             parentId,
//             replies,
//           } = reply;
//           const children = await buildReplyHierarchy(replies); // Recursively process children
//           return {
//             _id,
//             content,
//             userId,
//             userName,
//             date,
//             upvotes,
//             downvotes,
//             parentId,
//             replies: children,
//           };
//         })
//       );
//       return processedReplies;
//     };

//     const processedPosts = await buildPostHierarchy(posts);
//     res.json(processedPosts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// const createPost = async (req, res) => {
//   const { title, content, userId } = req.body;
//   try {
//     console.log("hi", req.body);
//     const userResponse = await axios.post(
//       // `http://localhost:5001/api/users/userInfo`,
//       // "https://mental-health-user-management.onrender.com/api/users/userInfo",
//       "https://mental-health-user-management-production.up.railway.app/api/users/userInfo",
//       req.body
//     );
//     const userName = userResponse.data.name;
//     console.log("hi", userName);

//     const newPost = new Post({
//       title,
//       content,
//       userId,
//       userName,
//     });

//     const savedPost = await newPost.save();
//     res.json(savedPost);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const addReply = async (req, res) => {
  const { content, userId, postId, replyId } = req.body;
  console.log("hi reply", req.body);
  try {
    const userResponse = await axios.post(
      // `http://localhost:5001/api/users/userInfo`,
      // "https://mental-health-user-management.onrender.com/api/users/userInfo",
      "https://mental-health-user-management-production.up.railway.app/api/users/userInfo",
      req.body
    );
    const userName = userResponse.data.name;
    console.log("hi reply", userName);
    const findReplyAndUpdate = (replies, replyId, newReply) => {
      let replyFound = false;

      // Function to process replies at the current level
      const processReplies = (replies) => {
        for (let reply of replies) {
          if (reply._id.toString() === replyId) {
            if (!reply.replies) {
              reply.replies = [];
            }
            reply.replies.push(newReply);
            replyFound = true;
            console.log(replyId, reply._id);
            return; // Exit once the reply is found and updated
          }
        }
      };

      // Process all replies at the current level
      processReplies(replies);

      // If the reply was not found, continue searching recursively
      if (!replyFound) {
        for (let reply of replies) {
          if (reply.replies && reply.replies.length > 0) {
            if (findReplyAndUpdate(reply.replies, replyId, newReply)) {
              console.log("nested reply called");
              return true; // Return true if the reply was found and updated in recursion
            }
          }
        }
      }

      return replyFound; // Return whether the reply was found or not
    };

    if (replyId) {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const newReply = {
        _id: new ObjectId(), // Generate a new ObjectId for the reply
        content,
        userId,
        userName,
        date: Date.now(), // Set the current date
        upvotes: 0,
        downvotes: 0,
      };
      console.log(newReply);
      const updated = findReplyAndUpdate(post.replies, replyId, newReply);
      if (!updated) {
        console.log(res);
        return res.status(404).json({ message: "Reply not found" });
      }

      await post.save();
      res.json(post);
    } else {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      post.replies.push({ content, userId, userName });
      await post.save();

      // const postUserId = post.userId;
      // const notificationMessage = `Your post "${post.title}" has a new reply.`;
      // await axios.post("http://localhost:4000/send-notification", {
      //   message: notificationMessage,
      //   userId: postUserId,
      // });

      res.json(post);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// const addReply = async (req, res) => {
//   const { content, userId, postId, replyId } = req.body;

//   try {
//     // Fetch user information (replace with your user logic)
//     const userResponse = await axios.post(
//       "https://mental-health-user-management-production.up.railway.app/api/users/userInfo",
//       req.body
//     );
//     const userName = userResponse.data.name;

//     // Create new reply
//     const newReply = new Reply({
//       content,
//       userId,
//       userName,
//       date: Date.now(),
//       upvotes: 0,
//       downvotes: 0,
//       parentId: replyId || null, // Set parentId if replyId is provided
//       postId,
//     });

//     // Save the new reply
//     newReply.postId = postId; // Assign the post ID to the new reply

//     if (replyId) {
//       // Find the parent reply
//       const parentReply = await Reply.findById(replyId);
//       if (!parentReply) {
//         return res.status(404).json({ message: "Parent reply not found" });
//       }

//       // Set the parent ID on the new reply
//       newReply.parentId = parentReply._id;
//     }

//     await newReply.save();

//     // Add the new reply to the post's replies
//     const post = await Post.findByIdAndUpdate(
//       postId,
//       { $push: { replies: newReply._id } },
//       { new: true }
//     );
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }
//     res.json(post);

//     // res.json(post);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = addReply;

const votePost = async (req, res) => {
  const { postId, userId, replyId, type } = req.body;
  console.log("hi vote", req.body);
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const findReplyAndUpdateVotes = (replies, replyId, type) => {
      let replyFound = false;

      // Function to process replies at the current level
      const processReplies = (replies) => {
        for (let reply of replies) {
          console.log(replyId, reply._id, reply.content);
          if (reply._id.toString() === replyId) {
            replyFound = true;
            console.log(replyId, reply.content);
            if (type === "upvote") {
              reply.upvotes += 1;
              console.log(replyId, reply.content, "hj");
            } else if (type === "downvote") {
              reply.downvotes += 1;
            }
            return; // Exit once the reply is found and updated
          }
        }
      };

      // Process all replies at the current level
      processReplies(replies);

      // If the reply was not found, continue searching recursively
      if (!replyFound) {
        for (let reply of replies) {
          if (reply.replies && reply.replies.length > 0) {
            if (findReplyAndUpdateVotes(reply.replies, replyId, type)) {
              return true; // Return true if the reply was found and updated in recursion
            }
          }
        }
      }

      return replyFound; // Return whether the reply was found or not
    };

    if (replyId) {
      const updated = findReplyAndUpdateVotes(post.replies, replyId, type);
      if (!updated) {
        return res.status(404).json({ message: "Reply not found" });
      }
    } else {
      if (type === "upvote") {
        post.upvotes += 1;
      } else if (type === "downvote") {
        post.downvotes += 1;
      }
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getPosts, createPost, addReply, votePost };
