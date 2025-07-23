import e from "express";

const app = e();
const port = 3000;
// Built-in middleware
app.use(e.json());
// Use Tools (Middleware)
app.use(cors());            // 1. Allow cross-origin requests
app.use(helmet());          // 2. Secure your app with headers
app.use(morgan('dev'));     // 3. Log HTTP requests


// Custom middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next(); // move to next middleware/route
}

// Route that causes an error
app.get('/error', (req, res, next) => {
  next(new Error('Something went wrong!'));
});

// Error handling middleware (must have 4 params)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Internal Server Error!');
});
app.use(logger);


app.get('/',(req,res)=>{
    res.send("<h1>Express.js Recap </h1>")
})


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})