"use client"

import { formatNumber, formatRupiah } from "@/lib/helper";
import productServices from "@/services/productServices";
import { IProduct } from "@/types/Types";
import HeaderAdmin from "@/ui/HeaderAdmin";
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
    Pagination,
} from "@heroui/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaRegTrashCan, FaPenToSquare } from "react-icons/fa6";

const DashboardProductPage = () => {
    const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
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

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const pages = Math.ceil(products.length / rowsPerPage);

    const dataProducts = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return products.slice(start, end);
    }, [page, products]);

    return (
        <div>
            <HeaderAdmin />
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
                            isVisible={isShowAlertSuccess}
                            onClose={() => setIsShowAlertSuccess(false)}
                        />
                    </div>
                )}
                <Table 
                    isCompact 
                    isHeaderSticky
                    aria-label="Example table with dynamic content"
                    topContent={
                        <div className="flex w-full justify-center">
                          <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                          />
                        </div>
                      }
                >
                    <TableHeader>
                        <TableColumn>Name</TableColumn>
                        <TableColumn>Description</TableColumn>
                        <TableColumn>Price</TableColumn>
                        <TableColumn>Stock</TableColumn>
                        <TableColumn>Picture</TableColumn>
                        <TableColumn>Actions</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {dataProducts.map((product: IProduct) => {
                            return (
                                <TableRow key={product.ProductID}>
                                    <TableCell>{product.Name}</TableCell>
                                    <TableCell>{product.Description}</TableCell>
                                    <TableCell>{formatRupiah(Number(product.Price))}</TableCell>
                                    <TableCell>{formatNumber(Number(product.Stock))}</TableCell>
                                    <TableCell>{product.Picture ? (
                                        <Image 
                                            src={`${baseUrlApi}/uploads/${product?.Picture}`}
                                            alt="Picture"
                                            width={100}
                                            height={100}
                                        />
                                    ): (
                                        "No Picture"
                                    )}</TableCell>
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
                                                setSelectedId(`${product.ProductID}`)
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