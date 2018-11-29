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
                        <li class="nav-label">Layout</li>
                        <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-columns"></i><span class="hide-menu">Layout</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="layout-blank.html">Blank</a></li>
                                <li><a href="layout-boxed.html">Boxed</a></li>
                                <li><a href="layout-fix-header.html">Fix Header</a></li>
                                <li><a href="layout-fix-sidebar.html">Fix Sidebar</a></li>
                            </ul>
                        </li>
                        <li class="nav-label">EXTRA</li>
                        <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-book"></i><span class="hide-menu">Pages <span class="label label-rouded label-success pull-right">8</span></span></a>
                            <ul aria-expanded="false" class="collapse">

                                <li><a href="#" class="has-arrow">Authentication <span class="label label-rounded label-success">6</span></a>
                                    <ul aria-expanded="false" class="collapse">
                                        <li><a href="page-login.html">Login</a></li>
                                        <li><a href="page-register.html">Register</a></li>
                                        <li><a href="page-invoice.html">Invoice</a></li>
                                    </ul>
                                </li>
                                <li><a href="#" class="has-arrow">Error Pages</a>
                                    <ul aria-expanded="false" class="collapse">
                                        <li><a href="page-error-400.html">400</a></li>
                                        <li><a href="page-error-403.html">403</a></li>
                                        <li><a href="page-error-404.html">404</a></li>
                                        <li><a href="page-error-500.html">500</a></li>
                                        <li><a href="page-error-503.html">503</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-map-marker"></i><span class="hide-menu">Maps</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="map-google.html">Google</a></li>
                                <li><a href="map-vector.html">Vector</a></li>
                            </ul>
                        </li>
                        <li> <a class="has-arrow  " href="#" aria-expanded="false"><i class="fa fa-level-down"></i><span class="hide-menu">Multi level dd</span></a>
                            <ul aria-expanded="false" class="collapse">
                                <li><a href="#">item 1.1</a></li>
                                <li><a href="#">item 1.2</a></li>
                                <li> <a class="has-arrow" href="#" aria-expanded="false">Menu 1.3</a>
                                    <ul aria-expanded="false" class="collapse">
                                        <li><a href="#">item 1.3.1</a></li>
                                        <li><a href="#">item 1.3.2</a></li>
                                        <li><a href="#">item 1.3.3</a></li>
                                        <li><a href="#">item 1.3.4</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">item 1.4</a></li>
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