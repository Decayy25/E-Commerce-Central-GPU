import { useState } from "react";
import type { CartOrderType } from "../../types/TypeUI";

const CartOrder = () => {
  const [cartItems, setCartItems] = useState<CartOrderType[]>(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    if (!savedCart) return [];
    try {
      return JSON.parse(savedCart);
    } catch (err) {
      console.error("Gagal memuat data keranjang:", err);
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const shippingFee = 10000;

  const saveToLocalStorage = (items: CartOrderType[]) => {
    localStorage.setItem("shopping-cart", JSON.stringify(items));
    setCartItems(items);
  };

  const updateQty = (id: number, delta: number) => {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        const currentQty = item.quantity || 1;
        return { ...item, quantity: Math.max(1, currentQty + delta) };
      }
      return item;
    });

    saveToLocalStorage(newCart);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    setLoading(true);
    setError(null);

    setTimeout(() => {
      localStorage.removeItem("shopping-cart");
      setCartItems([]);
      setLoading(false);
      setShowSuccessModal(true);
    }, 600);
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = subtotal + shippingFee;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    })
      .format(amount)
      .replace("Rp", "RP.");

  const cartEmpty = cartItems.length === 0;

  return (
    <div className="w-full px-4 lg:px-10">
      <div className="relative mx-auto mt-10 max-w-6xl">
        <div className="mx-auto w-full max-w-4xl">
          <div className="w-full p-6 bg-[#fafafa] font-sans text-gray-800 rounded-3xl">
            <div className="space-y-8 mb-8">
              {cartEmpty ? (
                <div className="flex min-h-70 items-center justify-center rounded-3xl border border-blue-200 bg-white p-8 text-center text-gray-600 shadow-sm">
                  Keranjang Anda kosong.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-blue-200 rounded-3xl p-4 bg-white shadow-sm">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-32 h-24 border-2 border-blue-500 rounded-xl overflow-hidden bg-white">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="font-bold text-xl leading-tight uppercase tracking-tight text-gray-900">
                          {item.name}
                        </h2>
                        <p className="mt-2 text-gray-700 font-semibold">
                          {formatCurrency(item.price)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center border border-blue-400 rounded-full overflow-hidden h-10">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        className="px-4 text-green-700 font-bold hover:bg-green-50">
                        +
                      </button>
                      <div className="px-6 font-bold text-lg text-gray-800">
                        {item.quantity || 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        className="px-4 text-red-600 font-bold hover:bg-red-50">
                        -
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!cartEmpty && (
              <>
                <div className="border-t-2 border-blue-500 mb-4"></div>

                <div className="space-y-2 mb-4 mx-auto">
                  <div className="flex justify-between items-center ml-auto w-full md:w-1/2">
                    <span className="text-gray-700">subtotal</span>
                    <span className="font-medium">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center ml-auto w-full md:w-1/2">
                    <span className="text-gray-700">ongkir</span>
                    <span className="font-medium">
                      {formatCurrency(shippingFee)}
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-blue-500 mb-6"></div>

                <div className="flex flex-col items-end gap-6">
                  <div className="flex justify-between items-center w-full mx-auto max-w-100">
                    <span className="text-2xl font-black italic uppercase tracking-tighter text-gray-900">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-[#84cc00]">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={loading}
                    className={`bg-[#84cc00] text-white px-10 py-3 rounded-2xl text-xl font-bold transition-all active:scale-95 shadow-sm ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#76b500]"}`}>
                    {loading ? "Processing..." : "Check out"}
                  </button>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Checkout Berhasil!
            </h3>
            <p className="text-gray-700 mb-6">
              Terima kasih, pesanan Anda telah berhasil diproses secara lokal.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full rounded-2xl bg-[#84cc00] px-6 py-3 text-white text-lg font-semibold hover:bg-[#76b500] transition-all">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartOrder;
