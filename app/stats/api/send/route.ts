// Forwards Umami tracker events to Umami Cloud with the visitor's own IP.
// A plain rewrite reaches Umami from Vercel's servers, so Cloudflare in front
// of Umami located every visitor at Vercel's region (Singapore) and visitors
// on the same browser collapsed into one. Umami uses payload.ip, when given,
// for both the location lookup and the visitor ID.

const UMAMI_SEND_URL = 'https://gateway.umami.is/api/send'
// The headers the tracker sends; x-umami-cache is its session token.
const FORWARDED_HEADERS = ['x-umami-website-id', 'x-umami-hostname', 'x-umami-cache']

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  if (!body?.payload) {
    return Response.json({ error: 'Bad request' }, { status: 400 })
  }

  // Vercel sets x-forwarded-for to the client IP; overwrite anything sent in.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')
  if (ip) body.payload.ip = ip

  const headers = new Headers({ 'Content-Type': 'application/json' })
  const userAgent = req.headers.get('user-agent')
  if (userAgent) headers.set('User-Agent', userAgent)
  for (const name of FORWARDED_HEADERS) {
    const value = req.headers.get(name)
    if (value) headers.set(name, value)
  }

  const res = await fetch(UMAMI_SEND_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  return new Response(res.body, {
    status: res.status,
    headers: { 'Content-Type': res.headers.get('content-type') ?? 'application/json' },
  })
}
