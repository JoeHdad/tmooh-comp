import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Mail, Phone, Building2, Trash2, Calendar } from "lucide-react";

export const Route = createFileRoute("/admin/messages")({
  component: MessagesPage,
});

type Message = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  project_details: string;
  created_at: string;
};

function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setMessages((data ?? []) as Message[]);
  };

  useEffect(() => {
    load();
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_messages").delete().eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Message deleted");
    setMessages((m) => m.filter((x) => x.id !== id));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Contact Messages</h1>
          <p className="text-sm text-muted-foreground">
            {messages.length} message{messages.length === 1 ? "" : "s"} received
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={load}>
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-card p-8 text-center text-muted-foreground">
          Loading…
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-card p-8 text-center text-muted-foreground">
          No messages yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl border border-white/10 bg-card p-5 shadow-card"
            >
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{m.full_name}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(m.created_at).toLocaleString()}
                    </span>
                    <a
                      href={`mailto:${m.email}`}
                      className="inline-flex items-center gap-1.5 hover:text-foreground"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {m.email}
                    </a>
                    {m.phone && (
                      <a
                        href={`tel:${m.phone}`}
                        className="inline-flex items-center gap-1.5 hover:text-foreground"
                        dir="ltr"
                      >
                        <Phone className="h-3.5 w-3.5" />
                        {m.phone}
                      </a>
                    )}
                    {m.company_name && (
                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" />
                        {m.company_name}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(m.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </header>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                {m.project_details}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
