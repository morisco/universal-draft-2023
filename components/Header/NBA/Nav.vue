<template>
  <nav class="nav">
    <a
      href="https://theringer.com"
      class="nav__logo"
    >
      <img
        src="~/assets/img/logo.png"
        alt="The Ringer Logo"
        data-not-lazy
      >
    </a>
    <ul
      v-if="$mq !== 'mobile'"
      class="nav__links"
    >
      <li
        v-for="link in navLinks"
        :key="link.url"
      >
        <a
          class="nav__link"
          :href="link.url"
          target="_blank"
        >{{ link.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NBANav',
  computed: {
    navLinks() {
      return this.$mq === 'mobile' ? this.$store.getters['page/settings'].nav_links.slice(0,2) : this.$store.getters['page/settings'].nav_links;
    }
  }
}
</script>

<style scoped lang="scss">
.nav{
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
  position:absolute;
  top:27px;
  left:34px;
  right:34px;
  width:auto;
  @include single-column{
    top:25px;
    left:30px;
    right:30px;
  }
  @include mobile{
    top:15px;
    left:22.5px;
    right:22.5px;
  }
  &__logo{
    display: inline-block;
    max-width: 125px;
    @include single-column{
      max-width:125px;
    }
    @include mobile{
      max-width:110px;
    }
    img{
      width:100%;
      vertical-align:bottom;
    }
  }
  &__links{
    display:flex;
    justify-content:flex-end;
    // margin-right: 10px;
    a{
      display: inline-block;
      padding: 5px 0;
      color: #fff;
      margin-left: 20px;
      @include single-column{
        margin-left:15px;
      }
      @include mobile{
        margin-left:5px;
      }
    }
  }
  &__link{
    @include header-nav-link;
    transition:color 0.25s linear;
    &:hover{
      color:$highlight1;
    }
  }
}
</style>
