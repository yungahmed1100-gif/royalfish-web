import { useEffect, useState } from "react";

const collageImages = [
  "0c074de430e80dd1113271a9f909a467.png",
  "0db7387fccce4fcedf94175381e44fdf.png",
  "0e203a77590859ef4b608726b7368df7.png",
  "0f325563e8f3c9471c8f3889460c3269.png",
  "111eb56ce1afcc7d74b5188451d9c69e.png",
  "142935ddd46a6be1fabe854f10923a18.png",
  "15d676458c83ce405da11ca689e9a078.png",
  "17d600fdffc108f6adaa2e0179351e82.png",
  "194c26d17e4c8d6d721c180b1539c986.png",
  "1999340dd8b2177ac8f3e3baefc32d4d.png",
  "1b04d323c85f9f3de9f6455a9739aa4c.png",
  "1e0e4f64310d1100749694dfd8f9bff0.png",
  "1e63b507c6067200a57e6e29f2afe7ce.png",
  "20c50f7aec5e1307dca25a48411be907.png",
  "28aae55a4e19dd036934a842279f960d.png",
  "2a9c4ac47bc25d25bee67ba5deb8339c.png",
  "2d2a64a1072bdeedde0e8f4b253a0e30.png",
  "34407ad9f70ffbb14a465db5a96cb455.png",
  "36d2e9b3e2aa6564fe16348c0dd65b41.png",
  "36fffef3e0e5eaed17f8ce9e88c611c7.png",
  "3800394b698b3556fff38a885dbd4eee.png",
  "3ce1f9f3f70e51d1c37b19a90af2b5ab.png",
  "3d1a017c5faffe6ee1df740d3448f461.png",
  "3dd897e3ec03d668e03d040528576d22.png",
  "3e2c98978714daf59417a7f55ed74dda.png",
  "42daf4a7ab52558fb9553c97595d4008.png",
  "430335f40a8945be159e684798223c27.png",
  "4894ea8261739b88876ff9567e27cb3b.png",
  "512f205cfab69acf4c7a8e791adf95e0.png",
  "53eabd5b68d1a4708a9f7c43553e063f.png",
  "54ae7b6533144502cf8c9e2928f99cd8.png",
  "583c1e7bd9c52d1922928c850f3cec64.png",
  "5e0229136733e86c0528b991221ca93a.png",
  "60055db2d268aa20deef14881feae797.png",
  "69316cac8a0ba6070298f9815ca4ceba.png",
  "6baa3f939874f53f321c01e93ac9587b.png",
  "704cef496891e6628c04083b53575e73.png",
  "74d75e0f830939134ae3013eb95e220f.png",
  "7602a4e62b9322c50752e44e69985691.png",
  "7f45e3453c501f6dfdfa8be5fdbf262d.png",
  "7fcb340d13d199349a9bfb497c03efbd.png",
  "8749eec091c30f65dae7b98e266a35e7.png",
  "880ece16e37f05f27d91404ae22f633c.png",
  "885e6a68cf58ec46c1375f44526dd0b6.png",
  "92ab696fd9e619965eaa9f023a3d4e1b.png",
  "a1bd2472d492ee933eb10718dcff7e8e.png",
  "a2d2262c33d57c7184324af0eb07f389.png",
  "b84e75183df3602071b6bd7f01d2644c.png",
  "b9238234c67b18845f466b4a1ee2b901.png",
  "bb594d49cc226f2f68d2a6c7945e128c.png",
  "ca6d5c89f748f298ab9ac441cbe438a4.png",
  "ca91c6374ddbb678d8beedbce3065d9f.png",
  "cada554fbec261041aab10599ebdf2ea.png",
  "cd128d2bd47367aabed80d7a99b8056c.png",
  "cfe60920728d52ccb956baf9df99e16a.png",
  "d269b7da9aaee7ea7342cc55a8032500.png",
  "d6de090a78abacdc1a83301fa2f2f6d6.png",
  "dc678108ec7a155a51eb7b8c670e3380.png",
  "e14ce066eaf5b3b871a5c5b1843a6230.png",
  "e2322f8bfe49fa2c57fbd6788da5abe8.png",
  "e69e58b40f12460c4302b233794e51d3.png",
  "ec3def9f63cc1315edab00acce2897b4.png",
  "ee42e2c08607c01860424a33043fd7a1.png",
  "fe4efa95f4b812c46ff68a1f19a6c2a6.png",
];

const chunks = [
  collageImages.slice(0, 9),    // Hero
  collageImages.slice(9, 18),   // About
  collageImages.slice(18, 27),  // Rotterdam
  collageImages.slice(27, 36),  // Menu
  collageImages.slice(36, 45),  // Gallery
  collageImages.slice(45, 54),  // Reviews
  collageImages.slice(54, 64)   // Contact
];

interface CollageItem {
  id: string;
  src: string;
  top: string;
  left: string;
  width: string;
  rotation: number;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
}

export default function SectionCollage({ chunkIndex, limit }: { chunkIndex: number; limit?: number }) {
  const [items, setItems] = useState<CollageItem[]>([]);

  useEffect(() => {
    let images = chunks[chunkIndex % chunks.length];
    if (limit) {
      images = images.slice(0, limit);
    }
    
    const newItems = images.map((src, i) => {
      // Use globalIndex to seed different pseudo-random values for rotation/sizing
      const globalIndex = chunkIndex * 10 + i * 3.14;
      const random1 = Math.sin(globalIndex * 1.1) * 0.5 + 0.5;
      const random2 = Math.cos(globalIndex * 1.3) * 0.5 + 0.5;
      const random3 = Math.sin(globalIndex * 1.7) * 0.5 + 0.5;

      // Distribute evenly vertically to prevent overlap
      // e.g., if 9 items, they get placed at ~10%, 20%, 30%, 40%... top down.
      const verticalSegment = 100 / images.length;
      const topOffset = verticalSegment * i;
      
      // Alternate left and right sides to frame the content
      const isLeftSide = i % 2 === 0;
      
      // Left side: 0% to 15%. Right side: 75% to 90%.
      const horizontalBase = isLeftSide ? 0 : 75;
      const leftOffset = horizontalBase + (random2 * 15);

      // Sizes range from 100px to 220px to keep them tasteful and avoid crowding
      const width = Math.floor(random3 * 120) + 100;
      
      return {
        id: src,
        src: `/assets/collage/${src}`,
        top: `${topOffset + (random1 * (verticalSegment * 0.6))}%`, // Spread out with slight randomness
        left: `${leftOffset}%`,
        width: `${width}px`, 
        rotation: Math.floor((random1 - 0.5) * 50), // Subtle rotation (-25 to 25 deg)
        opacity: random2 * 0.3 + 0.5, // 0.5 to 0.8 opacity for a sophisticated wash
        animationDuration: `${Math.floor(random1 * 15) + 20}s`,
        animationDelay: `-${Math.floor(random3 * 30)}s`,
      };
    });

    setItems(newItems);
  }, [chunkIndex]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <img
          key={item.id}
          src={item.src}
          alt="Nautical Collage"
          className="absolute object-contain mix-blend-multiply"
          style={{
            top: item.top,
            left: item.left,
            width: item.width,
            transform: `rotate(${item.rotation}deg)`,
            opacity: item.opacity,
            animation: `float ${item.animationDuration} ease-in-out infinite`,
            animationDelay: item.animationDelay,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
