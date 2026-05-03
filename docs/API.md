# API

Pre-Go-Live ships exactly one API route.

## `POST /api/waitlist`

Validates an email and returns 200. Does **not** persist yet — Phase 1
(`packages/api/`) wires the dashboard, Neon Postgres, and confirmation email.

### Request

```http
POST /api/waitlist HTTP/1.1
Content-Type: application/json

{ "email": "user@example.com" }
```

### Validation

Zod: `z.string().trim().toLowerCase().email().max(254)`.

### Responses

| Status | Body | When |
|--------|------|------|
| 200 | `{ "ok": true, "message": "You're on the list." }` | valid email |
| 400 | `{ "ok": false, "error": "Please enter a valid email." }` | invalid / missing email |
| 400 | `{ "ok": false, "error": "Invalid JSON body." }` | non-JSON request body |
| 429 | `{ "ok": false, "error": "Too many attempts. Try again later." }` | rate limited |

### Rate limit

In-memory token bucket keyed by IP (`x-forwarded-for` first segment, falling
back to `x-real-ip`, then `"anonymous"`).

- 5 successful + failed POSTs per IP per hour
- Bucket resets after 60 minutes of no traffic from that IP
- Resets on every server restart (acceptable for waitlist volume)

Phase 1 replaces this with Upstash so the limit survives restarts and works
across instances.

### What it does NOT do (yet)

- Persist to a database
- Send a confirmation email
- Hand off to a CRM
- Differentiate first-submit from re-submit
- Verify deliverability / MX records

The UI shows "You're on the list" on every 200, regardless of whether we'd
already seen this email — for the rate of submissions during Pre-Go-Live the
UX cost of double-submission is zero.

### Test coverage

[`app/api/waitlist/route.test.ts`](../app/api/waitlist/route.test.ts):
- Accepts valid email
- Rejects invalid email
- Rejects missing email
- Rejects malformed JSON
- Rate-limits after configured threshold

### Security

- Body size capped by Next's default JSON parser (1 MB) — no DOS surface beyond that.
- No PII logged. `console.log` is not used in the route.
- No SSRF surface — there is no outbound HTTP call.
- CSP allows the route via `connect-src 'self'` in [`next.config.ts`](../next.config.ts).
