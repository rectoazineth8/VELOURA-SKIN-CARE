# VELOURA — Premium Beauty Store

A complete, responsive React + Vite storefront concept for a premium beauty, skincare, makeup and fragrance brand. Includes product discovery, product detail views, cart, wishlist, validated checkout and order confirmation.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

The production-ready site is generated in `dist/`.

## StackBlitz

1. Download and extract `veloura-beauty-store.zip`.
2. In StackBlitz, choose **Create Project → Vite → React** (or open a new React + Vite project).
3. Upload/drag the extracted project files into the StackBlitz file explorer, replacing the starter `src` folder and root configuration files.
4. Make sure the final structure matches the tree below. StackBlitz will install dependencies from `package.json`.
5. Run `npm run dev` from the terminal, or use the Start/Run control.

## Project structure

```text
veloura-beauty-store/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── App.jsx
    ├── App.css
    ├── index.css
    ├── main.jsx
    ├── product.js
    └── storage.js
```

## Included functionality

- Home, Shop, Product Details, Cart, Wishlist, Checkout and Order Confirmation views
- Nine distinct sample products with category, brand, PHP price, description, rating, tag and individual image
- Live search, category filtering and price/rating sorting
- Add/remove cart items, quantity controls, item count and automatic totals
- Persistent cart and wishlist using `localStorage`
- Checkout form with live validation for name, email, address and city
- Payment method selection and simulated order submission
- Generated order reference and confirmation summary
- Responsive desktop/mobile navigation and layouts
- Lazy-loaded product imagery, skeleton placeholders, accessible labels and feedback toast

## Notes

- This is a front-end demo. Checkout does not process real payments, create shipments or send emails.
- Product photography is loaded from Unsplash over the internet. Replace the image URLs in `src/product.js` with your own licensed assets for production.
- Cart and wishlist data are stored in the current browser's `localStorage`.
- Philippine peso values are sample prices and can be edited in `src/product.js`.

