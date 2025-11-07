import fs from 'fs';
import path from 'path';

const userPath = path.resolve(__dirname, '../tmp/test-user.json');

export const saveTestUser = (email: string, password: string) => {
    fs.mkdirSync(path.dirname(userPath), { recursive: true });
    fs.writeFileSync(userPath, JSON.stringify({ email, password }));
};

export const getTestUser = (): { email: string; password: string } => {
    if (!fs.existsSync(userPath)) {
        throw new Error(
            `❌ test-user.json not found. Did you run 'auth-flow.spec.ts' first?`
        );
    }
    const raw = fs.readFileSync(userPath, 'utf-8');
    return JSON.parse(raw);
};
