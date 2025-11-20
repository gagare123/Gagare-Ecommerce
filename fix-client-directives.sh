#!/bin/bash

files=(
  "app/layout.js"
  "app/page.jsx"
  "app/add-address/page.jsx"
  "app/all-products/page.jsx"
  "app/cart/page.jsx"
  "app/my-orders/page.jsx"
  "app/order-placed/page.jsx"
  "app/product/[id]/page.jsx"
  "app/seller/layout.jsx"
  "app/seller/page.jsx"
  "app/seller/orders/page.jsx"
  "app/seller/product-list/page.jsx"
  "components/Banner.jsx"
  "components/FeaturedProduct.jsx"
  "components/Footer.jsx"
  "components/HeaderSlider.jsx"
  "components/HomeProducts.jsx"
  "components/Loading.jsx"
  "components/Navbar.jsx"
  "components/NewsLetter.jsx"
  "components/OrderSummary.jsx"
  "components/ProductCard.jsx"
  "components/seller/Footer.jsx"
  "components/seller/Navbar.jsx"
  "components/seller/Sidebar.jsx"
  "context/AppContext.jsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    if ! grep -q "^[\"']use client[\"']" "$file"; then
      echo "Adding 'use client' to $file"
      echo '"use client"' > temp_file
      echo "" >> temp_file
      cat "$file" >> temp_file
      mv temp_file "$file"
    else
      echo "$file already has 'use client'"
    fi
  fi
done

echo "Done!"
