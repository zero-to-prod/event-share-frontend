<span class="loader" />

<style>
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 1em;
    height: 1em;
  }
  .loader {
    margin: 0 auto;
    position: relative;
    border-top: 0.15em solid rgba(255, 255, 255, 0.2);
    border-right: 0.15em solid rgba(255, 255, 255, 0.2);
    border-bottom: 0.15em solid rgba(255, 255, 255, 0.2);
    border-left: 0.15em solid #ffffff;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: spin 1s infinite linear;
    animation: spin 1s infinite linear;
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
