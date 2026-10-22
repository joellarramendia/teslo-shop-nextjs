'use client'

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";
import clsx from "clsx";

import { authenticate } from "@/src/actions"

export const LoginForm = () => {

    // const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    
    useEffect(() => {
        if(errorMessage === 'Success') {
            // router.replace('/')
            window.location.replace('/')
        }
    }, [errorMessage])

    return (
        <form action={formAction} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 bg-gray-200 rounded mb-5"
                type="email"
                name="email"
            />


            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 bg-gray-200 rounded mb-5"
                type="password"
                name="password"
            />

            {errorMessage === "Invalid credentials." && (
                <div className=" flex flex-row mb-2">
                    <IoInformationOutline className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">Credenciales no son correctas</p>
                </div>
            )}


            {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
            <button className={clsx({
                "btn-primary": !isPending,
                "btn-disabled": isPending
            })} disabled={isPending}>
                Ingresar
            </button>



            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}


