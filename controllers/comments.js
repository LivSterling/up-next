const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
    console.log('we made it')
      await Comment.create({
        post: req.params.id,
        commentText: req.body.comment,
        likes: 0,
        user: req.user.id,
        isDeleted: false,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // toggle isDeleted to true
      comment.isDeleted = true
      comment.save()
      // Delete comment from db
      // await Comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect("back");
    } catch (err) {
      res.redirect("back");
    }
  },
};
