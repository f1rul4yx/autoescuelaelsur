# AGENTS.md

Static website for Autoescuela El Sur (Dos Hermanas, Sevilla), hosted on GitHub (`f1rul4yx/autoescuelaelsur`) and deployed manually to Piensa Solutions hosting. It is a git repo but has **no package.json, no build/test/lint tooling** — do not run `npm`, a test runner, or any build step.

## Layout (paths relative to repo root)
- `html/` — **the deployable site**. The entire contents of this folder are uploaded to the `html` (web root) folder of the Piensa hosting. Source of truth for what goes live.
  - `html/index.html` — single page: hero, services (cards), motor, autoescuela/sobre nosotros, permisos, FAQ, contacto (horarios + form + redes), footer. Content is in Spanish (`lang="es"`).
  - `html/css/styles.css` — all styling. Palette lives in `:root` CSS variables (edit the variables, not literal hex).
  - `html/js/main.js` — mobile nav drawer (toggle morphs to an "X" via `.is-active`), FAQ accordion, and the contact form (client-side only).
  - Media: `html/img/logo.jpg` (brand mark + `rel="icon"`), `html/img/fotos/*` (3 photos), `html/video/reel-1.mp4` + `reel-2.mp4` (vertical MP4s, ~9.5MB total).
  - `html/.htaccess` — forces HTTPS (301), strips `www` (canonical is `autoescuelaelsur.com`), `Options -Indexes`, `DirectoryIndex index.html`. Only effective once the hosting SSL is active.
  - `html/robots.txt` — permissive (`Allow: /`); effectively a no-op vs. default behavior.
  - `html/favicon.ico` — byte-for-byte copy of `img/logo.jpg`.

## Preview & verify
Serve from the site root with `python3 -m http.server 8199` (workdir `html/`) and curl the changed assets (expect 200). Cheap sanity checks that have caught real bugs: balanced `{`/`}` counts in CSS/JS, verifying every local `href`/`src` in `index.html` points to an existing file, and grep for `amarillo`/`ffd200`/`yellow` (must be 0).

## Client/design constraints
- Brand colors: **celeste / azul / blanco**. **No yellow** anywhere — the client explicitly removed it. `--gris` is not gray: it is a light celeste (`#d6eefb`), a naming trap. The green on `.wa-float` is intentional (WhatsApp brand) — keep it.
- Palette in `:root` (`html/css/styles.css`): `--celeste:#a9dcf5`, `--celeste-suave:#d6eefb`, `--azul:#0a7ab8`, `--azul-oscuro:#06466b`, `--azul-900:#083a57`, `--texto:#0d3b58`, `--gris:#d6eefb`, `--gris-oscuro:#3f6b8c`.
- Contact info is duplicated across topbar, Contacto section, redes, footer, and the floating WhatsApp button: phone `+34665083451` (8 refs), email `autoescuelaelsur@gmail.com` (4 refs), WhatsApp `wa.me/34665083451`, Instagram `autoescuelaelsur`, Facebook `elsurauto`. Changing any contact detail means updating all occurrences (grep first).
- The Contacto section has two tables, `Horario de verano` (Lun–Vie 10:00–14:00) and `Horario de invierno` (Lun–Jue 11:00–13:00 + 17:30–20:00, Vie 11:00–13:00), both closed Sat/Sun. The client has revised these times repeatedly — confirm the exact current times before editing.
- The contact form is `mailto:`-only: `main.js` validates and opens the user's mail client; there is no backend. The "acepta nuestra política de privacidad" line (`index.html:345`) references a legal page that does not exist yet.

## Deployment
Manual: upload the contents of `html/` into the `html` folder of the Piensa web hosting (WebFTP: upload `autoescuelaelsur-web.zip` and extract with the File Manager, or FileZilla). Deployed files do NOT update the live site by themselves — after editing, tell the user which files to re-upload. Domain `autoescuelaelsur.com` is registered at Piensa (NS already `ns13/14.piensasolutions.com`); pointing = edit the A records of the domain and `www` to the hosting IP, then enable the DV SSL in the hosting panel. The `.htaccess` takes effect (HTTPS redirect) only after the SSL is active.