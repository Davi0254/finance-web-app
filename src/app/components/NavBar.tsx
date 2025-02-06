'use client'

import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import homeIcon from "@/app/assets/home-1-svgrepo-com.svg";
import budgetIcon from "@/app/assets/budget-business-calculate-svgrepo-com.svg";
import transactionsIcon from "@/app/assets/transactions-svgrepo-com.svg";
import menuIcon from "@/app/assets/menu-svgrepo-com.svg";
import goalsIcon from "@/app/assets/goals-svgrepo-com.svg";
import titleIcon from '@/app/assets/file-paper-finance-svgrepo-com.svg';
import closeIcon from '@/app/assets/close-svgrepo-com.svg'
import { Roboto } from "next/font/google";

const roboto = Roboto({ weight: '400', subsets: ["latin"] })

const NavBar = ({ isMenuOpen, setIsMenuOpen, token }: {
    isMenuOpen: boolean
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
    token: string | null
}) => {

    const logout = () => {
        localStorage.clear();
    }

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className={`flex h-16 bg-emerald-700 text-white shadow ${roboto.className}`}>
            <div className="flex items-center justify-between w-full ml-2">
                <div className="flex gap-2">
                    <h1>finance Manager App</h1>
                    <Image
                        src={titleIcon}
                        width={25}
                        height={25}
                        alt="icon"
                    />
                </div>
                <Image
                    src={menuIcon}
                    width={20}
                    height={20}
                    alt="icon"
                    className="cursor-pointer sm:hidden mr-1"
                    onClick={toggleMenu}
                />
            </div>
            <div className="hidden sm:flex items-center sm:justify-end w-full text-sm">
                <div className="flex gap-1 mx-4">
                    <Image
                        src={homeIcon}
                        width={20}
                        height={20}
                        alt="icon"
                    />
                    <ul><Link href='/'>home</Link></ul>
                </div>
                <div className="flex gap-1 mx-4">
                    <Image
                        src={budgetIcon}
                        width={20}
                        height={20}
                        alt="icon"
                    />
                    <ul><Link href='/pages/budget'>budget</Link></ul>
                </div>
                <div className="flex gap-1 mx-4">
                    <Image
                        src={transactionsIcon}
                        width={20}
                        height={20}
                        alt="icon"
                    />
                    <ul><Link href='/pages/transactions'>transactions</Link></ul>
                </div>
                <div className="flex gap-1 mx-4">
                    <Image
                        src={goalsIcon}
                        width={20}
                        height={20}
                        alt="icon"
                    />
                    <ul><Link href='/pages/goals'>goals</Link></ul>
                </div>
                <div className="flex mx-4">
                    {!token ? (
                        <ul><Link href="/pages/login">login</Link></ul>
                    ) : (
                        <ul ><Link onClick={logout} href="/pages/login">logout</Link></ul>
                    )}
                </div>
            </div>
            {isMenuOpen && (
                <div className="fixed top-0 left-0 h-full items-center w-full text-sm bg-emerald-800 text-white justify-center z-50">
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <Image
                            src={closeIcon}
                            onClick={toggleMenu}
                            width={20}
                            height={20}
                            alt="icon"
                            className="cursor-pointer"
                        />
                        <div className="flex justify-center border-b w-32">
                            <Image
                                src={homeIcon}
                                width={20}
                                height={20}
                                alt="icon"
                                className="mb-2"
                            />
                            <ul className="ml-2"><Link href='/'>home</Link></ul>
                        </div>
                        <div className="flex justify-center border-b w-32">
                            <Image
                                src={budgetIcon}
                                width={20}
                                height={20}
                                alt="icon"
                                className="mb-2"
                            />
                            <ul className="ml-2"><Link href='/pages/budget'>budget</Link></ul>
                        </div>
                        <div className="flex justify-center border-b w-32">
                            <Image
                                src={transactionsIcon}
                                width={20}
                                height={20}
                                alt="icon"
                                className="mb-2"
                            />
                            <ul className="ml-2"><Link href='/pages/transactions'>transactions</Link></ul>
                        </div>
                        <div className="flex justify-center border-b w-32">
                            <Image
                                src={goalsIcon}
                                width={20}
                                height={20}
                                alt="icon"
                                className="mb-2"
                            />
                            <ul className="ml-2"><Link href='/pages/goals'>goals</Link></ul>
                        </div>

                        <div className="flex justify-center border-b w-32">
                            {!token ? (
                                <ul className="mb-2"><Link href="/pages/login">login</Link></ul>
                            ) : (
                                <ul className="mb-2"><Link onClick={logout} href="/pages/login">logout</Link></ul>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar;

