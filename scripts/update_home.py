#!/usr/bin/env python3
"""Replace unsplash placeholder URLs in index.html with local images/home/ paths.
Each URL gets a single new (path, alt). Reused URLs are listed once and processed in
the order they appear in the file."""
import re
from pathlib import Path

HTML = Path(r"C:\Users\thinkpad\20260609 深圳AI硬核工作坊\WEBSITE 3\index.html")
text = HTML.read_text(encoding="utf-8")

# Each entry: (url_id, url_query, new_src, new_alt)
# Order matters for duplicate URLs — they get applied in file order.
url_to_new = {
    "1519238263530-99bdd11df2ea": [
        ("images/home/hero-1.jpeg", "Children's pink cat-ear hooded coat"),
    ],
    "1503944583220-79d8926ad5e2": [
        ("images/home/hero-2.png", "Children's party dress with feather trim"),
    ],
    "1556905055-8f358a7a47b2": [
        ("images/home/hero-3.png", "Children's floral puff-sleeve dress"),
        ("images/home/why-flexible.jpg", "Factory floor — flexible production volumes"),
    ],
    "1565728744382-61accd4aa148": [
        ("images/home/hero-4.png", "Children's tiered ruffle dress"),
        ("images/home/why-quality.jpg", "Inspection floor — process and quality control"),
    ],
    "1581091226825-a6a2a5aee158": [
        ("images/home/why-integrated.jpg", "Fabric warehouse — integrated supply chain"),
    ],
    "1604176354204-9268737828e4": [
        ("images/home/offer-expertise.jpg", "Factory floor — 30+ years expertise"),
    ],
    "1483985988355-763728e1935b": [
        ("images/home/offer-specialization.jpeg", "Two-piece set — product specialization"),
    ],
    "1454165804606-c3d57bc86b40": [
        ("images/home/offer-oem.jpg", "Packing finished goods — OEM and ODM capabilities"),
    ],
    "1565084888279-aca607ecce0c": [
        ("images/home/offer-capacity.jpg", "Finished goods warehouse — production capacity"),
    ],
    # 02 COMPETITIVE PRICING (1554224155-6726b3ff858f) — deliberately NOT replaced
}

# Pattern matches <img src="https://images.unsplash.com/...?..." alt="...">
pattern = re.compile(
    r'<img src="https://images\.unsplash\.com/photo-([a-z0-9-]+)\?[^"]*" alt="[^"]*"'
)

# Build a queue per URL id, advancing each match
queues = {k: list(v) for k, v in url_to_new.items()}
count = 0

def repl(m):
    global count
    url_id = m.group(1)
    if url_id not in queues:
        return m.group(0)  # leave unchanged (COMPETITIVE PRICING case)
    if not queues[url_id]:
        return m.group(0)  # no more replacements
    new_src, new_alt = queues[url_id].pop(0)
    count += 1
    return f'<img src="{new_src}" alt="{new_alt}"'

new_text = pattern.sub(repl, text)
HTML.write_text(new_text, encoding="utf-8")
print(f"Replaced {count} image references")
