'use client';
import Script from 'next/script';

export default function ChatbotEmbed() {
  return (
    <>
      {/* ✅ Sets chatbot ID and enables reset on page load */}
      <Script
        id="chatbase-config"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.chatbaseConfig = {
              chatbotId: "mZD2-2tfSnr43v5AYA6uJ",
              resetChatOnLoad: true
            };
          `,
        }}
      />

      {/* ✅ Loads the Chatbase embed script */}
      <Script
        id="chatbase-advanced"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(){
            if (!window.chatbase || window.chatbase("getState") !== "initialized") {
              window.chatbase = (...args) => {
                if (!window.chatbase.q) window.chatbase.q = [];
                window.chatbase.q.push(args);
              };
              window.chatbase = new Proxy(window.chatbase, {
                get(target, prop) {
                  if (prop === "q") return target.q;
                  return (...args) => target(prop, ...args);
                }
              });
            }

            const onLoad = function () {
              const script = document.createElement("script");
              script.src = "https://www.chatbase.co/embed.min.js";
              script.id = "mZD2-2tfSnr43v5AYA6uJ";
              script.domain = "www.chatbase.co";
              document.body.appendChild(script);
            };

            if (document.readyState === "complete") {
              onLoad();
            } else {
              window.addEventListener("load", onLoad);
            }
          })();`,
        }}
      />
    </>
  );
}
