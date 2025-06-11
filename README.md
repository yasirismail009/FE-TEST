# Modern POSTS TEST Platform

A feature-rich POSTS platform built with Next.js 13+, React Query, and Tailwind CSS. This application provides a modern, responsive interface for creating, reading, updating, and deleting blog posts with rich text editing capabilities.

## 🚀 Features

- **Rich Text Editor**: Powered by TipTap, supporting:
  - Text formatting (bold, italic, underline, strikethrough)
  - Headings and lists
  - Text alignment
  - Links and images
  - Code blocks with syntax highlighting
  - Blockquotes

- **Modern UI/UX**:
  - Responsive design for all screen sizes
  - Dark/Light mode support
  - Smooth animations and transitions
  - Toast notifications for user feedback
  - Loading states and error handling

- **Data Management**:
  - React Query for efficient data fetching and caching
  - Optimistic updates for better user experience
  - Real-time data synchronization

- **Accessibility**:
  - ARIA labels and roles
  - Keyboard navigation support
  - Screen reader friendly
  - High contrast mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: 
  - Tailwind CSS
  - shadcn/ui (Component Library)
- **State Management**: React Query
- **UI Components**: 
  - shadcn/ui components
  - Radix UI primitives
  - Custom components with Tailwind
- **Rich Text Editor**: TipTap
- **Icons**: Lucide React
- **Theme Management**: next-themes
- **Notifications**: Sonner

## 📦 Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-name]
```

2. Install dependencies:
```bash
pnpm install
```

3. Install shadcn/ui components:
```bash
pnpm dlx shadcn-ui@latest init
```

4. Add required shadcn/ui components:
```bash
pnpm dlx shadcn-ui@latest add button
pnpm dlx shadcn-ui@latest add card
pnpm dlx shadcn-ui@latest add dialog
pnpm dlx shadcn-ui@latest add toast
pnpm dlx shadcn-ui@latest add theme-toggle
```

5. Create a `.env.local` file in the root directory and add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
```

6. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── posts/             # Blog posts routes
│   │   └── [id]/         # Dynamic post routes
│   └── layout.tsx        # Root layout
├── components/            # React components
│   ├── ui/              # shadcn/ui components
│   └── PostModal.tsx    # Post creation/editing modal
├── api/                  # API integration
│   └── posts.ts         # Post-related API functions
├── lib/                  # Utility functions
└── hooks/               # Custom React hooks
```

## 🎯 Usage

### Creating a New Post
1. Click the "New Post" button
2. Enter the post title
3. Use the rich text editor to write your content
4. Click "Create" to publish

### Editing a Post
1. Navigate to the post you want to edit
2. Click the "Edit" button
3. Modify the content using the rich text editor
4. Click "Save" to update

### Deleting a Post
1. Navigate to the post you want to delete
2. Click the "Delete" button
3. Confirm the deletion

## 🎨 Theme Customization

The application uses shadcn/ui's theming system with Tailwind CSS. The theme can be customized by:

1. Modifying the `tailwind.config.js` file
2. Updating the CSS variables in `globals.css`
3. Using the theme toggle component for light/dark mode

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Code Style

The project uses ESLint for code linting and follows the Next.js recommended configuration. Make sure to run `pnpm lint` before committing changes.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TipTap](https://tiptap.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [React Query](https://tanstack.com/query/latest)
