// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawStart() → what the start/menu screen looks like
// 2) input handlers → what happens on click / key press on this screen
// 3) a helper function to draw menu buttons

// ------------------------------------------------------------
// Start screen visuals
// ------------------------------------------------------------
// drawStart() is called from main.js only when:
// currentScreen === "start"
function drawStart() {
  // Background colour for the start screen
  background(180, 225, 220); // soft teal background

  // ---- Title text ----
  fill(30, 50, 60);
  textSize(44);
  textAlign(CENTER, CENTER);
  text("Morning Radio Host", width / 2, 170);

  // ---- Subtitle ----
  textSize(20);
  text(
    "Click START SHOW to begin.\nChoose songs that listeners will like!",
    width / 2,
    240,
  );

  // ---- Buttons (data only) ----
  const startBtn = {
    x: width / 2,
    y: 340,
    w: 260,
    h: 80,
    label: "START SHOW",
  };

  const instrBtn = {
    x: width / 2,
    y: 450,
    w: 260,
    h: 80,
    label: "INSTRUCTIONS",
  };

  // Draw both buttons
  drawButton(startBtn);
  drawButton(instrBtn);

  // ---- Cursor feedback ----
  const over = isHover(startBtn) || isHover(instrBtn);
  cursor(over ? HAND : ARROW);
}

// ------------------------------------------------------------
// Mouse input for the start screen
// ------------------------------------------------------------
// Called from main.js only when currentScreen === "start"
function startMousePressed() {
  const startBtn = { x: width / 2, y: 340, w: 260, h: 80 };
  const instrBtn = { x: width / 2, y: 450, w: 260, h: 80 };

  // If START SHOW is clicked, randomize song screen then go to song1
  if (isHover(startBtn)) {
    window.resultMessage = ""; // clear last run's message (optional)
    setupSong1(); // 🔀 randomize songs + outcomes each run
    currentScreen = "song1";
  }
  // If INSTRUCTIONS is clicked, go to the instructions screen
  else if (isHover(instrBtn)) {
    currentScreen = "instr";
  }
}

// ------------------------------------------------------------
// Keyboard input for the start screen
// ------------------------------------------------------------
function startKeyPressed() {
  if (keyCode === ENTER) {
    window.resultMessage = "";
    setupSong1(); // 🔀 randomize songs + outcomes each run
    currentScreen = "song1";
  }

  if (key === "i" || key === "I") {
    currentScreen = "instr";
  }
}

// ------------------------------------------------------------
// Helper: drawButton()
// ------------------------------------------------------------
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  const hover = isHover({ x, y, w, h });

  noStroke();

  if (hover) {
    fill(255, 200, 150, 220);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 180, 120);
  } else {
    fill(255, 240, 210, 210);
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(220, 220, 220);
  }

  rect(x, y, w, h, 14);

  drawingContext.shadowBlur = 0;

  fill(40, 60, 70);
  textSize(26);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
