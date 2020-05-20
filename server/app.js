//import express
import express from 'express';

import incidences from './data/incidence';


//Set up the express app
const app = express();

//Parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Endpoint for Creating a red-flag
app.post('/api/v1/red-flag', (req, res) => {
    //Validation for empty fields
    if (!req.body.createdBy) {
        return res.status(400).send({
            status: 400,
            error: 'User cannot be empty',
        });
    } else if (!req.body.location) {
        return res.status(400).send({
            status: 400,
            error: 'Locations cannot be empty',
        });
    } else if (!req.body.comment) {
        return res.status(400).send({
            status: 400,
            error: 'Comment field cannot be empty',
        });
    }

    const incidence = {
        id: incidences.length + 1,
        createdOn: new Date(),
        createdBy: req.body.createdBy,
        location: req.body.location,
        type: "red-flag",
        status: "draft",
        Images: req.body.Images,
        Videos: req.body.Videos,
        comment: req.body.comment
    };

    //Created new red-flag
    incidences.push(incidence);

    return res.status(201).send({
        status: 201,
        data: [{ incidence }],
    });
});



//Set Port
const PORT = 5000;

//Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});