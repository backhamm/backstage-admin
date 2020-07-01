import VModel from './VModel/VModel'
import TablePage from './Table/TablePage'
import TableSearch from './Table/TableSearch'
import BreadCrumbs from './Table/BreadCrumbs'

const componentList = [VModel, TablePage, TableSearch, BreadCrumbs]

const components = {
    install(Vue) {
        componentList.forEach(item => {
            Vue.component(item.name, item)
        })
    }
}

export default components
