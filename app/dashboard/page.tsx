import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import prisma from "../utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { BlogpostCard } from "@/components/general/BlogpostCard";

async function getPosts(userId: string) {
  const data = await prisma.blogPost.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      content: true,
      imageUrl: true,
      authorImage: true,
      authorName: true,
      authorId: true,
      id: true,
      createdAt: true,
      updatedAt: true
    }
  });

  return data;
}
export default async function DashboardRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    return (
      <div>
        <h2 className="text-xl font-medium mb-4">Please sign in to view your dashboard.</h2>
        <Link
          href="/api/auth/login"
          className={buttonVariants({ variant: "default" })}
        >
          Sign In
        </Link>
      </div>
    );
  }
  
  const data = await getPosts(user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">Your Blog Articles</h2>
        <Link
          href="/dashboard/create"
          className={buttonVariants({ variant: "default" })}
        >
          Create New
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((post) => (
          <BlogpostCard key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
