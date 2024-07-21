import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Dữ liệu mẫu sản phẩm
const products = [
  {
    id: 1,
    name: 'Áo thun',
    price: 650000,
    images: ['images/ao-thun.jpg'],
    description: '- Làm từ một nhóm chất liệu tái chế và có chứa ít nhất 60% thành phần tái chế, sản phẩm này đại diện cho một trong số rất nhiều các giải pháp của chúng tôi hướng tới chấm dứt rác thải nhựa. \n - Thiết kế FreeLift cho phạm vi chuyển động tối đa và độ che chắn cố định khi thực hiện các động tác giơ tay qua đầu.',
    categories: ['clothing']
  },
  {
    id: 2,
    name: 'Quần short',
    price: 650000,
    images: ['images/quan-short.png'],
    description: '- Chiếc quần short tập luyện adidas thoải mái này sẽ luôn đồng hành cùng bạn với công nghệ AEROREADY thấm hút ẩm. Tập luyện xoay vòng hoặc chơi bóng ngẫu hứng cùng đồng đội. \n - Quần có kiểu dáng rộng rãi để bạn tha hồ vận động cùng các túi bên hông để đựng chìa khóa hoặc điện thoại. Sản phẩm này may bằng vải công nghệ Primegreen, thuộc dòng chất liệu tái chế hiệu năng cao.',
    categories: ['clothing']
  },
  {
    id: 3,
    name: 'Áo khoác',
    price: 1200000,
    images: ['images/ao-khoac.jpg'],
    description: '- Áo khoác thời trang với thiết kế hiện đại và chất liệu bền đẹp. \n - Thích hợp cho mọi hoạt động ngoài trời và mùa đông. \n - Sản phẩm có các size từ S đến XL.',
    categories: ['clothing']
  },
  {
    id: 4,
    name: 'Giày thể thao',
    price: 1800000,
    images: ['images/giay-the-thao.jpg'],
    description: '- Đôi giày thể thao phong cách với đế đệm êm ái và chất liệu thoáng khí. \n - Được thiết kế cho mọi hoạt động thể thao và đi bộ hàng ngày. \n - Sản phẩm có các size từ 36 đến 45.',
    categories: ['shoes']
  },
  {
    id: 5,
    name: 'Phụ kiện',
    price: 500000,
    images: ['images/phu-kien.jpg'],
    description: '- Các phụ kiện thời trang như kính mắt, mũ lưỡi trai và đồng hồ. \n - Tạo điểm nhấn cho phong cách của bạn.',
    categories: ['accessories']
  }
];

// Danh sách các danh mục sản phẩm
const categories = [
  { id: 'all', name: 'Tất cả' },
  { id: 'clothing', name: 'Quần áo' },
  { id: 'shoes', name: 'Giày dép' },
  { id: 'accessories', name: 'Phụ kiện' }
];

function App() {
  const [cart, setCart] = useState([]);
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [loginForm, setLoginForm] = useState({
    loginUsername: '',
    loginPassword: ''
  });
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all'); // State để lưu danh mục sản phẩm đang được chọn
  const [showRegisterForm, setShowRegisterForm] = useState(false); // State để điều khiển hiển thị form đăng ký
  const [showLoginForm, setShowLoginForm] = useState(false); // State để điều khiển hiển thị form đăng nhập

  // Xử lý nhấn nút Đăng ký để hiển thị form đăng ký
  const handleShowRegisterForm = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false); // Ẩn form đăng nhập nếu đang hiển thị
  };

  // Xử lý nhấn nút Đăng nhập để hiển thị form đăng nhập
  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false); // Ẩn form đăng ký nếu đang hiển thị
  };

  // Xem chi tiết sản phẩm
  const viewProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setShowProductDetail(true);
    }
  };

  // Đóng tab chi tiết sản phẩm
  const closeProductDetail = () => {
    setShowProductDetail(false);
    setSelectedProduct(null);
  };

  // Thêm vào giỏ hàng
  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      const existingProduct = cart.find(item => item.id === productId);
      if (existingProduct) {
        setCart(
          cart.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      setNotification('Thêm sản phẩm vào giỏ hàng thành công.');
      setTimeout(() => {
        setNotification('');
      }, 3000);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    setNotification('Xóa sản phẩm khỏi giỏ hàng thành công.');
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  // Thay đổi số lượng sản phẩm trong giỏ hàng
  const changeQuantity = (productId, quantity) => {
    setCart(
      cart.map(item =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  // Tính tổng giá tiền
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Đăng ký
  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = registerForm;

    if (password !== confirmPassword) {
      setNotification('Mật khẩu nhập lại không khớp.');
      return;
    }

    // Lưu thông tin đăng ký vào Local Storage (tạm thời để demo)
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    setNotification('Đăng ký thành công!');
    setShowRegisterForm(false); // Ẩn form đăng ký sau khi đăng ký thành công
  };

  // Đăng nhập
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const { loginUsername, loginPassword } = loginForm;
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (loginUsername === storedUsername && loginPassword === storedPassword) {
      setNotification('Đăng nhập thành công!');
      setShowLoginForm(false); // Ẩn form đăng nhập sau khi đăng nhập thành công
    } else {
      setNotification('Tên đăng nhập hoặc mật khẩu không đúng.');
    }
  };

  // Xử lý tìm kiếm
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Xử lý thay đổi danh mục sản phẩm
  const handleCategoryChange = (categoryId) => {
    setCategoryFilter(categoryId);
  };

  // Lọc sản phẩm theo danh mục
  const filteredProducts = products.filter(product => {
    if (categoryFilter === 'all') {
      return true;
    } else {
      return product.categories.includes(categoryFilter);
    }
  });

  // Lọc sản phẩm theo từ khóa tìm kiếm
  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Cửa Hàng Adidas</h1>

      {/* Thông báo */}
      {notification && (
        <div className="alert alert-info text-center" role="alert">
          {notification}
        </div>
      )}

      {/* Nút Đăng ký */}
      <div className="text-center mb-2">
        <button
          className="btn btn-primary"
          onClick={handleShowRegisterForm}
        >
          Đăng ký
        </button>
      </div>

      {/* Nút Đăng nhập */}
      <div className="text-center mb-2">
        <button
          className="btn btn-primary"
          onClick={handleShowLoginForm}
        >
          Đăng nhập
        </button>
      </div>

      {/* Hiển thị form Đăng ký nếu showRegisterForm là true */}
      {showRegisterForm && (
        <div className="row mb-4 justify-content-center">
          <div className="col-md-5">
            <h2 className="text-center">Đăng ký</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <div className="password-toggle">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    className="form-control"
                    name="password"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link toggle-button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                  >
                    {showRegisterPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu</label>
                <div className="password-toggle">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-control"
                    name="confirmPassword"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link toggle-button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Đăng ký</button>
            </form>
          </div>
        </div>
      )}

      {/* Hiển thị form Đăng nhập nếu showLoginForm là true */}
      {showLoginForm && (
        <div className="row mb-4 justify-content-center">
          <div className="col-md-5">
            <h2 className="text-center">Đăng nhập</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  className="form-control"
                  name="loginUsername"
                  value={loginForm.loginUsername}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <div className="password-toggle">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    className="form-control"
                    name="loginPassword"
                    value={loginForm.loginPassword}
                    onChange={handleLoginChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link toggle-button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? "Ẩn" : "Hiện"}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Đăng nhập</button>
            </form>
          </div>
        </div>
      )}

      {/* Bộ lọc và tìm kiếm */}
      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="row">
        {searchedProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.images[0]} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Giá: {product.price} VNĐ</p>
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => viewProduct(product.id)}
                >
                  Xem chi tiết
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(product.id)}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chi tiết sản phẩm */}
      {showProductDetail && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button type="button" className="close" onClick={closeProductDetail}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img src={selectedProduct.images[0]} className="img-fluid" alt={selectedProduct.name} />
                  </div>
                  <div className="col-md-6">
                    <p>{selectedProduct.description}</p>
                    <p>Giá: {selectedProduct.price} VNĐ</p>
                    <button
                      className="btn btn-success"
                      onClick={() => addToCart(selectedProduct.id)}
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Giỏ hàng */}
      <div className="row mt-4">
        <div className="col-md-12">
          <h2 className="text-center">Giỏ hàng</h2>
          {cart.length === 0 ? (
            <p className="text-center">Giỏ hàng của bạn trống.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tổng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price} VNĐ</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) => changeQuantity(item.id, parseInt(e.target.value))}
                      />
                    </td>
                    <td>{item.price * item.quantity} VNĐ</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="text-right">Tổng cộng:</td>
                  <td>{calculateTotalPrice()} VNĐ</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
