import vine from '@vinejs/vine' // Knihovna pro validaci údajů

export const signupValidator = vine.create({
  // Validace registrace
  fullName: vine.string().trim().minLength(2), // Jméno alespoň 2 znaky
  email: vine.string().trim().email(), // Kontrola formátu e-mailu
  password: vine.string().minLength(8), // Heslo alespoň 8 znaků
})

export const loginValidator = vine.create({
  // Validace přihlášení
  email: vine.string().trim().email(), // Kontrola e-mailu
  password: vine.string(), // Kontrola textového hesla
})

export const createUserValidator = vine.create({
  // Validace nového uživatele
  fullName: vine.string().trim().minLength(2), // Kontrola jména
  email: vine.string().trim().email(), // Kontrola e-mailu
  password: vine.string().minLength(8), // Minimální délka hesla
  role: vine.enum(['admin', 'user']), // Povolené uživatelské role
})

export const updateUserValidator = vine.create({
  // Validace úpravy uživatele
  fullName: vine.string().trim().minLength(2), // Kontrola jména
  email: vine.string().trim().email(), // Kontrola e-mailu
  role: vine.enum(['admin', 'user']), // Povolené uživatelské role
})
