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

    // Fire-and-forget email notification (do not fail booking if email fails)
    try {
      const gmailKey = process.env.GOOGLE_MAIL_API_KEY;
      if (gmailKey) {
        const notifyTo = "sarvesh260207@gmail.com";
        const timestamp = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        });
        const subject = `🚀 PusclePRO · New Founding-500 preorder from ${data.name}`;

        const textBody = [
          `PusclePRO — New Preorder Received`,
          `====================================`,
          ``,
          `A new customer just reserved a founding pack.`,
          ``,
          `— Customer details —`,
          `Name       : ${data.name}`,
          `Email      : ${data.email}`,
          `Phone      : ${data.phone}`,
          `City       : ${data.city}`,
          `Flavour    : ${data.flavor}`,
          `Spot #     : ${data.position ?? "N/A"}`,
          `Reserved at: ${timestamp} IST`,
          ``,
          `— PusclePRO Founding 500`,
        ].join("\r\n");

        const htmlBody = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f2ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f2ec;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <tr><td style="background:linear-gradient(135deg,#3d2b56 0%,#6d4c8f 100%);padding:32px 32px 28px;color:#f5f2ec;">
          <div style="font-size:11px;letter-spacing:0.24em;text-transform:uppercase;opacity:0.85;">PusclePRO · Founding 500</div>
          <h1 style="margin:12px 0 6px;font-size:26px;line-height:1.2;font-weight:600;">New preorder received</h1>
          <p style="margin:0;opacity:0.9;font-size:14px;">${data.name} just locked spot #${data.position ?? "—"}.</p>
        </td></tr>
        <tr><td style="padding:28px 32px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;">
            ${[
              ["Name", data.name],
              ["Email", `<a href="mailto:${data.email}" style="color:#6d4c8f;text-decoration:none;">${data.email}</a>`],
              ["Phone", `<a href="tel:${data.phone}" style="color:#6d4c8f;text-decoration:none;">${data.phone}</a>`],
              ["City", data.city],
              ["Flavour", data.flavor],
              ["Spot #", String(data.position ?? "N/A")],
              ["Reserved at", `${timestamp} IST`],
            ]
              .map(
                ([k, v]) =>
                  `<tr><td style="padding:10px 0;border-bottom:1px solid #eee;color:#6b6b6b;width:120px;">${k}</td><td style="padding:10px 0;border-bottom:1px solid #eee;color:#1a1a1a;font-weight:500;">${v}</td></tr>`,
              )
              .join("")}
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px 32px;color:#8a8a8a;font-size:12px;line-height:1.6;">
          Sent automatically by the PusclePRO booking system.<br/>
          Data is also appended to your Google Sheet.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

        const boundary = `pusclepro_${Date.now()}`;
        const rfc2822 = [
          `To: ${notifyTo}`,
          `Subject: ${subject}`,
          `MIME-Version: 1.0`,
          `Content-Type: multipart/alternative; boundary="${boundary}"`,
          ``,
          `--${boundary}`,
          `Content-Type: text/plain; charset="UTF-8"`,
          ``,
          textBody,
          ``,
          `--${boundary}`,
          `Content-Type: text/html; charset="UTF-8"`,
          ``,
          htmlBody,
          ``,
          `--${boundary}--`,
        ].join("\r\n");

        const raw = Buffer.from(rfc2822, "utf8")
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

        const mailRes = await fetch(
          "https://connector-gateway.lovable.dev/google_mail/gmail/v1/users/me/messages/send",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": gmailKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ raw }),
          },
        );
        if (!mailRes.ok) {
          console.error(`Gmail send failed [${mailRes.status}]: ${await mailRes.text()}`);
        }
      }
    } catch (err) {
      console.error("Email notification error:", err);
    }

    // Count real bookings (rows minus header if present)
    let count: number | null = null;
    try {
      const countUrl = `${GATEWAY}/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:A`;
      const countRes = await fetch(countUrl, {
        headers: {
          Authorization: `Bearer ${lovableKey}`,
          "X-Connection-Api-Key": sheetsKey,
        },
      });
      if (countRes.ok) {
        const body = (await countRes.json()) as { values?: string[][] };
        count = body.values?.length ?? null;
      }
    } catch (err) {
      console.error("Count read error:", err);
    }

    return { ok: true as const, count };
  });

export const getBookingCount = createServerFn({ method: "GET" }).handler(async () => {
  const lovableKey = process.env.LOVABLE_API_KEY;
  const sheetsKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovableKey || !sheetsKey) return { count: 0 };

  const url = `${GATEWAY}/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!A:A`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      "X-Connection-Api-Key": sheetsKey,
    },
  });
  if (!res.ok) {
    console.error(`Sheets read failed [${res.status}]: ${await res.text()}`);
    return { count: 0 };
  }
  const body = (await res.json()) as { values?: string[][] };
  return { count: body.values?.length ?? 0 };
});


