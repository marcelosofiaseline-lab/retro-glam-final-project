# Retro Glam — Final Project (Web Publishing & Digital Advertising)

A fictional Y2K / 2000s-revival clothing brand website built with Node.js, Express, HTML, CSS, and vanilla JavaScript.

## How to run

1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   npm start
   ```
3. Open the site in your browser:
   ```
   http://localhost:3000
   ```
   This loads the **Registration page** first (as required). After registering you're redirected to the Home page.

## Site map

| Route              | Page                                              |
|---------------------|----------------------------------------------------|
| `/`                 | Register (entry point)                              |
| `/home`             | Landing page — hero, about, featured products, promo banner, embedded video |
| `/shop`             | Products page — SHEIN-style grid with live search & category filters |
| `/features`         | Feature page — brand strengths                     |
| `/contact`          | Contact Us page — form + company info               |
| `/profile` / `/edit-profile` | Member account pages                      |
| `/social-campaign`  | Social Media Marketing campaign mockup (Part II)     |
| `/email-campaign`   | Email Marketing campaign mockup (Part III)           |

## API / data integration (Part IV)

Two datasets, retrieved and displayed with REST `GET` requests (JSON):

- **Dataset 1 — Products** (`public/data/products.json`)
  - `GET /api/products` — all products
  - `GET /api/products/:id` — single product
  - `GET /api/products-search?q=&category=` — search/filter (used live on `/shop`)
- **Dataset 2 — Customers** (in-memory array in `server.js`)
  - `GET /api/customers` — all customers
  - `GET /api/customers/:id` — single customer (used live on `/profile`)
  - `GET /api/search?q=` — search customers by name

Registration (`POST /register`) adds a new customer to Dataset 2, mirroring the sample server pattern that was provided.

## Notes for the video (Part I.5)

Swap the placeholder YouTube embed in `public/pages/index.html` (search for the `<iframe>` in the "MULTIMEDIA / PROMO VIDEO" section) with your own promotional video link.

## Folder structure

```
retro-glam/
├── server.js
├── package.json
└── public/
    ├── css/style.css
    ├── js/main.js
    ├── data/products.json
    └── pages/
        ├── register.html
        ├── login.html
        ├── index.html
        ├── shop.html
        ├── features.html
        ├── contact.html
        ├── profile.html
        ├── edit-profile.html
        ├── social-campaign.html
        └── email-campaign.html
```
