import { chainCommands, exitCode, newlineInCode } from 'prosemirror-commands'
import schema from './schema'
import { liftListItem, sinkListItem, splitListItem } from 'prosemirror-schema-list'
import { TextSelection, type Command } from 'prosemirror-state'

const { nodes, marks } = schema

export const insertHardBreak: Command = chainCommands(exitCode, (state, dispatch) => {
	if (dispatch) dispatch(state.tr.replaceSelectionWith(nodes.hard_break.create()).scrollIntoView())
	return true
})

export const handleEnter: Command = chainCommands(newlineInCode, splitListItem(nodes.list_item))

export const handleTab: Command = (state, dispatch) => {
	const { $from, $to, from, to } = state.selection
	if ($from.parent.type === nodes.code_block && $from.node() === $to.node()) {
		const isEndOfText = $from.end() === from
		const relFrom = isEndOfText ? $from.node().textContent.length : $from.textOffset
		const leadingText = $from.node().textBetween(0, relFrom)
		const newlineIndex = leadingText.lastIndexOf('\n')
		const newFrom = from - (newlineIndex === -1 ? relFrom : relFrom - newlineIndex - 1)
		const targetText = state.doc.textBetween(newFrom, to)
		const indented = '  ' + targetText.replaceAll('\n', '\n  ')
		if (dispatch) {
			const insertTransaction = state.tr.insertText(indented, newFrom, to)
			insertTransaction.setSelection(
				TextSelection.create(
					insertTransaction.doc,
					from + 2,
					to + (indented.length - targetText.length),
				),
			)
			dispatch(insertTransaction)
		}
		return true
	}
	return sinkListItem(nodes.list_item)(state, dispatch)
}

export const handleShiftTab: Command = (state, dispatch) => {
	const { $from, $to, from, to } = state.selection
	if ($from.parent.type === nodes.code_block && $from.node() === $to.node()) {
		const relFrom = $from.end() === from ? $from.node().textContent.length : $from.textOffset
		const relTo = $to.end() === to ? $to.node().textContent.length : $to.textOffset
		const leadingText = $from.node().textContent.slice(0, relFrom)
		const trailingText = $to.node().textContent.slice(relTo)
		const leadingNewlineIdx = leadingText.lastIndexOf('\n')
		const trailingNewlineIdx = trailingText.indexOf('\n')
		const newFrom = from - (leadingNewlineIdx === -1 ? relFrom : relFrom - leadingNewlineIdx - 1)
		const newTo = to + (trailingNewlineIdx === -1 ? trailingText.length : trailingNewlineIdx)
		const targetText = state.doc.textBetween(newFrom, newTo)
		const outdented = targetText.replace(/^\s{1,2}/, '').replaceAll(/\n\s{1,2}/g, '\n')
		if (dispatch) {
			const insertTransaction = state.tr.insertText(outdented, newFrom, newTo)
			insertTransaction.setSelection(
				TextSelection.create(
					insertTransaction.doc,
					newFrom,
					newTo - (targetText.length - outdented.length),
				),
			)
			dispatch(insertTransaction)
		}
		return true
	}
	return liftListItem(nodes.list_item)(state, dispatch)
}
