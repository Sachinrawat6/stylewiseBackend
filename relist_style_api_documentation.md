# Relist Style API Documentation

**Base URL:** `/api/v1/stylewise/relist`  
All endpoints are prefixed with the above base URL.

---

## 1. Get All Relisted Styles

- **Method:** `GET`
- **URL:** `/relisted`
- **Description:** Fetch all relisted styles from the database.
- **Response:**
```json
Status: 200 OK
[
  {
    "_id": "ObjectId",
    "oldSku": "string",
    "newSku": "string",
    "imageLink": "string",
    "createdBy": "string"
  }
]
```

---

## 2. Get Single Relist Style

- **Method:** `GET`
- **URL:** `/relist-details`
- **Description:** Fetch a single relist style by oldSku.
- **Request:**
  - **Query:**
    - `id` (string) - Required, valid oldSku.
- **Response:**
```json
Status: 200 OK
{
  "_id": "ObjectId",
  "oldSku": "string",
  "newSku": "string",
  "imageLink": "string",
  "createdBy": "string"
}
```

---

## 3. Update Relist Style

- **Method:** `POST`
- **URL:** `/update/:id`
- **Description:** Update a specific relist style by ID.
- **Request:**
  - **Params:**
    - `id` (string) - Required, valid MongoDB ObjectId.
  - **Body:** JSON object with fields to update.
- **Response:**
```json
Status: 202 Accepted
{
  "_id": "ObjectId",
  "oldSku": "string",
  "newSku": "string",
  "imageLink": "string",
  "createdBy": "string"
}
```

---

## 4. Create Relist Styles

- **Method:** `POST`
- **URL:** `/create`
- **Description:** Insert one or more new relist styles.
- **Request:**
  - **Body:** Non-empty JSON array of objects containing:
    - `oldSku` (string, required)
    - `newSku` (string, optional)
    - `imageLink` (string, optional)
    - `createdBy` (string, required)
- **Response:**
```json
Status: 201 Created
[
  {
    "_id": "ObjectId",
    "oldSku": "string",
    "newSku": "string",
    "imageLink": "string",
    "createdBy": "string"
  }
]
```

---

## Error Responses

- **400 Bad Request:** Invalid or missing parameters.
- **404 Not Found:** Resource not found.
- **500 Internal Server Error:** Unexpected server error.

