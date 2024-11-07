import type { Plugin } from "vue"
import {
    ErAlert,
    ErButton,
    ErButtonGroup,
    ErIcon,
    ErCollapse,
    ErCollapseItem
} from "../"

import { expect,it, describe } from 'vitest'
import { get, map } from "lodash-es"

const components = [ErAlert, ErButton, ErButtonGroup, ErIcon, ErCollapse, ErCollapseItem] as Plugin[]

describe('components/index', () => {
    it.each(map(components, (c) => [get(c,"name"),c]))("%s should be worked",(_,component) => {
        expect(component).toBeDefined()
        expect(component.install).toBeDefined()
    })
})