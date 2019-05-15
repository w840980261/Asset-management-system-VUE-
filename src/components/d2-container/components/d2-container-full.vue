<template>
  <div class="d2-container-full">
    <div v-if="$slots.header" ref="header" class="d2-container-full__header">
      <slot name="header"/>
    </div>
    <div class="d2-container-full__body">
      <slot/>
    </div>
    <div v-if="$slots.footer" ref="footer" class="d2-container-full__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'D2ContainerFull'
}
</script>
