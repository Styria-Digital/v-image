(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.vImage = {}));
}(this, (function (exports) { 'use strict';

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    var script = {
        name: 'vImage',

        props: {
            src: {
                type: String,
                required: true
            },
            srcPlaceholder: {
                type: String,
                default: ''
            },
            alt: {
                type: String
            },
            intersectionOptions: {
                type: Object,
                default: function () {}
            },
            usePicture: {
                type: Boolean,
                default: false
            }
        },

        data: function () { return ({
            observer: null,
            intersected: false,
            nativeLazy: false,
            imageLoaded: false
        }); },

        computed: {
            imageSrc: function imageSrc () {
                return this.intersected && this.src ? this.src : this.srcPlaceholder;
            }
        },

        methods: {
            load: function load () {
                if (this.$el.getAttribute('src') !== this.srcPlaceholder) {
                    this.imageLoaded = true;
                    this.$emit('load');
                }
            },
            error: function error () {
                this.$emit('error');
            }
        },

        mounted: function mounted () {
            var this$1 = this;

            if ('loading' in HTMLImageElement.prototype) {
                this.nativeLazy = true;
            } else if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(function (entries) {
                    var image = entries[0];
                    if (image.isIntersecting) {
                        this$1.intersected = true;
                        this$1.observer.disconnect();
                        this$1.$emit('intersect');
                    }
                }, this.intersectionOptions);
                this.observer.observe(this.$el);
            }
        },

        destroyed: function destroyed () {
            if (!this.nativeLazy && 'IntersectionObserver' in window) {
                this.observer.disconnect();
            }
        }
    };

    function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
        if (typeof shadowMode !== 'boolean') {
            createInjectorSSR = createInjector;
            createInjector = shadowMode;
            shadowMode = false;
        }
        // Vue.extend constructor export interop.
        var options = typeof script === 'function' ? script.options : script;
        // render functions
        if (template && template.render) {
            options.render = template.render;
            options.staticRenderFns = template.staticRenderFns;
            options._compiled = true;
            // functional template
            if (isFunctionalTemplate) {
                options.functional = true;
            }
        }
        // scopedId
        if (scopeId) {
            options._scopeId = scopeId;
        }
        var hook;
        if (moduleIdentifier) {
            // server build
            hook = function (context) {
                // 2.3 injection
                context =
                    context || // cached call
                        (this.$vnode && this.$vnode.ssrContext) || // stateful
                        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
                // 2.2 with runInNewContext: true
                if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                    context = __VUE_SSR_CONTEXT__;
                }
                // inject component styles
                if (style) {
                    style.call(this, createInjectorSSR(context));
                }
                // register component module identifier for async chunk inference
                if (context && context._registeredComponents) {
                    context._registeredComponents.add(moduleIdentifier);
                }
            };
            // used by ssr in case component is cached and beforeCreate
            // never gets called
            options._ssrRegister = hook;
        }
        else if (style) {
            hook = shadowMode
                ? function (context) {
                    style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
                }
                : function (context) {
                    style.call(this, createInjector(context));
                };
        }
        if (hook) {
            if (options.functional) {
                // register for functional component in vue file
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                    hook.call(context);
                    return originalRender(h, context);
                };
            }
            else {
                // inject component registration as beforeCreate hook
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
            }
        }
        return script;
    }

    /* script */
    var __vue_script__ = script;

    /* template */
    var __vue_render__ = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _vm.usePicture
        ? _c(
            "picture",
            [
              _vm._t("default"),
              _vm._v(" "),
              !_vm.imageLoaded
                ? _c("img", { attrs: { src: _vm.srcPlaceholder, alt: _vm.alt } })
                : _vm._e()
            ],
            2
          )
        : _c("img", {
            class: { "is-loaded": this.imageLoaded },
            attrs: {
              src: _vm.imageSrc,
              alt: _vm.alt,
              loading: this.nativeLazy ? "lazy" : ""
            },
            on: { load: _vm.load, error: _vm.error }
          })
    };
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      var __vue_inject_styles__ = undefined;
      /* scoped */
      var __vue_scope_id__ = undefined;
      /* module identifier */
      var __vue_module_identifier__ = undefined;
      /* functional template */
      var __vue_is_functional_template__ = false;
      /* style inject */
      
      /* style inject SSR */
      
      /* style inject shadow dom */
      

      
      var __vue_component__ = /*#__PURE__*/normalizeComponent(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        false,
        undefined,
        undefined,
        undefined
      );

    function install (Vue) {
        if (install.installed) { return; }
        install.installed = true;
        Vue.component('vImage', __vue_component__);
    }

    var plugin = {
        install: install,
    };


    var GlobalVue = null;

    if (typeof window !== 'undefined') {
        GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
        GlobalVue = global.Vue;
    }

    if (GlobalVue) {
        GlobalVue.use(plugin);
    }


    __vue_component__.install = install;

    exports.default = __vue_component__;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
