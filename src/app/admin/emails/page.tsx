"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Check, X } from "lucide-react";

interface EmailLog {
  id: string;
  toEmail: string;
  subject: string;
  status: "sent" | "failed";
  sentAt: string;
}

const sampleEmails: EmailLog[] = [
  {
    id: "EM-001",
    toEmail: "sato@example.com",
    subject: "チケット発行のお知らせ - よひろ 2026",
    status: "sent",
    sentAt: "2026-07-23T16:00:00",
  },
  {
    id: "EM-002",
    toEmail: "yamada@example.com",
    subject: "チケット発行のお知らせ - よひろ 2026",
    status: "sent",
    sentAt: "2026-07-22T10:30:00",
  },
  {
    id: "EM-003",
    toEmail: "error@example.com",
    subject: "チケット発行のお知らせ - (summer) festival",
    status: "failed",
    sentAt: "2026-07-21T14:15:00",
  },
];

export default function EmailsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">送信履歴</h1>
        <div className="flex gap-2 text-sm text-muted-foreground">
          <span>送信成功: {sampleEmails.filter((e) => e.status === "sent").length}</span>
          <span>•</span>
          <span>送信失敗: {sampleEmails.filter((e) => e.status === "failed").length}</span>
        </div>
      </div>

      <div className="space-y-4">
        {sampleEmails.map((email) => (
          <Card key={email.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      email.status === "sent"
                        ? "bg-green-100"
                        : "bg-red-100"
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
                    <p className="text-sm text-muted-foreground">
                      宛先: {email.toEmail}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      email.status === "sent" ? "default" : "destructive"
                    }
                  >
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
      </div>
    </div>
  );
}
