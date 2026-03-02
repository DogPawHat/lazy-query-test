export interface Todo {
	id: number;
	userId: number;
	title: string;
	completed: boolean;
}

export interface User {
	id: number;
	name: string;
	username: string;
	email: string;
	phone: string;
	website: string;
}

export interface Post {
	id: number;
	userId: number;
	title: string;
	body: string;
}

const API_BASE = "https://jsonplaceholder.typicode.com";

export async function fetchTodos(): Promise<Todo[]> {
	const response = await fetch(`${API_BASE}/todos?_limit=10`);
	if (!response.ok) {
		throw new Error("Failed to fetch todos");
	}
	return response.json();
}

export async function fetchUsers(query: string): Promise<User[]> {
	const response = await fetch(`${API_BASE}/users`);
	if (!response.ok) {
		throw new Error("Failed to fetch users");
	}
	const users: User[] = await response.json();

	if (!query) return users;

	const lowerQuery = query.toLowerCase();
	return users.filter(
		(user) =>
			user.name.toLowerCase().includes(lowerQuery) ||
			user.username.toLowerCase().includes(lowerQuery) ||
			user.email.toLowerCase().includes(lowerQuery),
	);
}

export async function fetchPostById(id: number): Promise<Post> {
	const response = await fetch(`${API_BASE}/posts/${id}`);
	if (!response.ok) {
		throw new Error("Failed to fetch post");
	}
	return response.json();
}
