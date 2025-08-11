# Qurvii Styles API Documentation

## Overview
This API manages Qurvii style records, including listing, retrieving, updating, and creating styles.

**Base URL:** `/api/v1/stylewise/regular-style`  
All endpoints are prefixed with the above base URL.

---

## **Routes**

### 1. **Get All Styles**
**Endpoint:**  

```js
 GET/qurvii-style
 ```

**Description:**  
Fetches a list of all Qurvii styles.

**Response:**
```json
{
  "statusCode": 200,
  "message": "Styles fetched successfully",
  "data": [
    {
      "_id": "64e4e2f2c2e6e8b1a0c9b123",
      "styleNumber": "15001",
      "styleName": "Summer Dress"
    }
  ]
}
```

2. Get Single Style

```js
GET /style-details/:id
```
Description:
Fetches a single Qurvii style by its MongoDB ObjectId.

Parameters:

id (string, required) — MongoDB ObjectId of the style.

```json
{
  "statusCode": 200,
  "message": "Style fetched successfully.",
  "data": {
    "_id": "64e4e2f2c2e6e8b1a0c9b123",
    "styleNumber": "15001",
    "styleName": "Summer Dress"
  }
}
```
3.Update Style

```js
POST/update/:id
```

Description:
Updates an existing Qurvii style.

Parameters:

id (string, required) — MongoDB ObjectId of the style.

Body:
```json
{
  "styleName": "Updated Name",
  "styleType": "Updated Type"
}
```

Reponse :
```json
{
  "statusCode": 202,
  "message": "15001 updated successfully.",
  "data": {
    "_id": "64e4e2f2c2e6e8b1a0c9b123",
    "styleNumber": "15001",
    "styleName": "Updated Name"
  }
}

```

4.Create Styles 

Endpoint:
```js
POST/create
```
Description:
Creates multiple new Qurvii styles.

Body:
```json
[
  {
    "styleNumber": "15002",
    "styleName": "New Dress",
    "styleType": "A-Line"
  },
  {
    "styleNumber": "15003",
    "styleName": "Evening Gown"
  }
]

```
Notes:

If any styleNumber already exists, it will be skipped.

If all provided styles already exist, an error will be returned.

Response:

```json
{
  "statusCode": 201,
  "message": "2 styles created successfully.",
  "data": [
    {
      "_id": "64e4e2f2c2e6e8b1a0c9b125",
      "styleNumber": "15002",
      "styleName": "New Dress"
    }
  ]
}

```
