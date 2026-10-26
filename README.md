# Arnav Tripathi — Portfolio website

A multipage portfolio built with plain HTML, CSS and JavaScript. There is no build step: open a page in a browser or upload the folder to any static host.

## Pages

| File | Page |
|---|---|
| `index.html` | Home: intro, my backstory, my experience, technical and design skills |
| `portfolio.html` | Projects, with filters |
| `gallery.html` | Gallery: 3D model viewer, trailer, renders and screenshots |
| `projects/phantom-echoes.html` | Phantom Echoes: Chapter I case study |
| `projects/the-last-peg.html` | The Last Peg project page |
| `marketplace.html` | Asset on Demand and Game on Demand |
| `contact.html` | Bio & Contact, with the contact form |
| `404.html` | "Wrong room" error page |

The header, footer and navigation are added by `assets/js/main.js`, so you only edit them once.

## Editing common things

- **Links, email, Discord:** the `SITE` block at the top of `assets/js/main.js`.
- **Text:** open the page's `.html` file and edit the words directly.
- **Stats on the home page:** in `index.html`, change the `data-count="…"` numbers and the matching text.
- **Images:** put them in `assets/img/` (WebP or JPG) and update the `src="…"`.
- **Colours and fonts:** the variables at the top of `assets/css/style.css`.

## Contact form

By default the form opens the visitor's email app with the message filled in. To receive messages directly:

1. Create a free form at https://formspree.io.
2. Copy its URL (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint` in the `SITE` block of `assets/js/main.js`.

## Adding your own 3D models

1. In Blender: File › Export › glTF 2.0, format **glTF Binary (.glb)**. Keep it under ~10 MB if you can.
2. Put the file in `assets/models/`.
3. In `gallery.html`, copy the `<button … data-src="assets/models/lantern.glb" …>` line inside `#mv-list` and change the file, name and description.

The lantern placeholder is a CC0 sample model (Microsoft, from the Khronos glTF sample assets).

## Features

- Game-style loading screen (once per visit)
- Flashlight hero: the cursor lights up the art
- Custom cursor and page wipe transitions (switched off on touch screens and for reduced-motion users)
- Animated stats, timeline and scroll reveals
- Experience pop-ups with details
- Interactive 3D viewer (`<model-viewer>`)
- Phantom Echoes trailer streamed from Steam
- Lightbox gallery with keyboard navigation
- Ambient sound toggle (generated in the browser, off by default)
- **Easter egg:** type ↑ ↑ ↓ ↓ ← → ← → B A on any page (or tap the code in the footer 5 times) to play *Flashlight Escape*.

## Previewing locally

Pages work when opened directly, but the 3D viewer and the trailer behave best from a local server:

```
python -m http.server 8080
```

Then open http://localhost:8080.

## Publishing on GitHub Pages

1. Create a public repo named `ArnavTripathi999.github.io`.
2. Upload everything in this folder to it.
3. The site goes live at https://arnavtripathi999.github.io within a minute or two.
