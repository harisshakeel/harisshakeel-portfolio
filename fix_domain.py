import os

files_to_update = [
    "components/ui/full-screen-signup.tsx",
    "components/ui/contact-floating-hero.tsx",
    "app/sitemap.ts"
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    content = content.replace("harisshakeel.org", "harisshakeel.site")
    content = content.replace("contact@harisshakeel.site", "harisshakeel061@gmail.com")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
