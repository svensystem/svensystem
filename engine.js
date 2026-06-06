
// =========================
// SVEN SYSTEM ENGINE v4 (AI READY)
// =========================

let STATE = "OBSERVE";

// -------------------------
// STATE CONTROL
// -------------------------

function setState(newState) {
  STATE = newState;

  syncStateToDOM();
  render();
  runAIFlow(); // 🔥 AI Pipeline startet bei jedem State Wechsel
}

// -------------------------
// STATE → CSS BINDING
// -------------------------

function syncStateToDOM() {
  document.body.setAttribute("data-state", STATE);
}

// -------------------------
// RENDER ENGINE (VISUAL CONTROL)
// -------------------------

function render() {
  const stateDisplay = document.getElementById("state-display");

  const sven = document.getElementById("sven");
  const chatty = document.getElementById("chatty");
  const network = document.getElementById("network");

  if (!stateDisplay || !sven || !chatty || !network) return;

  stateDisplay.innerText = "STATE: " + STATE;

  // RESET VISUALS
  sven.style.opacity = "1";
  chatty.style.opacity = "1";
  chatty.style.transform = "translateY(0px)";
  network.style.opacity = "0.2";

  // MICRO VISUAL STATE FEEDBACK
  if (STATE === "CONNECT") {
    chatty.style.transform = "translateY(-10px)";
  }

  if (STATE === "STRUCTURE") {
    sven.style.transform = "scale(1.05)";
  }

  if (STATE === "REFLECT") {
    sven.style.opacity = "0.6";
    chatty.style.opacity = "0.5";
  }
}

// -------------------------
// AI PIPELINE (ARCHITECTURE ONLY)
// -------------------------

function runAIFlow() {

  const prompt = buildPrompt(STATE);

  const fakeResponse = simulateAI(prompt);

  renderAIOutput(fakeResponse);
}

// -------------------------
// PROMPT BUILDER (STATE → KI INPUT)
// -------------------------

function buildPrompt(state) {

  if (state === "OBSERVE") {
    return "Beschreibe das System im Beobachtungsmodus.";
  }

  if (state === "CONNECT") {
    return "Analysiere aktive Verbindungen im System.";
  }

  if (state === "STRUCTURE") {
    return "Erkenne Muster und strukturelle Ordnung im System.";
  }

  if (state === "REFLECT") {
    return "Bewerte den aktuellen Systemzustand kritisch und reduzierend.";
  }

  return "Beschreibe Systemzustand.";
}

// -------------------------
// AI HANDLER (SIMULATION – NO REAL API YET)
// -------------------------

function simulateAI(prompt) {

  return "AI RESPONSE: " + prompt;
}

// -------------------------
// OUTPUT RENDERER
// -------------------------

function renderAIOutput(text) {

  const aiOutput = document.getElementById("ai-output");

  if (!aiOutput) return;

  aiOutput.innerText = text;
}

// -------------------------
// INIT
// -------------------------

syncStateToDOM();
render();
runAIFlow();
