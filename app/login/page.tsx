export default function LoginPage() {
  return (
    <form action="">
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" placeholder="jhon.doe@example.com" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="*********" />
      </div>
    </form>
  );
}
