<template>
    <img
        class="v-image"
        :src="src"
        :alt="alt"
        :loading="this.nativeLazy ? 'lazy' : ''"
        @load="load"
        @error="error"
    />
</template>

<script>
export default {
    name: 'vImage',

    inheritAttrs: false,

    props: {
        src: {
            type: String,
            required: true,
        },
        srcPlaceholder: {
            type: String,
            default: 'data:,'
        },
        srcset: {
            type: String
        },
        intersectionOptions: {
            type: Object,
            default: () => {}
        },
        usePicture: {
            type: Boolean,
            default: false
        },
        alt: {
            type: String
        }
    },

    data: () => ({
        observer: null,
        intersected: false,
        nativeLazy: false
    }),

    methods: {
        load () {
            console.log('LOADED');
        },
        error () {
            console.log('ERROR');
        }
    },

    created () {
        if ('loading' in HTMLImageElement.prototype) {
            this.nativeLazy = true;
        } else if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(entries => {
                const image = entries[0];
                if (image.isIntersecting) {
                    this.intersected = true;
                    this.observer.disconnect();
                    this.$emit('intersect');
                }
            }, this.intersectionOptions);
            this.observer.observe(this.$el);
        }
    },
    destroyed() {
        if (!this.nativeLazy && 'IntersectionObserver' in window) {
            this.observer.disconnect();
        }
    }
}
</script>
