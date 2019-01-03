<template>
<div class="left-sidebar">
            <!-- Sidebar scroll-->
            <div class="scroll-sidebar">
                <!-- Sidebar navigation-->
                <nav class="sidebar-nav">
                    <ul id="sidebarnav">
                        <li class="nav-devider"></li>
                        <li class="nav-label">Home</li>
                        <li> 
                            <nuxt-link to="/" href="#" aria-expanded="false">
                                <i class="fa fa-tachometer"></i>
                                <span class="hide-menu">Dashboard</span>
                            </nuxt-link>
                        </li>
                        <li class="nav-label">Data</li>
                        <li> <a class="has-arrow" href="javascript:void(0)"  aria-expanded="false"><i class="fa fa-users"></i>
                            <span class="hide-menu">Users</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><nuxt-link to="/users">All</nuxt-link></li>
                                <li><nuxt-link to="/users?status=disableds">Disabled</nuxt-link></li>
                                <li><nuxt-link to="/users?status=actives">Active</nuxt-link></li>
                            </ul>
                        </li>
                        <li> <a class="has-arrow" href="javascript:void(0)" aria-expanded="false">
                            <i class="fa fa-bar-chart"></i>
                            <span class="hide-menu">Ads</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><nuxt-link to="/ads">All</nuxt-link></li>
                                <li><nuxt-link to="/ads?status=actives">Active</nuxt-link></li>
                                <li><nuxt-link to="/ads?status=disableds">Disabled</nuxt-link></li>
                                <li><nuxt-link to="/ads?is=pending">In preview Ads</nuxt-link></li>
                                <li><nuxt-link to="/ads?is=featured">Featured Ads</nuxt-link></li>
                            </ul>
                        </li>
                        <li class="nav-label">Features</li>
                        <li> 
                            <nuxt-link to="/categories">
                                <i class="fa fa-suitcase"></i>
                                <span class="hide-menu">Categories</span>
                            </nuxt-link>
                        </li>
                        <li> 
                            <nuxt-link to="/coupons">
                                <i class="far fa-newspaper"></i>
                                <span class="hide-menu">Coupons</span>
                            </nuxt-link>
                        </li>
                        <li> 
                        <a class="has-arrow" href="javascript:void(0)" aria-expanded="false">
                            <i class="fa fa-wpforms"></i><span class="hide-menu">Featured Top Side</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li> <nuxt-link to="/features">All</nuxt-link></li>
                                <li><nuxt-link to="/features/add">Add</nuxt-link></li>
                            </ul>
                        </li>
                        <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-table"></i><span class="hide-menu">Tables</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="table-bootstrap.html">Basic Tables</a></li>
                                <li><a href="table-datatable.html">Data Tables</a></li>
                            </ul>
                        </li>
                       
                    </ul>
                </nav>
                <!-- End Sidebar navigation -->
            </div>
            <!-- End Sidebar scroll-->
        </div>
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