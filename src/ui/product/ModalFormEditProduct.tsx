import { formatNumber, formatRupiah } from "@/lib/helper";
import productServices from "@/services/productServices";
import { IFormDataProduct, IProduct } from "@/types/Types";
import {  
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Form,
    Input,
    Spinner,
    Textarea
} from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import Swal from "sweetalert2";

interface PropTypes {
    isOpenModalFormEditProduct: boolean;
    setIsOpenModalFormEditProduct: Dispatch<SetStateAction<boolean>>;
    refetchDataProducts: boolean;
    setRefetchDataProducts: Dispatch<SetStateAction<boolean>>;
    selectedProduct: IProduct;
}

const schema = yup.object({
    Name: yup.string().required("Please enter product name"),
    Description: yup.string().required("Please enter product description"),
    Price: yup.number().required("Please enter product price"),
    Stock: yup.number().required("Please enter product stock"),
}).required();

const ModalFormEditProduct = ({ 
    isOpenModalFormEditProduct, 
    setIsOpenModalFormEditProduct,
    refetchDataProducts,
    setRefetchDataProducts,
    selectedProduct
}: PropTypes) => {
    const [errorEditProduct, setErrorEditProduct] = useState<string>("");
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            Name: selectedProduct?.Name || "",
            Description: selectedProduct?.Description || "",
            Price: selectedProduct?.Price || 0,
            Stock: selectedProduct?.Stock || 0,
        }
    });

    useEffect(() => {
        if (selectedProduct) {
            reset({
                Name: selectedProduct.Name || "",
                Description: selectedProduct.Description || "",
                Price: selectedProduct.Price || 0,
                Stock: selectedProduct.Stock || 0,
            });
        }
    }, [selectedProduct, reset]);

    const editProductService = async (data: IFormDataProduct) => {
        if (!selectedProduct.ProductID) throw new Error("No product selected for editing!");
        const res = await productServices.update(data, selectedProduct.ProductID);
        return res;
    };

    const {
        mutate: mutateEditProduct,
        isPending: isPendingEditProduct,
    } = useMutation({
        mutationFn: editProductService,
        onSuccess: () => {
            reset();
            setRefetchDataProducts(!refetchDataProducts);
            setIsOpenModalFormEditProduct(false);
            Swal.fire({
                title: "Success!",
                text: "Success edit product!",
                icon: "success",
                confirmButtonText: "OK"
            });
        },
        onError: (error) => {
            setErrorEditProduct(error.message);
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    });

    const handleEditProduct = (data: IFormDataProduct) => mutateEditProduct(data);

    return (
        <Modal isOpen={isOpenModalFormEditProduct} onOpenChange={() => setIsOpenModalFormEditProduct(false)}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Product</ModalHeader>
                        <ModalBody>
                        <Form
                            className="w-full flex flex-col"
                            onSubmit={handleSubmit(handleEditProduct)}
                        >
                            <Controller 
                                name="Name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                    {...field}
                                    type="text"
                                    label="Name"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.Name !== undefined}
                                    errorMessage={errors.Name?.message}
                                />
                                )}
                            />
                            <Controller 
                                name="Description"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Description"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.Description !== undefined}
                                        errorMessage={errors.Description?.message}
                                    />
                                )}
                            />
                            <Controller 
                                name="Price"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        type="text"
                                        label="Price"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.Price !== undefined}
                                        errorMessage={errors.Price?.message}
                                        value={field.value ? formatRupiah(field.value) : ""}
                                        onChange={(e) => {
                                            const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
                                            field.onChange(rawValue ? Number(rawValue) : "");
                                        }}
                                    />
                                )}
                            />
                        <Controller 
                            name="Stock"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="text"
                                    label="Stock"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.Stock !== undefined}
                                    errorMessage={errors.Stock?.message}
                                    value={field.value ? formatNumber(field.value) : ""}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, ""); 
                                        field.onChange(rawValue ? Number(rawValue) : "");
                                    }}
                                />
                            )}
                        />
                            
                            <div className="flex gap-2 justify-end w-full my-4">
                                <Button color="primary" variant="bordered" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type={isPendingEditProduct ? "button" : "submit"} color="primary">
                                    {isPendingEditProduct ? <Spinner color="white" /> : "Submit"}
                                </Button>
                            </div>

                            {(errorEditProduct !== "") && <p className="w-full text-center text-red-800 font-bold">{errorEditProduct}</p>}
                        </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalFormEditProduct;