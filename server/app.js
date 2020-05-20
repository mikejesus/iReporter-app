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
    let found;
    let data = [];
    incidences.map((redFlag) => {
        if (redFlag.id === id) {
            found = true;
            data.push(redFlag);
        }
    });

    if (found) {
        return res.status(200).send({
            status: 200,
            data: data,
        });
    } else {
        return res.status(404).send({
            status: 404,
            error: "red-flag does not exists",
        });
    }
})

//Endpoint for editing location of a specific red flag
app.patch('/api/v1/red-flags/:id/:location', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const location = req.params.location;
    let redFlagFound;
    let itemIndex;

    incidences.map((redFlag, index) => {
        if (redFlag.id === id) {
            redFlagFound = redFlag;
            itemIndex = index;
        }
    });

    if (!redFlagFound) {
        return res.status(404).send({
            status: 404,
            error: 'red flag record not found',
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            status: 400,
            error: 'Title Cannot be empty',
        });

    } else if (!req.body.description) {
        return res.status(400).send({
            status: false,
            error: 'Descriptin cannot be empty',
        });
    } else if (!req.body.createdBy) {
        return res.status(400).send({
            status: 400,
            error: 'User cannot be empty',
        });
    }

    const newRedFlag = {
        id: redFlagFound.id,
        title: req.body.title || redFlagFound.title,
        description: req.body.descripton || redFlagFound.description,
        createdOn: new Date(),
        createdBy: req.body.createdBy,
        location: req.body.location || location,
        type: "red-flag",
        status: "draft",
        Images: [],
        Videos: [],
        comment: "Red Flag Records received"
    }

    incidences.splice(itemIndex, 1, newRedFlag);

    return res.status(201).send({
        status: 201,
        data: [{
            id: redFlagFound.id,
            message: 'Updated red-flag record’s location',
        }]
    });
});


//Endpoint for editing comment of a specific red flag
app.put('/api/v1/red-flags/:id/:comment', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const comment = req.params.comment;
    let redFlagFound;
    let itemIndex;

    incidences.map((redFlag, index) => {
        if (redFlag.id === id) {
            redFlagFound = redFlag;
            itemIndex = index;
        }
    });

    if (!redFlagFound) {
        return res.status(404).send({
            status: 404,
            error: 'red flag record not found',
        });
    }

    if (!req.body.title) {
        return res.status(400).send({
            status: 400,
            error: 'Title Cannot be empty',
        });

    } else if (!req.body.description) {
        return res.status(400).send({
            status: false,
            error: 'Descriptin cannot be empty',
        });
    } else if (!req.body.createdBy) {
        return res.status(400).send({
            status: 400,
            error: 'User cannot be empty',
        });
    }

    const newRedFlag = {
        id: redFlagFound.id,
        title: req.body.title || redFlagFound.title,
        description: req.body.descripton || redFlagFound.description,
        createdOn: new Date(),
        createdBy: req.body.createdBy,
        location: req.body.location || location,
        type: "red-flag",
        status: "draft",
        Images: [],
        Videos: [],
        comment: comment
    }

    incidences.splice(itemIndex, 1, newRedFlag);

    return res.status(201).send({
        status: 201,
        data: [{
            id: redFlagFound.id,
            message: 'Updated red-flag record’s comment',
        }]
    });
});

//Endpoint of deletion of a specific red flag
app.delete('/api/v1/red-flags/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let redFlagFound;
    let itemIndex;

    incidences.map((redFlag, index) => {
        if (redFlag.id === id) {
            redFlagFound = redFlag;
            itemIndex = index;
        }
    });

    if (!redFlagFound) {
        return res.status(404).send({
            status: 404,
            error: 'Red-flag does not exists',
        });
    }
    incidences.splice(itemIndex, 1);

    return res.status(200).send({
        status: 200,
        data: [{
            id: redFlagFound.id,
            message: "red-flag record has been deleted"
        }],
    });
});

//Set Port
const PORT = 5000;

//Start server

export default app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});