// ============================================================
// SUPABASE CONFIG — fill these in after you create your project
// (Project Settings → API in the Supabase dashboard)
// This "anon public" key is SAFE to expose in frontend code —
// Row Level Security policies (set up via schema.sql) are what
// actually control who can read/write what. Never put the
// "service_role" key here.
// ============================================================
const SUPABASE_URL = "https://migxsmfzwskwcaqgkwhk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pZ3hzbWZ6d3Nrd2NhcWdrd2hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNDc2NDMsImV4cCI6MjEwMTYyMzY0M30.SYo_2YmHA4EvUwD6bIzEOBfrPRLyFslyxdkFB2OZgjY";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
