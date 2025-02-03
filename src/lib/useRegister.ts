import authServices from "@/services/authServices";
import { IFormDataRegister } from "@/types/Types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
    Name: yup.string().required("Please enter your name"),
    Email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    Password: yup.string().required("Please enter your password"),
    PasswordConfirmation: yup.string()
        .oneOf([yup.ref('Password'), ""], "Passwords must match")
        .required("Please enter your password confirmation")
}).required();

const useRegister = () => {
    const router = useRouter();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [errorRegister, setErrorRegister] = useState<string>("");

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const register = async (data: IFormDataRegister) => {
        setErrorRegister("");
        const res = await authServices.register(data);
        return res;
    };

    const {
        mutate: mutateRegister,
        isPending: isPendingRegister
    } = useMutation({
        mutationFn: register,
        onSuccess: () => {
            reset();
            setIsOpenModal(!isOpenModal);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        },
        onError: () => {
            setErrorRegister("An error has occurred.");
        }
    });

    const handleRegister = (data: IFormDataRegister) => mutateRegister(data);

    return {
        isOpenModal,
        errorRegister,
        control,
        handleSubmit, 
        errors,
        handleRegister,
        isPendingRegister
    }
}

export default useRegister;