<template>

    <picture v-if="usePicture">
        <slot />
        <img
            v-if="!imageLoaded"
            :src="srcPlaceholder"
            :alt="alt"
        >
    </picture>

    <img
        v-else
        :src="imageSrc"
        :alt="alt"
        :loading="this.nativeLazy ? 'lazy' : ''"
        :class="{ 'is-loaded': this.imageLoaded }"
        @load="load"
        @error="error"
    >

</template>

<script>
export default {
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
            default: () => {}
        },
        usePicture: {
            type: Boolean,
            default: false
        }
    },

    data: () => ({
        observer: null,
        intersected: false,
        nativeLazy: false,
        imageLoaded: false
    }),

    computed: {
        imageSrc () {
            return this.nativeLazy
                ? this.src
                : this.intersected && this.src ? this.src : this.srcPlaceholder;
        }
    },

    methods: {
        load () {
            if (this.$el.getAttribute('src') !== this.srcPlaceholder) {
                this.imageLoaded = true;
                this.$emit('load');
            }
        },
        error () {
            this.$emit('error');
        }
    },

    mounted () {
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

    destroyed () {
        if (!this.nativeLazy && 'IntersectionObserver' in window) {
            this.observer.disconnect();
        }
    }
}
</script>
