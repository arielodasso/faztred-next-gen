import { useEffect } from "react";

interface HeadOptions {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  keywords?: string;
  robots?: string;
  jsonLd?: Array<Record<string, unknown>>;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

function setMetaName(name: string, content: string | undefined) {
  if (content === undefined) return;
  upsertMeta(`meta[name="${name}"]`, { name, content });
}

function setMetaProp(property: string, content: string | undefined) {
  if (content === undefined) return;
  upsertMeta(`meta[property="${property}"]`, { property, content });
}

function setCanonical(href: string | undefined) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

let jsonLdNodes: HTMLScriptElement[] = [];

export function useDocumentHead(opts: HeadOptions) {
  // Snapshot a stable signature so we don't loop on object identity changes
  const sig = JSON.stringify(opts);
  useEffect(() => {
    const o = JSON.parse(sig) as HeadOptions;
    if (o.title) document.title = o.title;
    setMetaName("description", o.description);
    setMetaName("keywords", o.keywords);
    setMetaName("robots", o.robots);
    setMetaProp("og:title", o.ogTitle ?? o.title);
    setMetaProp("og:description", o.ogDescription ?? o.description);
    setMetaProp("og:url", o.ogUrl);
    setMetaProp("og:type", o.ogType);
    setMetaProp("og:image", o.ogImage);
    setMetaName("twitter:card", o.twitterCard);
    setMetaName("twitter:title", o.twitterTitle ?? o.ogTitle ?? o.title);
    setMetaName("twitter:description", o.twitterDescription ?? o.ogDescription ?? o.description);
    setCanonical(o.canonical);

    // Replace JSON-LD scripts for this page
    for (const n of jsonLdNodes) n.remove();
    jsonLdNodes = [];
    for (const blob of o.jsonLd ?? []) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(blob);
      s.setAttribute("data-page-jsonld", "true");
      document.head.appendChild(s);
      jsonLdNodes.push(s);
    }
    return () => {
      for (const n of jsonLdNodes) n.remove();
      jsonLdNodes = [];
    };
  }, [sig]);
}
