export type Section = {
  heading: string;
  command: string;
  body: string | string[];
};

export type ProjectDetail = {
  slug: string;
  problem: string;
  approach: string;
  sections: Section[];
  decisions: { title: string; body: string }[];
  status: { done: string[]; pending: string[] };
};

export const DETAILS: Record<string, ProjectDetail> = {
  aiencmaster: {
    slug: "aiencmaster",
    problem:
      "Una asociación de iglesias necesitaba un portal institucional + panel administrativo multi-rol, con app móvil para roles específicos, distribución controlada del APK y trazabilidad completa de quién hizo qué.",
    approach:
      "Monorepo con tres aplicaciones: API NestJS, portal Next.js y app Flutter Android. Permisos modelados como cadena de confianza ROOT→ROOT con bumping de tokenVersion, distribución del APK firmado vía GitHub Releases con keystore en Secrets, y auditoría diferenciada por entidad.",
    sections: [
      {
        heading: "Cadena de confianza ROOT→ROOT",
        command: "cat docs/trust-chain.md",
        body: [
          "Validación en 5 capas: identidad, rol activo, iglesia activa, tokenVersion vigente y permiso granular.",
          "tokenVersion permite invalidar TODOS los JWTs de un usuario en una operación (cambio de rol, revocación de invitación, sospecha de leak).",
          "ROOT puede crear otro ROOT, pero la creación queda firmada y auditada con identidad del padre.",
        ],
      },
      {
        heading: "Distribución APK firmado",
        command: "cat .github/workflows/admin-app-release.yml",
        body: [
          "Pipeline en GitHub Actions firma el APK con keystore en Secrets (base64).",
          "Cada release sube el APK a GitHub Releases con tag versionado.",
          "El portal web sirve la última versión vía NEXT_PUBLIC_AIENC_APK_URL.",
          "R8/Proguard configurado con reglas explícitas para Flutter embedding (sin Play Store dependencies).",
        ],
      },
      {
        heading: "Auditoría diferenciada",
        command: "grep -r 'AuditService' apps/api/src/",
        body: [
          "Cada acción crítica (crear iglesia, revocar invitación, cambiar rol) escribe un audit log tipado.",
          "Logs separados por entidad: iglesia, usuario, invitación. Filtrables por actor, target y rango de fechas.",
          "Soporta export a CSV para revisiones formales.",
        ],
      },
      {
        heading: "Multi-iglesia con permisos por contexto",
        command: "cat src/auth/decorators/with-church.decorator.ts",
        body: [
          "Un usuario puede pertenecer a varias iglesias con roles distintos en cada una.",
          "El JWT lleva el conjunto de iglesias activas; el endpoint declara el contexto requerido vía decorator.",
          "Cambiar de iglesia activa requiere un refresh real, no solo un swap en cliente.",
        ],
      },
    ],
    decisions: [
      {
        title: "Cookies HttpOnly cross-origin (SameSite=None)",
        body: "API en Railway, web en Vercel, app Flutter en Android. Las cookies tienen que cruzar dominios. SameSite=None + Secure + HttpOnly + CORS explícito.",
      },
      {
        title: "Sin migraciones TypeORM (todavía)",
        body: "Para acelerar, uso synchronize en desarrollo y un OnApplicationBootstrap migrator idempotente en producción. Es el siguiente refactor.",
      },
      {
        title: "Cloudinary como CDN externo",
        body: "Las imágenes (logos de iglesia, perfiles) viven en Cloudinary, no en la BD ni en el server. Permite servirlas con CDN global sin reventar Railway.",
      },
      {
        title: "Dark-only Flutter + locale es-CO forzado",
        body: "Decisión de producto: el público objetivo está en Colombia y prefiere modo oscuro. Menos código, menos bugs visuales, experiencia consistente.",
      },
    ],
    status: {
      done: [
        "Cadena ROOT→ROOT funcionando con 48 tests",
        "Portal web desplegado en Vercel",
        "API en Railway con cookies cross-origin",
        "APK firmado distribuido vía GitHub Releases",
        "Auditoría diferenciada por entidad",
        "Multi-iglesia con permisos contextuales",
      ],
      pending: [
        "Migrar de synchronize a migraciones TypeORM formales",
        "Notificaciones push para invitaciones",
        "Panel de analíticas para ROOT",
      ],
    },
  },

  voiceforge: {
    slug: "voiceforge",
    problem:
      "Hacer accesible la clonación de voz para creadores hispanohablantes, con un motor de IA pesado (Seed-VC) que tiene dependencias incompatibles con el resto del backend, y monetizarlo en Colombia donde Stripe no tiene PSE ni Nequi.",
    approach:
      "Aislar el motor en un venv Python 3.10 disparado vía subprocess. Cachear features con invalidación versionada para reducir latencia ~30%. Frontend Flutter cross-platform. Landing comercial separada con Wompi para soportar pagos colombianos.",
    sections: [
      {
        heading: "Aislamiento por subprocess",
        command: "cat packages/voiceforge_core/src/inference/seed_vc.py",
        body: [
          "Seed-VC requiere torch/transformers en versiones específicas que chocan con el resto del backend.",
          "La solución: venv aislado Python 3.10 con su propio stack. El backend lo invoca por CLI con archivos WAV.",
          "Bonus: el motor puede correr en otra máquina sin tocar la API.",
        ],
      },
      {
        heading: "Feature caching versionado",
        command: "cat docs/seed-vc-reference-cache.md",
        body: [
          "Features de referencia (mel-spectrograms, embeddings) se cachean en disco con versión por voice_profile_id.",
          "Cambiar la referencia bump-ea la versión y recalcula en cascada de forma determinista.",
          "Mide ~30% menos latencia de conversión vs baseline en los benchmarks documentados.",
        ],
      },
      {
        heading: "Resident runtime",
        command: "ps aux | grep seed-vc-resident",
        body: [
          "Sidecar opcional que mantiene los modelos calientes en memoria con timeout idle de 900s.",
          "Conversiones repetidas pasan de ~3s cold start a <800ms.",
          "Diseñado para que activarlo o desactivarlo no requiera redeploy.",
        ],
      },
      {
        heading: "Wompi sobre Stripe",
        command: "cat web/landing/src/app/api/payments/route.ts",
        body: [
          "Stripe no soporta PSE ni Nequi en Colombia.",
          "Wompi da COP nativo, PSE, Nequi y respaldo Bancolombia con fees ~3%.",
          "Webhook verification SHA256 con secret separado del integrity hash. Auth0 user IDs codificados como __ para evitar parsing roto.",
        ],
      },
      {
        heading: "Signed download URLs",
        command: "cat web/landing/src/app/api/download/route.ts",
        body: [
          "El botón \"Descargar APK\" no entrega un link directo.",
          "Llama a /api/download que firma un token HMAC-SHA256 con expiry de 1h.",
          "Evita que un link compartido en redes deje de ser un asset privado.",
        ],
      },
    ],
    decisions: [
      {
        title: "API sync (no async)",
        body: "SQLAlchemy 2.0 con sesiones sync. La concurrencia vive en el worker Redis, no en el handler HTTP. Más simple de razonar y debugger.",
      },
      {
        title: "Embeddings con fallback determinista",
        body: "Resemblyzer (GE2E 256-dim) como primario. SHA-256 deterministic hashes como fallback cuando la lib no está. Permite desarrollo sin reventar dependencies en CI ligeros.",
      },
      {
        title: "Suscripción freemium",
        body: "Gratis (3 conv/mes, watermark), Pro ($29,900 COP, 50/mes), Unlimited ($79,900 COP). Decisión basada en análisis competitivo y en que un pago único no cubría costos de GPU.",
      },
      {
        title: "Landing desacoplada del core",
        body: "Next.js independiente con su propio deploy. Endpoints de pago viven en la landing, no en FastAPI. Minimiza cross-origin con Auth0 y permite iterar marketing sin tocar el backend.",
      },
    ],
    status: {
      done: [
        "Backend funcional con Seed-VC real",
        "Cliente Flutter completo: auth, perfiles, conversiones, historial",
        "Feature cache + resident runtime medidos en benchmarks",
        "Landing Next.js con Wompi + Auth0 + signed URLs",
        "WebSocket de notificaciones en tiempo real",
        "Cumplimiento legal Colombia (Ley 1581/2012)",
      ],
      pending: [
        "CI/CD pipeline completo",
        "Docker para inferencia con GPU",
        "Tokenización Wompi para suscripciones recurrentes reales",
        "BD persistente para compras (hoy en memoria)",
      ],
    },
  },

  warbackend: {
    slug: "warbackend",
    problem:
      "Diseñar un backend de juego de rol donde el cliente jamás calcule daño, pero que sea suficientemente flexible para que un equipo de diseño edite habilidades sin tocar código.",
    approach:
      "Pipeline de combate determinista de 11 etapas con servicios pequeños y testables. Panel administrativo con flujo editorial Draft→Published→Archived. Catálogo de skills en JSON persistido con columnas denormalizadas para validación rápida.",
    sections: [
      {
        heading: "Pipeline de combate de 11 etapas",
        command: "cat War.Core/Combat/CombatEventResolver.cs",
        body: [
          "1. Magnitud → 2. Costos → 3. Hit → 4. Crit → 5. Daño → 6. Mitigación → 7. Reducciones → 8. Modificadores → 9. Interacciones → 10. Condiciones → 11. Proyección de recursos.",
          "Cada etapa es un servicio inyectable con responsabilidad única.",
          "El resolver orquesta pero NO calcula. Toda la lógica vive en los servicios especializados.",
        ],
      },
      {
        heading: "Separación costo vs impacto",
        command: "cat War.Core/Combat/CombatEventModels.cs",
        body: [
          "ActionResourceCosts: lo que el actor PAGA para ejecutar la acción.",
          "ImpactResourceChanges: lo que la acción HACE al objetivo.",
          "No se mezclan. Si los costos no alcanzan, la acción aborta con InsufficientResources antes de tocar hit/crit/daño.",
        ],
      },
      {
        heading: "Combos persistidos en CharacterEntity",
        command: "cat War.Infrastructure/Persistence/CharacterEntity.cs",
        body: [
          "Cada clase tiene un combo de 6 etapas con ventana de continuación de 2s.",
          "El estado del combo (LastBasicComboStage, LastBasicComboCompletedAtUtc) vive en la BD, no en el cliente.",
          "Eso cierra el vector de un cliente falseando el combo.",
        ],
      },
      {
        heading: "Flujo editorial de skills",
        command: "ls War.Api/wwwroot/admin/",
        body: [
          "Estados: Draft → Published → PublishedWithDraft → Archived.",
          "El runtime NUNCA consume drafts ni archivadas.",
          "Las skills se persisten como JSON en admin_skill_records + columnas denormalizadas.",
          "Eso permite CRUD real sin migrar el schema en cada cambio.",
        ],
      },
      {
        heading: "Matriz elemental centralizada",
        command: "cat War.Core/Combat/CombatConditionInteractions.cs",
        body: [
          "Heat, Cold, Electrified, Freeze, Weaken interaccionan vía una matriz única.",
          "Regla: la skill declara qué puede aplicar; la matriz decide qué reacción ocurre.",
          "Las stats pueden mejorar probabilidad/duración, pero no pueden hacer que una skill aplique un estado no declarado.",
        ],
      },
    ],
    decisions: [
      {
        title: "Combate determinista del lado servidor",
        body: "El cliente nunca calcula daño. Esto simplifica el modelo de seguridad cuando se añada multiplayer real y elimina el vector más obvio de cheating.",
      },
      {
        title: "Proyección antes de persistencia",
        body: "CombatResourceProjectionService calcula valores propuestos (con clamp a 0 o al máximo) SIN tocar la BD. Permite simular combates hipotéticos o validar antes de aplicar.",
      },
      {
        title: "JSON + columnas denormalizadas",
        body: "Las skills se guardan como documento JSON completo + columnas relacionales para consulta. CRUD flexible sin migraciones por cada cambio de schema.",
      },
      {
        title: "Fallback legacy explícito",
        body: "Si una skill no envía MagnitudeProfile, el sistema usa BaseMagnitude y lo marca en el resultado. Migración gradual sin romper datos antiguos.",
      },
    ],
    status: {
      done: [
        "Pipeline de las 11 etapas implementado",
        "Sistema de combos de 6 etapas para las 4 clases iniciales",
        "Panel admin con flujo editorial completo",
        "Progresión de personaje hasta nivel 80",
        "Matriz elemental centralizada",
        "Kit base del Sorcerer (12 skills + 1 definitiva)",
      ],
      pending: [
        "Runtime completo de estados temporales (tick/duración)",
        "Sistema de habilidades completo para las otras 3 clases",
        "Colas de combate por actor",
        "Networking real (hoy es REST sobre demo)",
        "Cliente final del juego",
      ],
    },
  },

  "barber-booking": {
    slug: "barber-booking",
    problem:
      "Una barbería necesitaba reservas online con pagos parciales, recibos descargables y check-in rápido, sin que un cliente abandono del pago bloqueara el slot indefinidamente.",
    approach:
      "Booking intents que reservan el slot durante el checkout y lo liberan por TTL. Webhooks de Stripe como única fuente de verdad. Recibos PDF + QR generados client-side. Auth0 para clientes, JWT separado para admin.",
    sections: [
      {
        heading: "Booking intents con TTL",
        command: "cat server/prisma/schema.prisma",
        body: [
          "Cuando un cliente inicia el checkout, se crea un BookingIntent que reserva el slot temporalmente.",
          "Si no se completa el pago, expira tras BOOKING_INTENT_TTL_MINUTES (default 30).",
          "Eso evita que un cliente que abandone Stripe Checkout bloquee el horario para los demás.",
        ],
      },
      {
        heading: "Webhooks como fuente de verdad",
        command: "cat server/src/stripe/webhook.controller.ts",
        body: [
          "El frontend NUNCA marca una reserva como pagada.",
          "Siempre se espera el webhook checkout.session.completed.",
          "Si Stripe falla en notificar, la reserva queda como intent y se libera por TTL. Cero riesgo de pago confirmado sin verificación.",
        ],
      },
      {
        heading: "Recibos PDF + QR client-side",
        command: "cat client/src/utils/receipt.js",
        body: [
          "Tras confirmar el pago, jsPDF genera el recibo en el cliente.",
          "react-qr-code embebe un QR con el id de la reserva.",
          "El barbero escanea el QR en el shop para hacer check-in instantáneo.",
        ],
      },
      {
        heading: "Auth dual",
        command: "cat server/src/auth/",
        body: [
          "Clientes: login vía Auth0 (Google, email).",
          "Admin: contraseña + JWT firmado con secret propio.",
          "El panel admin no depende de Auth0 — si tu cuenta de Auth0 se cae, sigues pudiendo gestionar el negocio.",
        ],
      },
      {
        heading: "Depósito parcial 50/100%",
        command: "cat server/src/booking/checkout.service.ts",
        body: [
          "El cliente elige pagar 50% o 100% al reservar.",
          "El resto se cobra en la barbería.",
          "Reduce la fricción inicial pero deja un anclaje real para que el cliente aparezca.",
        ],
      },
    ],
    decisions: [
      {
        title: "Prisma + PostgreSQL",
        body: "ORM con type safety total contra el schema. Migraciones declarativas. Booking, BookingIntent, Receipt, User, Service, WorkingHour modelados con relaciones explícitas.",
      },
      {
        title: "Slot management vía booking intents",
        body: "La separación intent vs booking pagado es lo que hace el sistema robusto. Sin ella, o reservabas slots permanentemente (perdiendo ventas) o no los reservabas (riesgo de double-booking).",
      },
      {
        title: "Emails opcionales por SMTP",
        body: "Si las vars SMTP_* están vacías, los emails se loguean a consola en JSON. Permite desarrollo sin Mailtrap ni servicios externos.",
      },
      {
        title: "Vite + React 19 sin SSR",
        body: "El cliente es una SPA pura. No hay SEO crítico (el SEO es de la web pública de la barbería, este es solo el portal de reservas). SPA + Auth0 + Vite es el setup más simple para esto.",
      },
    ],
    status: {
      done: [
        "Reservas online con selección de servicio, fecha y horario",
        "Pago con depósito parcial vía Stripe Checkout",
        "Webhooks Stripe confirmando reservas automáticamente",
        "Recibos PDF + QR generados client-side",
        "Panel admin con auth JWT separado",
        "Booking intents con TTL configurable",
      ],
      pending: [
        "Notificaciones SMS (hoy solo email)",
        "Multi-barbero (hoy es single-barber)",
        "Reporting de ingresos por periodo",
      ],
    },
  },
};

export function getDetail(slug: string): ProjectDetail | undefined {
  return DETAILS[slug];
}
