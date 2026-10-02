#!/usr/bin/env python3
"""Replace the two product-grid blocks in products.html with new figure markup."""
import re
from pathlib import Path

ROOT = Path(r"C:\Users\thinkpad\20260609 深圳AI硬核工作坊\WEBSITE 3")
HTML_PATH = ROOT / "products.html"
TMP_DIR = Path(r"C:\Users\thinkpad\AppData\Local\Temp")
KIDS_HTML = (TMP_DIR / "kids.html").read_text(encoding="utf-8").strip()
ADULT_HTML = (TMP_DIR / "adult.html").read_text(encoding="utf-8").strip()

html = HTML_PATH.read_text(encoding="utf-8")

# Replace the children grid block (between #children section's first product-grid open and close)
# Pattern: from "<div class="product-grid reveal">" in children section through "</div>" of that grid
def replace_grid(text, section_id, new_content):
    # Find the section with given id
    sec_pat = re.compile(
        rf'(<section[^>]*id="{section_id}"[^>]*>.*?)<div class="product-grid[^"]*">.*?</div>',
        re.DOTALL,
    )
    m = sec_pat.search(text)
    if not m:
        raise RuntimeError(f"Could not find grid in section #{section_id}")
    # Find the opening div tag from m.group(1)
    open_tag = re.search(r'<div class="product-grid[^"]*">', m.group(0))
    open_tag_str = open_tag.group(0)
    # Build replacement: open_tag + new_content + </div>
    replacement = m.group(1) + open_tag_str + "\n      " + new_content + "\n    </div>"
    # Replace just the matched section grid, not all of them
    new_text = text[:m.start()] + replacement + text[m.end():]
    return new_text

html = replace_grid(html, "children", KIDS_HTML)
html = replace_grid(html, "adult", ADULT_HTML)

HTML_PATH.write_text(html, encoding="utf-8")
print(f"Updated products.html — {len(KIDS_HTML.splitlines())} kids + {len(ADULT_HTML.splitlines())} adult figures")
