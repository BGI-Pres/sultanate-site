"use client";

import Script from "next/script";

const DEFAULT_CLARITY_ID = "wyg6xcuyog";

export default function MicrosoftClarity() {
  const id = process.env.NEXT_PUBLIC_CLARITY_ID || DEFAULT_CLARITY_ID;
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${id}");
      `}
    </Script>
  );
}
