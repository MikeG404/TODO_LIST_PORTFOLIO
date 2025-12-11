export default function SignUpPage() {

    return (
        <form action="">
            <div>
                <label htmlFor="username">Username:</label>
                <input type="text" name="username" placeholder="JD404"/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" placeholder="jhon.doe@example.com"/>
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" placeholder="*********" />
            </div>
        </form>
    );
}