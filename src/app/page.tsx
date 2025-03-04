import { CirclePlus, Download, Trash2 } from "lucide-react";
import Image from "next/image";

export default function Home() {
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
                    <button className="bg-white text-black py-2 px-6 rounded-full">Adicionar +</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                    <div className="border border-dashed flex justify-center items-center w-full aspect-[9/16] min-h-32 relative">
                        <button className="absolute right-5 top-5 cursor-pointer bg-red-500 text-white p-3 rounded-full"><Trash2 /></button>
                        <div><CirclePlus /></div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>Desktop</div>
                    <button className="bg-white text-black py-2 px-4 md:px-6 rounded-full">Adicionar +</button>
                </div>
                <div className="gap-3 flex flex-col">
                    <div className="border border-dashed flex justify-center items-center w-full aspect-video relative">
                    <button className="absolute right-5 top-5 cursor-pointer bg-red-500 text-white p-3 rounded-full"><Trash2 /></button>
                    <div><CirclePlus /></div>
                    </div>
                </div>
            </div>

        </div>
    )
}