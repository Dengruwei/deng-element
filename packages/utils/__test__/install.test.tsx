import {describe,it,expect} from "vitest"
import {defineComponent,createApp} from 'vue'
import { withInstall,makeInstaller} from '../install'
import {mount} from '@vue/test-utils'

const AppComp =defineComponent({
    name: 'AppComp',
    setup() {
        return () => <div>AppComp</div>
    }
})

const compA = withInstall(defineComponent({
    name: 'compA',
    setup() {
        return () => <div>compA</div>
    }
}))

const compB = withInstall(defineComponent({
    name: 'compB',
    setup() {
        return () => <div>compB</div>
    }
}))

describe('install',()=>{
    it("withInstall should be worded",() => {
        const wrapper = mount(() => <div id="app"></div>)
        const app = createApp(AppComp)
        app.use(compA).mount(wrapper.element)
        expect(compA.install).toBeDefined()
        expect(compB.install).toBeDefined()
        expect(app._context.components['compA']).toBeTruthy()
        expect(app._context.components['compB']).toBeFalsy()
    })

    it("makeInstaller should be worded",() => {
        const wrapper = mount(() => <div id="app"></div>)
        const app = createApp(AppComp)
        const installer = makeInstaller([compA,compB])
        app.use(installer).mount(wrapper.element)
        expect(installer).toBeDefined()
        expect(wrapper.findComponent('compA')).toBeTruthy()
        expect(wrapper.findComponent('compB')).toBeTruthy()
    })
})