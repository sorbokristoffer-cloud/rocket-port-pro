const data = [
  ["RL Tracker Profiles", "Player Search", "Open a public Rocket League player profile", "players.html"],
  ["RLCS", "Tournament", "Official Rocket League esports", "#tournaments"],
  ["Community Servers", "Community", "Find Rocket League communities", "#communities"],
  ["RL Coaching", "Directory", "Coaches and training resources", "#directory"],
  ["Creators Hub", "Directory", "Streamers and creators", "#directory"],
];

const form = document.querySelector("#searchForm");
const input = document.querySelector("#searchInput");
const results = document.querySelector("#searchResults");
const focusSearch = document.querySelector("#focusSearch");

function renderResults(query) {
  const q = query.trim().toLowerCase();

  if (!q) {
    results.hidden = true;
    results.innerHTML = "";
    return;
  }

  const matches = data
    .filter(item => item.join(" ").toLowerCase().includes(q))
    .slice(0, 6);

  const playerOption = `
    <a class="result" href="players.html">
      <b>🎮 Search Player Directory</b>
      <span style="color:#36b6ff">Player</span>
      <br>
      <small style="color:#8fa6c1">
        Search Rocket League players by platform and open their public profile.
      </small>
    </a>
  `;

  results.innerHTML =
    playerOption +
    (matches.length
      ? matches.map(item => `
          <a class="result" href="${item[3]}">
            <b>${item[0]}</b>
            <span style="color:#36b6ff">${item[1]}</span>
            <br>
            <small style="color:#8fa6c1">${item[2]}</small>
          </a>
        `).join("")
      : "");

  results.hidden = false;
}

if (input && results && form) {
  input.addEventListener("input", () => {
    renderResults(input.value);
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    if (input.value.trim()) {
      window.location.href =
        "players.html?search=" +
        encodeURIComponent(input.value.trim());
      return;
    }

    renderResults(input.value);
  });
}

if (focusSearch && input) {
  focusSearch.addEventListener("click", () => {
    input.focus();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    const nav = document.querySelector("nav");

    nav.style.display =
      nav.style.display === "flex" ? "" : "flex";

    nav.style.position = "absolute";
    nav.style.top = "69px";
    nav.style.left = "0";
    nav.style.right = "0";
    nav.style.padding = "15px 5%";
    nav.style.background = "#020914";
    nav.style.flexDirection = "column";
  });
}

function showToast(message) {
  const toast = document.querySelector("#toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

function openTrackerProfile() {
  const platformElement =
    document.querySelector("#trackerPlatform");

  const usernameElement =
    document.querySelector("#trackerUsername");

  if (!platformElement || !usernameElement) return;

  const platform = platformElement.value;
  const username = usernameElement.value.trim();

  if (!username) {
    showToast("Enter a Rocket League username first.");
    usernameElement.focus();
    return;
  }

  if (username.length < 2) {
    showToast("Please enter a valid username.");
    usernameElement.focus();
    return;
  }

  const encodedUsername =
    encodeURIComponent(username);

  const trackerUrl =
    `https://rocketleague.tracker.network/rocket-league/profile/${platform}/${encodedUsername}/overview`;

  window.open(
    trackerUrl,
    "_blank",
    "noopener,noreferrer"
  );
}

const trackerLookup =
  document.querySelector("#trackerLookup");

if (trackerLookup) {
  trackerLookup.addEventListener("submit", event => {
    event.preventDefault();
    openTrackerProfile();
  });
}

document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.querySelectorAll("nav a").forEach(item => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});
