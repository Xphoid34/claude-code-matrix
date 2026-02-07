# CLAUDE.md - Project Context for Claude Code

## About the Developer

**Name:** Korhan Göğüş
**Location:** Istanbul, Turkey
**Company:** Craftora.ai - AI agency focused on Turkish e-commerce market
**Goal:** Financial freedom within 1-2 years through sellable AI products

### Background
- Renewable energy, finance, business development experience
- No traditional coding background
- Building with no-code/low-code tools: n8n, Lovable, Pinecone
- Focus: AI automation tools for Turkish online sellers (marketplaces, social commerce)

### Communication Preferences
- **Language:** Respond in Turkish unless technical terms require English
- **Style:** Direct, practical, no fluff
- **Explanations:** Step-by-step, beginner-friendly
- **Honesty:** Say "I don't know" rather than guess. State assumptions clearly.
- **Feedback:** Open to criticism if approach is wrong

---

## Project Structure

```
/Volumes/KorhanSSD/00ClaudeCode/
├── .claude/                 # Claude Code settings
├── .mcp.json               # MCP server configurations
├── Craftora_ai/            # Professional client projects
│   └── snapsell/           # SnapSell - Next.js + Supabase (e-commerce AI tool)
│   └── [project-name]/     # Other individual projects
├── Learning/               # Tutorials and experiments
│   └── Matrix-Chatbot/     # First deployed project (Vercel)
├── CLAUDE.md               # This file
└── .gitignore
```

### Project Categories
- **Craftora_ai/**: Production-ready, sellable products for clients
- **Learning/**: Tutorials, experiments, skill-building (okay to break things)

---

## Business Context

### Target Market
- Turkish e-commerce sellers (marketplace platforms, Instagram shops)
- Small to medium businesses needing AI automation
- Content creators needing efficiency tools

### Product Focus
- **Product description generators** (AI-powered, SEO-optimized)
- **Hashtag and keyword tools** for social commerce
- **Competitor analysis** automation
- **Bulk content planning** tools
- **Voice agents** for customer service (Turkish language)

### Pricing Model (Reference)
- Freemium starting at 49₺/month
- Upsells for advanced features (competitor analysis, bulk operations)

---

## Tech Stack & Tools

### Primary Tools
| Tool | Purpose |
|------|---------|
| n8n | Workflow automation (cloud: craftora.app.n8n.cloud) |
| Supabase | Database, Auth, backend (SnapSell projesi) |
| Lovable | Frontend development |
| Pinecone | Vector database for RAG systems |
| Cohere | Reranking for RAG |
| Vercel | Deployment platform |
| GitHub | Version control |
| ElevenLabs | Voice synthesis (for voice agents) |

### MCP Servers Available
- **n8n-mcp**: Connected to n8n Cloud instance (543 nodes available)

### Skills Installed
- n8n-workflow-patterns
- n8n-validation-expert
- n8n-code-javascript
- n8n-code-python
- n8n-mcp-tools-expert
- n8n-node-configuration
- n8n-expression-syntax
- supabase-best-practices
- supabase-postgres-best-practices
- nextjs-supabase-auth
- vercel-react-best-practices
- frontend-design
- remotion-best-practices
- find-skills

### Recently Installed Tools
- **last30days skill**: Researches topics across Reddit, X (Twitter), and web from the last 30 days. Generates copy-paste-ready prompts and recommendations. Config at ~/.config/last30days/.env (OPENAI_API_KEY + XAI_API_KEY)
- **Compound Engineering plugin**: Provides `/workflows:plan` command that transforms research output into structured PRDs (Product Requirements Documents)

### Recommended Workflow
1. `/last30days` → research a topic
2. `/workflows:plan` → transform research into actionable PRD

---

## Bash Commands

```bash
# Git
git status                    # Check current state
git add .                     # Stage all changes
git commit -m "message"       # Commit with message
git push                      # Push to remote

# Project navigation
cd /Volumes/KorhanSSD/00ClaudeCode
cd Craftora_ai/[project]
cd Learning/[project]

# Node.js
npm install                   # Install dependencies
npm run dev                   # Start dev server
npm run build                 # Build for production
```

---

## Workflow Guidelines

### Recommended Approach (4Ds Framework)
1. **Delegation:** Clearly define what you want done
2. **Description:** Provide specific context and constraints
3. **Discernment:** Review and validate outputs
4. **Diligence:** Iterate and refine

### For Complex Tasks
1. **Explore:** Read relevant files, understand context (don't code yet)
2. **Plan:** Create a plan, use "think" or "think hard" for deeper analysis
3. **Code:** Implement the solution
4. **Verify:** Test, validate, iterate
5. **Commit:** Clean commit with descriptive message

### For n8n Workflows
1. Describe the automation goal clearly
2. Specify trigger type (webhook, schedule, manual)
3. List integrations needed (API, services)
4. Define expected input/output
5. Use n8n-skills for best practices

---

## Code Style

### General
- Prefer readability over cleverness
- Add comments for complex logic (in English for code)
- Use meaningful variable/function names
- KISS: Keep It Simple, Stupid

### JavaScript/TypeScript
- Use ES modules (import/export), not CommonJS (require)
- Destructure imports when possible
- Use async/await over .then() chains

### Python
- Follow PEP 8
- Use type hints where helpful
- Prefer f-strings for formatting

---

## Important Notes

### DO
- Ask clarifying questions if requirements are unclear
- Provide alternatives when multiple approaches exist
- Explain trade-offs for technical decisions
- Test changes before committing
- Use subagents for complex investigations
- Build for production from day one (not just demos)

### DON'T
- Make assumptions without stating them
- Over-engineer simple solutions
- Skip error handling
- Commit without testing
- Use complex frameworks when simple solutions work
- Build features nobody asked for

---

## Context for Common Tasks

### Creating n8n Workflows
- Target: Turkish online sellers (marketplaces, social commerce)
- Common needs: Product descriptions, hashtag generation, competitor analysis
- Always validate JSON before deployment
- Test with sample data first
- Consider webhook security for production

### Building Lovable Frontends
- Keep UI simple and clean
- Mobile-first approach
- Turkish language support required
- Connect to n8n webhooks for backend
- Focus on user experience over features

### RAG Systems (Pinecone)
- Use Cohere for reranking when needed
- Chunk size: Start with 512 tokens
- Always include metadata for filtering
- Test retrieval quality before building UI

### Voice Agents
- Turkish language is primary requirement
- ElevenLabs for voice synthesis
- n8n for conversation logic
- SIP trunk needed for phone integration (challenge: Turkish numbers)

---

## Quick Reference

### When I Say...
- "Hızlıca yap" → Still follow best practices, but minimal explanation
- "Detaylı anlat" → Step-by-step with explanations
- "Bu production için" → Extra careful, test thoroughly
- "Deneme amaçlı" → Okay to experiment, less rigorous
- "Satılabilir ürün" → Production quality, user-focused, monetizable

### File Naming
- Projects: kebab-case (my-project-name)
- Components: PascalCase (MyComponent.tsx)
- Utilities: camelCase (myUtility.js)

### Quality Standards
- Demo ≠ Product: Build things people would pay for
- Error handling is not optional
- Turkish UX matters (RTL not needed, but locale-aware)

---

*Last updated: February 2026*
*Use `#` to add notes to this file during sessions*
