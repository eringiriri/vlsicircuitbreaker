'use strict';

// ── Map boundaries (normalized 0-1) ──────────────────────────────────────────
const MAP_TL = { x: 0.159, y: 0.153 };
const MAP_BR = { x: 0.841, y: 0.848 };

// Outer boundary as a polygon (clockwise)
const MAP_POLY = [
  { x: MAP_TL.x, y: MAP_TL.y },
  { x: MAP_BR.x, y: MAP_TL.y },
  { x: MAP_BR.x, y: MAP_BR.y },
  { x: MAP_TL.x, y: MAP_BR.y },
];

// ── Wall polygons per level ───────────────────────────────────────────────────
const WALLS = {
  1: [
    [[0.18,0.155],[0.18,0.583],[0.307,0.583],[0.307,0.154]],
    [[0.321,0.154],[0.321,0.477],[0.382,0.477],[0.382,0.154]],
    [[0.396,0.154],[0.396,0.379],[0.429,0.379],[0.429,0.155]],
    [[0.443,0.155],[0.443,0.378],[0.477,0.378],[0.477,0.154]],
    [[0.491,0.154],[0.491,0.379],[0.525,0.379],[0.525,0.155]],
    [[0.538,0.155],[0.538,0.308],[0.585,0.308],[0.585,0.155]],
    [[0.597,0.155],[0.597,0.308],[0.645,0.308],[0.645,0.155]],
    [[0.66,0.155],[0.66,0.255],[0.73,0.255],[0.73,0.154]],
    [[0.692,0.311],[0.692,0.373],[0.584,0.376],[0.584,0.452],[0.838,0.452],[0.838,0.31]],
    [[0.343,0.544],[0.343,0.639],[0.398,0.639],[0.398,0.544]],
    [[0.302,0.7],[0.302,0.846],[0.434,0.846],[0.434,0.7]],
    [[0.451,0.435],[0.451,0.847],[0.569,0.847],[0.569,0.436]],
    [[0.587,0.477],[0.587,0.846],[0.705,0.846],[0.705,0.477]],
    [[0.721,0.477],[0.721,0.846],[0.838,0.846],[0.838,0.475]],
  ],
  2: [
    [[0.162,0.152],[0.163,0.645],[0.249,0.643],[0.252,0.275],[0.375,0.275],[0.375,0.35],[0.416,0.35],[0.416,0.157]],
    [[0.313,0.36],[0.313,0.844],[0.442,0.844],[0.442,0.419],[0.349,0.415],[0.348,0.36]],
    [[0.458,0.238],[0.458,0.844],[0.515,0.844],[0.515,0.238]],
    [[0.555,0.156],[0.555,0.454],[0.541,0.458],[0.538,0.551],[0.685,0.551],[0.688,0.46],[0.725,0.456],[0.728,0.309],[0.757,0.303],[0.759,0.157]],
    [[0.552,0.635],[0.552,0.786],[0.695,0.787],[0.695,0.633]],
    [[0.776,0.36],[0.776,0.455],[0.839,0.455],[0.839,0.358]],
    [[0.739,0.517],[0.739,0.679],[0.801,0.681],[0.801,0.514]],
    [[0.739,0.749],[0.739,0.846],[0.839,0.846],[0.838,0.747]],
  ],
  3: [
    [[0.299,0.153],[0.299,0.245],[0.372,0.249],[0.375,0.343],[0.465,0.344],[0.465,0.247],[0.448,0.242],[0.446,0.154]],
    [[0.163,0.298],[0.163,0.715],[0.328,0.715],[0.331,0.578],[0.499,0.578],[0.502,0.771],[0.567,0.771],[0.568,0.564],[0.649,0.564],[0.649,0.473],[0.574,0.468],[0.572,0.247],[0.501,0.247],[0.501,0.403],[0.329,0.403],[0.328,0.299]],
    [[0.365,0.674],[0.365,0.846],[0.436,0.846],[0.436,0.674]],
    [[0.615,0.154],[0.615,0.383],[0.839,0.383],[0.839,0.155]],
    [[0.698,0.429],[0.698,0.561],[0.839,0.561],[0.839,0.43]],
    [[0.613,0.649],[0.613,0.845],[0.839,0.845],[0.839,0.649]],
  ],
  4: [
    [[0.162,0.154],[0.162,0.593],[0.305,0.595],[0.307,0.654],[0.419,0.658],[0.421,0.78],[0.54,0.78],[0.542,0.658],[0.69,0.653],[0.69,0.559],[0.542,0.552],[0.54,0.489],[0.324,0.484],[0.322,0.154]],
    [[0.276,0.728],[0.276,0.846],[0.381,0.846],[0.381,0.73]],
    [[0.352,0.22],[0.352,0.298],[0.368,0.302],[0.369,0.434],[0.421,0.434],[0.422,0.41],[0.576,0.41],[0.576,0.478],[0.735,0.48],[0.736,0.715],[0.578,0.718],[0.578,0.847],[0.837,0.847],[0.837,0.397],[0.78,0.397],[0.779,0.427],[0.763,0.427],[0.761,0.374],[0.687,0.369],[0.687,0.23],[0.643,0.23],[0.643,0.371],[0.624,0.371],[0.623,0.315],[0.422,0.313],[0.421,0.22]],
    [[0.46,0.154],[0.46,0.263],[0.596,0.261],[0.597,0.154]],
    [[0.723,0.154],[0.723,0.262],[0.778,0.262],[0.778,0.155]],
  ],
  5: [
    [[0.254,0.156],[0.253,0.436],[0.195,0.439],[0.195,0.514],[0.253,0.515],[0.255,0.701],[0.337,0.704],[0.339,0.788],[0.372,0.787],[0.372,0.636],[0.401,0.636],[0.401,0.673],[0.471,0.672],[0.471,0.637],[0.606,0.637],[0.606,0.682],[0.652,0.682],[0.652,0.483],[0.497,0.483],[0.496,0.53],[0.328,0.53],[0.328,0.261],[0.409,0.261],[0.41,0.359],[0.441,0.359],[0.441,0.244],[0.531,0.244],[0.532,0.305],[0.577,0.305],[0.577,0.255],[0.605,0.253],[0.605,0.154]],
    [[0.163,0.58],[0.163,0.635],[0.219,0.635],[0.219,0.581]],
    [[0.232,0.761],[0.232,0.844],[0.305,0.846],[0.305,0.761]],
    [[0.383,0.413],[0.383,0.493],[0.461,0.493],[0.461,0.414]],
    [[0.417,0.744],[0.417,0.846],[0.654,0.846],[0.654,0.744],[0.552,0.743],[0.55,0.704],[0.497,0.704],[0.495,0.742],[0.417,0.745]],
    [[0.482,0.301],[0.482,0.431],[0.561,0.431],[0.561,0.368],[0.511,0.364],[0.509,0.302]],
    [[0.658,0.199],[0.657,0.366],[0.578,0.368],[0.578,0.432],[0.75,0.434],[0.75,0.495],[0.694,0.496],[0.694,0.845],[0.742,0.845],[0.743,0.646],[0.763,0.644],[0.764,0.555],[0.805,0.554],[0.805,0.435],[0.788,0.432],[0.787,0.368],[0.707,0.367],[0.706,0.199]],
    [[0.754,0.155],[0.753,0.22],[0.775,0.22],[0.775,0.155]],
    [[0.818,0.259],[0.818,0.327],[0.838,0.325],[0.838,0.258]],
    [[0.808,0.616],[0.809,0.707],[0.838,0.706],[0.838,0.616]],
  ],
  6: [
    [[0.232,0.155],[0.232,0.218],[0.254,0.218],[0.254,0.154]],
    [[0.225,0.281],[0.224,0.328],[0.162,0.331],[0.162,0.515],[0.214,0.515],[0.214,0.425],[0.247,0.422],[0.247,0.281]],
    [[0.163,0.572],[0.163,0.847],[0.273,0.847],[0.273,0.758],[0.205,0.757],[0.205,0.622],[0.216,0.621],[0.216,0.572]],
    [[0.24,0.648],[0.24,0.715],[0.261,0.715],[0.261,0.649]],
    [[0.301,0.154],[0.3,0.249],[0.284,0.251],[0.284,0.327],[0.3,0.331],[0.3,0.47],[0.251,0.472],[0.251,0.563],[0.299,0.563],[0.3,0.537],[0.324,0.539],[0.324,0.603],[0.298,0.605],[0.298,0.697],[0.324,0.7],[0.325,0.806],[0.499,0.806],[0.499,0.758],[0.377,0.755],[0.377,0.598],[0.425,0.596],[0.425,0.543],[0.377,0.541],[0.375,0.458],[0.354,0.455],[0.354,0.253],[0.392,0.25],[0.392,0.155]],
    [[0.375,0.339],[0.375,0.407],[0.396,0.407],[0.396,0.339]],
    [[0.453,0.154],[0.453,0.225],[0.474,0.223],[0.474,0.155]],
    [[0.454,0.282],[0.452,0.341],[0.425,0.344],[0.425,0.423],[0.599,0.426],[0.599,0.511],[0.525,0.514],[0.524,0.65],[0.422,0.653],[0.422,0.71],[0.536,0.713],[0.537,0.846],[0.838,0.846],[0.838,0.747],[0.755,0.746],[0.754,0.696],[0.647,0.695],[0.646,0.745],[0.591,0.745],[0.59,0.653],[0.57,0.65],[0.57,0.598],[0.651,0.596],[0.653,0.342],[0.666,0.34],[0.665,0.216],[0.629,0.216],[0.628,0.342],[0.478,0.342],[0.477,0.282]],
    [[0.464,0.477],[0.464,0.616],[0.485,0.615],[0.485,0.477]],
    [[0.51,0.164],[0.51,0.286],[0.589,0.286],[0.589,0.165]],
    [[0.698,0.155],[0.697,0.577],[0.681,0.58],[0.681,0.629],[0.747,0.627],[0.749,0.559],[0.796,0.556],[0.797,0.458],[0.749,0.456],[0.749,0.154]],
    [[0.779,0.319],[0.779,0.402],[0.838,0.401],[0.838,0.319]],
    [[0.784,0.615],[0.784,0.696],[0.837,0.695],[0.837,0.615]],
  ],
};

// ── Port candidates per level ─────────────────────────────────────────────────
// Each entry: { min: {x,y}, max: {x,y} }  (positions on map edge)
const PORT_CANDIDATES = {
  1: [
    { min:{x:0.169,y:0.613}, max:{x:0.169,y:0.816} },
    { min:{x:0.179,y:0.837}, max:{x:0.284,y:0.837} },
    { min:{x:0.833,y:0.181}, max:{x:0.833,y:0.277} },
    { min:{x:0.751,y:0.163}, max:{x:0.823,y:0.163} },
  ],
  2: [
    { min:{x:0.169,y:0.673}, max:{x:0.169,y:0.818} },
    { min:{x:0.18,y:0.838},  max:{x:0.297,y:0.838} },
    { min:{x:0.832,y:0.181}, max:{x:0.832,y:0.324} },
    { min:{x:0.778,y:0.16},  max:{x:0.821,y:0.16}  },
  ],
  3: [
    { min:{x:0.166,y:0.182}, max:{x:0.166,y:0.263} },
    { min:{x:0.166,y:0.745}, max:{x:0.166,y:0.816} },
    { min:{x:0.18,y:0.837},  max:{x:0.31,y:0.837}  },
    { min:{x:0.184,y:0.164}, max:{x:0.277,y:0.164} },
  ],
  4: [
    { min:{x:0.169,y:0.628}, max:{x:0.169,y:0.817} },
    { min:{x:0.183,y:0.838}, max:{x:0.259,y:0.838} },
    { min:{x:0.833,y:0.186}, max:{x:0.833,y:0.359} },
    { min:{x:0.797,y:0.161}, max:{x:0.819,y:0.161} },
  ],
  5: [
    { min:{x:0.832,y:0.742}, max:{x:0.832,y:0.811} },
    { min:{x:0.761,y:0.839}, max:{x:0.821,y:0.839} },
    { min:{x:0.169,y:0.184}, max:{x:0.169,y:0.383} },
    { min:{x:0.184,y:0.162}, max:{x:0.234,y:0.162} },
  ],
  6: [
    { min:{x:0.167,y:0.183}, max:{x:0.167,y:0.3}   },
    { min:{x:0.18,y:0.162},  max:{x:0.214,y:0.162} },
    { min:{x:0.833,y:0.186}, max:{x:0.833,y:0.282} },
    { min:{x:0.768,y:0.161}, max:{x:0.82,y:0.161}  },
  ],
};

// ── Speeds (normalized per frame at 60fps) ───────────────────────────────────
const SPEEDS = {
  beginner: 0.00085,
  easy:     0.002,
  medium:   0.004,
  hard:     0.006,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function rand(a, b) { return a + Math.random() * (b - a); }

function ptInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

function ptInPolyObj(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x, yi = poly[i].y;
    const xj = poly[j].x, yj = poly[j].y;
    if (((yi > py) !== (yj > py)) && (px < (xj - xi) * (py - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

function dist(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

// ── Port helper ───────────────────────────────────────────────────────────────
function pickPort(cand) {
  const p = {
    x: rand(cand.min.x, cand.max.x),
    y: rand(cand.min.y, cand.max.y),
  };
  // Determine heading from which edge it's on
  const left  = Math.abs(p.x - MAP_TL.x);
  const right = Math.abs(p.x - MAP_BR.x);
  const top   = Math.abs(p.y - MAP_TL.y);
  const bot   = Math.abs(p.y - MAP_BR.y);
  const minD  = Math.min(left, right, top, bot);
  if (minD === left)       p.heading = 0;   // left edge  → move right (inward)
  else if (minD === right) p.heading = 180; // right edge → move left  (inward)
  else if (minD === top)   p.heading = 270; // top edge   → move down  (inward)
  else                     p.heading = 90;  // bottom edge→ move up    (inward)
  return p;
}

function selectPorts(level) {
  const cands = PORT_CANDIDATES[level];
  const startIdx = Math.floor(Math.random() * cands.length);
  // finish = farthest candidate
  let finIdx = 0, maxD = -1;
  const sp = { x: (cands[startIdx].min.x + cands[startIdx].max.x) / 2,
               y: (cands[startIdx].min.y + cands[startIdx].max.y) / 2 };
  for (let i = 0; i < cands.length; i++) {
    if (i === startIdx) continue;
    const fp = { x: (cands[i].min.x + cands[i].max.x) / 2,
                 y: (cands[i].min.y + cands[i].max.y) / 2 };
    const d = dist(sp, fp);
    if (d > maxD) { maxD = d; finIdx = i; }
  }
  return { start: pickPort(cands[startIdx]), finish: pickPort(cands[finIdx]) };
}

// ── Direction to dx/dy ────────────────────────────────────────────────────────
const DIR = {
  0:   { dx: 1,  dy: 0  }, // right
  90:  { dx: 0,  dy: -1 }, // up   (canvas y inverted)
  180: { dx: -1, dy: 0  }, // left
  270: { dx: 0,  dy: 1  }, // down
};

function headingToDir(h) {
  // Port heading points inward; that's the initial movement direction
  return h;
}

// ── Canvas setup ──────────────────────────────────────────────────────────────
const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
const overlay     = document.getElementById('overlay');
const overlayMsg  = document.getElementById('overlay-msg');
const overlaySub  = document.getElementById('overlay-sub');
const statusEl    = document.getElementById('status');

const CANVAS_SIZE = Math.min(window.innerWidth - 32, 680);
canvas.width  = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// ── Game state ────────────────────────────────────────────────────────────────
let state = 'idle'; // idle | running | dead | win
let level = 1;
let speed = SPEEDS.medium; // normalized per frame
let startPort, finishPort;
let curDir; // 0,90,180,270
let nextDir;
let head; // {x,y} normalized
let tail = [];
const TAIL_SEGMENT_LEN = 0.005; // normalized distance between tail segments
const CURSOR_HALF = 0.006; // collision half-size
const FINISH_RADIUS = 0.025;
const PORT_DISPLAY_HALF = 0.012;

let lastTime = null;
let animId   = null;

// ── UI bindings ───────────────────────────────────────────────────────────────
document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-reset').addEventListener('click', resetGame);
document.getElementById('sel-level').addEventListener('change', e => { level = +e.target.value; });
document.getElementById('sel-diff').addEventListener('change', e => { speed = SPEEDS[e.target.value]; });

document.addEventListener('keydown', e => {
  if (state !== 'running') return;
  switch (e.key) {
    case 'ArrowRight': if (curDir !== 180) nextDir = 0;   break;
    case 'ArrowUp':    if (curDir !== 270) nextDir = 90;  break;
    case 'ArrowLeft':  if (curDir !== 0)   nextDir = 180; break;
    case 'ArrowDown':  if (curDir !== 90)  nextDir = 270; break;
  }
  if (['ArrowRight','ArrowLeft','ArrowUp','ArrowDown'].includes(e.key)) e.preventDefault();
});

// ── Start / reset ─────────────────────────────────────────────────────────────
function startGame() {
  if (animId) cancelAnimationFrame(animId);
  level = +document.getElementById('sel-level').value;
  speed = SPEEDS[document.getElementById('sel-diff').value];

  const ports = selectPorts(level);
  startPort  = ports.start;
  finishPort = ports.finish;

  head   = { x: startPort.x, y: startPort.y };
  curDir = headingToDir(startPort.heading);
  nextDir = curDir;
  tail   = [];
  state  = 'running';
  lastTime = null;

  overlay.classList.add('hidden');
  setStatus('Navigate to FINISH port');
  animId = requestAnimationFrame(loop);
}

function resetGame() {
  if (animId) { cancelAnimationFrame(animId); animId = null; }
  state = 'idle';
  overlayMsg.textContent = 'CIRCUIT BREAKER';
  overlaySub.textContent = 'Select level & difficulty, then press START';
  overlay.classList.remove('hidden');
  setStatus('Press START to begin');
  drawStatic();
}

function setStatus(msg) { statusEl.textContent = msg; }

// ── Game loop ─────────────────────────────────────────────────────────────────
function loop(ts) {
  if (!lastTime) lastTime = ts;
  const dtMs = Math.min(ts - lastTime, 50); // cap at 50ms
  lastTime = ts;

  const dtSec = dtMs / 1000;
  const frameDelta = dtSec * 60; // normalize to 60fps units

  update(frameDelta);
  draw();

  if (state === 'running') animId = requestAnimationFrame(loop);
}

function update(frameDelta) {
  // Apply queued direction
  curDir = nextDir;

  const d = DIR[curDir];
  const moveN = speed * frameDelta; // normalized distance this frame

  const prevHead = { x: head.x, y: head.y };
  head.x += d.dx * moveN;
  head.y += d.dy * moveN;

  // Push tail segment if far enough from last
  if (tail.length === 0 || dist(prevHead, tail[tail.length - 1]) >= TAIL_SEGMENT_LEN) {
    tail.push({ x: prevHead.x, y: prevHead.y });
  }
  // Remove very old tail segments (keep last N relevant ones)
  const maxTail = 2000;
  if (tail.length > maxTail) tail.splice(0, tail.length - maxTail);

  // Check finish first (win)
  if (dist(head, finishPort) < FINISH_RADIUS) {
    state = 'win';
    overlayMsg.textContent = '✓ HACKED';
    overlaySub.textContent = 'Press START to play again';
    overlay.classList.remove('hidden');
    setStatus('System breached!');
    return;
  }

  // Collision checks
  if (checkCollision()) {
    state = 'dead';
    overlayMsg.textContent = '✗ DETECTED';
    overlaySub.textContent = 'Press START to retry';
    overlay.classList.remove('hidden');
    setStatus('Connection terminated');
  }
}

// Returns true if collision detected
function checkCollision() {
  // Sample points around head
  const pts = [
    { x: head.x, y: head.y },
    { x: head.x + CURSOR_HALF, y: head.y },
    { x: head.x - CURSOR_HALF, y: head.y },
    { x: head.x, y: head.y + CURSOR_HALF },
    { x: head.x, y: head.y - CURSOR_HALF },
  ];

  const walls = WALLS[level];

  for (const pt of pts) {
    // Out of map boundary
    if (!ptInPolyObj(pt.x, pt.y, MAP_POLY)) return true;

    // In a wall polygon
    for (const wall of walls) {
      if (ptInPoly(pt.x, pt.y, wall)) return true;
    }
  }

  // Self collision (skip recent tail to avoid false positives near head)
  const skipRecent = 20;
  if (tail.length > skipRecent) {
    for (let i = 0; i < tail.length - skipRecent; i++) {
      if (dist(head, tail[i]) < CURSOR_HALF * 2) return true;
    }
  }

  // Hit start port (not allowed after leaving it)
  if (tail.length > 40 && dist(head, startPort) < PORT_DISPLAY_HALF) return true;

  return false;
}

// ── Drawing ───────────────────────────────────────────────────────────────────
function n2c(nx) { return nx * CANVAS_SIZE; } // normalized → canvas pixels

function drawStatic() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  drawBackground();
  if (startPort)  drawPort(startPort,  '#00ff88', 'S');
  if (finishPort) drawPort(finishPort, '#ff4444', 'F');
}

function draw() {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  drawBackground();
  drawTail();
  drawHead();
  drawPort(startPort,  '#00ff88', 'S');
  drawPort(finishPort, '#ff4444', 'F');
}

function drawBackground() {
  // Dark fill
  ctx.fillStyle = '#090d12';
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // Map boundary (lighter area)
  ctx.fillStyle = '#0d1520';
  ctx.beginPath();
  ctx.rect(n2c(MAP_TL.x), n2c(MAP_TL.y), n2c(MAP_BR.x - MAP_TL.x), n2c(MAP_BR.y - MAP_TL.y));
  ctx.fill();

  // Map border
  ctx.strokeStyle = '#1a4a6a';
  ctx.lineWidth = 2;
  ctx.strokeRect(n2c(MAP_TL.x), n2c(MAP_TL.y), n2c(MAP_BR.x - MAP_TL.x), n2c(MAP_BR.y - MAP_TL.y));

  // Wall polygons
  if (!WALLS[level]) return;
  ctx.fillStyle = '#1a3050';
  ctx.strokeStyle = '#2a5080';
  ctx.lineWidth = 1;
  for (const wall of WALLS[level]) {
    ctx.beginPath();
    ctx.moveTo(n2c(wall[0][0]), n2c(wall[0][1]));
    for (let i = 1; i < wall.length; i++) ctx.lineTo(n2c(wall[i][0]), n2c(wall[i][1]));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Grid dots (subtle)
  ctx.fillStyle = '#1a2a3a44';
  const step = 0.05;
  for (let gx = MAP_TL.x; gx <= MAP_BR.x; gx += step) {
    for (let gy = MAP_TL.y; gy <= MAP_BR.y; gy += step) {
      ctx.fillRect(n2c(gx) - 0.5, n2c(gy) - 0.5, 1, 1);
    }
  }
}

function drawTail() {
  if (tail.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(n2c(tail[0].x), n2c(tail[0].y));
  for (let i = 1; i < tail.length; i++) {
    ctx.lineTo(n2c(tail[i].x), n2c(tail[i].y));
  }
  ctx.lineTo(n2c(head.x), n2c(head.y));
  ctx.strokeStyle = '#00ffcc55';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();

  // Bright recent portion
  const recentStart = Math.max(0, tail.length - 30);
  ctx.beginPath();
  ctx.moveTo(n2c(tail[recentStart].x), n2c(tail[recentStart].y));
  for (let i = recentStart + 1; i < tail.length; i++) {
    ctx.lineTo(n2c(tail[i].x), n2c(tail[i].y));
  }
  ctx.lineTo(n2c(head.x), n2c(head.y));
  ctx.strokeStyle = '#00ffcccc';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawHead() {
  const cx = n2c(head.x);
  const cy = n2c(head.y);
  const r  = n2c(CURSOR_HALF);

  ctx.shadowColor = '#00ffcc';
  ctx.shadowBlur  = 10;
  ctx.fillStyle   = '#00ffcc';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur  = 0;
}

function drawPort(port, color, label) {
  const cx = n2c(port.x);
  const cy = n2c(port.y);
  const r  = n2c(PORT_DISPLAY_HALF);

  ctx.shadowColor = color;
  ctx.shadowBlur  = 12;
  ctx.strokeStyle = color;
  ctx.lineWidth   = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = color + '44';
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.fillStyle   = color;
  ctx.font        = `bold ${Math.round(r * 1.4)}px Courier New`;
  ctx.textAlign   = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, cx, cy);
}

// ── Initial render ────────────────────────────────────────────────────────────
drawBackground();
