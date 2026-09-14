import os
import glob

# Files to update
files_to_update = [
    "package.json",
    "public/manifest.json",
    "lib/seo.ts",
    "lib/schema/index.ts",
    "components/bento-section.tsx",
    "components/faq-section.tsx",
    "components/ui/vscode-mockup.tsx",
    "components/ui/header-3.tsx",
    "components/ui/header-2.tsx",
    "components/ui/contact-floating-hero.tsx",
    "components/ui/full-screen-signup.tsx",
    "components/ui/vscode-live.tsx",
    "app/not-found.tsx",
    "app/error.tsx",
    "app/login/layout.tsx",
    "app/bot/layout.tsx",
    "app/sitemap.ts"
]

def process_file(filepath):
    if not os.path.exists(filepath):
        print(f"Skipping {filepath} (does not exist)")
        return

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements
    content = content.replace("twopixel.org", "harisshakeel.site")
    content = content.replace("TwoPixel", "Haris Shakeel")
    content = content.replace("twopixel", "harisshakeel")
    content = content.replace("Haris Shakeel Team", "Haris Shakeel")
    content = content.replace("contact@harisshakeel.site", "harisshakeel061@gmail.com")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"Updated {filepath}")

for file in files_to_update:
    process_file(file)

print("Done.")
