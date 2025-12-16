import { useState, useEffect, useRef } from 'react';

export default function RecordCollections({ country, collections }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  const updateButtons = () => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    
    setCanScrollLeft(track.scrollLeft > 0);
    const maxScroll = track.scrollWidth - track.clientWidth - 2;
    setCanScrollRight(track.scrollLeft < maxScroll);
    
    const overflow = track.scrollWidth > track.clientWidth + 2;
    setShowArrows(overflow);
  };

  useEffect(() => {
    updateButtons();
    window.addEventListener('resize', updateButtons);
    return () => window.removeEventListener('resize', updateButtons);
  }, [collections]);

  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = 0;
      updateButtons();
    }
  }, [country]);

  const scroll = (direction) => {
    if (!trackRef.current) return;
    const step = Math.min(trackRef.current.clientWidth, 320);
    trackRef.current.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth'
    });
    setTimeout(updateButtons, 300);
  };

  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <>
      <div id="featured-records" className="text-lg font-semibold text-teal-800 mt-8 mb-4">
        Featured Record Collections
        <p className="text-base font-normal text-gray-700 mt-1">
          Explore these historical document collections and see what you can find:
        </p>
      </div>

      <div className="relative">
        <div 
          ref={trackRef}
          className="flex flex-nowrap gap-6 lg:gap-8 xl:gap-10 overflow-x-auto scroll-smooth px-12 hide-scrollbar"
          onScroll={updateButtons}
          style={{ scrollPaddingLeft: '3rem', scrollPaddingRight: '3rem' }}
        >
          {collections.map((item, index) => (
            <div 
              key={index}
              className="min-w-[270px] max-w-[300px] flex-none bg-white rounded-xl border border-gray-200 p-4 flex flex-col"
              tabIndex={0}
            >
              <div className="card-title font-semibold text-gray-900 mb-2">{item.title}</div>
              <div className="card-desc text-sm text-gray-700">{item.desc}</div>
              {item.description && <div className="text-xs text-gray-600 mt-1 flex-1">{item.description}</div>}
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="card-link text-teal-700 mt-3 hover:underline">Explore &rarr;</a>
            </div>
          ))}
        </div>

        {showArrows && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-colors z-10"
              disabled={!canScrollLeft}
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
                <path d="M15 6l-6 6 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-colors z-10"
              disabled={!canScrollRight}
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="w-5 h-5">
                <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>
    </>
  );
}
