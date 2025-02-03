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

interface PropTypes {
    isOpenModalDeleteProduct: boolean;
    setIsOpenModalDeleteProduct: Dispatch<SetStateAction<boolean>>;
    refetchDataProducts: boolean;
    setRefetchDataProducts: Dispatch<SetStateAction<boolean>>;
    setIsShowAlertSuccess: Dispatch<SetStateAction<boolean>>;
    setAlertMessageSuccess: Dispatch<SetStateAction<string>>;
    selectedId: string;
}

const ModalDeleteProduct = ({ 
    isOpenModalDeleteProduct, 
    setIsOpenModalDeleteProduct,
    refetchDataProducts,
    setRefetchDataProducts,
    setIsShowAlertSuccess,
    setAlertMessageSuccess,
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
            setIsShowAlertSuccess(true);
            setAlertMessageSuccess("Success delete product!")
        },
        onError: (error) => {
            setErrorDeleteProduct(error.message);
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
                                <Button color="danger" onPress={onClose}>
                                    Close
                                </Button>
                                <Button 
                                    color="primary"
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