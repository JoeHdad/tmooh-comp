import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Pencil, Plus, Trash2, Upload, X } from "lucide-react";


export type FieldType = "text" | "number" | "boolean" | "image" | "textarea" | "select" | "url" | "gallery" | "string_array";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  /** For type="select" */
  options?: { value: string; label: string }[];
};

type Row = Record<string, any> & { id: string };

interface Props {
  title: string;
  description?: string;
  table: "portfolio_projects" | "services" | "testimonials";
  fields: FieldDef[];
  listColumns: { name: string; label: string }[];
  orderBy?: string;
}

export function CrudPage({
  title,
  description,
  table,
  fields,
  listColumns,
  orderBy = "sort_order",
}: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null); // field name currently uploading

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: true });
    if (error) toast.error(error.message);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [table]);

  const startCreate = () => {
    const empty: Row = { id: "" };
    fields.forEach((f) => {
      empty[f.name] =
        f.type === "boolean" ? true : f.type === "number" ? 0 : "";
    });
    setEditing(empty);
    setOpen(true);
  };

  const startEdit = (row: Row) => {
    setEditing({ ...row });
    setOpen(true);
  };

  const save = async () => {
    if (!editing) return;

    const buildPayload = (keys?: string[]) => {
      const payload: Record<string, any> = {};
      const targetFields = keys ? fields.filter(f => keys.includes(f.name)) : fields;
      for (const f of targetFields) {
        let v = editing[f.name];
        if (f.type === "number") v = Number(v) || 0;
        payload[f.name] = v === "" ? null : v;
      }
      return payload;
    };

    const isUpdate = !!editing.id;
    const client = supabase as any;

    // ── Attempt 1: save all fields ────────────────────────────────────────────
    let payload = buildPayload();
    let res = isUpdate
      ? await client.from(table).update(payload).eq("id", editing.id)
      : await client.from(table).insert(payload);

    // ── Attempt 2: if "column not found" error, retry with only safe base columns
    if (res.error && (res.error.message?.toLowerCase().includes("column") || res.error.message?.toLowerCase().includes("schema"))) {
      toast.warning("بعض الأعمدة الجديدة غير موجودة في قاعدة البيانات. جارٍ الحفظ بالبيانات الأساسية فقط...");
      const BASE_COLS = ["title", "description", "description_ar", "image_url", "link_url", "category", "sort_order", "published"];
      payload = buildPayload(BASE_COLS);
      res = isUpdate
        ? await client.from(table).update(payload).eq("id", editing.id)
        : await client.from(table).insert(payload);

      if (res.error) {
        toast.error("فشل الحفظ: " + res.error.message + "\n\nيرجى تشغيل SQL migration في Supabase لإضافة الأعمدة الجديدة.");
        return;
      }

      toast.success((isUpdate ? "تم التحديث" : "تم الإنشاء") + " (بيانات أساسية فقط — شغّل SQL migration لحفظ كل البيانات)");
      setOpen(false);
      setEditing(null);
      load();
      return;
    }

    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(isUpdate ? "Updated" : "Created");
    setOpen(false);
    setEditing(null);
    load();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from(table).delete().eq("id", deleteId);
    if (error) toast.error(error.message);
    else {
      toast.success("Deleted");
      load();
    }
    setDeleteId(null);
  };

  /** Convert a File to a base64 data URL (fallback when Storage is unavailable) */
  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  /** Upload image to Supabase Storage — auto-creates bucket if missing */
  const handleImageUpload = async (fieldName: string, file: File, isArray = false) => {
    setUploading(fieldName);
    const BUCKET = "project-images";
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${table}/${Date.now()}_${Math.random().toString(36).substring(2,7)}.${ext}`;

      // ── Attempt 1: upload directly ───────────────────────────────────────
      let { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true });

      // ── Attempt 2: bucket missing → try to create it, then retry ─────────
      if (upErr && (upErr.message.toLowerCase().includes("not found") ||
                    upErr.message.toLowerCase().includes("does not exist") ||
                    upErr.message.toLowerCase().includes("bucket"))) {
        const { error: bucketErr } = await supabase.storage.createBucket(BUCKET, {
          public: true,
          fileSizeLimit: 10485760, // 10 MB
          allowedMimeTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"],
        });

        if (!bucketErr) {
          // Retry after creating bucket
          const retry = await supabase.storage
            .from(BUCKET)
            .upload(path, file, { upsert: true });
          upErr = retry.error;
        } else {
          // Can't create bucket (RLS or plan restriction) → fall back to base64
          upErr = bucketErr;
        }
      }

      // ── Attempt 3: Storage completely unavailable → store as base64 ───────
      if (upErr) {
        if (file.size > 2 * 1024 * 1024) {
          toast.error("لا يمكن رفع الصورة إلى التخزين. الصورة كبيرة جداً للتخزين المحلي. يرجى لصق رابط URL مباشرة.");
          return;
        }
        toast.loading("جارٍ معالجة الصورة...", { id: "img-process" });
        const dataUrl = await fileToDataUrl(file);
        setEditing((prev) => {
          if (!prev) return prev;
          if (isArray) {
            const arr = Array.isArray(prev[fieldName]) ? prev[fieldName] : [];
            return { ...prev, [fieldName]: [...arr, dataUrl] };
          }
          return { ...prev, [fieldName]: dataUrl };
        });
        toast.success("تم تحميل الصورة محلياً ✓", { id: "img-process" });
        return;
      }

      // ── Success ───────────────────────────────────────────────────────────
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      setEditing((prev) => {
        if (!prev) return prev;
        if (isArray) {
          const arr = Array.isArray(prev[fieldName]) ? prev[fieldName] : [];
          return { ...prev, [fieldName]: [...arr, data.publicUrl] };
        }
        return { ...prev, [fieldName]: data.publicUrl };
      });
      toast.success("تم رفع الصورة بنجاح ✓");
    } catch (err: any) {
      toast.error("خطأ غير متوقع: " + (err?.message ?? String(err)));
    } finally {
      setUploading(null);
    }
  };

  const renderField = (f: FieldDef) => {
    if (!editing) return null;

    if (f.type === "textarea") {
      return (
        <Textarea
          id={f.name}
          value={editing[f.name] ?? ""}
          onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
          placeholder={f.placeholder}
          rows={4}
        />
      );
    }

    if (f.type === "boolean") {
      return (
        <div className="flex items-center gap-3 pt-2">
          <Switch
            id={f.name}
            checked={!!editing[f.name]}
            onCheckedChange={(v) => setEditing({ ...editing, [f.name]: v })}
          />
          <span className="text-sm text-muted-foreground">
            {editing[f.name] ? "Yes" : "No"}
          </span>
        </div>
      );
    }

    if (f.type === "select") {
      return (
        <select
          id={f.name}
          value={editing[f.name] ?? ""}
          onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">— Select —</option>
          {f.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (f.type === "image") {
      const currentUrl: string = editing[f.name] ?? "";
      return (
        <div className="space-y-3">
          {/* URL text input */}
          <div className="flex gap-2">
            <Input
              id={f.name}
              type="url"
              value={currentUrl}
              onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
              placeholder="https://... or upload below"
              className="flex-1"
            />
            {currentUrl && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => setEditing({ ...editing, [f.name]: "" })}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Upload button */}
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-muted-foreground hover:bg-white/10 transition-colors">
            <Upload className="h-4 w-4 shrink-0" />
            {uploading === f.name ? "Uploading…" : "Upload image"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading === f.name}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(f.name, file);
              }}
            />
          </label>

          {/* Preview */}
          {currentUrl && (
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20">
              <img
                src={currentUrl}
                alt="Preview"
                className="max-h-48 w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
        </div>
      );
    }

    if (f.type === "gallery") {
      const urls: string[] = Array.isArray(editing[f.name]) ? editing[f.name] : [];
      return (
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {urls.map((url, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/20 w-24 h-24">
                <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const newUrls = [...urls];
                    newUrls.splice(i, 1);
                    setEditing({ ...editing, [f.name]: newUrls });
                  }}
                >
                  <Trash2 className="h-5 w-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Upload button */}
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-muted-foreground hover:bg-white/10 transition-colors w-full">
            <Upload className="h-4 w-4 shrink-0" />
            {uploading === f.name ? "Uploading…" : "Add image to gallery"}
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              disabled={uploading === f.name}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(f.name, file, true);
              }}
            />
          </label>
        </div>
      );
    }

    if (f.type === "string_array") {
      const arr: string[] = Array.isArray(editing[f.name]) ? editing[f.name] : [];
      return (
        <Textarea
          id={f.name}
          value={arr.join("\n")}
          onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value.split("\n").filter(x => x.trim() !== "") })}
          placeholder={`${f.placeholder || ''}\n(Enter each item on a new line)`}
          rows={5}
        />
      );
    }

    // Default: text / url / number
    return (
      <Input
        id={f.name}
        type={
          f.type === "number" ? "number" : f.type === "url" ? "url" : "text"
        }
        value={editing[f.name] ?? ""}
        onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
        placeholder={f.placeholder}
        required={f.required}
      />
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Button onClick={startCreate}>
          <Plus className="me-2 h-4 w-4" /> New
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-left">
            <tr>
              {listColumns.map((c) => (
                <th key={c.name} className="px-4 py-3 font-medium">
                  {c.label}
                </th>
              ))}
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={listColumns.length + 1}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td
                  colSpan={listColumns.length + 1}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  No items yet. Click "New" to add one.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/5 last:border-0"
                >
                  {listColumns.map((c) => (
                    <td key={c.name} className="px-4 py-3 align-middle">
                      {renderCell(row[c.name], c.name)}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-end">
                    <div className="inline-flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => startEdit(row)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setDeleteId(row.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing?.id ? "Edit" : "Create"} item</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4 py-2">
              {fields.map((f) => (
                <div key={f.name}>
                  <Label htmlFor={f.name}>{f.label}</Label>
                  {renderField(f)}
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function renderCell(v: any, colName?: string) {
  if (typeof v === "boolean")
    return (
      <span
        className={
          v
            ? "rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs text-emerald-400"
            : "rounded-full bg-white/10 px-2 py-0.5 text-xs text-muted-foreground"
        }
      >
        {v ? "Published" : "Hidden"}
      </span>
    );
  if (v == null || v === "") return <span className="text-muted-foreground">—</span>;

  // Show thumbnail for image_url / avatar_url columns
  if (
    typeof v === "string" &&
    (colName === "image_url" || colName === "avatar_url") &&
    (v.startsWith("http") || v.startsWith("/"))
  ) {
    return (
      <img
        src={v}
        alt=""
        className="h-10 w-16 rounded-md object-cover border border-white/10"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    );
  }

  const s = String(v);
  return s.length > 60 ? s.slice(0, 60) + "…" : s;
}
