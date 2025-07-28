// components/Checklist.tsx
import { Checklist as ChecklistItem } from "@/types/apiTypes";
import Image from "next/image";

interface ChecklistProps {
  items: ChecklistItem[];
}

export default function Checklist({ items }: ChecklistProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.id || index} className="flex items-start">
          {item.icon ? (
            <Image
              src={item.icon}
              alt=""
              className="h-6 w-6 mt-0.5 mr-3 flex-shrink-0"
              width={24}
              height={24}
            />
          ) : (
            <svg
              className="h-6 w-6 text-green-500 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          <p className="text-gray-700">{item.text}</p>
        </div>
      ))}
    </div>
  );
}
