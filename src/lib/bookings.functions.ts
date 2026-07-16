import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SPREADSHEET_ID = "19KfpalS06OenAo4b-_MqgKR2Z5be1APvu_nv9oMa7Wo";
const RANGE = "Sheet1!A:G";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets";

const bookingSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(4).max(20),
  city: z.string().trim().min(1).max(100),
  flavor: z.string().trim().min(1).max(60),
  position: z.number().int().nonnegative().max(100000).nullable(),
});

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!lovableKey || !sheetsKey) throw new Error("Google Sheets not configured");

    const row = [
      new Date().toISOString(),
      data.name,
      data.email,
      data.phone,
      data.city,
      data.flavor,
      data.position ?? "",
    ];

    const url = `${GATEWAY}/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": sheetsKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`Sheets append failed [${res.status}]: ${text}`);
      throw new Error("Could not save booking");
    }
    return { ok: true as const };
  });
