import { defaultTitle } from '@/constants'
import { changeTitle } from '@/redux/actoins'
import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { ActiveRoute } from '@core/routes/ActiveRoute'
import { debounce } from '@core/utils'

export class Header extends ExcelComponent {
    
    static className = 'excel__header'
    
    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
            ...options
        })
    }
    
    prepare() {
        this.onInput = debounce(this.onInput.bind(this), 300)
    }
    
    toHtml() {
        const title = this.store.getState().title || defaultTitle
        
        return `
            <input type="text" class="input" value="${title}"/>

            <div>

                <div class="button" data-button="remove">
                    <i class="material-icons" data-button="remove">delete</i>
                </div>

                <div class="button" data-button="exit">
                    <i class="material-icons" data-button="exit">exit_to_app</i>
                </div>

            </div>
        `
    }
    
    onClick(event) {
        const $target = $(event.target)
        
        if ($target.data.button === 'remove') {
            const decision = confirm('Do you really want to delete this table?')
            
            if (!decision) {
                return
            }
            
            localStorage.removeItem('excel:' + ActiveRoute.param)
            ActiveRoute.navigate('')
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }
    
    onInput(event) {
        const $target = $(event.target)
        this.$dispatch(changeTitle($target.text()))
    }
    
}
