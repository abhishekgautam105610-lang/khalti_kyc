import { useEffect, useRef, useState } from "react";
import { Shield, ArrowRight, RotateCw } from "lucide-react";

interface Props {
  email: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
}

const OTP_LENGTH = 6;
const TIMER_SECONDS = 60;

export function OtpVerification({ email, onVerify, onBack }: Props) {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [timer, setTimer] = useState(TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const next = [...otp];
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setOtp(next);
    const nextIndex = Math.min(text.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const allFilled = otp.every((d) => d !== "");

  const handleSubmit = () => {
    if (!allFilled) return;
    onVerify(otp.join(""));
  };

  const handleResend = () => {
    setTimer(TIMER_SECONDS);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-md flex-1 lg:mt-16">
      <div className="rounded-2xl bg-card p-6 text-center shadow-card sm:p-8">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10">
          <Shield className="h-7 w-7 text-primary" />
        </div>

        <h2 className="mt-4 text-xl font-bold text-foreground">Two-factor authentication</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the 6-digit verification code sent to
        </p>
        <p className="text-sm font-semibold text-foreground">{email}</p>

        <div className="mt-6 flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="h-12 w-10 rounded-lg border border-border text-center text-lg font-bold outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 sm:h-14 sm:w-12"
            />
          ))}
        </div>

        {timer > 0 ? (
          <p className="mt-4 text-xs text-muted-foreground">
            Code expires in{" "}
            <span className="font-semibold text-foreground">
              {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
            </span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            <RotateCw className="h-3.5 w-3.5" /> Resend code
          </button>
        )}

        <button
          type="button"
          disabled={!allFilled}
          onClick={handleSubmit}
          className="mt-6 w-full rounded-md bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          Verify <ArrowRight className="ml-1 inline h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={onBack}
          className="mt-3 text-sm font-semibold text-muted-foreground hover:text-foreground"
        >
          ← Back to login
        </button>
      </div>
    </div>
  );
}
