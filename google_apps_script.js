/**
 * Google Apps Script backend for LifeInvader EN3 Advertisement Editor
 * 
 * Instructions:
 * 1. Go to Google Drive (https://drive.google.com/)
 * 2. Click "+ New" -> "More" -> "Google Apps Script" (or go to https://script.google.com/)
 * 3. Delete any default code and paste this entire code.
 * 4. Verify that the FOLDER_ID below matches your target folder: "1FmlgmnWwVDt6AShp_KnCWb8gyg-lh3U9"
 * 5. CRITICAL STEP TO FIX 100% ERROR RATE:
 *    - In the top toolbar of the editor, select "testEmailAndDrive" from the function dropdown.
 *    - Click the "Run" button.
 *    - An "Authorization Required" dialog will pop up. Click "Review Permissions".
 *    - Choose your Google Account.
 *    - Click "Advanced" (bottom left) -> "Go to Untitled project / LifeInvader Backend (unsafe)".
 *    - Click "Allow".
 *    - Check the execution log at the bottom to ensure both Email and Drive tests succeeded!
 * 6. Click "Deploy" (top right) -> "New deployment"
 * 7. Click the gear icon next to "Select type" and choose "Web app"
 * 8. Configure:
 *    - Description: LifeInvader Backend
 *    - Execute as: Me (your Gmail account)
 *    - Who has access: Anyone
 * 9. Click "Deploy" (or "New deployment" if updating). Copy the generated Web App URL.
 * 10. Paste this URL into the settings in your website editor.
 */

const ADMIN_EMAIL = "curiocityinternational@gmail.com";
const GOOGLE_DRIVE_FOLDER_ID = "1FmlgmnWwVDt6AShp_KnCWb8gyg-lh3U9";
const APPROVE_SALT = "DopamineLifeInvader2026!NewApprovalKey_Revoked_2026_05_24";

function generateApprovalSignature(server, id, clientUuid) {
  const data = `${server.toLowerCase().trim()}:${id.toString().trim()}:${(clientUuid || "").toString().trim()}:${APPROVE_SALT}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < data.length; i++) {
    hash ^= data.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return (hash >>> 0).toString(16).toUpperCase().substring(0, 6);
}

/**
 * Run this function manually in the Google Apps Script editor to authorize Gmail & Drive APIs!
 */
function testEmailAndDrive() {
  Logger.log("Testing MailApp authorization...");
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: "[LifeInvader] API Authorization Test",
    body: "Gmail API authorization is successful!"
  });
  Logger.log("Gmail test email sent successfully.");
  
  Logger.log("Testing Google Drive folder access...");
  try {
    const folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
    Logger.log("Google Drive test successful! Connected to folder: " + folder.getName());
  } catch (err) {
    Logger.log("Error connecting to Drive folder: " + err.toString());
    throw new Error("Could not find the Google Drive folder. Please double-check GOOGLE_DRIVE_FOLDER_ID.");
  }

  Logger.log("Testing Google Sheets access...");
  try {
    const tempSs = SpreadsheetApp.create("LifeInvader_Auth_Test_Temp");
    const tempFile = DriveApp.getFileById(tempSs.getId());
    tempFile.setTrashed(true); // clean up the test spreadsheet
    Logger.log("Google Sheets test successful! Authorized to use SpreadsheetApp.");
  } catch (err) {
    Logger.log("Error testing Sheets: " + err.toString());
    throw new Error("Could not authorize Google Sheets. Please grant the requested permissions.");
  }
}

function doPost(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  
  try {
    let payload;
    
    // Fail-safe payload parsing
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        payload = e.parameter;
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    } else {
      payload = {};
    }
    
    const action = payload.action;
    
    if (action === "access_request") {
      return handleAccessRequest(payload, headers);
    } else if (action === "check_access") {
      return handleCheckAccess(payload, headers);
    } else if (action === "get_access_requests") {
      return handleGetAccessRequests(payload, headers);
    } else if (action === "approve_access_request") {
      return handleApproveAccessRequest(payload, headers);
    } else if (action === "reject_access_request") {
      return handleRejectAccessRequest(payload, headers);
    } else if (action === "validate_key") {
      return handleValidateKey(payload, headers);
    } else if (action === "bug_report") {
      return handleBugReport(payload, headers);
    } else if (action === "log_ad") {
      return handleLogAd(payload, headers);
    } else if (action === "get_custom_data") {
      return handleGetCustomData(headers);
    } else if (action === "save_custom_data") {
      return handleSaveCustomData(payload, headers);
    } else if (action === "get_history") {
      return handleGetHistory(payload, headers);
    } else {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        message: "Invalid or missing action type."
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "An error occurred processing your request."
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*"
  };
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "LifeInvader Google Apps Script backend is active."
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

function doOptions(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

const ADMIN_PASSCODE = "DopamineAdmin2026!";

function getOrCreateAccessRequestsSheet() {
  const ss = getOrCreateHistorySpreadsheet();
  let sheet = ss.getSheetByName("Access_Requests");
  if (!sheet) {
    sheet = ss.insertSheet("Access_Requests");
    sheet.appendRow(["Timestamp", "First Name", "Last Name", "In-Game ID", "UUID", "Status"]);
  }
  return sheet;
}

function handleAccessRequest(data, headers) {
  const firstname = data.firstname || "";
  const lastname = data.lastname || "";
  const id = data.id || "";
  const clientUuid = data.clientUuid || "";
  const timestamp = new Date().toLocaleString();
  
  if (!clientUuid || !id) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Missing In-Game ID or Hardware ID (UUID)."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getOrCreateAccessRequestsSheet();
  const rows = sheet.getDataRange().getValues();
  let foundRowIdx = -1;
  
  // Look for existing request by clientUuid
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      foundRowIdx = i + 1; // 1-based index
      break;
    }
  }
  
  if (foundRowIdx !== -1) {
    // Update existing request status to pending
    sheet.getRange(foundRowIdx, 1).setValue(timestamp);
    sheet.getRange(foundRowIdx, 2).setValue(firstname);
    sheet.getRange(foundRowIdx, 3).setValue(lastname);
    sheet.getRange(foundRowIdx, 4).setValue(id);
    sheet.getRange(foundRowIdx, 6).setValue("pending");
  } else {
    // Append new request
    sheet.appendRow([timestamp, firstname, lastname, id, clientUuid, "pending"]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Access request submitted. Please wait for admin approval."
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleCheckAccess(data, headers) {
  const clientUuid = data.clientUuid || "";
  if (!clientUuid) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Missing client UUID."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getOrCreateAccessRequestsSheet();
  const rows = sheet.getDataRange().getValues();
  let requestStatus = "none";
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      requestStatus = rows[i][5] || "pending";
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    approved: (requestStatus === "approved"),
    requestStatus: requestStatus
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleGetAccessRequests(data, headers) {
  const passcode = data.passcode || "";
  if (passcode !== ADMIN_PASSCODE) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized access. Invalid passcode."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getOrCreateAccessRequestsSheet();
  const rows = sheet.getDataRange().getValues();
  const requests = [];
  
  for (let i = 1; i < rows.length; i++) {
    requests.push({
      timestamp: rows[i][0] ? new Date(rows[i][0]).toLocaleString() : "",
      firstname: rows[i][1] || "",
      lastname: rows[i][2] || "",
      id: rows[i][3] || "",
      clientUuid: rows[i][4] || "",
      status: rows[i][5] || "pending"
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    requests: requests.reverse()
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleApproveAccessRequest(data, headers) {
  const passcode = data.passcode || "";
  const clientUuid = data.clientUuid || "";
  
  if (passcode !== ADMIN_PASSCODE) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized access. Invalid passcode."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (!clientUuid) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Missing UUID."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getOrCreateAccessRequestsSheet();
  const rows = sheet.getDataRange().getValues();
  let updated = false;
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      sheet.getRange(i + 1, 6).setValue("approved");
      updated = true;
      break;
    }
  }
  
  if (updated) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Access request approved."
    })).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Request not found."
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleRejectAccessRequest(data, headers) {
  const passcode = data.passcode || "";
  const clientUuid = data.clientUuid || "";
  
  if (passcode !== ADMIN_PASSCODE) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized access. Invalid passcode."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  if (!clientUuid) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Missing UUID."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getOrCreateAccessRequestsSheet();
  const rows = sheet.getDataRange().getValues();
  let updated = false;
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      sheet.getRange(i + 1, 6).setValue("rejected");
      updated = true;
      break;
    }
  }
  
  if (updated) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Access request rejected."
    })).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Request not found."
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleValidateKey(data, headers) {
  const approvalKey = data.approvalKey || "";
  
  if (!approvalKey) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      valid: false,
      message: "No approval key provided."
    }))
    .setMimeType(ContentService.MimeType.JSON);
  }
  
  // Expected format: LI-APPROVED-<SERVER>-<ID>-<SIG>
  const parts = approvalKey.split('-');
  if (parts.length === 5 && parts[0] === 'LI' && parts[1] === 'APPROVED') {
    const server = parts[2];
    const id = parts[3];
    const sig = parts[4];
    const clientUuid = data.clientUuid || "";
    const expectedSig = generateApprovalSignature(server, id, clientUuid);
    
    if (sig === expectedSig) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        valid: true,
        message: "Approval key is valid."
      }))
      .setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    valid: false,
    message: "Invalid approval key."
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

function handleBugReport(data, headers) {
  function escHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  const category = escHtml(data.category || "General");
  const rawInput = escHtml(data.rawInput || "None");
  const expectedOutput = escHtml(data.expectedOutput || "None");
  const timestamp = new Date().toLocaleString();
  
  let driveFileUrl = "No screenshot uploaded";
  let attachment = null;
  
  // 1. Process screenshot if present
  if (data.screenshotBase64 && data.screenshotBase64.includes("base64,")) {
    try {
      const parts = data.screenshotBase64.split("base64,");
      const mimeType = parts[0].match(/data:(.*?);/)[1];
      const base64Data = parts[1];
      const decodedBytes = Utilities.base64Decode(base64Data);
      
      const extension = mimeType.split("/")[1] || "png";
      const fileName = `bug_report_${Date.now()}.${extension}`;
      const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
      
      // Save to Google Drive
      const folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      
      driveFileUrl = file.getUrl();
      attachment = blob;
    } catch (err) {
      driveFileUrl = `Error uploading screenshot to Drive: ${err.toString()}`;
    }
  }
  
  // 2. Prepare and send email
  const subject = `[LifeInvader Bug Report] Correction Request (${category})`;
  
  const htmlBody = `
    <h3>LifeInvader Ad Editor Bug Report / Correction Request</h3>
    <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; font-family: sans-serif; width: 100%; max-width: 600px;">
      <tr bgcolor="#f2f2f2">
        <th align="left" width="150">Field</th>
        <th align="left">Details</th>
      </tr>
      <tr>
        <td><strong>Timestamp</strong></td>
        <td>${timestamp}</td>
      </tr>
      <tr>
        <td><strong>Category</strong></td>
        <td>${category}</td>
      </tr>
      <tr>
        <td><strong>Raw Advertisement Input</strong></td>
        <td><pre style="margin: 0; white-space: pre-wrap;">${rawInput}</pre></td>
      </tr>
      <tr>
        <td><strong>Expected Output / Description</strong></td>
        <td><pre style="margin: 0; white-space: pre-wrap;">${expectedOutput}</pre></td>
      </tr>
      <tr>
        <td><strong>Google Drive Link</strong></td>
        <td><a href="${driveFileUrl.startsWith('http') ? driveFileUrl : '#'}" target="_blank">${escHtml(driveFileUrl)}</a></td>
      </tr>
    </table>
  `;
  
  const emailParams = {
    to: ADMIN_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  };
  
  if (attachment) {
    emailParams.attachments = [attachment];
  }
  
  MailApp.sendEmail(emailParams);
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Bug report sent to email and Google Drive folder successfully.",
    driveUrl: driveFileUrl
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateHistorySpreadsheet() {
  const folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
  const files = folder.getFilesByName("LifeInvader_Ad_History");
  let ss;
  if (files.hasNext()) {
    ss = SpreadsheetApp.openById(files.next().getId());
  } else {
    ss = SpreadsheetApp.create("LifeInvader_Ad_History");
    const file = DriveApp.getFileById(ss.getId());
    folder.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
    const sheet = ss.getSheets()[0];
    sheet.appendRow(["Timestamp", "First Name", "Last Name", "Server", "ID", "Raw Input", "Final Ad", "Status"]);
  }
  return ss;
}

function handleLogAd(data, headers) {
  try {
    const ss = getOrCreateHistorySpreadsheet();
    const sheet = ss.getSheets()[0];
    
    const timestamp = new Date().toLocaleString();
    const firstname = data.firstname || "";
    const lastname = data.lastname || "";
    const server = data.server || "";
    const id = data.id || "";
    const rawInput = data.rawInput || "";
    const finalAd = data.finalAd || "";
    const status = data.status || "";
    
    sheet.appendRow([timestamp, firstname, lastname, server, id, rawInput, finalAd, status]);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Ad logged successfully."
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error logging ad: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleGetHistory(data, headers) {
  try {
    const ss = getOrCreateHistorySpreadsheet();
    const sheet = ss.getSheets()[0];
    const lastRow = sheet.getLastRow();
    
    const history = [];
    if (lastRow > 1) {
      const limit = parseInt(data.limit || "50");
      const startRow = Math.max(2, lastRow - limit + 1);
      const numRows = lastRow - startRow + 1;
      
      const values = sheet.getRange(startRow, 1, numRows, 8).getValues();
      for (let i = values.length - 1; i >= 0; i--) {
        const row = values[i];
        history.push({
          timestamp: row[0] ? new Date(row[0]).toLocaleString() : "",
          firstname: row[1],
          lastname: row[2],
          server: row[3],
          id: row[4],
          rawInput: row[5],
          finalAd: row[6],
          status: row[7]
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      history: history
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error getting history: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleGetCustomData(headers) {
  try {
    const ss = getOrCreateHistorySpreadsheet();
    
    // Spelling sheet
    let spellingSheet = ss.getSheetByName("Custom_Spelling");
    if (!spellingSheet) {
      spellingSheet = ss.insertSheet("Custom_Spelling");
      spellingSheet.appendRow(["Wrong", "Right"]);
    }
    
    // Templates sheet
    let templatesSheet = ss.getSheetByName("Custom_Templates");
    if (!templatesSheet) {
      templatesSheet = ss.insertSheet("Custom_Templates");
      templatesSheet.appendRow(["Text", "Category", "Shorthand"]);
    }
    
    // Read spelling
    const spelling = {};
    const spellingRows = spellingSheet.getDataRange().getValues();
    for (let i = 1; i < spellingRows.length; i++) {
      const wrong = spellingRows[i][0];
      const right = spellingRows[i][1];
      if (wrong) {
        spelling[wrong.toString().toLowerCase().trim()] = right ? right.toString().trim() : "";
      }
    }
    
    // Read templates
    const templates = [];
    const templatesRows = templatesSheet.getDataRange().getValues();
    for (let i = 1; i < templatesRows.length; i++) {
      const text = templatesRows[i][0];
      const category = templatesRows[i][1];
      const shorthand = templatesRows[i][2];
      if (text) {
        templates.push({
          text: text.toString().trim(),
          category: category ? category.toString().trim() : "Services",
          shorthand: shorthand ? shorthand.toString().trim() : ""
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      spelling: spelling,
      templates: templates
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error getting custom data: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleSaveCustomData(data, headers) {
  try {
    const ss = getOrCreateHistorySpreadsheet();
    
    // Save Spelling
    let spellingSheet = ss.getSheetByName("Custom_Spelling");
    if (!spellingSheet) {
      spellingSheet = ss.insertSheet("Custom_Spelling");
    }
    spellingSheet.clear();
    spellingSheet.appendRow(["Wrong", "Right"]);
    
    const spelling = data.spelling || {};
    for (const wrong in spelling) {
      spellingSheet.appendRow([wrong.toString().toLowerCase().trim(), spelling[wrong].toString().trim()]);
    }
    
    // Save Templates
    let templatesSheet = ss.getSheetByName("Custom_Templates");
    if (!templatesSheet) {
      templatesSheet = ss.insertSheet("Custom_Templates");
    }
    templatesSheet.clear();
    templatesSheet.appendRow(["Text", "Category", "Shorthand"]);
    
    const templates = data.templates || [];
    for (const t of templates) {
      if (t.text) {
        templatesSheet.appendRow([
          t.text.toString().trim(),
          t.category ? t.category.toString().trim() : "Services",
          t.shorthand ? t.shorthand.toString().trim() : ""
        ]);
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Custom spelling and templates saved successfully."
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error saving custom data: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

