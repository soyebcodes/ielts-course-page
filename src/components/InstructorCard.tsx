// components/InstructorCard.tsx
import { Instructor } from "@/types/apiTypes";
import Image from "next/image";

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <div className="bg-white flex items-center rounded-lg shadow-md">
      <div>
        <Image
          src={instructor.image}
          alt={instructor.name}
          className="rounded-4xl"
          width={100}
          height={100}
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg">{instructor.name}</h3>
        <p className="text-gray-600 text-sm">
          {instructor.short_description || instructor.title}
        </p>
        {instructor.description && (
          <div
            className="mt-2 text-gray-700"
            dangerouslySetInnerHTML={{ __html: instructor.description }}
          />
        )}
      </div>
    </div>
  );
}
