# Course Learning Management System (LMS)

This is a Next.js and Typescript based Learning Management System (LMS) built with the following features:

- Course creation and management
- Chapter creation and management
- Video player with progress tracking
- User authentication and authorization
- Course enrollment and progress tracking
- And more...

## Getting Started

To get started with the CourseLMS, follow these steps:

1. Clone the repository: `git clone [https://github.com/mrcoded/courselms.git](https://github.com/mrcoded/courselms.git)`
2. Install dependencies: `npm install` or `yarn install`
3. Create a `.env` file in the root directory and add the following environment variables:

# Database (PostgreSQL)

DATABASE_URL="postgresql://user:password@localhost:5432/courselms"

# Authentication (BetterAuth)

BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-secret-key"

# Storage (UploadThing)

UPLOADTHING*SECRET="sk_live*..."
UPLOADTHING_APP_ID="your-app-id"

# Video Player (Mux)

MUX_TOKEN_ID="MUX_TOKEN_ID"
MUX_TOKEN_SECRET="MUX_TOKEN_SECRET"

# Payments (Stripe)

STRIPE_SECRET_KEY="sk_test*..."
STRIPE_PUBLISHABLE_KEY="pk_test*..."
STRIPE_WEBHOOK_SECRET="whsec\*..."

4. Run the development server: `npm run dev` or `yarn dev`
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Course creation and management**: Create and manage courses with chapters, videos, and attachments.
- **Chapter creation and management**: Create and manage chapters within a course.
- **Video player with progress tracking**: Play videos with progress tracking and completion status.
- **User authentication and authorization**: Sign up, log in, and manage user accounts.
- **Course enrollment and progress tracking**: Enroll in courses and track progress.
- **And more...**: Explore all the features of the LMS.

## Usage

Here are some tips for using the LMS:

- To create a new course, navigate to the "Courses" page and click on the "Create Course" button.
- To add a new chapter to a course, navigate to the course's details page and click on the "Add Chapter" button.
- To play a video, navigate to the chapter's page and click on the video player.
- To enroll in a course, navigate to the course's details page and click on the "Enroll" button.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
