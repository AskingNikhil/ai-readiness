import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

fig, ax = plt.subplots(figsize=(16, 10))
ax.set_xlim(0, 16)
ax.set_ylim(0, 10)
ax.axis('off')
fig.patch.set_facecolor('#f7f7f7')

# ── Colour palette (upGrad) ──────────────────────────────────────────────────
UG_RED    = '#ee2c3c'
UG_DARK   = '#212835'
UG_MID    = '#2e3a50'
UG_GREY   = '#586274'
UG_BORDER = '#ebecee'
UG_LIGHT  = '#ffffff'
UG_GREEN  = '#0a9044'
UG_BLUE   = '#1a73e8'
UG_AMBER  = '#c4811d'

def box(ax, x, y, w, h, label, sublabel=None,
        fc='#ffffff', ec='#ebecee', tc=UG_DARK, fs=10, fw='bold', radius=0.3):
    rect = FancyBboxPatch((x, y), w, h,
                          boxstyle=f"round,pad=0.05,rounding_size={radius}",
                          linewidth=1.5, edgecolor=ec, facecolor=fc, zorder=3)
    ax.add_patch(rect)
    ty = y + h / 2 + (0.15 if sublabel else 0)
    ax.text(x + w / 2, ty, label, ha='center', va='center',
            fontsize=fs, fontweight=fw, color=tc, zorder=4)
    if sublabel:
        ax.text(x + w / 2, y + h / 2 - 0.22, sublabel, ha='center', va='center',
                fontsize=7.5, fontweight='normal', color=UG_GREY, zorder=4)

def arrow(ax, x1, y1, x2, y2, label='', color=UG_GREY):
    ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                arrowprops=dict(arrowstyle='->', color=color, lw=1.8), zorder=2)
    if label:
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        ax.text(mx + 0.1, my + 0.12, label, fontsize=7.5, color=UG_GREY,
                ha='left', va='bottom', zorder=4)

def section_bg(ax, x, y, w, h, title, fc, ec):
    rect = FancyBboxPatch((x, y), w, h,
                          boxstyle="round,pad=0.05,rounding_size=0.4",
                          linewidth=1.5, edgecolor=ec, facecolor=fc, zorder=1, alpha=0.5)
    ax.add_patch(rect)
    ax.text(x + 0.2, y + h - 0.28, title, fontsize=8, fontweight='bold',
            color=ec, va='top', ha='left', zorder=2)

# ── Title ────────────────────────────────────────────────────────────────────
ax.text(8, 9.55, 'AI Readiness Resume Analyzer — Architecture',
        ha='center', va='center', fontsize=15, fontweight='bold', color=UG_DARK)
ax.text(8, 9.15, 'Single Claude API call · Role-based scoring · React dashboard',
        ha='center', va='center', fontsize=9, color=UG_GREY)

# ── Section backgrounds ───────────────────────────────────────────────────────
section_bg(ax, 0.3, 5.8, 3.4, 2.8,  'USER',        '#f0f6ff', UG_BLUE)
section_bg(ax, 4.1, 5.8, 7.6, 2.8,  'BACKEND (FastAPI · Python)', '#fff5f5', UG_RED)
section_bg(ax, 4.1, 1.2, 7.6, 4.2,  'CORE PIPELINE', '#f0faf4', UG_GREEN)
section_bg(ax, 12.0, 5.8, 3.4, 2.8, 'EXTERNAL API',  '#fffaf0', UG_AMBER)
section_bg(ax, 0.3, 1.2, 3.4, 4.2,  'FRONTEND (React · Vite)', '#f0f6ff', UG_BLUE)

# ── User / Browser ───────────────────────────────────────────────────────────
box(ax, 0.6, 7.2, 2.8, 0.9, 'Browser', 'React SPA  ·  localhost:5173',
    fc='#e8f0fe', ec=UG_BLUE, tc=UG_DARK, fs=9)

# ── FastAPI gateway ──────────────────────────────────────────────────────────
box(ax, 4.4, 7.2, 2.8, 0.9, 'FastAPI',  'POST /api/analyze  ·  :8000',
    fc='#fcd5d8', ec=UG_RED, tc=UG_DARK, fs=9)

# ── CORS middleware note ─────────────────────────────────────────────────────
box(ax, 7.6, 7.2, 1.8, 0.9, 'CORS\nMiddleware',
    fc='#fff0f0', ec=UG_RED, tc=UG_RED, fs=8, fw='normal', radius=0.2)

# ── Anthropic Claude ─────────────────────────────────────────────────────────
box(ax, 12.3, 7.2, 2.8, 0.9, 'Claude API',  'claude-sonnet-4-6  ·  tool_use',
    fc='#fef6e4', ec=UG_AMBER, tc=UG_DARK, fs=9)

# ── Core pipeline boxes ───────────────────────────────────────────────────────
pipeline = [
    (4.4, 4.8, '1  Parser',       'PyMuPDF  ·  PDF & text extraction',       '#e6f7ed', UG_GREEN),
    (4.4, 3.5, '2  Analyzer',     'Claude tool_use  ·  structured JSON',      '#fcd5d8', UG_RED),
    (4.4, 2.2, '3  Scorer',       'Role weight matrix  ·  Σ(score × weight)', '#e8f0fe', UG_BLUE),
    (7.6, 4.8, '4  Schemas',      'Pydantic models  ·  type validation',      '#fef6e4', UG_AMBER),
    (7.6, 3.5, '5  Reporter',     'Assembles ReportResponse JSON',            '#fef6e4', UG_AMBER),
    (7.6, 2.2, '6  Weight Matrix','8 roles × 5 dimensions',                  '#e6f7ed', UG_GREEN),
]
for (px, py, lbl, sub, fc, ec) in pipeline:
    box(ax, px, py, 2.8, 0.9, lbl, sub, fc=fc, ec=ec, tc=UG_DARK, fs=8.5)

# ── Frontend components ───────────────────────────────────────────────────────
fe = [
    (0.55, 3.9, 'ReportCard',         'Score + category + candidate info'),
    (0.55, 3.0, 'DimensionBreakdown', 'Progress bars + weight badges'),
    (0.55, 2.1, 'RadarChartView',     'Recharts radar chart'),
    (0.55, 1.3, 'InsightsPanel',      'Strengths · Gaps · Suggestions'),
]
for (fx, fy, lbl, sub) in fe:
    box(ax, fx, fy, 2.9, 0.75, lbl, sub, fc='#e8f0fe', ec=UG_BLUE, tc=UG_DARK, fs=7.5, radius=0.2)

# ── Arrows ────────────────────────────────────────────────────────────────────
# Browser → FastAPI
arrow(ax, 3.4, 7.65, 4.4, 7.65, 'multipart/form-data', UG_RED)
# FastAPI ← Browser (response)
ax.annotate('', xy=(3.4, 7.45), xytext=(4.4, 7.45),
            arrowprops=dict(arrowstyle='->', color=UG_BLUE, lw=1.6), zorder=2)
ax.text(3.45, 7.3, 'ReportResponse JSON', fontsize=7, color=UG_BLUE, ha='left')

# FastAPI → CORS
arrow(ax, 7.2, 7.65, 7.6, 7.65, color=UG_GREY)

# Analyzer → Claude
arrow(ax, 9.4, 3.95, 12.3, 7.45, 'tool_use call', UG_AMBER)

# FastAPI → Parser
arrow(ax, 5.8, 7.2, 5.8, 5.7, color=UG_GREY)

# Pipeline vertical arrows
for y_from, y_to in [(5.4, 4.4), (4.4, 3.5+0.9), (3.5, 3.1)]:
    arrow(ax, 5.8, y_from, 5.8, y_to, color=UG_GREEN)

# Schemas ↔ Analyzer
arrow(ax, 7.6, 4.05, 7.2+0.4, 4.05, color=UG_GREY)

# Reporter → response
arrow(ax, 7.6, 3.95, 7.4, 3.95, color=UG_GREY)

# Reporter → FastAPI (up)
ax.annotate('', xy=(6.5, 7.2), xytext=(8.0, 4.4),
            arrowprops=dict(arrowstyle='->', color=UG_BLUE, lw=1.5,
                            connectionstyle='arc3,rad=0.2'), zorder=2)

# FastAPI → React components
arrow(ax, 3.4, 7.4, 3.44, 4.65, color=UG_BLUE)
for fy in [4.275, 3.375, 2.475, 1.675]:
    ax.plot([3.44, 3.44], [fy, fy], 'o', color=UG_BLUE, ms=4, zorder=4)
    arrow(ax, 3.44, fy, 3.45, fy, color=UG_BLUE)

# ── Legend ────────────────────────────────────────────────────────────────────
legend_items = [
    (UG_RED,   'API / Request flow'),
    (UG_BLUE,  'Frontend / Response'),
    (UG_GREEN, 'Core pipeline'),
    (UG_AMBER, 'External / Schema'),
]
for i, (c, lbl) in enumerate(legend_items):
    rx = 0.6 + i * 3.8
    ax.add_patch(FancyBboxPatch((rx, 0.3), 0.4, 0.4,
                 boxstyle="round,pad=0.02", fc=c, ec=c, zorder=3))
    ax.text(rx + 0.55, 0.5, lbl, fontsize=8, color=UG_DARK, va='center')

plt.tight_layout(pad=0.3)
plt.savefig('h:/ClaudeMaster/ai_readiness/architecture.png',
            dpi=180, bbox_inches='tight', facecolor='#f7f7f7')
print('Saved: architecture.png')
