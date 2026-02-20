'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        <Image
          src={images[activeImage]}
          alt={title}
          fill
          className="object-contain p-4"
          priority
        />
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
              activeImage === index ? 'border-primary-500' : 'border-transparent hover:border-gray-200'
            } bg-gray-50`}
          >
            <Image
              src={image}
              alt={`${title} thumbnail ${index + 1}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
