// components/FeatureCard.tsx
import { Feature } from "@/types/apiTypes"; // We'll define this type next
import Image from "next/image";

export default function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-md p-6 h-[180px]">
      {feature.icon && (
        <Image
          src={feature.icon}
          alt={feature.title}
          className="mb-4"
          width={48}
          height={48}
        />
      )}
      <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.subtitle}</p>
    </div>
  );
}
