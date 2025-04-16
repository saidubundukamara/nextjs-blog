import { BlogpostCard } from "@/components/general/BlogpostCard";
import { prisma } from "./utils/db";
import { Suspense } from "react";

async function getPosts() {
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  const data = await prisma.blogPost.findMany({
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorId: true,
      authorImage: true,
      authorName: true,
      id: true,
      createdAt: true,
      updatedAt: true
    }
  })

  return data;
}

export default function Home() {
  // const data = await getPosts();
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Latest posts</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((post) => (
          <BlogpostCard key={post.id} data={post} />
        ))}
      </div> */}
      <Suspense fallback={<p>Loading...</p>}>
      <BlogPosts />
      </Suspense>
    </div>
  );
}

async function BlogPosts() {
  const data = await getPosts();

  return(
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((post) => (
          <BlogpostCard key={post.id} data={post} />
        ))}
      </div>
  )
}
