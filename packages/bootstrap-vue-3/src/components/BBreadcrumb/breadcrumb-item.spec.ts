import {mount} from '@vue/test-utils'
import {describe, expect, it} from 'vitest'
import BBreadcrumbItem from './BBreadcrumbItem.vue'
import BLink from '../BLink/BLink.vue'

describe('breadcrumb-item', () => {
  it('has static class breadcrumb-item', () => {
    const wrapper = mount(BBreadcrumbItem)
    expect(wrapper.classes()).toContain('breadcrumb-item')

    wrapper.unmount()
  })

  it('has class active when prop active', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      props: {active: true},
    })
    expect(wrapper.classes()).toContain('active')
    await wrapper.setProps({active: false})
    expect(wrapper.classes()).not.toContain('active')

    wrapper.unmount()
  })

  it('contains a span child when prop active', () => {
    const wrapper = mount(BBreadcrumbItem, {
      props: {active: true},
    })
    const $span = wrapper.find('span')
    expect($span.exists()).toBe(true)

    wrapper.unmount()
  })

  it('contains a blink child by default', () => {
    const wrapper = mount(BBreadcrumbItem)
    const $blink = wrapper.findComponent(BLink)
    expect($blink.exists()).toBe(true)

    wrapper.unmount()
  })

  it('child contains attr aria-current when prop active', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      props: {active: true, ariaCurrent: 'foobar'},
    })
    const $span = wrapper.get('span')
    expect($span.attributes('aria-current')).toBe('foobar')
    await wrapper.setProps({active: false})
    const $blink = wrapper.getComponent(BLink)
    expect($blink.attributes('aria-current')).toBeUndefined()

    wrapper.unmount()
  })

  it('emits click event', async () => {
    const wrapper = mount(BBreadcrumbItem)
    const $blink = wrapper.getComponent(BLink)
    await $blink.trigger('click')
    expect($blink.emitted()).toHaveProperty('click')

    wrapper.unmount()
  })

  it('does not emit click event when prop disabled', async () => {
    const wrapper = mount(BBreadcrumbItem, {
      props: {disabled: true},
    })
    const $blink = wrapper.getComponent(BLink)
    await $blink.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()

    wrapper.unmount()
  })

  it('emits a MouseEvent when clicked', async () => {
    const wrapper = mount(BBreadcrumbItem)
    const $blink = wrapper.getComponent(BLink)
    await $blink.trigger('click')
    const $emitted = $blink.emitted('click') ?? []
    expect($emitted[0][0] instanceof MouseEvent).toBe(true)

    wrapper.unmount()
  })

  it('renders default slot in child when child is span', () => {
    const wrapper = mount(BBreadcrumbItem, {
      props: {active: true},
      slots: {default: 'foobar'},
    })
    const $span = wrapper.get('span')
    expect($span.text()).toBe('foobar')

    wrapper.unmount()
  })
})
