export const categories = ['All', 'Makeup', 'Skincare', 'Fragrance'];

export const products = [
  {
    id: 'vl-001',
    name: 'Lumière Skin Veil',
    brand: 'VELOURA complexion',
    category: 'Makeup',
    price: 1890,
    rating: 4.9,
    reviews: 128,
    tag: 'BESTSELLER',
    shade: '12 shades',
    description: 'A breathable, second-skin foundation with a luminous satin finish. Buildable coverage melts into the complexion for a naturally perfected look that feels as beautiful as it appears.',
    image: 'https://masha.com.my/products/Cosmetic/Foundation%20Liquid.png',
    alt: 'Elegant glass foundation bottle on a warm neutral background'
  },
  {
    id: 'vl-002',
    name: 'Satin Muse Lipstick',
    brand: 'VELOURA color',
    category: 'Makeup',
    price: 990,
    rating: 4.8,
    reviews: 94,
    tag: 'CULT FAVORITE',
    shade: 'Rosewood',
    description: 'A creamy, comfortable lipstick with rich color payoff and a soft satin finish. The conditioning formula glides on effortlessly, leaving lips feeling smooth and beautifully defined.',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=1000&q=85',
    alt: 'Luxury rose toned lipstick close-up'
  },
  {
    id: 'vl-003',
    name: 'Petal Glass Lip Gloss',
    brand: 'VELOURA color',
    category: 'Makeup',
    price: 850,
    rating: 4.7,
    reviews: 76,
    tag: 'NEW',
    shade: 'Petal nude',
    description: 'A cushiony, non-sticky gloss that wraps lips in a sheer veil of reflective shine. Wear alone for a fresh glow or layer over your favorite lipstick.',
    image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1000&q=85',
    alt: 'Nude pink lip gloss cosmetic product'
  },
  {
    id: 'vl-004',
    name: 'Soft Focus Cream Blush',
    brand: 'VELOURA color',
    category: 'Makeup',
    price: 1150,
    rating: 4.9,
    reviews: 63,
    tag: 'EDITOR’S PICK',
    shade: 'Sunday blush',
    description: 'A silky cream blush that blends seamlessly into skin for a soft-focus flush. Its lightweight, buildable texture gives cheeks a fresh-from-within wash of color.',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=85',
    alt: 'Soft pink blush compact and makeup brush'
  },
  {
    id: 'vl-005',
    name: 'Noir Lash Definition',
    brand: 'VELOURA color',
    category: 'Makeup',
    price: 790,
    rating: 4.6,
    reviews: 51,
    tag: 'EVERYDAY ESSENTIAL',
    shade: 'Deep black',
    description: 'A defining mascara that separates, lengthens and lifts lashes with a clean, buildable finish. The precision brush reaches even the smallest lashes without weighing them down.',
    image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?auto=format&fit=crop&w=1000&q=85',
    alt: 'Black mascara tube with minimal beauty styling'
  },
  {
    id: 'vl-006',
    name: 'Cloudmilk Gentle Cleanser',
    brand: 'VELOURA skin',
    category: 'Skincare',
    price: 1250,
    rating: 4.8,
    reviews: 112,
    tag: 'DAILY RITUAL',
    size: '150 ml',
    description: 'A comforting, low-foam cleanser that lifts away daily impurities while helping skin feel soft and balanced. A gentle first step for a calm, considered skincare ritual.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85',
    alt: 'Minimal skincare cleanser bottle with botanical details'
  },
  {
    id: 'vl-007',
    name: 'Dew Theory Barrier Cream',
    brand: 'VELOURA skin',
    category: 'Skincare',
    price: 1690,
    rating: 4.9,
    reviews: 87,
    tag: 'HYDRATION HERO',
    size: '50 ml',
    description: 'A plush daily moisturizer designed to leave skin feeling replenished and supple. The comforting cream texture melts in without a heavy finish, making it ideal morning or night.',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=85',
    alt: 'Cream skincare jar in a soft beige studio setting'
  },
  {
    id: 'vl-008',
    name: 'Stillwater Renewal Serum',
    brand: 'VELOURA skin',
    category: 'Skincare',
    price: 2150,
    rating: 4.8,
    reviews: 69,
    tag: 'SKIN FAVORITE',
    size: '30 ml',
    description: 'A lightweight, silky serum that layers beautifully beneath moisturizer. A simple, daily-care essential for a fresh-looking, well-hydrated complexion.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=85',
    alt: 'Amber glass serum dropper bottle'
  },
  {
    id: 'vl-009',
    name: 'Santal No. 08 Eau de Parfum',
    brand: 'VELOURA scent',
    category: 'Fragrance',
    price: 3290,
    rating: 5.0,
    reviews: 42,
    tag: 'SIGNATURE SCENT',
    size: '50 ml',
    description: 'An intimate, quietly magnetic fragrance blending creamy woods, soft amber and a delicate floral warmth. A modern skin scent made to linger close.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=85',
    alt: 'Amber perfume bottle photographed in warm light'
  }
];

export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0
  }).format(amount);