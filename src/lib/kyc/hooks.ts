import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listAllKyc, updateKycStatus, getMyKyc, getUserOtps, type KycSubmitInput, submitKyc } from "./service";
import type { KycStatus } from "@/types/kyc";

const kycKeys = {
  all: ["kyc"] as const,
  list: () => [...kycKeys.all, "list"] as const,
  mine: () => [...kycKeys.all, "mine"] as const,
};

export function useKycList() {
  return useQuery({
    queryKey: kycKeys.list(),
    queryFn: listAllKyc,
  });
}

export function useMyKyc() {
  return useQuery({
    queryKey: kycKeys.mine(),
    queryFn: getMyKyc,
  });
}

export function useUpdateKycStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: KycStatus; notes?: string }) =>
      updateKycStatus(id, status, notes),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: kycKeys.list() });
    },
  });
}

export function useUserOtps(userId: string | undefined) {
  return useQuery({
    queryKey: [...kycKeys.all, "otps", userId],
    queryFn: () => getUserOtps(userId!),
    enabled: !!userId,
  });
}

export function useSubmitKyc() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: KycSubmitInput) => submitKyc(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: kycKeys.mine() });
    },
  });
}
