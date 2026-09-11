// Scans the repo root for folders named "{number}-{slug}", pulls each
// problem's real title/difficulty from LeetCode's public GraphQL API,
// and rewrites the table in README.md between the marker comments.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const README_PATH = path.join(ROOT, 'README.md');
const START_MARKER = '<!-- PROBLEMS-TABLE:START -->';
const END_MARKER = '<!-- PROBLEMS-TABLE:END -->';

const FOLDER_REGEX = /^(\d+)-(.+)$/;
const IGNORE_DIRS = new Set(['.github', 'scripts', 'node_modules', '.git']);

const DIFFICULTY_LABEL = {
  Easy: '🟢 Easy',
  Medium: '🟡 Medium',
  Hard: '🔴 Hard',
};

async function fetchQuestionMeta(titleSlug) {
  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (README-bot)',
      },
      body: JSON.stringify({
        query: `query questionData($titleSlug: String!) {
          question(titleSlug: $titleSlug) {
            questionFrontendId
            title
            difficulty
          }
        }`,
        variables: { titleSlug },
      }),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data?.question || null;
  } catch (err) {
    console.warn(`Could not fetch metadata for "${titleSlug}": ${err.message}`);
    return null;
  }
}

function titleCaseFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1) : w))
    .join(' ');
}

async function main() {
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });
  const folders = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => !IGNORE_DIRS.has(name) && FOLDER_REGEX.test(name));

  const rows = [];

  for (const folder of folders) {
    const [, folderNumber, rawSlug] = folder.match(FOLDER_REGEX);
    const meta = await fetchQuestionMeta(rawSlug);

    const title = meta?.title || titleCaseFromSlug(rawSlug);
    const difficulty = meta?.difficulty
      ? DIFFICULTY_LABEL[meta.difficulty] || meta.difficulty
      : '—';
    const problemNumber = Number(meta?.questionFrontendId || folderNumber);

    rows.push({ problemNumber, title, difficulty, folder });
  }

  rows.sort((a, b) => a.problemNumber - b.problemNumber);

  const header = '| # | Problem | Difficulty | Solution |\n|---|---------|------------|----------|';
  const body = rows
    .map((r) => `| ${r.problemNumber} | ${r.title} | ${r.difficulty} | [Solution](./${r.folder}) |`)
    .join('\n');

  const table = rows.length ? `${header}\n${body}` : '_No solutions yet — check back soon!_';
  const newSection = `${START_MARKER}\n${table}\n${END_MARKER}`;

  const readme = fs.readFileSync(README_PATH, 'utf8');
  const markerRegex = new RegExp(`${START_MARKER}[\\s\\S]*?${END_MARKER}`);

  if (!markerRegex.test(readme)) {
    console.error('README markers not found. Make sure README.md contains the PROBLEMS-TABLE markers.');
    process.exit(1);
  }

  const updated = readme.replace(markerRegex, newSection);

  if (updated === readme) {
    console.log('No changes to the problems table.');
    return;
  }

  fs.writeFileSync(README_PATH, updated);
  console.log(`Updated README.md — ${rows.length} problem(s) listed.`);
}

main();
