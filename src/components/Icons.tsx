import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, className, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    ...props,
  };
}

export function IconHome(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

export function IconKey(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="8" cy="15" r="4" />
      <path d="M11.5 12.5 20 4" />
      <path d="M16 5.5 18.5 8" />
      <path d="M18 3.5 20.5 6" />
    </svg>
  );
}

export function IconGift(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="8" width="18" height="13" rx="1" />
      <path d="M12 8v13" />
      <path d="M3 12h18" />
      <path d="M12 8c-2-3.5-6-3-6-1s2.5 2.5 6 1Z" />
      <path d="M12 8c2-3.5 6-3 6-1s-2.5 2.5-6 1Z" />
    </svg>
  );
}

export function IconSign(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="4" y="4" width="16" height="12" rx="1" />
      <path d="M12 16v4" />
      <path d="M8 20h8" />
      <path d="M7 9h10" />
      <path d="M7 12h6" />
    </svg>
  );
}

export function IconTree(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 20v-4" />
      <path d="M8 20h8" />
      <path d="M12 4 6 12h3l-3 5h12l-3-5h3L12 4Z" />
    </svg>
  );
}

export function IconHeart(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
    </svg>
  );
}

export function IconTag(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M20 12 12 4H5v7l8 8 7-7Z" />
      <circle cx="8.5" cy="8.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconBox(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 8.5 12 4l9 4.5-9 4.5L3 8.5Z" />
      <path d="M3 8.5V16l9 4.5 9-4.5V8.5" />
      <path d="M12 13v7.5" />
    </svg>
  );
}

export function IconPaw(p: IconProps) {
  return (
    <svg {...base(p)}>
      <ellipse cx="12" cy="16" rx="4" ry="3" />
      <circle cx="7" cy="10" r="1.6" />
      <circle cx="17" cy="10" r="1.6" />
      <circle cx="9.5" cy="7" r="1.4" />
      <circle cx="14.5" cy="7" r="1.4" />
    </svg>
  );
}

export function IconSpark(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="m6 6 2.5 2.5" />
      <path d="m15.5 15.5 2.5 2.5" />
      <path d="m18 6-2.5 2.5" />
      <path d="m8.5 15.5-2.5 2.5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconCart(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 5h2l1.5 11h9L19 8H7" />
      <circle cx="10" cy="19" r="1.2" />
      <circle cx="16" cy="19" r="1.2" />
    </svg>
  );
}

export function IconMenu(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function IconDiamond(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 3 4 9l8 12 8-12-8-6Z" />
      <path d="M4 9h16" />
      <path d="m8 9 4 12 4-12" />
    </svg>
  );
}

export function IconTruck(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7v-7Z" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

export function IconGear(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </svg>
  );
}

export function IconUsers(p: IconProps) {
  return (
    <svg {...base(p)}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19c0-3 2.5-5 6-5s6 2 6 5" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M21 19c0-2.5-1.5-4-4-4" />
    </svg>
  );
}

export function IconInstagram(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconFacebook(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M14 9h3V6h-3c-2.2 0-3 1.3-3 3v2H9v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z" />
    </svg>
  );
}

export function IconTikTok(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M14 4c.5 2.5 2.2 4 4.5 4.2V11c-1.7 0-3.2-.6-4.5-1.6V16a5 5 0 1 1-5-5c.3 0 .7 0 1 .1V14a2 2 0 1 0 2 2V4h1.5Z" />
    </svg>
  );
}

export function IconMail(p: IconProps) {
  return (
    <svg {...base(p)}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

export function IconPhone(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M7 3h4l1 4-2.5 1.5a12 12 0 0 0 5.5 5.5L17 12l4 1v4a2 2 0 0 1-2 2A15 15 0 0 1 5 5a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export function IconMapPin(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconCheck(p: IconProps) {
  return (
    <svg {...base(p)}>
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

const iconMap = {
  home: IconHome,
  key: IconKey,
  gift: IconGift,
  sign: IconSign,
  tree: IconTree,
  heart: IconHeart,
  tag: IconTag,
  box: IconBox,
  paw: IconPaw,
  spark: IconSpark,
} as const;

export function ProductIcon({
  name,
  ...props
}: IconProps & { name: string }) {
  const Comp = iconMap[name as keyof typeof iconMap] || IconSpark;
  return <Comp {...props} />;
}
