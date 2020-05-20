//import express
import express from 'express';


//Set up the express app
const app = express();

//Parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Basic test route
app.get('/', (req, res) => {
    res.send("Hello there... I'm Michael");
});



//Set Port
const PORT = 5000;

//Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});