// app/[lang]/ielts-course/page.tsx
"use client";

import { fetchProductData } from "@/utils/api";
import VideoPlayer from "@/components/VideoPlayer";
import InstructorCard from "@/components/InstructorCard";
import Checklist from "@/components/Checklist";
import FeatureCard from "@/components/FeatureCard";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

interface PageProps {
  params: {
    lang: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  const { lang } = params;
  const [productData, setProductData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchProductData(lang);
        setProductData(data);
      } catch (err) {
        console.error("Failed to load product data:", err);
        setError("Failed to load course data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lang]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">{error}</h1>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Course not available
          </h1>
          <p className="mt-2">The requested course could not be found</p>
        </div>
      </div>
    );
  }

  // Extract data
  const trailer = productData.media?.find(
    (m: any) => m?.resource_type === "video"
  );
  const videoId = trailer?.resource_value || null;

  const instructorsSection = productData.sections?.find(
    (s: any) => s?.type === "instructors"
  );
  const instructors = instructorsSection?.values || [];

  const featuresSection = productData.sections?.find(
    (s: any) => s?.type === "features"
  );
  const features = featuresSection?.values || [];

  const pointersSection = productData.sections?.find(
    (s: any) => s?.type === "pointers"
  );
  const pointers = pointersSection?.values || [];

  const featureExplanationsSection = productData.sections?.find(
    (s: any) => s?.type === "feature_explanations"
  );
  const featureExplanations = featureExplanationsSection?.values || [];

  const aboutSection = productData.sections?.find(
    (s: any) => s?.type === "about"
  );
  const aboutContent = aboutSection?.values || [];

  const checklistItems = productData.checklist || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Description */}
            <section className=" rounded-xl shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {productData.title || "IELTS Course"}
              </h1>
              {productData.description && (
                <div
                  className="prose text-gray-700"
                  dangerouslySetInnerHTML={{ __html: productData.description }}
                />
              )}
            </section>

            {/* Instructors */}
            {instructors.length > 0 && (
              <section className="rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {instructorsSection?.name || "Course Instructors"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {instructors.map((instructor: any, index: number) => (
                    <InstructorCard key={index} instructor={instructor} />
                  ))}
                </div>
              </section>
            )}

            {/* How the Course is Laid Out (Features) */}
            {features.length > 0 && (
              <section className="bg-[#111827] rounded-xl p-6">
                <h2 className="text-2xl font-bold  mb-6">
                  {featuresSection?.name || "How the Course is Laid Out"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {features.map((feature: any, index: number) => (
                    <FeatureCard key={index} feature={feature} />
                  ))}
                </div>
              </section>
            )}

            {/* What You'll Learn (Pointers) */}
            {pointers.length > 0 && (
              <section className=" rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {pointersSection?.name || "What You'll Learn"}
                </h2>
                <ul className="space-y-4">
                  {pointers.map((pointer: any, index: number) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0"
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
                      <span className="text-gray-700">{pointer.text}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Course Exclusive Features */}
            {featureExplanations.length > 0 && (
              <section className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {featureExplanationsSection?.name ||
                    "Course Exclusive Features"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featureExplanations.map((feature: any, index: number) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-6">
                      <h3 className="font-bold text-lg text-blue-800 mb-3">
                        {feature.title}
                      </h3>
                      <ul className="space-y-2">
                        {feature.checklist?.map((item: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
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
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Course Details (About) */}
            {aboutContent.length > 0 && (
              <section className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {aboutSection?.name || "Course Details"}
                </h2>
                <div className="prose max-w-none">
                  {aboutContent.map((item: any, index: number) => (
                    <div key={index} className="mb-8">
                      {item.title && (
                        <h3
                          className="text-xl font-semibold mb-4 text-gray-800"
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      )}
                      {item.description && (
                        <div
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - 1/3 width on large screens */}
          <div className="space-y-6">
            {/* Trailer */}
            {videoId && (
              <div className="bg-white rounded-xl shadow-md p-6  top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Course Trailer
                </h2>
                <VideoPlayer videoId={videoId} />
              </div>
            )}

            {/* CTA */}
            <div className=" p-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">৳3850</h2>

              <button className="w-full bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                {productData.cta_text?.name || "Enroll Now"} - ৳1000
              </button>
            </div>

            {/* Checklist */}
            {checklistItems.length > 0 && (
              <div className="bg-white rounded-xl shadow-md p-6 top-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {lang === "bn" ? "এই কোর্সে যা থাকছে" : "What You'll Get"}
                </h2>
                <Checklist items={checklistItems} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
