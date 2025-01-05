# setup

1. Pull postgres database url from vercel
2. `bun drizzle:generate` to create sql based on `./db/schema`. stored in `./db/migrations`
3. `bun drizzle:push` to push those migrations to vercel. Note that this won't update existing schemas, and will error if they already exist.
4. `bun drizzle:seed` to seed data from `./db/seed` into vercel

# todo

- [] clean up seed file
- [] work out if we want to continue using those weird IDs from `@paralleldrive/cuid2`
