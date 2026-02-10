"use client";

import { Image as ImageKitImage, ImageKitProvider } from "@imagekit/next";
import { ImgHTMLAttributes } from "react";
import Image from "next/image";

interface IKImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt"
> {
  path?: string;
  src?: string;
  urlEndpoint?: string;
  alt?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  transformation?: any[];
}

const urlEndpoint =
  process.env.NEXT_PUBLIC_URL_ENDPOINT || "https://ik.imagekit.io/codernandan";

export default function IKImage({
  path,
  src,
  urlEndpoint: propUrlEndpoint,
  alt,
  width,
  height,
  className,
  loading,
  transformation = [],
  ...props
}: IKImageProps) {
  // If a full URL is provided in src or path that is NOT an ImageKit URL,
  // we should handle it gracefully, possibly using standard img tag if it's external.

  const imageSrc = path || src || "";
  const isExternal =
    imageSrc.startsWith("http") && !imageSrc.includes("ik.imagekit.io");

  if (isExternal) {
    return (
      <img
        src={imageSrc}
        alt={alt || ""}
        width={width}
        height={height}
        className={className}
        loading={loading}
        {...props}
      />
    );
  }

  const IKImageComponent = ImageKitImage as any;

  // Construct transformation array safely
  const activeTransformation = [...transformation];
  if (width || height) {
    activeTransformation.push({ width, height });
  }

  // If it's an ImageKit URL or relative path
  return (
    <ImageKitProvider urlEndpoint={propUrlEndpoint || urlEndpoint}>
      {imageSrc.startsWith("http") ? (
        <IKImageComponent
          src={imageSrc}
          alt={alt || ""}
          width={width}
          height={height}
          className={className}
          loading={loading}
          transformation={
            activeTransformation.length > 0 ? activeTransformation : undefined
          }
          {...props}
        />
      ) : (
        <IKImageComponent
          path={imageSrc}
          alt={alt || ""}
          width={width}
          height={height}
          className={className}
          loading={loading}
          transformation={
            activeTransformation.length > 0 ? activeTransformation : undefined
          }
          {...props}
        />
      )}
    </ImageKitProvider>
  );
}
