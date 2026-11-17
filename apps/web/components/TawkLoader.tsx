"use client";

import { useEffect } from "react";

/**
 * Loads the real Tawk.to embed — only when a property and widget ID are
 * configured. With no IDs set this renders nothing: no fake chat UI,
 * no fake "online" state. IDs are public values from the Tawk.to dashboard.
 */
export default function TawkLoader() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

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
