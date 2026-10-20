import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'

export default class UsersController {
  async index({ view }: HttpContext) {
    const users = await User.query().orderBy('id', 'asc')
    return view.render('pages/admin/users', { users })
  }

  async create({ view }: HttpContext) {
    return view.render('pages/admin/create')
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    // Kontrola, zda e-mail už neexistuje
    const existingUser = await User.query()
      .where('email', data.email)
      .first()

    if (existingUser) {
      return response.badRequest(
        'Uživatel s tímto e-mailem již existuje.'
      )
    }

    // Vytvoření nového uživatele
    await User.create(data)

    return response.redirect('/admin/users')
  }

  async edit({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)

    return view.render('pages/admin/edit', { user })
  }


  async update({ params, request, response, auth }: HttpContext) {
    const user = await User.findOrFail(params.id)

    // Kontrola zadaných údajů
    const data = await request.validateUsing(updateUserValidator)

    // Kontrola, zda e-mail nepoužívá jiný uživatel
    const existingUser = await User.query()
      .where('email', data.email)
      .whereNot('id', user.id)
      .first()

    if (existingUser) {
      return response.badRequest('E-mail již používá jiný uživatel.')
    }

    // Administrátor si nesmí odebrat vlastní roli
    if (auth.user?.id === user.id && data.role !== 'admin') {
      return response.badRequest(
        'Nemůžeš si odebrat vlastní administrátorskou roli.'
      )
    }

    user.fullName = data.fullName
    user.email = data.email
    user.role = data.role

    await user.save()

    return response.redirect('/admin/users')
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    // Administrátor nesmí smazat vlastní účet
    if (auth.user?.id === user.id) {
      return response.badRequest(
        'Nemůžeš smazat svůj vlastní účet.'
      )
    }

    await user.delete()

    return response.redirect('/admin/users')
  }
}
