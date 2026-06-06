// =========================
// SVEN SYSTEM ENGINE v12
// INCIDENT TEST BUTTON ADDED
// =========================

let STATE = "OBSERVE";

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
  applyVisualState();
}

// =========================
// CORE SYNC
// =========================

function syncState() {
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
  applyIncidentVisual();
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
// VISUAL STATE SYSTEM
// =========================

function applyVisualState() {

  const body = document.body;

  body.style.transition = "all 0.5s ease";

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
// INCIDENT VISUAL SYSTEM
// =========================

function applyIncidentVisual() {

  const stateDisplay = document.getElementById("state-display");
  const body = document.body;

  body.style.filter = "grayscale(0.3) brightness(0.7) contrast(1.5)";

  if (stateDisplay) {
    stateDisplay.innerText = "🚨 INCIDENT ACTIVE";
    stateDisplay.style.color = "red";
  }
}

// =========================
// VISUAL TEST BUTTON (NEU)
// =========================

function addIncidentTestButton() {

  const btn = document.createElement("button");

  btn.innerText = "TRIGGER INCIDENT TEST";
  btn.style.position = "absolute";
  btn.style.top = "10px";
  btn.style.right = "10px";
  btn.style.zIndex = "999";
  btn.style.padding = "10px";
  btn.style.background = "red";
  btn.style.color = "white";

  btn.onclick = () => {
    triggerIncident("MANUAL TEST INCIDENT");
  };

  document.body.appendChild(btn);
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
    stateDisplay.innerText = "🚨 INCIDENT MODE: " + INCIDENT_REASON;
    return;
  }

  stateDisplay.innerText = "STATE: " + STATE;

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
      aiOutput.innerText = "System beobachtet stabil.";
      break;

    case "CONNECT":
      aiOutput.innerText = "System verbindet Strukturen.";
      break;

    case "STRUCTURE":
      aiOutput.innerText = "System organisiert Datenfluss.";
      break;

    case "REFLECT":
      aiOutput.innerText = "System analysiert intern.";
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

  addIncidentTestButton(); // 🔥 NEU: TEST BUTTON
}

init();
