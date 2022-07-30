export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }

    return new Array(end - start + 1)
        .fill(null)
        .map((_, i) => start + i)
}

export function nextSelector(key, { col, row }) {
    const MIN_VALUE = 0

    switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowUp':
            row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
        default:
            break
    }

    return `[data-id="${row}:${col}"]`

}