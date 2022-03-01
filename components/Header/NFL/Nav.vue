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
    <ul class="nav__links">
      <li>
        <a
          class="nav__link"
          href="https://www.theringer.com/pages/podcasts"
          target="_blank"
        >Podcasts</a>
      </li>
      <li>
        <a
          class="nav__link"
          href="https://www.theringer.com/nfl"
          target="_blank"
        >NFL</a>
      </li>
      <li>
        <a
          class="nav__link"
          href="https://www.theringer.com/college-football"
          target="_blank"
        >College Football</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "NFLNav"
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
    left:10px;
    right:10px;
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
