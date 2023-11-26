import type { Node as PMNode } from 'prosemirror-model'
import { EditorState, NodeSelection, Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet, type EditorView } from 'prosemirror-view'

function isNode(eventTarget: EventTarget): eventTarget is Node {
	return eventTarget instanceof Node
}

const pluginKey = new PluginKey<DecorationSet>('images')

function findPlaceholder(state: EditorState, id: any) {
	let decos = pluginKey.getState(state)
	let found = decos?.find(undefined, undefined, (spec) => spec.id === id)
	return found?.length ? found[0].from : null
}

export function insertPlaceholder(state: EditorState, id: any) {
	let tr = state.tr
	if (!tr.selection.empty) tr.deleteSelection()
	return tr.setMeta(pluginKey, { add: { id, pos: tr.selection.$from.before() } })
}

export function replacePlaceholder(state: EditorState, id: any, content?: PMNode) {
	let pos = findPlaceholder(state, id)
	if (pos == null) return
	if (content) {
		return state.tr.replaceWith(pos, pos, content).setMeta(pluginKey, { remove: { id } })
	} else {
		return state.tr.setMeta(pluginKey, { remove: { id } })
	}
}

export const images = () =>
	new Plugin({
		key: pluginKey,
		view(view) {
			return new ImageTooltip(view)
		},
		state: {
			init() {
				return DecorationSet.empty
			},
			apply(tr, set) {
				set = set.map(tr.mapping, tr.doc)
				let action = tr.getMeta(pluginKey)
				if (action && action.add && action.add.id != null && Number.isFinite(action.add.pos)) {
					let widget = document.createElement('div')
					widget.className = 'w-full pb-[75%] rounded bg-gray-200 dark:bg-gray-800'
					let deco = Decoration.widget(action.add.pos, widget, {
						id: action.add.id,
					})
					set = set.add(tr.doc, [deco])
				} else if (action && action.remove && action.remove.id != null) {
					set = set.remove(set.find(undefined, undefined, (spec) => spec.id == action.remove.id))
				}
				return set
			},
		},
		props: {
			handleClickOn(view, pos, node, nodePos, event) {
				if (
					node.type.name !== 'image' ||
					(event.target &&
						isNode(event.target) &&
						event.target.nodeName.toLowerCase() === 'figcaption')
				) {
					return false
				}
				view.dispatch(
					view.state.tr.setSelection(new NodeSelection(view.state.doc.resolve(nodePos))),
				)
				return true
			},
			decorations(state) {
				return this.getState(state)
			},
		},
	})

// import { Plugin } from 'prosemirror-state'
// import { Decoration, DecorationSet } from 'prosemirror-view'

// let placeholderPlugin = new Plugin({
// 	state: {
// 		init() {
// 			return DecorationSet.empty
// 		},
// 		apply(tr, set) {
// 			// Adjust decoration positions to changes made by the transaction
// 			set = set.map(tr.mapping, tr.doc)
// 			// See if the transaction adds or removes any placeholders
// 			let action = tr.getMeta(this)
// 			if (action && action.add) {
// 				let widget = document.createElement('placeholder')
// 				let deco = Decoration.widget(action.add.pos, widget, { id: action.add.id })
// 				set = set.add(tr.doc, [deco])
// 			} else if (action && action.remove) {
// 				set = set.remove(set.find(null, null, (spec) => spec.id == action.remove.id))
// 			}
// 			return set
// 		},
// 	},
// 	props: {
// 		decorations(state) {
// 			return this.getState(state)
// 		},
// 	},
// })

class ImageTooltip {
	view: EditorView
	tooltip: HTMLDivElement = document.createElement('div')

	constructor(view: EditorView) {
		this.view = view
		this.tooltip.className = 'tooltip absolute rounded flex bg-gray-300 dark:bg-gray-700 -mt-2'
		this.tooltip.appendChild(this.getButtonElement('S', 0.5))
		this.tooltip.appendChild(this.getButtonElement('M', 0.618))
		this.tooltip.appendChild(this.getButtonElement('L', 1))
		view.dom.parentNode?.appendChild(this.tooltip)
		this.update(view, null)
	}

	update(view: EditorView, lastState: EditorState | null) {
		this.view = view
		let state = view.state
		if (lastState && lastState.doc.eq(state.doc) && lastState.selection.eq(state.selection)) return
		if (!(state.selection instanceof NodeSelection) || state.selection.node.type.name !== 'image') {
			return this.hide()
		}
		this.tooltip.style.display = ''
		let parent = this.tooltip.offsetParent
		if (!parent) return this.hide()
		let coords = view.coordsAtPos(state.selection.from)
		let tooltipRect = this.tooltip.getBoundingClientRect()
		let parentRect = parent.getBoundingClientRect()
		// this.tooltip.style.left =
		// 	(coords.left + coords.right) / 2 - parentRect.left - tooltipRect.width / 2 + 'px'
		this.tooltip.style.left = coords.right - parentRect.left - tooltipRect.width + 'px'
		this.tooltip.style.top = coords.top - parentRect.top - tooltipRect.height + 'px'
	}

	getButtonElement(label: string, size: number) {
		const button: HTMLButtonElement = document.createElement('button')
		button.textContent = label
		button.className = 'w-8 h-8 text-gray-900 dark:text-gray-100 text-xl'
		button.onclick = (event) => {
			event.preventDefault()
			this.view.focus()
			let state = this.view.state
			if (
				!(state.selection instanceof NodeSelection) ||
				state.selection.node.type.name !== 'image'
			) {
				return this.hide()
			}
			this.view.dispatch(state.tr.setNodeAttribute(state.selection.from, 'size', size))
		}
		return button
	}

	hide() {
		this.tooltip.style.display = 'none'
	}

	destroy() {
		this.tooltip.remove()
	}
}
