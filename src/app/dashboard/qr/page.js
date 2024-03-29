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
		const user = JSON.parse(localStorage.getItem("user"));
		setUserData(user);
		console.log(user);
	}, []);
	return (
		<div className=" bg-brand-backgroudTertiary drop-shadow p-20 rounded-2xl m-auto flex flex-col items-center justify-center space-y-5">
			{userData.upiId && (
				<>
					<QRCode
						className="rounded-2xl size-[70%]"
						value={userData.upiId}
					/>
					<Typography color="white" variant="h6">
						Your UPI ID: {userData.upiId}
					</Typography>
				</>
			)}
			<div className="flex flex-col items-center justify-center gap-4">
				<Typography color="white" variant="h4">
					A Generated QR Code for {userData.displayName} . Scan it to
					pay.
				</Typography>

				<Typography color="white" variant="h6">
					Your Current Balance In Wallet: ₹{userData.wallet}
				</Typography>
			</div>
		</div>
	);
}
