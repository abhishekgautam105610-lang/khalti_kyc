export type KycStatus = "pending" | "review" | "approved" | "rejected" | "none";

export type IdType = "passport" | "national_id";

export interface KycPersonal {
  full_name: string;
  dob: string;
  gender: "Male" | "Female" | "Other" | "";
  nationality: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
}

export interface KycIdentity {
  id_type: IdType | "";
  id_number: string;
}

export interface KycDocuments {
  id_front_url: string | null;
  id_back_url: string | null;
  passport_url: string | null;
  selfie_url: string | null;
}

export interface KycSubmission
  extends KycPersonal,
    KycIdentity,
    KycDocuments {
  id: string;
  user_id: string;
  status: KycStatus;
  admin_notes: string | null;
  submitted_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  email: string | null;
  created_at: string;
}

export const ID_TYPE_LABEL: Record<IdType, string> = {
  passport: "Passport",
  national_id: "National ID",
};

export const KYC_BUCKETS = {
  id_front_url: "kyc-id-front",
  id_back_url: "kyc-id-back",
  passport_url: "kyc-passports",
  selfie_url: "kyc-selfies",
} as const;

export type KycDocField = keyof typeof KYC_BUCKETS;
