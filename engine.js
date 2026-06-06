// =========================
// SVEN SYSTEM ENGINE v5
// STATE HARDENING IMPLEMENTED
// SINGLE SOURCE OF TRUTH
// =========================

// 🟢 SINGLE SOURCE OF TRUTH
let STATE = "OBSERVE";

// =========================
// PUBLIC STATE CHANGE API
// =========================

function setState(newState) {
  STATE = newState;

  syncState();     // 🔒 enforce single truth everywhere
  render();        // UI update
  updateAI();      // AI update (text only for now)
}

// =========================
// STATE SYNCHRONISATION LAYER
// =========================

function syncState() {
  // 🔒 ONLY PLACE THAT TOUCHES DOM STATE
  document.body.setAttribute("data-state", STATE);
}

// =========================
// RENDER ENGINE (UI ONLY)
// =========================

function render() {
  const stateDisplay = document.getElementById("state-display");
  const sven = document.getElementById("sven");
  const chatty = document.getElementById("chatty");
  const network = document.getElementById("network");

  if (!stateDisplay || !sven || !chatty || !network) return;

  // STATE DISPLAY (READ ONLY)
  stateDisplay.innerText = "STATE: " + STATE;

  // RESET BASE VISUALS
  sven.style.opacity = "1";
  chatty.style.opacity = "1";
  chatty.style.transform = "translateY(0px)";
  network.style.opacity = "0.2";

  // MICRO INTERACTIONS (NO STATE OWNERSHIP HERE)
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
// AI OUTPUT (READ ONLY STATE)
// =========================

function updateAI() {
  const aiOutput = document.getElementById("ai-output");
  if (!aiOutput) return;

  let text = "";

  switch (STATE) {
    case "OBSERVE":
      text = "System im Beobachtungsmodus. Daten werden erfasst.";
      break;

    case "CONNECT":
      text = "System verbindet aktive Knoten und Beziehungen.";
      break;

    case "STRUCTURE":
      text = "System analysiert und strukturiert Informationsmuster.";
      break;

    case "REFLECT":
      text = "System reduziert Aktivität und führt Selbstanalyse durch.";
      break;

    default:
      text = "Unbekannter Systemzustand.";
  }

  aiOutput.innerText = text;
}

// =========================
// INIT (BOOT SEQUENCE)
// =========================

function init() {
  syncState();   // 🔒 enforce truth on load
  render();
  updateAI();
}

// =========================
// BOOT SYSTEM
// =========================

init();
