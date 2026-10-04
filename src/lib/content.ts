import { getEmDashCollection } from "emdash";
import seed from "../../seed/seed.json";

export interface Img { src: string; alt?: string; width?: number; height?: number }

/** Resolve an EmDash image field value (local media stores only a storage key) to a URL. */
export function imgOf(v: unknown): Img | null {
	if (!v || typeof v !== "object") return null;
	const o = v as Record<string, any>;
	const key = o.meta?.storageKey as string | undefined;
	const src = (o.src ?? o.url ?? o.previewUrl ?? (key ? `/_emdash/api/media/file/${key}` : undefined)) as string | undefined;
	return src ? { src, alt: o.alt ?? "", width: o.width, height: o.height } : null;
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

async function all(collection: string): Promise<any[]> {
	const out: any[] = [];
	let cursor: string | undefined;
	for (let page = 0; page < 20; page++) {
		const r: any = await getEmDashCollection(collection, { limit: 100, cursor } as any);
		out.push(...r.entries.map((e: any) => ({ ...e.data, _slug: e.id })));
		cursor = r.nextCursor;
		if (!cursor) break;
	}
	return out.sort((a, b) => (a.order ?? 100) - (b.order ?? 100));
}

export async function loadSite() {
	const sc = (seed as any).content as Record<string, any[]>;
	const SECTION_COLLECTIONS = ["home_sections", "about_sections", "staff_sections", "gallery_sections"];
	const seedSections = SECTION_COLLECTIONS.flatMap((k) => sc[k] ?? []);
	const [homeSecs, aboutSecs, staffSecs, galSecs, general, pillars, tracks, schedule, features, graduates, bagrut, values, staff, gallery] = await Promise.all(
		["home_sections", "about_sections", "staff_sections", "gallery_sections", "general", "pillars", "tracks", "schedule", "approach_features", "graduates", "bagrut_points", "values", "staff", "gallery"].map(all),
	);
	// Section defaults come from the seed so a page never renders empty; anything saved in the CMS wins.
	const sec: Record<string, any> = {};
	for (const e of seedSections) sec[e.slug] = e.data;
	for (const e of [...homeSecs, ...aboutSecs, ...staffSecs, ...galSecs]) sec[e._slug] = e;
	const g = general.find((e) => e._slug === "settings") ?? {};
	const d = sc.general[0].data;
	const site = {
		registerUrl: g.register_url || d.register_url,
		phone: g.phone || d.phone,
		email: g.email || d.email,
		location: g.location || d.location,
		phoneHref: "tel:" + String(g.phone || d.phone).replace(/[^0-9+]/g, ""),
	};
	const lists: Record<string, any[]> = {
		pillar: pillars,
		track: tracks,
		"schedule-morning": schedule.filter((s) => s.period === "morning"),
		"schedule-noon": schedule.filter((s) => s.period === "noon"),
		"schedule-evening": schedule.filter((s) => s.period === "evening"),
		"approach-feature": features,
		graduate: graduates,
		"bagrut-point": bagrut,
		value: values,
		"staff-management": staff.filter((s) => s.group === "management"),
		"staff-rabbi": staff.filter((s) => s.group !== "management"),
		gallery,
	};
	const kind = (k: string) => lists[k] ?? [];
	return { sec, kind, site };
}
