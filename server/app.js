//import express
import express from 'express';

import incidences from './data/incidence';


//Set up the express app
const app = express();

//Parse incoming request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Endpoint for Creating a red-flag
app.post('/api/v1/red-flags', (req, res) => {
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
    } else if (!req.body.title) {
        return res.status(400).send({
            status: 400,
            error: 'Title field cannot be empty',
        });
    } else if (!req.body.description) {
        return res.status(400).send({
            status: 400,
            error: 'description field cannot be empty',
        });
    }

    const incidence = {
        id: incidences.length + 1,
        title: req.body.title,
        description: req.body.description,
        createdOn: new Date(),
        createdBy: req.body.createdBy,
        location: req.body.location,
        type: "red-flag",
        status: "draft",
        Images: [],
        Videos: [],
        comment: "Red Flag Records received"
    };

    //Created new red-flag
    incidences.push(incidence);

    return res.status(201).send({
        status: 201,
        data: [incidence],
    });
});


//Endpoint for Getting all red-flag
app.get('/api/v1/red-flags', (req, res) => {
    return res.status(200).send({
        status: 200,
        data: incidences,
    });
});

//Endpoint for getting a specific red flag
app.get('/api/v1/red-flags/:id', (req, res) => {
    const id = parseInt(req.params.id);
    incidences.map((redFlag) => {
        if (redFlag.id === id) {
            return res.status(200).send({
                status: 200,
                data: [redFlag],
            });
        }
        return res.status(404).send({
            status: 404,
            error: "red-flag does not exists",
        });
    });
})



//Set Port
const PORT = 5000;

//Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});