import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  { auth: { persistSession: false } },
);

// Kayıt hataları testi asla bloklamaz; sadece loglanır.

export async function startParticipant(name: string): Promise<string | null> {
  const { data, error } = await supabase.rpc("start_participant", { p_name: name });
  if (error) {
    console.error("Katılımcı kaydedilemedi:", error.message);
    return null;
  }
  return data as string;
}

export async function completeParticipant(id: string): Promise<void> {
  const { error } = await supabase.rpc("complete_participant", { p_id: id });
  if (error) console.error("Tamamlanma kaydedilemedi:", error.message);
}
