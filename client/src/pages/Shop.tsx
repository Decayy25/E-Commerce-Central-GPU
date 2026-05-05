import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import feather from "feather-icons";
import { getProducts } from "../api/api";
import type { Product } from "../types/TypeUI";
import Input from "../components/atoms/Input";
import Button from "../components/atoms/Button";
import Layout from "../components/molecules/Layout";
import Category from "../components/organisms/CategoryFilter";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || product.category === selectedCategory),
  );

  const handleAddToCart = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product && product.stock > 0) {
      // 1. Update state cart
      setCart((prevCart) => {
        const newCart = [...prevCart, product];

        // 2. Simpan ke localStorage menggunakan data terbaru (newCart)
        localStorage.setItem("shopping-cart", JSON.stringify(newCart));
        return newCart;
      });

      // 3. Kurangi stok produk
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, stock: p.stock - 1 } : p,
        ),
      );
    }
  };

  useEffect(() => {
    feather.replace();

    (async () => {
      const data = await getProducts();
      setProducts(data);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="mb-8 mt-5 flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-6 rounded-lg shadow">
          <div className="flex-1 min-w-0">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
            />
          </div>

          {/* Category Filter */}
          <Layout
            className="flex items-center"
            children={
              <Category
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            }
          ></Layout>

          {/* Cart Count */}
          <Layout className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded">
            <Link to="/cart">
              <span className="text-lg font-bold text-[#3079ee] hover:text-[#589c00]">
                <i data-feather="shopping-cart"></i>
              </span>
            </Link>

            <span className="font-medium text-gray-700">
              Cart: {cart.length}
            </span>
          </Layout>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-200 h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full bg-white object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {product.stock <= 5 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
                      Low Stock
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <p className="text-2xl font-bold text-green-600">
                      {product.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      Stock: {product.stock} available
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0}
                    className="w-full mt-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors duration-300"
                  >
                    {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
