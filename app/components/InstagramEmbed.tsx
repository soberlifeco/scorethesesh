"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

const EMBED_SCRIPT_ID = "instagram-embed-script";

export default function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    function process() {
      window.instgrm?.Embeds.process();
    }

    if (window.instgrm) {
      process();
      return;
    }

    const existing = document.getElementById(EMBED_SCRIPT_ID);
    if (existing) {
      existing.addEventListener("load", process);
      return () => existing.removeEventListener("load", process);
    }

    const script = document.createElement("script");
    script.id = EMBED_SCRIPT_ID;
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = process;
    document.body.appendChild(script);
  }, [url]);

  return (
    <div className="w-full flex justify-center overflow-hidden rounded-xl">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{ background: "#000", border: 0, margin: 0, width: "100%", maxWidth: 540 }}
      >
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-white/50 text-xs py-6"
        >
          Loading video…
        </a>
      </blockquote>
    </div>
  );
}
