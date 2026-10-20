# Správa uživatelů – AdonisJS

## Popis projektu

Cílem projektu bylo vyzkoušet framework AdonisJS a vytvořit jednoduchou webovou aplikaci pro správu uživatelů.

Aplikace umožňuje administrátorovi zobrazovat, vytvářet, upravovat a mazat uživatelské účty. Součástí je přihlašování, registrace a rozdělení uživatelů podle rolí.

## Použité technologie

- **AdonisJS** – backendový framework pro Node.js
- **TypeScript** – programovací jazyk
- **SQLite** – databáze
- **Lucid ORM** – práce s databází
- **Edge** – šablonovací systém
- **VineJS** – validace formulářů
- **HTML a CSS** – uživatelské rozhraní
- **Git a GitHub** – verzování projektu

## Funkce aplikace

- Registrace a přihlášení uživatelů
- Role administrátor a běžný uživatel
- Zabezpečený přístup do administrace
- Zobrazení seznamu uživatelů
- Vytváření nových uživatelů
- Úprava jména, e-mailu a role
- Mazání uživatelských účtů
- Validace formulářových údajů
- Kontrola duplicitních e-mailů
- Ochrana před smazáním vlastního účtu a odebráním vlastní administrátorské role

## Instalace a spuštění

Nejprve je potřeba mít nainstalovaný Node.js a npm.

Naklonování projektu:

```bash
git clone https://github.com/Luke3F/adonis-users-admin.git
cd adonis-users-admin
```

Instalace závislostí:

```bash
npm install
```

Vytvoření konfiguračního souboru:

```bash
cp .env.example .env
```

V prostředí Windows lze soubor `.env.example` také ručně zkopírovat a přejmenovat na `.env`.

Vygenerování aplikačního klíče:

```bash
node ace generate:key
```

V souboru `.env` je potřeba nastavit připojení k SQLite databázi podle konfigurace projektu.

Spuštění databázových migrací:

```bash
node ace migration:run
```

Pro vytvoření ukázkových uživatelů lze spustit seeder:

```bash
node ace db:seed
```

Spuštění vývojového serveru:

```bash
npm run dev
```

Aplikace je následně dostupná na adrese:

http://localhost:3333

## Zkušenosti s AdonisJS

Práce s AdonisJS byla zajímavá především tím, že framework obsahuje mnoho připravených funkcí. Díky tomu nebylo nutné vytvářet všechny části aplikace od začátku.

Ze začátku bylo složitější zorientovat se ve struktuře projektu a pochopit propojení rout, controllerů, modelů a šablon. Po vytvoření prvních funkcí už byla další práce jednodušší.

Při vývoji se objevily také problémy s validací, importy a konfigurací databáze. Jejich řešení pomohlo lépe pochopit fungování frameworku.

## Výhody AdonisJS

- Používá TypeScript, který pomáhá odhalovat chyby.
- Má přehlednou MVC strukturu.
- Obsahuje vlastní ORM pro práci s databází.
- Podporuje migrace a seedery.
- Nabízí připravené řešení autentizace a validace.
- Umožňuje rychle vytvářet webové aplikace.

## Nevýhody AdonisJS

- Pro začátečníka může být složitější konfigurace projektu.
- Některé chyby v TypeScriptu mohou být obtížně pochopitelné.
- Oproti populárnějším frameworkům má menší komunitu.
- Při hledání řešení je někdy potřeba dávat pozor na rozdíly mezi verzemi frameworku.

## Porovnání AdonisJS a Laravelu

| Vlastnost | AdonisJS | Laravel |
|---|---|---|
| Programovací jazyk | TypeScript / JavaScript | PHP |
| Architektura | MVC | MVC |
| ORM | Lucid | Eloquent |
| Šablony | Edge | Blade |
| Validace | VineJS | Laravel Validation |
| Migrace databáze | Ano | Ano |
| Autentizace | Ano | Ano |
| Komunita | Menší | Větší |

Oba frameworky mají podobnou strukturu a nabízejí nástroje pro vývoj webových aplikací.

AdonisJS je vhodný především pro vývojáře, kteří chtějí pracovat s TypeScriptem a prostředím Node.js. Laravel je naopak dobrou volbou pro vývojáře používající PHP.

Laravel má rozsáhlejší komunitu a více dostupných návodů. AdonisJS však nabízí podobný způsob organizace projektu a řadu integrovaných nástrojů.

## Závěr

Při práci na projektu jsem si vyzkoušel vytvoření webové aplikace pomocí AdonisJS, práci s SQLite databází, autentizaci, validaci a základní CRUD operace.

Největším přínosem bylo pochopení struktury frameworku a propojení jednotlivých částí aplikace. AdonisJS hodnotím jako zajímavý framework, který je vhodný pro tvorbu webových aplikací v TypeScriptu.
