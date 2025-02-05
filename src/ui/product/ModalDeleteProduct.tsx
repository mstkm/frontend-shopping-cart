import productServices from "@/services/productServices";
import {  
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Spinner,
} from "@heroui/react";
import { useMutation } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";
import Swal from "sweetalert2";

interface PropTypes {
    isOpenModalDeleteProduct: boolean;
    setIsOpenModalDeleteProduct: Dispatch<SetStateAction<boolean>>;
    refetchDataProducts: boolean;
    setRefetchDataProducts: Dispatch<SetStateAction<boolean>>;
    selectedId: string;
}

const ModalDeleteProduct = ({ 
    isOpenModalDeleteProduct, 
    setIsOpenModalDeleteProduct,
    refetchDataProducts,
    setRefetchDataProducts,
    selectedId
}: PropTypes) => {
    const [errorCreateProduct, setErrorDeleteProduct] = useState<string>("");

    const deleteProductService = async (selectedId: string) => {
        const res = await productServices.delete(selectedId);
        return res;
    };

    const {
        mutate: mutateDeleteProduct,
        isPending: isPendingCreateProduct,
    } = useMutation({
        mutationFn: deleteProductService,
        onSuccess: () => {
            setRefetchDataProducts(!refetchDataProducts);
            setIsOpenModalDeleteProduct(false);
            Swal.fire({
                title: "Success!",
                text: "Success delete product!",
                icon: "success",
                confirmButtonText: "OK"
            });
        },
        onError: (error) => {
            setErrorDeleteProduct(error.message);
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
                confirmButtonText: "OK"
            });
        }
    });

    const handleDeleteProduct = (selectedId: string) => mutateDeleteProduct(selectedId);

    return (
        <Modal 
            isOpen={isOpenModalDeleteProduct} 
            onOpenChange={() => {
                setIsOpenModalDeleteProduct(false);
                setErrorDeleteProduct("");
            }}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Delete Product</ModalHeader>
                        <ModalBody>
                            <p className="text-center">Are you sure?</p>
                            <div className="flex gap-2 justify-end w-full my-4">
                                <Button color="primary" variant="bordered" onPress={onClose}>
                                    Close
                                </Button>
                                <Button 
                                    color="danger"
                                    isDisabled={isPendingCreateProduct} 
                                    onPress={() => handleDeleteProduct(selectedId)}
                                >
                                    {isPendingCreateProduct ? <Spinner color="white" /> : "Delete"}
                                </Button>
                            </div>

                            {(errorCreateProduct !== "") && <p className="w-full text-center text-red-800 font-bold">{errorCreateProduct}</p>}
                        
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalDeleteProduct;