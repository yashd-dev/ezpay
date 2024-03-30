"use client";
import React, { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import {
	doc,
	updateDoc,
	getDoc,
	increment,
	arrayUnion,
	FieldValue,
} from "firebase/firestore";
import { Typography } from "@material-tailwind/react";
import QRCode from "react-qr-code";

export default function QR() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	const [userData, setUserData] = useState({});
	useEffect(() => {
		const fetchData = async () => {
			const user = JSON.parse(localStorage.getItem("user"));
			setUserData(user);
			const payerDocRef = doc(db, "user", user.upiId);
			await getDoc(payerDocRef).then((doc) => {
				localStorage.setItem("user", JSON.stringify(doc.data()));
				setUserData(doc.data());
			});
		};
		fetchData();
	}, []);
	return (
		<div className=" bg-brand-backgroud2 drop-shadow p-20 rounded-2xl m-auto flex flex-col items-center justify-center space-y-5">
			{userData.upiId && (
				<>
					<QRCode
						className="rounded-2xl size-[70%]"
						value={userData.upiId}
					/>
					<Typography variant="h6">
						Your UPI ID: {userData.upiId}
					</Typography>
				</>
			)}
			<div className="flex flex-col items-center justify-center gap-4">
				<Typography variant="h4">
					A Generated QR Code for {userData.displayName} . Scan it to
					pay.
				</Typography>

				<Typography variant="h6">
					Your Current Balance In Wallet: ₹{userData.wallet}
				</Typography>
			</div>
		</div>
	);
}
