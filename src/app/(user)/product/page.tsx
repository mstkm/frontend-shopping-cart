"use client";

import { formatRupiah, truncateText } from "@/lib/helper";
import cartItemServices from "@/services/cartItemServices";
import cartServices from "@/services/cartServices";
import productServices from "@/services/productServices";
import { ICart, ICartItem, IProduct } from "@/types/Types";
import { Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import Swal from "sweetalert2";

const ProductPage = () => {
    const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await productServices.get();
            setProducts(res.data);
        }
        fetchProducts();
    }, []);

    const addCartItemService = async (data: ICartItem) => {
        try {
            await cartItemServices.create(data);
            Swal.fire({
                title: "Success!",
                text: "Success add to cart!",
                icon: "success",
                confirmButtonText: "OK"
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error!",
                text: (error as Error).message,
                icon: "error",
                confirmButtonText: "OK"
            });
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
            <div className="grid grid-cols-5 gap-4 min-h-[calc(100vh-350px)]">
                {products.map((product: IProduct) => {
                    return (
                        <Card key={product.ProductID}>
                            <CardBody className="flex flex-col justify-between gap-2">
                                <div>
                                    <Image
                                        src={`${baseUrlApi}/uploads/${product?.Picture}`}
                                        alt="Picture"
                                        width={300}
                                        height={300}
                                    />
                                    <p className="text-xl font-bold">{product.Name}</p>
                                    <p>{truncateText(product.Description)}</p>
                                </div>
                                <div className="w-full">
                                    <p className="text-lg font-semibold text-end">{formatRupiah(Number(product.Price))}</p>
                                    <Button
                                        color="primary"
                                        className="w-full mt-3"
                                        onPress={() => handleAddCart(Number(product.ProductID))}
                                    ><HiOutlineShoppingCart /> Add to cart</Button>
                                </div>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
        </main>
    )
}

export default ProductPage;