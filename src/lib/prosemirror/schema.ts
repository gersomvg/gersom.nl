import { addListNodes } from 'prosemirror-schema-list'
import { Schema, type NodeSpec, type MarkSpec, type DOMOutputSpec } from 'prosemirror-model'

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
		content: 'inline*',
		defining: true,
		marks: '',
		parseDOM: [{ tag: 'h1' }],
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
		inline: true,
		attrs: {
			src: {},
			alt: { default: null },
			title: { default: null },
		},
		group: 'inline',
		draggable: true,
		parseDOM: [
			{
				tag: 'img[src]',
				getAttrs(dom: HTMLElement) {
					return {
						src: dom.getAttribute('src'),
						title: dom.getAttribute('title'),
						alt: dom.getAttribute('alt'),
					}
				},
			},
		],
		toDOM(node) {
			let { src, alt, title } = node.attrs
			return ['img', { src, alt, title }]
		},
	} as NodeSpec,

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

/// [Specs](#model.MarkSpec) for the marks in the schema.
export const marks = {
	/// A link. Has `href` and `title` attributes. `title`
	/// defaults to the empty string. Rendered and parsed as an `<a>`
	/// element.
	link: {
		attrs: {
			href: {},
		},
		inclusive: false,
		parseDOM: [
			{
				tag: 'a[href]',
				getAttrs(dom: HTMLElement) {
					return { href: dom.getAttribute('href'), title: dom.getAttribute('title') }
				},
			},
		],
		toDOM(node) {
			let { href } = node.attrs
			return ['a', { href, title: href }, 0]
		},
	} as MarkSpec,

	/// An emphasis mark. Rendered as an `<em>` element. Has parse rules
	/// that also match `<i>` and `font-style: italic`.
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

	/// A strong mark. Rendered as `<strong>`, parse rules also match
	/// `<b>` and `font-weight: bold`.
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

	/// Code font mark. Represented as a `<code>` element.
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
