import { useRef, useState } from "react";
import { Upload, FileCheck2, X, Loader2 } from "lucide-react";
import { ALLOWED_EXT, ALLOWED_MIME, MAX_FILE_BYTES } from "@/lib/kyc/constants";
import { uploadKycFile } from "@/lib/kyc/service";
import type { KycDocField } from "@/types/kyc";

interface Props {
  field: KycDocField;
  label: string;
  required?: boolean;
  value: string | null;
  onChange: (path: string | null) => void;
}

export function FileDrop({ field, label, required, value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pct, setPct] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function pick(file: File) {
    setError(null);
    if (file.size > MAX_FILE_BYTES) return setError("File exceeds 10 MB.");
    if (!ALLOWED_MIME.includes(file.type)) return setError("Only JPG, PNG or PDF allowed.");
    setPct(0);
    try {
      const url = await uploadKycFile(field, file, setPct);
      onChange(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setPct(null);
    }
  }

  const isImage = value
    ? value.includes("image") || value.match(/\.(jpg|jpeg|png|gif|webp)/i)
    : false;

  return (
    <div>
      <label className="text-sm font-semibold text-foreground">
        {label}{required && <span className="ml-0.5 text-primary">*</span>}
      </label>

      {value ? (
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-border bg-card p-3">
          {isImage && value ? (
            <img src={value} alt="" className="h-14 w-14 rounded-lg object-cover" />
          ) : (
            <div className="grid h-14 w-14 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
              <FileCheck2 className="h-6 w-6" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Uploaded</p>
            <p className="truncate text-xs text-muted-foreground">{value}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-accent"
            aria-label="Remove"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/30 px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5"
        >
          {pct !== null ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="font-medium text-foreground">Uploading… {pct}%</span>
              <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-border">
                <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
              </div>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              <span className="font-medium text-foreground">Click to upload</span>
              <span className="text-xs">JPG, PNG, PDF · max 10 MB</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        hidden
        accept={ALLOWED_EXT.join(",")}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) pick(f);
          e.target.value = "";
        }}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}
