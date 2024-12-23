const CONFIG = require('./config/config')
const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const signup = require('./routes/signup')
const login = require('./controllers/login')
const blog = require('./routes/blog')
const PORT = process.env.PORT


const Article = require('./models/Article')
const app = express()

console.log(CONFIG.DATABASE_CONNECT_STRING)
// connect to db
require('./middleware/db')(CONFIG.DATABASE_CONNECT_STRING)

// parse information from request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/signup', signup)
app.use('/api/login', login)
app.use('/api/blog', blog)

setInterval(async () => {
  await Article.publishDrafts()
}, 60 * 1000)

// use error handler middleware
app.use(errorHandler)

app.set("views", "views");
app.set("view engine", "ejs");


app.use("/blogs", connectEnsureLogin.ensureLoggedIn(), blogRoute);


app.get("/", connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  res.render("index");
});


app.get("/login", (req, res) => {
  res.render("login");
});


app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/", (req, res) => {
  res.send("Blog API HomePage");
});

app.listen(PORT, () => {
  console.log(`App is listening at port: ${PORT}`);
});

