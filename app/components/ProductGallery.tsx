'use client';

import { useState } from 'react';

interface ProductGalleryProps {
    images: { url: string }[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    // Se não tiver imagens, usa placeholder
    const safeImages = images.length > 0
        ? images
        : [{ url: 'https://via.placeholder.com/600x600?text=Sem+Foto' }];

    const [selectedImage, setSelectedImage] = useState(safeImages[0].url);

    return (
        <div className="flex flex-col gap-4">
            {/* Imagem Principal */}
            <div className="relative w-full aspect-square md:aspect-[4/3] bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
                <img
                    src={selectedImage}
                    alt={productName}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Miniaturas */}
            {safeImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {safeImages.map((img, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(img.url)}
                            className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${selectedImage === img.url ? 'border-yellow-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img
                                src={img.url}
                                alt={`${productName} view ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
