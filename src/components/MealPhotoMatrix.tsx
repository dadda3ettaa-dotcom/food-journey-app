import React from 'react';
import { MealMatrixItem } from '../data/mealMatrixData';
import { Check, Heart } from 'lucide-react';
import { playSelectSound } from '../utils/audio';

interface MealPhotoMatrixProps {
  items: MealMatrixItem[];
  selectedItemId?: string;
  onSelectItem: (item: MealMatrixItem) => void;
  momentId: number;
}

export const MealPhotoMatrix: React.FC<MealPhotoMatrixProps> = ({
  items,
  selectedItemId,
  onSelectItem,
  momentId
}) => {
  const handleSelect = (item: MealMatrixItem) => {
    playSelectSound();
    onSelectItem(item);
  };

  return (
    <div className="w-full space-y-2 animate-fade-in">
      <div className="flex items-center justify-between text-xs font-semibold text-stone-500 px-1">
        <span>Foto-Raster (Instagram Grid):</span>
        <span className="text-[11px] text-orange-600 font-bold">Wähle 1 Bild</span>
      </div>

      {/* 3x3 Instagram Grid Layout */}
      <div
        id={`meal-matrix-grid-${momentId}`}
        className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 bg-stone-100/70 rounded-3xl border border-stone-200/80 shadow-inner"
        role="radiogroup"
        aria-label="Gerichte-Matrix"
      >
        {items.map((item, index) => {
          const isSelected = selectedItemId === item.id;

          return (
            <button
              key={item.id}
              id={`meal-matrix-item-${momentId}-${index + 1}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={`Option ${index + 1}`}
              onClick={() => handleSelect(item)}
              className={`group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none ${
                isSelected
                  ? 'ring-4 ring-orange-500 shadow-lg scale-[1.03] z-10'
                  : 'hover:scale-[1.01] hover:shadow-xs border border-white/60'
              }`}
            >
              {/* Dish Photo */}
              <img
                src={item.imageUrl}
                alt=""
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isSelected ? 'scale-110' : 'group-hover:scale-105'
                }`}
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay when selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/30 via-transparent to-transparent pointer-events-none" />
              )}

              {/* Instagram Style Selection Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-600 text-white flex items-center justify-center shadow-md animate-scale-in">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};


