# Art & Photography Gallery 🎨📸

[Live Project](https://art-and-photography-gallery.vercel.app/)

A full-stack platform where artists and users can showcase, manage, and sell their creative work. Includes secure authentication, dynamic user profiles, product uploads, commenting, order management, and sales tracking.

---

## 🔧 Tech Stack

- **Frontend:** Next.js 14, TypeScript, Redux Toolkit, shadcn/ui
- **Backend:** Next.js API Routes, Prisma ORM, PostgreSQL (via Supabase)
- **Storage:** Supabase Storage, Uploadthing
- **Auth:** Custom email/password authentication built with NextAuth.js Credentials Provider, secured via JWT-based session cookies and Prisma Adapter.
- **Deployment:** Vercel

---

## 🚀 Key Features

### 🔐 User Authentication

- Users can sign up using a valid, unique email address.
- Requires name, email, password, and contact number.
- Secure login with encrypted password and session handling.
- Admin can inactivate users to prevent login and usage.

### 👤 Profile Management

- Dynamic profile with personal info, uploaded products, orders, and sales.
- Users can update name, contact, email, profile picture, social links, etc.
- View and manage all owned products and activity from one place.

### 🎨 Product Management

- Upload art/photography products with image and metadata.
- Admin approves uploaded products before they appear in the gallery.
- Users can edit and manage their own products.
- Users can comment on both their own and others' products.

### 📦 Order Management

- View all orders placed by the user.
- Print/download invoices of each order.
- Check live order status from the dashboard.

### 💸 Sale Management

- Track sales made by the user (if they're a seller/artist).
- Search and filter sales data by date.
- Download sales reports for record-keeping.

---

## 🛡️ Security Features

- Unique email and username validation.
- Secure authentication via bcrypt and JWT cookie sessions.
- Inactive users are blocked from login and platform access.
- Only verified users can view and update their profile or products.

---

## 📦 Installation

```bash
git clone https://github.com/MaherunEla/art_and_photography_gallery.git
cd art_and_photography_gallery
npm install
```

### 🧪 Environment Variables

Create a .env.local file and add:

```env

NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

DATABASE_URL=postgresql://user:pass@localhost:5432/authflow
DIRECT_URL=

UPLOADTHING_SECRET=your_uploading_secret
UPLOADTHING_APP_ID=your_uploading_app_id
PRISMA_CLIENT_ENGINE_TYPE=library

```

### 🧱 Prisma Setup

```bash
npx prisma db push
npx prisma generate

```

### ▶️ Running Locally

npm run dev

```

### 🧪 Testing

 You can test APIs using tools like:

-Postman

-Thunder Client

-insomnia

-fetch/axios in your browser dev tools or internal routes


### 🌍 Deployment (Vercel)

✅ This project is ready for Vercel.

1.Push to GitHub

2.Go to vercel.com

3.Import your repo → Set environment variables

4.Click Deploy

```

## 📷 Screenshots

![Hero](public/assets/images/Hero.jpg)
![Features](public/assets/images/features.jpg)
![Gallery](public/assets/images/Gallery.jpg)
![ProductDetails](public/assets/images/productdetails.jpg)
![Cart](public/assets/images/cart.jpg)

## 🙋‍♂️ Author

**Maherun Nessa Ela**
📧 meherunela2002@gmail.com
🌍[LinkedIn](www.linkedin.com/in/maherun-nessa-ela)

---

```

```
