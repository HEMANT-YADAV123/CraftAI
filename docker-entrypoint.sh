#!/bin/bash
# =============================================================================
# CraftAI - Docker Entrypoint Script
# Handles runtime environment variable injection for Vite apps
# =============================================================================

set -e

echo "🚀 Starting CraftAI application..."

# Define the directory where built files are located
HTML_DIR="/usr/share/nginx/html"

echo "📦 Creating runtime configuration file..."

# Validate required environment variables
echo "🔍 Validating environment variables..."
MISSING_VARS=0

if [ -z "${VITE_BOLNA_API_KEY}" ]; then
    echo "   ❌ ERROR: VITE_BOLNA_API_KEY is not set"
    MISSING_VARS=1
fi

if [ -z "${VITE_BOLNA_AGENT_PRIYA}" ]; then
    echo "   ❌ ERROR: VITE_BOLNA_AGENT_PRIYA is not set"
    MISSING_VARS=1
fi

if [ -z "${VITE_BOLNA_AGENT_TRIPTI}" ]; then
    echo "   ❌ ERROR: VITE_BOLNA_AGENT_TRIPTI is not set"
    MISSING_VARS=1
fi

if [ -z "${VITE_BOLNA_AGENT_ARUN}" ]; then
    echo "   ❌ ERROR: VITE_BOLNA_AGENT_ARUN is not set"
    MISSING_VARS=1
fi

# EmailJS variables (optional - warn but don't fail)
EMAILJS_MISSING=0
if [ -z "${VITE_EMAILJS_SERVICE_ID}" ]; then
    echo "   ⚠️  WARNING: VITE_EMAILJS_SERVICE_ID is not set"
    EMAILJS_MISSING=1
fi

if [ -z "${VITE_EMAILJS_TEMPLATE_ID}" ]; then
    echo "   ⚠️  WARNING: VITE_EMAILJS_TEMPLATE_ID is not set"
    EMAILJS_MISSING=1
fi

if [ -z "${VITE_EMAILJS_PUBLIC_KEY}" ]; then
    echo "   ⚠️  WARNING: VITE_EMAILJS_PUBLIC_KEY is not set"
    EMAILJS_MISSING=1
fi

if [ $EMAILJS_MISSING -eq 1 ]; then
    echo "   ⚠️  Contact form will not work without EmailJS configuration"
fi

if [ $MISSING_VARS -eq 1 ]; then
    echo ""
    echo "💡 Solution: Pass environment variables to Docker:"
    echo ""
    echo "   Using docker-compose:"
    echo "   docker-compose --env-file .env up craftai-prod"
    echo ""
    echo "   Using docker run:"
    echo "   docker run -p 8080:80 \\"
    echo "     -e VITE_BOLNA_API_KEY=your_key \\"
    echo "     -e VITE_BOLNA_AGENT_PRIYA=priya_id \\"
    echo "     -e VITE_BOLNA_AGENT_TRIPTI=tripti_id \\"
    echo "     -e VITE_BOLNA_AGENT_ARUN=arun_id \\"
    echo "     -e VITE_EMAILJS_SERVICE_ID=your_service_id \\"
    echo "     -e VITE_EMAILJS_TEMPLATE_ID=your_template_id \\"
    echo "     -e VITE_EMAILJS_PUBLIC_KEY=your_public_key \\"
    echo "     craftai:latest"
    echo ""
    exit 1
fi

echo "   ✅ All environment variables are set"
echo ""

# Inject environment variables directly into index.html
# Replace the placeholder script tag with actual environment variables
TEMP_FILE="${HTML_DIR}/index.html.tmp"

# Create the inline script content with proper escaping and null handling
ENV_SCRIPT="<script>window.__ENV__={VITE_BOLNA_API_KEY:\"${VITE_BOLNA_API_KEY:-}\",VITE_BOLNA_AGENT_PRIYA:\"${VITE_BOLNA_AGENT_PRIYA:-}\",VITE_BOLNA_AGENT_TRIPTI:\"${VITE_BOLNA_AGENT_TRIPTI:-}\",VITE_BOLNA_AGENT_ARUN:\"${VITE_BOLNA_AGENT_ARUN:-}\",VITE_EMAILJS_SERVICE_ID:\"${VITE_EMAILJS_SERVICE_ID:-}\",VITE_EMAILJS_TEMPLATE_ID:\"${VITE_EMAILJS_TEMPLATE_ID:-}\",VITE_EMAILJS_PUBLIC_KEY:\"${VITE_EMAILJS_PUBLIC_KEY:-}\",VITE_BOLNA_FROM_PHONE:\"${VITE_BOLNA_FROM_PHONE:-}\"}</script>"

# Replace the config.js script tag with inline script
sed "s|<script src=\"/config.js\"></script>|${ENV_SCRIPT}|g" "${HTML_DIR}/index.html" > "${TEMP_FILE}"

# Replace the original file
mv "${TEMP_FILE}" "${HTML_DIR}/index.html"
chown nginx:nginx "${HTML_DIR}/index.html"
chmod 644 "${HTML_DIR}/index.html"

if grep -q "window.__ENV__" "${HTML_DIR}/index.html"; then
    echo "   ✅ Runtime environment variables injected into index.html successfully"
    echo ""
    echo "   📋 Injected Environment Variables:"
    echo "   ✓ VITE_BOLNA_API_KEY: ${VITE_BOLNA_API_KEY:0:15}... (masked)"
    echo "   ✓ VITE_BOLNA_AGENT_PRIYA: ${VITE_BOLNA_AGENT_PRIYA}"
    echo "   ✓ VITE_BOLNA_AGENT_TRIPTI: ${VITE_BOLNA_AGENT_TRIPTI}"
    echo "   ✓ VITE_BOLNA_AGENT_ARUN: ${VITE_BOLNA_AGENT_ARUN}"
    if [ -n "${VITE_EMAILJS_SERVICE_ID}" ]; then
        echo "   ✓ VITE_EMAILJS_SERVICE_ID: ${VITE_EMAILJS_SERVICE_ID}"
        echo "   ✓ VITE_EMAILJS_TEMPLATE_ID: ${VITE_EMAILJS_TEMPLATE_ID}"
        echo "   ✓ VITE_EMAILJS_PUBLIC_KEY: ${VITE_EMAILJS_PUBLIC_KEY:0:10}... (masked)"
    else
        echo "   ✗ EmailJS variables not set (contact form disabled)"
    fi
else
    echo "   ❌ Failed to inject environment variables into index.html"
    echo "   Debug: Checking index.html content..."
    head -n 30 "${HTML_DIR}/index.html"
    exit 1
fi

# Print configuration summary
echo ""
echo "📋 Configuration Summary:"
echo "   - API Endpoint: Configured"
echo "   - Agent Count: 3 agents"
if [ -n "${VITE_EMAILJS_SERVICE_ID}" ]; then
    echo "   - Email Service: EmailJS Configured ✓"
else
    echo "   - Email Service: Not Configured (contact form disabled)"
fi
echo "   - Runtime config: /config.js"
echo ""

# Execute the main command (nginx)
echo "🌐 Starting Nginx server..."
exec "$@"
