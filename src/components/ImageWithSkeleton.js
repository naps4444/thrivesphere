"use client";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

export default function ImageWithSkeleton({ src, alt, width, height, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {/* Skeleton Placeholder */}
      {!loaded && (
        <div
          style={{ width, height }}
          className="bg-gray-300 animate-pulse rounded-md mb-2"
        />
      )}

      {/* Actual Image */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(
          className,
          "transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0 absolute"
        )}
        onLoadingComplete={() => setLoaded(true)}
      />
    </div>
  );
}
