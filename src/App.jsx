import { useState } from "react";

const WEEKS = [
  {
    week: 1, phase: "Base", dates: "Apr 14 – Apr 20",
    days: [
      { day: "Mon", type: "Rest", desc: "Recovery — legs are cooked from 19k", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run, conversational pace", km: 4 },
      { day: "Wed", type: "Rest/XT", desc: "Cycling or rest", km: 0 },
      { day: "Thu", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Fri", type: "Rest/XT", desc: "Cycling or rest", km: 0 },
      { day: "Sat", type: "Easy", desc: "Easy shakeout run", km: 4 },
      { day: "Sun", type: "Long", desc: "Long run — pull back to rebuild", km: 14 },
    ],
    notes: "Deload after yesterday's big effort. Strength work 2x (hip bridges, calf raises, clamshells). Priority: durability."
  },
  {
    week: 2, phase: "Base", dates: "Apr 21 – Apr 27",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Wed", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Thu", type: "Easy", desc: "Easy run w/ 4x strides", km: 5 },
      { day: "Fri", type: "Rest/XT", desc: "Rest or easy cycle", km: 0 },
      { day: "Sat", type: "Easy", desc: "Easy run", km: 4 },
      { day: "Sun", type: "Long", desc: "Long run, easy pace — small bump only", km: 15 },
    ],
    notes: "Building consistency. Only +1km on long run. Keep all easy runs genuinely easy. Strength 2x."
  },
  {
    week: 3, phase: "Base", dates: "Apr 28 – May 4",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Wed", type: "Tempo", desc: "Tempo: 10 min easy, 15 min moderate, 10 min easy", km: 7 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Sat", type: "Rest/XT", desc: "Rest or easy cycle", km: 0 },
      { day: "Sun", type: "Long", desc: "Long run, easy pace", km: 16 },
    ],
    notes: "First tempo session. Don't race it — moderate means you can speak in short sentences."
  },
  {
    week: 4, phase: "Base", dates: "May 5 – May 11",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Wed", type: "Easy", desc: "Easy run w/ strides", km: 5 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 4 },
      { day: "Sat", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Sun", type: "Long", desc: "Cutback long run — recovery week", km: 14 },
    ],
    notes: "⬇ CUTBACK WEEK. Let your body absorb the work. No intensity. Strength 2x still."
  },
  {
    week: 5, phase: "Base", dates: "May 12 – May 18",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Wed", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Thu", type: "Easy", desc: "Easy run w/ strides", km: 6 },
      { day: "Fri", type: "Rest/XT", desc: "Rest or easy cycle", km: 0 },
      { day: "Sat", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Sun", type: "Long", desc: "Long run, easy pace — entering the danger zone slowly", km: 17 },
    ],
    notes: "No tempo this week. Focus on pushing long run past 16km comfortably. Start practicing fueling."
  },
  {
    week: 6, phase: "Base", dates: "May 19 – May 25",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Wed", type: "Tempo", desc: "Tempo: 10 min easy, 20 min moderate, 10 min easy", km: 8 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Sat", type: "Rest/XT", desc: "Rest or easy cycle", km: 0 },
      { day: "Sun", type: "Long", desc: "Long run, easy pace", km: 18 },
    ],
    notes: "Tempo returns. Long run at 18km — monitor calves/hips carefully. Fuel every 30-45 min after 1hr."
  },
  {
    week: 7, phase: "Base", dates: "May 26 – Jun 1",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Wed", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Thu", type: "Easy", desc: "Easy run w/ strides", km: 6 },
      { day: "Fri", type: "Rest/XT", desc: "Rest or easy cycle", km: 0 },
      { day: "Sat", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Sun", type: "Long", desc: "Long run — re-test the distance that broke you down", km: 19 },
    ],
    notes: "Key week. 19km again but after 6 weeks of durability work. No intensity — just see how legs feel."
  },
  {
    week: 8, phase: "Build", dates: "Jun 2 – Jun 8",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Wed", type: "Tempo", desc: "Tempo: 5x 1km at threshold w/ 90s jog recovery", km: 9 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Sat", type: "Easy", desc: "Easy shakeout", km: 4 },
      { day: "Sun", type: "Long", desc: "Long run — first time past previous breakdown point", km: 20 },
    ],
    notes: "Build block begins. 20km long run is the test. If calves/hips hold up here, you're on track."
  },
  {
    week: 9, phase: "Build", dates: "Jun 9 – Jun 15",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Wed", type: "Easy", desc: "Easy run w/ strides", km: 5 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 4 },
      { day: "Sat", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Sun", type: "Long", desc: "Cutback long run", km: 16 },
    ],
    notes: "⬇ CUTBACK WEEK. Essential recovery. Foam roll, sleep well, eat well."
  },
  {
    week: 10, phase: "Build", dates: "Jun 16 – Jun 22",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 7 },
      { day: "Wed", type: "Tempo", desc: "Tempo: 3x 2km at threshold w/ 2 min jog", km: 10 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Sat", type: "Rest/XT", desc: "Rest or easy cycle", km: 0 },
      { day: "Sun", type: "Long", desc: "Long run, easy pace", km: 22 },
    ],
    notes: "Pushing into new long run territory. Still no MP — just tempo + distance."
  },
  {
    week: 11, phase: "Build", dates: "Jun 23 – Jun 29",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 7 },
      { day: "Wed", type: "MP", desc: "Marathon pace: 2km easy, 8km at MP, 2km easy", km: 12 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Sat", type: "Easy", desc: "Easy shakeout", km: 5 },
      { day: "Sun", type: "Long", desc: "Long run, easy pace", km: 24 },
    ],
    notes: "First MP workout. You've earned it — legs should be durable enough now. Respect the pace."
  },
  {
    week: 12, phase: "Build", dates: "Jun 30 – Jul 6",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 7 },
      { day: "Wed", type: "Tempo", desc: "Tempo: 6x 1km at threshold, 90s jog recovery", km: 12 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Sat", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Sun", type: "Long", desc: "Long run w/ last 4km at marathon pace", km: 26 },
    ],
    notes: "MP in the long run for the first time. Teaching legs to hold pace when tired."
  },
  {
    week: 13, phase: "Build", dates: "Jul 7 – Jul 13",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Wed", type: "Easy", desc: "Easy run w/ strides", km: 5 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Sat", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Sun", type: "Long", desc: "Cutback long run", km: 18 },
    ],
    notes: "⬇ CUTBACK WEEK. You've done huge work. Let it soak in."
  },
  {
    week: 14, phase: "Peak", dates: "Jul 14 – Jul 20",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 7 },
      { day: "Wed", type: "MP", desc: "Marathon pace: 2km easy, 10km at MP, 2km easy", km: 14 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Sat", type: "Easy", desc: "Easy shakeout", km: 5 },
      { day: "Sun", type: "Long", desc: "Long run, easy pace", km: 30 },
    ],
    notes: "PEAK WEEK 1. 30km long run. Rehearse race-day fueling exactly."
  },
  {
    week: 15, phase: "Peak", dates: "Jul 21 – Jul 27",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 7 },
      { day: "Wed", type: "Tempo", desc: "5x 2km at threshold, 2 min jog recovery", km: 12 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Sat", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Sun", type: "Long", desc: "Long run w/ last 6km at marathon pace", km: 32 },
    ],
    notes: "PEAK WEEK 2. Marathon pace at the end of a long run = race simulation."
  },
  {
    week: 16, phase: "Peak", dates: "Jul 28 – Aug 3",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 8 },
      { day: "Wed", type: "MP", desc: "Marathon pace: 2km easy, 12km at MP, 2km easy", km: 16 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Sat", type: "Easy", desc: "Easy shakeout", km: 5 },
      { day: "Sun", type: "Long", desc: "Last big long run", km: 34 },
    ],
    notes: "PEAK WEEK 3. Hardest week. After this, it's all downhill into taper."
  },
  {
    week: 17, phase: "Peak", dates: "Aug 4 – Aug 10",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Wed", type: "Easy", desc: "Easy w/ strides", km: 5 },
      { day: "Thu", type: "Rest/XT", desc: "Cycling", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Sat", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Sun", type: "Long", desc: "Cutback long run", km: 20 },
    ],
    notes: "⬇ CUTBACK before taper. Shake off peak fatigue."
  },
  {
    week: 18, phase: "Taper", dates: "Aug 11 – Aug 17",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 6 },
      { day: "Wed", type: "MP", desc: "Marathon pace: 2km easy, 6km at MP, 2km easy", km: 10 },
      { day: "Thu", type: "Rest/XT", desc: "Rest or light cycle", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Sat", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Sun", type: "Long", desc: "Long run, easy", km: 18 },
    ],
    notes: "Taper begins. Volume drops ~40%. You'll feel restless — that's normal and good."
  },
  {
    week: 19, phase: "Taper", dates: "Aug 18 – Aug 24",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy run", km: 5 },
      { day: "Wed", type: "MP", desc: "Short MP shakeout: 2km easy, 4km at MP, 2km easy", km: 8 },
      { day: "Thu", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Fri", type: "Easy", desc: "Easy run", km: 4 },
      { day: "Sat", type: "Rest/XT", desc: "Rest", km: 0 },
      { day: "Sun", type: "Long", desc: "Last moderate long run", km: 13 },
    ],
    notes: "Volume drops further. Stay loose. Trust the training. Sleep as much as possible."
  },
  {
    week: 20, phase: "Race", dates: "Aug 25 – Aug 30",
    days: [
      { day: "Mon", type: "Rest", desc: "Rest", km: 0 },
      { day: "Tue", type: "Easy", desc: "Easy shakeout w/ strides", km: 4 },
      { day: "Wed", type: "Rest", desc: "Rest", km: 0 },
      { day: "Thu", type: "Easy", desc: "20 min easy jog + strides", km: 3 },
      { day: "Fri", type: "Rest", desc: "Rest — prep gear, lay out kit", km: 0 },
      { day: "Sat", type: "Rest", desc: "Rest — light walk only. Hydrate. Carb load.", km: 0 },
      { day: "Sun", type: "Race", desc: "🏁 MARATHON — 42.2km. You've done the work. Trust it.", km: 42.2 },
    ],
    notes: "RACE WEEK. Nothing new on race day — same shoes, same fuel, same gear you trained in."
  },
];

const typeColors = {
  Rest: { bg: "#1a1a2e", text: "#6b7094", border: "#2a2a4e" },
  "Rest/XT": { bg: "#1a2a2e", text: "#4d9a8a", border: "#2a3a3e" },
  Easy: { bg: "#1a2420", text: "#6abf8a", border: "#2a3430" },
  Tempo: { bg: "#2e2418", text: "#e8a84c", border: "#3e3428" },
  Long: { bg: "#2a1a2e", text: "#c47adb", border: "#3a2a3e" },
  MP: { bg: "#2e2020", text: "#e8716b", border: "#3e3030" },
  Race: { bg: "#2e1a1a", text: "#ff6b6b", border: "#4e2a2a" },
};

const phaseColors = {
  Base: "#6abf8a",
  Build: "#e8a84c",
  Peak: "#c47adb",
  Taper: "#4d9a8a",
  Race: "#ff6b6b",
};

export default function MarathonPlan() {
  const [expandedWeek, setExpandedWeek] = useState(0);
  const [checkedRuns, setCheckedRuns] = useState(() => {
    try {
      const saved = localStorage.getItem("marathon-plan-checks");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const toggleCheck = (weekIdx, dayIdx) => {
    const key = `${weekIdx}-${dayIdx}`;
    setCheckedRuns(prev => {
      const next = { ...prev, [key]: !prev[key] };
      try { localStorage.setItem("marathon-plan-checks", JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const getWeeklyKm = (week) => week.days.reduce((sum, d) => sum + d.km, 0);
  const getRunDays = (week) => week.days.filter(d => d.km > 0).length;
  const maxWeeklyKm = Math.max(...WEEKS.map(getWeeklyKm));

  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
      background: "#0d0d1a",
      color: "#e0e0f0",
      minHeight: "100vh",
      padding: "24px 16px",
      boxSizing: "border-box",
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 32, paddingBottom: 20, borderBottom: "1px solid #2a2a4e" }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: "#6b7094", marginBottom: 6, textTransform: "uppercase" }}>
            20-Week Program
          </div>
          <h1 style={{
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
            background: "linear-gradient(135deg, #6abf8a, #4d9a8a, #c47adb)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -0.5,
          }}>
            Marathon Training Plan
          </h1>
          <div style={{ fontSize: 12, color: "#6b7094", marginTop: 8 }}>
            Apr 14 – Aug 30, 2026 · Race Day: Sun Aug 30
          </div>
        </div>

        {/* Volume Overview Bar */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#6b7094", marginBottom: 10, textTransform: "uppercase" }}>
            Weekly Volume (km)
          </div>
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 60 }}>
            {WEEKS.map((w, i) => {
              const km = getWeeklyKm(w);
              const h = (km / maxWeeklyKm) * 100;
              const isCutback = w.notes.includes("CUTBACK");
              return (
                <div
                  key={i}
                  onClick={() => setExpandedWeek(i)}
                  style={{
                    flex: 1,
                    height: `${h}%`,
                    background: expandedWeek === i
                      ? phaseColors[w.phase]
                      : isCutback
                        ? "#2a2a4e"
                        : phaseColors[w.phase] + "66",
                    borderRadius: "3px 3px 0 0",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    position: "relative",
                    minHeight: 4,
                    opacity: expandedWeek === i ? 1 : 0.7,
                  }}
                  title={`W${w.week}: ${km}km`}
                />
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
            {WEEKS.map((w, i) => (
              <div key={i} style={{
                flex: 1,
                fontSize: 8,
                textAlign: "center",
                color: expandedWeek === i ? "#e0e0f0" : "#4a4a6e",
              }}>
                {w.week}
              </div>
            ))}
          </div>
        </div>

        {/* Phase Legend */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          {Object.entries(phaseColors).map(([phase, color]) => (
            <div key={phase} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
              <span style={{ fontSize: 11, color: "#6b7094" }}>{phase}</span>
            </div>
          ))}
        </div>

        {/* Week Cards */}
        {WEEKS.map((week, wi) => {
          const isExpanded = expandedWeek === wi;
          const weeklyKm = getWeeklyKm(week);
          const runDays = getRunDays(week);
          const completedRuns = week.days.filter((_, di) => checkedRuns[`${wi}-${di}`]).length;
          const isCutback = week.notes.includes("CUTBACK");

          return (
            <div
              key={wi}
              style={{
                marginBottom: 8,
                border: `1px solid ${isExpanded ? phaseColors[week.phase] + "55" : "#1a1a2e"}`,
                borderRadius: 8,
                overflow: "hidden",
                background: isExpanded ? "#111125" : "#0f0f1e",
                transition: "all 0.2s",
              }}
            >
              {/* Week Header */}
              <div
                onClick={() => setExpandedWeek(isExpanded ? -1 : wi)}
                style={{
                  padding: "14px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  userSelect: "none",
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: phaseColors[week.phase] + "22",
                  border: `1px solid ${phaseColors[week.phase]}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: phaseColors[week.phase],
                  flexShrink: 0,
                }}>
                  {week.week}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>
                      {week.phase} Phase
                    </span>
                    {isCutback && (
                      <span style={{
                        fontSize: 9,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: "#2a2a4e",
                        color: "#8888bb",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}>
                        Cutback
                      </span>
                    )}
                    {week.phase === "Race" && (
                      <span style={{
                        fontSize: 9,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: "#2e1a1a",
                        color: "#ff6b6b",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}>
                        Race Week
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "#6b7094", marginTop: 2 }}>
                    {week.dates}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: phaseColors[week.phase] }}>
                    {weeklyKm}
                    <span style={{ fontSize: 10, fontWeight: 400, color: "#6b7094", marginLeft: 2 }}>km</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#6b7094" }}>
                    {runDays} runs
                  </div>
                </div>
                <div style={{
                  fontSize: 16,
                  color: "#6b7094",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                  marginLeft: 4,
                }}>
                  ▾
                </div>
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div style={{ padding: "0 16px 16px" }}>
                  {/* Day rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {week.days.map((day, di) => {
                      const colors = typeColors[day.type] || typeColors.Rest;
                      const isChecked = checkedRuns[`${wi}-${di}`];
                      return (
                        <div
                          key={di}
                          onClick={() => day.km > 0 && toggleCheck(wi, di)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 12px",
                            background: colors.bg,
                            borderRadius: 6,
                            border: `1px solid ${colors.border}`,
                            cursor: day.km > 0 ? "pointer" : "default",
                            opacity: isChecked ? 0.5 : 1,
                            textDecoration: isChecked ? "line-through" : "none",
                            transition: "opacity 0.15s",
                          }}
                        >
                          {/* Checkbox area */}
                          <div style={{
                            width: 18,
                            height: 18,
                            borderRadius: 4,
                            border: `1.5px solid ${day.km > 0 ? colors.text + "66" : "#2a2a3e"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            background: isChecked ? colors.text + "33" : "transparent",
                            fontSize: 11,
                          }}>
                            {isChecked && "✓"}
                          </div>

                          <div style={{
                            width: 36,
                            fontSize: 11,
                            fontWeight: 600,
                            color: "#6b7094",
                            flexShrink: 0,
                          }}>
                            {day.day}
                          </div>

                          <div style={{
                            fontSize: 10,
                            padding: "2px 8px",
                            borderRadius: 4,
                            background: colors.text + "18",
                            color: colors.text,
                            fontWeight: 600,
                            letterSpacing: 0.5,
                            width: 52,
                            textAlign: "center",
                            flexShrink: 0,
                          }}>
                            {day.type}
                          </div>

                          <div style={{ flex: 1, fontSize: 12, color: "#b0b0d0" }}>
                            {day.desc}
                          </div>

                          <div style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: day.km > 0 ? colors.text : "#2a2a4e",
                            width: 50,
                            textAlign: "right",
                            flexShrink: 0,
                            fontVariantNumeric: "tabular-nums",
                          }}>
                            {day.km > 0 ? `${day.km}km` : "—"}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Notes */}
                  <div style={{
                    marginTop: 12,
                    padding: "10px 12px",
                    background: "#0a0a16",
                    borderRadius: 6,
                    borderLeft: `3px solid ${phaseColors[week.phase]}44`,
                    fontSize: 12,
                    color: "#8888bb",
                    lineHeight: 1.5,
                  }}>
                    {week.notes}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div style={{
          marginTop: 24,
          padding: 16,
          background: "#111125",
          borderRadius: 8,
          border: "1px solid #2a2a4e",
          fontSize: 11,
          color: "#6b7094",
          lineHeight: 1.7,
        }}>
          <div style={{ fontWeight: 700, color: "#8888bb", marginBottom: 6, letterSpacing: 1, fontSize: 10, textTransform: "uppercase" }}>
            Key Reminders
          </div>
          <div>▸ Strength work 2x/week throughout: calf raises (straight + bent knee), hip bridges, single-leg squats, clamshells</div>
          <div>▸ Easy runs = conversational pace. If you can't chat, slow down</div>
          <div>▸ Fuel every 30-45 min after first hour on long runs (gels, chews)</div>
          <div>▸ Cycling on rest/XT days is great — keep it easy though</div>
          <div>▸ No MP work until week 11 — build durability first, speed second</div>
          <div>▸ Weeks 7-8 are the danger zone (19-20km). If hip/glute pain returns, see a physio</div>
          <div>▸ Tap runs to check them off as you go ✓</div>
        </div>
      </div>
    </div>
  );
}
