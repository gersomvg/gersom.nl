export const getResized = (filename: string, width: number) => {
	return `https://content.gersom.nl/${filename.replace(/\.(?=[^.]*$)/, `.${width}.`)}`
}

const availableWidths = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 2000, 2400, 2800] as const
type AvailableWidths = (typeof availableWidths)[number]

export const getSrcset = (filename: string, widths?: Array<AvailableWidths>) => {
	return (widths || availableWidths).map((w) => `${getResized(filename, w)} ${w}w`).join(', ')
}
