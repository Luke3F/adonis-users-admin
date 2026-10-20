import router from '@adonisjs/core/services/router' // Správa rout
import server from '@adonisjs/core/services/server' // Správa serveru

server.errorHandler(() => import('#exceptions/handler')) // Zpracování chyb

server.use([
  // Middleware pro všechny požadavky
  () => import('#middleware/container_bindings_middleware'), // Propojení služeb
  () => import('@adonisjs/static/static_middleware'), // Statické soubory
  () => import('@adonisjs/vite/vite_middleware'), // Podpora Vite
])

router.use([
  // Middleware pro existující routy
  () => import('@adonisjs/core/bodyparser_middleware'), // Zpracování formulářů
  () => import('@adonisjs/session/session_middleware'), // Uživatelské relace
  () => import('@adonisjs/shield/shield_middleware'), // Bezpečnost požadavků
  () => import('@adonisjs/auth/initialize_auth_middleware'), // Inicializace přihlášení
  () => import('#middleware/silent_auth_middleware'), // Tichá kontrola přihlášení
])

export const middleware = router.named({
  // Registrace pojmenovaných middleware
  admin: () => import('#middleware/admin_middleware'), // Kontrola admin role
  guest: () => import('#middleware/guest_middleware'), // Přístup pro hosty
  auth: () => import('#middleware/auth_middleware'), // Kontrola přihlášení
})
