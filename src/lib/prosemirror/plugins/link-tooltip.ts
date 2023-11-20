import { EditorState, Plugin } from 'prosemirror-state'
import type { EditorView } from 'prosemirror-view'

export default () =>
	new Plugin({
		view(editorView) {
			return new SelectionSizeTooltip(editorView)
		},
	})

class SelectionSizeTooltip {
	tooltip: HTMLDivElement

	constructor(view: EditorView) {
		this.tooltip = document.createElement('div')
		this.tooltip.className = 'tooltip'
		this.tooltip.style.position = 'absolute'
		this.tooltip.style.backgroundColor = 'yellow'
		view.dom.parentNode?.appendChild(this.tooltip)

		this.update(view, null)
	}

	update(view: EditorView, lastState: EditorState | null) {
		let state = view.state
		// Don't do anything if the document/selection didn't change
		if (lastState && lastState.doc.eq(state.doc) && lastState.selection.eq(state.selection)) return

		// Hide the tooltip if the selection is empty
		if (state.selection.empty) {
			this.tooltip.style.display = 'none'
			return
		}
		this.tooltip.style.display = ''
		if (!this.tooltip.offsetParent) {
			this.tooltip.style.display = 'none'
			return
		}

		let { from, to } = state.selection
		// These are in screen coordinates
		let start = view.coordsAtPos(from),
			end = view.coordsAtPos(to)
		// The box in which the tooltip is positioned, to use as base
		let box = this.tooltip.offsetParent.getBoundingClientRect()
		// Find a center-ish x position from the selection endpoints (when
		// crossing lines, end may be more to the left)
		let left = Math.max((start.left + end.left) / 2, start.left + 3)
		this.tooltip.style.left =
			left - box.left - this.tooltip.getBoundingClientRect().width / 2 + 'px'
		this.tooltip.style.bottom = box.bottom - start.top + 'px'
		this.tooltip.textContent = '' + (to - from)
	}

	destroy() {
		this.tooltip.remove()
	}
}
