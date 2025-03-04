"use client";
import { useState, createRef, useRef } from 'react';
import { CirclePlus, Download, Trash2, X } from "lucide-react";
import Image from "next/image";
import html2pdf from 'html2pdf.js';

export default function Home() {
    const contentRef = useRef<HTMLDivElement>(null);
    // Client information states
    const [clientName, setClientName] = useState<string>("Cliente");
    const [logoUrl, setLogoUrl] = useState<string>("/logo.png");
    const [backgroundUrl, setBackgroundUrl] = useState<string>("/bggrid.png");
    const logoInputRef = createRef<HTMLInputElement>();
    const backgroundInputRef = createRef<HTMLInputElement>();

    // For mobile previews
    const [mobileInputRefs, setMobileInputRefs] = useState<React.RefObject<HTMLInputElement | null>[]>([createRef<HTMLInputElement | null>()]);
    const [mobilePreviews, setMobilePreviews] = useState<(string | null)[]>([null]);
    
    // For desktop previews
    const [desktopInputRefs, setDesktopInputRefs] = useState<React.RefObject<HTMLInputElement | null>[]>([createRef<HTMLInputElement | null>()]);
    const [desktopPreviews, setDesktopPreviews] = useState<(string | null)[]>([null]);
    
    // Function to add a new mobile preview box
    const addMobilePreview = () => {
        setMobileInputRefs([...mobileInputRefs, createRef<HTMLInputElement>()]);
        setMobilePreviews([...mobilePreviews, null]);
    };
    
    // Function to remove a mobile preview box
    const removeMobilePreview = (index: number) => {
        if (mobileInputRefs.length > 1) {
            const newRefs = [...mobileInputRefs];
            const newPreviews = [...mobilePreviews];
            newRefs.splice(index, 1);
            newPreviews.splice(index, 1);
            setMobileInputRefs(newRefs);
            setMobilePreviews(newPreviews);
        }
    };
    
    const addDesktopPreview = () => {
        setDesktopInputRefs([...desktopInputRefs, createRef<HTMLInputElement>()]);
        setDesktopPreviews([...desktopPreviews, null]);
    };
    
    const removeDesktopPreview = (index: number) => {
        if (desktopInputRefs.length > 1) {
            const newRefs = [...desktopInputRefs];
            const newPreviews = [...desktopPreviews];
            newRefs.splice(index, 1);
            newPreviews.splice(index, 1);
            setDesktopInputRefs(newRefs);
            setDesktopPreviews(newPreviews);
        }
    };

    // Function to generate PDF without UI elements
    const generatePDF = () => {
        if (!contentRef.current) return;
        
        // Clone the content to avoid modifying the actual DOM
        const element = contentRef.current.cloneNode(true) as HTMLElement;
        
        // Remove all buttons
        const buttons = element.querySelectorAll('button');
        buttons.forEach(button => button.remove());
        
        // Remove background text
        const backgroundText = element.querySelector('div:has(+ div:has(button:contains("Change Background")))');
        if (backgroundText) backgroundText.remove();
        
        // Remove mobile text
        const mobileText = element.querySelector('div:has(+ div:has(button:contains("Adicionar +")))');
        if (mobileText) mobileText.remove();
        
        // Remove desktop text
        const desktopText = element.querySelector('div:has(+ div:has(button:contains("Adicionar +")))');
        if (desktopText && desktopText !== mobileText) desktopText.remove();
        
        // Remove empty preview boxes (those with CirclePlus icon)
        const emptyPreviews = element.querySelectorAll('div:has(> div > svg)');
        emptyPreviews.forEach(preview => {
            const parentElement = preview.parentElement;
            if (parentElement && parentElement.classList.contains('aspect-[9/16]') || 
                parentElement && parentElement.classList.contains('aspect-[16/9]')) {
                parentElement.remove();
            }
        });
        
        // Generate PDF
        const opt = {
            margin: 10,
            filename: `${clientName}-portfolio.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        
        html2pdf().from(element).set(opt).save();
    };
    
    return (
        <div ref={contentRef} className="text-white px-4 py-3 space-y-12" style={{ backgroundImage: `url(${backgroundUrl})`, backgroundSize: 'cover' }}>
            <button 
                className="bg-white border border-black text-black p-3 rounded-full cursor-pointer bottom-0 right-10 fixed"
                onClick={() => generatePDF()}
            >
                <Download />
            </button>
            <div className="flex justify-between items-center">
                <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="font-bold bg-transparent border-none outline-none text-white text-xl"
                />
                <div className="relative cursor-pointer" onClick={() => logoInputRef.current?.click()}>
                    <Image src={logoUrl} width={50} height={50} alt="logo" className="rounded-lg" />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={logoInputRef}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setLogoUrl(URL.createObjectURL(file));
                            }
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div>Background</div>
                <div className="flex items-center gap-2">
                    <button 
                        className="bg-white text-black py-2 px-6 rounded-full cursor-pointer"
                        onClick={() => backgroundInputRef.current?.click()}
                    >
                        Change Background
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={backgroundInputRef}
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setBackgroundUrl(URL.createObjectURL(file));
                            }
                        }}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>Mobile</div>
                    <div className='flex items-center gap-2'>
                        <button 
                            className="cursor-pointer bg-neutral-500 text-white p-2 rounded-full" 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (mobileInputRefs.length > 1) {
                                    removeMobilePreview(mobileInputRefs.length - 1);
                                }
                            }}
                        >
                            <X />
                        </button>
                        <button 
                            className="bg-white text-black py-2 px-6 rounded-full cursor-pointer"
                            onClick={() => addMobilePreview()}
                        >
                            Adicionar +
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
                    {mobileInputRefs.map((inputRef, index) => (
                        <div 
                            key={`mobile-preview-${index}`}
                            className={`flex justify-center items-center w-full aspect-[9/16] min-h-32 relative bg-white/10 rounded-2xl cursor-pointer ${!mobilePreviews[index] ? 'border border-dashed' : ''}`} 
                            onClick={() => inputRef.current?.click()}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={inputRef}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const newPreviews = [...mobilePreviews];
                                        newPreviews[index] = URL.createObjectURL(file);
                                        setMobilePreviews(newPreviews);
                                    }
                                }}
                            />
                            {mobilePreviews[index] && (
                                <button 
                                    className="absolute right-5 top-5 cursor-pointer bg-red-500 text-white p-3 rounded-full" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newPreviews = [...mobilePreviews];
                                        newPreviews[index] = null;
                                        setMobilePreviews(newPreviews);
                                        if (inputRef.current) inputRef.current.value = '';
                                    }}
                                >
                                    <Trash2 />
                                </button>
                            )}
                            {mobilePreviews[index] ? (
                                <img src={mobilePreviews[index] as string} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-2xl" />
                            ) : (
                                <div><CirclePlus /></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>Desktop</div>
                    <div className='flex items-center gap-2'>
                        <button 
                            className="cursor-pointer bg-neutral-500 text-white p-2 rounded-full" 
                            onClick={(e) => {
                                e.stopPropagation();
                                if (desktopInputRefs.length > 1) {
                                    removeDesktopPreview(desktopInputRefs.length - 1);
                                }
                            }}
                        >
                            <X />
                        </button>
                        <button 
                            className="bg-white text-black py-2 px-6 rounded-full cursor-pointer"
                            onClick={() => addDesktopPreview()}
                        >
                            Adicionar +
                        </button>
                    </div>
                </div>
                <div className="gap-3 flex flex-col">
                    {desktopInputRefs.map((inputRef, index) => (
                        <div 
                            key={`desktop-preview-${index}`}
                            className={`flex justify-center items-center w-full aspect-[16/9] relative rounded-2xl bg-white/10 cursor-pointer ${!desktopPreviews[index] ? 'border border-dashed' : ''}`} 
                            onClick={() => inputRef.current?.click()}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={inputRef}
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const newPreviews = [...desktopPreviews];
                                        newPreviews[index] = URL.createObjectURL(file);
                                        setDesktopPreviews(newPreviews);
                                    }
                                }}
                            />
                            {desktopPreviews[index] && (
                                <button 
                                    className="absolute right-5 top-5 cursor-pointer bg-red-500 text-white p-3 rounded-full" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const newPreviews = [...desktopPreviews];
                                        newPreviews[index] = null;
                                        setDesktopPreviews(newPreviews);
                                        if (inputRef.current) inputRef.current.value = '';
                                    }}
                                >
                                    <Trash2 />
                                </button>
                            )}
                            {desktopPreviews[index] ? (
                                <img src={desktopPreviews[index] as string} alt={`Desktop Preview ${index}`} className="w-full h-full object-cover rounded-2xl" />
                            ) : (
                                <div><CirclePlus /></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}