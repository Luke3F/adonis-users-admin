/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').render('pages/home').as('home')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.on('/dashboard').render('pages/dashboard').as('dashboard')
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.get('/users', [controllers.Users, 'index'])
    router.get('/users/create', [controllers.Users, 'create'])
    router.post('/users', [controllers.Users, 'store'])

    router.get('/users/:id/edit', [controllers.Users, 'edit'])
    router.post('/users/:id/update', [controllers.Users, 'update'])

    router.post('/users/:id/delete', [controllers.Users, 'destroy'])
  })
  .prefix('/admin')
  .use([middleware.auth(), middleware.admin()])
