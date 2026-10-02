# Rocket Port Pro — RL data sources

## Rocket League Tracker / Tracker Network

Rocket Port Pro links users to public Rocket League Tracker profiles for player lookups.

We intentionally do **not** scrape `rocketleague.tracker.network` or call undocumented `api.tracker.gg` endpoints. Tracker Network has stated that Rocket League does not have a public developer API and that scraping/internal endpoint use is unsupported.

Official Tracker Network developer page:
https://tracker.gg/developers

Rocket League Tracker:
https://rocketleague.tracker.network/rocket-league

## Live match data

For an actual Rocket Port Pro desktop companion, use Rocket League's official Stats API. It broadcasts match telemetry locally from the Rocket League client and is documented by Psyonix:
https://www.rocketleague.com/developer/stats-api

This is suitable for a companion app that a player runs on their own computer. It is not a public web API for looking up every Rocket League player.

## Production recommendation

For site-wide player profiles, use an authorized/licensed data source. Keep API credentials on the server and never expose private keys in browser JavaScript.
