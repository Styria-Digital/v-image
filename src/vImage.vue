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
            default: () => ({})
        },
        usePicture: {
            type: Boolean,
            default: false
        },
        useLazy: {
            type: Boolean,
            default: true
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
            if (this.useLazy) {
                return (this.nativeLazy || this.intersected) && this.src
                    ? this.src
                    : this.srcPlaceholder;
            } else {
                return this.src
                    ? this.src
                    : this.srcPlaceholder;
            }
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
        if (this.useLazy) {
            if ('loading' in HTMLImageElement.prototype) {
                this.nativeLazy = true;
            } else if ('IntersectionObserver' in window) {
                this.observer = new IntersectionObserver(entries => {
                    const image = entries[0];
                    if (image.isIntersecting) {
                        this.intersected = true;
                        this.observer.unobserve(this.$el);
                        this.observer.disconnect();
                        this.$emit('intersect');
                    }
                }, this.intersectionOptions);
                this.observer.observe(this.$el);
            }
        }
    },

    beforeDestroy () {
        if (this.useLazy && !this.nativeLazy && 'IntersectionObserver' in window) {
            this.observer.disconnect();
        }
    }
}
</script>
