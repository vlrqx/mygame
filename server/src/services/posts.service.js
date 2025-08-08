const { Restaurant, User } = require("../../db/models");

class PostsService {
  static async getAll() {
    return await Restaurant.findAll();
  }

  static async getPostsByUser(userId) {
    return await Post.findAll({ where: { userId } });
  }

  static async createPost({ title, description, userId }) {
    const newPost = await Post.create({ title, description, filename, userId });

    console.log(newPost);

    tags.forEach(async (tag) => {
      console.log(tag.id, newPost.id);
      await Entry.create({ postId: newPost.id, tagId: tag.id });
    });

    return Post.findByPk(newPost.id, { include: { model: Tag } });
  }

  static async createPost(data) {
    const newPost = await Post.create(data);

    console.log(newPost);
    return newPost;
  }
  static async onePost(id) {
    const onePost = await Post.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
      ],
    });

    return onePost;
  }

  static async update(id,{title,description,status}){
    const post = await Post.findByPk(id);
    if(post){
        post.title=title;
        post.description=description
        post.status=status
        await post.save()
    }
    return post
  }

  static async deletePost(id) {
    const post = await Restaurant.findByPk(id);
    if (post) {
      await post.destroy();
    }
    return post;
  }
  static async deleteAll() {
    const posts = await Post.findAll();
    if (posts) {
      posts.forEach(async (el)=>await el.destroy())
    }
    return
  }
  static async deleteReaded() {
    const posts = await Post.findAll({where:{status: true}});
    console.log(posts,'----------')
    if (posts) {
      posts.forEach(async (el)=>await el.destroy())
    }
    return
  }
}

module.exports = PostsService;
