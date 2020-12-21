<template>
  <nav class="nav">
    <a href="https://theringer.com" class="nav__logo">
      <img src="~/assets/img/logo.png" alt="The Ringer Logo" data-not-lazy />
    </a>
    <ul class="nav__links">
      <li><a class="nav-link" href="https://www.theringer.com/pages/podcasts" target="_blank">Podcasts</a></li>
      <li><a class="nav-link" href="https://www.theringer.com/nfl" target="_blank">NFL</a></li>
      <li><a class="nav-link" href="https://www.theringer.com/college-football" target="_blank">College Football</a></li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.nav{
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
  @include non-mobile{
    position:absolute;
    top:0;
    left:0;
    right:0;
  }
  &__logo{
    display: inline-block;
    max-width: 110px;
    margin-left: 10px;
    padding-top: 5px;
    img{
      width:100%;
    }
  }
  &__links{
    display:flex;
    justify-content:flex-end;
    margin-right: 10px;
    a{
      display: inline-block;
      padding: 5px 0;
      color: #fff;
      margin-left: 15px;
    }
  }
}
</style>
