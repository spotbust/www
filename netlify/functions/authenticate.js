// Netlify Function: Authenticate and return token
// Uses simple token generation without external dependencies

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

        // ============ GENERATE SIMPLE TOKEN ============
        // Format: timestamp.random.signature
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 15);
        const baseToken = `${timestamp}.${random}`;

        // Store token validity on this request (Netlify Functions are stateless)
        // In production, you'd use external storage (Redis, DynamoDB, etc.)
        const token = Buffer.from(baseToken).toString('base64');

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                token: token,
                message: 'Authentication successful',
                expiresIn: 86400 // 24 hours in seconds
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
