
export default function loginWithCallback(callback) {
  window.loginSuccessful = callback;
  window.open(
    `${window.location.origin}/login/helsinki`,
    'tpLoginWindow',
    'location,scrollbars=on,width=720,height=600');
}
