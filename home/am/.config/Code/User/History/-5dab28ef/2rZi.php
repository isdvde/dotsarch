<!-- Sidebar -->
<div class="sidebar sidebar-style-2" data-background-color="{{ get_theme() }}">
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
        <div class="sidebar-content">
            <div class="user">
                <div class="avatar-sm float-left mr-2">
                    <img src="{{ Auth::user()->profile_photo_url }}" alt="..." class="avatar-img rounded-circle">
                </div>
                <div class="info">
                    <a data-toggle="collapse" href="#collapseExample" aria-expanded="true">
                        <span>
                            {{ Auth::user()->nombre }}
                            <span class="user-level">{{ Auth::user()->roles()->first()->display_name }}</span>
                            <span class="caret"></span>
                        </span>
                    </a>
                    <div class="clearfix"></div>
                    <div class="collapse in" id="collapseExample">
                        <ul class="nav">
                            <li>
                                <a href="#profile">
                                    <span class="link-collapse">My Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#edit">
                                    <span class="link-collapse">Editar Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="{{ route('user.configuracion') }}">
                                    <span class="link-collapse">Ajustes de usuario</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <ul class="nav nav-primary">

                @role(['admin', 'root'])
                    @include('layouts.siderbar.admin-sidebar')
                @endrole

                @include('layouts.siderbar.nav-section-compras')

                {{-- @include('layouts.siderbar.nav-section-2') --}}
            </ul>
        </div>
    </div>
</div>
<!-- End Sidebar -->
