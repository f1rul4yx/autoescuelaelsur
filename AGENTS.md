# AGENTS.md

Single-project workspace: `web-autoescuela-elsur/` is a static website (Autoescuela El Sur, Dos Hermanas, Sevilla). No git repo, no package.json, no build/test/lint tooling — ignore any instinct to run `npm`, `git`, or a test runner.

## Layout
- `web-autoescuela-elsur/index.html` — single page, all sections: hero, services (cards), motor, autoescuela/sobre nosotros, permisos, FAQ, contacto (horarios + form + redes), footer. Content is in Spanish (`lang="es"`).
- `web-autoescuela-elsur/css/styles.css` — all styling. Palette lives in `:root` CSS variables (see below); edit variables, not literal hex, unless needed.
- `web-autoescuela-elsur/js/main.js` — mobile nav drawer, FAQ accordion, and the contact form (client-side only).
- Media: `img/logo.jpg` (favicon + brand mark in header), `img/fotos/*` (real photos), `video/reel-1.mp4`, `video/reel-2.mp4` (vertical MP4s, ~10MB).
- `autoescuelaelsur-v1..v4.tar` in the project root are full snapshot backups (there is no VCS). Treat them as version history; don't edit them, create a new `vN` tar if a snapshot is requested.

## Preview & verify
No dev server config — preview with `python3 -m http.server 8199` from the project dir and curl the changed assets (expect 200). Cheap sanity checks that have caught real bugs: balanced `{`/`}` counts in CSS/JS, and reading the modified file back after edits.

## Client/design constraints
- Brand colors: **celeste / azul / blanco**. **No yellow** anywhere — the client explicitly removed it. `--gris` is not gray: it is a light celeste (`#d6eefb`), a naming trap. The green on `.wa-float` is intentional (WhatsApp brand) — keep it.
- Current palette in `:root`: `--celeste:#a9dcf5`, `--celeste-suave:#d6eefb`, `--azul:#0a7ab8`, `--azul-oscuro:#06466b`, `--azul-900:#083a57`, `--texto:#0d3b58`, `--gris:#d6eefb`, `--gris-oscuro:#3f6b8c`.
- Contact info is duplicated across topbar, Contacto section, redes, footer, and the floating WhatsApp button: phone `+34665083451` (8 refs), email `autoescuelaelsur@gmail.com` (4 refs), WhatsApp `wa.me/34665083451`, Instagram `autoescuelaelsur`, Facebook `elsurauto`. Changing any contact detail means updating all occurrences (grep first).
- The Contacto section has two horizon tables (`Horario de verano` / `Horario de invierno`). The client has revised these times repeatedly — confirm the exact current times before editing rather than assuming.
- The contact form is `mailto:`-only: `main.js` validates and opens the user's mail client; there is no backend. The line "acepta nuestra política de privacidad" (index.html:345) references a legal page that does not exist yet.

## Deployment
Manual, no script: the user uploads changed files to their host. Provisional preview is `https://autoescuelaelsur.diegovargas.es`; final domain is `autoescuelaelsur.com` (Piensa Solutions). Editing files locally does NOT update the live site — tell the user which files need uploading.