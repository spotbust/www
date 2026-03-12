// Netlify Function: Authenticate and return JWT token
// The actual password is stored securely as an environment variable

const jwt = require('jsonwebtoken');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = JSON.parse(event.body);
        const { password } = body;

        // ============ PASSWORD CHECK ============
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (!ADMIN_PASSWORD) {
            console.error('ADMIN_PASSWORD not set in environment variables');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server misconfiguration' })
            };
        }

        if (!password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Password required' })
            };
        }

        if (password !== ADMIN_PASSWORD) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid password' })
            };
        }

        // ============ GENERATE JWT TOKEN ============
        // Token valid for 24 hours
        const JWT_SECRET = process.env.JWT_SECRET || 'spotbust-secret-key-change-me';
        const token = jwt.sign(
            { authenticated: true, timestamp: Date.now() },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                token: token,
                message: 'Authentication successful'
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal server error' })
        };
    }
};
