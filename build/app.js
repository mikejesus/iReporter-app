"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _incidence = _interopRequireDefault(require("./data/incidence"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//import express
//Set up the express app
var app = (0, _express["default"])(); //Parse incoming request

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
}); //Endpoint for Creating a red-flag

app.post('/api/v1/red-flags', function (req, res) {
  //Validation for empty fields
  // if (!req.body.location) {
  //     return res.status(400).send({
  //         status: 400,
  //         error: 'Locations cannot be empty',
  //     });
  // } else if (!req.body.comment) {
  //     return res.status(400).send({
  //         status: 400,
  //         error: 'Comment field cannot be empty',
  //     });
  // } else if (!req.body.title) {
  //     return res.status(400).send({
  //         status: 400,
  //         error: 'Title field cannot be empty',
  //     });
  // } else if (!req.body.description) {
  //     return res.status(400).send({
  //         status: 400,
  //         error: 'description field cannot be empty',
  //     });
  // }
  var incidence = {
    id: _incidence["default"].length + 1,
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
  }; //Created new red-flag

  _incidence["default"].push(incidence);

  return res.status(201).send({
    status: 201,
    data: [incidence]
  });
}); //Endpoint for Getting all red-flag

app.get('/api/v1/red-flags', function (req, res) {
  return res.status(200).send({
    status: 200,
    data: _incidence["default"]
  });
}); //Endpoint for getting a specific red flag

app.get('/api/v1/red-flags/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var found;
  var data = [];

  _incidence["default"].map(function (redFlag) {
    if (redFlag.id === id) {
      found = true;
      data.push(redFlag);
    }
  });

  if (found) {
    return res.status(200).send({
      status: 200,
      data: data
    });
  } else {
    return res.status(404).send({
      status: 404,
      error: "red-flag does not exists"
    });
  }
}); //Endpoint for editing location of a specific red flag

app.patch('/api/v1/red-flags/:id/:location', function (req, res, next) {
  if (req.params.location === "location") {
    var id = parseInt(req.params.id, 10);
    var location = req.body.location;
    var redFlagFound;
    var itemIndex;

    _incidence["default"].map(function (redFlag, index) {
      if (redFlag.id === id) {
        redFlagFound = redFlag;
        itemIndex = index;
      }
    });

    if (!redFlagFound) {
      return res.status(404).send({
        status: 404,
        error: 'red flag record not found'
      });
    } // if (!req.body.title) {
    //     return res.status(400).send({
    //         status: 400,
    //         error: 'Title Cannot be empty',
    //     });
    // } else if (!req.body.description) {
    //     return res.status(400).send({
    //         status: false,
    //         error: 'Descriptin cannot be empty',
    //     });
    // } else if (!req.body.createdBy) {
    //     return res.status(400).send({
    //         status: 400,
    //         error: 'User cannot be empty',
    //     });
    // }


    var newRedFlag = {
      id: redFlagFound.id,
      title: req.body.title || redFlagFound.title,
      description: req.body.descripton || redFlagFound.description,
      createdOn: new Date(),
      createdBy: req.body.createdBy || redFlagFound.createdBy,
      location: location,
      type: "red-flag",
      status: "draft",
      Images: [],
      Videos: [],
      comment: redFlagFound.comment
    };

    _incidence["default"].splice(itemIndex, 1, newRedFlag);

    return res.status(201).send({
      status: 201,
      data: [{
        id: redFlagFound.id,
        message: 'Updated red-flag record’s location'
      }]
    });
  } else {
    next();
  }
}); //Endpoint for editing comment of a specific red flag

app.patch('/api/v1/red-flags/:id/:comment', function (req, res) {
  var id = parseInt(req.params.id, 10);
  var comment = req.body.comment;
  var redFlagFound;
  var itemIndex;

  _incidence["default"].map(function (redFlag, index) {
    if (redFlag.id === id) {
      redFlagFound = redFlag;
      itemIndex = index;
    }
  });

  if (!redFlagFound) {
    return res.status(404).send({
      status: 404,
      error: 'red flag record not found'
    });
  } // if (!req.body.title) {
  //     return res.status(400).send({
  //         status: 400,
  //         error: 'Title Cannot be empty',
  //     });
  // } else if (!req.body.description) {
  //     return res.status(400).send({
  //         status: false,
  //         error: 'Descriptin cannot be empty',
  //     });
  // } else if (!req.body.createdBy) {
  //     return res.status(400).send({
  //         status: 400,
  //         error: 'User cannot be empty',
  //     });
  // }


  var newRedFlag = {
    id: redFlagFound.id,
    title: req.body.title || redFlagFound.title,
    description: req.body.descripton || redFlagFound.description,
    createdOn: new Date(),
    createdBy: req.body.createdBy || redFlagFound.createdBy,
    location: req.body.location || redFlagFound.location,
    type: "red-flag" || redFlagFound.type,
    status: "draft" || redFlagFound.status,
    Images: [] || redFlagFound.Images,
    Videos: [] || redFlagFound.Videos,
    comment: comment
  };

  _incidence["default"].splice(itemIndex, 1, newRedFlag);

  return res.status(201).send({
    status: 201,
    data: [{
      id: redFlagFound.id,
      message: 'Updated red-flag record’s comment'
    }]
  });
}); //Endpoint of deletion of a specific red flag

app["delete"]('/api/v1/red-flags/:id', function (req, res) {
  var id = parseInt(req.params.id);
  var redFlagFound;
  var itemIndex;

  _incidence["default"].map(function (redFlag, index) {
    if (redFlag.id === id) {
      redFlagFound = redFlag;
      itemIndex = index;
    }
  });

  if (!redFlagFound) {
    return res.status(404).send({
      status: 404,
      error: 'Red-flag does not exists'
    });
  }

  _incidence["default"].splice(itemIndex, 1);

  return res.status(200).send({
    status: 200,
    data: [{
      id: redFlagFound.id,
      message: "red-flag record has been deleted"
    }]
  });
}); //Set Port

var PORT = 5000; //Start server

var _default = app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});

exports["default"] = _default;