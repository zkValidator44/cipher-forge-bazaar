# Vercel Deployment Guide for Cipher Forge Bazaar

## Step-by-Step Manual Deployment Instructions

### Prerequisites
- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

### Step 1: Prepare the Repository
1. Ensure all code is committed and pushed to GitHub
2. Verify the repository is accessible at: https://github.com/zkValidator44/cipher-forge-bazaar

### Step 2: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up using your GitHub account
3. Authorize Vercel to access your repositories

### Step 3: Import Project
1. In Vercel dashboard, click "New Project"
2. Select "Import Git Repository"
3. Find and select `zkValidator44/cipher-forge-bazaar`
4. Click "Import"

### Step 4: Configure Build Settings
1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Leave as default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 5: Set Environment Variables
In the Vercel dashboard, go to Settings > Environment Variables and add:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=your_rpc_url_here
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_INFURA_API_KEY=your_api_key_here
```

### Step 6: Deploy
1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your app will be available at the provided Vercel URL

### Step 7: Custom Domain (Optional)
1. Go to Settings > Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

### Step 8: Verify Deployment
1. Test wallet connection functionality
2. Verify all pages load correctly
3. Test responsive design on mobile devices
4. Check console for any errors

### Important Configuration Notes

#### Build Configuration
- **Node.js Version**: 18.x (automatically detected)
- **Build Timeout**: 60 seconds (default)
- **Function Timeout**: 10 seconds (default)

#### Environment Variables Priority
1. Production environment variables
2. Preview environment variables  
3. Development environment variables

#### Performance Optimization
- Enable Vercel Analytics (optional)
- Configure caching headers for static assets
- Use Vercel Edge Functions for API routes (if needed)

### Troubleshooting

#### Common Issues:
1. **Build Fails**: Check Node.js version compatibility
2. **Environment Variables Not Working**: Ensure they start with `NEXT_PUBLIC_`
3. **Wallet Connection Issues**: Verify RPC URLs are accessible
4. **Styling Issues**: Check Tailwind CSS build process

#### Debug Steps:
1. Check build logs in Vercel dashboard
2. Test locally with `npm run build && npm run preview`
3. Verify all dependencies are installed correctly
4. Check browser console for runtime errors

### Post-Deployment Checklist
- [ ] App loads without errors
- [ ] Wallet connection works
- [ ] All pages are accessible
- [ ] Mobile responsive design
- [ ] Environment variables are set
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics are working (if enabled)

### Maintenance
- Monitor deployment status in Vercel dashboard
- Set up automatic deployments from main branch
- Configure preview deployments for pull requests
- Monitor performance and error rates

### Support
For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Test locally first
4. Contact Vercel support if needed

### Cost Considerations
- **Free Tier**: 100GB bandwidth, 100GB storage
- **Pro Tier**: $20/month for unlimited bandwidth
- **Enterprise**: Custom pricing for large deployments

The free tier should be sufficient for initial deployment and testing.
