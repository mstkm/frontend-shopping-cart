"use client";

import { formatRupiah } from "@/lib/helper";
import cartItemServices from "@/services/cartItemServices";
import cartServices from "@/services/cartServices";
import productServices from "@/services/productServices";
import { ICart, ICartItem, IProduct } from "@/types/Types";
import { Alert, Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";

const ProductPage = () => {
    const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isShowAlertSuccess, setIsShowAlertSuccess] = useState<boolean>(false);
    const [alertMessageSuccess, setAlertMessageSuccess] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await productServices.get();
            setProducts(res.data);
        }
        fetchProducts();
    }, []);

    const addCartItemService = async (data: ICartItem) => {
        try {
            const resCreateCartItem = await cartItemServices.create(data);
            if (resCreateCartItem.status == 200) {
                setIsShowAlertSuccess(true);
                setAlertMessageSuccess("Success add to cart");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addCartService = async (productId: number) => {
        try {
            // Tentukan nilai cart id
            const resGetChart = await cartServices.get();
            const carts = resGetChart.data;
            const activeCarts = carts.filter((cart: ICart) => cart.isActive === true);
            let cartID = "";
            if (activeCarts.length > 0) {
                cartID = activeCarts[0].CartID;
            } else {
                const resCreateCart = await cartServices.create();
                const cart = resCreateCart.data;
                cartID = cart.CartID;
            }

            // Buat cart items
            const data: ICartItem = {
                ProductID: Number(productId),
                CartID: Number(cartID),
                Quantity: 1
            }
            addCartItemService(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleAddCart = (productId: number) => {
        addCartService(productId);
    }

    return (
        <main>
            <div className="flex items-center justify-center w-full">
                <Alert 
                    className="mb-3"
                    color="success" 
                    title={alertMessageSuccess}                 
                    isVisible={isShowAlertSuccess}
                    onClose={() => setIsShowAlertSuccess(false)}
                />
            </div>
            <div className="grid grid-cols-5 gap-4 min-h-[calc(100vh-350px)]">
                {products.map((product: IProduct) => {
                    return (
                        <Card key={product.ProductID}>
                            <CardBody className="flex flex-col gap-2">
                                <Image
                                    src={`${baseUrlApi}/uploads/${product?.Picture}`}
                                    alt="Picture"
                                    width={300}
                                    height={300}
                                />
                                <p>{product.Name}</p>
                                <p>{formatRupiah(Number(product.Price))}</p>
                                <Button
                                    color="primary"
                                    onPress={() => handleAddCart(Number(product.ProductID))}
                                ><HiOutlineShoppingCart /> Add to cart</Button>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
        </main>
    )
}

export default ProductPage;