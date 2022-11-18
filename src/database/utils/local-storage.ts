export default function saveTokenInLocalStorage(token: string): void {
  localStorage.setItem('token', token);
}
