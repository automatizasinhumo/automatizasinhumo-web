import { describe, expect, it } from 'vitest';
import { base64Utf8, createCloudflareEmail, type EmailBinding } from './cloudflare';

describe('adaptador de correo de Cloudflare', () => {
  it('codifica el adjunto en Base64 sobre UTF-8 (tildes incluidas)', async () => {
    const enviados: Parameters<EmailBinding['send']>[0][] = [];
    const email = createCloudflareEmail({ send: async (m) => void enviados.push(m) }, { email: 'a@b.es', name: 'A' });
    const ics = 'BEGIN:VCALENDAR\r\nSUMMARY:Cita en Peluquería Ñandú\r\nEND:VCALENDAR';
    await email.send({ to: 'c@d.es', subject: 's', html: '<p>t</p>', text: 't', attachments: [{ filename: 'cita.ics', content: ics, contentType: 'text/calendar' }] });
    const c = enviados[0]!.attachments![0]!.content;
    expect(new TextDecoder().decode(Uint8Array.from(atob(c), (x) => x.charCodeAt(0)))).toBe(ics);
    expect(base64Utf8('ñ')).toBe('w7E=');
  });

  it('sin adjuntos no manda el campo', async () => {
    const enviados: Parameters<EmailBinding['send']>[0][] = [];
    await createCloudflareEmail({ send: async (m) => void enviados.push(m) }, { email: 'a@b.es', name: 'A' }).send({ to: 'c@d.es', subject: 's', html: '<p>t</p>', text: 't' });
    expect(enviados[0]).not.toHaveProperty('attachments');
    expect(enviados[0]).not.toHaveProperty('replyTo');
  });

  it('pasa el Reply-To al binding', async () => {
    const enviados: Parameters<EmailBinding['send']>[0][] = [];
    await createCloudflareEmail({ send: async (m) => void enviados.push(m) }, { email: 'a@b.es', name: 'A' }).send({ to: 'c@d.es', subject: 's', html: '<p>t</p>', text: 't', replyTo: 'x@y.es' });
    expect(enviados[0]!.replyTo).toBe('x@y.es');
  });
});
