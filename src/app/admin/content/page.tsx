"use client";

import { useEffect, useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase-client";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  published: boolean;
  created_at: string;
}

export default function ContentPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Announcement");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    const supabase = createClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setPosts(data as Post[]);
    }
    setLoading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.from("posts").insert({
      title,
      excerpt,
      category,
      published: true,
    });

    if (!error) {
      setTitle("");
      setExcerpt("");
      setCategory("Announcement");
      setShowForm(false);
      loadPosts();
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--gray-900)]">Content</h1>
          <p className="text-[var(--gray-500)] mt-1">
            Manage news posts, documents, and resources
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 text-sm bg-[var(--forest-green)] text-white rounded-md hover:bg-[var(--forest-green-dark)] transition-colors"
        >
          {showForm ? "Cancel" : "New Post"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 mb-6">
          <h2 className="font-semibold text-[var(--gray-900)] mb-4">
            Create News Post
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)]"
              >
                <option>Announcement</option>
                <option>Citizenship</option>
                <option>Heritage</option>
                <option>Governance</option>
                <option>Events</option>
              </select>
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-[var(--gray-700)] mb-1.5">
                Content
              </label>
              <textarea
                id="excerpt"
                required
                rows={4}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--forest-green)] resize-y"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[var(--forest-green)] text-white font-semibold rounded-md hover:bg-[var(--forest-green-dark)] transition-colors"
            >
              Publish Post
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-[var(--gray-500)]">
          Loading content...
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-8 text-center">
          <p className="text-[var(--gray-500)] mb-2">No posts yet.</p>
          <p className="text-sm text-[var(--gray-500)]">
            Create a <code className="bg-[var(--gray-100)] px-1 rounded">posts</code> table
            in Supabase with columns:{" "}
            <code className="bg-[var(--gray-100)] px-1 rounded">
              id, title, excerpt, category, published, created_at
            </code>
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 rounded-lg border border-[var(--gray-200)] flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[var(--gray-900)] text-sm">
                    {post.title}
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-[var(--cherry-red)]">
                    {post.category}
                  </span>
                  {!post.published && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--gray-500)]">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <button className="text-xs text-[var(--cherry-red)] hover:underline">
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
