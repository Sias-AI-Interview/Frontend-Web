export async function apiLogin({ email, password }) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'rama@example.com' && password === '123456') {
                resolve({ user: { name: 'Rama', email }, token: 'abc123token' });
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 1000);
    });
}

export async function apiGetUser(_token) {
    if (_token) console.log("Token Valid");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: 'Rama', email: 'rama@example.com' });
        }, 500);
    });
}

