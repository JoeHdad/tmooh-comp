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
import { Pencil, Plus, Trash2 } from "lucide-react";

export type FieldType = "text" | "textarea" | "url" | "number" | "boolean";
export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
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
    const payload: Record<string, any> = {};
    for (const f of fields) {
      let v = editing[f.name];
      if (f.type === "number") v = Number(v) || 0;
      payload[f.name] = v === "" ? null : v;
    }
    const isUpdate = !!editing.id;
    const client = supabase as any;
    const res = isUpdate
      ? await client.from(table).update(payload).eq("id", editing.id)
      : await client.from(table).insert(payload);
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
                      {renderCell(row[c.name])}
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
                  {f.type === "textarea" ? (
                    <Textarea
                      id={f.name}
                      value={editing[f.name] ?? ""}
                      onChange={(e) =>
                        setEditing({ ...editing, [f.name]: e.target.value })
                      }
                      placeholder={f.placeholder}
                      rows={4}
                    />
                  ) : f.type === "boolean" ? (
                    <div className="flex items-center gap-3 pt-2">
                      <Switch
                        id={f.name}
                        checked={!!editing[f.name]}
                        onCheckedChange={(v) =>
                          setEditing({ ...editing, [f.name]: v })
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {editing[f.name] ? "Yes" : "No"}
                      </span>
                    </div>
                  ) : (
                    <Input
                      id={f.name}
                      type={
                        f.type === "number"
                          ? "number"
                          : f.type === "url"
                            ? "url"
                            : "text"
                      }
                      value={editing[f.name] ?? ""}
                      onChange={(e) =>
                        setEditing({ ...editing, [f.name]: e.target.value })
                      }
                      placeholder={f.placeholder}
                      required={f.required}
                    />
                  )}
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

function renderCell(v: any) {
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
  const s = String(v);
  return s.length > 60 ? s.slice(0, 60) + "…" : s;
}
