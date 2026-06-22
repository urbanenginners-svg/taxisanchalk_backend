# MongoDB Atlas Search — Setup Guide

This document explains how to create the Atlas Search index required for
advanced product search (fuzzy matching and autocomplete).

---

## Step 1 — Create the `product_search` index on the `products` collection

1. Log in to [MongoDB Atlas](https://cloud.mongodb.com).
2. Navigate to your cluster → **Search** tab → **Create Search Index**.
3. Choose **JSON Editor** and select collection **`products`**.
4. Name the index **`product_search`** and paste the JSON below.

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "name": [
        {
          "type": "string",
          "analyzer": "lucene.standard"
        },
        {
          "type": "autocomplete",
          "analyzer": "lucene.standard",
          "tokenization": "edgeGram",
          "minGrams": 2,
          "maxGrams": 15,
          "foldDiacritics": true
        }
      ],
      "hindiName": [
        {
          "type": "string",
          "analyzer": "lucene.standard"
        },
        {
          "type": "autocomplete",
          "tokenization": "edgeGram",
          "minGrams": 2,
          "maxGrams": 15
        }
      ],
      "aliases": [
        {
          "type": "string",
          "analyzer": "lucene.standard"
        },
        {
          "type": "autocomplete",
          "tokenization": "edgeGram",
          "minGrams": 2,
          "maxGrams": 15,
          "foldDiacritics": true
        }
      ],
      "tags": [
        {
          "type": "string",
          "analyzer": "lucene.standard"
        }
      ],
      "description": [
        {
          "type": "string",
          "analyzer": "lucene.standard"
        }
      ],
      "isActive": [
        {
          "type": "boolean"
        }
      ],
      "deletedAt": [
        {
          "type": "date"
        }
      ]
    }
  }
}
```

5. Click **Create Search Index** and wait for the index to become **Active** (~1–2 min).

---

## Step 2 — Add `aliases` to products

For each product, use `PUT /api/v1/products/:id` to add the `aliases` array.
Include regional names, Hindi transliterations, and common misspellings.

```json
{ "aliases": ["aloo", "alu", "aaloo", "batata"] }
```

| Product | Suggested aliases |
|---|---|
| Potato | `["aloo", "alu", "aaloo", "batata"]` |
| Tomato | `["tamatar", "tometo"]` |
| Onion | `["pyaz", "kanda", "pyaaj"]` |
| Garlic | `["lahsun"]` |
| Ginger | `["adrak"]` |
| Spinach | `["palak"]` |
| Cauliflower | `["gobhi", "phool gobhi"]` |
| Carrot | `["gajar"]` |
| Peas | `["matar"]` |
| Rice | `["chawal"]` |
| Wheat | `["gehun", "atta"]` |

---

## How the search works end-to-end

```
User types "alo"
        │
        ▼
GET /api/v1/products/global-suggestions?q=alo
  OR
GET /api/v1/products/suggestions?q=alo&area=area::...
        │
        ▼
Atlas $search
  autocomplete "alo" on name / hindiName / aliases  → matches "Aloo", "Potato"
  text fuzzy (maxEdits:1) on name / hindiName / aliases / tags
        │
        ▼
Returns: [{ name:"Potato", hindiName:"आलू", category:"Vegetables", score:4.2 }, ...]

User clicks "Potato"
        │
        ▼
GET /api/v1/products/by-area?area=...&q=Potato
        │
        ▼
atlasSearchProductIds("Potato")  → ["pdt::abc", "pdt::def", ...]
        │
        ▼
Pricing aggregation filtered to those product IDs
        │
        ▼
Returns full product list with variants + pricing

Also shown: GET /api/v1/products/:id/related?area=...
        → same-category + overlapping-tag products
```

---

## Local Development (without Atlas)

The service automatically falls back to MongoDB `$regex` when the Atlas Search
index is unavailable. You will see this log line:

```
[ProductService] Atlas Search index "product_search" error (falling back to $regex): ...
```

Fuzzy matching will **not** work in fallback mode, but basic substring search
(including `aliases`) will continue to function.
