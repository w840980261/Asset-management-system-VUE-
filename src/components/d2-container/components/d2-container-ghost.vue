<template>
  <div class="d2-container-ghost">
    <div v-if="$slots.header" ref="header" class="d2-container-ghost__header">
      <slot name="header"/>
    </div>
    <div class="d2-container-ghost__body">
      <slot/>
    </div>
    <div v-if="$slots.footer" ref="footer" class="d2-container-ghost__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>
