# 🧾 Coords API Documentation

## Base URL
```
/api/v1/stylewise
```

---

## 1️⃣ Upload Coords Styles

**Endpoint**  
```
POST /coords/uploads
```

**Description**  
Creates multiple coords styles in the database, skipping any that already exist based on `coordStyleNumber`.

**Request Body**
```json
[
  {
    "coordStyleNumber": 30000,
    "styleNumbers": [17055, 17056],
    "coordSetName": "Navy and pink polka crepe shirt and pant co-ord set",
    "colors": ["Navy", "Pink"]
  },
  {
    "coordStyleNumber": 30001,
    "styleNumbers": [17057, 17058],
    "coordSetName": "Green floral cotton co-ord set",
    "colors": ["Green", "White"]
  }
]
```

**Responses**
- **201 Created**  
  ```json
  {
    "statusCode": 201,
    "message": "2 coords styles created successfully.",
    "data": [ ...createdDocuments ]
  }
  ```
- **400 Bad Request** – Request body empty or all styles already exist  
  ```json
  {
    "statusCode": 400,
    "message": "All styles already exist in the database"
  }
  ```

---

## 2️⃣ Get All Coords Styles

**Endpoint**  
```
GET /coords/all-coords
```

**Description**  
Fetches the complete list of coords styles.

**Responses**
- **200 OK**  
  ```json
  {
    "statusCode": 200,
    "message": "5 coords fetched successfully",
    "data": [ ...coordsStyles ]
  }
  ```
- **404 Not Found** – No coords available  
  ```json
  {
    "statusCode": 404,
    "message": "No coords style found."
  }
  ```

---

## 3️⃣ Get Single Coords Style

**Endpoint**  
```
GET /coords/coords-details/:id
```

**Path Parameters**
| Name | Type | Description |
|------|------|-------------|
| id   | string (ObjectId) | The MongoDB document ID |

**Description**  
Fetches a single coords style by its ID.

**Responses**
- **200 OK**  
  ```json
  {
    "statusCode": 200,
    "message": "Coords fetched successfully for 64f25d8b1a2c3e4567f89abc",
    "data": { ...coordsDocument }
  }
  ```
- **400 Bad Request** – Invalid or missing ID  
  ```json
  {
    "statusCode": 400,
    "message": "invalid Id format"
  }
  ```
- **404 Not Found** – No coords style for given ID  
  ```json
  {
    "statusCode": 404,
    "message": "Coords not found for this id"
  }
  ```

---

## 4️⃣ Update Coords Style

**Endpoint**  
```
POST /coords/update/:id
```

**Path Parameters**
| Name | Type | Description |
|------|------|-------------|
| id   | string (ObjectId) | The MongoDB document ID |

**Request Body**
```json
{
  "payload": {
    "coordSetName": "Updated Navy and Pink Co-ord Set",
    "colors": ["Navy", "Light Pink"]
  }
}
```

**Description**  
Updates a coords style document by ID.

**Responses**
- **200 OK**  
  ```json
  {
    "statusCode": 200,
    "message": "Coords style 30000 updated successfully",
    "data": { ...updatedDocument }
  }
  ```
- **400 Bad Request** – Missing ID or invalid payload  
  ```json
  {
    "statusCode": 400,
    "message": "Payload is required and must be a non-empty object"
  }
  ```
- **404 Not Found** – No coords style for given ID  
  ```json
  {
    "statusCode": 404,
    "message": "Coords style not found"
  }
  ```

---

## ⚠️ Error Response Structure
All error responses follow this format:
```json
{
  "statusCode": <number>,
  "message": "<error_message>"
}
```
