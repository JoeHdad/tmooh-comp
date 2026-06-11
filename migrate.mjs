/**
 * Supabase Migration Script
 * Run: node migrate.mjs YOUR_SERVICE_ROLE_KEY
 * Get your service role key from:
 * https://supabase.com/dashboard/project/ralzzfemcjsbbsrhnffa/settings/api
 */

const SERVICE_ROLE_KEY = process.argv[2];
const SUPABASE_URL = "https://ralzzfemcjsbbsrhnffa.supabase.co";

if (!SERVICE_ROLE_KEY) {
  console.error("❌ Missing service role key!");
  console.error("Usage: node migrate.mjs YOUR_SERVICE_ROLE_KEY");
  console.error("Get it from: https://supabase.com/dashboard/project/ralzzfemcjsbbsrhnffa/settings/api");
  process.exit(1);
}

const SQL = `
ALTER TABLE portfolio_projects 
  ADD COLUMN IF NOT EXISTS description_ar     text,
  ADD COLUMN IF NOT EXISTS industry           text,
  ADD COLUMN IF NOT EXISTS industry_ar        text,
  ADD COLUMN IF NOT EXISTS services           text,
  ADD COLUMN IF NOT EXISTS services_ar        text,
  ADD COLUMN IF NOT EXISTS platform           text,
  ADD COLUMN IF NOT EXISTS platform_ar        text,
  ADD COLUMN IF NOT EXISTS role               text,
  ADD COLUMN IF NOT EXISTS role_ar            text,
  ADD COLUMN IF NOT EXISTS challenge          text,
  ADD COLUMN IF NOT EXISTS challenge_ar       text,
  ADD COLUMN IF NOT EXISTS solution           text,
  ADD COLUMN IF NOT EXISTS solution_ar        text,
  ADD COLUMN IF NOT EXISTS highlights_en_json text,
  ADD COLUMN IF NOT EXISTS highlights_ar_json text,
  ADD COLUMN IF NOT EXISTS scope              text[],
  ADD COLUMN IF NOT EXISTS scope_ar           text[],
  ADD COLUMN IF NOT EXISTS gallery            text[],
  ADD COLUMN IF NOT EXISTS scope_en_csv       text,
  ADD COLUMN IF NOT EXISTS scope_ar_csv       text;
`;

const BUCKET_SQL = `
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project-images',
  'project-images', 
  true,
  10485760,
  ARRAY['image/png','image/jpeg','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;
`;

async function runSQL(sql, label) {
  console.log(`\n⏳ Running: ${label}...`);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ query: sql }),
  });

  if (!res.ok) {
    // Try alternative endpoint
    const res2 = await fetch(`${SUPABASE_URL}/pg/query`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "apikey": SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });
    
    if (!res2.ok) {
      const text = await res2.text();
      console.error(`❌ Failed: ${text}`);
      return false;
    }
  }
  
  console.log(`✅ Done: ${label}`);
  return true;
}

// Use Supabase Management API instead
async function runMigration() {
  console.log("🚀 Starting Supabase Migration...");
  console.log(`📍 Project: ralzzfemcjsbbsrhnffa`);

  const res = await fetch(
    `https://api.supabase.com/v1/projects/ralzzfemcjsbbsrhnffa/database/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: SQL }),
    }
  );

  const data = await res.text();
  
  if (!res.ok) {
    console.error("❌ Migration failed:", data);
    console.log("\n📋 Please run this SQL manually in Supabase SQL Editor:");
    console.log("https://supabase.com/dashboard/project/ralzzfemcjsbbsrhnffa/sql/new");
    console.log("\n" + SQL);
    return;
  }

  console.log("✅ All columns added successfully!");
  
  // Create storage bucket
  const bucketRes = await fetch(
    `https://api.supabase.com/v1/projects/ralzzfemcjsbbsrhnffa/database/query`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: BUCKET_SQL }),
    }
  );

  if (bucketRes.ok) {
    console.log("✅ Storage bucket 'project-images' created!");
  }

  console.log("\n🎉 Migration complete! Your admin panel now supports all fields.");
}

runMigration().catch(console.error);
