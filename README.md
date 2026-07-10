<div align="center">

# 🧊 3D Plotting with Matplotlib — Complete Course

### A self-paced, fully-executed Jupyter course with a live 3D web experience

<img src="https://img.shields.io/badge/271-Executed%20Cells-556B2F?style=for-the-badge&labelColor=1B2413" />
<img src="https://img.shields.io/badge/33+1-Sections-6E8A3F?style=for-the-badge&labelColor=1B2413" />
<img src="https://img.shields.io/badge/0-Execution%20Errors-8CA85E?style=for-the-badge&labelColor=1B2413" />

<br/>

![React](https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r128-000000?style=flat-square&logo=three.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-A3B18A?style=flat-square)

<br/>

**[🌐 Live Site](#-live-demo)** · **[📓 Open the Notebook](#-the-notebook)** · **[⚡ Run Locally](#-run-it-locally)** · **[🚀 Deploy](#-deploy-your-own)**

</div>

<br/>

<div align="center">
  <img src="https://raw.githubusercontent.com/mawiya-47/Matplotlib-Notes/main/matplotlib3d-site/src/assets/hero.png" width="820" alt="3D surface hero preview" />
  <br/>
  <sub>The landing page hero is a <b>live WebGL surface</b> — not a screenshot — rendered with react-three-fiber, matching the exact math taught in Section 8 of the course.</sub>
</div>

<br/>

---

## ✨ What This Is

This repo holds two things, built to work together:

| | |
|---|---|
| 📓 **The Notebook** | A complete, beginner→advanced Jupyter course on 3D visualization with Matplotlib — **271 executed cells**, real rendered outputs, zero errors. |
| 🎨 **The Site** | A React + Three.js landing page and in-browser notebook viewer, so anyone can read the course without opening Jupyter at all. |

> No placeholders. No "left as an exercise." Every single code cell in the notebook has already been run, and its real output is baked in — plots, print statements, and all.

---

## 📓 The Notebook

`3D_Plotting_with_Matplotlib_in_Python_Complete_Course.ipynb`

A university-course-style walkthrough covering:

```
01  Introduction to Matplotlib          18  Transparency
02  Introduction to 3D Plotting         19  Grid
03  Installation                        20  Figure Size & DPI
04  Importing Libraries                 21  Multiple Subplots
05  Your First 3D Figure                22  Random Data Visualization
06  3D Scatter Plot                     23  20-Shape Math Surface Gallery
07  3D Line Plot                        24  16 Real-World Projects
08  Surface Plot                        25  Custom Colors
09  Wireframe Plot                      26  Saving Figures
10  Contour Plot                        27  20 Common Errors + Fixes
11  3D Bar Plot                         28  Best Practices
12  Text Annotation                     29  25 Mini Exercises
13  Axis Labels                         30  10 Assignments
14  Titles                              31  40 Interview Q&As
15  Legends                             32  Full Cheat Sheet
16  Viewing Angles                      33  Capstone Project
17  Colormaps                           ★   Bonus: mplot3d API Reference
```

**The capstone (Section 33)** — *Optimization Landscape Explorer* — combines a non-convex loss surface, a wireframe overlay, a contour floor projection, a 150-step simulated gradient-descent path, custom camera angle, colorbar, legend, and multi-format export into a single publication-ready figure.

**Real-world projects (Section 24)** include terrain elevation, population density, ML loss surfaces with a gradient-descent path overlay, option volatility surfaces, simplified medical scan visualization, and robotics path planning around obstacles.

---

## 🎨 The Site

```
matplotlib3d-site/
├── src/
│   ├── components/Hero3D.jsx     ← live WebGL surface (react-three-fiber)
│   ├── pages/Landing.jsx         ← hero, curriculum grid, capstone showcase, stats
│   ├── pages/Viewer.jsx          ← parses & renders the real .ipynb in-browser
│   └── data/curriculum.js
├── public/data/notebook.ipynb    ← the actual executed notebook, served as static data
└── vercel.json                   ← SPA rewrite config for one-click deploy
```

**`/`** — the landing page. The hero surface is generated from `Z = 9·sin(0.28r)·e^(−0.028r) + 3.5·cos(0.12x)·sin(0.12y)` and rendered live in WebGL, rotating slowly, no video/GIF involved.

**`/viewer`** — fetches `notebook.ipynb` at runtime, parses markdown cells, syntax-styled code cells, and embedded PNG outputs, and renders the whole course as a scrollable reading experience with a jump-to-section sidebar.

---

## ⚡ Run It Locally

```bash
cd matplotlib3d-site
npm install
npm run dev
```

Open **http://localhost:5173**

## 🚀 Deploy Your Own

One click on [Vercel](https://vercel.com/new) — it auto-detects Vite.

```bash
npm i -g vercel
cd matplotlib3d-site
vercel
```

| Setting | Value |
|---|---|
| Framework | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Root Directory | `matplotlib3d-site` |

## 🌐 Live Demo

> Add your deployed Vercel URL here once live: `https://your-project.vercel.app`

---

## 🛠️ Tech Stack

- **React 19** + **Vite 8** — app shell & bundler
- **@react-three/fiber** + **three.js** — the live 3D hero surface
- **Tailwind CSS v4** — olive/white design system
- **Framer Motion** — scroll reveals & page transitions
- **marked** — client-side markdown rendering for the notebook viewer

---

<div align="center">

### Made with ❤️ by Muhammad Mawiya

**Python · Data Visualization · Artificial Intelligence · Machine Learning**

⭐ If this helped you, consider starring the repo and sharing it with others.

© 2026 Muhammad Mawiya. All Rights Reserved.

</div>
