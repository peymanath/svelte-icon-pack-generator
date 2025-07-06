/**
 * Icon Generator Script - Built for Svelte projects
 * Author: Peyman Naderi
 * GitHub: https://github.com/peymanath
 * Telegram Channel: https://t.me/svelte_ch
 *
 * Description: This script converts raw SVG files into Svelte components and auto-generates a barrel export.
 * Reusable, fast, and ideal for Svelte + TypeScript monorepos.
 *
 * Feel free to share or fork — credit is appreciated
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { optimize } from 'svgo';

const authorName = 'Peyman Naderi';
const githubUrl = 'https://github.com/peymanath';
const telegramUrl = 'https://t.me/svelte_ch';

const bannerComment = `
/**
 * Icon Generator Script - Built for Svelte projects
 * Author: ${authorName}
 * GitHub: ${githubUrl}
 * Telegram Channel: ${telegramUrl}
 *
 * Description: This script converts raw SVG files into Svelte components and auto-generates a barrel export.
 * Reusable, fast, and ideal for Svelte + TypeScript monorepos.
 *
 * Feel free to share or fork — credit is appreciated
 */
`.trim();

export class IconGenerator {
	constructor(
		private rawDir = 'src/lib/icon-pack/svg',
		private outDir = 'src/lib/icon-pack/icons',
		private burrelExportDir = 'src/lib/icon-pack'
	) {}

	public run() {
		this.cleanOutDir();
		const svgFiles = this.getSvgFiles();
		const exports = this.generateComponents(svgFiles);
		this.writeBarrelFile(exports);
		this.formatOutput();
	}

	private cleanOutDir() {
		const fullOutDir = path.resolve(this.outDir);
		if (fs.existsSync(fullOutDir)) {
			fs.rmSync(fullOutDir, { recursive: true, force: true });
		}
		fs.mkdirSync(fullOutDir, { recursive: true });
	}

	private getSvgFiles(): string[] {
		const fullRawDir = path.resolve(this.rawDir);
		return fs.readdirSync(fullRawDir).filter((file) => file.endsWith('.svg'));
	}

	private generateComponents(files: string[]): string[] {
		const exportLines: string[] = [];

		for (const file of files) {
			const componentName = this.toPascalCase(path.basename(file, '.svg'));
			const svgPath = path.resolve(this.rawDir, file);
			const outputPath = path.resolve(this.outDir, `${componentName}.svelte`);
			const rawSvg = fs.readFileSync(svgPath, 'utf-8');

			const { data: optimizedSvg } = optimize(rawSvg, {
				multipass: true,
				plugins: [
					{
					name: 'convertColors',
					params: {
						currentColor: true
					}
					},
					{
					name: 'removeAttrs',
					params: {
						attrs: '(style)',
						preserveCurrentColor: true
					}
					}
				]
				});

			const innerSvg = optimizedSvg.replace(/<svg[^>]*>|<\/svg>/g, '').trim();

			const componentCode = `
<script lang="ts">
  ${bannerComment}
  export let size: string = "24";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
>
  ${innerSvg}
</svg>
`;

			fs.writeFileSync(outputPath, componentCode.trim(), 'utf-8');
			exportLines.push(`export { default as ${componentName} } from './${componentName}.svelte';`);
		}

		return exportLines;
	}

	private writeBarrelFile(exports: string[]) {
		const indexPath = path.resolve(this.outDir, 'index.ts');
		const burrelExportPath = path.resolve(this.burrelExportDir, 'index.ts');

		const iconsIndexContent = `${bannerComment}\n\n${exports.join('\n')}\n`;
		const rootIndexContent = `${bannerComment}\n\nexport * from "./icons";\n`;

		fs.writeFileSync(indexPath, iconsIndexContent, 'utf-8');
		fs.writeFileSync(burrelExportPath, rootIndexContent, 'utf-8');
	}

	private formatOutput() {
		try {
			execSync(`pnpm prettier --write "${this.outDir}/*.{svelte,ts}"`, { stdio: 'inherit' });
		} catch (error) {
			console.error('❌ Failed to format with Prettier:', error);
		}
	}

	private toPascalCase(input: string): string {
		return input.replace(/(^\w|-\w)/g, (m) => m.replace('-', '').toUpperCase());
	}
}

// اجرا هنگام فراخوانی مستقیم
if (process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]))) {
	new IconGenerator().run();
}
