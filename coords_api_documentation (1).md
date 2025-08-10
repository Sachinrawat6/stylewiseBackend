# 📄 Coords API Documentation

---

## 📌 Sidebar Navigation
- [CREATE Coords](#create-coords)
- [GET All Coords](#get-all-coords)
- [UPDATE Coords](#update-coords)
- [GET Single Coords](#get-single-coords)

---

## 🆕 CREATE Coords

**Endpoint:**  
`POST /coords/uploads`

**Description:**  
Uploads a list of new coords styles to the database, preventing duplicate `coordStyleNumber` entries.

**Request Body Example:**
```json
[
    {
        "coordStyleNumber": 101,
        "styleNumbers": [201, 202, 203],
        "coordSetName": "Summer Set",
        "colors": ["Red", "Blue", "Green"]
    }
]
```

**Success Response Example:**
```json
{
    "statusCode": 201,
    "message": "1 coords styles created successfully.",
    "data": [
        {
            "_id": "64fef1234567890",
            "coordStyleNumber": 101,
            "styleNumbers": [201, 202, 203],
            "coordSetName": "Summer Set",
            "colors": ["Red", "Blue", "Green"],
            "createdAt": "2023-08-01T10:00:00.000Z",
            "updatedAt": "2023-08-01T10:00:00.000Z"
        }
    ]
}
```

---

## 📋 GET All Coords

**Endpoint:**  
`GET /coords/all-coords`

**Description:**  
Fetches all coords styles from the database.

**Success Response Example:**
```json
{
    "statusCode": 200,
    "message": "5 coords fetched successfully",
    "data": [
        {
            "_id": "64fef1234567890",
            "coordStyleNumber": 101,
            "styleNumbers": [201, 202, 203],
            "coordSetName": "Summer Set",
            "colors": ["Red", "Blue", "Green"]
        }
    ]
}
```

---

## ✏️ UPDATE Coords

**Endpoint:**  
`POST /coords/update/:id`

**Description:**  
Updates a coords style by its MongoDB ObjectId.

**Request Params:**  
- **id** — MongoDB ObjectId of the coords style.

**Request Body Example:**
```json
{
    "payload": {
        "coordSetName": "Updated Summer Set",
        "colors": ["Yellow", "Black"]
    }
}
```

**Success Response Example:**
```json
{
    "statusCode": 200,
    "message": "Coords style 101 updated successfully",
    "data": {
        "_id": "64fef1234567890",
        "coordStyleNumber": 101,
        "styleNumbers": [201, 202, 203],
        "coordSetName": "Updated Summer Set",
        "colors": ["Yellow", "Black"]
    }
}
```

---

## 🔍 GET Single Coords

**Endpoint:**  
`GET /coords/coords-details/:id`

**Description:**  
Fetches a single coords style by its MongoDB ObjectId.

**Request Params:**  
- **id** — MongoDB ObjectId of the coords style.

**Success Response Example:**
```json
{
    "statusCode": 200,
    "message": "Coords fetched successfully for 64fef1234567890",
    "data": {
        "_id": "64fef1234567890",
        "coordStyleNumber": 101,
        "styleNumbers": [201, 202, 203],
        "coordSetName": "Updated Summer Set",
        "colors": ["Yellow", "Black"]
    }
}
```
