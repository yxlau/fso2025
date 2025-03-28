const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Bible",
    author: "John Ormsby",
    url: "https://deafening-story.org",
    likes: 76,
  },
  {
    title: "Rabbit, Run",
    author: "Anton Chekhov",
    url: "https://vivid-midwife.name",
    likes: 46,
  },
  {
    title: "Things Fall Apart",
    author: "Homer",
    url: "https://thorny-populist.com/",
    likes: 15,
  },
  {
    title: "One Flew Over the Cuckoo's Nest",
    author: "Agatha Christie",
    url: "https://defensive-netsuke.net/",
    likes: 85,
  },
];

const newBlog = {
  title: "Lord of the Flies",
  author: "John Kennedy Toole",
  url: "https://abandoned-granny.info/",
  likes: 55,
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const newUsers = [
  {
    name: "Marjorie",
    username: "Marjorie_Leannon24",
    password: "iDuGneofT6BI1PE",
  },
  {
    name: "Alverta",
    username: "Alverta.Luettgen44",
    password: "eIGh2ihr_XlAYiQ",
  },
  {
    name: "Devan",
    username: "Devan.Lind51",
    password: "9SQzkSUounjDMgN",
  },
];

module.exports = {
  initialBlogs,
  newBlog,
  usersInDb,
  newUsers,
};
