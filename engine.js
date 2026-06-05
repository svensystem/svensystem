let STATE = "OBSERVE";

function setState(newState) {
  STATE = newState;
  render();
}

function render() {

  const stateDisplay = document.getElementById("state-display");
  const network = document.getElementById("network");
  const sven = document.getElementById("sven");
  const chatty = document.getElementById("chatty");
  const ai = document.getElementById("ai-output");

  stateDisplay.innerText = STATE;

  // RESET
  network.style.opacity = 0.2;
  sven.style.opacity = 1;
  chatty.style.opacity = 1;

  if (STATE === "OBSERVE") {
    chatty.style.opacity = 0.6;
    network.style.opacity = 0.3;
    ai.innerText = "System beobachtet…";
  }

  if (STATE === "CONNECT") {
    network.style.opacity = 0.7;
    chatty.style.transform = "translateY(-10px)";
    ai.innerText = "Verbindungen werden aktiviert…";
  }

  if (STATE === "STRUCTURE") {
    network.style.opacity = 0.9;
    ai.innerText = "Strukturen werden erkannt…";
  }

  if (STATE === "REFLECT") {
    sven.style.opacity = 0.6;
    network.style.opacity = 0.15;
    ai.innerText = "System reflektiert Zustand…";
  }
}

render();
