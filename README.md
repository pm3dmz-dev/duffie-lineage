# Duffie Academic Lineage

Interactive radial visualization of Darrell Duffie's doctoral advisees, 1986–2024.

## Local development

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Deploy

Pushing to the `main` branch on GitHub triggers an automatic Vercel deploy.

## Editing the data

The advisee list lives in `src/TimeWheel.jsx` near the top of the file, in the
`ADVISEES` array. Each entry has three fields:

```js
{ id: "Full Name", year: 2024, i: "Institution Name" }
```

- `id` — the person's full name (must be unique)
- `year` — Ph.D. year
- `i` — current institution. Use `"Unknown"` or `"Industry"` to opt out of
  institution-link grouping.

After editing, commit and push. Vercel redeploys in about 30 seconds.

## Build for production

```bash
npm run build
```

Outputs static files to `dist/`.
