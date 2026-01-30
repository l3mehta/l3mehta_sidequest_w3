// song1.js
// One round: pick a song -> randomized win/lose + message -> go to win/lose
// SELF-CONTAINED (includes drawButton()).
// Requires only: isHover() from main.js

// Message shown on win/lose screen
if (typeof window.resultMessage === "undefined") window.resultMessage = "";

// ------------------------------------------------------------
// Random song pool
// ------------------------------------------------------------
const ALL_SONGS = [
  "Sunrise Pop Hit",
  "Late Night Indie",
  "Throwback Remix",
  "Chill Morning Acoustic",
  "Top 40 Anthem",
  "Experimental Electronic",
  "Soft Piano Ballad",
  "Summer Dance Track",
  "Lo-fi Coffee Beats",
];

// ------------------------------------------------------------
// Utility: shuffle (uses Math.random so it works anytime)
// ------------------------------------------------------------
function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ------------------------------------------------------------
// These options are rebuilt each time setupSong1() runs
// ------------------------------------------------------------
let SONG_OPTIONS = [];

// Call this from start.js every time the game starts
function setupSong1() {
  // Pick 3 random song titles
  const pickedTitles = shuffleArray([...ALL_SONGS]).slice(0, 3);

  // Randomize which reaction/outcome each song gets
  const outcomes = shuffleArray([
    { reaction: "Everyone liked that!", outcome: "win" },
    { reaction: "Some people liked that!", outcome: "win" },
    { reaction: "No one liked that.", outcome: "lose" },
  ]);

  // Build the final button list
  SONG_OPTIONS = pickedTitles.map((title, i) => ({
    title,
    reaction: outcomes[i].reaction,
    outcome: outcomes[i].outcome,
  }));
}

// Safety: if someone lands on song1 without pressing start
setupSong1();

// ------------------------------------------------------------
// Draw screen
// ------------------------------------------------------------
function drawSong1() {
  background(180, 225, 220);

  fill(30, 50, 60);
  textAlign(CENTER, CENTER);

  textSize(40);
  text("Morning Radio Host", width / 2, 140);

  textSize(22);
  text("Pick the next song to play", width / 2, 210);

  const btnW = 520;
  const btnH = 78;

  const btn1 = {
    x: width / 2,
    y: 350,
    w: btnW,
    h: btnH,
    label: SONG_OPTIONS[0].title,
  };
  const btn2 = {
    x: width / 2,
    y: 455,
    w: btnW,
    h: btnH,
    label: SONG_OPTIONS[1].title,
  };
  const btn3 = {
    x: width / 2,
    y: 560,
    w: btnW,
    h: btnH,
    label: SONG_OPTIONS[2].title,
  };

  drawButton(btn1);
  drawButton(btn2);
  drawButton(btn3);

  fill(40, 60, 70);
  textSize(16);
  text("The audience reaction is unpredictable 📻", width / 2, 640);

  const over = isHover(btn1) || isHover(btn2) || isHover(btn3);
  cursor(over ? HAND : ARROW);
}

// ------------------------------------------------------------
// Mouse input
// ------------------------------------------------------------
function song1MousePressed() {
  const btnW = 520;
  const btnH = 78;

  const btns = [
    { x: width / 2, y: 350, w: btnW, h: btnH },
    { x: width / 2, y: 455, w: btnW, h: btnH },
    { x: width / 2, y: 560, w: btnW, h: btnH },
  ];

  for (let i = 0; i < btns.length; i++) {
    if (isHover(btns[i])) {
      const chosen = SONG_OPTIONS[i];
      window.resultMessage = `You played "${chosen.title}". ${chosen.reaction}`;
      currentScreen = chosen.outcome;
      return;
    }
  }
}

// Optional keyboard shortcuts (1/2/3)
function song1KeyPressed() {
  if (key === "1") chooseSong(0);
  if (key === "2") chooseSong(1);
  if (key === "3") chooseSong(2);
}

function chooseSong(index) {
  const chosen = SONG_OPTIONS[index];
  window.resultMessage = `You played "${chosen.title}". ${chosen.reaction}`;
  currentScreen = chosen.outcome;
}

// ------------------------------------------------------------
// Local helper: drawButton() (same style as start screen)
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
