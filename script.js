let studyPlan = {
  subject: "",
  startTime: "",
  units: []
};

function addUnit() {
  const unitName = document.getElementById("unitName").value;
  const unitHours = document.getElementById("unitHours").value;
  const topics = document.getElementById("topics").value
    .split("\n")
    .filter(t => t.trim() !== "");

  if (!unitName || !unitHours || topics.length === 0) {
    alert("Please fill all unit details");
    return;
  }

  studyPlan.units.push({
    unitName,
    unitHours: Number(unitHours),
    topics
  });

  document.getElementById("message").innerText =
    "✅ Successfully added your unit";

  document.getElementById("unitName").value = "";
  document.getElementById("unitHours").value = "";
  document.getElementById("topics").value = "";

  renderUnits();
}

function renderUnits() {
  const div = document.getElementById("unitList");
  div.innerHTML = "<h4>Added Units:</h4>";

  studyPlan.units.forEach((u, i) => {
    div.innerHTML += `<p>${i + 1}. ${u.unitName}</p>`;
  });
}

function generateTimetable() {
  studyPlan.subject = document.getElementById("subject").value;
  studyPlan.startTime = document.getElementById("startTime").value;

  if (!studyPlan.startTime || studyPlan.units.length === 0) {
    alert("Add units and start time first");
    return;
  }

  let time = toMinutes(studyPlan.startTime);
  let output = "";

  studyPlan.units.forEach(unit => {
    output += `<h4>📘 ${unit.unitName}</h4>`;

    const perTopic = Math.floor(
      (unit.unitHours * 60) / unit.topics.length
    );

    unit.topics.forEach(topic => {
      let start = formatTime(time);
      time += perTopic;
      let end = formatTime(time);

      output += `
        <div class="time-block">
          <strong>${start} - ${end}</strong><br>
          ${topic}
        </div>
      `;
    });
  });

  document.getElementById("ttTitle").innerText =
    `${studyPlan.subject} - Study Timetable (Total Units: ${studyPlan.units.length})`;

  document.getElementById("timetable").innerHTML = output;
}

function clearAll() {
  studyPlan = { subject: "", startTime: "", units: [] };
  document.getElementById("timetable").innerHTML = "";
  document.getElementById("unitList").innerHTML = "";
  document.getElementById("message").innerText = "";
  document.getElementById("ttTitle").innerText = "";
}

function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(min) {
  const h = String(Math.floor(min / 60)).padStart(2, "0");
  const m = String(min % 60).padStart(2, "0");
  return `${h}:${m}`;
}
