import Image from 'next/image';

const images = [
  { src: '/home/levenvale-bello-beef-logo.png', alt: 'Bello Beef', width: 519, height: 80 },
  { src: '/home/levenvale-the-patch-organics-logo.png', alt: 'The Patch Organics', width: 360, height: 80 },
];

// Repeat enough times so one "half" comfortably fills any viewport
const repeatedImages = Array(8).fill(images).flat();

export default function ImageMarquee() {
  return (
    <div className="overflow-hidden bg-white py-6">
      <div className="flex w-max items-center animate-marquee md:animate-marquee-slow will-change-transform">
        {[...repeatedImages, ...repeatedImages].map((img, i) => (
          <div key={i} className="flex-shrink-0 mx-12">
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="h-16 w-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
