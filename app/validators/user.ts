import vine from '@vinejs/vine'

// Validace registrace
export const signupValidator = vine.create({
  fullName: vine.string().trim().minLength(2),
  email: vine.string().trim().email(),
  password: vine.string().minLength(8),
})

// Validace přihlášení
export const loginValidator = vine.create({
  email: vine.string().trim().email(),
  password: vine.string(),
})

// Validace vytvoření uživatele administrátorem
export const createUserValidator = vine.create({
  fullName: vine.string().trim().minLength(2),

  email: vine.string().trim().email(),

  password: vine.string().minLength(8),

  role: vine.enum(['admin', 'user']),
})
