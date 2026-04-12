// import { useState, useEffect } from "react";

// export default function CartOrder() {
//     const [cartItems, setCartItems] = useState([]);

//     useEffect(() => {
//         const token = localStorage.getItem("token");

//         fetch(`${import.meta.env.VITE_API}/api/carts`, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         })
//         .then(res => res.json)
//         .then(data => setCartItems(data.items || [] ))
//     }, []);

//     const totalPrice = cartItems.reduce((total, item) => {
//         return total + item.price * item.quantity;
//     }, 0);

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
//             {cartItems.length === 0 ? (
//                 <p>Keranjang Anda kosong.</p>
//             ) : (
//                 <div>
//                     <table className="w-full text-left mb-4">
//                         <thead>
//                             <tr>
//                                 <th className="border-b p-2">Produk</th>
//                                 <th className="border-b p-2">Harga</th>
//                                 <th className="border-b p-2">Jumlah</th>
//                                 <th className="border-b p-2">Subtotal</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {cartItems.map((item, index) => (
//                                 <tr key={index}>
//                                     <td className="border-b p-2">{item.name}</td>
//                                     <td className="border-b p-2">Rp {item.price.toLocaleString()}</td>
//                                     <td className="border-b p-2">{item.quantity}</td>
//                                     <td className="border-b p-2">Rp {(item.price * item.quantity).toLocaleString()}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <div className="text-right font-bold">
//                         Total: Rp {totalPrice.toLocaleString()}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }