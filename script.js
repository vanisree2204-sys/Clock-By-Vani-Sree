let alarmTime = null;
let alarmTitle = "";
let alarmInterval = null;
const alarmSound = document.getElementById("alarmSound");
const uploadInput = document.getElementById("alarmSoundUpload");

// ✅ Live Clock Function
function updateTime() {
  const now = new Date();
  document.getElementById("liveTime").innerText = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

function setAlarm() {
  const inputTime = document.getElementById("alarmTime").value;
  const titleInput = document.getElementById("alarmTitle").value.trim();

  if (!inputTime) {
    alert("Please select a valid alarm time.");
    return;
  }

  alarmTime = inputTime;
  alarmTitle = titleInput || "Alarm";

  // ✅ Use uploaded sound if available
  if (uploadInput.files.length > 0) {
    const file = uploadInput.files[0];
    alarmSound.src = URL.createObjectURL(file);
  }

  document.getElementById("status").innerText = `✅ "${alarmTitle}" set for ${alarmTime}`;
  
  if (alarmInterval) clearInterval(alarmInterval);

  alarmInterval = setInterval(() => {
    const now = new Date();
    const currentTime = now.getHours().toString().padStart(2, '0') + ':' +
                        now.getMinutes().toString().padStart(2, '0');

    if (currentTime === alarmTime) {
      alarmSound.play();
      document.getElementById("status").innerText = `⏰ ${alarmTitle} is ringing!`;
      clearInterval(alarmInterval);
    }
  }, 1000);
}

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  document.getElementById("status").innerText = "⛔ Alarm stopped.";
  clearInterval(alarmInterval);
}

function testSound() {
  if (uploadInput.files.length > 0) {
    const file = uploadInput.files[0];
    alarmSound.src = URL.createObjectURL(file);
  }
  alarmSound.play();
}
