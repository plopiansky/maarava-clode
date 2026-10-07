import type { APIRoute } from "astro";

export const prerender = false;

const PAGES = [
	{ path: "/", priority: "1.0" },
	{ path: "/about", priority: "0.8" },
	{ path: "/staff", priority: "0.7" },
	{ path: "/graduates", priority: "0.7" },
	{ path: "/gallery", priority: "0.6" },
	{ path: "/contact", priority: "0.8" },
	{ path: "/accessibility", priority: "0.3" },
	{ path: "/privacy", priority: "0.3" },
];

export const GET: APIRoute = ({ url }) => {
	const today = new Date().toISOString().slice(0, 10);
	const urls = PAGES.map(
		(p) => `  <url><loc>${url.origin}${p.path === "/" ? "/" : p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`,
	).join("\n");
	return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, {
		headers: { "content-type": "application/xml; charset=utf-8" },
	});
};
