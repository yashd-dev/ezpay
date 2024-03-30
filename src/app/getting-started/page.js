"use client";

import React, { useState, useEffect } from "react";
import {
	doc,
	setDoc,
	getCountFromServer,
	query,
	collection,
	documentId,
	where,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import Image from "next/image";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Input, Button, Typography } from "@material-tailwind/react";
import { v5 } from "uuid";
import { useRouter } from "next/navigation";

export default function GettingStarted() {
	const [upiId, setUpiId] = useState("");
	const [pin, setPin] = useState("");
	const [displayPicture, setDisplayPicture] = useState("");
	const [userData, setUserData] = useState({});
	const [userName, setUserName] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [error, setError] = useState("");
	const router = useRouter();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		setUserData(user);
		if (user && user.dbId) {
			router.push("/dashboard/overview");
		}
		if (user && user.displayName) {
			setUserName(user.displayName);
		}
		if (user && user.photoURL) {
			setDisplayPicture(user.photoURL);
		}
	}, []);
	async function handleSubmit(e) {
		e.preventDefault();
		const path = `files/${v5(upiId, v5.URL)}`;
		let imagepath = ""; // The path of the image in the storage

		// Adding the document id to the user data and updating the local storage

		if (!userData.emailVerified) {
			// If the user is not verified, then we need to upload the display picture. The unverified user will not have a photoURL, they have logged in with email and password

			if (avatar) {
				const storageRef = ref(storage, path);
				const uploading = uploadBytes(storageRef, avatar);
				const snapshot = await uploading;
				const downloadURL = await getDownloadURL(snapshot.ref);
				setDisplayPicture(downloadURL);
				imagepath = downloadURL;
			} else {
				console.log("No Avatar");
				setError("Please upload a display picture");
				return;
			}
			let temp = userData;
			temp.upiId = upiId;
			temp.photoURL = imagepath;
			temp.displayName = userName;
			temp.wallet = 0;
			temp.cards = [];
			temp.transactions = [];
			temp.bills = [];
			setUserData(temp);
			console.log(userData);
			localStorage.setItem("user", JSON.stringify(userData));
			//  Adding the user to the database with its UPI ID as the document ID
			await setDoc(doc(db, "user", upiId), {
				id: userData.uid,
				upiId,
				pin,
				photoURL: imagepath,
				displayName: userName,
				email: userData.email,
				wallet: 0,
				cards: [],
				transactions: [],
				bills: [],
			})
				.then(() => {
					router.push("/dashboard/overview");
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
				});
		} else {
			// If the user is verified, then we don't need to upload the display picture. The verified user will have a photoURL, they have logged in with Google
			let temp = userData;
			temp.upiId = upiId;
			temp.wallet = 0;
			temp.cards = [];
			temp.transactions = [];
			temp.bills = [];
			setUserData(temp);
			console.log(userData);
			localStorage.setItem("user", JSON.stringify(userData));

			const user = {
				id: userData.uid,
				upiId,
				pin,
				displayPicture: userData.photoURL,
				displayName: userData.displayName,
				email: userData.email,
				wallet: 0,
				cards: [],
				transactions: [],
				bills: [],
			};
			console.log(userData.uid);
			await setDoc(doc(db, "user", upiId), user);
			router.push("/dashboard/overview");
		}
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		if (name === "upiId") {
			setUpiId(value);
		} else if (name === "pin") {
			// Validate that the pin is 4 numbers only
			if (/^\d{0,4}$/.test(value)) {
				setPin(value);
				setError("");
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
		<>
			<div className=" gradient-bg w-screen h-screen -z-10"></div>
			<div className="flex flex-col justify-center items-center mx-auto min-h-screen w-full p-2 bg-brand-backgroudSecondary ">
				<div className="  md:bg-brand-background space-y-10 rounded-2xl w-full md:in-w-[50vw] md:max-w-[50vw]  drop-shadow-lg flex flex-col md:flex-row justify-center items-center gap-2 mx-auto px-14 py-10 overflow-clip">
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
						className=" space-y-5 md:px-10 rounded-2xl w-full"
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
			</div>{" "}
		</>
	);
}
