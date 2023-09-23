const xml = require("xml");
const { writeFile } = require("fs/promises");

const baseUrl = "https://storage.googleapis.com/flutter_infra_release/releases";

const query = ["windows", "macos", "linux"];

async function fetchRelease(os) {
  const response = await fetch(`${baseUrl}/releases_${os}.json`);
  const data = await response.json();
  const releases = data["releases"];
  const result = [];
  for (const release of releases) {
    result.push({
      item: [
        {
          title: `Flutter v${release["version"]} has been released`,
        },
        {
          link: `https://docs.flutter.dev/release/archive?tab=${os}`,
        },
        {
          description: `Hash: ${release["hash"]}, Dart SDK Version: ${release["dart_sdk_version"]}.`,
        },
        {
          pubDate: release["release_date"],
        },
      ],
    });
  }
  return result;
}

function buildRss(os, items) {
  const rss = [
    {
      rss: [
        { _attr: { version: "2.0" } },
        {
          channel: [
            {
              title: `Flutter releases for ${os}`,
            },
            {
              link: "https://docs.flutter.dev/release/release-notes",
            },
            {
              description: "",
            },
            ...items,
          ],
        },
      ],
    },
  ];
  return xml(rss, { declaration: true });
}

(async function () {
  for (const e of query) {
    const items = await fetchRelease(e);
    const result = buildRss(e, items);
    await writeFile(`releases_${e}.xml`, result);
  }
})();
