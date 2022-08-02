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

export function storage(key, data) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key))
    }

    return localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' || b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }

    return a === b
}

export function camelCaseToKebabCase(str) {
    return str.replace(
        /[A-Z]+(?![a-z])|[A-Z]/g,
        ($, ofs) => (
            ofs ? '-' : ''
        ) + $.toLowerCase())
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelCaseToKebabCase(key)}: ${styles[key]}`)
        .join('; ')
}

export function debounce(fn, wait) {
    let timeout

    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            fn(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}
