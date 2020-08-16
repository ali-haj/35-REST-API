const express = require('express');
const app = express();
const usersRouter = require('./Routers/notes');
const { urlencoded } = require('express');
const cors = require('cors');

app.use(cors());
app.use(urlencoded());
app.use(express.json());

app.use('/notes',usersRouter);


app.listen(3000, () => {
    console.log('app is listning to port 3000');
})