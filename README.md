<h1 align="center">portfolio</h1>

<p align="center">
  <em>Mi página web personal · terminal aesthetic</em>
  <br/>
  <em>Next.js 15 · Tailwind 4 · TypeScript · Framer Motion · Vercel</em>
</p>

---

## Vistas

| Ruta | Contenido |
|------|-----------|
| `/` | Hero con typing animation tipo boot de terminal |
| `/about` | Bio, filosofía de trabajo, env vars como "datos personales" |
| `/stack` | Tecnologías agrupadas con niveles de dominio |
| `/projects` | Listado de proyectos como `ls -la` |
| `/projects/[slug]` | Detalle por proyecto: problema, enfoque, decisiones, estado |
| `/contact` | Canales de contacto con `ping` simulado |

## Stack

- **Next.js 15** App Router con React 19
- **Tailwind CSS 4** con tema custom (paleta terminal)
- **TypeScript** strict mode
- **JetBrains Mono + Inter** vía `next/font/google`
- **lucide-react** para iconos
- **Framer Motion** disponible (no usado todavía, listo para añadir transiciones)

## Correrlo en local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Deploy

Conectado a Vercel. Cada push a `main` despliega automáticamente.
