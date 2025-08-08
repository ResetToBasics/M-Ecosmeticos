// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sawijbdcjqvqssyfpztx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhd2lqYmRjanF2cXNzeWZwenR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MTA4NzAsImV4cCI6MjA3MDE4Njg3MH0.WoefcL5CudM5mrgZO-5womQs5xmKnk1ShPRCoNAWjpg'

export const supabase = createClient(supabaseUrl, supabaseKey)