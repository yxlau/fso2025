const Blog = require('../models/blog')


const initialBlogs = [
  {
    "title": "Bible",
    "author": "John Ormsby",
    "url": "https://deafening-story.org",
    "likes": 76
  },
  {
    "title": "Rabbit, Run",
    "author": "Anton Chekhov",
    "url": "https://vivid-midwife.name",
    "likes": 46
  },
  {
    "title": "Things Fall Apart",
    "author": "Homer",
    "url": "https://thorny-populist.com/",
    "likes": 15
  },
  {
    "title": "One Flew Over the Cuckoo's Nest",
    "author": "Agatha Christie",
    "url": "https://defensive-netsuke.net/",
    "likes": 85
  }
]

const newBlog = 
  {
    "title": "Lord of the Flies",
    "author": "John Kennedy Toole",
    "url": "https://abandoned-granny.info/",
    "likes": 55
  }

const missingLikesBlog = {
  "title": "If on a Winter's Night a Traveler",
  "author": "Nathanael West",
  "url": "https://raw-molasses.net"
}



module.exports = {
  initialBlogs,
  newBlog,
  missingLikesBlog
}