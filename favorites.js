const favoritesList = document.getElementById("favoritesList");

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favoritesList.innerHTML = "";

  favorites.forEach((song, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="song-details">
        <img src="${song.cover}" alt="Cover">
        <div class="song-info">
          <div class="title">${song.title}</div>
          <div class="artist">${song.artist}</div>
        </div>
      </div>
      <div class="actions">
        <button class="play" title="Play"><i class="fas fa-play"></i></button>
        <button class="remove" title="Remove"><i class="fas fa-trash-alt"></i></button>
      </div>
    `;

    // Play song (open main page with song loaded)
    li.querySelector(".play").addEventListener("click", () => {
      localStorage.setItem("nowPlaying", JSON.stringify(song));
      window.location.href = "index.html";
    });

    // Remove from favorites
    li.querySelector(".remove").addEventListener("click", () => {
      favorites.splice(index, 1);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      loadFavorites();
    });

    favoritesList.appendChild(li);
  });

  // Animate list
  gsap.from(".favorites-list li", {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });
}

loadFavorites();
