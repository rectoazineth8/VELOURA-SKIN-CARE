import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowRight, Check, ChevronDown, Heart, Menu, Minus, Plus,
  Search, ShoppingBag, Sparkles, Star, Trash2, X, Instagram, ArrowUpRight
} from './Icons';
import { products, categories, formatPrice } from './product';
import {
  getCart, saveCart, getWishlist, saveWishlist, saveLastOrder, getLastOrder
} from './storage';
import './App.css';

const navItems = ['Home', 'Shop', 'Our story'];

function App() {
  const [page, setPage] = useState('Home');
  const [cart, setCart] = useState(getCart);
  const [wishlist, setWishlist] = useState(getWishlist);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState('');
  const [order, setOrder] = useState(getLastOrder);
  const [checkoutData, setCheckoutData] = useState({ name: '', email: '', address: '', city: '', payment: 'Cash on delivery' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => saveCart(cart), [cart]);
  useEffect(() => saveWishlist(wishlist), [wishlist]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setToast(''), 2600);
  };

  const navigate = (next) => {
    setPage(next);
    setSelectedProduct(null);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, quantity = 1) => {
    setCart(current => {
      const found = current.find(item => item.id === product.id);
      return found
        ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...current, { id: product.id, quantity }];
    });
    notify(`${product.name} added to your bag`);
  };

  const changeQuantity = (id, delta) => {
    setCart(current => current
      .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter(item => item.quantity > 0));
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    setWishlist(current => exists ? current.filter(id => id !== product.id) : [...current, product.id]);
    notify(exists ? 'Removed from your wishlist' : 'Saved to your wishlist');
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setPage('Product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory = category === 'All' || product.category === category;
      const term = search.trim().toLowerCase();
      const matchesSearch = !term || `${product.name} ${product.brand} ${product.category} ${product.description}`.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price);
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price);
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, search, sort]);

  const checkoutErrors = {
    name: checkoutData.name.trim().length < 2 ? 'Please enter your full name.' : '',
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(checkoutData.email) ? 'Enter a valid email address.' : '',
    address: checkoutData.address.trim().length < 8 ? 'Please enter a complete street address.' : '',
    city: checkoutData.city.trim().length < 2 ? 'Please enter your city or municipality.' : ''
  };
  const validCheckout = Object.values(checkoutErrors).every(error => !error);

  const placeOrder = (event) => {
    event.preventDefault();
    setSubmitted(true);
    if (!validCheckout || cart.length === 0) return;
    const newOrder = {
      reference: `VL-${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }),
      customer: checkoutData,
      items: cart.map(item => ({ ...item, product: products.find(p => p.id === item.id) })),
      total: subtotal,
      payment: checkoutData.payment
    };
    setOrder(newOrder);
    saveLastOrder(newOrder);
    setCart([]);
    setSubmitted(false);
    navigate('Confirmation');
  };

  const ProductCard = ({ product }) => (
    <article className="product-card">
      <div className="product-image-wrap">
        <button className="image-button" onClick={() => openProduct(product)} aria-label={`View ${product.name}`}>
          <img src={product.image} alt={product.alt} loading="lazy" />
        </button>
        <span className="product-tag">{product.tag}</span>
        <button
          className={`wishlist-button ${wishlist.includes(product.id) ? 'is-saved' : ''}`}
          onClick={() => toggleWishlist(product)}
          aria-label={wishlist.includes(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        ><Heart size={17} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} /></button>
        <button className="quick-add" onClick={() => addToCart(product)}>Add to bag <Plus size={15} /></button>
      </div>
      <button className="product-meta" onClick={() => openProduct(product)}>
        <span className="product-brand">{product.brand}</span>
        <span className="product-name">{product.name}</span>
        <span className="product-bottom"><span>{formatPrice(product.price)}</span><span className="rating"><Star size={12} fill="currentColor" /> {product.rating.toFixed(1)}</span></span>
      </button>
    </article>
  );

  const Header = () => (
    <header className="site-header">
      <div className="announcement">A little luxury, delivered. Complimentary shipping on orders ₱3,500+</div>
      <div className="nav-shell">
        <button className="mobile-menu-btn icon-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu ? <X /> : <Menu />}</button>
        <nav className={`main-nav ${mobileMenu ? 'mobile-open' : ''}`} aria-label="Main navigation">
          {navItems.map(item => <button key={item} className={page === item ? 'nav-active' : ''} onClick={() => navigate(item)}>{item}</button>)}
          <button onClick={() => navigate('Shop')}>Discover</button>
        </nav>
        <button className="wordmark" onClick={() => navigate('Home')} aria-label="Veloura home">VELOURA<span>BEAUTY, CONSIDERED.</span></button>
        <div className="nav-actions">
          <button className="icon-btn search-toggle" onClick={() => { navigate('Shop'); document.getElementById('shop-search')?.focus(); }} aria-label="Search"><Search /></button>
          <button className="icon-btn" onClick={() => navigate('Wishlist')} aria-label={`Wishlist, ${wishlist.length} items`}><Heart />{wishlist.length > 0 && <i className="count-dot">{wishlist.length}</i>}</button>
          <button className="icon-btn bag-trigger" onClick={() => navigate('Cart')} aria-label={`Shopping bag, ${cartCount} items`}><ShoppingBag /><i className="count-dot">{cartCount}</i></button>
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="site-footer">
      <div className="footer-top">
        <div><button className="footer-logo" onClick={() => navigate('Home')}>VELOURA</button><p>Beauty, considered.<br />A softer kind of statement.</p></div>
        <div><span className="footer-heading">Explore</span><button onClick={() => navigate('Shop')}>Shop all</button><button onClick={() => navigate('Shop')}>Skincare</button><button onClick={() => navigate('Shop')}>Makeup</button><button onClick={() => navigate('Shop')}>Fragrance</button></div>
        <div><span className="footer-heading">The details</span><button onClick={() => navigate('Our story')}>Our story</button><a href="mailto:hello@veloura.example">Contact us</a><span>Shipping & returns</span><span>FAQs</span></div>
        <div className="footer-newsletter"><span className="footer-heading">A note from us</span><p>Thoughtful beauty, occasional notes. Stay close to what’s new.</p><form onSubmit={e => { e.preventDefault(); notify('Thank you for joining our list'); e.currentTarget.reset(); }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required /><button aria-label="Subscribe"><ArrowRight /></button></form></div>
      </div>
      <div className="footer-bottom"><span>© 2026 VELOURA BEAUTY. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION · PHILIPPINES</span><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={17} /></a></div>
    </footer>
  );

  const Home = () => (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line" /> THE ART OF EVERYDAY BEAUTY</span>
          <h1>Feel good<br />in your <em>own</em><br />glow.</h1>
          <p>Thoughtfully chosen essentials for the way you want to feel. A little ritual, a lasting feeling.</p>
          <button className="button button-dark" onClick={() => navigate('Shop')}>Discover the collection <ArrowUpRight size={16} /></button>
          <span className="hero-note">01 — BEAUTY, WITHOUT THE NOISE</span>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1500&q=90" alt="Minimal luxury skincare and beauty products in warm natural light" />
          <div className="hero-image-caption"><span>THE VELOURA EDIT</span><span>Less, but lovelier.</span></div>
          <div className="hero-stamp"><Sparkles size={19} /><span>MADE FOR<br />YOUR MOMENT</span></div>
        </div>
      </section>
      <section className="intro-strip"><span>01 / A MORE PERSONAL RITUAL</span><p>Beauty is not about becoming someone else.<br /><em>It’s about coming home to yourself.</em></p><span>SCROLL TO EXPLORE ↓</span></section>
      <section className="section featured-section">
        <div className="section-heading"><div><span className="eyebrow">A FEW GOOD THINGS</span><h2>The considered edit.</h2></div><button className="text-link" onClick={() => navigate('Shop')}>Shop all products <ArrowUpRight size={16} /></button></div>
        <div className="product-grid">{products.slice(0, 4).map(product => <React.Fragment key={product.id}>{ProductCard({ product })}</React.Fragment>)}</div>
      </section>
      <section className="editorial">
        <div className="editorial-image"><img src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1200&q=85" alt="Softly lit skincare jar and cream textures" loading="lazy" /></div>
        <div className="editorial-copy"><span className="eyebrow">THE SKIN NOTES · 01</span><h2>Make room<br />for <em>softness.</em></h2><p>Small moments can change the feel of a day. Start with a texture you love, a scent that stays, and a routine that feels like yours.</p><button className="button button-outline" onClick={() => { setCategory('Skincare'); navigate('Shop'); }}>Explore skincare <ArrowUpRight size={16} /></button><span className="editorial-index">A DAILY PRACTICE, NOT A PERFORMANCE.</span></div>
      </section>
      <section className="quote-section"><span className="eyebrow">A VELOURA THOUGHT</span><p>“The best kind of beauty<br />feels like <em>you.</em>”</p><span>— THE VELOURA PHILOSOPHY</span></section>
    </>
  );

  const Shop = () => (
    <main className="page-container shop-page">
      <div className="page-intro"><span className="eyebrow">THE VELOURA COLLECTION</span><h1>Find your <em>feeling.</em></h1><p>Considered essentials for skin, color and scent.</p></div>
      <div className="shop-toolbar">
        <div className="category-tabs">{categories.map(item => <button key={item} className={category === item ? 'category-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="shop-tools"><label className="search-field" htmlFor="shop-search"><Search size={16} /><input id="shop-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search the collection" /></label><label className="sort-select"><span className="sr-only">Sort products</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="rating">Top rated</option></select><ChevronDown size={14} /></label></div>
      </div>
      <div className="result-count">{filteredProducts.length} thoughtfully selected pieces</div>
      {filteredProducts.length ? <div className="product-grid shop-grid">{filteredProducts.map(product => <React.Fragment key={product.id}>{ProductCard({ product })}</React.Fragment>)}</div> : <EmptyState title="Nothing found just yet." text="Try another search or explore the full collection." action="Clear filters" onAction={() => { setSearch(''); setCategory('All'); }} />}
    </main>
  );

  const Product = () => selectedProduct ? (
    <main className="page-container detail-page">
      <button className="back-link" onClick={() => navigate('Shop')}><ArrowLeft size={15} /> Back to collection</button>
      <div className="detail-layout">
        <div className="detail-image"><img src={selectedProduct.image} alt={selectedProduct.alt} /></div>
        <div className="detail-copy"><span className="eyebrow">{selectedProduct.brand} / {selectedProduct.category}</span><h1>{selectedProduct.name}</h1><div className="detail-rating"><span><Star size={14} fill="currentColor" /> {selectedProduct.rating.toFixed(1)}</span><span>{selectedProduct.reviews} reviews</span></div><div className="detail-price">{formatPrice(selectedProduct.price)}</div><p className="detail-description">{selectedProduct.description}</p><div className="detail-spec"><span>{selectedProduct.shade || selectedProduct.size}</span><span>{selectedProduct.tag}</span></div><button className="button button-dark add-detail" onClick={() => addToCart(selectedProduct)}>Add to bag — {formatPrice(selectedProduct.price)} <ShoppingBag size={16} /></button><button className={`detail-wishlist ${wishlist.includes(selectedProduct.id) ? 'is-saved' : ''}`} onClick={() => toggleWishlist(selectedProduct)}><Heart size={16} fill={wishlist.includes(selectedProduct.id) ? 'currentColor' : 'none'} /> {wishlist.includes(selectedProduct.id) ? 'Saved to wishlist' : 'Add to wishlist'}</button><div className="detail-accordions"><details open><summary>Product notes <Plus size={14} /></summary><p>Thoughtfully selected ingredients and textures, designed to become part of your everyday ritual.</p></details><details><summary>Delivery & returns <Plus size={14} /></summary><p>Complimentary shipping on orders ₱3,500 and above. Unopened items may be returned within 7 days of delivery.</p></details></div></div>
      </div>
      <section className="section related-section"><div className="section-heading"><div><span className="eyebrow">MORE TO LOVE</span><h2>Keep exploring.</h2></div><button className="text-link" onClick={() => navigate('Shop')}>View collection <ArrowRight size={16} /></button></div><div className="product-grid">{products.filter(p => p.id !== selectedProduct.id).slice(0, 4).map(p => <React.Fragment key={p.id}>{ProductCard({ product: p })}</React.Fragment>)}</div></section>
    </main>
  ) : Shop();

  const EmptyState = ({ title, text, action, onAction }) => (
    <div className="empty-state"><div className="empty-icon"><Sparkles size={24} /></div><h2>{title}</h2><p>{text}</p>{action && <button className="button button-dark" onClick={onAction}>{action} <ArrowRight size={15} /></button>}</div>
  );

  const Cart = () => (
    <main className="page-container interior-page">
      <div className="page-intro compact-intro"><span className="eyebrow">YOUR SELECTION</span><h1>Shopping <em>bag.</em></h1><p>{cartCount} {cartCount === 1 ? 'piece' : 'pieces'} in your bag</p></div>
      {cart.length === 0 ? <EmptyState title="A little room for lovely things." text="Your bag is waiting for something special." action="Explore the collection" onAction={() => navigate('Shop')} /> : <div className="cart-layout"><div className="cart-items">{cart.map(item => { const product = products.find(p => p.id === item.id); if (!product) return null; return <article className="cart-item" key={item.id}><button className="cart-thumb" onClick={() => openProduct(product)}><img src={product.image} alt={product.alt} /></button><div className="cart-item-info"><span className="product-brand">{product.brand}</span><button className="cart-product-name" onClick={() => openProduct(product)}>{product.name}</button><span className="cart-unit-price">{formatPrice(product.price)}</span><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button></div></div><div className="cart-item-end"><strong>{formatPrice(product.price * item.quantity)}</strong><button className="remove-button" onClick={() => { setCart(current => current.filter(row => row.id !== item.id)); notify('Item removed from your bag'); }} aria-label={`Remove ${product.name}`}><Trash2 size={15} /></button></div></article>; })}</div><aside className="order-summary"><span className="eyebrow">THE SUMMARY</span><h2>Your order.</h2><div className="summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-line"><span>Shipping</span><span>{subtotal >= 3500 ? 'Complimentary' : 'Calculated at checkout'}</span></div><div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div><button className="button button-dark full-button" onClick={() => navigate('Checkout')}>Continue to checkout <ArrowRight size={16} /></button><p className="secure-note"><Check size={13} /> Thoughtful service, every step of the way.</p><button className="continue-link" onClick={() => navigate('Shop')}>Continue shopping</button></aside></div>}
    </main>
  );

  const Wishlist = () => {
    const savedProducts = products.filter(product => wishlist.includes(product.id));
    return <main className="page-container interior-page"><div className="page-intro compact-intro"><span className="eyebrow">THE THINGS YOU LOVE</span><h1>Your <em>wishlist.</em></h1><p>A little collection of future favorites.</p></div>{savedProducts.length ? <div className="product-grid shop-grid">{savedProducts.map(product => <React.Fragment key={product.id}>{ProductCard({ product })}</React.Fragment>)}</div> : <EmptyState title="Keep the lovely things close." text="Tap the heart on anything that catches your eye. We’ll keep it here for you." action="Discover your favorites" onAction={() => navigate('Shop')} />}</main>;
  };

  const Checkout = () => (
    <main className="page-container interior-page">
      <button className="back-link" onClick={() => navigate('Cart')}><ArrowLeft size={15} /> Back to bag</button>
      <div className="page-intro compact-intro"><span className="eyebrow">ALMOST YOURS</span><h1>Check <em>out.</em></h1><p>A few details, then your next favorite is on its way.</p></div>
      {cart.length === 0 ? <EmptyState title="Your bag is looking a little light." text="Add something lovely before heading to checkout." action="Explore the collection" onAction={() => navigate('Shop')} /> : <form className="checkout-layout" onSubmit={placeOrder} noValidate><div className="checkout-form"><section className="form-section"><span className="eyebrow">01 / YOUR DETAILS</span><h2>Where should we find you?</h2><div className="form-grid">{Field({ label: "Full name", name: "name", value: checkoutData.name, onChange: value => setCheckoutData({ ...checkoutData, name: value }), error: submitted && checkoutErrors.name, placeholder: "Your full name" })}{Field({ label: "Email address", name: "email", value: checkoutData.email, onChange: value => setCheckoutData({ ...checkoutData, email: value }), error: submitted && checkoutErrors.email, placeholder: "you@example.com", type: "email" })}{Field({ label: "Street address", name: "address", value: checkoutData.address, onChange: value => setCheckoutData({ ...checkoutData, address: value }), error: submitted && checkoutErrors.address, placeholder: "House number, street, barangay", wide: true })}{Field({ label: "City / Municipality", name: "city", value: checkoutData.city, onChange: value => setCheckoutData({ ...checkoutData, city: value }), error: submitted && checkoutErrors.city, placeholder: "Your city or municipality" })}</div></section><section className="form-section payment-section"><span className="eyebrow">02 / PAYMENT</span><h2>Choose how to pay.</h2><div className="payment-options">{['Cash on delivery', 'Bank transfer', 'GCash (demo)'].map(method => <label key={method} className={checkoutData.payment === method ? 'payment-option selected' : 'payment-option'}><input type="radio" name="payment" value={method} checked={checkoutData.payment === method} onChange={e => setCheckoutData({ ...checkoutData, payment: e.target.value })} /><span className="radio-mark" /><span>{method}</span>{checkoutData.payment === method && <Check size={15} />}</label>)}</div><p className="demo-note">Demo checkout only — no payment will be collected.</p></section><button className="button button-dark full-button place-order" type="submit">Place your order <ArrowRight size={16} /></button></div><aside className="order-summary checkout-summary"><span className="eyebrow">03 / YOUR ORDER</span><h2>A lovely choice.</h2>{cart.map(item => { const p = products.find(product => product.id === item.id); return p ? <div className="checkout-mini-item" key={item.id}><img src={p.image} alt="" /><div><strong>{p.name}</strong><span>Qty {item.quantity}</span></div><b>{formatPrice(p.price * item.quantity)}</b></div> : null; })}<div className="summary-line"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div className="summary-line"><span>Shipping</span><span>{subtotal >= 3500 ? 'Complimentary' : 'At checkout'}</span></div><div className="summary-total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div><p className="secure-note"><Check size={13} /> Your details stay within this demo experience.</p></aside></form>}
    </main>
  );

  const Field = ({ label, name, value, onChange, error, placeholder, type = 'text', wide }) => (
    <div className={`field ${wide ? 'field-wide' : ''}`}><label htmlFor={`field-${name}`}>{label}</label><input id={`field-${name}`} name={name} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} aria-invalid={Boolean(error)} aria-describedby={error ? `error-${name}` : undefined} />{error && <span className="field-error" id={`error-${name}`}>{error}</span>}</div>
  );

  const Confirmation = () => (
    <main className="page-container confirmation-page"><div className="confirmation-card"><div className="confirmation-icon"><Check size={27} /></div><span className="eyebrow">A MOMENT WORTH CELEBRATING</span><h1>Thank you,<br /><em>{order?.customer?.name?.split(' ')[0] || 'beautiful'}.</em></h1><p>Your order has been placed. We’re getting your little luxuries ready.</p><div className="reference-box"><span>ORDER REFERENCE</span><strong>{order?.reference || '—'}</strong><span>{order?.date || ''}</span></div><div className="confirmation-details"><div><span>DELIVERING TO</span><strong>{order?.customer?.address}, {order?.customer?.city}</strong></div><div><span>PAYMENT METHOD</span><strong>{order?.payment}</strong></div><div><span>ORDER TOTAL</span><strong>{formatPrice(order?.total || 0)}</strong></div></div><button className="button button-dark" onClick={() => navigate('Shop')}>Continue exploring <ArrowRight size={16} /></button><p className="confirmation-footnote">This is a simulated order confirmation. No payment or shipment has been created.</p></div></main>
  );

  const Story = () => <main className="page-container story-page"><div className="page-intro"><span className="eyebrow">A NOTE ON BEAUTY</span><h1>Beauty, <em>considered.</em></h1><p>Less noise. More feeling. Always you.</p></div><div className="story-layout"><img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85" alt="Thoughtfully arranged beauty and skincare products" /><div><span className="eyebrow">OUR POINT OF VIEW</span><h2>Make space for<br /><em>what matters.</em></h2><p>VELOURA is a considered edit of beauty essentials for the everyday. We believe the right products should feel intuitive, personal and quietly special — never complicated.</p><p>From a texture that makes your morning to a fragrance that feels like a familiar place, every piece in our collection is chosen to make ordinary moments feel a little more yours.</p><button className="button button-dark" onClick={() => navigate('Shop')}>Explore the collection <ArrowUpRight size={16} /></button></div></div></main>;

  return (
    <div className="app-shell">
      <Header />
      {page === 'Home' && Home()}
      {page === 'Shop' && Shop()}
      {page === 'Product' && Product()}
      {page === 'Cart' && Cart()}
      {page === 'Wishlist' && Wishlist()}
      {page === 'Checkout' && Checkout()}
      {page === 'Confirmation' && Confirmation()}
      {page === 'Our story' && Story()}
      <Footer />
      {toast && <div className="toast" role="status"><Check size={16} />{toast}</div>}
    </div>
  );
}

export default App;