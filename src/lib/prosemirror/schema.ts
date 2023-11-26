import { addListNodes } from 'prosemirror-schema-list'
import { Schema, type NodeSpec, type MarkSpec, type DOMOutputSpec } from 'prosemirror-model'
import { getSrcset } from '$lib/cdn/images'

const pDOM: DOMOutputSpec = ['p', 0],
	hrDOM: DOMOutputSpec = ['hr'],
	preDOM: DOMOutputSpec = ['pre', ['code', 0]],
	brDOM: DOMOutputSpec = ['br'],
	blockquoteDOM: DOMOutputSpec = ['blockquote', 0]

const nodes = {
	doc: {
		content: 'title block+',
	} as NodeSpec,

	paragraph: {
		content: 'inline*',
		group: 'block',
		parseDOM: [{ tag: 'p' }],
		toDOM() {
			return pDOM
		},
	} as NodeSpec,

	blockquote: {
		content: 'paragraph+',
		group: 'block',
		defining: true,
		parseDOM: [{ tag: 'blockquote' }],
		toDOM() {
			return blockquoteDOM
		},
	} as NodeSpec,

	horizontal_rule: {
		group: 'block',
		parseDOM: [{ tag: 'hr' }],
		toDOM() {
			return hrDOM
		},
	} as NodeSpec,

	title: {
		content: 'text*',
		defining: true,
		marks: '',
		toDOM() {
			return ['h1', 0]
		},
	} as NodeSpec,

	heading: {
		attrs: { level: { default: 1 } },
		content: 'inline*',
		group: 'block',
		defining: true,
		marks: 'link em',
		parseDOM: [
			{ tag: 'h1', attrs: { level: 1 } },
			{ tag: 'h2', attrs: { level: 1 } },
			{ tag: 'h3', attrs: { level: 2 } },
		],
		toDOM(node) {
			return ['h' + (node.attrs.level + 1), 0]
		},
	} as NodeSpec,

	code_block: {
		content: 'text*',
		marks: '',
		group: 'block',
		code: true,
		defining: true,
		parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
		toDOM() {
			return preDOM
		},
	} as NodeSpec,

	text: {
		group: 'inline',
	} as NodeSpec,

	image: {
		attrs: {
			filename: {},
			width: {},
			height: {},
			size: { default: 1 },
			alt: { default: '' },
		},
		content: 'text*',
		group: 'block',
		draggable: true,
		defining: false,
		isolating: true,
		parseDOM: [
			{
				tag: 'figure',
				contentElement: 'figcaption',
				getAttrs(dom: HTMLElement) {
					let img = dom.querySelector('img') as HTMLImageElement | null
					console.log(img && img.naturalWidth / img.naturalHeight)

					return {
						filename: img?.srcset?.match(/prent.gersom.nl\/([0-9a-z-]+\.(jpeg|jpg|png))/i)?.[1],
						size: Number(img?.dataset.size || 1),
						width: img?.dataset.width,
						height: img?.dataset.height,
					}
				},
			},
		],
		toDOM(node) {
			let { filename, width, height, size, alt } = node.attrs
			const xxsPB = Math.round((height / width) * 100 * (1 / 2 + size / 2))
			const xxsW = Math.round(100 * (0.5 + size / 2))
			const xsPB = Math.round((height / width) * 100 * (1 / 3 + size / 1.5))
			const xsW = Math.round(100 * (1 / 3 + size / 1.5))
			const smPB = Math.round((height / width) * 100 * size)
			const smW = Math.round(100 * size)
			return [
				'figure',
				[
					'div',
					{
						class:
							'overflow-hidden relative mx-auto w-[--xxs-w] pb-[--xxs-pb] xs:w-[--xs-w] xs:pb-[--xs-pb] sm:w-[--sm-w] sm:pb-[--sm-pb]',
						style: `--xxs-pb:${xxsPB}%;--xxs-w:${xxsW}%;--xs-pb:${xsPB}%;--xs-w:${xsW}%;--sm-pb:${smPB}%;--sm-w:${smW}%;`,
					},
					[
						'img',
						{
							alt,
							'sizes': '(min-width: 1024px) 684px, (min-width: 640px) 588px, 100vw',
							'srcset': getSrcset(filename),
							'style': 'object-fit:cover;',
							'class': 'absolute inset-0 w-full h-full',
							'contentEditable': false,
							'data-size': size,
							'data-width': width,
							'data-height': height,
						},
					],
				],
				['figcaption', 0],
			]
		},
	} as NodeSpec,
	//sizes={'(min-width: 1024px) 33vw, (min-width: 640px) 42vw, 100vw'}

	hard_break: {
		inline: true,
		group: 'inline',
		selectable: false,
		parseDOM: [{ tag: 'br' }],
		toDOM() {
			return brDOM
		},
	} as NodeSpec,
}

const emDOM: DOMOutputSpec = ['em', 0],
	strongDOM: DOMOutputSpec = ['strong', 0],
	codeDOM: DOMOutputSpec = ['code', 0]

const marks = {
	link: {
		attrs: {
			href: {},
		},
		inclusive: false,
		parseDOM: [
			{
				tag: 'a[href]',
				getAttrs(dom: HTMLElement) {
					return { href: dom.getAttribute('href') }
				},
			},
		],
		toDOM(node) {
			let { href } = node.attrs
			return ['a', { href, title: href }, 0]
		},
	} as MarkSpec,

	dynamic_email: {
		inclusive: false,
		parseDOM: [
			{
				tag: 'a[data-dynamic-email]',
			},
		],
		toDOM(node) {
			let { href } = node.attrs
			const today = new Date()
			const day = today.getDate()
			const month = (today.getMonth() + 1).toString().padStart(2, '0')
			const year = today.getFullYear()
			const ddmmyyyy = `${day}+${month}+${year}`
			return ['a', { 'href': `mailto:${ddmmyyyy}@gersom.nl`, 'data-dynamic-email': true }, 0]
		},
	} as MarkSpec,

	em: {
		parseDOM: [
			{ tag: 'i' },
			{ tag: 'em' },
			{ style: 'font-style=italic' },
			{ style: 'font-style=normal', clearMark: (m) => m.type.name == 'em' },
		],
		toDOM() {
			return emDOM
		},
	} as MarkSpec,

	strong: {
		parseDOM: [
			{ tag: 'strong' },
			// This works around a Google Docs misbehavior where
			// pasted content will be inexplicably wrapped in `<b>`
			// tags with a font-weight normal.
			{ tag: 'b', getAttrs: (node: HTMLElement) => node.style.fontWeight != 'normal' && null },
			{ style: 'font-weight=400', clearMark: (m) => m.type.name == 'strong' },
			{
				style: 'font-weight',
				getAttrs: (value: string) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
			},
		],
		toDOM() {
			return strongDOM
		},
	} as MarkSpec,

	code: {
		parseDOM: [{ tag: 'code' }],
		toDOM() {
			return codeDOM
		},
	} as MarkSpec,
}

const schemaWithoutListNodes = new Schema({ nodes, marks })

export default new Schema({
	nodes: addListNodes(schemaWithoutListNodes.spec.nodes, 'paragraph block*', 'block'),
	marks: schemaWithoutListNodes.spec.marks,
})
