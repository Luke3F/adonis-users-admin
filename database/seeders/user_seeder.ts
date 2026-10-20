
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    await User.updateOrCreate(
      { email: 'admin@example.com' },
      {
        fullName: 'Administrátor',
        email: 'admin@example.com',
        password: 'admin1234',
        role: 'admin',
      }
    )

    await User.updateOrCreate(
      { email: 'user@example.com' },
      {
        fullName: 'Běžný uživatel',
        email: 'user@example.com',
        password: 'user1234',
        role: 'user',
      }
    )
  }
}
