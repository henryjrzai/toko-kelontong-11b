import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

export async function login(username, password) {
    console.log('Attempting to login with username:', username);

    try {
        // Query untuk mencari user berdasarkan username saja (password akan di-check setelahnya)
        const result = await sql`
            SELECT id, username, email, password, role 
            FROM users 
            WHERE username = ${username}
        `;
        
        if (result.length > 0) {
            const user = result[0];

            if (user.password === password) {
                const { password: _, ...userWithoutPassword } = user;
                return userWithoutPassword;
            } else {
                return null;
            }
        } else {
            return null;
        }
    } catch (error) {
        console.error('Login error:', error);
        throw new Error('Database connection error');
    }
}

// Fungsi untuk registrasi user (opsional)
export async function register(userData) {
    const { username, email, password, name } = userData;
    
    try {
        // Check apakah username atau email sudah ada
        const existingUser = await sql`
            SELECT id FROM users 
            WHERE username = ${username} OR email = ${email}
        `;
        
        if (existingUser.length > 0) {
            throw new Error('Username or email already exists');
        }
        
        // Di production, hash password dengan bcrypt
        // const hashedPassword = await bcrypt.hash(password, 10);
        
        const result = await sql`
            INSERT INTO users (username, email, password, name, role)
            VALUES (${username}, ${email}, ${password}, ${name}, 'user')
            RETURNING id, username, email, name, role
        `;
        
        return result[0];
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}