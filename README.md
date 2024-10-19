<h3 align="center"><img src="./public/reddium-mockup.png" width="600px" style="border-radius: 5px" alt="Whisperify"></h3>

> [!IMPORTANT]  
> This is a fork of the original [Reddium](https://github.com/eightants/reddium) project. Updates include a Docker image, improved configuration, and a few UI tweaks.

# Reddium

Reddium is a Medium-themed Reddit client. It provides a clean, distraction-free browsing experience for Reddit content.

## Features

- Clean, Medium-inspired interface for browsing Reddit
- View posts, comments, and subreddits
- Responsive design for desktop and mobile
- Dark mode support
- Image proxy for Reddit images

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/reddium.git
   ```

2. Navigate to the project directory:
   ```
   cd reddium
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

4. Create a `.env.local` file in the root directory and add your Reddit API credentials:
   ```
   REDDIUM_CLIENT_ID=your_client_id
   REDDIUM_CLIENT_SECRET=your_client_secret
   ```

5. Start the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Configuration

Reddium can be configured using the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `REDDIUM_DOMAIN` | The domain where Reddium is hosted | `http://localhost:3000` |
| `REDDIUM_CLIENT_ID` | Reddit API client ID | - |
| `REDDIUM_CLIENT_SECRET` | Reddit API client secret | - |
| `REDDIUM_DISABLE_GITHUB_LINK` | Disable the GitHub link in the UI | `false` |
| `REDDIUM_DISABLE_KOFI_LINK` | Disable the Ko-fi link in the UI | `false` |
| `REDDIUM_DISABLE_ABOUT` | Disable the About section in the UI | `false` |

## Docker

Reddium can be run as a Docker container. To run the latest version:

1. Pull the Docker image:
   ```
   docker pull ghcr.io/joestump/reddium:main
   ```

2. Run the container:
   ```
   docker run -p 3000:3000 -e REDDIUM_CLIENT_ID=your_client_id -e REDDIUM_CLIENT_SECRET=your_client_secret ghcr.io/joestump/reddium:main
   ```

Replace `your_client_id` and `your_client_secret` with your actual Reddit API credentials.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
