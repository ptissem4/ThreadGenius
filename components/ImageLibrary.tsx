
import React from 'react';
import { VIRAL_IMAGES } from '../constants';

interface ImageLibraryProps {
  selectedImage: string | null;
  onSelectImage: (image: string | null) => void;
}

export const ImageLibrary: React.FC<ImageLibraryProps> = ({ selectedImage, onSelectImage }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-200 mb-4">Viral Image Library</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {VIRAL_IMAGES.map((img) => (
          <div
            key={img}
            onClick={() => onSelectImage(selectedImage === img ? null : img)}
            className={`relative rounded-lg overflow-hidden cursor-pointer aspect-square border-2 transition-all ${
              selectedImage === img ? 'border-purple-500' : 'border-transparent hover:border-gray-500'
            }`}
          >
            <img src={img} alt="Viral" className="w-full h-full object-cover" />
            {selectedImage === img && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
