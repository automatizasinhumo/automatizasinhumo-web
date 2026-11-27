import type { EmailProvider, EmailMessage } from './provider';

/** Minimal shape of the Cloudflare `send_email` binding we use. */
export interface EmailBinding {
  send(message: {
    to: string;
    from: { email: string; name?: string };
    subject: string;
    html?: string;
    text?: string;
    attachments?: { filename: string; content: string; type: string; disposition: 'attachment' }[];
  }): Promise<unknown>;
}

/**
 * Cloudflare Email Sending adapter. The `from` address must be on a domain
 * onboarded via `wrangler email sending enable <domain>`.
 */
export function createCloudflareEmail(
  binding: EmailBinding,
  from: { email: string; name: string },
): EmailProvider {
  return {
    async send(msg: EmailMessage): Promise<void> {
      await binding.send({
        to: msg.to,
        from,
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
        ...(msg.attachments?.length
          ? { attachments: msg.attachments.map((a) => ({ filename: a.filename, content: a.content, type: a.contentType, disposition: 'attachment' as const })) }
          : {}),
      });
    },
  };
}
