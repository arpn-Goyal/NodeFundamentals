import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res)=>{
    res.send('Hey Human ._. !!!')
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})