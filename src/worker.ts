interface Equipment {
  id: string;
  name: string;
  category: string;
  compatibleVessels: string[];
  installGuide: string;
  byokRequirements: string[];
}

interface CompatibilityMatrix {
  equipmentId: string;
  vesselTypes: string[];
  requirements: string[];
}

interface InstallRequest {
  equipmentId: string;
  vesselId: string;
  userToken: string;
}

const equipmentCatalog: Equipment[] = [
  {
    id: "nav-001",
    name: "Advanced Navigation System",
    category: "Navigation",
    compatibleVessels: ["cargo", "tanker", "cruise"],
    installGuide: "Mount on bridge console, connect to power and data bus.",
    byokRequirements: ["Navigation License", "System Calibration Certificate"]
  },
  {
    id: "com-002",
    name: "Satellite Communicator",
    category: "Communication",
    compatibleVessels: ["cargo", "tanker", "fishing", "patrol"],
    installGuide: "Install on upper deck with clear sky view, ground properly.",
    byokRequirements: ["Frequency Authorization", "Antenna Alignment Tool"]
  }
];

const compatibilityMatrix: CompatibilityMatrix[] = [
  {
    equipmentId: "nav-001",
    vesselTypes: ["cargo", "tanker", "cruise"],
    requirements: ["Bridge console space", "24V DC power"]
  },
  {
    equipmentId: "com-002",
    vesselTypes: ["cargo", "tanker", "fishing", "patrol"],
    requirements: ["Upper deck mounting", "Grounding point"]
  }
];

const HTML_HEADER = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hero: Equipment Catalog</title>
  <style>
    :root { --dark: #0a0a0f; --accent: #d97706; --light: #f8fafc; }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: 'Inter', system-ui, sans-serif; 
      background: var(--dark); 
      color: var(--light); 
      line-height: 1.6;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header { 
      background: rgba(10, 10, 15, 0.95); 
      border-bottom: 2px solid var(--accent); 
      padding: 1.5rem 2rem;
      backdrop-filter: blur(10px);
    }
    .hero { 
      padding: 3rem 2rem; 
      text-align: center; 
      background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
    }
    .hero h1 { 
      font-size: 3rem; 
      margin-bottom: 1rem; 
      color: var(--accent);
      text-shadow: 0 0 20px rgba(217, 119, 6, 0.3);
    }
    .hero p { 
      font-size: 1.2rem; 
      max-width: 800px; 
      margin: 0 auto 2rem;
      opacity: 0.9;
    }
    .container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 0 2rem;
      flex: 1;
    }
    .features { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
      gap: 2rem; 
      margin: 3rem 0;
    }
    .feature-card { 
      background: rgba(255, 255, 255, 0.05); 
      border: 1px solid rgba(217, 119, 6, 0.2); 
      border-radius: 12px; 
      padding: 1.5rem; 
      transition: transform 0.3s, border-color 0.3s;
    }
    .feature-card:hover { 
      transform: translateY(-5px); 
      border-color: var(--accent);
    }
    .feature-card h3 { 
      color: var(--accent); 
      margin-bottom: 1rem;
      font-size: 1.3rem;
    }
    .btn { 
      display: inline-block; 
      background: var(--accent); 
      color: var(--dark); 
      padding: 0.75rem 1.5rem; 
      border-radius: 6px; 
      text-decoration: none; 
      font-weight: 600; 
      border: none;
      cursor: pointer;
      transition: opacity 0.3s;
    }
    .btn:hover { opacity: 0.9; }
    .btn-outline { 
      background: transparent; 
      border: 2px solid var(--accent); 
      color: var(--accent);
    }
    .footer { 
      margin-top: auto; 
      background: rgba(0, 0, 0, 0.4); 
      padding: 2rem; 
      text-align: center;
      border-top: 1px solid rgba(217, 119, 6, 0.2);
    }
    .fleet-footer { 
      font-size: 0.9rem; 
      opacity: 0.7; 
      margin-top: 1rem;
    }
    .api-endpoint { 
      background: rgba(0, 0, 0, 0.3); 
      padding: 0.5rem 1rem; 
      border-radius: 4px; 
      font-family: monospace; 
      margin: 0.5rem 0;
      border-left: 3px solid var(--accent);
    }
    .health-status { 
      display: inline-block; 
      width: 12px; 
      height: 12px; 
      background: #10b981; 
      border-radius: 50%; 
      margin-right: 0.5rem;
    }
  </style>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>`;

const HTML_FOOTER = `  <footer class="footer">
    <div class="container">
      <p>Hero Equipment Catalog &copy; ${new Date().getFullYear()}</p>
      <div class="fleet-footer">
        Part of the Hero Fleet Management System | Maritime Grade Equipment
      </div>
    </div>
  </footer>
</body>
</html>`;

function renderHome(): string {
  return `${HTML_HEADER}
  <header>
    <div class="container">
      <h2>Hero Equipment Catalog</h2>
    </div>
  </header>
  <main>
    <section class="hero">
      <div class="container">
        <h1>Equipment Catalog</h1>
        <p>Browse and install certified equipment for your vessels. Check compatibility, installation guides, and BYOK requirements.</p>
        <div style="margin-top: 2rem;">
          <a href="/api/equipment" class="btn">Browse Equipment</a>
          <a href="/api/compatibility" class="btn btn-outline" style="margin-left: 1rem;">Check Compatibility</a>
        </div>
      </div>
    </section>
    <div class="container">
      <section class="features">
        <div class="feature-card">
          <h3>Equipment Listing</h3>
          <p>Browse certified maritime equipment with detailed specifications and installation requirements.</p>
          <div class="api-endpoint">GET /api/equipment</div>
        </div>
        <div class="feature-card">
          <h3>Compatibility Matrix</h3>
          <p>Check vessel compatibility and technical requirements before installation.</p>
          <div class="api-endpoint">GET /api/compatibility</div>
        </div>
        <div class="feature-card">
          <h3>Install Guide</h3>
          <p>Step-by-step installation procedures and safety guidelines.</p>
          <div class="api-endpoint">POST /api/install</div>
        </div>
        <div class="feature-card">
          <h3>BYOK Requirements</h3>
          <p>Bring Your Own Key requirements and certification documentation.</p>
          <div class="api-endpoint">GET /api/equipment?byok=true</div>
        </div>
      </section>
      <section style="text-align: center; padding: 3rem 0;">
        <h2 style="color: var(--accent); margin-bottom: 1rem;">System Status</h2>
        <p><span class="health-status"></span> All systems operational</p>
        <a href="/health" class="btn btn-outline" style="margin-top: 1rem;">Check Health</a>
      </section>
    </div>
  </main>
  ${HTML_FOOTER}`;
}

function renderEquipmentList(): string {
  const items = equipmentCatalog.map(eq => `
    <div class="feature-card">
      <h3>${eq.name}</h3>
      <p><strong>Category:</strong> ${eq.category}</p>
      <p><strong>Compatible with:</strong> ${eq.compatibleVessels.join(", ")}</p>
      <p><strong>Install Guide:</strong> ${eq.installGuide}</p>
      <p><strong>BYOK Requirements:</strong> ${eq.byokRequirements.join(", ")}</p>
    </div>
  `).join("");

  return `${HTML_HEADER}
  <header>
    <div class="container">
      <h2>Equipment Catalog</h2>
      <a href="/" class="btn" style="margin-top: 1rem;">Back to Home</a>
    </div>
  </header>
  <main>
    <div class="container">
      <section style="padding: 2rem 0;">
        <h1 style="color: var(--accent); margin-bottom: 2rem;">Available Equipment</h1>
        <div class="features">
          ${items}
        </div>
      </section>
    </div>
  </main>
  ${HTML_FOOTER}`;
}

function renderCompatibility(): string {
  const matrix = compatibilityMatrix.map(cm => `
    <div class="feature-card">
      <h3>${equipmentCatalog.find(e => e.id === cm.equipmentId)?.name || cm.equipmentId}</h3>
      <p><strong>Vessel Types:</strong> ${cm.vesselTypes.join(", ")}</p>
      <p><strong>Requirements:</strong> ${cm.requirements.join(", ")}</p>
    </div>
  `).join("");

  return `${HTML_HEADER}
  <header>
    <div class="container">
      <h2>Compatibility Matrix</h2>
      <a href="/" class="btn" style="margin-top: 1rem;">Back to Home</a>
    </div>
  </header>
  <main>
    <div class="container">
      <section style="padding: 2rem 0;">
        <h1 style="color: var(--accent); margin-bottom: 2rem;">Equipment Compatibility</h1>
        <div class="features">
          ${matrix}
        </div>
      </section>
    </div>
  </main>
  ${HTML_FOOTER}`;
}

function renderHealth(): string {
  return JSON.stringify({
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      equipment_catalog: "operational",
      compatibility_matrix: "operational",
      install_service: "operational"
    },
    uptime: process.uptime ? `${Math.floor(process.uptime())}s` : "unknown"
  }, null, 2);
}

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const headers = new Headers({
    "Content-Type": "text/html",
    "X-Frame-Options": "DENY",
    "Content-Security-Policy": "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'self'"
  });

  if (url.pathname === "/" || url.pathname === "/index.html") {
    return new Response(renderHome(), { headers });
  }

  if (url.pathname === "/health") {
    headers.set("Content-Type", "application/json");
    return new Response(renderHealth(), { headers });
  }

  if (url.pathname === "/api/equipment") {
    if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.searchParams.get("format") === "json") {
      headers.set("Content-Type", "application/json");
      return new Response(JSON.stringify(equipmentCatalog, null, 2), { headers });
    }

    return new Response(renderEquipmentList(), { headers });
  }

  if (url.pathname === "/api/compatibility") {
    if (request.method !== "GET") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (url.searchParams.get("format") === "json") {
      headers.set("Content-Type", "application/json");
      return new Response(JSON.stringify(compatibilityMatrix, null, 2), { headers });
    }

    return new Response(renderCompatibility(), { headers });
  }

  if (url.pathname === "/api/install") {
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" }
      });
    }

    try {
      const body: InstallRequest = await request.json();
      
      if (!body.equipmentId || !body.vesselId || !body.userToken) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      const equipment = equipmentCatalog.find(e => e.id === body.equipmentId);
      if (!equipment) {
        return new Response(JSON.stringify({ error: "Equipment not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" }
        });
      }

      if (!equipment.compatibleVessels.includes(body.vesselId)) {
        return new Response(JSON.stringify({ 
          error: "Equipment not compatible with vessel type",
          compatibleVessels: equipment.compatibleVessels
        }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }

      return new Response(JSON.stringify({
        success: true,
        message: "Installation scheduled",
        equipment: equipment.name,
        installGuide: equipment.installGuide,
        byokRequirements: equipment.byokRequirements,
        estimatedTime: "2-4 hours"
      }, null, 2), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  }

  return new Response(JSON.stringify({ error: "Not found" }), {
    status: 404,
    headers: { "Content-Type": "application/json" }
  });
}

export default {
  async fetch(request: Request): Promise<Response> {
    return handleRequest(request);
  }
};