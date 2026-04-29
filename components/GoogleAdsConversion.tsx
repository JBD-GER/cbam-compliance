"use client";

import { useEffect } from "react";

type WindowWithGtag = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

type GoogleAdsConversionProps = {
  sendTo: string;
};

export function GoogleAdsConversion({ sendTo }: GoogleAdsConversionProps) {
  useEffect(() => {
    const win = window as WindowWithGtag;
    win.dataLayer = win.dataLayer ?? [];
    win.gtag =
      win.gtag ??
      function gtagFallback(...args: unknown[]) {
        win.dataLayer?.push(args);
      };

    if (sendTo) {
      win.gtag("event", "conversion", { send_to: sendTo });
      return;
    }

    win.dataLayer.push({ event: "cbam_lead_confirmation" });
  }, [sendTo]);

  return null;
}
