typescript
interface Equipment {
  id: string;
  name: string;
  category: string;
  compatibleWith: string[];
  installCommand: string;
  description: string;
  version: string;
}

interface Compatibility {
  equipmentId: string;
  compatibleEquipment: string[];
  requirements: string[];
}

interface Experiment {
  id: string;
  name: string;
  equipmentIds: string[];
  trafficSplit: number;
  active: boolean;
  createdAt: number;
}

interface Metrics {
  experimentId: string;
  installs: number;
  errors: number;
  lastUpdated: number;
}

const equipmentCatalog: Equipment[] = [
  {
    id: "nextjs-14",
    name: "Next.js 14",
    category: "Framework",
    compatibleWith: ["react-18", "typescript-5", "node-20"],
    installCommand: "npx create-next-app@latest",
    description: "React framework with app router and server components",
    version: "14.0.0"
  },
  {
    id: "react-18",
    name: "React 18",
    category: "Library",
    compatibleWith: ["typescript-5", "webpack-5", "vite-5"],
    installCommand: "npm install react@18 react-dom@18",
    description: "JavaScript library for building user interfaces",
    version: "18.2.0"
  },
  {
    id: "typescript-5",
    name: "TypeScript 5",
    category: "Language",
    compatibleWith: ["node-20", "webpack-5", "vite-5"],
    installCommand: "npm install typescript@5",
    description: "Typed JavaScript at any scale",
    version: "5.3.0"
  },
  {
    id: "node-20",
    name: "Node.js 20",
    category: "Runtime",
    compatibleWith: ["typescript-5", "express-4"],
    installCommand: "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash",
    description: "JavaScript runtime built on Chrome's V8 engine",
    version: "20.10.0"
  }
];

const compatibilityData: Compatibility[] = [
  {
    equipmentId: "nextjs-14",
    compatibleEquipment: ["react-18", "typescript-5", "node-20"],
    requirements: ["Node.js 18.17 or later"]
  },
  {
    equipmentId: "react-18",
    compatibleEquipment: ["typescript-5", "webpack-5"],
    requirements: ["Modern browser with ES6 support"]
  }
];

const experiments = new Map<string, Experiment>();
const metrics = new Map<string, Metrics>();

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function htmlResponse(content: string, status = 200): Response {
  return new Response(content, {
    status,
    headers: {
      "content-type": "text/html;charset=utf-8",
      "content-security-policy": "default-src 'self'; style-src 'self' 'unsafe-inline';",
      "x-frame-options": "DENY"
    }
  });
}

function jsonResponse(data: any, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json;charset=utf-8",
      "content-security-policy": "default-src 'self';",
      "x-frame-options": "DENY"
    }
  });
}

function renderPage(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | Equipment Catalog</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a0a0f;
      color: #e5e5e5;
      line-height: 1.6;
      min-height: 100vh;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    header {
      border-bottom: 1px solid #1f1f2e;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
    }
    h1 {
      color: #ffffff;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .accent { color: #d97706; }
    .subtitle {
      color: #a1a1aa;
      font-size: 1.1rem;
    }
    nav {
      display: flex;
      gap: 2rem;
      margin-top: 1.5rem;
    }
    nav a {
      color: #d97706;
      text-decoration: none;
      font-weight: 500;
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      transition: background 0.2s;
    }
    nav a:hover {
      background: rgba(217, 119, 6, 0.1);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }
    .card {
      background: #15151f;
      border: 1px solid #2a2a3a;
      border-radius: 0.75rem;
      padding: 1.5rem;
      transition: transform 0.2s, border-color 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
      border-color: #d97706;
    }
    .card h3 {
      color: #ffffff;
      margin-bottom: 0.5rem;
      font-size: 1.25rem;
    }
    .category {
      display: inline-block;
      background: rgba(217, 119, 6, 0.1);
      color: #d97706;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }
    .description {
      color: #a1a1aa;
      margin: 1rem 0;
      font-size: 0.95rem;
    }
    .install {
      background: #1a1a2a;
      padding: 1rem;
      border-radius: 0.5rem;
      font-family: 'Monaco', 'Consolas', monospace;
      font-size: 0.9rem;
      margin: 1rem 0;
      border-left: 3px solid #d97706;
    }
    .btn {
      background: #d97706;
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
      display: inline-block;
      text-decoration: none;
      font-size: 0.95rem;
    }
    .btn:hover { opacity: 0.9; }
    .btn-secondary {
      background: transparent;
      border: 1px solid #2a2a3a;
      color: #e5e5e5;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #a1a1aa;
      font-weight: 500;
    }
    input, select, textarea {
      width: 100%;
      padding: 0.75rem;
      background: #1a1a2a;
      border: 1px solid #2a2a3a;
      border-radius: 0.5rem;
      color: #e5e5e5;
      font-family: inherit;
    }
    .footer {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid #1f1f2e;
      color: #6b7280;
      text-align: center;
      font-size: 0.9rem;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }
    .metric-card {
      background: #15151f;
      padding: 1.5rem;
      border-radius: 0.75rem;
      text-align: center;
    }
    .metric-value {
      font-size: 2rem;
      font-weight: bold;
      color: #d97706;
      margin-bottom: 0.5rem;
    }
    .metric-label {
      color: #a1a1aa;
      font-size: 0.9rem;
    }
    .traffic-split {
      height: 8px;
      background: #2a2a3a;
      border-radius: 4px;
      overflow: hidden;
      margin: 1rem 0;
    }
    .traffic-bar {
      height: 100%;
      background: #d97706;
      border-radius: 4px;
    }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <header>
      <h1>Equipment <span class="accent">Catalog</span></h1>
      <p class="subtitle">Browse, install, and experiment with development equipment</p>
      <nav>
        <a href="/">Browse Equipment</a>
        <a href="/experiments">Experiments</a>
        <a href="/metrics">Metrics</a>
        <a href="/health">Health</a>
      </nav>
    </header>
    ${content}
    <footer class="footer">
      <p>Equipment Catalog Fleet &copy; ${new Date().getFullYear()}</p>
      <p>Deployed on Cloudflare Workers | Zero Dependencies</p>
    </footer>
  </div>
</body>
</html>`;
}

function renderEquipmentList(): string {
  const cards = equipmentCatalog.map(equipment => `
    <div class="card">
      <span class="category">${equipment.category}</span>
      <h3>${equipment.name} <small>v${equipment.version}</small></h3>
      <p class="description">${equipment.description}</p>
      <div class="install">${equipment.installCommand}</div>
      <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
        <button class="btn" onclick="installEquipment('${equipment.id}')">Install</button>
        <a href="/api/compatibility?equipmentId=${equipment.id}" class="btn btn-secondary">Check Compatibility</a>
      </div>
    </div>
  `).join("");

  const script = `
    <script>
      async function installEquipment(id) {
        const experiment = prompt("Enter experiment name (optional):");
        const trafficSplit = experiment ? prompt("Traffic split % (1-100):", "50") : null;
        
        if (experiment && trafficSplit) {
          const res = await fetch('/api/experiments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: experiment,
              equipmentIds: [id],
              trafficSplit: parseInt(trafficSplit)
            })
          });
          
          if (res.ok) {
            alert('Experiment created and equipment installed!');
          } else {
            alert('Error creating experiment');
          }
        } else {
          alert('Installing equipment...');
          // Simulate installation
          setTimeout(() => alert('Installation complete!'), 1000);
        }
      }
    </script>
  `;

  return `
    <h2>Available Equipment</h2>
    <div class="grid">
      ${cards}
    </div>
    ${script}
  `;
}

function renderExperiments(): string {
  const experimentList = Array.from(experiments.values());
  
  if (experimentList.length === 0) {
    return `
      <h2>Experiments</h2>
      <div class="card">
        <h3>No experiments yet</h3>
        <p>Create your first experiment to test equipment with traffic splitting.</p>
        <a href="/new-experiment" class="btn">Create Experiment</a>
      </div>
    `;
  }

  const cards = experimentList.map(exp => {
    const expMetrics = metrics.get(exp.id);
    return `
      <div class="card">
        <h3>${exp.name}</h3>
        <p>Equipment: ${exp.equipmentIds.join(", ")}</p>
        <div class="traffic-split">
          <div class="traffic-bar" style="width: ${exp.trafficSplit}%"></div>
        </div>
        <p>Traffic: ${exp.trafficSplit}% | Status: ${exp.active ? "Active" : "Paused"}</p>
        ${expMetrics ? `
          <div class="metrics">
            <div class="metric-card">
              <div class="metric-value">${expMetrics.installs}</div>
              <div class="metric-label">Installs</div>
            </div>
            <div class="metric-card">
              <div class="metric-value">${expMetrics.errors}</div>
              <div class="metric-label">Errors</div>
            </div>
          </div>
        ` : ""}
        <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
          <button class="btn" onclick="toggleExperiment('${exp.id}')">
            ${exp.active ? "Pause" : "Resume"}
          </button>
          <button class="btn btn-secondary" onclick="viewMetrics('${exp.id}')">
            View Metrics
          </button>
        </div>
      </div>
    `;
  }).join("");

  return `
    <h2>Experiments</h2>
    <div style="margin-bottom: 2rem;">
      <a href="/new-experiment" class="btn">Create New Experiment</a>
    </div>
    <div class="grid">
      ${cards}
    </div>
    <script>
      async function toggleExperiment(id) {
        const res = await fetch('/api/experiments/' + id + '/toggle', { method: 'POST' });
        if (res.ok) location.reload();
      }
      function viewMetrics(id) {
        window.location.href = '/metrics?experimentId=' + id;
      }
    </script>
  `;
}

function renderNewExperimentForm(): string {
  const equipmentOptions = equipmentCatalog.map(e => 
    `<option value="${e.id}">${e.name} (${e.category})</option>`
  ).join("");

  return `
    <h2>Create New Experiment</h2>
    <div class="card">
      <form id="experimentForm" onsubmit="return createExperiment(event)">
        <div class="form-group">
          <label for="name">Experiment Name</label>
          <input type="text" id="name" name="name" required placeholder="A/B Test v2.0">
        </div>
        
        <div class="form-group">
          <label for="equipmentIds">Select Equipment</label>
          <select id="equipmentIds" name="equipmentIds" multiple required style="height: 150px;">
            ${equipmentOptions}
          </select>
          <small style="color: #6b7280; display: block; margin-top: 0.5rem;">
            Hold Ctrl/Cmd to select multiple items
          </small>
        </div>
        
        <div class="form-group">
          <label for="trafficSplit">Traffic Split Percentage</label>
          <input type="range" id="trafficSplit" name="trafficSplit" min="1" max="100" value="50" 
                 oninput="document.getElementById('splitValue').textContent = this.value + '%'">
          <div style="text-align: center; margin-top: 0.5rem;">
            <span id="splitValue" style="color: #d97706; font-weight: bold;">50%</span>
          </div>
        </div>
        
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button type="submit" class="btn">Create Experiment</button>
          <a href="/experiments" class="btn btn-secondary">Cancel</a>
        </div>
      </form>
    </div>
    
    <script>
      async function createExperiment(event) {
        event.preventDefault();
        
        const form = event.target;
        const equipmentIds = Array.from(form.equipmentIds.selectedOptions).map(opt => opt.value);
        
        const experiment = {
          name: form.name.value,
          equipmentIds: equipmentIds,
          trafficSplit: parseInt(form.trafficSplit.value)
        };
        
        const res = await fetch('/api/experiments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(experiment)
        });
        
        if (res.ok) {
          alert('Experiment created successfully!');
          window.location.href = '/experiments';
        } else {
          alert('Error creating experiment');
        }
      }
    </script>
  `;
}

function renderMetricsPage(): string {
  const allMetrics = Array.from(metrics.values());
  const totalInstalls = allMetrics.reduce((sum, m) => sum + m.installs, 0);
  const totalErrors = allMetrics.reduce((sum, m) => sum + m.errors, 0);
  const activeExperiments = Array.from(experiments.values()).filter(e => e.active).length;

  return `
    <h2>Metrics Dashboard</h2>
    
    <div class="metrics">
      <div class="metric-card">
        <div class="metric-value">${totalInstalls}</div>
        <div class="metric-label">Total Installs</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">${totalErrors}</div>
        <div class="metric-label">Total Errors</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">${activeExperiments}</div>
        <div class="metric-label">Active Experiments</div>
      </div>
      <div class="metric-card">
        <div class="metric-value">${equipmentCatalog.length}</div>
        <div class="metric-label">Available Equipment</div>
      </div>
    </div>
    
    <h3 style="margin-top: 3rem;">Experiment Metrics</h3>
    ${allMetrics.length > 0 ? `
      <div class="grid">
        ${allMetrics.map(m => {
          const exp = experiments.get(m.experimentId);
          return `
            <div class="card">
              <h3>${exp?.name || 'Unknown Experiment'}</h3>
              <p>ID: ${m.experimentId}</p>
              <div class="metrics">
                <div class="metric-card">
                  <div class="metric-value">${m.installs}</div>
                  <div class="metric-label">Installs</div>
                </div>
                <div class="metric-card">
                  <div class="metric-value">${m.errors}</div>
                  <div class="metric-label">Errors</div>
                </div>
              </div>
              <p style="color: #6b7280; font-size: 0.875rem; margin-top: 1rem;">
                Last updated: ${new Date(m.lastUpdated).toLocaleString()}
              </p>
            </div>
          `;
        }).join("")}
      </div>
    ` : `
      <div class="card">
        <p>No metrics data available yet. Create an experiment to start collecting metrics.</p>
      </div>
    `}
  `;
}

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname;

  // Health check endpoint
  if (path === "/health") {
    return jsonResponse({
      status: "healthy",
      timestamp: new Date().toISOString(),
      equipmentCount: equipmentCatalog.length,
      experimentCount: experiments.size,
      metricsCount: metrics.size
    });
  }

  // API endpoints
  if (path === "/api/equipment") {
    return jsonResponse(equipmentCatalog);
  }

  if (path === "/api/compatibility") {
    const equipmentId = url.searchParams.get("equipmentId");
    if (equipmentId) {
      const compatibility = compatibilityData.find(c => c.equipmentId === equipmentId);
      return compatibility ? jsonResponse(compatibility) : jsonResponse({ error: "Not found" }, 404);
    }
    return jsonResponse(compatibilityData);
  }

  if (path === "/api/experiments" && request.method === "POST") {
    try {
      const data = await request.json() as Omit<Experiment, "id" | "createdAt" | "active">;
      const experiment: Experiment = {
        id: generateId(),
        name: data.name,
        equipmentIds: data.equipmentIds,
        trafficSplit: Math.min(100, Math.max(1, data.trafficSplit)),
        active: true,
        createdAt: Date.now()
      };
      
      experiments.set(experiment.id, experiment);
      
      // Initialize metrics for this experiment
      metrics.set(experiment.id, {
        experimentId: experiment.id,
        installs: 0,
        errors: 0,
        lastUpdated: Date.now()
      });
      
      return jsonResponse(experiment, 201);
    } catch {
      return jsonResponse({ error: "Invalid request" }, 400);
    }
  }

  if (path.startsWith("/api/experiments/") && path.endsWith("/toggle") && request.method === "POST") {
    const id
const sh={"Content-Security-Policy":"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; frame-ancestors 'none'","X-Frame-Options":"DENY"};
export default{async fetch(r:Request){const u=new URL(r.url);if(u.pathname==='/health')return new Response(JSON.stringify({status:'ok'}),{headers:{'Content-Type':'application/json',...sh}});return new Response(html,{headers:{'Content-Type':'text/html;charset=UTF-8',...sh}});}};