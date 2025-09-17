
"use client";
import { useState } from "react";
import Input from "@/components/input/input";
import Button from "@/components/button";
import AdminNavbarTemplate from "@/templates/AdminNavbarTemplate";


//przykladowy wyglad 


const mockUsers = [
	{ id: 1, name: "Jan", surname: "Kowalski", email: "jan.kowalski@email.com" },
	{ id: 2, name: "Anna", surname: "Nowak", email: "anna.nowak@email.com" },
	{ id: 3, name: "Piotr", surname: "Zielinski", email: "piotr.zielinski@email.com" },
];
const mockCars = [
	{ user: "Jan Kowalski", brand: "BMW", model: "X5", license: "KR12345" },
	{ user: "Anna Nowak", brand: "Audi", model: "A4", license: "WA54321" },
	{ user: "Piotr Zielinski", brand: "Toyota", model: "Corolla", license: "PO98765" },
];
const mockSpots = [
	{ id: 1, status: "available", lastReservation: "2025-09-10" },
	{ id: 2, status: "occupied", lastReservation: "2025-09-15" },
	{ id: 3, status: "reserved", lastReservation: "2025-09-14" },
];


const BUTTONS = [
	{ key: "users", label: "All Users", title: "All Users" },
	{ key: "cars", label: "All Users Cars", title: "All Users Cars" },
	{ key: "spots", label: "All Parking Spots", title: "All Parking Spots" },
];

export default function AdminDashboard() {
	const [active, setActive] = useState<"users" | "cars" | "spots">("users");
	const [editModal, setEditModal] = useState<{ type: string; data: any } | null>(null);
	const [deleteModal, setDeleteModal] = useState<{ type: string; data: any } | null>(null);
	const [editForm, setEditForm] = useState<any>({});

	// --- API REQUESTS ---
	const handleEdit = async () => {
		if (!editModal) return;
		let url = "";
		let method = "PUT";
		let body = {};
		if (editModal.type === "users") {
			url = `/api/users/${editForm.id}`;
			body = { ...editForm };
		} else if (editModal.type === "cars") {
			url = `/api/cars/${editForm.id || 1}`; // TODO: use real id
			body = { ...editForm };
		} else if (editModal.type === "spots") {
			url = `/api/parking/${editForm.id}`;
			body = { ...editForm };
		}
		await fetch(url, {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(body),
		});
		setEditModal(null);
		// TODO: refresh data
	};
	const handleDelete = async () => {
		if (!deleteModal) return;
		let url = "";
		if (deleteModal.type === "users") {
			url = `/api/users/${deleteModal.data.id}`;
		} else if (deleteModal.type === "cars") {
			url = `/api/cars/${deleteModal.data.id || 1}`; // TODO: use real id
		} else if (deleteModal.type === "spots") {
			url = `/api/parking/${deleteModal.data.id}`;
		}
		await fetch(url, { method: "DELETE" });
		setDeleteModal(null);
		// TODO: refresh data
	};

		let content = null;
			if (active === "users") {
				content = (
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-[#f3f4f6]">
								<th className="px-4 py-2 text-left">User ID</th>
								<th className="px-4 py-2 text-left">Name</th>
								<th className="px-4 py-2 text-left">Surname</th>
								<th className="px-4 py-2 text-left">Email</th>
								<th className="px-4 py-2 text-left text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{mockUsers.map((u) => (
								<tr key={u.id} className="border-b">
									<td className="px-4 py-2">{u.id}</td>
									<td className="px-4 py-2">{u.name}</td>
									<td className="px-4 py-2">{u.surname}</td>
									<td className="px-4 py-2">{u.email}</td>
																																				<td className="px-4 py-2 flex justify-end gap-2">
																																					<button title="Edit" className="text-blue-500 hover:text-blue-700" onClick={() => { setEditForm(u); setEditModal({ type: "users", data: u }); }}><span className="material-icons">edit</span></button>
																																					<button title="Delete" className="text-red-500 hover:text-red-700" onClick={() => setDeleteModal({ type: "users", data: u })}><span className="material-icons">delete</span></button>
																																				</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			} else if (active === "cars") {
				content = (
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-[#f3f4f6]">
								<th className="px-4 py-2 text-left">User</th>
								<th className="px-4 py-2 text-left">Brand</th>
								<th className="px-4 py-2 text-left">Model</th>
								<th className="px-4 py-2 text-left">License Plate</th>
								<th className="px-4 py-2 text-left text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{mockCars.map((c, i) => (
								<tr key={i} className="border-b">
									<td className="px-4 py-2">{c.user}</td>
									<td className="px-4 py-2">{c.brand}</td>
									<td className="px-4 py-2">{c.model}</td>
									<td className="px-4 py-2">{c.license}</td>
									<td className="px-4 py-2 flex justify-end gap-2">
																		<button title="Edit" className="text-blue-500 hover:text-blue-700" onClick={() => { setEditForm(c); setEditModal({ type: "cars", data: c }); }}><span className="material-icons">edit</span></button>
																		<button title="Delete" className="text-red-500 hover:text-red-700" onClick={() => setDeleteModal({ type: "cars", data: c })}><span className="material-icons">delete</span></button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			} else if (active === "spots") {
				content = (
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-[#f3f4f6]">
								<th className="px-4 py-2 text-left">Spot ID</th>
								<th className="px-4 py-2 text-left">Status</th>
								<th className="px-4 py-2 text-left">Last Reservation</th>
								<th className="px-4 py-2 text-left text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{mockSpots.map((s) => (
								<tr key={s.id} className="border-b">
									<td className="px-4 py-2">{s.id}</td>
									<td className="px-4 py-2 capitalize">{s.status}</td>
									<td className="px-4 py-2">{s.lastReservation}</td>
									<td className="px-4 py-2 flex justify-end gap-2">
																		<button title="Edit" className="text-blue-500 hover:text-blue-700" onClick={() => { setEditForm(s); setEditModal({ type: "spots", data: s }); }}><span className="material-icons">edit</span></button>
																		<button title="Delete" className="text-red-500 hover:text-red-700" onClick={() => setDeleteModal({ type: "spots", data: s })}><span className="material-icons">delete</span></button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				);
			}

		const activeTitle = BUTTONS.find((b) => b.key === active)?.title || "";

			return (
				<div className="flex flex-col w-[100vw] h-[100vh] bg-white">
					<AdminNavbarTemplate />
					<main className="flex-1 bg-white flex flex-col items-center pt-8">
						<div className="flex w-full">
							<div className="flex flex-row gap-4 items-start mt-2 ml-20">
								{BUTTONS.map((btn) => (
									<div key={btn.key} className="flex flex-col items-center relative">
										<button
											className={`px-8 py-2 font-semibold rounded-none border-none focus:outline-none transition-colors duration-200 text-left ${
												active === btn.key
													? "text-[#7F8CAA]"
													: "text-gray-500 hover:text-[#7F8CAA]"
											}`}
											style={{ background: "#fff", minWidth: 180 }}
											onClick={() => setActive(btn.key as any)}
										>
											{btn.label}
										</button>
										{active === btn.key && (
											<div
												className="absolute left-0 right-0"
												style={{
													height: "3px",
													background: "#7F8CAA",
													bottom: "-6px",
													width: "80%",
													marginLeft: 0,
												}}
											/>
										)}
									</div>
								))}
							</div>
						</div>
						<div className="flex flex-col items-center w-full mt-12">
							<div className="mb-4 text-2xl font-bold text-[#7F8CAA] text-left w-[60%]">
								{activeTitle}
							</div>
							<section className="w-[60%] bg-base-200 rounded-xl shadow-lg p-8 flex flex-col justify-center min-h-[200px] mx-auto">
								{content}
							</section>
						</div>

						{/* EDIT MODAL */}
						{editModal && (
							<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
								<div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] w-[90vw] max-w-[400px] flex flex-col gap-4">
									<h3 className="text-xl font-bold mb-2">Edit {editModal.type.slice(0, -1)}</h3>
									{Object.keys(editForm).map((key) => (
										<div key={key} className="flex flex-col gap-1">
											<label className="text-xs font-semibold text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
											<Input
												className="bg-base-200 rounded-md p-2"
												type="text"
												name={key}
												value={editForm[key]}
												onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
											/>
										</div>
									))}
									<div className="flex gap-4 mt-4">
										<Button value="Save" type="button" onClick={handleEdit} customWidth="50%" />
										<Button value="Cancel" type="button" onClick={() => setEditModal(null)} customWidth="50%" />
									</div>
								</div>
							</div>
						)}

						{/* DELETE MODAL */}
						{deleteModal && (
							<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
								<div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] w-[90vw] max-w-[400px] flex flex-col gap-4">
									<h3 className="text-xl font-bold mb-2">Confirm delete</h3>
									<p>Are you sure you want to delete this {deleteModal.type.slice(0, -1)}?</p>
									<div className="flex gap-4 mt-4">
										<Button value="Delete" type="button" onClick={handleDelete} customWidth="50%" />
										<Button value="Cancel" type="button" onClick={() => setDeleteModal(null)} customWidth="50%" />
									</div>
								</div>
							</div>
						)}
					</main>
				</div>
			);
	}
