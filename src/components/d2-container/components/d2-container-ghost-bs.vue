<template>
  <div class="d2-container-ghost-bs">
    <div v-if="$slots.header" ref="header" class="d2-container-ghost-bs__header">
      <slot name="header"/>
    </div>
    <div ref="wrapper" class="d2-container-ghost-bs__body">
      <slot/>
    </div>
    <div v-if="$slots.footer" ref="footer" class="d2-container-ghost-bs__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
import bs from './mixins/bs'
export default {
  name: 'D2ContainerCardBs',
  mixins: [
    bs
  ]
}
</script>
