import React, { useState, useEffect } from "react";
import { PayOrder } from "../../api/api";
import type { CartOrderType } from "../../types/TypeUI";

const CartOrder: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartOrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const shippingFee = 10000;
  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (err) {
        console.error("Gagal memuat data keranjang:", err);
      }
    }
  }, []);

  const saveToLocalStorage = (items: CartOrderType[]) => {
    localStorage.setItem("shopping-cart", JSON.stringify(items));
    setCartItems(items);
  };

  const updateQty = (id: number, delta: number) => {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        const currentQty = (item as any).quantity || 1;
        return { ...item, quantity: Math.max(1, currentQty + delta) };
      }
      return item;
    });
    saveToLocalStorage(newCart);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const qty = (item as any).quantity || 1;
    return acc + item.price * qty;
  }, 0);

  const total = subtotal + shippingFee;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    try {
      setLoading(true);
      await PayOrder(cartItems);

      localStorage.removeItem("shopping-cart");
      setCartItems([]);
      alert("Checkout berhasil!");
    } catch (error) {
      setError("Gagal mengirim pesanan. Silakan coba lagi.", Error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("Rp", "RP.");
  };

  if (cartItems.length === 0) {
    return <div className="text-center p-10">Keranjang Anda kosong.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white font-sans text-gray-800">
      <div className="space-y-8 mb-8">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-start justify-between">
            <div className="flex gap-4">
              <div className="w-32 h-24 border-2 border-blue-500 rounded-xl overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight w-64 uppercase">
                  {item.name}
                </h2>
                <p className="mt-4 text-gray-700 font-medium italic">IDR: {item.price}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center border border-blue-400 rounded-md overflow-hidden h-8">
              <button
                onClick={() => updateQty(item.id, 1)}
                className="px-3 border-r border-blue-400 text-green-600 font-bold hover:bg-gray-50"
              >
                +
              </button>
              <div className="px-6 font-bold">
                {(item as any).quantity || 1}
              </div>
              <button
                onClick={() => updateQty(item.id, -1)}
                className="px-3 border-l border-blue-400 text-red-500 font-bold hover:bg-gray-50"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t-2 border-blue-500 mb-4"></div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center ml-auto w-full md:w-1/2">
          <span className="text-gray-700">subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between items-center ml-auto w-full md:w-1/2">
          <span className="text-gray-700">ongkir</span>
          <span className="font-medium">{formatCurrency(shippingFee)}</span>
        </div>
      </div>

      <div className="border-t-2 border-blue-500 mb-6"></div>

      <div className="flex flex-col items-end gap-6">
        <div className="flex justify-between items-center w-full max-w-[400px]">
          <span className="text-2xl font-black italic uppercase tracking-tighter text-gray-900">
            Total
          </span>
          <span className="text-2xl font-bold text-[#84cc00]">
            {formatCurrency(total)}
          </span>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`bg-[#84cc00] text-white px-10 py-3 rounded-2xl text-xl font-bold transition-all active:scale-95 shadow-sm ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#76b500]"}`}
        >
          {loading ? "Processing..." : "Check out"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default CartOrder;