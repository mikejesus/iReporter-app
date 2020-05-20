const incidence = [{
        "id": 1,
        "title": "Corruption Case",
        "description": "The DG of an agency was caught in a corruption deal",
        "createdOn": new Date(),
        "createdBy": "Michael", // represents the user who created this record
        "type": "red-flag", // [red-flag, intervention]
        "location": "20021, 59039", // Lat Long coordinates
        "status": "draft", // [draft, under investigation, resolved, rejected]
        "Images": ["corruption.jpg", "myimage.png"],
        "Videos": ["bridge.mp4"],
        "comment": "Everything is good here"
    },

    {
        "id": 2,
        "title": "Bribery Case",
        "description": "A bribe was given to so so and so on 20th May, 2019",
        "createdOn": new Date(),
        "createdBy": "OlaMike", // represents the user who created this record
        "type": "red-flag", // [red-flag, intervention]
        "location": "18432, 32123", // Lat Long coordinates
        "status": "draft", // [draft, under investigation, resolved, rejected]
        "Images": ["bribery.jpg"],
        "Videos": ["gandollar.mp4"],
        "comment": "Everything is good here"
    }

]

export default incidence;