// =========================
// SVEN SYSTEM ENGINE v10
// VISUAL CONTROL ROOM EVOLUTION
// =========================

// 🧠 SINGLE SOURCE OF TRUTH
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

  syncState();
  render();
  updateAI();
  applyVisualState(); // 🔥 VISUAL LAYER
}

// =========================
// CORE SYNC
// =========================

function syncState() {
  document.body.setAttribute("data-state", STATE);
}

// =========================
// VISUAL STATE LAYER (NEU)
// =========================

function applyVisualState() {

  const body = document.body;

  // RESET VISUAL FLAGS
  body.style.transition = "all 0.6s ease";

  if (STATE === "OBSERVE") {
    body.style.filter = "brightness(0.9) saturate(0.8)";
  }

  if (STATE === "CONNECT") {
    body.style.filter = "brightness(1.2) saturate(1.6)";
  }

  if (STATE === "STRUCTURE") {
    body.style.filter = "contrast(1.3) saturate(1.1)";
  }

  if (STATE === "REFLECT") {
    body.style.filter = "brightness(0.7) grayscale(0.8)";
  }
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

  syncState();
  render();
  updateAI();
  applyVisualState();
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

  // STATE VISUAL MICRO BEHAVIOR
  if (STATE === "CONNECT") {
    chatty.style.transform = "translateY(-12px)";
    network.style.opacity = "0.6";
  }

  if (STATE === "STRUCTURE") {
    sven.style.transform = "scale(1.08)";
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
      aiOutput.innerText = "System beobachtet stabil.";
      break;

    case "CONNECT":
      aiOutput.innerText = "System verbindet aktive Strukturen.";
      break;

    case "STRUCTURE":
      aiOutput.innerText = "System analysiert Ordnungsmuster.";
      break;

    case "REFLECT":
      aiOutput.innerText = "System reduziert und analysiert intern.";
      break;
  }
}

// =========================
// INIT
// =========================

function init() {
  syncState();
  render();
  updateAI();
  applyVisualState(); // 🔥 INITIAL VISUAL SYNC
}

init();
