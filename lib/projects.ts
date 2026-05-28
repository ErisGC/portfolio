import type { Project } from "@/components/ProjectCard";

export const PROJECTS: Project[] = [
  {
    slug: "aiencmaster",
    name: "AIENCMASTER",
    tagline:
      "Portal institucional + panel administrativo multi-rol con cadena de confianza ROOT→ROOT",
    description:
      "Plataforma institucional para la Asociación de Iglesias Evangélicas del Norte de Colombia. Monorepo NestJS + Next.js + Flutter Android con permisos granulares, sistema de invitaciones con cadena de confianza, multi-iglesia, auditoría completa y distribución APK firmado vía GitHub Releases.",
    stack: [
      "NestJS",
      "Next.js 16",
      "Flutter 3.41",
      "PostgreSQL",
      "TypeORM",
      "Cloudinary",
      "Railway",
      "Vercel",
    ],
    highlights: [
      "Cadena de validación ROOT→ROOT de 5 capas con bumping de tokenVersion",
      "Distribución APK firmado vía GitHub Releases con keystore en Secrets",
      "Auditoría diferenciada por entidad (iglesias, usuarios, invitaciones)",
      "48 tests pasando · cookies HttpOnly cross-origin",
    ],
    repoUrl: "https://github.com/ErisGC/AIENCMASTER",
    status: "production",
    accent: "accent",
  },
  {
    slug: "voiceforge",
    name: "VoiceForge",
    tagline:
      "Plataforma multiplataforma de clonación de voz con IA · subprocess isolation para Seed-VC",
    description:
      "Plataforma cross-platform para clonar voces y convertir audio entre perfiles. Frontend Flutter (Android + Web) + backend FastAPI con Seed-VC corriendo en venv aislado de Python 3.10. Incluye landing comercial Next.js con integración Wompi (Bancolombia) y Auth0.",
    stack: [
      "Flutter",
      "FastAPI",
      "Seed-VC",
      "PostgreSQL",
      "Redis",
      "Next.js 15",
      "Wompi",
      "Auth0",
    ],
    highlights: [
      "Aislamiento de proceso para Seed-VC: venv Python 3.10 disparado vía subprocess",
      "Caching de features con invalidación versionada (~30% menos latencia)",
      "Resident runtime opcional: modelos calientes en RAM",
      "WebSocket + Redis pub/sub para notificaciones en tiempo real",
    ],
    repoUrl: "https://github.com/ErisGC/VoiceForge",
    status: "active",
    accent: "violet",
  },
  {
    slug: "warbackend",
    name: "WARBackend",
    tagline:
      "Backend autoritativo para MMO/ARPG · pipeline de combate determinista de 11 etapas",
    description:
      "Servidor de un juego de rol con sistema de combate, progresión y cultivación. Cliente nunca calcula daño — todo se resuelve en .NET 8 y se persiste. Panel administrativo con flujo editorial Draft→Published→Archived para editar habilidades sin tocar código.",
    stack: [
      ".NET 8",
      "ASP.NET Core",
      "EF Core 8",
      "C# 12",
      "PostgreSQL",
      "Clean Architecture",
    ],
    highlights: [
      "Pipeline de combate de 11 etapas con servicios pequeños y testables",
      "Separación explícita ActionResourceCosts vs ImpactResourceChanges",
      "Sistema de combos de 6 etapas con estado persistido en CharacterEntity",
      "Matriz elemental centralizada (Heat, Cold, Electrified, Freeze, Weaken)",
    ],
    repoUrl: "https://github.com/ErisGC/WARBackend",
    status: "prototype",
    accent: "yellow",
  },
  {
    slug: "barber-booking",
    name: "barber-booking",
    tagline:
      "Sistema de reservas para barbería · pagos con depósito parcial vía Stripe",
    description:
      "Plataforma de reservas online con pago de depósito (50% o 100%) vía Stripe Checkout, recibos PDF con QR code para check-in rápido, panel admin con auth JWT separado de Auth0, y sistema de booking intents que reserva el slot temporalmente durante el flujo de pago.",
    stack: [
      "React 19",
      "Vite",
      "Express 5",
      "Prisma",
      "PostgreSQL",
      "Stripe",
      "Auth0",
      "Nodemailer",
    ],
    highlights: [
      "Booking intents: slot reservado mientras dura el checkout, liberado por TTL",
      "Webhooks Stripe como única fuente de verdad para confirmar reservas",
      "Recibos PDF con QR generados client-side (jsPDF + react-qr-code)",
      "JWT separado para admin — desacoplado de Auth0 para tareas internas",
    ],
    repoUrl: "https://github.com/ErisGC/barber-booking",
    status: "demo",
    accent: "cyan",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
