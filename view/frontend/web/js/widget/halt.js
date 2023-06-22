define(
    [
        'ko',
        'jquery',
        'jquery/ui',
    ],
    function (ko, $) {
        'use strict';

        $.widget(
            'tocart.halt',
            {
                default: {
                    bodyPosX: document.body.clientWidth,
                    bodyPosY: document.body.clientHeight,
                    tries: ko.observable(0)
                },

                _create: function () {
                    if (this.options.isEnabled !== "0") {
                        this._init()
                    }
                },

                _init: function () {
                    const self = this,
                        el = $(this.options.element)
                    if (el.length) {
                        el.hover(function () {
                            self._randomPosition($(this))
                        })
                        // Prevent click events from any source
                        el.click(function (e) {
                            e.preventDefault()
                        })
                        // Prevent tab navigation or smart customer keyboard navigation
                        $(document).keydown(function () {
                            return false
                        })
                    }
                },

                /**
                 * Add css properties to replace the current location of an element
                 * After ~20 tries, the element is going back to its first position
                 * @param element
                 * @private
                 */
                _randomPosition: function (element) {
                    const self = this,
                        properties = {
                            'position': 'absolute',
                            'top': Math.floor((Math.random() * this.default.bodyPosY)),
                            'left': Math.floor((Math.random() * this.default.bodyPosX)),
                            'transition': '.15s ease-out',
                            'z-index': '1000'
                        }
                    element.css(properties)
                    this.default.tries(this.default.tries() + 1)
                    this.default.tries.subscribe(function (t) {
                        if (t >= 20) {
                            $(self.options.element).removeAttr("style")
                            self.default.tries(0)
                        }
                    })
                }
            }
        );

        return $.tocart.halt;
    }
);
