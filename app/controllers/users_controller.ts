import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'

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

    await User.create(data)

    return response.redirect('/admin/users')
  }

  async edit({ params, view }: HttpContext) {
    const user = await User.findOrFail(params.id)

    return view.render('pages/admin/edit', { user })
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    const fullName = request.input('fullName')
    const email = request.input('email')
    const role = request.input('role')

    if (
      typeof fullName !== 'string' ||
      fullName.trim().length < 2 ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !['admin', 'user'].includes(role)
    ) {
      return response.badRequest('Neplatné údaje')
    }

    const existingUser = await User.query()
      .where('email', email.trim())
      .whereNot('id', user.id)
      .first()

    if (existingUser) {
      return response.badRequest('E-mail již existuje')
    }

    user.fullName = fullName.trim()
    user.email = email.trim()
    user.role = role

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
