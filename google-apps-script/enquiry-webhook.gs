/**
 * KQUEL enquiry webhook
 * ---------------------
 * Appends each enquiry to the sheet and emails an alert.
 *
 * SETUP
 * 1. Open the Google Sheet that should hold the enquiries.
 * 2. Extensions → Apps Script, and paste this file over Code.gs.
 * 3. Project Settings → set the timezone to Asia/Kolkata so the dates read
 *    in local time.
 * 4. Fill in ALERT_TO below, and put a long random string in SHARED_TOKEN
 *    (the same value goes into ENQUIRY_WEBHOOK_TOKEN on Vercel).
 * 5. Deploy → New deployment → Web app.
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    "Anyone" is what lets the site POST without a Google login — which is
 *    exactly why the token check below matters. Without it, anyone who
 *    learned the URL could write rows.
 * 6. Copy the deployment URL into ENQUIRY_WEBHOOK_URL on Vercel.
 *
 * Re-deploy (Manage deployments → edit → Version: New version) after any
 * edit, or the live URL keeps running the old code.
 */

const SHARED_TOKEN = "PASTE_A_LONG_RANDOM_STRING_HERE";
const ALERT_TO = "you@example.com";
const SHEET_NAME = "Enquiries";

/**
 * Leave blank when this script lives inside the sheet
 * (Extensions → Apps Script).
 *
 * If you created a STANDALONE script instead (script.google.com → New
 * project), paste the sheet's ID here — it's the long code in the sheet URL:
 * docs.google.com/spreadsheets/d/THIS_PART/edit
 */
const SHEET_ID = "";
const HEADERS = [
  "Date",
  "Name",
  "Email",
  "Phone",
  "Collection",
  "Piece",
  "Message",
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json({ ok: false, error: "empty request" });
    }

    const body = JSON.parse(e.postData.contents);

    if (body.token !== SHARED_TOKEN) {
      return json({ ok: false, error: "unauthorised" });
    }

    appendRow(body);
    sendAlert(body);

    return json({ ok: true });
  } catch (err) {
    /* Surfaces in Executions in the Apps Script console. */
    console.error(err);
    return json({ ok: false, error: String(err) });
  }
}

function appendRow(body) {
  const doc = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  let sheet = doc.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = doc.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(),
    body.name || "",
    body.email || "",
    body.phone || "",
    body.collection || "",
    body.product || "—",
    body.message || "",
  ]);
}

function sendAlert(body) {
  const piece = body.product ? `\nPiece:       ${body.product}` : "";

  MailApp.sendEmail({
    to: ALERT_TO,
    /* Replying in the inbox goes straight back to the enquirer. */
    replyTo: body.email,
    subject: `New enquiry — ${body.name}${
      body.collection ? " · " + body.collection : ""
    }`,
    body: [
      `Name:        ${body.name}`,
      `Email:       ${body.email}`,
      `Phone:       ${body.phone}`,
      `Collection:  ${body.collection}${piece}`,
      "",
      "Message",
      "-------",
      body.message,
      "",
      `Received ${new Date().toLocaleString("en-IN")}`,
    ].join("\n"),
  });
}

function json(payload) {
  return ContentService.createTextOutput(
    JSON.stringify(payload)
  ).setMimeType(ContentService.MimeType.JSON);
}
