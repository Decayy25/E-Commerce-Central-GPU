import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Logo from "../atoms/Logo";
import Img from "../../assets/Logo.png";

// payment method logo
import dana from "../../assets/payment/dana.png";
import ovo from "../../assets/payment/ovo.png";
import gopay from "../../assets/payment/gopay.png";
import bca from "../../assets/payment/bca.png";
import bni from "../../assets/payment/bni.png";
import bri from "../../assets/payment/bri.png";
import mandiri from "../../assets/payment/mandiri.png";
import indomart from "../../assets/payment/indomart.png";
import alfamart from "../../assets/payment/alfamart.png";

const paymentMethods = {
  dana: dana,
  ovo: ovo,
  gopay: gopay,
  bca: bca,
  bni: bni,
  bri: bri,
  mandiri: mandiri,
  indomart: indomart,
  alfamart: alfamart,
};


const Folowme = [
  { id: 1, social: "https://www.facebook.com/centralgpu", dataFeather: "facebook" },
  { id: 2, social: "https://www.twitter.com/centralgpu", dataFeather: "twitter" },
  { id: 3, social: "https://www.instagram.com/centralgpu", dataFeather: "instagram" },
  { id: 4, social: "https://www.linkedin.com/company/centralgpu", dataFeather: "linkedin" },
];

const CustomerService = [
  { id: 1, Title: "Hubungi Kami", Link: "/contact" },
  { id: 2, Title: "Kebijakan Privasi", Link: "#" },
  { id: 3, Title: "FAQ", Link: "#" },
  { id: 4, Title: "Syarat Kententuan", Link: "#" },
];


export default function LayoutFooter() {
  return (
    <Fragment>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Logo logo={Img} className="w-40 h-40 mb-4" />

            <h3 className="text-xl text-gray-800 font-bold mb-3 ml-5">
              Central GPU
            </h3>
          </div>

          {/* Layanan Pelanggan */}
          <div>
            <h3 className="text-xl text-gray-800 font-bold mb-4 pb-2 border-b-2 border-[#6abea7]">
              Layanan Pelanggan
            </h3>

            <ul className="space-y-2">
              {CustomerService.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.Link}
                    className="text-gray-800 hover:text-[#589c00]"
                  >
                    {item.Title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pembayaran */}
          <div>
            <h3 className="text-xl text-gray-800 font-bold mb-4 pb-2 border-b-2 border-[#6abea7]">
              Pembayaran
            </h3>

            <ul className="grid grid-cols-3 sm:grid-cols-4 gap-4 items-center">
              {Object.entries(paymentMethods).map(([key, src]) => (
                <li key={key}>
                  <img
                    src={src}
                    alt={key}
                    className="flex items-center justify-center p-2 bg-white rounded-md shadow-sm"
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Ikuti Kami */}
          <div>
            <h3 className="text-xl text-gray-800 font-bold mb-4 pb-2 border-b-2 border-[#6abea7]">
              Ikuti Kami
            </h3>

            <div className="flex gap-4 text-2xl">
              {Folowme.map((items) => (
                <a
                  key={items.id}
                  href={items.social}
                  className="text-gray-800 hover:text-var[(--Radeon)]"
                >
                  <i data-feather={items.dataFeather}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
