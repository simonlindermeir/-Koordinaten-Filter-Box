export default {
  async fetch(request) {

    // CORS-Preflight (OPTIONS) sofort beantworten
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': '*',
        }
      });
    }

    const url = new URL(request.url);
    const target = url.searchParams.get('url');

    if (!target) {
      return new Response('Fehlender url-Parameter', { status: 400 });
    }

    // Nur OpenRailwayMap erlauben
    if (!target.startsWith('https://api.openrailwaymap.org/')) {
      return new Response('Nicht erlaubte Ziel-URL', { status: 403 });
    }

    const res = await fetch(target);
    const body = await res.text();

    return new Response(body, {
      status: res.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });
  }
}
