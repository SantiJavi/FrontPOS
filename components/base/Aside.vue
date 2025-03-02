<template>    
    <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl fixed-start h-100"
      id="sidenav-main">
      <div class="sidenav-header">
        <i class="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true" id="iconSidenav"
          @click="$event=>hiddenSideNav()"></i>
        <nuxtLink to="/" class="navbar-brand m-0">
          <button type="button" class="ms-1 font-weight-bold btn btn-info">Sistema de Facturación</button>
        </nuxtLink>
      </div>
      <hr class="horizontal dark mt-0">
      <div class="collapse navbar-collapse  w-auto h-auto" id="sidenav-collapse-main">
        <ul class="navbar-nav">
          <li class="nav-item mt-3">
            <h6 class="ps-4  ms-2 text-uppercase text-xs font-weight-bolder opacity-6">
              ADMINISTRACION
            </h6>
          </li>
          <li class="nav-item">
            <a data-bs-toggle="collapse" href="#comprobantes" class="nav-link " aria-controls="comprobantes"
              role="button" aria-expanded="false">
              <div
                class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>office</title>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                      <g transform="translate(1716.000000, 291.000000)">
                        <g id="office" transform="translate(153.000000, 2.000000)">
                          <path class="color-background"
                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                            opacity="0.6"></path>
                          <path class="color-background"
                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                          </path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span class="nav-link-text ms-1">Emitir Comprobantes </span>              
            </a>
            <div class="collapse " id="comprobantes">
              <ul class="nav ms-4 ps-3">
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/factura/facturas">
                    <span class="sidenav-mini-icon"> G </span>
                    <span class="sidenav-normal">Generar Factura</span>
                  </nuxtLink>
                </li>
              </ul>
              <ul class="nav ms-4 ps-3">
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/retencion/generarRetencion">
                    <span class="sidenav-mini-icon"> G </span>
                    <span class="sidenav-normal">Generar Retención</span>
                  </nuxtLink>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-bs-toggle="collapse" href="#listarComprobantes" class="nav-link " aria-controls="listarComprobantes"
              role="button" aria-expanded="false">
              <div
                class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>office</title>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                      <g transform="translate(1716.000000, 291.000000)">
                        <g id="office" transform="translate(153.000000, 2.000000)">
                          <path class="color-background"
                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                            opacity="0.6"></path>
                          <path class="color-background"
                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                          </path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span class="nav-link-text ms-1">Consultar Comprobantes</span>              
            </a>
            <div class="collapse " id="listarComprobantes">
              <ul class="nav ms-4 ps-3">
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/factura/listaFacturas">
                    <span class="sidenav-mini-icon"> F </span>
                    <span class="sidenav-normal">Facturas Emitidas Autorizadas</span>
                  </nuxtLink>
                </li>
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/retencion/listaRetenciones">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal">Comp. Retención Autorizados</span>
                  </nuxtLink>
                </li>
                <!--li class="nav-item ">
                  <nuxtLink class="nav-link " to="/factura/facturas">
                    <span class="sidenav-mini-icon"> A </span>
                    <span class="sidenav-normal">Anulación de Comprobantes</span>
                  </nuxtLink>
                </li-->
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-bs-toggle="collapse" href="#agregar" class="nav-link " aria-controls="agregar"
              role="button" aria-expanded="false">
              <div
                class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>office</title>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                      <g transform="translate(1716.000000, 291.000000)">
                        <g id="office" transform="translate(153.000000, 2.000000)">
                          <path class="color-background"
                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                            opacity="0.6"></path>
                          <path class="color-background"
                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                          </path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span class="nav-link-text ms-1">Agregar</span>              
            </a>
            <div class="collapse " id="agregar">
              <ul class="nav ms-4 ps-3">
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/Sellers/vendedores">
                    <span class="sidenav-mini-icon"> P </span>
                    <span class="sidenav-normal"> Provedores </span>
                  </nuxtLink>
                </li>     
              </ul>
            </div>
            <div class="collapse " id="agregar">
              <ul class="nav ms-4 ps-3">
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/cliente/clientes">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal"> Clientes </span>
                  </nuxtLink>
                </li>     
              </ul>
            </div>
            <div class="collapse " id="agregar">
              <ul class="nav ms-4 ps-3">
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/producto/productos">
                    <span class="sidenav-mini-icon"> P </span>
                    <span class="sidenav-normal"> Productos </span>
                  </nuxtLink>
                </li>     
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a data-bs-toggle="collapse" href="#pagesExamples" class="nav-link " aria-controls="pagesExamples"
              role="button" aria-expanded="false">
              <div
                class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>office</title>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                      <g transform="translate(1716.000000, 291.000000)">
                        <g id="office" transform="translate(153.000000, 2.000000)">
                          <path class="color-background"
                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                            opacity="0.6"></path>
                          <path class="color-background"
                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                          </path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span class="nav-link-text ms-1">Configuracion</span>              
            </a>
            <div class="collapse " id="pagesExamples">
              <ul class="nav ms-4 ps-3">
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/password/passwords">
                    <span class="sidenav-mini-icon"> C </span>
                    <span class="sidenav-normal"> Cambiar Contraseña </span>
                  </nuxtLink>
                </li>
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/usuarios/usuarios">
                    <span class="sidenav-mini-icon"> A </span>
                    <span class="sidenav-normal"> Administrador Usuarios </span>
                  </nuxtLink>
                </li>
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/emisores/dataEmisores">
                    <span class="sidenav-mini-icon"> R</span>
                    <span class="sidenav-normal"> Registrar Datos Emisor </span>
                  </nuxtLink>
                </li>
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/secuencia/secuenciales">
                    <span class="sidenav-mini-icon">C</span>
                    <span class="sidenav-normal"> Configurar Secuencial </span>
                  </nuxtLink>
                </li>
                <li class="nav-item ">
                  <nuxtLink class="nav-link " to="/firma/usuariosRegistrado">
                    <span class="sidenav-mini-icon">S</span>
                    <span class="sidenav-normal"> Subir Firma Electrónica </span>
                  </nuxtLink>
                </li>
              </ul>
            </div>
          </li>
          <li class="nav-item">
            <a href="https://apifacturacion.connieconito.com/APIFacturacionNuevo/apifacturacion/resources/views/manuales/ManualSistemaFacturacion_Usuario.pdf" class="nav-link " aria-controls="pagesExamples"
              role="button" aria-expanded="false" target="_blank">
              <div
                class="icon icon-shape icon-sm shadow border-radius-md bg-white text-center d-flex align-items-center justify-content-center  me-2">
                <svg width="12px" height="12px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink">
                  <title>office</title>
                  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g transform="translate(-1869.000000, -293.000000)" fill="#FFFFFF" fill-rule="nonzero">
                      <g transform="translate(1716.000000, 291.000000)">
                        <g id="office" transform="translate(153.000000, 2.000000)">
                          <path class="color-background"
                            d="M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z"
                            opacity="0.6"></path>
                          <path class="color-background"
                            d="M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z">
                          </path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <span class="nav-link-text ms-1">Manual de Usuario </span>              
            </a>  
          </li>          
        </ul>
      </div>

    </aside>    
</template>
<script>
export default{
  methods:{
    hiddenSideNav(){
        let side=document.getElementById('sidenav-main');
        side.classList.contains("d-none")?document.getElementById('sidenav-main').classList.remove("d-none"):side.classList.add('d-none');
      }
  }
}
</script>