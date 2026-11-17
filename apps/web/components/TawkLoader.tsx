"use client";

import { useEffect } from "react";

/**
 * Loads the real Tawk.to embed for the iNexConnect property. The IDs are
 * public values from the Tawk.to dashboard (visible in any page source);
 * the NEXT_PUBLIC_TAWK_* env vars can override them per environment.
 */
export default function TawkLoader() {
  const propertyId =
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? "6afcd9c1607ad63ccac4ab1a";
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? "1k7lr56vn";

  useEffect(() => {
    if (!propertyId || !widgetId) return;
    if (document.getElementById("tawk-embed")) return;

    const script = document.createElement("script");
    script.id = "tawk-embed";
    script.async = true;
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);
  }, [propertyId, widgetId]);

  return null;
}
