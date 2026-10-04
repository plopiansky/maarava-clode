import { getEmDashCollection } from "emdash";

export interface Img { src: string; alt?: string }

export function imgOf(v: unknown): Img | null {
	if (!v || typeof v !== "object") return null;
	const o = v as Record<string, unknown>;
	const src = (o.src ?? o.url) as string | undefined;
	return src ? { src, alt: (o.alt as string) ?? "" } : null;
}

/** Escape HTML then turn **bold** into <b>. Blank line = new paragraph. */
export function paragraphs(text: string | null | undefined): string[] {
	return (text ?? "")
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter(Boolean)
		.map((p) =>
			p
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"),
		);
}

export async function loadSite() {
	const [secs, its] = await Promise.all([getEmDashCollection("sections"), getEmDashCollection("items")]);
	const sec: Record<string, any> = {};
	for (const e of secs.entries) sec[e.id] = e.data;
	const items = its.entries
		.map((e: any) => e.data)
		.sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
	const kind = (k: string) => items.filter((i: any) => i.kind === k);
	return { sec, kind };
}
