define(
    [
        'ko',
        'jquery',
        'jquery/ui',
    ],
    function (ko, $) {
        'use strict';

        $.widget(
            'halt.tocart',
            {
                default: {
                    bodyPosX: document.body.clientWidth,
                    bodyPosY: document.body.clientHeight,
                    tries: ko.observable(0)
                },

                _create: function () {
                    const self = this
                    if (this.options.isEnabled !== "0") {
                        this._init()
                        this.default.tries.subscribe(function (t) {
                            if (t >= 20) {
                                $(self.options.element).removeAttr("style")
                                self.default.tries(0)
                            }
                        })
                    }
                },

                _init: function () {
                    const self = this
                    if ($(this.options.element).length) {
                        this.randomPosition()
                        // Prevent tab navigation or smart customer keyboard navigation
                        $(document).keydown(function() {
                            return false
                        })
                    }
                },

                randomPosition: function () {
                    const self = this
                    $(this.options.element).hover(
                        function () {
                            const options = {
                                'position': 'absolute',
                                'top': Math.floor((Math.random() * self.default.bodyPosY)),
                                'left': Math.floor((Math.random() * self.default.bodyPosX)),
                                'transition': '.15s ease-out',
                                'z-index': '1000'
                            }
                            $(this).css(options)
                            self.default.tries(self.default.tries() + 1)
                        }
                    )
                }
            }
        );

        return $.halt.tocart;
    }
);
