var mongoose = require('mongoose');
mongoose.connect('mongodb://normal:88888888@localhost:27017/spider', { useNewUrlParser: true, useUnifiedTopology:true})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log('connected')
});
db.once('close', function () {
  // we're connected!
  console.log('close')
});

// 定义 Schema
var Schema = mongoose.Schema;

// 定义结构
var testBlogSchema = new Schema({
  title: String,
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number
  }
});
// 添加方法
testBlogSchema.methods.print = function () {
  console.log(`
    ${this.title},
    author:${this.author},
    body:${this.body}
  `)
}

// 创建数据模型
var Blog = mongoose.model('Blog', testBlogSchema);

var myblog = new Blog({
  title:"测试文章",
  author:"bingo",
  body:"hello world"
})

myblog.print()

// 保存到数据库中
myblog.save()

Blog.find({title:/测试文章/},(rs)=>{
  console.log(rs)
  db.close()
})

