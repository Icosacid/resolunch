function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    return (msie > 0 || !!ua.match(/Trident.*rv\:11\./));
}
function isIEorEdge() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var edge = ua.indexOf('Edge/');

    return (msie > 0 || !!ua.match(/Trident.*rv\:11\./) || edge > 0);
}
