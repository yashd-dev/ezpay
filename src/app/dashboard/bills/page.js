"use client";

import { getBase64, fileToGenerativePart } from "./helper";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState, useEffect } from "react";
import {
	Typography,
	Input,
	Button,
	Select,
	Option,
} from "@material-tailwind/react";
import { db, storage } from "@/lib/firebase";
import Image from "next/image";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { v5 } from "uuid";

export default function Bills() {
	const [image, setImage] = useState(null);
	const [avatar, setAvatar] = useState(null);

	const [imageInlineData, setImageInlineData] = useState(null);
	const [result, setResult] = useState(null);
	const [imgUrl, setImgUrl] = useState(null);
	const [userData, setUserData] = useState({});
	const [sortedBills, setSortedBills] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const user = JSON.parse(localStorage.getItem("user"));
			setUserData(user);
			const payerDocRef = doc(db, "user", user.upiId);
			await getDoc(payerDocRef).then((doc) => {
				localStorage.setItem("user", JSON.stringify(doc.data()));
				setUserData(doc.data());
				setSortedBills(doc.data());
			});
		};
		fetchData();
	}, []);

	const handleImageChange = async (e) => {
		const file = e.target.files[0];

		// The path of the image in the storage

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
		setLoading(true);
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

		const path = `files/bills/${v5(userData.upiId, v5.URL)}`;
		const storageRef = ref(storage, path);
		const uploading = uploadBytes(storageRef, avatar);
		const snapshot = await uploading;
		const downloadURL = await getDownloadURL(snapshot.ref);
		setImgUrl(downloadURL);
		const imagepath = downloadURL;
		let res = result.response.candidates[0].content.parts[0].text
			.trim()
			.split(",");
		const userbill = {
			category: res[0],
			amount: res[1],
			image: imagepath,
		};
		console.log([...userData.bills, userbill]);
		// Adding the document id to the user data and updating the local storage
		const userDoc = doc(db, "user", userData.upiId);
		await updateDoc(userDoc, {
			bills: [...userData.bills, userbill],
		});

		await getDoc(userDoc).then((doc) => {
			localStorage.setItem("user", JSON.stringify(doc.data()));
			setUserData(doc.data());
		});

		console.log(text);
	}

	const handleSort = (value) => {
		const selectedCategory = value;
		// Sort bills array by category if a category is selected
		console.log(selectedCategory);
		if (selectedCategory !== "1") {
			// Filter bills based on selected category
			const filteredBills = userData.bills.filter(
				(bill) => bill.category === selectedCategory
			);
			setSortedBills({ bills: filteredBills });
			console.log(sortedBills);
		} else if (selectedCategory === "1") {
			// If no category is selected, reset sortedBills to the original array
			setSortedBills(JSON.parse(localStorage.getItem("user")));
		} else {
			// If no category is selected, reset sortedBills to the original array
			setSortedBills(JSON.parse(localStorage.getItem("user")));
		}
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center bg-brand-backgroud2 p-5 md:p-3 gap-5">
			<div className="bg-white p-6 md:px-32 rounded-2xl drop-shadow w-full h-fit space-y-10 overflow-hidden border">
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
					onChange={(e) =>
						handleImageChange(e) && setAvatar(e.target.files[0])
					}
				/>
				<Button onClick={() => handleClick()} size="lg">
					{loading ? "Loading" : "Register It!"}   
				</Button>
				{result}
				<div className=" size-1 w-full border-b border-brand-border"></div>
				<Typography variant="h4">Your Bills</Typography>
				<div className=" max-w-3xl *:max-w-3xl">
					{" "}
					<Select
						size="lg"
						label="Enter A Category"
						onChange={(val) => handleSort(val)}
					>
						<Option value="1">All</Option>
						<Option value="Food">Food</Option>
						<Option value="Travel">Travel</Option>
						<Option value="Shopping">Shopping</Option>
						<Option value="Entertainment">Entertainment</Option>
						<Option value="Health">Health</Option>
						<Option value="Bills">Bills</Option>
					</Select>
				</div>

				<div className=" space-y-5 md:flex md:flex-row md:gap-5  md:overflow-x-scroll">
					{sortedBills.bills &&
						sortedBills.bills.map((bill, index) => (
							<div
								key={index}
								className=" bg-brand-backgroudTertiary p-4 w-fit rounded-2xl space-y-4 text-brand-background"
							>
								<Image
									src={bill.image}
									alt="Bill"
									className="rounded-2xl max-h-[200px] object-cover"
									width={300}
									height={300}
								/>
								<Typography variant="h5">
									Bill Number {index + 1}
								</Typography>
								<Typography variant="h5">
									Category: {bill.category}{" "}
								</Typography>
								<Typography variant="h5">
									Amount: {bill.amount}{" "}
								</Typography>
								{/* Add any additional bill information or components here */}
							</div>
						))}
				</div>
			</div>
		</div>
	);
}
