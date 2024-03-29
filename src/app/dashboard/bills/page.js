"use client";

import { getBase64, fileToGenerativePart } from "./helper";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { db, storage } from "@/lib/firebase";
import Image from "next/image";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

export default function Bills() {
	const [image, setImage] = useState(null);
	const [imageInlineData, setImageInlineData] = useState(null);
	const [result, setResult] = useState(null);
	const [imgUrl, setImgUrl] = useState(null);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		setUserData(user);
	}, []);

	const handleImageChange = async (e) => {
		const file = e.target.files[0];
		const path = `files/bills/${v5(userData.upiId, v5.URL)}`;
		const storageRef = ref(storage, path);
		const uploading = uploadBytes(storageRef, avatar);
		const snapshot = await uploading;
		const downloadURL = await getDownloadURL(snapshot.ref);
		setImgUrl(downloadURL);
		const imagepath = downloadURL;
		// The path of the image in the storage

		// Adding the document id to the user data and updating the local storage
		const userDoc = doc(db, "user", userData.upiId);
		await updateDoc(userDoc, {
			bills: [...userData.bills, imagepath],
		});

		// getting base64 from file to render in DOM
		getBase64(file)
			.then((result) => {
				setImage(result);
			})
			.catch((e) => console.log(e));

		// generating content model for Gemini Google AI
		fileToGenerativePart(file).then((image) => {
			setImageInlineData(image);
		});
	};

	const handleClick = () => {
		aiImageRun();
	};

	const genAI = new GoogleGenerativeAI(
		process.env.NEXT_PUBLIC_GEMINI_API_KEY
	);

	async function aiImageRun() {
		const model = genAI.getGenerativeModel({
			model: "gemini-pro-vision",
		});
		const result = await model.generateContent([
			"in just two words, in this format 'category,bill' i want you to give me the category of this bill from This list: Food, Travel, Shopping, Entertainment, Health, Bills, Others.  and the amount of the bill",
			imageInlineData,
		]);
		const response = await result.response;
		const text = response.text();
		setResult(text);

		console.log(text);
	}

	return (
		<div className="w-full h-full flex flex-col items-center justify-center bg-brand-backgroud2 p-5 md:p-3 gap-5">
			<div className="bg-white p-6 md:p-32 rounded-2xl drop-shadow w-full h-fit space-y-10 overflow-hidden border">
				<Typography variant="h1">Bill Page</Typography>
				<Typography variant="h6" color="green">
					Enter the bill image to get the category and amount of the
					bill
				</Typography>
				<input
					className="text-sm text-grey-500 file:mr-5 file:py-2 file:px-6 file:rounded-full file:border-0
                        file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:cursor-pointer hover:file:bg-green-50 hover:file:text-green-700 block"
					size="lg"
					variant="standard"
					label="Enter Display Picture"
					type="file"
					name="displayPicture"
					accept="image/*"
					onChange={(e) => handleImageChange(e)}
				/>
				<Button onClick={() => handleClick()} size="lg">
					Search
				</Button>

				{result}
				<div className=" size-1 w-full border-b border-brand-border"></div>
			</div>
		</div>
	);
}
