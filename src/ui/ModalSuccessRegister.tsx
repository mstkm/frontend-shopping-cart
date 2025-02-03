import {
    Modal,
    ModalContent,
    ModalBody,
    useDisclosure,
    Spinner,
} from "@heroui/react";
import { FaCircleCheck } from "react-icons/fa6";

const ModalSuccessRegister = ({ isOpen }: { isOpen: boolean}) => {
    const { onOpenChange } = useDisclosure();

    return (
        <>
            <Modal
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                hideCloseButton={true}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalBody>
                                <div className="h-5"></div>
                                <div className="flex flex-col justify-center items-center gap-5">
                                    <FaCircleCheck className="text-3xl" />
                                    <p className="text-3xl font-bold">Success Register!</p>
                                    <p>Redirecting to Login page....</p>
                                    <Spinner color="default" />
                                </div>
                                <div className="h-5"></div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalSuccessRegister;