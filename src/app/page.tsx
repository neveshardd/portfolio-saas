import Image from "next/image";

export default function Home() {
    return (
        <div className="text-white px-4 py-3 space-y-12">
            <div className="flex justify-between items-center">
                <div className="font-bold">Cliente</div>
                <Image src="/logo.png" width={50} height={50} alt="logo" />
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>Mobile</div>
                    <button className="bg-white text-black py-2 px-6 rounded-full">Adicionar +</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="border border-dashed flex justify-center items-center w-42 h-64">+</div>
                    <div className="border border-dashed flex justify-center items-center w-42 h-64">+</div>
                    <div className="border border-dashed flex justify-center items-center w-42 h-64">+</div>
                    <div className="border border-dashed flex justify-center items-center w-42 h-64">+</div>
                    <div className="border border-dashed flex justify-center items-center w-42 h-64">+</div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>Desktop</div>
                    <button className="bg-white text-black py-2 px-6 rounded-full">Adicionar +</button>
                </div>
                <div className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="border flex justify-center items-center w-full h-48">+</div>
                    <div className="border flex justify-center items-center w-full h-48">+</div>
                    <div className="border flex justify-center items-center w-full h-48">+</div>
                </div>
            </div>

        </div>
    )
}