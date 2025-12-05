const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function getPosts() {
  const res = await fetch(`${API_URL}/posts`);

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export async function getPostBySlug(slug) {
  const res = await fetch(`${API_URL}/posts/${slug}`);

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export async function login(credentials) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json();
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createPost(postData) {
  const formData = new FormData();

  // Append all fields to FormData
  Object.keys(postData).forEach((key) => {
    if (postData[key] !== null && postData[key] !== undefined) {
      formData.append(key, postData[key]);
    }
  });

  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return res.json();
}

export async function updatePost(id, postData) {
  const formData = new FormData();

  // Append all fields to FormData
  Object.keys(postData).forEach((key) => {
    if (postData[key] !== null && postData[key] !== undefined) {
      formData.append(key, postData[key]);
    }
  });

  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to update post");
  }

  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }

  return res.json();
}
