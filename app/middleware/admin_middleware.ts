import type { HttpContext } from '@adonisjs/core/http' // Typ HTTP kontextu
import type { NextFn } from '@adonisjs/core/types/http' // Typ další funkce

export default class AdminMiddleware {
  // Middleware pro administrátory
  async handle(ctx: HttpContext, next: NextFn) {
    // Zpracování požadavku
    if (ctx.auth.user?.role !== 'admin') {
      // Kontrola admin role
      return ctx.response.forbidden({
        // Zamítnutí přístupu
        message: 'Přístup pouze pro administrátory', // Chybová zpráva
      })
    }

    return next() // Povolení pokračování
  }
}
