<template>
  <d2-container class="page">
    <d2-page-cover title="资产管理系统" sub-title="">
      <d2-icon-svg class="page__logo" name="d2-admin"/>
    </d2-page-cover>
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/releases', [
      'version'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/public.scss";
.page {
  .page__logo {
    width: 120px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
