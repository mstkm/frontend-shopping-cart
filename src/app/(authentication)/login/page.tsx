"use client";

import { Button, Form, Input, Spinner } from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormDataLogin } from "@/types/Types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";

const schema = yup.object({
    Email: yup.string().email("Please enter a valid email").required("Please enter your email"),
    Password: yup.string().required("Please enter your password")
                    .min(8, "Password Invalid")
                    .matches(/[A-Z]/, "Password Invalid")
                    .matches(/[a-z]/, "Password Invalid")
                    .matches(/[\W_]/, "Password Invalid"),
}).required();

const LoginPage = () => {
    const router = useRouter();
    const [errorLogin, setErrorLogin] = useState<string>("");

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    const callbackUrl: string = "/";
    const loginService = async (data: IFormDataLogin) => {
        const res = await signIn("Credentials", {
            ...data,
            redirect: false,
            callbackUrl
        });
        return res;
    };

    const {
        mutate: mutateLogin,
        isPending: isPendingLogin
    } = useMutation({
        mutationFn: loginService,
        onSuccess: (res) => {
            if (res?.ok) {
                reset();
                router.push("/dashboard");
            } else {
                setErrorLogin("Invalid credentials");
            }
        },
        onError: () => {
            setErrorLogin("Invalid credentials");
        }
    });

    const handleLogin = (data: IFormDataLogin) => mutateLogin(data);

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-3xl font-bold">Login</h1>
                <p>Don&apos;t have an account <Link href="/register" className="text-blue-500 font-semibold">Register here</Link></p>
            </div>
            <Form
                className="w-80 flex flex-col"
                onSubmit={handleSubmit(handleLogin)}
            >
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
                        isInvalid={errors.Password !== undefined}
                        errorMessage={errors.Password?.message}
                    />
                    )}
                />
                
                <div className="flex justify-end w-full my-4">
                    <Button className="min-w-full" type={isPendingLogin ? "button" : "submit"} color="primary">
                        {isPendingLogin ? <Spinner color="white" /> : "Login"}
                    </Button>
                </div>

                {(errorLogin !== "") && <p className="w-full text-center text-red-800 font-bold">{errorLogin}</p>}
            </Form>
        </div>
    );
};

export default LoginPage;
