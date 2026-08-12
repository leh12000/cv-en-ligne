# CV en ligne — Mamadou Traoré

CV cinématographique une page. Preset esthétique **B — Nocturne Prestige**,
en arrangement clair-dominant (or sur crème).

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de production dans dist/
npm run preview  # prévisualise le build
```

## Stack

React 19 · Tailwind CSS 3.4.17 · GSAP 3 + ScrollTrigger · Lucide React · Vite

## Design tokens

| Rôle | Nom | Hex | Classe Tailwind |
| --- | --- | --- | --- |
| Primaire sombre | Charbon | `#0F0F13` | `charbon` |
| Accent | Or | `#D4A843` | `gold` |
| Accent lisible sur clair | Or profond | `#8A6520` | `goldink` |
| Fond | Crème | `#F5F3EE` | `cream` |
| Texte | Ardoise | `#1E1E26` | `ink` |
| Fond secondaire | Ivoire | `#EBE7DD` | `ivory` |
| Pied de page | Onyx | `#0A0A0D` | `onyx` |

`gold` n'est jamais utilisé pour du texte sur fond clair (contraste ~1.9:1) —
`goldink` prend le relais dans ces cas.

Polices : **Inter** (titres) · **Playfair Display** italique (dramatique) · **JetBrains Mono** (données).

## Rythme des sections

Clair-dominant : un seul grand moment sombre en ouverture, puis la lumière.

1. Hero — Charbon + texture chaude + halo doré
2. À propos — Crème
3. Expérience — Ivoire
4. Compétences — Crème, avec le radar dans un panneau Charbon incrusté
5. Formation — Ivoire
6. Contact — **Or plein**, texte Charbon
7. Pied de page — Onyx, `rounded-t-[4rem]`

## À personnaliser

Tout le contenu est en haut de [src/App.jsx](src/App.jsx) : `PROFILE`, `EXPERIENCES`,
`SKILLS`, `EDUCATION`, `CONTACT_LINKS`, `IMAGES`.

1. **CV PDF** — remplacez `public/cv-mamadou-traore.pdf` (placeholder généré) par le vrai
   PDF, en gardant le même nom de fichier.
2. **Liens sociaux** — `PROFILE.linkedin` et `PROFILE.github` pointent vers des handles à confirmer.
3. **Chiffres du hero** — `PROFILE.stats` (5 ans, 24 projets, Paris).

La photo de profil est `public/fond.jpeg`, affichée en `rounded-full` avec un
`scale-[1.12]` qui recadre le liseré blanc de l'original.

## Structure

- `src/App.jsx` — toutes les sections (Navbar, Hero, À propos, Expérience, Compétences, Formation, Contact, Footer)
- `src/index.css` — Tailwind, overlay de bruit `feTurbulence`, micro-interactions magnétiques, panneau de nav mobile
- `tailwind.config.js` — palette, typographies, ombres
