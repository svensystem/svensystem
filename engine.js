// =========================
// SVEN SYSTEM ENGINE v1.0
// =========================

let STATE = "OBSERVE";

// -------------------------
// STATE CONTROL
// -------------------------

function setState(newState) {
  STATE = newState;
  render();
  updateAI();
}

// -------------------------
// RENDER ENGINE
// -------------------------

function render() {
  const stateDisplay = document.getElementById("state-display");

  const sven = document.getElementById("sven");
  const chatty = document.getElementById("chatty");
  const network = document.getElementById("network");

  if (!stateDisplay || !sven || !chatty || !network) return;

  stateDisplay.innerText = "STATE: " + STATE;

  // RESET
  sven.style.opacity = "1";
  chatty.style.opacity = "1";
  chatty.style.transform = "translateY(0px)";
  network.style.opacity = "0.2";

  // -------------------------
  // STATE LOGIC
  // -------------------------

  if (STATE === "OBSERVE") {
    chatty.style.opacity = "0.6";
    network.style.opacity = "0.3";
  }

  if (STATE === "CONNECT") {
    chatty.style.transform = "translateY(-10px)";
    network.style.opacity = "0.7";
  }

  if (STATE === "STRUCTURE") {
    network.style.opacity = "0.9";
  }

  if (STATE === "REFLECT") {
    sven.style.opacity = "0.6";
    network.style.opacity = "0.15";
  }
}

// -------------------------
// AI FEEDBACK (SIMPLIFIED)
// -------------------------

function updateAI() {
  const aiOutput = document.getElementById("ai-output");

  if (!aiOutput) return;

  let text = "";

  if (STATE === "OBSERVE") {
    text = "System beobachtet Umgebung. Sven ist im Wahrnehmungsmodus.";
  }

  if (STATE === "CONNECT") {
    text = "Netzwerkaktivität steigt. Chatty reagiert auf Verbindungen.";
  }

  if (STATE === "STRUCTURE") {
    text = "System ordnet Muster. Struktur wird stabilisiert.";
  }

  if (STATE === "REFLECT") {
    text = "System reduziert Aktivität. Fokus auf innere Verarbeitung.";
  }

  aiOutput.innerText = text;
}

// -------------------------
// INIT
// -------------------------

render();
updateAI();
