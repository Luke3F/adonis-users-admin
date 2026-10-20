import { BaseSeeder } from '@adonisjs/lucid/seeders' // Základní třída seederu
import User from '#models/user' // Model uživatele

export default class extends BaseSeeder {
  // Seeder testovacích účtů
  async run() {
    // Spuštění seederu
    await User.updateOrCreate(
      // Vytvoření nebo aktualizace admina
      { email: 'admin@example.com' }, // Vyhledání podle e-mailu
      {
        fullName: 'Administrátor', // Jméno administrátora
        email: 'admin@example.com', // E-mail administrátora
        password: 'admin1234', // Testovací heslo
        role: 'admin', // Administrátorská role
      }
    )

    await User.updateOrCreate(
      // Vytvoření nebo aktualizace uživatele
      { email: 'user@example.com' }, // Vyhledání podle e-mailu
      {
        fullName: 'Běžný uživatel', // Jméno uživatele
        email: 'user@example.com', // E-mail uživatele
        password: 'user1234', // Testovací heslo
        role: 'user', // Běžná uživatelská role
      }
    )
  }
}
