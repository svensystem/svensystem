// =========================
// SVEN SYSTEM ENGINE v9
// UNIFIED STATE CORE + CORE INTEGRITY LOOP
// =========================

// 🧠 UNIFIED STATE CORE (Single Source of Truth)
let STATE = "OBSERVE";

// 🚨 INCIDENT SYSTEM
let INCIDENT_ACTIVE = false;
let INCIDENT_REASON = "";

// =========================
// STATE CONTROL
// =========================

function setState(newState) {

  if (INCIDENT_ACTIVE) return;

  STATE = newState;

  syncCore();
  render();
  updateAI();
}

// =========================
// UNIFIED STATE CORE SYNC
// =========================

function syncCore() {
  document.body.setAttribute("data-state", STATE);
}

// =========================
// INCIDENT SYSTEM
// =========================

function triggerIncident(reason) {

  INCIDENT_ACTIVE = true;
  INCIDENT_REASON = reason;

  document.body.setAttribute("data-state", "INCIDENT");

  render();
  updateAI();
}

function resolveIncident() {

  INCIDENT_ACTIVE = false;
  INCIDENT_REASON = "";

  syncCore();
  render();
  updateAI();
}

// =========================
// CORE INTEGRITY LOOP (NEU)
// =========================

function coreIntegrityLoop() {

  // 🔍 1. STATE CONSISTENCY CHECK
  const domState = document.body.getAttribute("data-state");

  if (!INCIDENT_ACTIVE && domState !== STATE) {
    console.warn("[CORE LOOP] STATE DESYNC detected → fixing");
    syncCore();
  }

  // 🔍 2. INCIDENT VALIDATION
  if (INCIDENT_ACTIVE && STATE !== "OBSERVE") {
    console.warn("[CORE LOOP] Incident active but STATE changed → enforcing lock");
    STATE = "OBSERVE";
    syncCore();
  }

  // 🔍 3. BASIC SYSTEM HEALTH CHECK
  const required = ["state-display", "sven", "chatty", "network", "ai-output"];

  for (const id of required) {
    if (!document.getElementById(id)) {
      console.error("[CORE LOOP] Missing element:", id);
    }
  }
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

  if (INCIDENT_ACTIVE) {
    stateDisplay.innerText = "STATE: INCIDENT MODE";
    return;
  }

  stateDisplay.innerText = "STATE: " + STATE;

  // RESET
  sven.style.opacity = "1";
  chatty.style.opacity = "1";
  chatty.style.transform = "translateY(0px)";
  network.style.opacity = "0.2";

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
// AI OUTPUT
// =========================

function updateAI() {

  const aiOutput = document.getElementById("ai-output");

  if (!aiOutput) return;

  if (INCIDENT_ACTIVE) {
    aiOutput.innerText = "🚨 INCIDENT: " + INCIDENT_REASON;
    return;
  }

  switch (STATE) {

    case "OBSERVE":
      aiOutput.innerText = "System beobachtet Umgebung.";
      break;

    case "CONNECT":
      aiOutput.innerText = "System analysiert Verbindungen.";
      break;

    case "STRUCTURE":
      aiOutput.innerText = "System strukturiert Daten.";
      break;

    case "REFLECT":
      aiOutput.innerText = "System führt Selbstanalyse durch.";
      break;
  }
}

// =========================
// INIT + CORE LOOP START
// =========================

function init() {
  syncCore();
  render();
  updateAI();

  // 🧠 CORE INTEGRITY LOOP (1x pro Sekunde)
  setInterval(coreIntegrityLoop, 1000);
}

// BOOT SYSTEM
init();
