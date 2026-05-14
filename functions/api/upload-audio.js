const PUBLIC_BASE_URL = "https://pub-5389c605b3bf46fea66c1657cc99e91d.r2.dev";

const mimeExtensions = {
  "audio/mpeg": "mp3",
  "audio/mp3": "mp3",
  "audio/wav": "wav",
  "audio/x-wav": "wav",
  "audio/mp4": "m4a",
  "audio/aac": "aac",
  "audio/ogg": "ogg",
  "audio/flac": "flac",
};

function json(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function slugify(value, fallback = "item") {
  const slug = `${value || ""}`
    .trim()
    .toLowerCase()
    .replace(/[\\/]+/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || fallback;
}

function publicUrl(key) {
  return `${PUBLIC_BASE_URL}/${key.split("/").map(encodeURIComponent).join("/")}`;
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function onRequestPost({ request, env }) {
  try {
    if (!env.CHIPS_MEDIA) return json({ error: "R2 binding CHIPS_MEDIA is not configured." }, 500);

    const form = await request.formData();
    const file = form.get("audio_file");
    if (!file || typeof file === "string") return json({ error: "audio_file is required." }, 400);
    if (!file.type.startsWith("audio/")) return json({ error: "Only audio files are allowed." }, 400);

    const actorName = `${form.get("actor_name") || ""}`.trim();
    const actorId = slugify(form.get("actor_id") || actorName, "actor");
    const sampleTitle = `${form.get("sample_title") || ""}`.trim();
    if (!actorName || !sampleTitle) return json({ error: "actor_name and sample_title are required." }, 400);

    const sampleId = slugify(form.get("sample_id") || `${actorId}-${sampleTitle}`, "sample");
    const extension = mimeExtensions[file.type] || file.name.split(".").pop() || "mp3";
    const r2Key = `${form.get("r2_key") || `audio/${actorId}/${sampleId}.${extension}`}`.replace(/^\/+/, "");

    await env.CHIPS_MEDIA.put(r2Key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type || "audio/mpeg" },
      customMetadata: {
        actorName,
        actorId,
        sampleTitle,
        categories: `${form.get("categories_json") || "{}"}`,
      },
    });

    const r2Url = publicUrl(r2Key);
    const metadata = {
      kind: "audio",
      actorName,
      actorId,
      sampleTitle,
      sampleId,
      categories: JSON.parse(`${form.get("categories_json") || "{}"}`),
      notes: `${form.get("notes") || ""}`,
      r2Key,
      r2Url,
      audioType: file.type || "audio/mpeg",
      originalFileName: file.name,
      uploadedAt: new Date().toISOString(),
    };
    const metadataKey = `submissions/audio/${actorId}/${sampleId}.json`;
    await env.CHIPS_MEDIA.put(metadataKey, JSON.stringify(metadata, null, 2), {
      httpMetadata: { contentType: "application/json; charset=utf-8" },
    });

    return json({
      ok: true,
      r2Key,
      r2Url,
      metadataKey,
      sheetRow: {
        actor_name: actorName,
        sample_title: sampleTitle,
        category: Object.values(metadata.categories).flat().join(", "),
        google_drive_link: "",
        published: "true",
        notes: metadata.notes,
        generated_id: sampleId,
        actor_id: actorId,
        r2_url: r2Url,
        audio_type: metadata.audioType,
        r2_key: r2Key,
        sync_status: "uploaded",
        synced_at: metadata.uploadedAt,
        error_message: "",
      },
    });
  } catch (error) {
    return json({ error: error.message || "Upload failed." }, 500);
  }
}
