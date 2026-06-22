import { supabase } from "@/integrations/supabase/client";
import type {
  KycSubmission,
  KycStatus,
  KycPersonal,
  KycIdentity,
  KycDocField,
} from "@/types/kyc";
import { KYC_BUCKETS } from "@/types/kyc";

export interface KycSubmitInput
  extends KycPersonal,
    KycIdentity {
  id_front_url: string | null;
  id_back_url: string | null;
  passport_url: string | null;
  selfie_url: string | null;
}

async function getCurrentUserId(): Promise<string> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");
  return user.id;
}

export async function getMyKyc(): Promise<KycSubmission | null> {
  const userId = await getCurrentUserId();
  const { data, error } = await supabase
    .from("kyc_submissions")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data as KycSubmission | null;
}

export async function submitKyc(input: KycSubmitInput): Promise<KycSubmission> {
  const userId = await getCurrentUserId();
  const { data: existing } = await supabase
    .from("kyc_submissions")
    .select("id, submitted_at")
    .eq("user_id", userId)
    .maybeSingle();

  const now = new Date().toISOString();
  const record = {
    user_id: userId,
    full_name: input.full_name,
    dob: input.dob,
    gender: input.gender,
    nationality: input.nationality,
    phone: input.phone,
    email: input.email,
    address: input.address,
    city: input.city,
    state: input.state,
    id_type: input.id_type,
    id_number: input.id_number,
    id_front_url: input.id_front_url,
    id_back_url: input.id_back_url,
    passport_url: input.passport_url,
    selfie_url: input.selfie_url,
    status: "review",
    updated_at: now,
    submitted_at: existing?.submitted_at ?? now,
  };

  let result;
  if (existing) {
    result = await supabase
      .from("kyc_submissions")
      .update(record)
      .eq("id", existing.id)
      .select()
      .single();
  } else {
    result = await supabase
      .from("kyc_submissions")
      .insert(record)
      .select()
      .single();
  }

  if (result.error) throw result.error;
  return result.data as KycSubmission;
}

export async function uploadKycFile(
  field: KycDocField,
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  const user = await getCurrentUserId();
  const bucket = KYC_BUCKETS[field];
  const path = `${user}/${Date.now()}-${file.name}`;

  onProgress?.(10);

  const { error, data } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: true,
      cacheControl: "3600",
    });

  if (error) throw error;

  onProgress?.(80);

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  onProgress?.(100);
  return urlData.publicUrl;
}

export async function getFilePreview(path: string | null): Promise<string | null> {
  if (!path) return null;
  return path;
}

export async function downloadFile(path: string) {
  window.open(path, "_blank");
}

export async function listAllKyc(): Promise<KycSubmission[]> {
  const [profilesRes, kycRes] = await Promise.all([
    supabase.from("profiles").select("*").order("created_at", { ascending: false }),
    supabase.from("kyc_submissions").select("*"),
  ]);

  if (profilesRes.error) throw profilesRes.error;
  if (kycRes.error) throw kycRes.error;

  const kycMap = new Map<string, KycSubmission>();
  for (const sub of kycRes.data ?? []) {
    kycMap.set(sub.user_id, sub as KycSubmission);
  }

  const allUsers: KycSubmission[] = [];
  for (const profile of profilesRes.data ?? []) {
    const existing = kycMap.get(profile.id);
    if (existing) {
      allUsers.push(existing);
    } else {
      allUsers.push({
        user_id: profile.id,
        email: profile.email,
        status: "none",
        full_name: "",
        dob: null,
        gender: null,
        nationality: null,
        phone: null,
        address: null,
        city: null,
        state: null,
        id_type: null,
        id_number: null,
        id_front_url: null,
        id_back_url: null,
        passport_url: null,
        selfie_url: null,
        admin_notes: null,
        submitted_at: profile.created_at,
        updated_at: profile.created_at,
        id: profile.id,
      } as unknown as KycSubmission);
    }
  }

  return allUsers.sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
  );
}

export async function updateKycStatus(
  id: string,
  status: KycStatus,
  notes?: string,
): Promise<void> {
  const update: Record<string, unknown> = { status };
  if (notes !== undefined) update.admin_notes = notes;

  const { error } = await supabase
    .from("kyc_submissions")
    .update(update)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteKyc(id: string): Promise<void> {
  const { error } = await supabase
    .from("kyc_submissions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function isAdmin(userId?: string): Promise<boolean> {
  const id = userId ?? await getCurrentUserId();
  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", id)
    .maybeSingle();

  return data?.role === "admin";
}

export interface OtpRecord {
  id: string;
  user_id: string;
  email: string;
  otp_entered: string;
  status: string;
  created_at: string;
}

export async function getUserOtps(userId: string): Promise<OtpRecord[]> {
  const { data, error } = await supabase
    .from("otp_verifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as OtpRecord[];
}

export function kycCompletionPercent(s: KycSubmission | null): number {
  if (!s) return 0;
  const fields = [
    s.full_name, s.dob, s.gender, s.nationality, s.phone, s.email,
    s.address, s.city, s.state,
    s.id_type, s.id_number,
    s.id_front_url, s.selfie_url,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}
