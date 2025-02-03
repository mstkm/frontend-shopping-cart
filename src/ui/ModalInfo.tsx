import {
    Modal,
    ModalContent,
    ModalBody,
    ModalFooter,
    Button,
  } from "@heroui/react";
import { useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
  
  export default function ModalInfo({ isOpenModalInfo }: {
    isOpenModalInfo: boolean;
  }) {
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        setOpenModal(isOpenModalInfo)
    }, [isOpenModalInfo]);
  
    return (
      <>
        <Modal isOpen={openModal} onOpenChange={() => setOpenModal(!openModal)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="flex justify-center items-center">
                    <p className="h-5"></p>
                    <FaCircleCheck className="text-3xl mb-3" />
                    <p className="text-2xl font-bold">Success Create Product!</p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  