export async function handler() {
  try {
    const res = await fetch("https://www.meteo.ad/xml/neige.xml");

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: res.statusText
      };
    }

    const xml = await res.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=300"
      },
      body: xml
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.message
    };
  }
}
