import React, { useState } from "react";
import axios from "axios";

export default function Register() {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password1: "",
		password2: "",
	});
	const [isLoading, setIsLoading] = useState(false);
	const [modalMessage, setModalMessage] = useState(null); // Stores the message to show in the modal
	const [isModalVisible, setIsModalVisible] = useState(false); // Controls modal visibility
	const [isSuccess, setIsSuccess] = useState(false); // To differentiate between success and error

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isLoading) return;

		setIsLoading(true);

		try {
			const response = await axios.post("http://127.0.0.1:8000/api/register/", formData);
			setModalMessage("Registration Successful!");
			setIsSuccess(true);
			setFormData({ username: "", email: "", password1: "", password2: "" }); // Clear form data
		} catch (error) {
			if (error.response && error.response.data) {
				const errorMessages = Object.values(error.response.data).flat();
				setModalMessage(errorMessages[0]);
			} else {
				setModalMessage("An unexpected error occurred.");
			}
			setIsSuccess(false);
		} finally {
			setIsLoading(false);
			setIsModalVisible(true); // Show modal with the message
		}
	};

	const closeModal = () => {
		setIsModalVisible(false);
		if (isSuccess) setFormData({ username: "", email: "", password1: "", password2: "" }); // Clear form data if successful
	};

	return (
		<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
			<div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}>
				<h2 className="text-center mb-4">Register</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label htmlFor="username" className="form-label">Username:</label>
						<input
							type="text"
							name="username"
							className="form-control"
							id="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="email" className="form-label">Email:</label>
						<input
							type="email"
							name="email"
							className="form-control"
							id="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password1" className="form-label">Password:</label>
						<input
							type="password"
							name="password1"
							className="form-control"
							id="password1"
							value={formData.password1}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="mb-3">
						<label htmlFor="password2" className="form-label">Confirm Password:</label>
						<input
							type="password"
							name="password2"
							className="form-control"
							id="password2"
							value={formData.password2}
							onChange={handleChange}
							required
						/>
					</div>
					<button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
						{isLoading ? "Registering..." : "Register"}
					</button>
				</form>
			</div>

			{/* Modal */}
			{isModalVisible && (
				<div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">{isSuccess ? "Success" : "Error"}</h5>
								<button type="button" className="btn-close" onClick={closeModal}></button>
							</div>
							<div className="modal-body">
								<p>{modalMessage}</p>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-secondary" onClick={closeModal}>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
