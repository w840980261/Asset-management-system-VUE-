<template>
  <div class="d2-container-card">
    <div v-if="$slots.header" ref="header" class="d2-container-card__header">
      <slot name="header"/>
    </div>
    <div class="d2-container-card__body">
      <div class="d2-container-card__body-card">
        <slot/>
      </div>
    </div>
    <div v-if="$slots.footer" ref="footer" class="d2-container-card__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'D2ContainerCard'
}
</script>
