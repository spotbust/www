// Netlify Function: Save Gig to GitHub
// This function runs securely on Netlify's servers
// The GitHub token is stored as an environment variable and never exposed to the client

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
        const { password, gigs } = body;

        // ============ PASSWORD CHECK ============
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'spotbust123';
        if (password !== ADMIN_PASSWORD) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid password' })
            };
        }

        // ============ GET GITHUB TOKEN FROM ENV ============
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        if (!GITHUB_TOKEN) {
            console.error('GITHUB_TOKEN not set in environment variables');
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Server misconfiguration: Missing GitHub token' })
            };
        }

        const GITHUB_OWNER = 'spotbust';
        const GITHUB_REPO = 'spotbust';
        const GITHUB_BRANCH = 'main';

        // ============ FETCH CURRENT FILE SHA ============
        const fileUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/gigs.json`;
        const getResponse = await fetch(fileUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3.json'
            }
        });

        if (!getResponse.ok) {
            console.error('Failed to fetch file SHA:', await getResponse.text());
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Could not fetch current gigs.json from GitHub' })
            };
        }

        const fileData = await getResponse.json();
        const currentSha = fileData.sha;

        // ============ ENCODE NEW CONTENT ============
        // Ensure gigs are sorted by date
        const sortedGigs = gigs.sort((a, b) => new Date(a.datum) - new Date(b.datum));
        const newContent = JSON.stringify(sortedGigs, null, 2);
        const encodedContent = Buffer.from(newContent).toString('base64');

        // ============ COMMIT TO GITHUB ============
        const timestamp = new Date().toLocaleString('de-DE');
        const putResponse = await fetch(fileUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3.json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update gigs via Admin CMS [${timestamp}]`,
                content: encodedContent,
                sha: currentSha,
                committer: {
                    name: 'Spotbust Admin CMS',
                    email: 'admin@spotbust.de'
                }
            })
        });

        if (!putResponse.ok) {
            const errorData = await putResponse.json();
            console.error('GitHub API error:', errorData);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: `GitHub error: ${errorData.message || putResponse.statusText}` })
            };
        }

        const result = await putResponse.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: 'Gigs saved successfully to GitHub',
                commit: result.commit.sha
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
