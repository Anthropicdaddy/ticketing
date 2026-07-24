"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Loader2 } from "lucide-react";

interface EmailLog {
  id: string;
  orderId: string;
  toEmail: string;
  subject: string;
  status: string;
  sentAt: string;
}

export default function EmailsPage() {
  const [emails, setEmails] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/emails")
      .then((r) => r.json())
      .then((data) => {
        setEmails(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const sent = emails.filter((e) => e.status === "sent").length;
  const failed = emails.filter((e) => e.status === "failed").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">送信履歴</h1>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>送信成功: {sent}</span>
          <span>·</span>
          <span>送信失敗: {failed}</span>
        </div>
      </div>

      <div className="space-y-4">
        {emails.map((email) => (
          <Card key={email.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      email.status === "sent" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {email.status === "sent" ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{email.subject}</p>
                    <p className="text-sm text-muted-foreground">宛先: {email.toEmail}</p>
                    {email.orderId && (
                      <p className="text-xs text-muted-foreground font-mono">注文: {email.orderId.slice(0, 16)}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={email.status === "sent" ? "default" : "destructive"}>
                    {email.status === "sent" ? "送信成功" : "送信失敗"}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(email.sentAt).toLocaleString("ja-JP")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {emails.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">送信履歴はありません</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
