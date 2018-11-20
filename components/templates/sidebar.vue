<template>
    <aside class="is-fixed-top menu" v-if="$auth.loggedIn">
      <p class="menu-label">
        General
      </p>
      <ul class="menu-list">
        <li><nuxt-link to="/">Dashboard</nuxt-link></li>
        <li><nuxt-link to="/features/add">Add Features</nuxt-link></li>
      </ul>
      <p class="menu-label">
        Administration
      </p>
      <ul class="menu-list">
        <li>
          <a>Manage Your Team</a>
          <ul>
            <li><nuxt-link to="/users">Users</nuxt-link></li>
            <li><nuxt-link to="/ads">Ads</nuxt-link></li>
            <li><a>Features</a></li>
          </ul>
        </li>
        <li><nuxt-link to="/coupon/generate">Coupons</nuxt-link></li>
        <li><a>Cloud Storage Environment Settings</a></li>
        <li><a>Authentication</a></li>
      </ul>
      <p class="menu-label">
        Transactions
      </p>
      <ul class="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
      </ul>
    </aside>
</template>

<style>
  aside.menu{
    position:fixed;
    color:white;
    background:#0e0d0d;
    height:100vh;
  }
  aside.menu a{
    color:inherit;
  }
</style>