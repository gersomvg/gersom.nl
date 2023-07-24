export const getResized = (filename: string, width: number) => {
	return `${filename}/m/${width ?? 0}x0`
}

export const getSrcset = (filename: string, widths: number[]) => {
	return widths.map((w) => `${getResized(filename, w)} ${w}w`).join(', ')
}
