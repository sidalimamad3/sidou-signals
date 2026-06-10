import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfaopjaucvcdzvuwxgyg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmYW9wamF1Y3ZjZHp2dXd4Z3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwODE3NjIsImV4cCI6MjA5NjY1Nzc2Mn0.Fqz0_3E0HvepAIxn4HbVhl_Qs8zOO1pq5fwyICqD4jo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
