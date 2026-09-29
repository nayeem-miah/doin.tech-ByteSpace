import type { Course, Lesson, NavLink, Review, Testimonial } from "./types";

/**
 * All copy and content is transcribed from the Figma file's TEXT nodes so
 * the replica keeps the source design's exact wording.
 */

export const nav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/courses" },
  { label: "Creators", href: "/creator" },
];

export const headerLinks: NavLink[] = [
  { label: "Sign In", href: "/login" },
  { label: "Join Us", href: "/register" },
];

/** Category filter pills shown under the "Discover Your Passion" heading. */
export const categoryFilters = [
  "Featured",
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Digital Illustration",
  "Film & Video",
  "Crafts",
  "Freelance & Entrepreneurship",
  "Graphic Design",
  "Photography",
  "Productivity",
  "Web Development",
  "Data Science",
  "Cooking",
] as const;

export const featuredCategories = [
  { label: "Design", icon: "shapes" },
  { label: "Development", icon: "code" },
  { label: "IT & Software", icon: "monitor" },
  { label: "Business", icon: "briefcase" },
  { label: "Marketing", icon: "campaign" },
  { label: "Photography", icon: "camera" },
] as const;

export const learningPaths = [
  { label: "Design", icon: "shapes" },
  { label: "Development", icon: "code" },
  { label: "IT & Software", icon: "monitor" },
  { label: "Business", icon: "briefcase" },
  { label: "Marketing", icon: "campaign" },
  { label: "Photography", icon: "camera" },
] as const;

const SHARED_META = { lessons: 17, duration: "2 hours 16 mins", comments: 59 };

export const courses: Course[] = [
  {
    ...SHARED_META,
    slug: "learn-figma-from-basic",
    title: "Learn Figma from Basic",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-1.png",
    category: "Design",
  },
  {
    ...SHARED_META,
    slug: "build-digital-asset",
    title: "Build Digital Asset",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-2.png",
    category: "Development",
  },
  {
    ...SHARED_META,
    slug: "the-power-of-big-data",
    title: "the Power of Big Data",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-3.png",
    category: "Business",
  },
  {
    ...SHARED_META,
    slug: "balancing-productivity-and-self-care",
    title: "Balancing Productivity and Self-Care",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-4.png",
    category: "Photography",
  },
  {
    ...SHARED_META,
    slug: "mastering-money-management",
    title: "Mastering Money Management",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-5.png",
    category: "IT & Software",
  },
  {
    ...SHARED_META,
    slug: "from-idea-to-startup-success",
    title: "From Idea to Startup Success",
    author: "purepearl studio",
    rating: 4.5,
    reviews: 240,
    level: "Beginner",
    students: "26+",
    price: "$25",
    period: "/lifetime",
    thumb: "/assets/course-thumb-6.png",
    category: "Marketing",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content have been game-changing for me.",
    avatar: "/assets/avatar-11.png",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and well-structured courses. It's been a wonderful journey so far.",
    avatar: "/assets/avatar-12.png",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the community is incredibly supportive.",
    avatar: "/assets/avatar-13.png",
  },
];

export const creatorBenefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

export const stats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

export const footerColumns = [
  {
    heading: "Browse",
    links: [
      "Featured Courses",
      "Featured Categories",
      "Business",
      "IT",
      "Design",
    ],
  },
  {
    heading: "Development",
    links: [
      "Development",
      "Marketing",
      "Photography",
      "Finance",
      "Sport",
    ],
  },
  {
    heading: "Platform",
    links: [
      "Become a Creator",
      "Affiliate Program",
      "Contact",
      "Help",
      "About",
    ],
  },
];

export const legalLinks = ["Privacy Policy", "Terms of Service", "Cookies Settings"];

export const lessons: Lesson[] = [
  { index: 1, title: "Getting Started with Figma", duration: "6 mins", kind: "video", free: true },
  { index: 2, title: "Understanding the Canvas", duration: "9 mins", kind: "video" },
  { index: 3, title: "Frames, Groups and Components", duration: "12 mins", kind: "video" },
  { index: 4, title: "Auto Layout in Practice", duration: "14 mins", kind: "video" },
  { index: 5, title: "Typography and Type Styles", duration: "8 mins", kind: "article" },
  { index: 6, title: "Working with Colour Styles", duration: "11 mins", kind: "video" },
  { index: 7, title: "Prototype Connections", duration: "10 mins", kind: "video" },
  { index: 8, title: "Design Systems from Scratch", duration: "16 mins", kind: "video" },
  { index: 9, title: "Quiz: Layout Fundamentals", duration: "5 mins", kind: "quiz" },
];

export const reviews: Review[] = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/assets/avatar-11.png",
    rating: 5,
    date: "March 12, 2023",
    body: "The course provided me with a comprehensive understanding of the fundamentals. The lessons are well paced and the examples are practical.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "/assets/avatar-12.png",
    rating: 4,
    date: "February 28, 2023",
    body: "Great course overall. I would have liked a little more on advanced patterns, but the core material is solid and clear.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "/assets/avatar-13.png",
    rating: 5,
    date: "January 19, 2023",
    body: "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the community is incredibly supportive.",
  },
];
