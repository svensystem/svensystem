// =========================
// SVEN SYSTEM ENGINE v3 (FIXED)
// =========================

let STATE = "OBSERVE";

// -------------------------
// STATE CONTROL
// -------------------------

function setState(newState) {
  STATE = newState;

  syncStateToDOM();   // 🔥 FIX: verbindet CSS
  render();
  updateAI();
}

// -------------------------
// CRITICAL FIX: STATE → CSS LINK
// -------------------------

function syncStateToDOM() {
  document.body.setAttribute("data-state", STATE);
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

  // BASE RESET
  sven.style.opacity = "1";
  chatty.style.opacity = "1";
  chatty.style.transform = "translateY(0px)";
  network.style.opacity = "0.2";

  // OPTIONAL MICRO-FEEDBACK (CSS now handles main visuals)
  if (STATE === "CONNECT") {
    chatty.style.transform = "translateY(-10px)";
  }

  if (STATE === "REFLECT") {
    sven.style.opacity = "0.6";
  }
}

// -------------------------
// AI OUTPUT
// -------------------------

function updateAI() {
  const aiOutput = document.getElementById("ai-output");

  if (!aiOutput) return;

  let text = "";

  if (STATE === "OBSERVE") {
    text = "System im Beobachtungsmodus.";
  }

  if (STATE === "CONNECT") {
    text = "Verbindungen werden aktiv aufgebaut.";
  }

  if (STATE === "STRUCTURE") {
    text = "System strukturiert Datenfluss.";
  }

  if (STATE === "REFLECT") {
    text = "System reduziert Aktivität zur Analyse.";
  }

  aiOutput.innerText = text;
}

// -------------------------
// INIT
// -------------------------

syncStateToDOM(); // 🔥 FIX: initial sync
render();
updateAI();
