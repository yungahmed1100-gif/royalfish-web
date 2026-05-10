/**
 * HeroCollage — 6 curated nautical art pieces scattered elegantly around the
 * Hero section. Each piece has a hand-tuned position, size, rotation and
 * animation phase so they feel intentional rather than generated.
 *
 * Layout intent:
 *   – Hero text sits in the LEFT half (0 → ~55% width).
 *   – Pieces cluster in the RIGHT half and the four corner zones.
 *   – No two pieces overlap meaningfully.
 *   – mix-blend-multiply lets them absorb the cream/wash background.
 */

const heroItems = [
  // Bottom-left, bleeds off screen edge, large
  {
    src: "/assets/collage/42daf4a7ab52558fb9553c97595d4008.png",
    top: "72%",
    left: "-4%",
    width: "240px",
    rotation: -14,
    opacity: 0.65,
    animDuration: "24s",
    animDelay: "0s",
  },
  // Bottom centre-left, medium
  {
    src: "/assets/collage/d6de090a78abacdc1a83301fa2f2f6d6.png",
    top: "80%",
    left: "18%",
    width: "180px",
    rotation: 10,
    opacity: 0.55,
    animDuration: "28s",
    animDelay: "-7s",
  },
  // Bottom centre, small accent, high opacity
  {
    src: "/assets/collage/3e2c98978714daf59417a7f55ed74dda.png",
    top: "75%",
    left: "40%",
    width: "150px",
    rotation: -8,
    opacity: 0.60,
    animDuration: "22s",
    animDelay: "-14s",
  },
  // Bottom centre-right, medium
  {
    src: "/assets/collage/cfe60920728d52ccb956baf9df99e16a.png",
    top: "82%",
    left: "58%",
    width: "190px",
    rotation: 16,
    opacity: 0.50,
    animDuration: "26s",
    animDelay: "-5s",
  },
  // Bottom-right, large, bleeds off right edge
  {
    src: "/assets/collage/0e203a77590859ef4b608726b7368df7.png",
    top: "70%",
    left: "78%",
    width: "230px",
    rotation: -20,
    opacity: 0.58,
    animDuration: "30s",
    animDelay: "-20s",
  },
  // Far bottom-right corner, overlapping the edge
  {
    src: "/assets/collage/74d75e0f830939134ae3013eb95e220f.png",
    top: "85%",
    left: "90%",
    width: "180px",
    rotation: 6,
    opacity: 0.45,
    animDuration: "20s",
    animDelay: "-10s",
  },
];

export default function HeroCollage() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {heroItems.map((item, i) => (
        <img
          key={i}
          src={item.src}
          alt=""
          className="absolute object-contain mix-blend-multiply"
          style={{
            top: item.top,
            left: item.left,
            width: item.width,
            transform: `rotate(${item.rotation}deg)`,
            opacity: item.opacity,
            animation: `float ${item.animDuration} ease-in-out infinite`,
            animationDelay: item.animDelay,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}
