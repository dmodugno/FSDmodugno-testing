export default function HeroImageSlider() {
  const baseUrl = import.meta.env.BASE_URL;
  const images = [
    `${baseUrl}animation/Frame01.png`,
    `${baseUrl}animation/Frame02.png`,
    `${baseUrl}animation/Frame03.png`,
    `${baseUrl}animation/Frame04.png`,
    `${baseUrl}animation/Frame05.png`,
    `${baseUrl}animation/Frame06.png`,
    `${baseUrl}animation/Frame07.png`,
    `${baseUrl}animation/Frame08.png`
  ];

  const totalDuration = images.length * 5; // 40 seconds total
  const frameDuration = 100 / images.length; // 12.5% per frame

  return (
    <>
      <style>{`
        @keyframes heroFadeInOut {
          0% { opacity: 0; }
          ${frameDuration * 0.5}% { opacity: 1; }
          ${frameDuration}% { opacity: 1; }
          ${frameDuration * 1.5}% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Animation frame ${index + 1}`}
            className="absolute right-0 top-0 h-full w-auto object-contain"
            style={{
              animation: `heroFadeInOut ${totalDuration}s infinite`,
              animationDelay: `${index * 5}s`,
              opacity: index === 0 ? 1 : 0
            }}
          />
        ))}
      </div>
    </>
  );
}
