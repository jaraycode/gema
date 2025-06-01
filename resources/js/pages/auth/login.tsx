import { Head } from '@inertiajs/react';
import { LoginForm } from './LoginForm';
import { LoginImageSection } from './LoginImageSection';

function Login() {
    return (
        <main className="flex flex-col overflow-hidden bg-zinc-300">
            <Head title="Log in" />
            <div className="flex max-md:flex-col">
                <LoginImageSection />
                <LoginForm />
            </div>
        </main>
    );
}

export default Login;
