const CART_KEY = 'veloura_cart_v1';
const WISHLIST_KEY = 'veloura_wishlist_v1';
const ORDER_KEY = 'veloura_last_order_v1';

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not persist ${key}`, error);
  }
}

export const getCart = () => read(CART_KEY, []);
export const saveCart = (cart) => write(CART_KEY, cart);
export const getWishlist = () => read(WISHLIST_KEY, []);
export const saveWishlist = (wishlist) => write(WISHLIST_KEY, wishlist);
export const saveLastOrder = (order) => write(ORDER_KEY, order);
export const getLastOrder = () => read(ORDER_KEY, null);