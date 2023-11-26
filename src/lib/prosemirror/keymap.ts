import {
	wrapIn,
	setBlockType,
	toggleMark,
	joinUp,
	joinDown,
	lift,
	selectParentNode,
} from 'prosemirror-commands'
import { wrapInList } from 'prosemirror-schema-list'
import { undo, redo } from 'prosemirror-history'
import { undoInputRule } from 'prosemirror-inputrules'
import type { Command } from 'prosemirror-state'
import type { Schema } from 'prosemirror-model'
import { insertHardBreak, handleEnter, handleTab, handleShiftTab } from './commands'

const mac = typeof navigator != 'undefined' ? /Mac|iP(hone|[oa]d)/.test(navigator.platform) : false

export function buildKeymap(schema: Schema) {
	const { nodes, marks } = schema

	let keys: { [key: string]: Command } = {}
	function bind(key: string, cmd: Command) {
		keys[key] = cmd
	}

	bind('Mod-z', undo)
	bind('Shift-Mod-z', redo)
	bind('Backspace', undoInputRule)
	if (!mac) bind('Mod-y', redo)
	bind('Alt-ArrowUp', joinUp)
	bind('Alt-ArrowDown', joinDown)
	bind('Mod-BracketLeft', lift)
	bind('Escape', selectParentNode)
	bind('Mod-b', toggleMark(marks.strong))
	bind('Mod-B', toggleMark(marks.strong))
	bind('Mod-i', toggleMark(marks.em))
	bind('Mod-I', toggleMark(marks.em))
	bind('Ctrl-l', (state, dispatch) => {
		dispatch?.(state.tr.removeMark(state.selection.from, state.selection.to, marks.link))
		return true
	})
	bind('Ctrl-@', (state, dispatch) => {
		dispatch?.(
			state.tr.addMark(state.selection.from, state.selection.to, marks.dynamic_email.create()),
		)
		return true
	})
	bind('Ctrl-c', toggleMark(marks.code))
	bind('Shift-Ctrl-8', wrapInList(nodes.bullet_list))
	bind('Shift-Ctrl-9', wrapInList(nodes.ordered_list))
	bind('Ctrl->', wrapIn(nodes.blockquote))
	bind('Mod-Enter', insertHardBreak)
	bind('Shift-Enter', insertHardBreak)
	if (mac) bind('Ctrl-Enter', insertHardBreak)
	bind('Enter', handleEnter)
	bind('Tab', handleTab)
	bind('Shift-Tab', handleShiftTab)
	bind('Ctrl-Shift-0', setBlockType(nodes.paragraph))
	bind('Ctrl-Shift-c', setBlockType(nodes.code_block))
	for (let i = 1; i <= 6; i++) bind('Shift-Ctrl-' + i, setBlockType(nodes.heading, { level: i }))
	bind('Mod-_', (state, dispatch) => {
		dispatch?.(state.tr.replaceSelectionWith(nodes.horizontal_rule.create()).scrollIntoView())
		return true
	})

	return keys
}
