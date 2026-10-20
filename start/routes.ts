
import { middleware } from '#start/kernel' // Import middleware
import { controllers } from '#generated/controllers' // Import controllerů
import router from '@adonisjs/core/services/router' // Správa HTTP adres

router.on('/').render('pages/home').as('home') // Úvodní stránka

router
  .group(() => { // Stránky pro nepřihlášené
    router.get('signup', [controllers.NewAccount, 'create']) // Registrační formulář
    router.post('signup', [controllers.NewAccount, 'store']) // Vytvoření účtu

    router.get('login', [controllers.Session, 'create']) // Přihlašovací formulář
    router.post('login', [controllers.Session, 'store']) // Přihlášení uživatele
  })
  .use(middleware.guest()) // Přístup pouze pro hosty

router
  .group(() => { // Stránky pro přihlášené
    router.on('/dashboard').render('pages/dashboard').as('dashboard') // Dashboard
    router.post('logout', [controllers.Session, 'destroy']) // Odhlášení
  })
  .use(middleware.auth()) // Vyžaduje přihlášení

router
  .group(() => { // Administrace uživatelů
    router.get('/users', [controllers.Users, 'index']) // Seznam uživatelů
    router.get('/users/create', [controllers.Users, 'create']) // Formulář přidání
    router.post('/users', [controllers.Users, 'store']) // Uložení uživatele

    router.get('/users/:id/edit', [controllers.Users, 'edit']) // Formulář úpravy
    router.post('/users/:id/update', [controllers.Users, 'update']) // Uložení změn

    router.post('/users/:id/delete', [controllers.Users, 'destroy']) // Smazání uživatele
  })
  .prefix('/admin') // Prefix administračních adres
  .use([middleware.auth(), middleware.admin()]) // Přístup pouze pro admina
