import { shouldResize } from '@/components/table/table.functions'
import { resizeHandler } from '@/components/table/table.resize'
import { createTable } from '@/components/table/table.template'
import { ExcelComponent } from '@core/ExcelComponent'

export class Table extends ExcelComponent {

    static className = 'excel__table'

    constructor($root) {
        super($root, {
            listeners: ['mousedown'],
        })
    }

    toHtml() {
        return createTable(20)
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }

}