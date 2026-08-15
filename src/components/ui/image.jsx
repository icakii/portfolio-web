import React from "react";

export function Image({ src, alt, className, fittingType, ...props }) {
  return <img src={src} alt={alt} className={className} loading="lazy" {...props} />;
}
