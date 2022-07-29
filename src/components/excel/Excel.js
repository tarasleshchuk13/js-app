import { $ } from '@core/dom'

export class Excel {

    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components ?? []
    }

    getRoot() {
        // const $root = document.createElement('div')
        // $root.classList.add('excel')
        const $root = $.create('div', 'excel')

        this.components = this.components.map(Component => {
            // const $el = document.createElement('div')
            // $el.classList.add(Component.className)
            const $el = $.create('div', Component.className)
            const component = new Component($el)
            // $el.innerHTML = component.toHtml()
            $el.html(component.toHtml())
            $root.append($el)

            return component
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this.components.forEach(component => component.init())
    }

}
