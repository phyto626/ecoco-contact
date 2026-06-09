const SHEETS = {
  leads: "leads",
  content: "content",
  cases: "cases"
};

const LEAD_HEADERS = [
  "id",
  "timestamp",
  "applicant_type",
  "contact_name",
  "phone",
  "email",
  "venue_name",
  "city",
  "address",
  "machine_type",
  "placement_location",
  "has_power_outlet",
  "additional_notes",
  "available_time",
  "status"
];

const CONTENT_HEADERS = ["key", "value", "updated_at"];
const CONTENT_FIELDS = [
  ["hero_title", "heroTitle"],
  ["hero_subtitle", "heroSubtitle"],
  ["hero_image_url", "heroImageUrl"],
  ["hero_stat_number", "heroStatNumber"],
  ["hero_stat_label", "heroStatLabel"],
  ["cases_title", "casesTitle"],
  ["cases_subtitle", "casesSubtitle"],
  ["apply_title", "applyTitle"],
  ["apply_subtitle", "applySubtitle"],
  ["footer_text", "footerText"],
  ["form_applicant_type_options", "formApplicantTypeOptions"],
  ["form_machine_type_options", "formMachineTypeOptions"],
  ["form_placement_location_options", "formPlacementLocationOptions"],
  ["form_power_outlet_options", "formPowerOutletOptions"],
  ["form_available_time_options", "formAvailableTimeOptions"]
];

const EXCEL_CONTENT_ROWS = [
  ["hero_title", "把 ECOCO 智慧回收機帶進你的永續新生活"],
  ["hero_subtitle", "回收集點打造綠色循環經濟，一邊玩一邊救地球！"],
  ["hero_image_url", "https://0cggvek50hlogaxg.public.blob.vercel-storage.com/ecoco/1779931869343-HERO-F2Af7hS5tjbigpTs2YYziS8435S9wT.jpg"],
  ["hero_stat_number", "1200+"],
  ["hero_stat_label", "全台營運站點"],
  ["cases_title", "讓循環回收成為場域日常"],
  ["cases_subtitle", "不論企業大樓、社區空間還是店家商場，現在申請設置，E起+1"],
  ["apply_title", "申請設置 ECOCO 智慧回收機"],
  ["apply_subtitle", "完成表單後，我們會依照場域條件與需求，由專人安排後續聯繫與評估。"],
  ["footer_text", "2026 ECOCO 智慧回收機申請設置服務"],
  ["form_applicant_type_options", "企業,社區大樓,學校,商場零售,政府機關,個人"],
  ["form_machine_type_options", "智慧收瓶機,二代智慧電池機,智慧整合機(同時收瓶罐+電池)"],
  ["form_placement_location_options", "室內,半戶外,戶外,尚未確定"],
  ["form_power_outlet_options", "有,無,需協助確認"],
  ["form_available_time_options", "平日上午,平日下午,平日晚上,假日,不限"]
];

const CASE_HEADERS = [
  "id",
  "title",
  "description",
  "category",
  "image_url",
  "is_public",
  "sort_order",
  "badge_tone",
  "metric_value",
  "metric_label",
  "metric_icon",
  "testimonial"
];

const EXCEL_CASE_ROWS = [
  [
    "case-retail",
    "企業大樓｜中華電信永和服務中心站",
    "企業將日常回收轉化為可追蹤的永續行動，同時增進員工福利，以落實ESG。",
    "智慧整合機",
    "https://0cggvek50hlogaxg.public.blob.vercel-storage.com/ecoco/1779939340657-%E4%B8%AD%E8%8F%AF%E9%9B%BB%E4%BF%A1_%E4%BF%AE-YIP1nRhsGEaGlbOtciwJfdgZ2nxGKL.jpg",
    true,
    1,
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "case-office",
    "店家門市｜ECOCO崇學總站",
    "附近上班族或住戶順路經過就會使用，同時為門市帶來人潮。",
    "二代智慧電池機",
    "https://0cggvek50hlogaxg.public.blob.vercel-storage.com/ecoco/%E4%BA%8C%E4%BB%A3%E9%9B%BB%E6%B1%A0%E6%A9%9F-%E7%B8%BD%E9%83%A8.jpg",
    true,
    2,
    "",
    "",
    "",
    "",
    ""
  ],
  [
    "case-community",
    "社區｜臺南金華里活動中心站",
    "民眾可以不用等待清潔隊，使用回收機可以24小時自助回收，社區環境更乾淨。",
    "智慧整合機",
    "https://0cggvek50hlogaxg.public.blob.vercel-storage.com/ecoco/1779940107724-LINE_ALBUM_%E9%87%91%E8%8F%AF%E9%87%8C%E5%AE%A3%E5%82%B3%E6%B4%BB%E5%8B%95_260129_15-BdQYG5zOWI0RRvW89D2Wp8nLFt3AAB.jpg",
    true,
    3,
    "",
    "",
    "",
    "",
    ""
  ]
];

function doPost(e) {
  try {
    const body = JSON.parse((e.postData && e.postData.contents) || "{}");
    verifySecret_(body.secret);
    ensureSetup_();

    const handlers = {
      getLeads: () => getLeads_(),
      addLead: () => addLead_(body.lead || {}),
      updateLeadStatus: () => updateLeadStatus_(body.id, body.status),
      getContent: () => getContent_(),
      saveContent: () => saveContent_(body.content || {}),
      getCases: () => getCases_(),
      saveCases: () => saveCases_(body.cases || []),
      ensureSetup: () => ({ ready: true })
    };

    if (!handlers[body.action]) {
      throw new Error("Unknown action: " + body.action);
    }

    return json_({ ok: true, data: handlers[body.action]() });
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function doGet() {
  try {
    ensureSetup_();
    return json_({ ok: true, data: { ready: true } });
  } catch (error) {
    return json_({ ok: false, error: String(error && error.message ? error.message : error) });
  }
}

function getSpreadsheet_() {
  const sheetId = PropertiesService.getScriptProperties().getProperty("SHEET_ID");
  if (sheetId) {
    return SpreadsheetApp.openById(sheetId);
  }

  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (activeSpreadsheet) {
    return activeSpreadsheet;
  }

  throw new Error("Spreadsheet not found. Add SHEET_ID in Script properties or create Apps Script from Extensions -> Apps Script inside the Google Sheet.");
}

function verifySecret_(incomingSecret) {
  const expectedSecret = PropertiesService.getScriptProperties().getProperty("APP_SECRET");
  if (expectedSecret && incomingSecret !== expectedSecret) {
    throw new Error("Unauthorized");
  }
}

function ensureSetup_() {
  const ss = getSpreadsheet_();
  ensureSheet_(ss, SHEETS.leads, LEAD_HEADERS);
  ensureSheet_(ss, SHEETS.content, CONTENT_HEADERS);
  ensureSheet_(ss, SHEETS.cases, CASE_HEADERS);
  seedContent_(ss.getSheetByName(SHEETS.content));
  seedCases_(ss.getSheetByName(SHEETS.cases));
}

function ensureSheet_(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  const existingColumnCount = Math.max(sheet.getLastColumn(), headers.length);
  const existingHeaders = sheet.getRange(1, 1, 1, existingColumnCount).getValues()[0];
  const needsHeaders = existingHeaders.every((value) => value === "");
  if (needsHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  } else {
    headers.forEach((header) => {
      if (existingHeaders.indexOf(header) === -1) {
        sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header);
      }
    });
  }

  return sheet;
}

function seedContent_(sheet) {
  if (sheet.getLastRow() > 1) return;
  const now = new Date().toISOString();
  sheet.getRange(2, 1, EXCEL_CONTENT_ROWS.length, CONTENT_HEADERS.length).setValues(
    EXCEL_CONTENT_ROWS.map((row) => [row[0], row[1], now])
  );
}

function seedCases_(sheet) {
  if (sheet.getLastRow() > 1) return;
  sheet.getRange(2, 1, EXCEL_CASE_ROWS.length, CASE_HEADERS.length).setValues(EXCEL_CASE_ROWS);
}

function getLeads_() {
  const rows = getRows_(SHEETS.leads);
  return rows.map((row) => ({
    id: row[0] || "",
    timestamp: row[1] || "",
    applicantType: row[2] || "",
    contactName: row[3] || "",
    phone: row[4] || "",
    email: row[5] || "",
    venueName: row[6] || "",
    city: row[7] || "",
    address: row[8] || "",
    machineType: row[9] || "",
    placementLocation: row[10] || "",
    hasPowerOutlet: row[11] || "",
    additionalNotes: row[12] || "",
    availableTime: row[13] ? String(row[13]).split(",").map((item) => item.trim()) : [],
    status: row[14] || "pending"
  }));
}

function addLead_(lead) {
  const sheet = getSpreadsheet_().getSheetByName(SHEETS.leads);
  const id = "L-" + String(Math.max(0, sheet.getLastRow() - 1) + 1).padStart(3, "0");
  const row = [
    id,
    new Date().toISOString(),
    lead.applicantType || "",
    lead.contactName || "",
    lead.phone || "",
    lead.email || "",
    lead.venueName || "",
    lead.city || "",
    lead.address || "",
    lead.machineType || "",
    lead.placementLocation || "",
    lead.hasPowerOutlet || "",
    lead.additionalNotes || "",
    Array.isArray(lead.availableTime) ? lead.availableTime.join(", ") : "",
    "pending"
  ];
  sheet.appendRow(row);
  return getLeads_().find((item) => item.id === id);
}

function updateLeadStatus_(id, status) {
  const sheet = getSpreadsheet_().getSheetByName(SHEETS.leads);
  const values = sheet.getDataRange().getValues();
  for (let index = 1; index < values.length; index++) {
    if (values[index][0] === id) {
      sheet.getRange(index + 1, 15).setValue(status);
      return getLeads_().find((item) => item.id === id);
    }
  }
  return null;
}

function getContent_() {
  const rows = getRows_(SHEETS.content);
  const content = getEmptyContent_();
  const fieldMap = getContentFieldMap_();

  rows.forEach((row) => {
    const fieldName = fieldMap[row[0]];
    if (fieldName) {
      content[fieldName] = row[1] || "";
    }
  });

  return content;
}

function saveContent_(content) {
  const sheet = getSpreadsheet_().getSheetByName(SHEETS.content);
  const now = new Date().toISOString();
  const rows = CONTENT_FIELDS.map(([sheetKey, fieldName]) => [sheetKey, content[fieldName] || "", now]);

  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, CONTENT_HEADERS.length).clearContent();
  }
  sheet.getRange(2, 1, rows.length, CONTENT_HEADERS.length).setValues(rows);

  return getContent_();
}

function getCases_() {
  const rows = getRows_(SHEETS.cases);
  return rows
    .map((row) => ({
      id: row[0] || "",
      title: row[1] || "",
      description: row[2] || "",
      category: row[3] || "",
      imageUrl: row[4] || "",
      isPublic: row[5] === true || row[5] === 1 || String(row[5]).toLowerCase() === "true",
      sortOrder: Number(row[6] || 0),
      badgeTone: row[7] === "secondary" ? "secondary" : "primary",
      metricValue: row[8] || "",
      metricLabel: row[9] || "",
      metricIcon: row[10] || "",
      testimonial: row[11] || ""
    }))
    .filter((item) => item.id || item.title || item.description || item.imageUrl)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

function saveCases_(cases) {
  const sheet = getSpreadsheet_().getSheetByName(SHEETS.cases);
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 1, sheet.getLastRow() - 1, CASE_HEADERS.length).clearContent();
  }
  if (Array.isArray(cases) && cases.length) {
    sheet.getRange(2, 1, cases.length, CASE_HEADERS.length).setValues(
      cases.map((item) => [
        item.id || "",
        item.title || "",
        item.description || "",
        item.category || "",
        item.imageUrl || "",
        Boolean(item.isPublic),
        Number(item.sortOrder || 0),
        item.badgeTone === "secondary" ? "secondary" : "primary",
        item.metricValue || "",
        item.metricLabel || "",
        item.metricIcon || "",
        item.testimonial || ""
      ])
    );
  }
  return getCases_();
}

function getRows_(sheetName) {
  const sheet = getSpreadsheet_().getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() <= 1) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
}

function getContentFieldMap_() {
  return CONTENT_FIELDS.reduce((map, item) => {
    map[item[0]] = item[1];
    return map;
  }, {});
}

function getEmptyContent_() {
  return CONTENT_FIELDS.reduce((content, item) => {
    content[item[1]] = "";
    return content;
  }, {});
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(ContentService.MimeType.JSON);
}
