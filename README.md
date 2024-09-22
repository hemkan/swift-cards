# Swift-Cards

Swift-Cards is an AI-powered flashcard creation tool designed to simplify note-taking and studying. With an intuitive interface and seamless integration of AI, Swift-Cards turns your notes into easy-to-review flashcards. As we continue to enhance the platform, we aim to provide an efficient and user-friendly experience for learning and study management.

[Live Demo](https://swift-cards.vercel.app/)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-3B82F6?style=for-the-badge&logo=clerk&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=for-the-badge&logo=stripe&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-007ACC?style=for-the-badge&logo=data:image/svg+xml;base64,YOUR_BASE64_ENCODED_LOGO)
![Llama 3.1-8B](https://img.shields.io/badge/Llama%203.1--8B-AI%20Model-brightgreen?style=for-the-badge)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)

## Key Features

- **AI-Generated Flashcards**: Easily create flashcards from your notes using AI. Swift-Cards simplifies complex information into concise, digestible flashcards to streamline studying.
- **Account Management and Authentication**: Integrated with Clerk for secure user authentication and account management, ensuring a smooth and safe user experience.
- **Mock Payment Plans**: Learn more about Stripe’s API through mock payment plan implementations. Currently, all payment plans are simulated for educational purposes.

## Important Notice

Swift-Cards is currently utilizing Firebase's test environment for authentication and data management. If there's enough interest and support from users, we may scale the platform and enhance its functionality in the future. Please share your feedback with us!

## Future Plans

- **RAG Integration**: We're working on integrating Retrieval-Augmented Generation (RAG) to improve the relevance of flashcard content based on user queries. The integration is in progress, and we hope to release it soon.
- **API and Flashcard Generation Improvements**: We are addressing issues with flashcard generation and API conflicts, particularly with the system prompt. Your feedback will help us improve these features.

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/swift-cards.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd swift-cards
   ```

3. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Create a `.env.local` file in the root directory with the necessary environment variables:**

   ```env
   NEXT_PUBLIC_API_URL=https://api.example.com
   NEXT_PUBLIC_API_KEY=your_api_key
   ```

5. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

   - You should see the Swift-Cards interface, where you can start generating flashcards.
   - Try creating flashcards by inputting a topic, such as "World History" or "JavaScript basics."

## Learn More

To learn more about Swift-Cards and the technologies used, check out the following resources:

- [Clerk Documentation](https://clerk.dev/docs) - Learn more about user authentication and account management with Clerk.
- [Stripe Documentation](https://stripe.com/docs) - Explore Stripe's payment platform and API for processing transactions.
- [Next.js Documentation](https://nextjs.org/docs) - Get familiar with Next.js features and APIs for building fast web applications.
- [Firebase Documentation](https://firebase.google.com/docs) - Read about Firebase's real-time database, authentication, and other backend services.
- [Vercel Deployment Documentation](https://vercel.com/docs) - Find out how to deploy your Next.js apps with Vercel.
