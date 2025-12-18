
# Amazon Clone Project Documentation

## Project Overview
This is a fully functional e-commerce website clone of Amazon, built with vanilla JavaScript, HTML, and CSS. The project includes product browsing, cart management, checkout process, order tracking, and order history features.

---

## Project Structure

```
javascript-amazon-project/
├── amazon.html              # Main homepage with product grid
├── checkout.html            # Cart/checkout page
├── orders.html              # Order history page
├── tracking.html            # Package tracking page
├── data/                    # Data layer
│   ├── cart.js             # Cart management (array-based)
│   ├── cart-class.js       # Cart management (class-based)
│   ├── deliveryOptions.js  # Delivery options and calculations
│   ├── orders.js           # Order storage and retrieval
│   └── products.js         # Product data and loading
├── scripts/                # JavaScript files
│   ├── amazon.js           # Homepage logic
│   ├── orders.js           # Orders page logic
│   ├── tracking.js         # Tracking page logic
│   ├── checkout/
│   │   ├── checkoutHeader.js    # Checkout header rendering
│   │   ├── OrderSummary.js      # Order summary rendering
│   │   └── paymentSummary.js    # Payment summary and order placement
│   └── utils/
│       └── money.js        # Currency formatting utility
├── styles/                 # CSS files
│   ├── pages/             # Page-specific styles
│   └── shared/            # Shared styles
└── images/                # Product images and icons
```

---

## Key Features

### 1. **Product Browsing (amazon.html)**
- Display products in a grid layout
- Search functionality with keyword matching
- Product ratings display
- Dynamic quantity selection
- Add to cart with visual feedback
- Cart quantity counter in header

### 2. **Shopping Cart & Checkout (checkout.html)**
- View all cart items
- Update item quantities
- Delete items from cart
- Select delivery options (7-day free, 3-day $4.99, 1-day $9.99)
- Skip weekends in delivery date calculations
- Real-time price calculations
- Payment summary with tax (10%)

### 3. **Order Placement**
- Send cart data to backend via POST request
- Store orders in localStorage
- Clear cart after successful order
- Redirect to orders page

### 4. **Order History (orders.html)**
- Display most recent order
- Show order date, total cost, and order ID
- List all products in the order with delivery dates
- "Buy it again" button to re-add products to cart
- "Track package" button with URL parameters
- Dynamic cart counter updates

### 5. **Package Tracking (tracking.html)**
- Read orderId and productId from URL parameters
- Display product details and delivery date
- Visual progress bar (Preparing → Shipped → Delivered)
- Progress percentage based on time elapsed
- Dynamic status labels

---

## Data Layer Details

### **data/cart.js**
```javascript
// Main cart array stored in localStorage
export let cart = [];

// Key Functions:
- loadFromStorage()          // Load cart from localStorage
- saveToStorage()            // Save cart to localStorage
- addToCart(productId)       // Add product to cart (or increment quantity)
- removeFromCart(productId)  // Remove product from cart
- updateQuantity(productId, newQuantity)  // Update item quantity
- updateDeliveryOption(productId, deliveryOptionId)  // Change delivery option
- calculateCartQuantity()    // Get total number of items in cart
- loadCartFetch()           // Fetch cart from backend
```

### **data/products.js**
```javascript
// Product classes with inheritance
class Product {
  - getStarsUrl()            // Get star rating image
  - getPrice()               // Format price
  - extraInfoHtml()          // Additional product info (overridable)
}

class Clothing extends Product {
  - extraInfoHtml()          // Returns size chart link
}

class Appliance extends Product {
  - extraInfoHtml()          // Returns instructions and warranty links
}

// Key Functions:
- getProduct(productId)      // Find product by ID
- loadProductsFetch()        // Fetch products from backend API
- loadProducts(callback)     // Load products with XMLHttpRequest
```

### **data/deliveryOptions.js**
```javascript
// Delivery options array
[
  { id: '1', deliveryDays: 7, priceCents: 0 },
  { id: '2', deliveryDays: 3, priceCents: 499 },
  { id: '3', deliveryDays: 1, priceCents: 999 }
]

// Key Functions:
- getDeliveryOption(deliveryOptionId)  // Get delivery option by ID
- calculateDeliveryDate(deliveryOption)  // Calculate delivery date (skips weekends)
- checkDeliveryOption(deliveryOptionId)  // Validate delivery option exists
```

### **data/orders.js**
```javascript
// Orders stored in localStorage
export const orders = [];

// Key Functions:
- getOrder(orderId)          // Retrieve order by ID
- addOrders(order)           // Add new order to front of array (unshift)
- saveToStorage()            // Save orders to localStorage
```

---

## Page-Specific Logic

### **scripts/amazon.js (Homepage)**
1. Load products from backend API
2. Filter products based on search query (URL parameter)
3. Render product grid with images, ratings, prices
4. Handle "Add to Cart" button clicks
5. Update cart quantity in header
6. Search bar functionality (Enter key and button click)

### **scripts/checkout/OrderSummary.js**
1. Render each cart item with product details
2. Display delivery date based on selected option
3. Show delivery option radio buttons
4. Handle item deletion
5. Handle quantity updates with validation (0-1000)
6. Handle delivery option changes
7. Skip rendering if product doesn't exist (guard clause)

### **scripts/checkout/paymentSummary.js**
1. Calculate total product cost (price × quantity)
2. Calculate shipping costs based on delivery options
3. Calculate tax (10% of subtotal)
4. Display order summary
5. Handle "Place Order" button:
   - Send POST request to backend with cart data
   - Receive order object from backend
   - Save order to localStorage
   - Redirect to orders.html

### **scripts/checkout/checkoutHeader.js**
1. Calculate total cart quantity
2. Render checkout header with item count
3. Update dynamically when cart changes

### **scripts/orders.js**
1. Load products from backend
2. Display only the most recent order (orders[0])
3. Show order details: date, total, order ID
4. Render each product in the order
5. Handle "Buy it again" button:
   - Add product back to cart
   - Update cart counter
   - Show "Added" feedback for 1 second
6. Generate tracking URL with orderId and productId parameters
7. Update cart quantity on page load

### **scripts/tracking.js**
1. Read URL parameters (orderId, productId)
2. Retrieve order and product data
3. Find specific product details in order
4. Calculate delivery progress percentage
5. Determine delivery status message
6. Render tracking information:
   - Product image and details
   - Delivery date
   - Progress bar with percentage
   - Status labels (Preparing/Shipped/Delivered)
7. Update cart quantity in header

---

## Utility Functions

### **scripts/utils/money.js**
```javascript
export function formatCurrency(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}
```
Converts cents to dollars with 2 decimal places.

---

## Data Flow

### **Adding to Cart**
1. User clicks "Add to Cart" on amazon.html
2. `addToCart(productId)` called
3. Cart updated in memory and localStorage
4. `updateCartQuantity()` updates header display

### **Checkout Process**
1. User navigates to checkout.html
2. `loadProductsFetch()` and `loadCartFetch()` load data in parallel
3. `renderOrderSummary()` displays cart items
4. `renderPaymentSummary()` calculates and shows totals
5. User modifies quantities/delivery options → re-render
6. User clicks "Place Order"
7. POST request sent to `https://supersimplebackend.dev/orders`
8. Order received and saved via `addOrders(order)`
9. Redirect to orders.html

### **Order Tracking**
1. User clicks "Track package" on orders.html
2. URL includes `?orderId=xxx&productId=yyy`
3. tracking.html loads
4. `getOrder(orderId)` retrieves order from localStorage
5. `getProduct(productId)` retrieves product data
6. Progress calculated based on current date vs delivery date
7. Tracking page rendered with progress bar

---

## Backend Integration

### **API Endpoints Used**
- `GET https://supersimplebackend.dev/products` - Fetch product catalog
- `GET https://supersimplebackend.dev/cart` - Fetch cart data
- `POST https://supersimplebackend.dev/orders` - Place new order

### **Order Object Structure**
```javascript
{
  id: "order-id-string",
  orderTime: "2025-12-18T10:30:00Z",
  totalCostCents: 16795,
  products: [
    {
      productId: "product-id-string",
      quantity: 2,
      estimatedDeliveryTime: "2025-12-24T00:00:00Z"
    }
  ]
}
```

---

## Local Storage

### **Keys Used**
- `cart` - Shopping cart items (array)
- `cart-oop` - Cart for class-based implementation
- `orders` - Array of placed orders

### **Cart Item Structure**
```javascript
{
  productId: "product-id-string",
  quantity: 2,
  deliveryOptionId: "1"
}
```

---

## Error Handling

### **Product Not Found in Cart**
- `OrderSummary.js` checks if `matchingProduct` is undefined
- Skips rendering that cart item
- Prevents "Cannot read properties of undefined" errors

### **Order Missing Products Array**
- `orders.js` checks if `order.products` exists
- Returns empty string if undefined
- Prevents forEach on undefined errors

### **Network Errors**
- Checkout uses try-catch for order placement
- Displays "Unexpected error" message to user
- Prevents page crash on network failure

---

## Key Design Patterns

### **Module Pattern**
- Each file exports specific functions/data
- Clear separation of concerns
- Easy to maintain and test

### **Class Inheritance**
- `Product` base class
- `Clothing` and `Appliance` extend Product
- Polymorphic `extraInfoHtml()` method

### **Async/Await**
- Used for API calls
- `Promise.all()` for parallel data loading
- Clean, readable asynchronous code

### **Data-Driven Rendering**
- HTML generated from data objects
- Dynamic updates based on state changes
- Template literals for cleaner HTML strings

---

## Browser Compatibility

- **JavaScript**: ES6+ (modules, classes, async/await, arrow functions)
- **CSS**: Modern flexbox and grid layouts
- **HTML5**: Semantic elements
- Requires module script support (`type="module"`)

---

## Future Enhancements

- User authentication
- Product reviews and ratings
- Product filtering and sorting
- Order cancellation
- Multiple delivery addresses
- Payment integration
- Wishlist functionality
- Product recommendations
- Order history (show all orders, not just recent)

---

## Testing

Located in `tests/` directory:
- Unit tests for utility functions (money.js)
- Cart functionality tests
- Product data tests
- Uses Jasmine testing framework

---

## Credits

This project is part of the SuperSimpleDev JavaScript course, demonstrating practical application of JavaScript fundamentals in a real-world e-commerce context.
