# Database Seeder

This seeder syncs the MongoDB collections with the client mock data under `client/src/Mock` and creates a dedicated admin admin for the authentication flow.

## Run

From `Server/`:

```bash
npm run seed
```

Optional environment overrides:

```bash
ADMIN_SEED_EMAIL=admin@example.com
ADMIN_SEED_PASSWORD=Admin@12345!
```

The seeder reads `MONGODB_URI` from `Server/.env`.

## Mapping Notes

- `trialProfile.professions[]` is normalized into the backend’s single `profession` string by joining the list with ` | `.
- `trialProfile.availability` and `trialProfile.hireMe` are client-only fields and are not stored because the backend schema does not define them.
- `trialBlogs.createdAt` is mapped to `datePublished` because the backend uses `datePublished` instead of client timestamps.
- `trialTestimonials` contains a duplicate `_id` in the mock data; testimonials are therefore upserted by `email` to avoid overwriting distinct records.
- Nested mock `_id` values are preserved where the backend schema allows them, such as `socialLinks`, `techStack`, and `links` subdocuments.

## Seeded Collections

- `Admin` for the admin account.
- `Profile`
- `Project`
- `TechnicalSkills`
- `ConceptualSkills`
- `Qualifications`
- `Testimonials`
- `Blogs`
- `Activities`
- `Notifications`

## Summary

The script prints a per-collection summary showing how many records were created, updated, or left unchanged on each run.