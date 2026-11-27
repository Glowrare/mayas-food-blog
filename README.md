# Maya's Kitchen Notes

A food blog built with Next.js 16 App Router, React 19, Tailwind CSS v4,
and JavaScript. Recipes and photography are stored locally.

## Development

Use Node.js 24 and install the locked dependencies:

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Project structure

- `app/page.js`: editorial homepage.
- `app/posts/page.js`: archive containing all recipes.
- `app/posts/[slug]/page.js`: individual Markdown recipe pages.
- `app/contact/page.js`: contact form.
- `app/api/contact/route.js`: contact API route handler.
- `components/`: homepage sections, recipe cards, shared navigation, and footer.
- `lib/posts-util.js`: server-side Markdown file access.
- `lib/recipe-summary.mjs`: recipe metadata normalization without Markdown bodies.
- `lib/homepage-content.mjs`: deterministic editorial selection and category filtering.
- `lib/utils.js`: `cn()` for conditional classes and Tailwind class merging.
- `posts/`: recipe Markdown and frontmatter.
- `public/images/`: local recipe photography and publication assets.
- `public/fonts/`: self-hosted Roboto with its font license notice.
- `styles/globals.css`: Tailwind theme and base styles.

The homepage selects its lead and editor's picks from featured recipes, using
optional editorial priority before publication date and slug. With no featured
recipes, the newest recipe leads. Latest recipes exclude the curated selections.
Discovery includes the full archive, displays up to four matching recipes, and
derives Quick & Easy from valid durations of 30 minutes or less.

Filesystem content access stays on the server. The client-side discovery receives
only normalized recipe summaries. The shared mobile navigation is a disclosure
with keyboard controls and active-route styling.

## Verification

```bash
npm run test:unit
npm test
npm run build
```

Node's test runner discovers `unit-tests/*.test.mjs`. Playwright discovers browser
tests under `tests/` and uses installed Google Chrome. It starts the development
server automatically, or reuses a running server outside CI.

Roboto is served locally with system fallbacks, so page loading and
browser tests do not require access to Google Fonts.

## Production

```bash
npm run build
npm start
```

Set `NEXT_PUBLIC_SITE_URL` to the publication's URL when hosting to configure
absolute metadata URLs. The contact API validates input and stores messages in
process memory; messages are lost when the server restarts. It does not send email.
