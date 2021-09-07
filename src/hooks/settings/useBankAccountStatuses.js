import { useEffect, useState } from "react";
import {
  BANK_VERIF_STATUS_NONE,
  BANK_VERIF_STATUS_PENDING,
  BANK_VERIF_STATUS_VERIFIED,
} from "../../constants/banking_form_types";

export default function useBankAccountStatuses(verify, data) {
  const [isNotVerified, setIsNotVerified] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsNotVerified(isNotVerifiedBankAccount(verify, data?.verifyStatus));
    setIsPending(isPendingBankAccount(verify, data?.verifyStatus));
    setIsVerified(isVerifiedBankAccount(verify, data?.verifyStatus));
  }, [verify, data]);

  const isNotVerifiedBankAccount = (verifing, status) =>
    verifing && status === BANK_VERIF_STATUS_NONE;

  const isPendingBankAccount = (verifing, status) =>
    verifing && status === BANK_VERIF_STATUS_PENDING;

  const isVerifiedBankAccount = (verifing, status) =>
    verifing &&
    (status === BANK_VERIF_STATUS_VERIFIED ||
      status === BANK_VERIF_STATUS_PENDING);

  return {
    isNotVerified,
    isPending,
    isVerified,
  };
}
