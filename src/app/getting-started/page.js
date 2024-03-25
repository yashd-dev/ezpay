"use client";

import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import Image from "next/image";
import {
	ref,
	getDownloadURL,
	uploadBytesResumable,
	uploadBytes,
} from "firebase/storage";
import { Input, Button, Typography } from "@material-tailwind/react";
import { v5 } from "uuid";

export default function GettingStarted() {
	const [upiId, setUpiId] = useState("");
	const [pin, setPin] = useState("");
	const [displayPicture, setDisplayPicture] = useState("");
	const [userData, setUserData] = useState({});
	const [userName, setUserName] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		setUserData(JSON.parse(localStorage.getItem("user")));
		if (userData.photoURL) {
			setDisplayPicture(userData.photoURL);
		}
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		console.log(displayPicture, upiId, pin, userName);
		const path = `files/${v5(upiId, v5.URL)}`;

		if (!userData.emailVerified) {
			if (avatar) {
				const storageRef = ref(storage, path);
				const uploading = uploadBytes(storageRef, avatar);
				const snapshot = await uploading;
				const downloadURL = await getDownloadURL(snapshot.ref);
				console.log("File available at:", downloadURL);
				setDisplayPicture(downloadURL);
				console.log(storageRef);
			} else {
				console.log("No Avatar");
				setError("Please upload a display picture");
				return;
			}

			await setDoc(doc(db, "users", `yashge${upiId}`), {
				id: userData.uid,
				upiId,
				pin,
				displayPicture,
				userName,
				email: userData.email,
			})
				.then((docRef) => {
					console.log(
						userData.uid,
						upiId,
						pin,
						displayPicture,
						userName
					);
					console.log("Document written with ID: ", docRef.id);
					let temp = userData;
					temp.dbId = docRef.id;
					setUserData(temp);
					console.log(userData);
					localStorage.setItem("user", JSON.stringify(userData));
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
					setError("Error adding document");
				});
		} else {
			const user = {
				id: userData.uid,
				upiId,
				pin,
				displayPicture: userData.photoURL,
				userName: userData.displayName,
				email: userData.email,
			};
			console.log(userData.uid);
			await setDoc(doc(db, "users", "gsdhgshdgsdhg"), user);
		}
	}
	const uploadAvatar = async (event) => {
		const storageRef = ref(storage, "some-child");
		const file = event.target.files[0];
		const fileRef = storageRef.child(file.name);
		await uploadBytes(fileRef, file);
		console.log("Uploaded a blob or file!");
	};

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === "upiId") {
			setUpiId(value);
		} else if (name === "pin") {
			// Validate that the pin is 4 numbers only
			if (/^\d{0,4}$/.test(value)) {
				setPin(value);
			} else {
				setError("PIN should be 4 digits only");
			}
		} else if (name === "displayPicture") {
			setDisplayPicture(value);
		} else if (name === "name") {
			setUserName(value);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center mx-auto min-h-screen w-full p-2 bg-brand-backgroudSecondary ">
			<div className="  bg-brand-backgroud space-y-10 rounded-2xl min-w-[50vw]  drop-shadow-lg md:flex flex-row justify-center items-center gap-2 mx-auto hidden px-14 py-10">
				<span className=" space-y-4 w-full">
					{userData.displayName ? (
						<h1 className="text-xl font-bold">
							Welcome <br></br>
							<br></br> {userData.displayName}!
						</h1>
					) : (
						<h1 className="text-2xl font-bold">Welcome!</h1>
					)}

					{userData.photoURL ? (
						<Image
							src={String(userData.photoURL)}
							width={300}
							height={300}
							className=" w-1/2 rounded-full object-cover object-center"
						></Image>
					) : (
						""
					)}
				</span>

				<form
					className=" space-y-5 px-10 rounded-2xl w-full"
					onSubmit={handleSubmit}
				>
					{userData.displayName ? (
						""
					) : (
						<Input
							size="lg"
							variant="standard"
							label="Enter Your Name"
							type="text"
							name="name"
							value={userName}
							onChange={handleInputChange}
						/>
					)}
					<Input
						size="lg"
						className="w-full"
						variant="standard"
						label="Enter UPI ID, "
						type="number"
						name="upiId"
						value={upiId}
						onChange={handleInputChange}
					/>
					<Input
						size="lg"
						className="w-full"
						variant="standard"
						label="Enter PIN, 4 digits only"
						type="password"
						name="pin"
						value={pin}
						onChange={handleInputChange}
					/>
					{userData.photoURL ? (
						""
					) : (
						<input
							className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0
						file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-green-50 hover:file:text-green-700"
							size="lg"
							variant="standard"
							label="Enter Display Picture"
							type="file"
							name="displayPicture"
							accept="image/*"
							onChange={(e) => {
								setAvatar(e.target.files[0]);
							}}
						/>
					)}
					<Button
						type="submit"
						size="lg"
						className="w-fit bg-brand-accent"
					>
						Submit
					</Button>
					{error && (
						<Typography variant="h6" color="red" textGradient>
							{error}
						</Typography>
					)}
				</form>
			</div>
		</div>
	);
}
