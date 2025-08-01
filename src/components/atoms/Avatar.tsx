import React from "react";
import { cn } from "../../libs/util";

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-lg",
};

const Avatar = ({
  src,
  alt = "Avatar",
  fallback,
  className,
  size = "md",
}: AvatarProps) => {
  return (
    <div
      className={cn(
        "relative rounded-full overflow-hidden bg-gray-200 flex items-center justify-center text-gray-600 font-medium",
        sizes[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="object-cover w-full h-full"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ) : (
        fallback ?? <span>{alt.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

export default Avatar;
