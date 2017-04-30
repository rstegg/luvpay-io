export default function() {
  let mql = window.matchMedia('(max-width: 768px)');
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && mql.matches ) {
      return true;
  }
  return false;
}

export function isTablet() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
  }
  return false;
}
