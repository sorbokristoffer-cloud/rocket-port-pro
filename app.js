const data = [
  ["RL Tracker Profiles","Player Search","Open an official Tracker profile","#players"],
  ["RLCS","Tournament","Official Rocket League esports","#tournaments"],
  ["Community Servers","Community","Find Rocket League communities","#communities"],
  ["RL Coaching","Directory","Coaches and training resources","#directory"],
  ["Creators Hub","Directory","Streamers and creators","#directory"],
];

const form = document.querySelector("#searchForm");
const input = document.querySelector("#searchInput");
const results = document.querySelector("#searchResults");
const focusSearch = document.querySelector("#focusSearch");

function renderResults(query) {
  const q = query.trim().toLowerCase();
  if (!q) { results.hidden = true; results.innerHTML = ""; return; }
  const matches = data.filter(x => x.join(" ").toLowerCase().includes(q)).slice(0, 6);
  results.innerHTML = matches.length
    ? matches.map(x => `<a class="result" href="${x[3]}"><b>${x[0]}</b> <span style="color:#36b6ff">${x[1]}</span><br><small style="color:#8fa6c1">${x[2]}</small></a>`).join("")
    : `<div class="result">No directory match yet. Try “player”, “tournament”, or “community”.</div>`;
  results.hidden = false;
}

input.addEventListener("input", () => renderResults(input.value));
form.addEventListener("submit", e => { e.preventDefault(); renderResults(input.value); results.scrollIntoView({behavior:"smooth",block:"nearest"}); });
focusSearch.addEventListener("click", () => { input.focus(); window.scrollTo({top:0,behavior:"smooth"}); });

document.querySelector(".menu-toggle").addEventListener("click", () => {
  const nav = document.querySelector("nav");
  nav.style.display = nav.style.display === "flex" ? "" : "flex";
  nav.style.position = "absolute"; nav.style.top = "69px"; nav.style.left = "0"; nav.style.right = "0";
  nav.style.padding = "15px 5%"; nav.style.background = "#020914"; nav.style.flexDirection = "column";
});

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message; toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

function openTrackerProfile() {
  const platform = document.querySelector("#trackerPlatform").value;
  const username = document.querySelector("#trackerUsername").value.trim();
  if (!username) {
    showToast("Enter a Rocket League username first.");
    return;
  }
  const url = `https://rocketleague.tracker.network/rocket-league/profile/${platform}/${encodeURIComponent(username)}/overview`;
  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelector("#trackerLookup")?.addEventListener("submit", e => {
  e.preventDefault();
  openTrackerProfile();
});

document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => {
  document.querySelectorAll('nav a').forEach(x => x.classList.remove('active')); a.classList.add('active');
}));
