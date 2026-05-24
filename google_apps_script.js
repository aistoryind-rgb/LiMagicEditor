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
const APPROVE_SALT = "DopamineLifeInvader2026!ApprovalKey";

function generateApprovalSignature(server, id) {
  const data = `${server.toLowerCase().trim()}:${id.toString().trim()}:${APPROVE_SALT}`;
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
    } else if (action === "validate_key") {
      return handleValidateKey(payload, headers);
    } else if (action === "bug_report") {
      return handleBugReport(payload, headers);
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

function handleAccessRequest(data, headers) {
  const firstname = data.firstname || "";
  const lastname = data.lastname || "";
  const email = data.email || "";
  const server = data.server || "EN3";
  const id = data.id || "Unknown";
  const timestamp = new Date().toLocaleString();
  
  const approveSig = generateApprovalSignature(server, id);
  const approvalKey = `LI-APPROVED-${server}-${id}-${approveSig}`;
  
  const nameDisplay = (firstname || lastname) ? `${firstname} ${lastname}`.trim() : (data.name || "Unknown");
  
  const subject = `[LifeInvader Access Request] ${nameDisplay} (ID: ${id}) on Server ${server}`;
  
  const body = `
LifeInvader Ad Editor Access Request Details:
---------------------------------------------
Timestamp: ${timestamp}
First Name: ${firstname}
Last Name: ${lastname}
Email ID: ${email}
Server: ${server}
In-Game ID: ${id}

Admin Approval Key to send to user:
${approvalKey}

To approve this user, copy the "Admin Approval Key" above and send it to them. They must paste it into the unlock prompt on the website to gain access.
  `;
  
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    body: body
  });
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "Access request email sent successfully."
  }))
  .setMimeType(ContentService.MimeType.JSON);
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
    const expectedSig = generateApprovalSignature(server, id);
    
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
