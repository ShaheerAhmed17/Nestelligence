# Nestelligence

**Nestelligence** is a modern real estate platform designed to help users find their dream homes with ease. It features a responsive design, a comprehensive property listing system, and an AI-powered chatbot assistant capable of answering questions about the website and available properties.

## Features

-   **Property Listings**: Browse a curated list of properties with details on price, location, and features.
-   **AI Assistant**: A smart chatbot powered by the Hugging Face Inference API (Llama-3/Mistral) that acts as a virtual real estate agent. It has context about the company and can recommend properties.
-   **Responsive Design**: Built with a mobile-first approach, ensuring a seamless experience across all devices.
-   **Contact Integration**: Easy-to-use contact form and direct contact information.
-   **Modern UI**: Sleek interface built with Shadcn UI and Tailwind CSS.

## Tech Stack

This project is built using the following technologies:

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components**: [Shadcn UI](https://ui.shadcn.com/)
-   **AI/ML**: [Hugging Face Inference SDK](https://huggingface.co/docs/huggingface.js/inference/README) (Vector Embeddings & Chat Completion)
-   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/yourusername/nestelligence.git
    cd nestelligence
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3.  Set up environment variables:
    Create a `.env` file in the root directory and add your Hugging Face API key:
    ```env
    HUGGINGFACE_API_KEY=your_api_key_here
    ```

4.  Run the development server:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/`: Next.js App Router pages and API routes.
-   `src/components/`: Reusable UI components (including the global `ChatBot`).
-   `src/lib/`: Utility functions and vector search logic.
-   `src/data/`: Static data for properties.

## License

This project is open source and available under the [MIT License](LICENSE).
