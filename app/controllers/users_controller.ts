import type { HttpContext } from '@adonisjs/core/http' // Typ pro HTTP požadavky
import User from '#models/user' // Model uživatele
import { createUserValidator, updateUserValidator } from '#validators/user' // Validace údajů

export default class UsersController {
  // Controller pro správu uživatelů

  async index({ view }: HttpContext) {
    // Zobrazení seznamu uživatelů
    const users = await User.query().orderBy('id', 'asc') // Načtení uživatelů podle ID
    return view.render('pages/admin/users', { users }) // Zobrazení tabulky
  }

  async create({ view }: HttpContext) {
    // Formulář pro nového uživatele
    return view.render('pages/admin/create') // Zobrazení formuláře
  }

  async store({ request, response }: HttpContext) {
    // Vytvoření uživatele
    const data = await request.validateUsing(createUserValidator) // Kontrola údajů

    const existingUser = await User.query() // Vyhledání uživatele
      .where('email', data.email) // Kontrola e-mailu
      .first() // První nalezený záznam

    if (existingUser) {
      // Pokud e-mail již existuje
      return response.badRequest(
        // Vrácení chyby
        'Uživatel s tímto e-mailem již existuje.' // Chybová zpráva
      )
    }

    await User.create(data) // Uložení nového uživatele

    return response.redirect('/admin/users') // Návrat na seznam
  }

  async edit({ params, view }: HttpContext) {
    // Formulář pro úpravu
    const user = await User.findOrFail(params.id) // Vyhledání podle ID

    return view.render('pages/admin/edit', { user }) // Zobrazení formuláře
  }

  async update({ params, request, response, auth }: HttpContext) {
    // Úprava uživatele
    const user = await User.findOrFail(params.id) // Načtení uživatele

    const data = await request.validateUsing(updateUserValidator) // Validace údajů

    const existingUser = await User.query() // Hledání stejného e-mailu
      .where('email', data.email) // Porovnání e-mailu
      .whereNot('id', user.id) // Vynechání aktuálního uživatele
      .first() // První nalezený záznam

    if (existingUser) {
      // Pokud e-mail používá někdo jiný
      return response.badRequest('E-mail již používá jiný uživatel.') // Chybová zpráva
    }

    if (auth.user?.id === user.id && data.role !== 'admin') {
      // Ochrana vlastní admin role
      return response.badRequest(
        // Zamítnutí změny
        'Nemůžeš si odebrat vlastní administrátorskou roli.' // Chybová zpráva
      )
    }

    user.fullName = data.fullName // Změna jména
    user.email = data.email // Změna e-mailu
    user.role = data.role // Změna role

    await user.save() // Uložení změn

    return response.redirect('/admin/users') // Návrat na seznam
  }

  async destroy({ params, auth, response }: HttpContext) {
    // Smazání uživatele
    const user = await User.findOrFail(params.id) // Vyhledání podle ID

    if (auth.user?.id === user.id) {
      // Ochrana vlastního účtu
      return response.badRequest(
        // Zamítnutí smazání
        'Nemůžeš smazat svůj vlastní účet.' // Chybová zpráva
      )
    }

    await user.delete() // Smazání z databáze

    return response.redirect('/admin/users') // Návrat na seznam
  }
}
