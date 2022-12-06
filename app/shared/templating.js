import escapeHtml from 'lodash.escape'

/**
 * @param {TemplateStringsArray} strings
 * @param {(SafeHTML | string | SafeHTML[])[]} placeholders
 */
export function html(strings, ...placeholders) {
  return new SafeHTML(
    String.raw(
      strings,
      ...placeholders.map((p) =>
        p instanceof SafeHTML
          ? p
          : typeof p === 'string'
          ? escape(p)
          : Array.isArray(p)
          ? list(p)
          : p
      )
    )
  )
}

/**
 * @param {string} str
 */
export function escape(str) {
  return new SafeHTML(escapeHtml(str))
}

/**
 * @param {SafeHTML[]} strings
 */
export function list(strings) {
  return new SafeHTML(strings.join(''))
}

class SafeHTML {
  /**
   * @param {string} value
   */
  constructor(value) {
    this.#value = value
  }

  #value

  toString() {
    return this.#value
  }
}
