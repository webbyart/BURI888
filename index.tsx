

import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const mockCategories = ['ทั้งหมด', '- สายร้อน', '- สายเย็น', '- สายไลท์', '- สายหวาน/ผลไม้', '- มีเม็ดกด/บีบ', '- โปรโมชั่น'];

const initialProductsData = [
  { id: 1, title: 'GM แดง Gold Mark', price: 450, promoPrice: 370, image: 'https://placehold.co/400x550/fefefe/333?text=GM%0ARed&font=kanit', badge: { text: 'Hot', type: 'hot' }, category: '- สายร้อน', description: 'บุหรี่ GM แดง Gold Mark รสชาติเข้มข้น จัดจ้านถึงใจ', inStock: true },
  { id: 2, title: 'Marlboro Ice Blast', price: 650, promoPrice: null, image: 'https://placehold.co/400x550/fefefe/333?text=Marlboro%0AIce+Blast&font=kanit', badge: { text: 'New', type: 'new' }, category: '- สายเย็น', description: 'เย็นสุดขั้วกับเม็ดบีบ blast', inStock: true },
  { id: 3, title: 'Raison French Black', price: 580, promoPrice: null, image: 'https://placehold.co/400x550/fefefe/333?text=Raison%0AFrench+Black&font=kanit', badge: null, category: '- สายร้อน', description: 'รสชาติคลาสสิก สไตล์ฝรั่งเศส', inStock: false },
  { id: 4, title: 'Winston Classic', price: 420, promoPrice: null, image: 'https://placehold.co/400x550/fefefe/333?text=Winston%0AClassic&font=kanit', badge: null, category: '- สายไลท์', description: 'นุ่มเบา สูบสบาย', inStock: true },
  { id: 5, title: 'Esse Change Grape', price: 550, promoPrice: 500, image: 'https://placehold.co/400x550/fefefe/333?text=Esse%0AChange+Grape&font=kanit', badge: { text: 'Promo', type: 'promo' }, category: '- มีเม็ดกด/บีบ', description: 'หอมกลิ่นองุ่น ชื่นใจ', inStock: true },
  { id: 6, title: 'Zest Marula', price: 480, promoPrice: null, image: 'https://placehold.co/400x550/fefefe/333?text=Zest%0AMarula&font=kanit', badge: null, category: '- สายหวาน/ผลไม้', description: 'กลิ่นผลไม้แอฟริกันอันเป็นเอกลักษณ์', inStock: true },
  { id: 7, title: 'Oris Fusion', price: 510, promoPrice: null, image: 'https://placehold.co/400x550/fefefe/333?text=Oris%0AFusion&font=kanit', badge: null, category: '- สายร้อน', description: 'ผสมผสานอย่างลงตัว', inStock: false },
  { id: 8, title: 'Lucky Strike Red', price: 700, promoPrice: 650, image: 'https://placehold.co/400x550/fefefe/333?text=Lucky+Strike%0ARed&font=kanit', badge: { text: 'Hot', type: 'hot' }, category: '- สายร้อน', description: 'ตำนานความเข้ม ที่คุณคุ้นเคย', inStock: true },
];

const STORAGE_KEY = 'buri888_products';

const getInitialProducts = () => {
    try {
        const storedProducts = window.localStorage.getItem(STORAGE_KEY);
        if (storedProducts) {
            return JSON.parse(storedProducts);
        }
    } catch (error) {
        console.error("Could not parse products from localStorage", error);
    }
    return initialProductsData; // Fallback to mock data
};


const Header = ({ page, setPage, isLoggedIn }) => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleNavClick = (e, pageName) => {
      e.preventDefault();
      setPage(pageName);
      window.scrollTo(0, 0);
  }

  return (
    <header className={`site-header ${isSticky ? 'sticky' : ''}`}>
      <div className="container">
        <div className="logo">GA</div>
        <nav className="main-nav" role="navigation" aria-label="หลัก">
          <a href="#" onClick={(e) => handleNavClick(e, 'home')} className={page === 'home' ? 'active' : ''}>สินค้าทั้งหมด</a>
          <a href="#" onClick={(e) => handleNavClick(e, 'how-to')} className={page === 'how-to' ? 'active' : ''}>วิธีสั่งซื้อ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); alert('หน้าสำหรับรีวิวกำลังจะมาเร็วๆนี้');}} >รีวิว</a>
          <a href="#" onClick={(e) => handleNavClick(e, 'admin')} className="btn btn-outline">{isLoggedIn ? 'Dashboard' : 'จัดการร้าน'}</a>
        </nav>
        <a className="btn-line" href="https://line.me/R/ti/p/@332sevgu" target="_blank" rel="noopener noreferrer">Line</a>
      </div>
    </header>
  );
};

const CategoryFilter = ({ activeCategory, setActiveCategory, products }) => {
  const promoCount = products.filter(p => p.promoPrice).length;

  return (
    <section className="category-filter-bar" aria-label="ตัวกรองหมวดหมู่สินค้า">
      <div className="container">
        {mockCategories.map(category => {
          const isPromo = category === '- โปรโมชั่น';
          return (
            <button
              key={category}
              className={activeCategory === category ? 'active' : ''}
              onClick={() => setActiveCategory(category)}
            >
              {category}
              {isPromo && promoCount > 0 && <span className="category-badge">{promoCount}</span>}
            </button>
          );
        })}
      </div>
    </section>
  );
};

interface Product {
    id: number;
    title: string;
    price: number;
    promoPrice: number | null;
    image: string;
    badge: { text: string; type: string; } | null;
    category: string;
    description: string;
    inStock: boolean;
}

interface ProductCardProps {
    product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a href={`/product/${product.id}`} className="product-card">
      <div className="thumb">
        {!product.inStock && <div className="out-of-stock-overlay">สินค้าหมด</div>}
        <img src={product.image} alt={product.title} loading="lazy" />
        {product.badge && <span className={`badge ${product.badge.type}`}>{product.badge.text}</span>}
      </div>
      <div className="body">
        <h3 className="title">{product.title}</h3>
        <div>
            <div className="price-wrapper">
              {product.promoPrice ? (
                <>
                  <span className="price promo">฿{product.promoPrice.toLocaleString()}</span>
                  <s className="price original">฿{product.price.toLocaleString()}</s>
                </>
              ) : (
                <span className="price">฿{product.price.toLocaleString()}</span>
              )}
            </div>
            <div className="actions">
                <button 
                    className="btn-add" 
                    onClick={(e) => { e.preventDefault(); alert(`เพิ่ม '${product.title}' ลงตะกร้า`); }}
                    disabled={!product.inStock}
                >
                    {product.inStock ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}
                </button>
            </div>
        </div>
      </div>
    </a>
  );
};

const ProductGrid = ({ products }) => (
    <section className="product-grid" aria-label="รายการสินค้า">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
);

const HowToOrderPage = () => (
    <main className="container how-to-order-page">
        <section className="info-section">
            <h2>ขั้นตอนการสั่งซื้อ</h2>
            <ol className="styled-list">
                <li>เลือกสินค้า &gt; เลือกดูสินค้าที่ต้องการจากหน้าเว็บ/หรือสอบถามแอดมินทางไลน์</li>
                <li>ติดต่อ Line &gt; แจ้งชื่อสินค้าหรือรหัสกับทางแอดมินผ่านระบบไลน์เท่านั้น</li>
                <li>ยืนันออเดอร์ &gt; แจ้งชื่อผู้รับ ที่อยู่ผู้รับ เบอร์โทรศัพท์ และยืนยันรายการสินค้า</li>
                <li>จัดส่งสินค้า &gt; ทางร้านจะเตรียมสินค้าและจัดส่งทันที รอรับสินค้าไม่เกิน 3-5 วัน</li>
            </ol>
        </section>

        <section className="info-section">
            <h2>ช่องทางการชำระเงิน</h2>
            <div className="content-grid">
                <div className="info-card">
                    <h3>1. โอนผ่านธนาคาร</h3>
                    <p>โอนเงินผ่านแอปธนาคาร หรือ ATM</p>
                    <ul>
                        <li>ขอเลขบัญชีธนาคารในการโอนเงินทุกครั้งผ่านไลน์เท่านั้น</li>
                    </ul>
                    <a href="https://line.me/R/ti/p/@332sevgu" className="btn-line-cta" target="_blank" rel="noopener noreferrer">
                        ขอเลขบัญชีทาง Line: @332sevgu
                    </a>
                </div>
                <div className="info-card">
                    <h3>2. เก็บเงินปลายทาง</h3>
                    <p>จ่ายเงินเมื่อได้รับสินค้า</p>
                    <ul>
                        <li>ลูกค้าเก่าที่เคยสั่งสินค้ามาก่อนแล้ว</li>
                        <li>กรณีลูกค้าใหม่ มัดจำ 10% ของราคาสินค้า</li>
                        <li><strong>ตัวอย่าง:</strong> สั่งสินค้า 800บ. มัดจำ 80บ. จ่ายปลายทาง 720บ.</li>
                         <li>ลูกค้าเก่าไม่ต้องโอนจ่ายมัดจำ</li>
                    </ul>
                </div>
            </div>
        </section>
        
        <section className="info-section">
            <h2>ตัวเลือกการจัดส่ง</h2>
             <div className="content-grid-3">
                <div className="info-card">
                    <h4>ไปรษณีย์ไทย</h4>
                    <p>3-5 วันทำการ</p>
                    <p className="muted-text">รวดเร็ว ติดตามได้ ส่งต่างจังหวัด / ในเขตกรุงเทพฯ และปริมณฑล</p>
                </div>
                 <div className="info-card">
                    <h4>แฟลชเอ็กเพลส</h4>
                    <p>3-5 วันทำการ</p>
                    <p className="muted-text">รวดเร็ว ติดตามได้ ส่งต่างจังหวัด / ในเขตกรุงเทพฯ และปริมณฑล</p>
                </div>
                 <div className="info-card">
                    <h4>เคอรี่เอ็กเพลส</h4>
                    <p>3-5 วันทำการ</p>
                    <p className="muted-text">รวดเร็ว ติดตามได้ ส่งต่างจังหวัด / ในเขตกรุงเทพฯ และปริมณฑล</p>
                </div>
            </div>
        </section>

        <section className="info-section important-info">
            <h2>ข้อมูลสำคัญ</h2>
            <div className="important-content">
                <div className="conditions">
                    <h3>เงื่อนไขการสั่งซื้อ</h3>
                    <ul>
                        <li>ขั้นต่ำการสั่งซื้อ 200 บาท</li>
                        <li>แจ้งชื่อ ที่อยู่ เบอร์โทรศัพท์ ทุกครั้ง</li>
                        <li>สั่งสินค้าผ่านระบบไลน์ของทางร้านเท่านั้น</li>
                    </ul>
                    <h3>ชื่อร้าน : บลูริเวอ/แอทแลนต้า❄️</h3>
                    <img src="https://placehold.co/350x100/111111/FFF5D1?text=Line+Profile+Name+Image" alt="Line Profile Name" className="line-profile-img"/>
                </div>
                <div className="contact-details">
                    <p><strong>Line:</strong> @332sevgu</p>
                    <p><strong>โทร:</strong> 000-000-0000</p>
                    <p><strong>เวลาทำการ:</strong> 08:00 - 23.59 น.</p>
                </div>
            </div>
        </section>
    </main>
);

const LoginPage = ({ onLogin, setPage }) => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            setError('');
            onLogin();
        } else {
            setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>เข้าสู่ระบบจัดการร้าน</h2>
                <p className="muted-text">บลูริเวอ/แอทแลนต้า❄️</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">ชื่อผู้ใช้</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="•••••••••" />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="btn-primary full-width">เข้าสู่ระบบ</button>
                </form>
                <div className="test-creds">
                    ทดสอบ: admin / admin123
                </div>
                <button onClick={() => setPage('home')} className="btn-link">
                    &larr; กลับหน้าร้าน
                </button>
            </div>
        </div>
    );
};

const AdminDashboard = ({ products, setAdminPage, onAddClick }) => {
    const totalProducts = products.length;
    const promoProducts = products.filter(p => p.promoPrice).length;
    const outOfStockProducts = products.filter(p => !p.inStock).length;
    
    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>แดชบอร์ด</h1>
                <button className="btn-primary" onClick={onAddClick}>+ เพิ่มสินค้า</button>
            </div>
            <div className="dashboard-stats">
                <div className="stat-card">
                    <h2>{totalProducts}</h2>
                    <p>สินค้าทั้งหมด</p>
                </div>
                <div className="stat-card">
                    <h2>{promoProducts}</h2>
                    <p>สินค้าลดราคา</p>
                </div>
                <div className="stat-card">
                    <h2>{outOfStockProducts}</h2>
                    <p>สินค้าหมด</p>
                </div>
            </div>
             <div className="admin-section">
                <h2>เมนูจัดการ</h2>
                <div className="management-links">
                     <button className="management-card" onClick={() => setAdminPage('products')}>
                        <span className="icon">📦</span>
                        <span>จัดการสินค้า</span>
                        <span className="action-text">เพิ่ม แก้ไข ลบสินค้า</span>
                    </button>
                    <div className="management-card disabled">
                        <span className="icon">⭐</span>
                        <span>จัดการรีวิว</span>
                         <span className="action-text">เพิ่ม/แก้ไขรีวิว (เร็วๆนี้)</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminProductList = ({ products, onEdit, onDelete }) => (
    <div className="admin-product-list">
        {products.map(product => (
            <div key={product.id} className="product-manage-item">
                <img src={product.image} alt={product.title} />
                <div className="info">
                    <h4>{product.title}</h4>
                    <p>{product.category}</p>
                    <div className="price-wrapper">
                      {product.promoPrice ? (
                        <>
                          <span className="price promo">฿{product.promoPrice.toLocaleString()}</span>
                          <s className="price original">฿{product.price.toLocaleString()}</s>
                        </>
                      ) : (
                        <span className="price">฿{product.price.toLocaleString()}</span>
                      )}
                    </div>
                     <span className={`stock-status ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {product.inStock ? 'มีสินค้า' : 'สินค้าหมด'}
                    </span>
                </div>
                <div className="actions">
                    <button onClick={() => onEdit(product)} className="btn-edit">แก้ไข</button>
                    <button onClick={() => onDelete(product.id)} className="btn-delete">ลบ</button>
                </div>
            </div>
        ))}
    </div>
);

const ProductFormModal = ({ product, onClose, onSave }) => {
    const [formData, setFormData] = useState(product || {
        title: '',
        category: mockCategories[1], // Default to the first actual category
        description: '',
        price: 0,
        promoPrice: null,
        inStock: true,
        image: 'https://placehold.co/400x550/fefefe/333?text=New%0AProduct&font=kanit'
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // FIX: Explicitly cast formData price fields to string before calling parseFloat.
        // This resolves a potential TypeScript type mismatch where parseFloat expects a string
        // but the state's type might be a number, which can cause type errors.
        const finalData = {
            ...formData,
            price: parseFloat(String(formData.price)) || 0,
            promoPrice: formData.promoPrice ? parseFloat(String(formData.promoPrice)) : null,
        };
        onSave(finalData);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</h2>
                    <button className="btn-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-section">
                        <h4>รูปภาพสินค้า (ลงอสส 5 รูป)</h4>
                        <div className="image-upload-placeholder">
                           <span className="upload-icon">↑</span>
                           <p>อัพโหลดรูป</p>
                        </div>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="title">ชื่อสินค้า</label>
                            <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required />
                        </div>
                         <div className="form-group">
                            <label htmlFor="category">หมวดหมู่</label>
                            <select name="category" id="category" value={formData.category} onChange={handleChange}>
                                {mockCategories.filter(c => c !== 'ทั้งหมด' && c !== '- โปรโมชั่น').map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">รายละเอียดสินค้า</label>
                        <textarea name="description" id="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
                    </div>
                     <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="price">ราคาตั้ง (บาท)</label>
                            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required />
                        </div>
                         <div className="form-group">
                            <label htmlFor="promoPrice">ราคาโปรโมชั่น (บาท)</label>
                            <input type="number" name="promoPrice" id="promoPrice" placeholder="(ไม่มีโปรชั่น)" value={formData.promoPrice ?? ''} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="toggle-switch">
                            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} />
                            <span className="slider"></span>
                            มีสินค้า
                        </label>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose}>ยกเลิก</button>
                        <button type="submit" className="btn-primary">{product ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มสินค้า'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminLayout = ({ children, setPage, setAdminPage, onLogout }) => (
    <div className="admin-layout">
        <aside className="admin-sidebar">
             <div className="logo">GA</div>
             <nav>
                <a href="#" onClick={() => setAdminPage('dashboard')} className="active">แดชบอร์ด</a>
                <a href="#" onClick={() => setAdminPage('products')}>จัดการสินค้า</a>
                <a href="#" className="disabled">คำสั่งซื้อ</a>
                <a href="#" className="disabled">ลูกค้า</a>
             </nav>
             <div className="sidebar-footer">
                <a href="#" onClick={() => { setPage('home'); onLogout(); }}>ออกจากระบบ</a>
             </div>
        </aside>
        <main className="admin-main">
            <header className="admin-topbar">
                <button onClick={() => setPage('home')} className="btn-link">&larr; กลับหน้าร้าน</button>
                <button onClick={() => alert('Logged in as Admin')} className="admin-user">Admin</button>
            </header>
            <div className="admin-content">
                {children}
            </div>
        </main>
    </div>
);


const App = () => {
  const [page, setPage] = useState('home'); // home, how-to, admin
  const [adminPage, setAdminPage] = useState('dashboard'); // dashboard, products
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [products, setProducts] = useState(getInitialProducts);
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (error) {
        console.error("Could not save products to localStorage", error);
    }
  }, [products]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  const handleSaveProduct = (productData) => {
    if (productData.id) { // Update
        setProducts(products.map(p => p.id === productData.id ? productData : p));
    } else { // Add
        const newProduct = { ...productData, id: Date.now() };
        setProducts([newProduct, ...products]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };
  
  const handleDeleteProduct = (productId) => {
      if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
          setProducts(products.filter(p => p.id !== productId));
      }
  };

  const handleEditClick = (product) => {
      setEditingProduct(product);
      setIsModalOpen(true);
  };
  
  const handleAddClick = () => {
      setEditingProduct(null);
      setIsModalOpen(true);
  };
  
  const filteredProducts = products.filter(p => {
    if (activeCategory === 'ทั้งหมด') return true;
    if (activeCategory === '- โปรโมชั่น') return !!p.promoPrice;
    return p.category === activeCategory;
  });

  if (page === 'admin' && !isLoggedIn) {
      return <LoginPage onLogin={handleLogin} setPage={setPage} />;
  }

  return (
    <>
      {page !== 'admin' && <Header page={page} setPage={setPage} isLoggedIn={isLoggedIn}/>}
      
      {page === 'home' && <CategoryFilter activeCategory={activeCategory} setActiveCategory={setActiveCategory} products={products} />}
      
      {page === 'home' && (
        <main className="container" role="main">
            <div className="main-content-header">
                <h2 className="section-title">สินค้าทั้งหมด</h2>
                <span className="product-count">{filteredProducts.length} รายการ</span>
            </div>
            <ProductGrid products={filteredProducts} />
        </main>
      )}

      {page === 'how-to' && <HowToOrderPage />}
      
      {page === 'admin' && isLoggedIn && (
          <AdminLayout setPage={setPage} setAdminPage={setAdminPage} onLogout={handleLogout}>
              {adminPage === 'dashboard' && <AdminDashboard products={products} setAdminPage={setAdminPage} onAddClick={handleAddClick} />}
              {adminPage === 'products' && (
                  <>
                      <div className="admin-header">
                        <h1>จัดการสินค้า</h1>
                        <button className="btn-primary" onClick={handleAddClick}>+ เพิ่มสินค้าใหม่</button>
                      </div>
                      <AdminProductList products={products} onEdit={handleEditClick} onDelete={handleDeleteProduct} />
                  </>
              )}
          </AdminLayout>
      )}
      
      {isModalOpen && <ProductFormModal product={editingProduct} onClose={() => setIsModalOpen(false)} onSave={handleSaveProduct} />}
    </>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
