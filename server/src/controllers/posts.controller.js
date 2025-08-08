const PostsService = require('../services/posts.service');

class PostsController {
    static async getAllPosts(req, res) {
    try {
      const posts = await PostsService.getAll();
      res.status(200).json(posts);
    } catch ({ error }) {
        console.error(error);
        res.status(500).json('Internal server error', error);
    }
}

static async getPostsByUser(req,res){
    try {
        const {userId} = req.params
        const posts = await PostsService.getPostsByUser(userId); 
        res.status(200).json(posts);
        
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal server error', error);
        
    }
  }

  static async addPost(req, res) {
    const data = req.body;
    try {
      const newPost= await PostsService.createPost(data);
      res.status(201).json(newPost);
    } catch ({ message }) {
      console.error(message);
      res.sendStatus(500);
    }
  }
  static async onePost(req, res) {
      try {
        const {id} = req.params;
      const onePost= await PostsService.onePost(id);
      res.status(200).json(onePost);
    } catch ({ message }) {
      console.error(message);
      res.sendStatus(500);
    }
  }

  static async deletePost(req,res){
    try {
      const { id } = req.params;
      const post = await PostsService.deletePost(id);
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  static async handleDeleteReaded(req,res){
    try {
      const post = await PostsService.deleteReaded();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  static async deleteAll(req,res){
    try {
      const post = await PostsService.deleteAll();
      res.sendStatus(204);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
  static async updatePost(req,res){
    const { id } = req.params;
    const { title, description ,status} = req.body;

    try {
      //* Получаем post по id
      const postToUpdate = await PostsService.onePost(+id);

      const updatedPost = await PostsService.update(+id, { title,description ,status});

      if (!postToUpdate) {
        return res.status(404).json({ message: `Post with id ${id} not found` });
      }

      res.status(200).json(updatedPost);
    } catch ({ message }) {
      console.error(message);
      res.status(500).json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = PostsController;