const incidence = [{
        "id": 1,
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