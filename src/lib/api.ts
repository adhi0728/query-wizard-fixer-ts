
// Mock blog post data
const blogPosts = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    excerpt: "Learn the basics of using TypeScript with React to build type-safe applications.",
    content: `
      <p>TypeScript has become increasingly popular in the React ecosystem, offering developers the ability to catch errors during development rather than at runtime.</p>
      
      <h2>Why TypeScript with React?</h2>
      <p>Using TypeScript with React brings several advantages:</p>
      <ul>
        <li>Improved code quality through static type checking</li>
        <li>Better IDE support with intelligent code completion</li>
        <li>Safer refactoring</li>
        <li>Self-documenting code</li>
      </ul>
      
      <h2>Setting Up a React TypeScript Project</h2>
      <p>The easiest way to start is using Create React App with the TypeScript template:</p>
      <pre><code>npx create-react-app my-app --template typescript</code></pre>
      
      <h2>Writing Your First Component</h2>
      <p>Here's a simple example of a typed React component:</p>
      <pre><code>
interface GreetingProps {
  name: string;
  count?: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, count = 1 }) => {
  return (
    <div>
      {Array(count).fill("").map((_, i) => (
        <p key={i}>Hello, {name}!</p>
      ))}
    </div>
  );
};
      </code></pre>
      
      <p>This is just the beginning of your TypeScript and React journey. As you progress, you'll discover more advanced patterns and techniques to make your code even more robust.</p>
    `,
    featured_image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author_id: "1",
    author: {
      id: "1",
      full_name: "Jane Doe",
      avatar_url: "https://i.pravatar.cc/150?img=1"
    },
    category: "Development",
    tags: ["React", "TypeScript", "Web Development"],
    status: "published",
    published_at: "2023-05-15T10:00:00Z",
    created_at: "2023-05-10T08:30:00Z",
    updated_at: "2023-05-15T09:45:00Z",
    readingTime: "5 min"
  },
  {
    id: "2",
    title: "Advanced State Management with Redux Toolkit",
    excerpt: "Take your Redux skills to the next level with Redux Toolkit's powerful features.",
    content: `
      <p>Redux Toolkit has simplified the Redux ecosystem by providing standardized approaches for common Redux patterns.</p>
      
      <h2>What is Redux Toolkit?</h2>
      <p>Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development. It includes utilities to simplify common Redux use cases.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>ConfigureStore: Simplified store setup with good defaults</li>
        <li>CreateSlice: Combines reducers, actions, and action creators</li>
        <li>CreateAsyncThunk: Simplified async logic</li>
        <li>Immer integration for immutable state updates with mutative syntax</li>
      </ul>
      
      <h2>Creating a Slice</h2>
      <pre><code>
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
      </code></pre>
      
      <p>This approach drastically reduces boilerplate and makes your Redux code more maintainable.</p>
    `,
    featured_image: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author_id: "2",
    author: {
      id: "2",
      full_name: "John Smith",
      avatar_url: "https://i.pravatar.cc/150?img=2"
    },
    category: "State Management",
    tags: ["Redux", "JavaScript", "State Management", "React"],
    status: "published",
    published_at: "2023-06-20T14:30:00Z",
    created_at: "2023-06-15T11:20:00Z",
    updated_at: "2023-06-20T13:15:00Z",
    readingTime: "7 min"
  },
  {
    id: "3",
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive interfaces quickly using Tailwind's utility classes.",
    content: `
      <p>Tailwind CSS has revolutionized how we approach UI development with its utility-first methodology.</p>
      
      <h2>Why Tailwind CSS?</h2>
      <p>Tailwind provides low-level utility classes that let you build completely custom designs without leaving your HTML. This approach offers several benefits:</p>
      <ul>
        <li>No more naming CSS classes</li>
        <li>Faster development cycles</li>
        <li>Consistent design with constraints</li>
        <li>Optimized production builds</li>
      </ul>
      
      <h2>Getting Started</h2>
      <p>Install Tailwind CSS in your project:</p>
      <pre><code>
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
      </code></pre>
      
      <h2>Creating a Responsive Component</h2>
      <pre><code>
&lt;div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"&gt;
  &lt;div class="md:flex"&gt;
    &lt;div class="md:shrink-0"&gt;
      &lt;img class="h-48 w-full object-cover md:h-full md:w-48" src="/img/example.jpg" alt="Example"&gt;
    &lt;/div&gt;
    &lt;div class="p-8"&gt;
      &lt;div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"&gt;Case study&lt;/div&gt;
      &lt;a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"&gt;Finding customers for your new business&lt;/a&gt;
      &lt;p class="mt-2 text-slate-500"&gt;Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
      </code></pre>
      
      <p>With Tailwind, you're able to build modern interfaces without writing a single line of custom CSS.</p>
    `,
    featured_image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    author_id: "3",
    author: {
      id: "3",
      full_name: "Sarah Johnson",
      avatar_url: "https://i.pravatar.cc/150?img=3"
    },
    category: "Design",
    tags: ["Tailwind CSS", "Responsive Design", "CSS", "Frontend"],
    status: "published",
    published_at: "2023-07-10T09:15:00Z",
    created_at: "2023-07-05T16:40:00Z",
    updated_at: "2023-07-10T08:30:00Z",
    readingTime: "6 min"
  }
];

// Mock comments data
const commentsData = {
  "1": [
    {
      id: "comment1",
      post_id: "1",
      author_id: "2",
      author: {
        full_name: "John Smith",
        avatar_url: "https://i.pravatar.cc/150?img=2"
      },
      content: "Great article! This really helped me understand how to use TypeScript with React.",
      created_at: "2023-05-16T14:30:00Z",
      updated_at: "2023-05-16T14:30:00Z"
    },
    {
      id: "comment2",
      post_id: "1",
      author_id: "3",
      author: {
        full_name: "Sarah Johnson",
        avatar_url: "https://i.pravatar.cc/150?img=3"
      },
      content: "I've been using TypeScript with React for a while now, and it's definitely improved my development workflow. Would love to see a follow-up article about advanced TypeScript patterns in React.",
      created_at: "2023-05-17T10:15:00Z",
      updated_at: "2023-05-17T10:15:00Z"
    }
  ],
  "2": [
    {
      id: "comment3",
      post_id: "2",
      author_id: "1",
      author: {
        full_name: "Jane Doe",
        avatar_url: "https://i.pravatar.cc/150?img=1"
      },
      content: "Redux Toolkit has been a game-changer for our team. The reduction in boilerplate code alone made it worth switching to.",
      created_at: "2023-06-21T09:45:00Z",
      updated_at: "2023-06-21T09:45:00Z"
    }
  ],
  "3": []
};

// API functions
export const fetchBlogPost = async (id: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const post = blogPosts.find(post => post.id === id);
  
  if (!post) {
    throw new Error("Blog post not found");
  }
  
  return post;
};

export const fetchComments = async (postId: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return commentsData[postId as keyof typeof commentsData] || [];
};

export const fetchRelatedPosts = async (category?: string, excludeId?: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Filter posts by category and exclude the current post
  let relatedPosts = category 
    ? blogPosts.filter(post => post.category === category && post.id !== excludeId)
    : [];
  
  // If there aren't enough related posts by category, add some other posts
  if (relatedPosts.length < 3) {
    const otherPosts = blogPosts
      .filter(post => post.id !== excludeId && (!category || post.category !== category))
      .slice(0, 3 - relatedPosts.length);
      
    relatedPosts = [...relatedPosts, ...otherPosts];
  }
  
  // Return only necessary properties for list display
  return relatedPosts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.featured_image,
    author: {
      name: post.author.full_name,
      avatar: post.author.avatar_url,
    },
    publishedAt: post.published_at,
    tags: post.tags
  }));
};
