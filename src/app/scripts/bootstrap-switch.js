import "../admin-lte/plugins/bootstrap-switch/js/bootstrap-switch";
import $ from "../admin-lte/plugins/jquery/jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;

export const bootstrapswitch = $(function () {
  $("input[data-bootstrap-switch]").each(function () {
    $(this).bootstrapSwitch("state", $(this).prop("checked"));
  });
});
