// =========================
// SVEN SYSTEM ENGINE v7
// STATE + INCIDENT + HARDENED CONTROL
// =========================

// 🟢 SINGLE SOURCE OF TRUTH
let STATE = "OBSERVE";

// 🚨 INCIDENT SYSTEM
let INCIDENT_ACTIVE = false;
let INCIDENT_REASON = "";

// =========================
// STATE CONTROL
// =========================

function setState(newState) {

  // 🚨 BLOCK STATE IF INCIDENT ACTIVE
  if (INCIDENT_ACTIVE) return;

  STATE = newState;

  syncState();
  render();
  updateAI();
}

// =========================
// INCIDENT TRIGGER
// =========================

function triggerIncident(reason) {

  INCIDENT_ACTIVE = true;
  INCIDENT_REASON = reason;

  enterEmergencyMode();
}

// =========================
// INCIDENT RESOLVE
// =========================

function resolveIncident() {

  INCIDENT_ACTIVE = false;
  INCIDENT_REASON = "";

  exitEmergencyMode();
}

// =========================
// EMERGENCY MODE
// =========================

function enterEmergencyMode() {

  const aiOutput = document.getElementById("ai-output");

  if (aiOutput) {
    aiOutput.innerText =
      "🚨 INCIDENT ACTIVE: " + INCIDENT_REASON;
  }

  document.body.setAttribute("data-state", "INCIDENT");
}

// =========================
// EXIT EMERGENCY MODE
// =========================

function exitEmergencyMode() {

  syncState();
  render();
  updateAI();
}

// =========================
// STATE → DOM SYNC (SINGLE SOURCE OF TRUTH)
// =========================

function syncState() {
  document.body.setAttribute("data-state", STATE);
}

// =========================
// RENDER ENGINE
// =========================

function render() {

  const stateDisplay = document.getElementById("state-display");

  const sven = document.getElementById("sven");
  const chatty = document.getElementById("chatty");
  const network = document.getElementById("network");

  if (!stateDisplay || !sven || !chatty || !network) return;

  // INCIDENT OVERRIDE UI
  if (INCIDENT_ACTIVE) {
    stateDisplay.innerText = "STATE: INCIDENT MODE";
    return;
  }

  stateDisplay.innerText = "STATE: " + STATE;

  // RESET VISUALS
  sven.style.opacity = "1";
  chatty.style.opacity = "1";
  chatty.style.transform = "translateY(0px)";
  network.style.opacity = "0.2";

  // STATE VISUALS
  if (STATE === "CONNECT") {
    chatty.style.transform = "translateY(-10px)";
    network.style.opacity = "0.6";
  }

  if (STATE === "STRUCTURE") {
    sven.style.transform = "scale(1.05)";
    network.style.opacity = "0.75";
  }

  if (STATE === "REFLECT") {
    sven.style.opacity = "0.6";
    chatty.style.opacity = "0.5";
    network.style.opacity = "0.15";
  }
}

// =========================
// AI OUTPUT SYSTEM
// =========================

function updateAI() {

  const aiOutput = document.getElementById("ai-output");

  if (!aiOutput) return;

  // 🚨 INCIDENT OVERRIDE
  if (INCIDENT_ACTIVE) {
    aiOutput.innerText =
      "🚨 INCIDENT MODE ACTIVE: " + INCIDENT_REASON;
    return;
  }

  let text = "";

  switch (STATE) {

    case "OBSERVE":
      text = "System im Beobachtungsmodus.";
      break;

    case "CONNECT":
      text = "System analysiert Verbindungen.";
      break;

    case "STRUCTURE":
      text = "System strukturiert Daten.";
      break;

    case "REFLECT":
      text = "System führt Selbstanalyse durch.";
      break;
  }

  aiOutput.innerText = text;
}

// =========================
// INIT
// =========================

function init() {
  syncState();
  render();
  updateAI();
}

// =========================
// BOOT
// =========================

init();
