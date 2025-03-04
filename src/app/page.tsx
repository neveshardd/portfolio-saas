"use client";
import { useState, useRef } from 'react';
import { CirclePlus, Download, Trash2, X } from "lucide-react";
import Image from "next/image";

export default function Home() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const desktopInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [desktopPreview, setDesktopPreview] = useState<string | null>(null);

    return (
        <div className="text-white px-4 py-3 space-y-12">
            <button className="bg-white text-black p-3 rounded-full cursor-pointer bottom-0 right-10 fixed"><Download /></button>
            <div className="flex justify-between items-center">
                <div className="font-bold">Cliente</div>
                <Image src="/logo.png" width={50} height={50} alt="logo" />
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>Mobile</div>
                    <div className='flex items-center gap-2'>
                        <button className="cursor-pointer bg-neutral-500 text-white p-2 rounded-full" onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                        }}><X /></button>
                        <button className="bg-white text-black py-2 px-6 rounded-full cursor-pointer">Adicionar +</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                    <div className="border border-dashed flex justify-center items-center w-full aspect-[9/16] min-h-32 relative bg-white/10 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setPreview(URL.createObjectURL(file));
                            }}
                        />
                        <button className="absolute right-5 top-5 cursor-pointer bg-red-500 text-white p-3 rounded-full" onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                        }}><Trash2 /></button>
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div><CirclePlus /></div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>Desktop</div>
                    <div className='flex items-center gap-2'>
                        <button className="cursor-pointer bg-neutral-500 text-white p-2 rounded-full" onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                        }}><X /></button>
                        <button className="bg-white text-black py-2 px-6 rounded-full cursor-pointer">Adicionar +</button>
                    </div>
                </div>
                <div className="gap-3 flex flex-col">
                    <div className="border border-dashed flex justify-center items-center w-full aspect-video relative bg-white/10 cursor-pointer" onClick={() => desktopInputRef.current?.click()}>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={desktopInputRef}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setDesktopPreview(URL.createObjectURL(file));
                            }}
                        />
                        <button className="absolute right-5 top-5 cursor-pointer bg-red-500 text-white p-3 rounded-full" onClick={(e) => {
                            e.stopPropagation();
                            setDesktopPreview(null);
                        }}><Trash2 /></button>
                        {desktopPreview ? (
                            <img src={desktopPreview} alt="Desktop Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div><CirclePlus /></div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}