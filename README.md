## Usage

```bash
npm install v-image
```

_**Warning:** You'll need to install the [w3c Intersection Observer polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) in case you're targeting a browser which doesn't support it._

You can register the component globally so it's available in all your apps:

```js
import Vue from "vue";
import vImage from 'v-image';

Vue.use(vImage);
```

Or use it locally in any of your components:

```js
import vImage from "v-image";

export default {
  components: {
    vImage
  }
};
```

You must pass an `src` property with the link of the image:

```html
<template>
  <v-image src="http://lorempixel.com/400/200/" />
</template>
```

That image will be loaded as soon as the image enters the viewport.

## Lazy Loading at the Browser-Level

v-image is detects support for browser-level lazy loading and uses it as default. If browser-level lazy loading is not supported by browser fallback is Intersection Observer.

More information on: https://web.dev/native-lazy-loading/

## Progressive Loading

You can use the `src-placeholder` property to define an image that is shown until the `src` image is loaded.

When the `src` image is loaded, a `is-loaded` class is added, so you can use it to perform animations. For example, a blur effect:

```html
<template>
  <v-image
    src="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    src-placeholder="https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
  />
</template>

<style scoped>
.v-image {
  filter: blur(10px);
  transition: filter 0.7s;
}
.v-image.is-loaded {
  filter: blur(0);
}
</style>
```

In case you are using Webpack bundler for images too (just like Vue-cli):
```html
<v-image
  src="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
  :src-placeholder="require('../assets/img.jpg')"
/>
```

You could listen to the `intersect` and `load` events for more complex animations and state handling:

```html
<template>
  <v-image
    src="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    src-placeholder="https://cdn-images-1.medium.com/max/80/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
    @intersect="..."
    @load="..."
  />
</template>
```

[@jmperezperez](https://twitter.com/jmperezperez) has written about the [progressive loading technique](https://jmperezperez.com/more-progressive-image-loading/) on his blog, in case you want a deeper explanation.

## Picture

If you want to wrap the `img` in a `picture` tag, use the prop `usePicture`. You can then use slots to add additional elements above the `img` element`.

```html
<v-image
  src="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg"
  alt="Fallback"
  use-picture
>
  <source srcset="image-320w.jpg 320w, image-480w.jpg 480w" />
</v-image>

```

Renders as:

```html
<picture>
  <source srcset="image-320w.jpg 320w, image-480w.jpg 480w" />
  <img srcset="https://cdn-images-1.medium.com/max/1600/1*xjGrvQSXvj72W4zD6IWzfg.jpeg" alt="Fallback" />
</picture>
```

Note you can use the [picture polyfill](https://github.com/scottjehl/picturefill).

## API

_Fields marked as (\*) are required._

### Props

| Name                   | Type          | Default       | Description                                                                                                                                               |
| ---------------------- | ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src`                  | String _(\*)_ |       -       | Image `src` to lazy load when it intersects with the viewport                                                                                             |
| `src-placeholder`      | String        | ' '           | If defined, it will be shown until the `src` image is loaded.  |
| `alt`          | String       | ''         | img alt attribute |
| `intersection-options` | Object        | () => ({})    | The [Intersection Observer options object](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Creating_an_intersection_observer). |
| `use-picture`          | Boolean       | false         | Wrap the img in a picture tag. |
| `use-lazy`          | Boolean       | true         | Turn off lazy loading |

### Events

| Name        | Description                                              |
| ----------- | -------------------------------------------------------- |
| `intersect` | Triggered when the image intersects the viewport         |
| `load`      | Triggered when the image defined in `src` is loaded |
| `error`     | Triggered when the image defined in `src` fails to load |
