# Yim Sivatey - Portfolio Website

Full-stack personal portfolio built for the Web Development final project.

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express (REST API)
- **Database:** MongoDB (Atlas)
- **Deployment target:** AWS

The site introduces me, lists my skills, showcases my projects (stored in
MongoDB and served through my own REST API, with full CRUD), shows my
education/experience, and includes a working contact form that saves
messages to the database.

---

## 1. Project structure

```
sivatey-portfolio/
├── backend/              Express REST API
│   ├── config/           DB connection, admin-key middleware, seed script
│   ├── models/           Mongoose schemas (Project, Contact)
│   ├── routes/           /api/projects and /api/contact routes
│   ├── server.js         App entry point
│   └── .env.example      Environment variable template (copy to .env)
├── frontend/             React app (Vite)
│   ├── src/components/   Navbar, Hero, About, Skills, Projects, etc.
│   ├── src/api.js        All fetch() calls to the backend
│   └── .env.example      Environment variable template (copy to .env)
└── README.md
```

## 2. API endpoints

| Method | Route               | Purpose                        | Auth        |
|--------|----------------------|---------------------------------|-------------|
| GET    | /api/projects         | List all projects              | Public      |
| GET    | /api/projects/:id     | Get one project                | Public      |
| POST   | /api/projects         | Create a project                | Admin key   |
| PUT    | /api/projects/:id     | Update a project                | Admin key   |
| DELETE | /api/projects/:id     | Delete a project                | Admin key   |
| POST   | /api/contact           | Submit contact form            | Public      |
| GET    | /api/contact           | View submitted messages        | Admin key   |

"Admin key" routes require a request header `x-admin-key: <your ADMIN_KEY>`.
The frontend Projects section has a small "unlock" field for this — enter
your admin key there to reveal Add / Edit / Delete controls in the browser.
This is a lightweight scheme appropriate for a course project, not a
replacement for real authentication in a production app.

## 3. Running locally

### Backend
```bash
cd backend
cp .env.example .env      # then fill in MONGO_URI and ADMIN_KEY
npm install
npm run seed               # loads the 3 starter projects into MongoDB
npm run dev                # starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env       # VITE_API_URL=http://localhost:5000
npm install
npm run dev                # starts on http://localhost:5173
```

Open http://localhost:5173 — the Projects section should load the three
seeded projects from your MongoDB database.

---

## 4. Setting up MongoDB Atlas (free tier)

1. Go to https://www.mongodb.com/cloud/atlas/register and create a free account.
2. Create a new **free M0 cluster** (any cloud provider/region is fine).
3. Under **Database Access**, create a database user with a username and
   password (save these — you'll need them for the connection string).
4. Under **Network Access**, add an IP address entry. For this course
   project the simplest option is **Allow access from anywhere**
   (`0.0.0.0/0`), since your backend will run on a changing AWS IP.
5. Click **Connect** on your cluster → **Drivers** → copy the connection
   string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
6. Paste it into `backend/.env` as `MONGO_URI`, adding a database name
   before the `?`, e.g. `.../portfolio?retryWrites=true...`.
7. Run `npm run seed` from the `backend` folder once to populate it.

## 5. Deploying to AWS

You need two things live: the **backend API** and the **frontend site**.
Below is the simplest path for a course deadline.

### 5a. Backend on AWS Elastic Beanstalk (recommended for simplicity)

1. Create an AWS account at https://aws.amazon.com (free tier eligible).
2. Install the EB CLI: `pip install awsebcli --user`.
3. From the `backend` folder:
   ```bash
   eb init -p node.js-18 portfolio-backend --region <your-region>
   eb create portfolio-backend-env
   ```
4. Set your environment variables (never commit them):
   ```bash
   eb setenv MONGO_URI="<your Atlas URI>" ADMIN_KEY="<your admin key>" CLIENT_ORIGIN="<your frontend URL>"
   ```
5. `eb deploy` — EB will give you a public URL like
   `http://portfolio-backend-env.eba-xxxx.us-east-1.elasticbeanstalk.com`.
6. Test it: visit `<that URL>/api/health` — you should see `{"status":"ok"}`.

**Alternative:** if EB feels heavy for a course deadline, Render or Railway
also work and are free for small Node APIs — the code doesn't change, only
where it's hosted. Check with your instructor if a non-AWS host is
acceptable, since the assignment specifies AWS.

### 5b. Frontend on AWS Amplify (recommended for simplicity)

1. Push your code to GitHub first (see section 6).
2. In the AWS Console, go to **AWS Amplify** → **New app** → **Host web app**.
3. Connect your GitHub repository and select the `frontend` folder as the
   app root (Amplify supports monorepo subfolders — set "App root" to
   `frontend` in the build settings).
4. Set the build settings (Amplify usually detects Vite automatically):
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
   ```
5. Add an environment variable in Amplify: `VITE_API_URL` = your Elastic
   Beanstalk backend URL from step 5a.
6. Deploy. Amplify gives you a public URL like
   `https://main.xxxxxxxxxx.amplifyapp.com`.
7. Go back to your backend's `CLIENT_ORIGIN` env var and update it to this
   Amplify URL, then redeploy the backend so CORS allows it.

### 5c. Alternative: S3 + CloudFront

If you'd rather use raw S3 instead of Amplify: run `npm run build` in
`frontend`, upload the contents of `frontend/dist` to an S3 bucket
configured for static website hosting, and optionally put a CloudFront
distribution in front of it for HTTPS. Amplify is simpler for a course
deadline since it handles the build and HTTPS certificate for you.

---

## 6. Pushing to GitHub

```bash
cd sivatey-portfolio
git init
git add .
git commit -m "Initial commit: portfolio frontend and backend"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

**Before pushing, double-check:** `backend/.env` and `frontend/.env` are
listed in their `.gitignore` files and are NOT staged. Run
`git status` and confirm you only see `.env.example`, never `.env`.

## 7. Security checklist before submission

- [ ] `.env` files are in `.gitignore` and were never committed
- [ ] No MongoDB password, admin key, or AWS credentials appear anywhere
      in the committed source code
- [ ] `ADMIN_KEY` used in production is different from any example value
- [ ] MongoDB Atlas database user has a strong, unique password
- [ ] Live site loads over the public internet (test in an incognito
      window, not just on your own machine)

## 8. Notes for the presentation

Be ready to explain:
- How `frontend/src/api.js` calls the Express routes, and how `VITE_API_URL`
  switches between local and deployed backends
- How `requireAdmin.js` protects the write routes with the `x-admin-key`
  header
- The Mongoose schemas in `backend/models/` and why fields like `techStack`
  are arrays
- The AWS services used (Elastic Beanstalk for the API, Amplify for the
  static frontend) and why the split exists (API needs a running Node
  process; the frontend is just static files after `vite build`)
