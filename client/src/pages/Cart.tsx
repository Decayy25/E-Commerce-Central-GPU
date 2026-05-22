import { Link, Navigate } from "react-router-dom";
import Layout from "../components/molecules/Layout";
import CartOrder from "../components/organisms/CartOrder"


export default function Cart() {
    return (
        <div className="flex flex-col justify-center gap-1 mt-10">
            <Layout className="mt-2">
                <CartOrder/>
            </Layout>

            <div className="w-full h-50 bg-[var(--Radeon--)] text-2xl text-center text-white font-semibold mt-10">
                <div>
                    Navigation
                </div>
            </div>
        </div>
    )
}