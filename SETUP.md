# BHMS Sci Oly Website — Setup Guide

Everything content-related (questions, resources, event list) updates itself
once this is set up — you'll never need to touch code again for normal use.
This setup only has to be done once.

## 1. Create the Supabase project

1. Go to https://supabase.com → sign up / log in **using bhms.so.2021@gmail.com**.
2. "New project" → name it `bhms-scioly` → set a strong database password (save it somewhere — not the same as the site login password) → pick the region closest to San Diego (`us-west-1` / West US) → Create.
3. Wait ~2 min for it to finish provisioning.

## 2. Run the database schema

1. In the Supabase dashboard, left sidebar → **SQL Editor** → "New query".
2. Open `supabase/schema.sql` from this project, copy all of it, paste it in, click **Run**.
   This creates the `questions` and `resources` tables plus the security rules
   that let anyone read/submit, but only the logged-in admin edit.

## 3. Create the storage bucket (for PDFs/images)

1. Left sidebar → **Storage** → "New bucket".
2. Name it exactly `resources` (lowercase) → toggle **Public bucket** ON → Create.
3. Back in SQL Editor, run the last two `create policy` statements at the bottom
   of `schema.sql` (the storage ones) if you didn't run the whole file at once.

## 4. Create the admin login

1. Left sidebar → **Authentication** → **Users** → "Add user" → "Create new user".
2. Email: `bhms.so.2021@gmail.com`
3. Password: pick one (this is the site admin password — save it in a place
   your officers can access, e.g. a shared password manager).
4. Toggle **Auto Confirm User** ON so it doesn't need email verification → Create.

## 5. Get your API keys and plug them in

1. Left sidebar → **Project Settings** (gear icon) → **API**.
2. Copy the **Project URL** and the **anon public** key (NOT the `service_role` key).
3. Open `js/supabase-config.js` in this project and paste them in:
   ```js
   const SUPABASE_URL = "https://xxxxx.supabase.co";
   const SUPABASE_ANON_KEY = "eyJhbG...";
   ```
4. Save.

## 6. Push to GitHub Pages

Same flow you've used before:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-org-or-username>/bhms-scioly.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from branch → main / (root)**.
Give it a minute, then your site is live at `https://<username>.github.io/bhms-scioly/`.

## 7. Log in and test it

1. Visit `yoursite.com/admin.html`.
2. Log in with `bhms.so.2021@gmail.com` and the password from step 4.
3. Post a test resource and answer a test question, then check `resources.html`
   and `ask.html` to confirm they show up.

---

## How to keep building this without touching code

- **New resources / files**: just use the admin panel — Upload Resources tab.
  Nothing to redeploy.
- **Answering questions**: admin panel — Answer Questions tab.
- **Adding/renaming/removing an event next season**: edit ONE file,
  `js/events-data.js` — add or edit an entry in the `DIVISIONS` array. Every
  page (Events, Resources, the admin dropdowns) reads from that file
  automatically, so there's nothing else to change. Commit + push and it's live.
- **Officers section**: currently plain HTML in `index.html` under the
  "Officers" section (search for `id="officers"`) — swap in real names/roles.
  If you want this to be admin-editable too later (instead of hand-edited),
  that would just be one more Supabase table (`officers`) following the exact
  same pattern as `resources` — happy to add that when you're ready.
