 # 🧩 Icon Pack Generator for Svelte

This utility script converts raw SVG files into reusable Svelte components and auto-generates a **barrel export** for clean and easy imports.

> ✨ Created by [Peyman Naderi](https://github.com/peymanath)  
> 📢 Telegram Channel: [https://t.me/svelte_ch](https://t.me/svelte_ch)

---

## 📁 Directory Structure

You **must place** this folder in the following path:

```
src/lib/icon-pack/
```

Recommended structure:

```
icon-pack/
├── svg/              # Raw SVG files (input)
├── icons/            # Generated .svelte components (output)
├── index.ts          # Barrel export (auto-generated)
├── script/
│   ├── convert-svgs-to-svelte.ts
│   └── tsconfig.scripts.json
```

---

## ⚙️ Setup in `package.json`

Add the following script to your root `package.json`:

```json
"scripts": {
  "generate:icon-pack": "tsc --project src/lib/icon-pack/script/tsconfig.scripts.json && node src/lib/icon-pack/script/convert-svgs-to-svelte.js"
}
```

Then run it using:

```bash
pnpm generate:icon-pack
```

This will:
- Clean the `icons/` folder
- Convert all `.svg` files to `.svelte` components
- Create barrel exports (`index.ts`)
- Format everything using Prettier

---

## 🛠️ Add Alias (optional but recommended)

To simplify icon imports, add this to your `svelte.config.js`:

```ts
kit: {
  alias: {
    $icons: './src/lib/icon-pack'
  }
}
```

Then import icons like this:

```svelte
<script>
  import { ArrowLeft, PlusCircle } from '$icons';
</script>
```

---

## 🧼 Prettier

The script uses `pnpm prettier` to auto-format your generated files.  
Make sure Prettier is installed in your monorepo.

---

> **Note**
>
> The `icons` directory and the `icon-pack/index.ts` file are not included in the repository because they are auto-generated each time you run the `generate:icon-pack` script.
> To avoid tracking generated files in Git, these paths are excluded via `.gitignore`.
>
> Make sure to run the generation script after adding or updating any SVG icons to regenerate the missing files.

---

## ✅ Credits

Built by **Peyman Naderi**  
- GitHub: [@peymanath](https://github.com/peymanath)  
- Telegram Channel: [https://t.me/svelte_ch](https://t.me/svelte_ch)

Feel free to share or fork — **credit is appreciated** 🙏