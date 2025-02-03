"use client"

import productServices from "@/services/productServices";
import { IProduct } from "@/types/Types";
import FormCreateProduct from "@/ui/product/FormCreateProduct";
import {  
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell, } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const DashboardProductPage = () => {
    const [isOpenFormCreateProduct, setIsOpenFormCreateProduct] = useState<boolean>(false);
    const [products, setProducts] = useState([]);
    const [refetchDataProducts, setRefetchDataProducts] = useState(false);

    useEffect(() => {
        const getDataProducts = async () => {
            const res = await productServices.get();
            setProducts(res.data)
        }
        getDataProducts();
    }, [refetchDataProducts])

    return (
        <div className="p-8 flex flex-col gap-3">
            <div className="flex justify-between mb-5">
                <div className="flex gap-2">
                    <p>Dashboard</p>
                    <p>/</p>
                    <Link href="/dashboard/product" className="font-bold">Product</Link>
                </div>
                <div>
                    <Image 
                        src="/images/user.png"
                        alt="User"
                        width={30}
                        height={30}
                    />
                </div>
            </div>
            <div>
                <div className="flex justify-end mb-3">
                    <Button 
                        type="button" 
                        className="bg-black text-white" 
                        onPress={() => setIsOpenFormCreateProduct(true)}
                    >Add Product</Button>
                </div>
                <Table aria-label="Example table with dynamic content">
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn>Price</TableColumn>
                        <TableColumn>Stock</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {products.map((product: IProduct) => {
                            return (
                                <TableRow key={product.ProductID}>
                                    <TableCell>{product.Name}</TableCell>
                                    <TableCell>{product.Description}</TableCell>
                                    <TableCell>{product.Price}</TableCell>
                                    <TableCell>{product.Stock}</TableCell>
                                    <TableCell>
                                        <Button size="sm" color="danger" className="w-fit">
                                            <FaTrashCan />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            <FormCreateProduct 
                isOpenFormCreateProduct={isOpenFormCreateProduct} 
                setIsOpenFormCreateProduct={setIsOpenFormCreateProduct}
                refetchDataProducts={refetchDataProducts}
                setRefetchDataProducts={setRefetchDataProducts}
            />
        </div>
    )
}

export default DashboardProductPage;