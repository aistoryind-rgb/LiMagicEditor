const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, '../app.js');
let content = fs.readFileSync(appJsPath, 'utf8');

// --- Edit 1: handleFirebaseRequest with runWithTimeout ---
const startMarker1 = 'async function handleFirebaseRequest(payload) {';
const endMarker1 = '// Monkey patch window.fetch to support Firebase backend transparently';

const startIndex1 = content.indexOf(startMarker1);
const endIndex1 = content.indexOf(endMarker1);

if (startIndex1 === -1 || endIndex1 === -1 || startIndex1 >= endIndex1) {
    console.error("Error: Could not find handleFirebaseRequest block markers.");
    process.exit(1);
}

const replacement1 = `function runWithTimeout(promise, ms = 6000) {
    return Promise.race([
        promise,
        new Promise((_, reject) => 
            setTimeout(() => reject(new Error("Database operation timed out. Please check your network connection.")), ms)
        )
    ]);
}

async function handleFirebaseRequest(payload) {
    const db = getFirebaseDb();
    const action = payload.action;

    if (action === "access_request") {
        const clientUuid = payload.clientUuid;
        if (!clientUuid) throw new Error("Missing client UUID.");
        
        const docRef = db.collection("access_requests").doc(clientUuid);
        try {
            const doc = await runWithTimeout(docRef.get(), 6000);
            if (doc.exists && doc.data().status === "approved") {
                return { status: "already_approved", message: "You already have access." };
            }
        } catch (err) {
            console.warn("Could not check existing access request before submit:", err);
            if (err.message.includes("timed out")) throw err;
        }
        
        const timestamp = new Date().toISOString();
        const requestData = {
            firstname: payload.firstname || "",
            lastname: payload.lastname || "",
            id: payload.id || "",
            clientUuid: clientUuid,
            status: "pending",
            role: payload.role || "user",
            timestamp: timestamp
        };
        if (payload.screenshotBase64 && payload.screenshotBase64.length < 700000) {
            requestData.screenshot = payload.screenshotBase64;
        }
        await runWithTimeout(docRef.set(requestData, { merge: true }), 6000);
        
        return { status: "success", message: "Access request submitted successfully." };
    }

    if (action === "check_access") {
        const clientUuid = payload.clientUuid;
        if (!clientUuid) throw new Error("Missing client UUID.");
        
        const doc = await runWithTimeout(db.collection("access_requests").doc(clientUuid).get(), 6000);
        if (!doc.exists) {
            return { status: "success", approved: false, requestStatus: "none", role: "user" };
        }
        const data = doc.data();
        return {
            status: "success",
            approved: data.status === "approved",
            requestStatus: data.status || "pending",
            role: data.role || "user"
        };
    }

    if (action === "get_access_requests") {
        let authorized = false;
        let isSuperAdmin = false;
        const passHash = await hashPasscode(payload.passcode);
        if (passHash === "8a8f9bd914d1de31cacb185fe3f278be859e2179891788967320befcd9397560") {
            authorized = true;
            isSuperAdmin = true;
        } else if (payload.authUuid || payload.clientUuid) {
            const adminDoc = await runWithTimeout(db.collection("access_requests").doc(payload.authUuid || payload.clientUuid).get(), 6000);
            if (adminDoc.exists && adminDoc.data().status === "approved" && adminDoc.data().role === "assistant_admin") {
                authorized = true;
            }
        }
        if (!authorized) {
            return { status: "error", message: "Unauthorized access." };
        }

        const snapshot = await runWithTimeout(db.collection("access_requests").get(), 10000);
        const requests = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            requests.push({
                timestamp: data.timestamp ? new Date(data.timestamp).toLocaleString() : "",
                firstname: data.firstname || "",
                lastname: data.lastname || "",
                id: data.id || "",
                clientUuid: data.clientUuid || "",
                status: data.status || "pending",
                role: data.role || "user",
                screenshotBase64: data.screenshot || ""
            });
        });
        // Sort requests by timestamp desc
        requests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return { status: "success", requests: requests, isSuperAdmin: isSuperAdmin };
    }

    if (action === "approve_access_request") {
        const clientUuid = payload.clientUuid;
        if (!clientUuid) throw new Error("Missing client UUID.");
        await runWithTimeout(db.collection("access_requests").doc(clientUuid).set({
            status: "approved"
        }, { merge: true }), 6000);
        return { status: "success", message: "Access request approved." };
    }

    if (action === "reject_access_request") {
        const clientUuid = payload.clientUuid;
        if (!clientUuid) throw new Error("Missing client UUID.");
        await runWithTimeout(db.collection("access_requests").doc(clientUuid).set({
            status: payload.preserveUser ? "revoked" : "rejected",
            role: "",
            revokedAt: payload.preserveUser ? new Date().toISOString() : ""
        }, { merge: true }), 6000);
        return { status: "success", message: payload.preserveUser ? "User access deactivated and preserved." : "Access request rejected." };
    }

    if (action === "set_user_role") {
        const passHash = await hashPasscode(payload.passcode);
        if (passHash !== "8a8f9bd914d1de31cacb185fe3f278be859e2179891788967320befcd9397560") {
            return { status: "error", message: "Only super admin can change roles." };
        }
        const clientUuid = payload.clientUuid;
        if (!clientUuid) throw new Error("Missing client UUID.");
        await runWithTimeout(db.collection("access_requests").doc(clientUuid).set({
            role: payload.role || "user"
        }, { merge: true }), 6000);
        return { status: "success", message: "User role updated." };
    }

    if (action === "bug_report") {
        db.collection("bug_reports").add({
            category: payload.category || "",
            rawInput: payload.rawInput || "",
            expectedOutput: payload.expectedOutput || "",
            source: payload.source || "bug_report",
            screenshot: payload.screenshotBase64 || "",
            timestamp: new Date().toISOString()
        }).catch(err => console.error("Firestore bug report write error:", err));
        return { status: "success", message: "Bug report submitted." };
    }

    if (action === "get_bug_reports") {
        const snapshot = await runWithTimeout(db.collection("bug_reports").get(), 10000);
        const reports = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            reports.push({
                id: doc.id,
                timestamp: data.timestamp ? new Date(data.timestamp).toLocaleString() : "",
                category: data.category || "",
                rawInput: data.rawInput || "",
                expectedOutput: data.expectedOutput || ""
            });
        });
        reports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return { status: "success", reports: reports };
    }

    if (action === "resolve_bug_report") {
        const id = payload.id;
        if (!id) throw new Error("Missing report ID.");
        await runWithTimeout(db.collection("bug_reports").doc(id).delete(), 6000);
        return { status: "success", message: "Bug report resolved." };
    }

    if (action === "clear_bug_reports") {
        const snapshot = await runWithTimeout(db.collection("bug_reports").get(), 10000);
        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        await runWithTimeout(batch.commit(), 10000);
        return { status: "success", message: "All bug reports cleared." };
    }

    if (action === "log_ad") {
        db.collection("ad_history").add({
            adText: payload.adText || "",
            category: payload.category || "",
            status: payload.status || "",
            reason: payload.reason || "",
            timestamp: new Date().toISOString()
        }).catch(err => console.error("Firestore log ad error:", err));
        return { status: "success", message: "Ad logged." };
    }

    if (action === "get_history") {
        const snapshot = await runWithTimeout(db.collection("ad_history").get(), 10000);
        const history = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            history.push({
                timestamp: data.timestamp ? new Date(data.timestamp).toLocaleString() : "",
                adText: data.adText || "",
                category: data.category || "",
                status: data.status || "",
                reason: data.reason || ""
            });
        });
        history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        return { status: "success", history: history };
    }

    if (action === "get_custom_data") {
        const doc = await runWithTimeout(db.collection("config").doc("custom_data").get(), 6000);
        if (doc.exists) {
            return {
                status: "success",
                spelling: doc.data().spelling || {},
                translations: doc.data().translations || {},
                templates: doc.data().templates || []
            };
        }
        return { status: "success", spelling: {}, translations: {}, templates: [] };
    }

    if (action === "save_custom_data") {
        const updateData = {
            spelling: payload.spelling || {},
            templates: payload.templates || [],
            translations: payload.translations || {}
        };
        await runWithTimeout(db.collection("config").doc("custom_data").set(updateData, { merge: true }), 8000);
        return { status: "success", message: "Configurations saved successfully." };
    }

    if (action === "validate_key") {
        const approvalKey = payload.approvalKey || "";
        if (!approvalKey) {
            return { status: "success", valid: false, message: "No key provided." };
        }
        const parts = approvalKey.split('-');
        if (parts.length === 5 && parts[0] === 'LI' && parts[1] === 'APPROVED') {
            const server = parts[2];
            const id = parts[3];
            const sig = parts[4];
            const clientUuid = payload.clientUuid || "";
            
            const APPROVE_SALT = "DopamineLifeInvader2026!NewApprovalKey_Revoked_2026_05_24";
            const dataStr = \`\${server.toLowerCase().trim()}:\${id.toString().trim()}:\${(clientUuid || "").toString().trim()}:\${APPROVE_SALT}\`;
            let hash = 0x811c9dc5;
            for (let i = 0; i < dataStr.length; i++) {
                hash ^= dataStr.charCodeAt(i);
                hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
            }
            const expectedSig = (hash >>> 0).toString(16).toUpperCase().substring(0, 6);
            
            if (sig === expectedSig) {
                return { status: "success", valid: true, message: "Key valid." };
            }
        }
        return { status: "success", valid: false, message: "Invalid key." };
    }

    throw new Error("Unsupported action: " + action);
}

`;

content = content.substring(0, startIndex1) + replacement1 + content.substring(endIndex1);

// --- Edit 2: applyAdminRolePermissions refactoring ---
const startMarker2 = 'function applyAdminRolePermissions() {';
const endMarker2 = 'function initAdminPanel() {';

const startIndex2 = content.indexOf(startMarker2);
const endIndex2 = content.indexOf(endMarker2);

if (startIndex2 === -1 || endIndex2 === -1 || startIndex2 >= endIndex2) {
    console.error("Error: Could not find applyAdminRolePermissions block markers.");
    process.exit(1);
}

const replacement2 = `function applyAdminRolePermissions() {
    updateAIAssistButtonsVisibility();
    const isAssistant = sessionStorage.getItem("li_admin_role") === "assistant";
    
    // Ensure backup tab button is visible
    const backupTabBtn = document.querySelector('.admin-tab-btn[data-target="tab-backup"]');
    if (backupTabBtn) {
        backupTabBtn.style.display = ""; // Always show it!
    }

    const tabBackup = document.getElementById("tab-backup");
    if (tabBackup) {
        // Check if banner already exists
        let lockBanner = document.getElementById("backup-lock-banner");

        if (isAssistant) {
            // Create banner if not exists
            if (!lockBanner) {
                lockBanner = document.createElement("div");
                lockBanner.id = "backup-lock-banner";
                lockBanner.innerHTML = \`
                    <div style="background: rgba(255, 59, 48, 0.1); border: 1px dashed rgba(255, 59, 48, 0.4); border-radius: 8px; padding: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 15px; box-shadow: 0 4px 20px rgba(255, 59, 48, 0.05);">
                        <div style="background: rgba(255, 59, 48, 0.2); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #ff3b30; font-size: 18px; box-shadow: 0 0 10px rgba(255, 59, 48, 0.3);">
                            <i class="fa-solid fa-lock"></i>
                        </div>
                        <div>
                            <h5 style="margin: 0 0 3px 0; font-family: var(--font-heading); color: #ff453a; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Restricted Access</h5>
                            <p style="margin: 0; font-size: 11.5px; color: rgba(255,255,255,0.7); line-height: 1.4;">Admins are not permitted to export/import configurations or clear system databases. Please contact a Super Admin for maintenance operations.</p>
                        </div>
                    </div>
                \`;
                tabBackup.insertBefore(lockBanner, tabBackup.firstChild);
            }

            // Disable all inputs & buttons in tab-backup
            const inputs = tabBackup.querySelectorAll("input, textarea, button");
            inputs.forEach(el => {
                el.disabled = true;
                el.style.opacity = "0.5";
                el.style.cursor = "not-allowed";
            });
            
            // Specifically target clear bugs button to completely restrict
            const btnClearBugs = document.getElementById("btn-admin-clear-bugs");
            if (btnClearBugs) {
                btnClearBugs.disabled = true;
                btnClearBugs.style.opacity = "0.4";
                btnClearBugs.style.cursor = "not-allowed";
                btnClearBugs.classList.remove("glow-red");
            }

            const backupTextarea = document.getElementById("admin-backup-textarea");
            if (backupTextarea) {
                backupTextarea.placeholder = "Access Denied. You do not have permissions to view or restore backup data.";
            }
        } else {
            // Super admin - remove banner if exists
            if (lockBanner) {
                lockBanner.remove();
            }

            // Enable all inputs & buttons in tab-backup
            const inputs = tabBackup.querySelectorAll("input, textarea, button");
            inputs.forEach(el => {
                el.disabled = false;
                el.style.opacity = "";
                el.style.cursor = "";
            });

            const btnClearBugs = document.getElementById("btn-admin-clear-bugs");
            if (btnClearBugs) {
                btnClearBugs.classList.add("glow-red");
            }

            const backupTextarea = document.getElementById("admin-backup-textarea");
            if (backupTextarea) {
                backupTextarea.placeholder = "JSON backup content will appear here or can be pasted here for restoration...";
            }
        }
    }

    // Always apply Gemini API key restriction logic regardless of tabBackup
    const inputKey = document.getElementById("input-ai-gemini-key");
    const btnToggleVisibility = document.getElementById("btn-toggle-ai-gemini-key-visibility");

    if (isAssistant) {
        if (inputKey) {
            inputKey.value = "••••••••••••••••••••••••••••••••";
            inputKey.type = "password";
            inputKey.disabled = true;
            inputKey.style.opacity = "0.5";
            inputKey.style.cursor = "not-allowed";
        }
        if (btnToggleVisibility) {
            btnToggleVisibility.style.display = "none";
        }
    } else {
        if (inputKey) {
            inputKey.disabled = false;
            inputKey.style.opacity = "";
            inputKey.style.cursor = "";
            const storedKey = localStorage.getItem("li_gemini_api_key") || FALLBACK_GEMINI_KEY;
            if (inputKey.value === "••••••••••••••••••••••••••••••••") {
                inputKey.value = storedKey;
            }
        }
        if (btnToggleVisibility) {
            btnToggleVisibility.style.display = "";
        }
    }
}

`;

content = content.substring(0, startIndex2) + replacement2 + content.substring(endIndex2);

// --- Edit 3: initTriagePanel clear button wiring ---
const startMarker3 = 'const refreshBtn = document.getElementById("btn-triage-refresh");';
const endMarker3 = '    // Auto-sync processing classes on buttons when they display spinners or are disabled';

const startIndex3 = content.indexOf(startMarker3);
const endIndex3 = content.indexOf(endMarker3);

if (startIndex3 === -1 || endIndex3 === -1 || startIndex3 >= endIndex3) {
    console.error("Error: Could not find initTriagePanel block markers.");
    process.exit(1);
}

const replacement3 = `const refreshBtn = document.getElementById("btn-triage-refresh");
    const clearAllBtn = document.getElementById("btn-triage-clear-all");
    const unlockLoginBtn = document.getElementById("btn-bug-unlock-login");
    
    if (triageTabBtn) {
        triageTabBtn.addEventListener("click", () => {
            if (sessionStorage.getItem("li_admin_authenticated") === "true") {
                loadAndRenderBugTriage();
            }
        });
    }
    
    if (unlockLoginBtn) {
        unlockLoginBtn.addEventListener("click", () => {
            // Switch to Admin Panel tab to authenticate
            const adminTabBtn = document.getElementById("tab-btn-admin");
            if (adminTabBtn) {
                adminTabBtn.click();
                setTimeout(() => {
                    const passInput = document.getElementById("admin-passcode-input");
                    if (passInput) passInput.focus();
                }, 100);
            }
        });
    }
    
    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            if (sessionStorage.getItem("li_admin_authenticated") === "true") {
                // Spin animation on refresh icon
                const icon = refreshBtn.querySelector("i");
                if (icon) {
                    icon.style.transition = "transform 0.5s ease";
                    icon.style.transform = "rotate(360deg)";
                    setTimeout(() => {
                        icon.style.transition = "none";
                        icon.style.transform = "rotate(0deg)";
                    }, 500);
                }
                loadAndRenderBugTriage();
            } else {
                showCustomNotification("Please authenticate as admin first.", "warning");
            }
        });
    }

    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
            if (sessionStorage.getItem("li_admin_authenticated") === "true") {
                showCustomConfirmDialog(
                    "Are you sure you want to permanently clear all bug reports? This action cannot be undone.",
                    () => {
                        clearAllBtn.disabled = true;
                        clearAllBtn.innerHTML = \`<i class="fa-solid fa-spinner fa-spin"></i> Clearing...\`;
                        const passcode = sessionStorage.getItem("li_admin_passcode") || localStorage.getItem("li_admin_passcode");
                        
                        fetch(CONFIG.GOOGLE_SCRIPT_URL, {
                            method: "POST",
                            headers: { "Content-Type": "text/plain" },
                            body: JSON.stringify({
                                action: "clear_bug_reports",
                                passcode: passcode
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === "success") {
                                showCustomNotification("All bug reports cleared successfully!", "success");
                                loadAndRenderBugTriage();
                            } else {
                                showCustomNotification("Error clearing bug reports: " + (data.message || "Failed."), "error");
                            }
                        })
                        .catch(err => {
                            console.error("Error clearing bugs:", err);
                            showCustomNotification("Error clearing bug reports.", "error");
                        })
                        .finally(() => {
                            clearAllBtn.disabled = false;
                            clearAllBtn.innerHTML = \`<i class="fa-solid fa-trash-can"></i> Clear All\`;
                        });
                    },
                    null,
                    "Clear All",
                    true
                );
            } else {
                showCustomNotification("Please authenticate as admin first.", "warning");
            }
        });
    }
`;

content = content.substring(0, startIndex3) + replacement3 + content.substring(endIndex3);

fs.writeFileSync(appJsPath, content, 'utf8');
console.log("app.js patched successfully.");
