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
    } else if (action === "set_user_role") {
      return handleSetUserRole(payload, headers);
    } else if (action === "validate_key") {
      return handleValidateKey(payload, headers);
    } else if (action === "bug_report") {
      return handleBugReport(payload, headers);
    } else if (action === "clear_bug_reports") {
      return handleClearBugReports(payload, headers);
    } else if (action === "log_ad") {
      return handleLogAd(payload, headers);
    } else if (action === "get_custom_data") {
      return handleGetCustomData(headers);
    } else if (action === "save_custom_data") {
      return handleSaveCustomData(payload, headers);
    } else if (action === "get_bug_reports") {
      return handleGetBugReports(payload, headers);
    } else if (action === "resolve_bug_report") {
      return handleResolveBugReport(payload, headers);
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
  
  const action = e.parameter.action;
  if (action === "approve_access_request" || action === "reject_access_request") {
    const passcode = e.parameter.passcode || "";
    if (passcode !== ADMIN_PASSCODE) {
      return HtmlService.createHtmlOutput(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #121214; color: #ff453a; height: 100vh; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; margin: 0;">
          <h1 style="font-size: 28px; margin-bottom: 10px;">Access Denied</h1>
          <p style="font-size: 16px; color: #a1a1a6;">Invalid passcode or unauthorized request link.</p>
        </div>
      `);
    }
    
    const clientUuid = e.parameter.clientUuid || "";
    if (!clientUuid) {
      return HtmlService.createHtmlOutput(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #121214; color: #ff9f0a; height: 100vh; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; margin: 0;">
          <h1 style="font-size: 28px; margin-bottom: 10px;">Missing Identifier</h1>
          <p style="font-size: 16px; color: #a1a1a6;">The request is missing the required Hardware ID (UUID).</p>
        </div>
      `);
    }
    
    const sheet = getOrCreateAccessRequestsSheet();
    const rows = sheet.getDataRange().getValues();
    let updated = false;
    let userName = "";
    
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][4] === clientUuid) {
        userName = `${rows[i][1]} ${rows[i][2]} (In-Game ID: ${rows[i][3]})`;
        if (action === "approve_access_request") {
          sheet.getRange(i + 1, 6).setValue("approved");
          if (!rows[i][6]) sheet.getRange(i + 1, 7).setValue("user");
        } else {
          sheet.getRange(i + 1, 6).setValue("rejected");
          sheet.getRange(i + 1, 7).setValue("");
        }
        updated = true;
        break;
      }
    }
    
    if (updated) {
      const actText = action === "approve_access_request" ? "Approved" : "Rejected";
      const color = action === "approve_access_request" ? "#30d158" : "#ff453a";
      const bgGlow = action === "approve_access_request" ? "rgba(48, 209, 88, 0.1)" : "rgba(255, 69, 58, 0.1)";
      return HtmlService.createHtmlOutput(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Access Request ${actText}</title>
          <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #0b0b0c;
              color: #f5f5f7;
              font-family: 'Outfit', sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              box-sizing: border-box;
            }
            .card {
              background: #121214;
              border: 1px solid rgba(255,255,255,0.08);
              border-radius: 16px;
              padding: 40px 30px;
              text-align: center;
              max-width: 440px;
              width: 95%;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 100px ${bgGlow};
            }
            .icon-circle {
              width: 72px;
              height: 72px;
              border-radius: 50%;
              background: ${bgGlow};
              border: 2px solid ${color};
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 24px;
              color: ${color};
              font-size: 32px;
              font-weight: bold;
            }
            h1 {
              font-size: 26px;
              margin: 0 0 12px;
              font-weight: 700;
            }
            .user-info {
              background: rgba(255,255,255,0.03);
              border: 1px solid rgba(255,255,255,0.06);
              border-radius: 8px;
              padding: 15px;
              margin: 20px 0;
              font-size: 14px;
              color: #e1e1e6;
              line-height: 1.5;
              text-align: left;
            }
            .footer-text {
              font-size: 13px;
              color: #8e8e93;
              margin: 0;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="icon-circle">${action === "approve_access_request" ? "✓" : "✗"}</div>
            <h1>Request ${actText}</h1>
            <p style="color: #a1a1a6; font-size: 15px; margin: 0;">The access request has been processed successfully.</p>
            <div class="user-info">
              <strong>User:</strong> ${userName}<br>
              <strong>Status:</strong> <span style="color: ${color}; font-weight: 600;">${actText}</span>
            </div>
            <p class="footer-text">You can close this window now.</p>
          </div>
        </body>
        </html>
      `);
    } else {
      return HtmlService.createHtmlOutput(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px; background-color: #121214; color: #ff453a; height: 100vh; box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; margin: 0;">
          <h1 style="font-size: 28px; margin-bottom: 10px;">Not Found</h1>
          <p style="font-size: 16px; color: #a1a1a6;">This access request was not found or has been removed.</p>
        </div>
      `);
    }
  }
  
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
    sheet.appendRow(["Timestamp", "First Name", "Last Name", "In-Game ID", "UUID", "Status", "Role"]);
  } else {
    // Migrate: add Role header if missing (column 7)
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    if (headers.length < 7 || headers[6] !== "Role") {
      sheet.getRange(1, 7).setValue("Role");
    }
  }
  return sheet;
}

function getOrCreateBugReportsSheet() {
  const ss = getOrCreateHistorySpreadsheet();
  let sheet = ss.getSheetByName("Bug_Reports");
  if (!sheet) {
    sheet = ss.insertSheet("Bug_Reports");
    sheet.appendRow(["Timestamp", "Category", "Raw Input", "Expected Output"]);
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
  let existingStatus = "";
  
  // Look for existing request by clientUuid
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      foundRowIdx = i + 1; // 1-based index
      existingStatus = (rows[i][5] || "").toString().toLowerCase().trim();
      break;
    }
  }
  
  // If user is already approved, don't create a new pending request
  if (foundRowIdx !== -1 && existingStatus === "approved") {
    return ContentService.createTextOutput(JSON.stringify({
      status: "already_approved",
      message: "You already have access to the system. No new request needed."
    })).setMimeType(ContentService.MimeType.JSON);
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
  
  // 1. Process screenshot if present
  let driveFileUrl = "No screenshot uploaded";
  let attachment = null;
  
  if (data.screenshotBase64 && data.screenshotBase64.includes("base64,")) {
    try {
      const parts = data.screenshotBase64.split("base64,");
      const mimeType = parts[0].match(/data:(.*?);/)[1];
      const base64Data = parts[1];
      const decodedBytes = Utilities.base64Decode(base64Data);
      
      const extension = mimeType.split("/")[1] || "png";
      const fileName = `access_request_${id}_${Date.now()}.${extension}`;
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

  // Prepare approval/rejection links
  let webAppUrl = "";
  try {
    webAppUrl = ScriptApp.getService().getUrl();
  } catch(err) {
    Logger.log("Could not get Web App URL: " + err.toString());
  }
  
  if (webAppUrl) {
    // Apply /a/*/ workaround to bypass multi-account Google redirection bugs on mobile devices
    const cleanUrl = webAppUrl.replace("/macros/s/", "/a/*/macros/s/");
    const approveUrl = `${cleanUrl}?action=approve_access_request&clientUuid=${clientUuid}&passcode=${ADMIN_PASSCODE}`;
    const rejectUrl = `${cleanUrl}?action=reject_access_request&clientUuid=${clientUuid}&passcode=${ADMIN_PASSCODE}`;
    
    const emailSubject = `[LifeInvader Access Request] ${firstname} ${lastname} (ID: ${id})`;
    
    let driveLinkHtml = "";
    if (driveFileUrl && driveFileUrl.startsWith("http")) {
      driveLinkHtml = `
        <div style="margin-top: 15px; font-size: 13px; color: #8e8e93; text-align: center;">
          <strong>Visual Request Card saved to Drive:</strong> <a href="${driveFileUrl}" target="_blank" style="color: #30d158; text-decoration: none;">View in Google Drive</a>
        </div>
      `;
    }

    const emailHtmlBody = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0b0b0c; color: #f5f5f7; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; box-sizing: border-box;">
        <h2 style="font-size: 22px; font-weight: 700; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 15px; margin-top: 0;">
          LifeInvader Access Request
        </h2>
        <p style="font-size: 15px; color: #a1a1a6; line-height: 1.5;">
          A new request to access the **LifeInvader Ads Assist** portal has been submitted.
        </p>
        
        <div style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 18px; margin: 20px 0; font-size: 14px; line-height: 1.6;">
          <table cellpadding="4" cellspacing="0" style="width: 100%; color: #e1e1e6;">
            <tr>
              <td style="font-weight: 600; width: 120px; color: #8e8e93;">Name:</td>
              <td>${firstname} ${lastname}</td>
            </tr>
            <tr>
              <td style="font-weight: 600; color: #8e8e93;">In-Game ID:</td>
              <td style="font-family: monospace; font-size: 15px; color: #30d158; font-weight: 600;">${id}</td>
            </tr>
            <tr>
              <td style="font-weight: 600; color: #8e8e93;">Hardware ID:</td>
              <td style="font-family: monospace; font-size: 12px; color: #a1a1a6;">${clientUuid}</td>
            </tr>
            <tr>
              <td style="font-weight: 600; color: #8e8e93;">Timestamp:</td>
              <td>${timestamp}</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 15px; color: #a1a1a6; font-weight: 600; margin-bottom: 20px;">
          Process this request immediately using the actions below:
        </p>
        
        <div style="margin: 25px 0;">
          <a href="${approveUrl}" style="display: inline-block; background-color: #30d158; color: #ffffff; padding: 12px 24px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 8px; text-align: center; margin-right: 15px; border: 1px solid #24b046;">
            Approve Access
          </a>
          <a href="${rejectUrl}" style="display: inline-block; background-color: #ff453a; color: #ffffff; padding: 12px 24px; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 8px; text-align: center; border: 1px solid #e0352b;">
            Reject Access
          </a>
        </div>
        
        ${driveLinkHtml}
        
        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 25px 0;">
        <p style="font-size: 12px; color: #8e8e93; line-height: 1.5; margin: 0; text-align: center;">
          This is an automated notification from your LifeInvader Ads Assist Web App.
        </p>
      </div>
    `;
    
    const emailParams = {
      to: ADMIN_EMAIL,
      subject: emailSubject,
      htmlBody: emailHtmlBody
    };
    if (attachment) {
      emailParams.attachments = [attachment];
    }
    
    try {
      MailApp.sendEmail(emailParams);
      Logger.log("Access request notification email sent to admin successfully.");
    } catch(mailErr) {
      Logger.log("Error sending access request email: " + mailErr.toString());
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Access request submitted. Please wait for admin approval.",
    driveUrl: driveFileUrl
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
  let userRole = "user";
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      requestStatus = rows[i][5] || "pending";
      userRole = (rows[i][6] || "user").toString().trim().toLowerCase();
      if (!userRole) userRole = "user";
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    approved: (requestStatus === "approved"),
    requestStatus: requestStatus,
    role: userRole
  })).setMimeType(ContentService.MimeType.JSON);
}

// Helper: check if a UUID has assistant_admin or higher role
function isAssistantAdmin(sheet, clientUuid) {
  if (!clientUuid) return false;
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      const status = (rows[i][5] || "").toString().toLowerCase().trim();
      const role = (rows[i][6] || "").toString().toLowerCase().trim();
      return status === "approved" && role === "assistant_admin";
    }
  }
  return false;
}

// Helper: check auth - returns { authorized, isSuperAdmin }
function checkAdminAuth(data) {
  const passcode = data.passcode || "";
  const clientUuid = data.authUuid || data.clientUuid || "";
  
  if (passcode === ADMIN_PASSCODE) {
    return { authorized: true, isSuperAdmin: true };
  }
  
  if (clientUuid) {
    const sheet = getOrCreateAccessRequestsSheet();
    if (isAssistantAdmin(sheet, clientUuid)) {
      return { authorized: true, isSuperAdmin: false };
    }
  }
  
  return { authorized: false, isSuperAdmin: false };
}

function handleGetAccessRequests(data, headers) {
  const auth = checkAdminAuth(data);
  if (!auth.authorized) {
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
      status: rows[i][5] || "pending",
      role: (rows[i][6] || "user").toString().trim().toLowerCase() || "user"
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    requests: requests.reverse(),
    isSuperAdmin: auth.isSuperAdmin
  })).setMimeType(ContentService.MimeType.JSON);
}

function handleApproveAccessRequest(data, headers) {
  const auth = checkAdminAuth(data);
  if (!auth.authorized) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized access."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const clientUuid = data.clientUuid || "";
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
      // Set default role if empty
      if (!rows[i][6]) sheet.getRange(i + 1, 7).setValue("user");
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
  const auth = checkAdminAuth(data);
  if (!auth.authorized) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized access."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const clientUuid = data.clientUuid || "";
  if (!clientUuid) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Missing UUID."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getOrCreateAccessRequestsSheet();
  const rows = sheet.getDataRange().getValues();
  let updated = false;
  
  // If revoking an approved user, only super admin can do that
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      const currentStatus = (rows[i][5] || "").toString().toLowerCase().trim();
      if (currentStatus === "approved" && !auth.isSuperAdmin) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "error",
          message: "Only the super admin can revoke approved users."
        })).setMimeType(ContentService.MimeType.JSON);
      }
      sheet.getRange(i + 1, 6).setValue("rejected");
      // Clear role on rejection
      sheet.getRange(i + 1, 7).setValue("");
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

function handleSetUserRole(data, headers) {
  // Only super admin (passcode) can change roles
  const passcode = data.passcode || "";
  if (passcode !== ADMIN_PASSCODE) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Only the super admin can change user roles."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const clientUuid = data.clientUuid || "";
  const newRole = data.role || "user";
  
  if (!clientUuid) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Missing UUID."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Validate role value
  const validRoles = ["user", "assistant_admin"];
  if (!validRoles.includes(newRole)) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Invalid role. Must be 'user' or 'assistant_admin'."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const sheet = getOrCreateAccessRequestsSheet();
  const rows = sheet.getDataRange().getValues();
  let updated = false;
  
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][4] === clientUuid) {
      sheet.getRange(i + 1, 7).setValue(newRole);
      updated = true;
      break;
    }
  }
  
  if (updated) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "User role updated to " + newRole + "."
    })).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "User not found."
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
  const inputRaw = (data.rawInput || "").toString().trim();
  const normalizedRaw = inputRaw.toLowerCase();
  
  if (normalizedRaw) {
    const sheet = getOrCreateBugReportsSheet();
    const rows = sheet.getDataRange().getValues();
    for (let i = 1; i < rows.length; i++) {
      const existingRaw = (rows[i][2] || "").toString().toLowerCase().trim();
      if (existingRaw === normalizedRaw) {
        return ContentService.createTextOutput(JSON.stringify({
          status: "already_submitted",
          message: "Bug report already submitted. A fix is expected within 10 minutes."
        }))
        .setMimeType(ContentService.MimeType.JSON);
      }
    }
    sheet.appendRow([new Date().toLocaleString(), data.category || "General", inputRaw, data.expectedOutput || "None"]);
  }

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
  const isInline = expectedOutput.indexOf("[Inline False-Rejection Report]") !== -1;
  const displayTitle = isInline ? "LifeInvader False-Rejection Report" : "LifeInvader Correction Request";
  const borderStyle1 = "border: 1.5px solid #ff453a;"; // Red border for raw ad input
  const borderStyle2 = "border: 1.5px solid #ff9f0a;"; // Yellow/orange warning border for output
  
  let driveLinkHtml = "";
  if (driveFileUrl && driveFileUrl.startsWith("http")) {
    driveLinkHtml = `
      <div style="margin-top: 15px; font-size: 13px; color: #8e8e93;">
        <strong>Screenshot saved to Drive:</strong> <a href="${driveFileUrl}" target="_blank" style="color: #30d158; text-decoration: none;">View in Google Drive</a>
      </div>
    `;
  }

  const subject = `[${category}] ${displayTitle}`;
  const htmlBody = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 24px; background-color: #0a0b10; color: #f5f5f7; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; box-sizing: border-box;">
      <h2 style="font-size: 20px; font-weight: 700; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 15px; margin-top: 0;">
        <span style="color: #ff453a;">●</span> ${displayTitle}
      </h2>
      
      <p style="font-size: 14px; color: #a1a1a6; margin-bottom: 20px; line-height: 1.5;">
        A new correction report was submitted for category: <strong style="color: #ffffff; text-transform: uppercase;">${category}</strong> at ${timestamp}.
      </p>
      
      <!-- Box 1: What the Editor Typed (Raw Input) -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #8e8e93; margin-bottom: 6px;">
          What the Editor Typed
        </div>
        <div style="background-color: #121214; ${borderStyle1} border-radius: 8px; padding: 16px; font-family: monospace; font-size: 14px; color: #e1e1e6; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${rawInput}</div>
      </div>
      
      <!-- Box 2: What the System Gave (Processed Output) -->
      <div style="margin-bottom: 10px;">
        <div style="font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #8e8e93; margin-bottom: 6px;">
          What the System Returned / Expected Correction
        </div>
        <div style="background-color: #121214; ${borderStyle2} border-radius: 8px; padding: 16px; font-family: monospace; font-size: 14px; color: #e1e1e6; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${expectedOutput}</div>
      </div>
      
      ${driveLinkHtml}
      
      <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 25px 0;">
      <p style="font-size: 12px; color: #8e8e93; line-height: 1.5; margin: 0; text-align: center;">
        This is an automated notification from your LifeInvader Ads Assist Web App.
      </p>
    </div>
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

    // Translations sheet
    let translationsSheet = ss.getSheetByName("Custom_Translations");
    if (!translationsSheet) {
      translationsSheet = ss.insertSheet("Custom_Translations");
      translationsSheet.appendRow(["RawInput", "FixedOutput"]);
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

    // Read translations
    const translations = {};
    const translationsRows = translationsSheet.getDataRange().getValues();
    for (let i = 1; i < translationsRows.length; i++) {
      const raw = translationsRows[i][0];
      const fixed = translationsRows[i][1];
      if (raw) {
        translations[raw.toString().toLowerCase().trim()] = fixed ? fixed.toString().trim() : "";
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      spelling: spelling,
      templates: templates,
      translations: translations
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
    
    const spelling = data.spelling || {};
    const spellingRows = [["Wrong", "Right"]];
    for (const wrong in spelling) {
      spellingRows.push([wrong.toString().toLowerCase().trim(), spelling[wrong].toString().trim()]);
    }
    spellingSheet.getRange(1, 1, spellingRows.length, 2).setValues(spellingRows);
    
    // Save Templates
    let templatesSheet = ss.getSheetByName("Custom_Templates");
    if (!templatesSheet) {
      templatesSheet = ss.insertSheet("Custom_Templates");
    }
    templatesSheet.clear();
    
    const templates = data.templates || [];
    const templatesRows = [["Text", "Category", "Shorthand"]];
    for (const t of templates) {
      if (t.text) {
        templatesRows.push([
          t.text.toString().trim(),
          t.category ? t.category.toString().trim() : "Services",
          t.shorthand ? t.shorthand.toString().trim() : ""
        ]);
      }
    }
    templatesSheet.getRange(1, 1, templatesRows.length, 3).setValues(templatesRows);

    // Save Translations
    let translationsSheet = ss.getSheetByName("Custom_Translations");
    if (!translationsSheet) {
      translationsSheet = ss.insertSheet("Custom_Translations");
    }
    translationsSheet.clear();
    
    const translations = data.translations || {};
    const translationsRows = [["RawInput", "FixedOutput"]];
    for (const raw in translations) {
      translationsRows.push([raw.toString().toLowerCase().trim(), translations[raw].toString().trim()]);
    }
    translationsSheet.getRange(1, 1, translationsRows.length, 2).setValues(translationsRows);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Custom spelling, templates, and translations saved successfully."
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error saving custom data: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Run this function manually in the Google Apps Script editor to clear all bug reports
 * and delete all screenshot images from your Google Drive folder.
 */
function clearAllBugReportsManually() {
  Logger.log("Opening history spreadsheet...");
  const ss = getOrCreateHistorySpreadsheet();
  const sheet = ss.getSheetByName("Bug_Reports");
  if (sheet) {
    sheet.clear();
    sheet.appendRow(["Timestamp", "Category", "Raw Input", "Expected Output"]);
    Logger.log("Successfully cleared Bug_Reports sheet.");
  } else {
    Logger.log("Bug_Reports sheet not found.");
  }
  
  Logger.log("Accessing Google Drive folder...");
  let deletedCount = 0;
  const folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    const name = file.getName();
    if (name.startsWith("bug_report_")) {
      file.setTrashed(true);
      deletedCount++;
    }
  }
  Logger.log("Successfully trashed " + deletedCount + " bug report images from Google Drive!");
}

function handleClearBugReports(data, headers) {
  const auth = checkAdminAuth(data);
  if (!auth.authorized) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized access. Invalid passcode."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  try {
    const ss = getOrCreateHistorySpreadsheet();
    const sheet = ss.getSheetByName("Bug_Reports");
    if (sheet) {
      sheet.clear();
      sheet.appendRow(["Timestamp", "Category", "Raw Input", "Expected Output"]);
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error clearing sheet: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }

  let deletedCount = 0;
  try {
    const folder = DriveApp.getFolderById(GOOGLE_DRIVE_FOLDER_ID);
    const files = folder.getFiles();
    while (files.hasNext()) {
      const file = files.next();
      const name = file.getName();
      if (name.startsWith("bug_report_")) {
        file.setTrashed(true);
        deletedCount++;
      }
    }
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error deleting files from Drive: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: `Successfully cleared all bug reports and deleted ${deletedCount} screenshot images from Google Drive.`
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Retrieves all bug reports from the Bug_Reports sheet for the triage panel.
 * Returns them newest-first.
 */
function handleGetBugReports(payload, headers) {
  const auth = checkAdminAuth(payload);
  if (!auth.authorized) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized access. Invalid passcode."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    const sheet = getOrCreateBugReportsSheet();
    const data = sheet.getDataRange().getValues();
    
    // Skip header row, reverse so newest is first
    const reports = [];
    for (let i = data.length - 1; i >= 1; i--) {
      reports.push({
        timestamp: data[i][0] || "",
        category: data[i][1] || "",
        rawInput: data[i][2] || "",
        expectedOutput: data[i][3] || "",
        rowIndex: i + 1  // 1-based sheet row for future deletion
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      reports: reports,
      total: reports.length
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Error fetching bug reports: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function handleResolveBugReport(payload, headers) {
  const auth = checkAdminAuth(payload);
  if (!auth.authorized) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Unauthorized access."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const rawInput = (payload.rawInput || "").toString().trim();
  const timestamp = (payload.timestamp || "").toString().trim();
  
  if (!rawInput) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Missing rawInput."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  let targetTimeMs = 0;
  if (timestamp) {
    try {
      targetTimeMs = new Date(timestamp).getTime();
    } catch (e) {}
  }
  
  const sheet = getOrCreateBugReportsSheet();
  const rows = sheet.getDataRange().getValues();
  let deleted = false;
  
  for (let i = rows.length - 1; i >= 1; i--) {
    const sheetRaw = (rows[i][2] || "").toString().trim();
    
    if (sheetRaw === rawInput) {
      let timeMatches = true;
      if (targetTimeMs && rows[i][0]) {
        try {
          const rowTimeMs = new Date(rows[i][0]).getTime();
          // Match if within 10 seconds (handles rounding / timezone differences)
          timeMatches = Math.abs(rowTimeMs - targetTimeMs) < 10000;
        } catch (e) {
          timeMatches = false;
        }
      }
      
      if (timeMatches) {
        sheet.deleteRow(i + 1);
        deleted = true;
        break;
      }
    }
  }
  
  if (deleted) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Bug report resolved and removed."
    })).setMimeType(ContentService.MimeType.JSON);
  } else {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "Bug report not found in database."
    })).setMimeType(ContentService.MimeType.JSON);
  }
}


