import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImg: string;
  afterImg: string;
  labelBefore?: string;
  labelAfter?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ 
  beforeImg, 
  afterImg, 
  labelBefore = "Antes", 
  labelAfter = "Depois" 
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e 
      ? e.touches[0].clientX - containerRect.left 
      : (e as MouseEvent).clientX - containerRect.left;
    
    let percent = (x / containerRect.width) * 100;
    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;
    
    setSliderPos(percent);
  };

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchmove', handleMove);
    window.removeEventListener('touchend', handleMouseUp);
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden rounded-lg shadow-2xl cursor-col-resize select-none border-2 border-white/10"
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After image (Background) */}
      <img 
        src={afterImg} 
        alt="Depois" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden border-r border-white/20"
        style={{ width: `${sliderPos}%` }}
      >
        <img 
          src={beforeImg} 
          alt="Antes" 
          className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50 brightness-90"
          style={{ width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%' }}
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 z-20 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] flex items-center justify-center"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center -translate-x-1/2">
          <div className="flex gap-1">
            <div className="w-0.5 h-3 bg-gray-400"></div>
            <div className="w-0.5 h-3 bg-gray-400"></div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="absolute top-4 left-4 z-30 pointer-events-none">
        <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest border border-white/20">
          {labelBefore}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-30 pointer-events-none">
        <span className="bg-brand-gold text-brand-navy-900 text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
          {labelAfter}
        </span>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
