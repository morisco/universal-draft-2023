<template>
  <div
    v-if="requiresConsent && !dismissed"
    class="m-privacy-consent"
    :class="{
      'm-privacy-consent--displayed': requiresConsent,
    }"
  >
    <div class="m-privacy-consent__inner">
      <h2
        id="privacy-consent-heading-label"
        class="sr-only"
      >
        Cookie banner
      </h2>
      <p>We use cookies and other tracking technologies to improve your browsing experience on our site, show personalized content and targeted ads, analyze site traffic, and understand where our audiences come from. To learn more or opt-out, read our <a href="https://www.theringer.com/legal/cookie-policy">Cookie Policy</a>. Please also read our <a href="https://www.theringer.com/legal/privacy-notice">Privacy Notice</a> and <a href="https://www.theringer.com/legal/terms-of-use">Terms of Use</a>, which became effective December 20, 2019.</p>
      <div class="m-privacy-consent-lockup">
        <p>By choosing <b>I Accept</b>, you consent to our use of cookies and other tracking technologies.</p>

        <button
          id="privacy-consent-button"
          type="button"
          @click="giveConsent"
        >
          <div class="m-privacy-consent__button-content">
            <div class="m-privacy-consent__hourglass" />
            I Accept
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import inEU from '@segment/in-eu'
export default {
  name: "CookieConsent",
  data() {
    return {
      dismissed: false,
    }
  },
  computed: {
    requiresConsent() {
      const isEU = inEU();
      return isEU && !window.localStorage.getItem('ringer-nfldraft-gdpr') ? true : false
    }
  },
  methods: {
    giveConsent() {
      this.dismissed = true;
      // this.$ga.enable();
      this.$gtag && this.$gtag.pageview(this.$route.path);
      window.localStorage.setItem('ringer-nfldraft-gdpr', 1);
    },
  }
}
</script>
<style lang="scss" scoped>
.m-privacy-consent-lockup{
  display:flex;
  b {
    font-weight:500;
  }
  @include mobile{
    flex-direction:column;
  }
}
.m-privacy-consent {
  display:none;
  &--displayed{
    display:block;
  }
  background-color: rgb(60, 60, 60);
  bottom: 0;
  color: white !important;
  font-size: 17px !important;
  font-weight: normal !important;
  line-height: 1.5em !important;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 5000001;
  p{
    font-size:18px;
  }
}
.m-privacy-consent__inner {
  margin: 0 auto;
  max-width: 100%;
  padding: 30px 60px 15px;
  @include mobile{
    padding:20px;
  }
}
.m-privacy-consent__inner a {
  color: white !important;
  font-weight: normal;
  text-decoration: underline !important;
}
.m-privacy-consent__inner a:hover {
  color: #ccc !important;
}
.m-privacy-consent__inner button {
  background-color: #67c385;
  border: 1px solid white;
  color: #ffffff;
  display: block;
  font-weight: normal;
  height: 46px;
  line-height: 46px;
  padding: 0 2em;
  margin: -5px 10px 0;
  min-width: 200px;
  @include mobile{
    margin:0;
  }
}
.m-privacy-consent__inner button:hover {
  background-color: #46b169;
}
.m-privacy-consent__inner button:disabled {
  background-color: #888;
}
.m-privacy-consent__button-content {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}
.hidden {
  display: none;
}
@media(max-width: 500px) {
  .m-privacy-consent {
    font-size: 14px !important;
  }
}

/* spinner animation */
.m-privacy-consent__hourglass,
.m-privacy-consent__hourglass:after {
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.m-privacy-consent__hourglass {
  display: none;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 3px solid rgba(255, 255, 255, 0.2);
  border-right: 3px solid rgba(255, 255, 255, 0.2);
  border-bottom: 3px solid rgba(255, 255, 255, 0.2);
  border-left: 3px solid #ffffff;
  margin-right: 1em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@media (prefers-reduced-motion: reduce) {
  .m-privacy-consent__hourglass {
    -webkit-animation: none;
    animation: none;
  }
}
button:disabled .m-privacy-consent__hourglass {
  display: block;
}

.sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
</style>