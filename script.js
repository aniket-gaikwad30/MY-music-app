const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const songCover = document.getElementById("songCover");
const songTitle = document.getElementById("songTitle");
const audioPlayer = document.getElementById("audioPlayer");
const seekBar = document.getElementById("seekBar");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeControl = document.getElementById("volumeControl");
const miniCover = document.getElementById("miniCover");
const miniTitle = document.getElementById("miniTitle");
const miniArtist = document.getElementById("miniArtist");
const currentTimeLabel = document.getElementById("currentTime");
const totalDurationLabel = document.getElementById("totalDuration");

const API_URL = "https://saavn.dev/api/search/songs?query=";

// ✅ Search Songs
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query === "") return;

  fetch(API_URL + encodeURIComponent(query))
    .then((response) => response.json())
    .then((data) => {
      if (!data.data.results.length) return;

      const song = data.data.results[0];
      const artist = song.primaryArtists || "Unknown Artist";

      playAudio(
        song.downloadUrl.pop().url,
        song.image.pop().url,
        song.name,
        artist
      );
    });
});

// ✅ Play Selected Song
function playAudio(url, cover, title, artist) {
  audioPlayer.src = url;
  audioPlayer.play();
  songCover.src = cover;
  miniCover.src = cover;
  songTitle.innerText = title;
  miniTitle.innerText = title;
  miniArtist.innerText = artist;
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';

  // ✅ Update total duration after metadata is loaded
  audioPlayer.addEventListener("loadedmetadata", () => {
    seekBar.max = audioPlayer.duration;
    totalDurationLabel.innerText = formatTime(audioPlayer.duration);
  });
}

// ✅ Play/Pause Button
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// ✅ Update Seek Bar & Timers
audioPlayer.addEventListener("timeupdate", () => {
  seekBar.value = audioPlayer.currentTime;
  currentTimeLabel.innerText = formatTime(audioPlayer.currentTime);
});

// ✅ Seek Bar Control
seekBar.addEventListener("input", () => {
  audioPlayer.currentTime = seekBar.value;
});

// ✅ Volume Control
volumeControl.addEventListener("input", () => {
  audioPlayer.volume = volumeControl.value;
});

// ✅ Format Time (MM:SS)
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return `${min}:${sec.toString().padStart(2, "0")}`;
}
