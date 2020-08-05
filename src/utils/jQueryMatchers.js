import * as jQueryMatchers from 'jest-jquery-matchers'
import $ from 'jquery'
import { isString, isObject } from './utils'

export default function (chai, utils) {
  return {
    toHaveAttr(attribute, value) {
      const received = utils.flag(this, 'object')
      const valuePassed = arguments.length === 2
      let { pass } = valuePassed
        ? jQueryMatchers.toHaveAttr().compare(received, attribute, value)
        : jQueryMatchers.toHaveAttr().compare(received, attribute)
      this.assert(
        pass,
        valuePassed
          ? `expected #{this} to have attribute ${attribute} with the value ${value}`
          : `expected #{this} to have attribute ${attribute}`,
        valuePassed
          ? `expected #{this} not to have attribute ${attribute} with the value ${value}`
          : `expected #{this} not to have attribute ${attribute}`
      )
    },
    toNotHaveAttr(attribute, value) {
      if (arguments.length === 2) {
        this.not.toHaveAttr.apply(this, [attribute, value])
      } else {
        this.not.toHaveAttr.apply(this, [attribute])
      }
    },
    toHaveProp(property, value) {
      const received = utils.flag(this, 'object')
      const valuePassed = arguments.length === 2
      let { pass } = valuePassed
        ? jQueryMatchers.toHaveProp().compare(received, property, value)
        : jQueryMatchers.toHaveProp().compare(received, property)
      this.assert(
        pass,
        valuePassed
          ? `expected #{this} to have property ${property} with the value ${value}`
          : `expected #{this} to have property ${property}`,
        valuePassed
          ? `expected #{this} not to have property ${property} with the value ${value}`
          : `expected #{this} not to have property ${property}`
      )
    },
    toNotHaveProp(property, value) {
      if (arguments.length === 2) {
        this.not.toHaveProp.apply(this, [property, value])
      } else {
        this.not.toHaveProp.apply(this, [property])
      }
    },
    toHaveCss(css, value) {
      const isExpectedCssAnObject = isObject(css)
      const isExpectedCssAString = isString(css)
      if (!isExpectedCssAnObject && !isExpectedCssAString) {
        throw new Error(
          `toHaveCss: expected css value must be a string or an object`
        )
      }
      const received = utils.flag(this, 'object')
      const valuePassed = arguments.length === 2
      let pass

      if (!valuePassed && isExpectedCssAString) {
        pass = $(received).css(css)
      } else {
        const compareValue = isExpectedCssAnObject ? css : { [css]: value }
        pass = jQueryMatchers.toHaveCss().compare(received, compareValue).pass
      }

      this.assert(
        pass,
        valuePassed
          ? `expected #{this} to have CSS property ${css} with the value ${value}`
          : `expected #{this} to have CSS property ${css}`,
        valuePassed
          ? `expected #{this} not to have CSS property ${css} with the value ${value}`
          : `expected #{this} not to have CSS property ${css}`
      )
    },
    toNotHaveCss(css, value) {
      const isExpectedCssAnObject = isObject(css)
      const isExpectedCssAString = isString(css)
      if (!isExpectedCssAnObject && !isExpectedCssAString) {
        throw new Error(
          `toNotHaveCss: expected css value must be a string or an object`
        )
      }

      if (arguments.length === 2) {
        this.not.toHaveCss.apply(this, [css, value])
      } else {
        this.not.toHaveCss.apply(this, [css])
      }
    },
    toHaveData(key, value) {
      const received = utils.flag(this, 'object')
      const valuePassed = arguments.length === 2
      let { pass } = valuePassed
        ? jQueryMatchers.toHaveData().compare(received, key, value)
        : jQueryMatchers.toHaveData().compare(received, key)
      this.assert(
        pass,
        valuePassed
          ? `expected #{this} to have data ${key} with the value ${value}`
          : `expected #{this} to have data ${key}`,
        valuePassed
          ? `expected #{this} not to have data ${key} with the value ${value}`
          : `expected #{this} not to have data ${key}`
      )
    },
    toNotHaveData(key, value) {
      if (arguments.length === 2) {
        this.not.toHaveData.apply(this, [key, value])
      } else {
        this.not.toHaveData.apply(this, [key])
      }
    },
    toHaveClass(className) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toHaveClass().compare(received, className)
      this.assert(
        pass,
        `expected #{this} to have class ${className}`,
        `expected #{this} not to have class ${className}`
      )
    },
    toNotHaveClass(className) {
      this.not.toHaveClass.apply(this, [className])
    },
    toHaveId(id) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toHaveId().compare(received, id)
      this.assert(
        pass,
        `expected #{this} to have id ${id}`,
        `expected #{this} not to have id ${id}`
      )
    },
    toNotHaveId(id) {
      this.not.toHaveId.apply(this, [id])
    },
    toHaveHtml(html) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toHaveHtml().compare(received, html)
      this.assert(
        pass,
        `expected #{this} to have HTML ${html}`,
        `expected #{this} not to have HTML ${html}`
      )
    },
    toNotHaveHtml(html) {
      this.not.toHaveHtml.apply(this, [html])
    },
    toHaveText(text) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toHaveText().compare(received, text)
      this.assert(
        pass,
        `expected #{this} to have text ${text}`,
        `expected #{this} not to have text ${text}`
      )
    },
    toNotHaveText(text) {
      this.not.toHaveText.apply(this, [text])
    },
    toHaveValue(value) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toHaveValue().compare(received, value)
      this.assert(
        pass,
        `expected #{this} to have value ${value}`,
        `expected #{this} not to have value ${value}`
      )
    },
    toNotHaveValue(value) {
      this.not.toHaveValue.apply(this, [value])
    },
    toBeVisible() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toBeVisible().compare(received)
      this.assert(
        pass,
        `expected #{this} to be visible`,
        `expected #{this} not to be visible`
      )
    },
    toNotBeVisible() {
      this.not.toBeVisible.apply(this)
    },
    toBeHidden() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toBeHidden().compare(received)
      this.assert(
        pass,
        `expected #{this} to be hidden`,
        `expected #{this} not to be hidden`
      )
    },
    toNotBeHidden() {
      this.not.toBeHidden.apply(this)
    },
    toBeSelected() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toBeSelected().compare(received)
      this.assert(
        pass,
        `expected #{this} to be selected`,
        `expected #{this} not to be selected`
      )
    },
    toNotBeSelected() {
      this.not.toBeSelected.apply(this)
    },
    toBeChecked() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toBeChecked().compare(received)
      this.assert(
        pass,
        `expected #{this} to be checked`,
        `expected #{this} not to be checked`
      )
    },
    toNotBeChecked() {
      this.not.toBeChecked.apply(this)
    },
    toBeEnabled() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toBeDisabled().compare(received)
      this.assert(
        !pass,
        `expected #{this} to be enabled`,
        `expected #{this} not to be enabled`
      )
    },
    toNotBeEnabled() {
      this.not.toBeEnabled.apply(this)
    },
    toBeDisabled() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toBeDisabled().compare(received)
      this.assert(
        pass,
        `expected #{this} to be disabled`,
        `expected #{this} not to be disabled`
      )
    },
    toNotBeDisabled() {
      this.not.toBeDisabled.apply(this)
    },
    toBeEmpty() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toBeEmpty().compare(received)
      this.assert(
        pass,
        `expected #{this} to be empty`,
        `expected #{this} not to be empty`
      )
    },
    toNotBeEmpty() {
      this.not.toBeEmpty.apply(this)
    },
    toExist() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toExist().compare(received)
      this.assert(
        pass,
        `expected #{this} to exist in the DOM`,
        `expected #{this} not to exist in the DOM`
      )
    },
    toNotExist() {
      this.not.toExist.apply(this)
    },
    toBeMatchedBy(selector) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers
        .toBeMatchedBy()
        .compare(received, selector)
      this.assert(
        pass,
        `expected #{this} to match ${selector}`,
        `expected #{this} not to match ${selector}`
      )
    },
    toNotBeMatchedBy(selector) {
      this.not.toBeMatchedBy.apply(this, [selector])
    },
    toMatchSelector(selector) {
      this.toBeMatchedBy.apply(this, [selector])
    },
    toNotMatchSelector(selector) {
      this.not.toBeMatchedBy.apply(this, [selector])
    },
    toContainText(text) {
      const received = utils.flag(this, 'object')
      const pass = $(received).is(`:contains(${text})`)
      this.assert(
        pass,
        `expected #{this} to contain ${text}`,
        `expected #{this} not to contain ${text}`
      )
    },
    toNotContainText(text) {
      this.not.toContainText.apply(this, [text])
    },
    toHaveDescendant(selector) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers
        .toHaveDescendant()
        .compare(received, selector)
      this.assert(
        pass,
        `expected #{this} to have descendants ${selector}`,
        `expected #{this} not to have descendants ${selector}`
      )
    },
    toNotHaveDescendant(selector) {
      this.not.toHaveDescendant.apply(this, [selector])
    },
    toHaveDescendantWithText(selector, text) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers
        .toHaveDescendantWithText()
        .compare(received, selector, text)
      this.assert(
        pass,
        `expected #{this} to have descendants ${selector} with text ${text}`,
        `expected #{this} not to have descendants ${selector} with text ${text}`
      )
    },
    toNotHaveDescendantWithText(selector, text) {
      this.not.toHaveDescendantWithText.apply(this, [selector, text])
    },
    toHaveQuantity(length) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toHaveLength().compare(received, length)
      this.assert(
        pass,
        `expected #{this} to have length ${length}`,
        `expected #{this} not to have length ${length}`
      )
    },
    toNotHaveQuantity(length) {
      this.not.toHaveLength.apply(this, [length])
    },
    toHaveTag(tag) {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toHaveTag().compare(received, tag)
      this.assert(
        pass,
        `expected #{this} to have tag ${tag}`,
        `expected #{this} not to have tag ${tag}`
      )
    },
    toNotHaveTag(tag) {
      this.not.toHaveTag.apply(this, [tag])
    },
    toBeFocused() {
      const received = utils.flag(this, 'object')
      const { pass } = jQueryMatchers.toBeFocused().compare(received)
      this.assert(
        pass,
        `expected #{this} to be focused`,
        `expected #{this} not to be focused`
      )
    },
    toNotBeFocused() {
      this.not.toBeFocused.apply(this)
    },
  }
}
