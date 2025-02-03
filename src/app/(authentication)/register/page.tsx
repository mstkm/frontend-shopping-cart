"use client"
import { Button, Form, Input, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";
import ModalSuccessRegister from "@/ui/ModalSuccessRegister";
import Link from "next/link";
import useRegister from "@/lib/useRegister";

const Register = () => {
    const {
        isOpenModal,
        errorRegister,
        control,
        handleSubmit, 
        errors,
        handleRegister,
        isPendingRegister
    } = useRegister();

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Register</h1>
                <p>Have an account? <Link href="/login" className="text-blue-500 font-semibold">Login here</Link></p>
            </div>
            <Form
                className="w-80 flex flex-col"
                onSubmit={handleSubmit(handleRegister)}
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
                        readOnly={isPendingRegister}
                        isInvalid={errors.Name !== undefined}
                        errorMessage={errors.Name?.message}
                    />
                    )}
                />
                <Controller 
                    name="Email"
                    control={control}
                    render={({ field }) => (
                        <Input
                        {...field}
                        type="email"
                        label="Email"
                        variant="bordered"
                        autoComplete="off"
                        readOnly={isPendingRegister}
                        isInvalid={errors.Email !== undefined}
                        errorMessage={errors.Email?.message}
                    />
                    )}
                />
                <Controller 
                    name="Password"
                    control={control}
                    render={({ field }) => (
                        <Input
                        {...field}
                        type="password"
                        label="Password"
                        variant="bordered"
                        autoComplete="off"
                        readOnly={isPendingRegister}
                        isInvalid={errors.Password !== undefined}
                        errorMessage={errors.Password?.message}
                    />
                    )}
                />
                <Controller 
                    name="PasswordConfirmation"
                    control={control}
                    render={({ field }) => (
                        <Input
                        {...field}
                        type="password"
                        label="Password Confirmation"
                        variant="bordered"
                        autoComplete="off"
                        readOnly={isPendingRegister}
                        isInvalid={errors.PasswordConfirmation !== undefined}
                        errorMessage={errors.PasswordConfirmation?.message}
                    />
                    )}
                />
                
                <div className="flex justify-end w-full my-4">
                    <Button className="min-w-full" type={isPendingRegister ? "button" : "submit"} color="primary">
                        {isPendingRegister ? <Spinner color="white" /> : "Submit"}
                    </Button>
                </div>

                {(errorRegister !== "") && <p className="w-full text-center text-red-800 font-bold">{errorRegister}</p>}
            </Form>
            <ModalSuccessRegister isOpen={isOpenModal} />
        </div>
    );
};

export default Register;
