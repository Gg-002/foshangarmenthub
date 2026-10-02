#!/usr/bin/env python3
"""Copy ALL product images to deployable folders with safe English filenames.
Each entry maps source filename → (new filename, caption text).
Captions are rotated within each batch to keep types varied.
"""
import shutil
from pathlib import Path

ROOT = Path(r"C:\Users\thinkpad\20260609 深圳AI硬核工作坊\WEBSITE 3")
SRC_C = ROOT / "clothes" / "children"
SRC_A = ROOT / "clothes" / "adult"
DST_C = ROOT / "images" / "products" / "children"
DST_A = ROOT / "images" / "products" / "adult"

DST_C.mkdir(parents=True, exist_ok=True)
DST_A.mkdir(parents=True, exist_ok=True)

# Caption pools — rotated by index modulo len
CAPTIONS = {
    # CHILDREN batches
    'zhoufu': [
        'Knit Vest Set', 'Coordinated Set', 'Two-Piece Set', 'Plaid Shirt',
        'Sweatshirt Set', 'Hooded Coat', 'Pinafore Dress', 'Summer Dress',
        'School Uniform', 'Layered Look', 'Knit Set', 'Plaid Skirt Set',
        'Plaid Jacket', 'Knit Top & Skirt', 'Polo & Pants', 'Cardigan Set',
        'Pocket Tee Set', 'Quilted Set', 'Vest & Shorts',
    ],
    'baby': [
        'Sleeping Bag', 'Baby Sleep Sack', 'Cotton Sleep Bag',
    ],
    'kid': [
        'Tee & Shorts Set', 'Two-Piece Set', 'Tee & Pants Set',
        'Top & Shorts', 'Graphic Tee Set', 'Crop Set',
    ],
    'kid_dress': [
        'Dress', 'Party Dress', 'Tiered Dress', 'Tutu Dress',
        'Floral Dress', 'Embroidered Dress', 'Ruffle Dress',
    ],
    'boy_set': [
        'Tee & Shorts Set', 'Graphic Tee & Pants', 'Boy Tee Set',
        'Print Tee & Denim', 'Two-Piece Set',
    ],
    'chatgpt_stray': [
        'Tutu Dress', 'Peter Pan Dress', 'Embroidered Dress',
    ],
    # ADULT batches
    'tee_set': [
        "Men's T-Shirt & Jeans", "Men's T-Shirt & Chinos",
        "Men's Tee Set",
    ],
    'softshell': [
        "Men's Softshell Jacket", "Women's Softshell Jacket",
        'Softshell Jacket', 'Outdoor Softshell',
    ],
    'polo': [
        "Men's Long-Sleeve Polo", "Women's Long-Sleeve Polo",
        'Long-Sleeve Polo', 'Golf Polo',
    ],
    'polo_catalog': [
        'Stretch Long-Sleeve Polo', 'Quick-Dry Stretch Polo',
    ],
    'wide_pants': [
        "Women's Striped Wide-Leg Pants", "Women's Wide-Leg Pants",
    ],
    'shirt': [
        "Women's Button-Down Shirt", "Women's Oversized Shirt",
    ],
}


def caption_for(category, index):
    pool = CAPTIONS[category]
    return pool[index % len(pool)]


# ───────────────────────── children ─────────────────────────
children_files = sorted(SRC_C.iterdir())

# Pattern buckets — order matters for stable filename sequence
buckets = {
    'zhoufu': [],         # 周福______...image{N}
    'baby': [],           # 高秀水___ (no 中大童) - mostly sleeping bags
    'kid': [],            # 高秀水___中大童
    'boy_set': [],        # exec-*, 2.png, Image Sep 30
    'kid_dress': [],      # ChatGPT numbered (12_44_36 PM-1 etc)
    'chatgpt_stray': [],  # ChatGPT 12_48_55, 12_51_10
}

for f in children_files:
    name = f.name
    if name.startswith('周福'):
        buckets['zhoufu'].append(f)
    elif '中大童' in name:
        buckets['kid'].append(f)
    elif name.startswith('高秀水'):
        buckets['baby'].append(f)
    elif name.startswith('exec-') or name == '2.png' or name.startswith('1 Image Sep'):
        buckets['boy_set'].append(f)
    elif name.startswith('ChatGPT Image Sep 30, 2026, 12_4') and ('PM-1' in name or 'PM-3' in name or 'PM-4' in name or 'PM-5' in name or 'PM-6' in name or 'PM-7' in name or 'PM-8' in name or 'PM-9' in name or 'PM-11' in name or 'PM-12' in name or 'PM-14' in name):
        # numbered ChatGPT dresses
        buckets['kid_dress'].append(f)
    elif name.startswith('ChatGPT Image'):
        # 12_48_55 PM.png, 12_51_10 PM.png
        buckets['chatgpt_stray'].append(f)
    else:
        print(f"UNCATEGORIZED: {name}")

# Sort each bucket for deterministic ordering
for k in buckets:
    buckets[k].sort(key=lambda p: p.name)

# Print plan for review
print("=== CHILDREN PLAN ===")
for cat, files in buckets.items():
    print(f"  {cat}: {len(files)} files")

# Copy with sequential naming within each category
total_c = 0
children_html = []
for cat, files in buckets.items():
    for i, f in enumerate(files, start=1):
        ext = f.suffix.lower()
        new_name = f"kids-{cat}-{i:02d}{ext}"
        dst = DST_C / new_name
        shutil.copy2(f, dst)
        cap = caption_for(cat, i - 1)
        children_html.append((new_name, cap))
        total_c += 1

# ───────────────────────── adult ─────────────────────────
adult_files = sorted(SRC_A.iterdir())
adult_buckets = {
    'tee_set': [],       # 11_40 batch
    'softshell': [],     # 19_40 batch
    'polo': [],          # 19_50, 19_51, 19_52, 19_53
    'polo_catalog': [],  # 19_59 batch (text overlay)
    'wide_pants': [],    # 21_03, 21_04
    'shirt': [],         # 21_10, 21_11
}

for f in adult_files:
    name = f.name
    if '11_40' in name:
        adult_buckets['tee_set'].append(f)
    elif '19_40' in name:
        adult_buckets['softshell'].append(f)
    elif '19_59' in name:
        adult_buckets['polo_catalog'].append(f)
    elif '19_5' in name:
        adult_buckets['polo'].append(f)
    elif '21_03' in name or '21_04' in name:
        adult_buckets['wide_pants'].append(f)
    elif '21_1' in name:
        adult_buckets['shirt'].append(f)
    else:
        print(f"UNCATEGORIZED ADULT: {name}")

for k in adult_buckets:
    adult_buckets[k].sort(key=lambda p: p.name)

print("\n=== ADULT PLAN ===")
for cat, files in adult_buckets.items():
    print(f"  {cat}: {len(files)} files")

total_a = 0
adult_html = []
for cat, files in adult_buckets.items():
    for i, f in enumerate(files, start=1):
        ext = f.suffix.lower()
        new_name = f"adult-{cat}-{i:02d}{ext}"
        dst = DST_A / new_name
        shutil.copy2(f, dst)
        cap = caption_for(cat, i - 1)
        adult_html.append((new_name, cap))
        total_a += 1

print(f"\nDone. Children: {total_c}, Adult: {total_a}, Total: {total_c + total_a}")

# Emit figure markup to stdout for paste into products.html
print("\n=== CHILDREN_HTML ===")
for fn, cap in children_html:
    safe_alt = cap.replace('"', '"')
    print(f'<figure class="product-card"><img src="images/products/children/{fn}" alt="{safe_alt}" loading="lazy"><figcaption>{cap}</figcaption></figure>')

print("\n=== ADULT_HTML ===")
for fn, cap in adult_html:
    safe_alt = cap.replace('"', '"')
    print(f'<figure class="product-card"><img src="images/products/adult/{fn}" alt="{safe_alt}" loading="lazy"><figcaption>{cap}</figcaption></figure>')
