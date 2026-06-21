import http from "node:http";

const PORT = Number(process.env.BAIDU_BRIDGE_PORT || 37123);

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) {
      res.writeHead(400, corsHeaders());
      res.end(JSON.stringify({ error: "Missing URL" }));
      return;
    }

    if (req.method === "OPTIONS") {
      res.writeHead(204, corsHeaders());
      res.end();
      return;
    }

    if (req.method === "GET" && req.url === "/health") {
      res.writeHead(200, { ...corsHeaders(), "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ ok: true, port: PORT }));
      return;
    }

    if (req.method !== "POST" || req.url !== "/api/trans/vip/translate") {
      res.writeHead(404, corsHeaders());
      res.end(JSON.stringify({ error: "Not found" }));
      return;
    }

    const body = await readBody(req);
    const response = await fetch("https://api.fanyi.baidu.com/api/trans/vip/translate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body
    });
    const text = await response.text();
    res.writeHead(response.status, {
      ...corsHeaders(),
      "Content-Type": response.headers.get("content-type") || "application/json; charset=utf-8"
    });
    res.end(text);
  } catch (error) {
    res.writeHead(500, { ...corsHeaders(), "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }));
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Baidu bridge listening on http://127.0.0.1:${PORT}`);
});

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString("utf8");
}
