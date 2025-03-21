const dummy = (blogs) => {
  return 1;
};

const totalLikes = (postList) => {
  return postList.reduce((acc, curr) => acc + curr.likes, 0);
};

const favoriteBlog = (blogList) => {
  const sorted = blogList.sort((a, b) => b.likes - a.likes);
  return {
    title: sorted[0].title,
    author: sorted[0].author,
    likes: sorted[0].likes,
  };
};

const mostBlogs = (blogList) => {
  const count = {};
  blogList.forEach((blog) => {
    count[blog.author] = count[blog.author] ? count[blog.author] + 1 : 1;
  });
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  return {
    author: sorted[0][0],
    blogs: sorted[0][1],
  };
};

const mostLikes = (blogList) => {
  const count = {};
  blogList.forEach((blog) => {
    count[blog.author] = count[blog.author]
      ? count[blog.author] + blog.likes
      : blog.likes;
  });
  const sorted = Object.entries(count).sort((a, b) => b[1] - a[1]);
  return {
    author: sorted[0][0],
    likes: sorted[0][1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
