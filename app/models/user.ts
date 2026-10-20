import { UserSchema } from '#database/schema' // Databázové schéma uživatele
import hash from '@adonisjs/core/services/hash' // Hashování hesel
import { compose } from '@adonisjs/core/helpers' // Spojení funkcí modelu
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid' // Podpora přihlašování

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  // Model uživatele
  get initials() {
    // Získání iniciál uživatele
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@') // Rozdělení jména nebo e-mailu

    if (first && last) {
      // Pokud existují dvě části
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase() // První písmena velkým
    }

    return `${first.slice(0, 2)}`.toUpperCase() // První dva znaky velkým
  }
}
