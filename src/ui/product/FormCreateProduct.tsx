import productServices from "@/services/productServices";
import { IFormDataProduct } from "@/types/Types";
import {  
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Form,
    Input,
    Spinner
} from "@heroui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface PropTypes {
    isOpenFormCreateProduct: boolean;
    setIsOpenFormCreateProduct: Dispatch<SetStateAction<boolean>>;
    refetchDataProducts: boolean;
    setRefetchDataProducts: Dispatch<SetStateAction<boolean>>;
}

const schema = yup.object({
    Name: yup.string().required("Please enter product name"),
    Description: yup.string().required("Please enter product description"),
    Price: yup.number().required("Please enter product price"),
    Stock: yup.number().required("Please enter product stock"),
}).required();

const FormCreateProduct = ({ 
    isOpenFormCreateProduct, 
    setIsOpenFormCreateProduct,
    refetchDataProducts,
    setRefetchDataProducts
}: PropTypes) => {
    const [errorCreateProduct, setErrorCreateProduct] = useState<string>("");
    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const addProductService = async (data: IFormDataProduct) => {
        const res = await productServices.create(data)
        return res;
    };

    const {
        mutate: mutateCreateProduct,
        isPending: isPendingCreateProduct,
    } = useMutation({
        mutationFn: addProductService,
        onSuccess: () => {
            reset();
            setRefetchDataProducts(!refetchDataProducts);
            setIsOpenFormCreateProduct(false)
        },
        onError: (error) => {
            setErrorCreateProduct(error.message);
        }
    });

    const handleCreateProduct = (data: IFormDataProduct) => mutateCreateProduct(data);

    return (
        <Modal isOpen={isOpenFormCreateProduct} onOpenChange={() => setIsOpenFormCreateProduct(false)}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Add Product</ModalHeader>
                        <ModalBody>
                        <Form
                            className="w-full flex flex-col"
                            onSubmit={handleSubmit(handleCreateProduct)}
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
                                    <Input
                                    {...field}
                                    type="text"
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
                                        type="number"
                                        label="Price"
                                        variant="bordered"
                                        autoComplete="off"
                                        isInvalid={errors.Price !== undefined}
                                        errorMessage={errors.Price?.message}
                                        value={field.value?.toString() || ""}
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                                    />
                                )}
                            />
                        <Controller 
                            name="Stock"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    label="Stock"
                                    variant="bordered"
                                    autoComplete="off"
                                    isInvalid={errors.Stock !== undefined}
                                    errorMessage={errors.Stock?.message}
                                    value={field.value?.toString() || ""}
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                                />
                            )}
                        />
                            
                            <div className="flex justify-end w-full my-4">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button type={isPendingCreateProduct ? "button" : "submit"} color="primary">
                                    {isPendingCreateProduct ? <Spinner color="white" /> : "Submit"}
                                </Button>
                            </div>

                            {(errorCreateProduct !== "") && <p className="w-full text-center text-red-800 font-bold">{errorCreateProduct}</p>}
                        </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default FormCreateProduct;