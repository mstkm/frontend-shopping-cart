"use client"

import productServices from "@/services/productServices";
import { IProduct } from "@/types/Types";
import ModalDeleteProduct from "@/ui/product/ModalDeleteProduct";
import ModalFormCreateProduct from "@/ui/product/ModalFormCreateProduct";
import ModalFormEditProduct from "@/ui/product/ModalFormEditProduct";
import {  
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Alert,
} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

const DashboardProductPage = () => {
    const [isOpenModalFormCreateProduct, setIsOpenModalFormCreateProduct] = useState<boolean>(false);
    const [isOpenModalFormEditProduct, setIsOpenModalFormEditProduct] = useState<boolean>(false);
    const [isOpenModalDeleteProduct, setIsOpenModalDeleteProduct] = useState<boolean>(false);
    const [products, setProducts] = useState([]);
    const [refetchDataProducts, setRefetchDataProducts] = useState(false);
    const [isShowAlertSuccess, setIsShowAlertSuccess] = useState<boolean>(false);
    const [alertMessageSuccess, setAlertMessageSuccess] = useState<string>("");
    const [selectedId, setSelectedId] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<IProduct>({
        ProductID: "",
        Name: "",
        Description: "",
        Price: 0,
        Stock: 0,
    });

    useEffect(() => {
        const getDataProducts = async () => {
            const res = await productServices.get();
            setProducts(res.data)
        }
        getDataProducts();
    }, [refetchDataProducts])

    return (
        <div>
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
                        color="primary"
                        onPress={() => setIsOpenModalFormCreateProduct(true)}
                    >Add Product</Button>
                </div>
                {isShowAlertSuccess && (
                    <div className="flex items-center justify-center w-full my-2">
                        <Alert 
                            color="success" 
                            title={alertMessageSuccess}
                            onClose={() => setIsShowAlertSuccess(false)}
                        />
                    </div>
                )}
                <Table 
                    isCompact 
                    isHeaderSticky
                    aria-label="Example table with dynamic content"
                    classNames={{
                        wrapper: `${isShowAlertSuccess ? "max-h-[510px]" : "max-h-[580px]"} overflow-y-scroll`,
                    }}
                >
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
                                    <TableCell className="flex gap-2">
                                        <Button 
                                            isIconOnly 
                                            size="sm" 
                                            color="primary"
                                            onPress={() => {
                                                setIsOpenModalFormEditProduct(true)
                                                setSelectedProduct({
                                                    ProductID: product.ProductID,
                                                    Name: product.Name,
                                                    Description: product.Description,
                                                    Price: product.Price,
                                                    Stock: product.Stock,
                                                });
                                            }}
                                        >
                                            <FaPenToSquare />
                                        </Button>
                                        <Button 
                                            isIconOnly 
                                            size="sm" 
                                            color="danger"
                                            onPress={() => {
                                                setIsOpenModalDeleteProduct(true)
                                                setSelectedId(product.ProductID)
                                            }}
                                        >
                                            <FaRegTrashCan />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
            
            <ModalFormCreateProduct 
                isOpenModalFormCreateProduct={isOpenModalFormCreateProduct} 
                setIsOpenModalFormCreateProduct={setIsOpenModalFormCreateProduct}
                refetchDataProducts={refetchDataProducts}
                setRefetchDataProducts={setRefetchDataProducts}
                setIsShowAlertSuccess={setIsShowAlertSuccess}
                setAlertMessageSuccess={setAlertMessageSuccess}
            />
            <ModalFormEditProduct 
                isOpenModalFormEditProduct={isOpenModalFormEditProduct} 
                setIsOpenModalFormEditProduct={setIsOpenModalFormEditProduct}
                refetchDataProducts={refetchDataProducts}
                setRefetchDataProducts={setRefetchDataProducts}
                setIsShowAlertSuccess={setIsShowAlertSuccess}
                setAlertMessageSuccess={setAlertMessageSuccess}
                selectedProduct={selectedProduct}
            />
            <ModalDeleteProduct 
                isOpenModalDeleteProduct={isOpenModalDeleteProduct}
                setIsOpenModalDeleteProduct={setIsOpenModalDeleteProduct}
                refetchDataProducts={refetchDataProducts}
                setRefetchDataProducts={setRefetchDataProducts}
                setIsShowAlertSuccess={setIsShowAlertSuccess}
                setAlertMessageSuccess={setAlertMessageSuccess}
                selectedId={selectedId}
            />
        </div>
    )
}

export default DashboardProductPage;