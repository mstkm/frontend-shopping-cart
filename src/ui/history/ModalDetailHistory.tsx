import { useEffect, useState } from "react";
import cartItemServices from "@/services/cartItemServices";
import { ICartItem, IFromDataAddress } from "@/types/Types";
import Link from "next/link";
import Image from "next/image";

// Definisikan tipe props
interface ModalDetailHistoryProps {
  isOpenModalDetailHistory: boolean;
  setIsOpenModalDetailHistory: (isOpen: boolean) => void;
  cartID: number | null;
}

const ModalDetailHistory: React.FC<ModalDetailHistoryProps> = ({
  isOpenModalDetailHistory,
  setIsOpenModalDetailHistory,
//   cartID,
}) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

//   useEffect(() => {
//     if (cartID) {
//       // Ambil data detail order berdasarkan CartID
//       const fetchCartItem = async () => {
//         try {
//           const res = await fetch(`/api/cartItem?cartID=${cartID}`);
//           const data = await res.json();
//           setCartItems(data);
//         } catch (error) {
//           console.error("Error fetching order details:", error);
//         }
//       };
//       fetchCartItem();
//     }
//   }, [cartID]);

  useEffect(() => {
    const getCartItems = async () => {
        const res = await cartItemServices.get();
        const dataCarts: ICartItem[] = res.data;
        setCartItems(dataCarts);
        let total = 0;
        dataCarts.forEach((cartItem: ICartItem) => {
            const price = cartItem.Quantity * Number(cartItem.Products?.Price);
            total += price;
        });
        setTotalPrice(total);
    }
    getCartItems();
}, []);

  return (
    isOpenModalDetailHistory && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Order Detail</h2>
          {cartItems.map((cartItem: ICartItem) => {
            console.log(cartItem.CartItemID);
            
                return (
                <div className="flex gap-3" key={cartItem.CartItemID}>
                    <div>
                        <Image
                            src={`${baseUrlApi}/uploads/${cartItem.Products?.Picture}`}
                            alt="Picture"
                            width={200}
                            height={200}
                        />
                    </div>
                    <div className="flex flex-col justify-between">
                        <p><strong>{cartItem.Products?.Name}</strong></p>
                        <p>{cartItem.Products?.Description}</p>
                        <p>Price: {cartItem.Products?.Price} x {cartItem.Quantity} = {Number(cartItem.Products?.Price)*cartItem.Quantity}</p>
                    </div>
                </div>
                )
            })}
          <button 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => setIsOpenModalDetailHistory(false)}
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default ModalDetailHistory;

