"use client";
import cartItemServices from "@/services/cartItemServices";
import { ICartItem, IFromDataAddress } from "@/types/Types";
import { Button, Card, CardBody, Form, Input, Spinner } from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Image from "next/image";
import orderServices from "@/services/orderServices";
import addressServices from "@/services/addressServices";
import Link from "next/link";
import { useRouter } from "next/navigation";

const schema = yup.object({
    AddressLine1: yup.string().required("Please enter your address line 1"),
    AddressLine2: yup.string(),
    City: yup.string().required("Please enter your city"),
    State: yup.string().required("Please enter your state"),
    ZipCode: yup.string().required("Please enter your zip code"),
}).required();

const CartPage = () => {
    const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
    const router = useRouter();
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number | null>(null);

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

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const buyService = async (data: IFromDataAddress) => {
        const res = await cartItemServices.get();
        const dataCarts: ICartItem[] = res.data;
        const cartId = dataCarts[0].CartID;

        data.CartID = cartId;
        await orderServices.create({ CartID: cartId });
        await addressServices.create(data);
    };

    const {
        mutate: mutateBuy,
        isPending: isPendingBuy
    } = useMutation({
        mutationFn: buyService,
        onSuccess: (res) => {
            reset();
            console.log(res)
            router.push("/success-order");
        },
        onError: (error) => {
            console.log(error);
        }
    });
    
    const handleLogin = (data: IFromDataAddress) => mutateBuy(data);

    return (
        <main className="flex gap-5">
            <div className="flex-1 flex flex-col gap-2">
                {!cartItems.length && (
                    <p>No Items <Link href="/product" className="text-blue-800">Go to Product Page</Link></p>
                )}
                {cartItems.map((cartItem: ICartItem) => {
                    return (
                        <div key={cartItem.CartItemID}>
                            <Card>
                                <CardBody>
                                    <div className="flex gap-3">
                                        <div>
                                            <Image
                                                src={`${baseUrlApi}/uploads/${cartItem.Products?.Picture}`}
                                                alt="Picture"
                                                width={200}
                                                height={200}
                                            />
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div>
                                                <p className="font-bold text-xl">{cartItem.Products?.Name}</p>
                                                <p>{cartItem.Products?.Description}</p>
                                            </div>
                                            <div>Harga: {cartItem.Products?.Price} x {cartItem.Quantity} = {Number(cartItem.Products?.Price)*cartItem.Quantity}</div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    )
                })}
            </div>
            <div className="w-[24rem]">
                <Card className="px-4 py-2">
                    <CardBody>
                        <p className="font-bold">Your Address</p>
                        <Form
                            className="w-80 flex flex-col"
                            onSubmit={handleSubmit(handleLogin)}
                        >
                            <Controller
                                name="AddressLine1"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        label="AddressLine1"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.AddressLine1 !== undefined}
                                        errorMessage={errors.AddressLine1?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="AddressLine2"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        label="AddressLine2"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.AddressLine2 !== undefined}
                                        errorMessage={errors.AddressLine2?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="City"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        label="City"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.City !== undefined}
                                        errorMessage={errors.City?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="State"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        label="State"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.State !== undefined}
                                        errorMessage={errors.State?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="ZipCode"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        label="ZipCode"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.ZipCode !== undefined}
                                        errorMessage={errors.ZipCode?.message}
                                    />
                                )}
                            />
                            <p className="text-2xl font-bold">total: Rp{totalPrice}</p>
                            <div className="flex justify-end w-full my-4">
                                <Button 
                                    className="min-w-full" 
                                    type={isPendingBuy ? "button" : "submit"} 
                                    color="primary"
                                    isDisabled={isPendingBuy || !cartItems.length}
                                >
                                    {isPendingBuy ? <Spinner color="white" /> : "Buy"}
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </main>
    )
}

export default CartPage;