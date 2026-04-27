import { useState, useRef, useEffect } from "react";

const AGENTS = [
  {
    id: 1,
    name: "Website Auditor",
    icon: "🔍",
    color: "#C8A97E",
    task: "Auditing tjaautocarenj.com for SEO, GEO, conversion, and AI readability gaps.",
  },
  {
    id: 2,
    name: "Local SEO Strategist",
    icon: "📍",
    color: "#7EB5C8",
    task: "Building keyword clusters, title tags, meta descriptions, and internal linking map.",
  },
  {
    id: 3,
    name: "GEO / AI Search Strategist",
    icon: "🤖",
    color: "#9B7EC8",
    task: "Designing AI-readable page structures, FAQ blocks, schema plan, and citation triggers.",
  },
  {
    id: 4,
    name: "Revenue Strategist",
    icon: "💰",
    color: "#7EC87E",
    task: "Modeling the path from $90k to $140k/month and ranking pages by revenue impact.",
  },
  {
    id: 5,
    name: "Content Architect",
    icon: "🏗️",
    color: "#C87E7E",
    task: "Creating landing page outlines, blog briefs, and 30-day content calendar.",
  },
  {
    id: 6,
    name: "Conversion Copywriter",
    icon: "✍️",
    color: "#C8B87E",
    task: "Writing homepage hero, service page copy, and dealer-defector messaging.",
  },
  {
    id: 7,
    name: "Technical SEO Implementer",
    icon: "⚙️",
    color: "#7EC8B8",
    task: "Generating schema JSON-LD, sitemap recommendations, and technical fixes.",
  },
  {
    id: 8,
    name: "QA + Final Editor",
    icon: "✅",
    color: "#E8E8E8",
    task: "Grading all outputs and producing the final 30/60/90 day execution plan.",
  },
];

const BUSINESS_CONTEXT = `
SHOP: TJA AutoCare
LOCATION: 161 Ridge Road, Lyndhurst, NJ 07071 (Bergen County)
WEBSITE: tjaautocarenj.com (runs on Mitchell 1 / Snap-on SEO platform - templated, generic)
CURRENT REVENUE: $90k/month | BREAKEVEN: $75k | PEAK CAPACITY: $127k | GOAL: $140k
CARS/MONTH: 90-100 | LABOR RATE: $177/hr | AVG PARTS MARKUP: 67%
MARKETING SPEND: $2k/month | PAYROLL: ADP ~$90/week
GEO SCORE: 3.1/10 (invisible in AI search)

HIGH MARGIN SERVICES:
- Brakes: 45min real time, 2hr billable, $1,200/job, ~$800 profit (HIGHEST EFFICIENCY)
- Transmission: 10hr real time, 18hr billable, $8,000/job
- European vehicles: 4x higher CAC but significantly higher LTV and ticket size

EURO VEHICLES SERVICED: BMW, Mercedes-Benz, Audi, Porsche, Jaguar, Land Rover, Volvo, MINI
RECENT EURO JOBS ON SITE: 2015 Mercedes C63 S AMG (radiator, brake flush), 2016 Porsche Panamera (oil leak diagnosis)

COMPETITIVE SITUATION:
- Currently invisible in AI search (ChatGPT, Perplexity, Claude, Gemini)
- Mitchell 1 platform creates generic content, no specialization possible within it
- No dedicated euro car pages, no dealer comparison content, no FAQ schema
- Google Business Profile exists but under-optimized
- Reviews on SureCritic and Google (5-star recent jobs)

TARGET QUERIES TO DOMINATE:
- "best independent BMW repair shop near Lyndhurst NJ"
- "Mercedes service not at dealership Bergen County NJ"
- "Audi specialist independent mechanic North Jersey"
- "BMW brake replacement cost NJ"
- "European auto repair Lyndhurst NJ"
- "transmission repair Lyndhurst NJ"
- "brake repair Lyndhurst NJ"
- "dealer alternative BMW service NJ"

POSITIONING GOAL: North Jersey's #1 Independent European Auto Specialist (BMW, Mercedes, Audi)
REVENUE GOAL: $90k → $140k/month without doubling ad spend
`;

function buildPrompt(agentId, previousOutputs) {
  const context = `${BUSINESS_CONTEXT}\n\nPREVIOUS AGENT OUTPUTS:\n${previousOutputs}`;

  const prompts = {
    1: `You are Agent 1 - Website Auditor for TJA AutoCare's SEO/GEO growth system.
${context}

Based on what we know about the site (Mitchell 1 template platform), produce:

1. WEBSITE AUDIT TABLE - Score these 8 dimensions 1-10 with one-line diagnosis each:
   - Homepage positioning clarity
   - Euro car page depth
   - Brake service page quality
   - AI readability / structured content
   - Schema markup completeness
   - Local SEO signals (NAP, location)
   - Conversion elements (CTAs, trust signals)
   - Content freshness / depth

2. TOP 10 IMMEDIATE FIXES - Ranked by impact, with effort level (Low/Med/High) and expected outcome

3. PAGES TO CREATE OR REWRITE - List with priority (P1/P2/P3), proposed URL slug, and why it matters

Be specific, operator-friendly, no fluff. Real numbers and real page names where possible.`,

    2: `You are Agent 2 - Local SEO Strategist for TJA AutoCare.
${context}

Build:

1. KEYWORD CLUSTER MAP - Organize into 5 clusters:
   - European vehicle brands (BMW/Mercedes/Audi/Porsche/Jaguar)
   - Service types (brakes, transmission, oil, tires, diagnostics)
   - Location modifiers (Lyndhurst, Bergen County, North Jersey, Rutherford, Kearny)
   - Buyer intent (dealer alternative, independent mechanic, cost comparison)
   - Problem-aware (check engine light, brake noise, transmission slip)
   List 5-8 keywords per cluster with intent level (informational/commercial/transactional)

2. PAGE TITLE / META / H1 RECOMMENDATIONS - For these 6 priority pages:
   - Homepage
   - BMW repair page
   - Mercedes repair page
   - Brake service page
   - European auto specialist page
   - Dealer alternative comparison page

3. INTERNAL LINKING STRATEGY - How pages should link to each other to build topical authority

Be specific with actual keyword phrases, not generic advice.`,

    3: `You are Agent 3 - GEO / AI Search Strategist for TJA AutoCare.
${context}

Produce:

1. GEO CONTENT STRUCTURE - For each of these 3 priority pages, give the exact section structure AI engines need to cite them:
   - BMW Repair Lyndhurst NJ
   - Mercedes Service Bergen County NJ
   - Independent vs Dealership comparison page
   Each structure should include: H1, intro paragraph formula, pricing section, FAQ block (5 questions with answers), comparison table structure, CTA

2. SCHEMA MARKUP PLAN - List every schema type needed with the specific properties that matter for auto repair AI citations:
   - LocalBusiness / AutoRepair
   - FAQPage
   - Service
   - Review/AggregateRating

3. AI-ANSWER-READY FAQ LIBRARY - Write 12 actual FAQ questions and full answers that ChatGPT/Perplexity would cite when someone asks about BMW/Mercedes repair in North Jersey. Include real pricing ranges from TJA's data ($177/hr labor rate, brake jobs $800-1200, etc.)

Format FAQs as Question: / Answer: pairs, 3-5 sentences per answer.`,

    4: `You are Agent 4 - Revenue Strategist for TJA AutoCare.
${context}

Produce:

1. REVENUE BRIDGE MODEL - Show the exact math from $90k to $140k:
   - Current state: 90-100 cars, $90k avg
   - What's the average ticket right now (derive it)
   - How many additional brake jobs needed
   - How many additional euro jobs needed
   - How many additional transmission jobs needed
   - Mixed scenario that's most realistic
   - What car volume is needed at current ticket avg vs improved ticket avg

2. HIGHEST-ROI PAGES TO BUILD - Rank the 8 pages by expected revenue contribution over 90 days. For each: estimated additional jobs/month once ranking, revenue impact, time to rank

3. CAC REDUCTION PLAN FOR EURO CARS:
   - Current situation: 4x CAC, $2k/month marketing spend
   - GEO strategy: how AI visibility replaces paid acquisition
   - Estimated CAC reduction timeline (30/60/90 days)
   - Which euro makes to prioritize first based on ticket size and search volume
   - Google Business Profile quick wins for euro visibility

Show real numbers. Be direct about what's realistic vs what's optimistic.`,

    5: `You are Agent 5 - Content Architect for TJA AutoCare.
${context}

Produce:

1. 30-DAY CONTENT CALENDAR - Week by week:
   Week 1: Foundation pages (what to publish first and why)
   Week 2: Euro brand pages
   Week 3: Service + comparison content
   Week 4: Blog/FAQ content for AI citations
   For each piece: title, URL slug, word count target, primary keyword, content type

2. LANDING PAGE OUTLINES - Full section-by-section outline for these 3 pages:
   a) "BMW Repair Shop Lyndhurst NJ – Independent Dealer Alternative"
   b) "Mercedes-Benz Service Bergen County NJ – Save vs Dealership"
   c) "Brake Replacement Cost NJ – TJA AutoCare Honest Pricing"

3. BLOG/ARTICLE BRIEFS - 6 articles targeting dealer defectors and euro car owners:
   For each: title, target query, angle, key points to cover, word count, internal links

Make this immediately actionable. Someone should be able to hand this to a writer and get results.`,

    6: `You are Agent 6 - Conversion Copywriter for TJA AutoCare.
${context}

Write actual copy (not outlines, real words):

1. HOMEPAGE HERO REWRITE:
   - Headline (under 10 words, positioning TJA as euro specialist / dealer alternative)
   - Subheadline (1-2 sentences, trust + value prop)
   - 3 bullet proof points
   - Primary CTA button text
   - Secondary CTA text
   Write 2 versions: one euro-forward, one brakes-forward

2. BMW PAGE COPY BLOCK:
   Write the first 200 words of the BMW repair page including:
   - H1
   - Opening paragraph (hook + credibility + location)
   - "Why TJA for your BMW" section with 4 specific reasons
   - Price transparency paragraph mentioning real numbers

3. DEALER ESCAPE HOOK:
   Write the opening section for the "Independent vs Dealership" comparison page:
   - Headline
   - 3-paragraph narrative that speaks directly to someone frustrated with dealership pricing
   - A comparison table: TJA vs Dealership (5 rows: price, wait time, warranty, personal service, honesty)

4. TRUST COPY SNIPPETS - 5 short copy blocks (2-3 sentences each) for use across the site:
   - 24mo/24k warranty
   - Family owned since 2013
   - Advanced electrical diagnostics specialty
   - Euro vehicle expertise
   - Honest pricing / no upsells

Write like a real person. No corporate speak. Bergen County tone.`,

    7: `You are Agent 7 - Technical SEO Implementer for TJA AutoCare.
${context}

Produce:

1. SCHEMA JSON-LD - Write complete, ready-to-paste schema code for:
   a) LocalBusiness / AutoRepair schema for the homepage (include real TJA data: address, phone, hours, services, geo coordinates for Lyndhurst NJ)
   b) FAQPage schema with 5 BMW/euro-related FAQ pairs
   c) Service schema for brake service page

2. TECHNICAL SEO CHECKLIST - 15 items, each with:
   - Issue description
   - Why it matters for AI/GEO specifically
   - Fix difficulty (Easy/Medium/Hard)
   - Who fixes it (Owner can do / Needs developer / Mitchell 1 limitation)

3. GOOGLE BUSINESS PROFILE OPTIMIZATION CHECKLIST:
   - 10 specific GBP actions for euro car visibility
   - Which service categories to add
   - What posts to publish and how often
   - Review response strategy for AI credibility
   - Q&A section setup

Flag clearly what Mitchell 1 platform will block vs what can be added externally.`,

    8: `You are Agent 8 - QA + Final Editor for TJA AutoCare.
${context}

You have received outputs from Agents 1-7. Your job is to synthesize everything into the final execution plan.

Produce:

1. EXECUTIVE SUMMARY (5 sentences max):
   - Current situation
   - Core problem
   - The strategy
   - Expected outcome
   - First action to take Monday morning

2. 30/60/90 DAY ROADMAP:
   DAYS 1-30 (Foundation):
   - Week 1, 2, 3, 4 specific tasks with owner vs developer assignments

   DAYS 31-60 (Build):
   - Content publishing schedule
   - GBP optimization milestones
   - Schema implementation targets

   DAYS 61-90 (Dominate):
   - AI visibility checkpoints
   - Revenue tracking milestones
   - CAC measurement targets

3. PRIORITY EXECUTION CHECKLIST - The 20 most important actions ranked 1-20. For each:
   [Priority] [Task] [Owner] [Timeline] [Expected Impact]

4. KPIs TO TRACK WEEKLY:
   - 8 specific metrics with targets for 30/60/90 days
   - How to measure each (free tools where possible)

5. WHAT NOT TO DO - 5 common mistakes that would kill this strategy

Format for a shop owner who works with his hands. Clear, direct, no BS.`,
  };

  return prompts[agentId];
}

async function runAgent(agentId, previousOutputs, apiKey, onChunk) {
  const prompt = buildPrompt(agentId, previousOutputs);

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      stream: true,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`API error ${response.status}: ${text.slice(0, 200)}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.type === "content_block_delta" && parsed.delta?.text) {
            fullText += parsed.delta.text;
            onChunk(fullText);
          }
        } catch {}
      }
    }
  }
  return fullText;
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        background: "transparent",
        border: "1px solid #333",
        color: "#C8A97E",
        padding: "6px 12px",
        fontSize: 11,
        fontFamily: "monospace",
        letterSpacing: "0.05em",
        cursor: "pointer",
        borderRadius: 3,
        marginTop: 12,
      }}
    >
      {copied ? "✓ COPIED" : "COPY OUTPUT"}
    </button>
  );
}

export default function TJAGeoSystem({ apiKey }) {
  const [agentOutputs, setAgentOutputs] = useState({});
  const [agentStatus, setAgentStatus] = useState({});
  const [, setActiveAgent] = useState(null);
  const [running, setRunning] = useState(false);
  const [currentView, setCurrentView] = useState(null);
  const [runComplete, setRunComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const outputsRef = useRef({});

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const runAllAgents = async () => {
    setRunning(true);
    setRunComplete(false);
    setAgentOutputs({});
    setAgentStatus({});
    outputsRef.current = {};

    for (const agent of AGENTS) {
      setActiveAgent(agent.id);
      setAgentStatus((prev) => ({ ...prev, [agent.id]: "running" }));
      setCurrentView(agent.id);

      const previousText = Object.entries(outputsRef.current)
        .map(([id, text]) => `=== AGENT ${id} OUTPUT ===\n${text}`)
        .join("\n\n");

      try {
        const result = await runAgent(agent.id, previousText, apiKey, (partial) => {
          setAgentOutputs((prev) => ({ ...prev, [agent.id]: partial }));
        });
        outputsRef.current[agent.id] = result;
        setAgentStatus((prev) => ({ ...prev, [agent.id]: "done" }));
      } catch (err) {
        setAgentStatus((prev) => ({ ...prev, [agent.id]: "error" }));
        setAgentOutputs((prev) => ({
          ...prev,
          [agent.id]: `Error: ${err.message}`,
        }));
      }
    }

    setActiveAgent(null);
    setRunning(false);
    setRunComplete(true);
  };

  const getStatusColor = (agentId) => {
    const s = agentStatus[agentId];
    if (s === "done") return "#7EC87E";
    if (s === "running") return "#C8A97E";
    if (s === "error") return "#C87E7E";
    return "#444";
  };

  const getStatusLabel = (agentId) => {
    const s = agentStatus[agentId];
    if (s === "done") return "✓ Done";
    if (s === "running") return "● Running";
    if (s === "error") return "✗ Error";
    return "Waiting";
  };

  const completedCount = Object.keys(agentStatus).filter(
    (k) => agentStatus[k] === "done"
  ).length;

  const exportAll = () => {
    const date = new Date().toISOString().slice(0, 10);
    const sep = "═══════════════════════════════";
    const parts = AGENTS.filter((a) => outputsRef.current[a.id]).map((a) => {
      return `${sep}\nAGENT ${a.id} — ${a.name.toUpperCase()}\n${sep}\n\n${outputsRef.current[a.id]}`;
    });
    const blob = new Blob([parts.join("\n\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tja-geo-report-${date}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        fontFamily: "'Georgia', serif",
        background: "#111",
        minHeight: "100vh",
        color: "#E8E0D0",
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid #333",
          padding: isMobile ? "16px 18px" : "20px 28px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 11,
              color: "#888",
              letterSpacing: "0.15em",
              marginBottom: 4,
            }}
          >
            TJA AUTOCARE · LYNDHURST NJ
          </div>
          <div
            style={{
              fontSize: 20,
              fontWeight: "normal",
              color: "#E8E0D0",
              letterSpacing: "0.02em",
            }}
          >
            GEO Growth System
          </div>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            8-Agent SEO + AI Visibility Engine · $90k → $140k
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={exportAll}
            disabled={completedCount === 0}
            style={{
              background: "transparent",
              color: completedCount === 0 ? "#444" : "#C8A97E",
              border: `1px solid ${completedCount === 0 ? "#222" : "#C8A97E"}`,
              padding: "10px 18px",
              fontSize: 12,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              cursor: completedCount === 0 ? "not-allowed" : "pointer",
              borderRadius: 4,
            }}
          >
            ⬇ EXPORT ALL
          </button>
          <button
            onClick={runAllAgents}
            disabled={running}
            style={{
              background: running ? "#222" : "#C8A97E",
              color: running ? "#666" : "#111",
              border: "none",
              padding: "10px 22px",
              fontSize: 13,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
              cursor: running ? "not-allowed" : "pointer",
              borderRadius: 4,
            }}
          >
            {running ? "● RUNNING AGENTS..." : runComplete ? "▶ RUN AGAIN" : "▶ RUN ALL AGENTS"}
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          minHeight: isMobile ? "auto" : "calc(100vh - 73px)",
        }}
      >
        {/* Sidebar / Mobile tab strip */}
        {isMobile ? (
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              borderBottom: "1px solid #222",
              padding: "8px 10px",
              gap: 8,
              flexShrink: 0,
            }}
          >
            {AGENTS.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setCurrentView(agent.id)}
                style={{
                  minWidth: 140,
                  padding: "8px 12px",
                  cursor: "pointer",
                  background: currentView === agent.id ? "#1A1A1A" : "transparent",
                  border: `1px solid ${currentView === agent.id ? agent.color : "#222"}`,
                  borderRadius: 4,
                  flexShrink: 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{agent.icon}</span>
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "monospace",
                      color: "#888",
                    }}
                  >
                    AGENT {agent.id}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: currentView === agent.id ? "#E8E0D0" : "#999",
                    marginTop: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {agent.name}
                </div>
                <div
                  style={{
                    fontSize: 9,
                    fontFamily: "monospace",
                    color: getStatusColor(agent.id),
                    marginTop: 2,
                  }}
                >
                  {getStatusLabel(agent.id)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              width: 220,
              borderRight: "1px solid #222",
              padding: "16px 0",
              flexShrink: 0,
              overflowY: "auto",
            }}
          >
            {AGENTS.map((agent) => (
              <div
                key={agent.id}
                onClick={() => setCurrentView(agent.id)}
                style={{
                  padding: "10px 16px",
                  cursor: "pointer",
                  background: currentView === agent.id ? "#1A1A1A" : "transparent",
                  borderLeft:
                    currentView === agent.id
                      ? `2px solid ${agent.color}`
                      : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{agent.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontFamily: "monospace",
                        color: "#888",
                        marginBottom: 2,
                      }}
                    >
                      AGENT {agent.id}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: currentView === agent.id ? "#E8E0D0" : "#999",
                      }}
                    >
                      {agent.name}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: getStatusColor(agent.id),
                    letterSpacing: "0.05em",
                  }}
                >
                  {getStatusLabel(agent.id)}
                </div>
              </div>
            ))}

            {running && (
              <div style={{ padding: "16px", borderTop: "1px solid #222", marginTop: 8 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    color: "#666",
                    marginBottom: 6,
                  }}
                >
                  PROGRESS
                </div>
                <div style={{ background: "#222", height: 3, borderRadius: 2 }}>
                  <div
                    style={{
                      height: 3,
                      borderRadius: 2,
                      background: "#C8A97E",
                      width: `${(completedCount / 8) * 100}%`,
                      transition: "width 0.5s",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#666",
                    marginTop: 4,
                    fontFamily: "monospace",
                  }}
                >
                  {completedCount}/8 complete
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: isMobile ? "18px 18px" : "24px 28px",
            width: "100%",
          }}
        >
          {!currentView && !running && (
            <div style={{ maxWidth: 520, paddingTop: 40 }}>
              <div
                style={{
                  fontSize: 11,
                  fontFamily: "monospace",
                  color: "#666",
                  letterSpacing: "0.12em",
                  marginBottom: 16,
                }}
              >
                SYSTEM READY
              </div>
              <div
                style={{
                  fontSize: 28,
                  color: "#E8E0D0",
                  lineHeight: 1.3,
                  marginBottom: 20,
                }}
              >
                8 agents. One goal.
                <br />
                $140k/month.
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "#888",
                  lineHeight: 1.7,
                  marginBottom: 32,
                }}
              >
                Each agent builds on the last. Agent 1 audits the site. Agent 2 reads that audit
                to build the keyword strategy. Agent 3 reads both to design the GEO layer. All
                the way through Agent 8's final 90-day roadmap.
              </div>
              <div style={{ borderTop: "1px solid #222", paddingTop: 20 }}>
                {AGENTS.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      display: "flex",
                      gap: 12,
                      marginBottom: 12,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: a.color,
                        fontFamily: "monospace",
                        minWidth: 20,
                      }}
                    >
                      {a.id}.
                    </span>
                    <div>
                      <span style={{ fontSize: 13, color: "#CCC" }}>{a.name} </span>
                      <span style={{ fontSize: 12, color: "#666" }}>— {a.task}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 24 }}>{AGENTS[currentView - 1].icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontFamily: "monospace",
                      color: "#666",
                      letterSpacing: "0.1em",
                    }}
                  >
                    AGENT {currentView}
                  </div>
                  <div style={{ fontSize: 18, color: AGENTS[currentView - 1].color }}>
                    {AGENTS[currentView - 1].name}
                  </div>
                  <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
                    {AGENTS[currentView - 1].task}
                  </div>
                </div>
              </div>

              {agentOutputs[currentView] ? (
                <>
                  <div
                    style={{
                      background: "#0E0E0E",
                      border: "1px solid #222",
                      borderRadius: 6,
                      padding: "20px 24px",
                      fontSize: 13,
                      lineHeight: 1.8,
                      color: "#D0C8B8",
                      whiteSpace: "pre-wrap",
                      fontFamily: "monospace",
                    }}
                  >
                    {agentOutputs[currentView]}
                    {agentStatus[currentView] === "running" && (
                      <span
                        style={{
                          display: "inline-block",
                          width: 8,
                          height: 14,
                          background: "#C8A97E",
                          marginLeft: 2,
                          animation: "blink 1s infinite",
                        }}
                      />
                    )}
                  </div>
                  {agentStatus[currentView] === "done" && (
                    <CopyButton text={agentOutputs[currentView]} />
                  )}
                </>
              ) : (
                <div
                  style={{
                    color: "#444",
                    fontSize: 13,
                    fontFamily: "monospace",
                    padding: "40px 0",
                  }}
                >
                  {agentStatus[currentView] === "running"
                    ? "● Generating output..."
                    : "Waiting to run..."}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 20,
                }}
              >
                <button
                  onClick={() => setCurrentView(Math.max(1, currentView - 1))}
                  disabled={currentView <= 1}
                  style={{
                    background: "transparent",
                    border: "1px solid #333",
                    color: "#888",
                    padding: "8px 16px",
                    fontSize: 12,
                    fontFamily: "monospace",
                    cursor: "pointer",
                    borderRadius: 3,
                  }}
                >
                  ← AGENT {currentView - 1}
                </button>
                <button
                  onClick={() => setCurrentView(Math.min(8, currentView + 1))}
                  disabled={currentView >= 8}
                  style={{
                    background: "transparent",
                    border: "1px solid #333",
                    color: "#888",
                    padding: "8px 16px",
                    fontSize: 12,
                    fontFamily: "monospace",
                    cursor: "pointer",
                    borderRadius: 3,
                  }}
                >
                  AGENT {currentView + 1} →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
        body { margin: 0; }
      `}</style>
    </div>
  );
}
