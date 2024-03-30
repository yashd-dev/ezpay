"use client";
import {
	Typography,
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Input,
} from "@material-tailwind/react";
import React from "react";
import { useState, useRef, useEffect } from "react";
import QrReader from "react-qr-scanner";
import { doc, getDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Scanner } from "@yudiel/react-qr-scanner";

import dynamic from "next/dynamic";

export default function UPI() {
	const qrScannerRef = useRef("");
	const [scannedUserId, setScannedUserId] = useState("");
	const [showScanner, setShowScanner] = useState(true);
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [error, setError] = useState("");
	const [payee, setPayee] = useState({});
	const [userData, setUserData] = useState({});

	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		setUserData(user);
	}, []);

	const handleOpen = () => setOpen(!open);

	const handleScanError = (err) => {
		console.error(err);
		setConfirmationMessage("Error scanning QR Code. Please try again.");
	};

	const handleScanResult = (data) => {
		if (data) {
			const user = JSON.parse(localStorage.getItem("user"));
			setUserData(user);
			console.log(user);

			setShowScanner(false);
			setConfirmationMessage("");

			qrScannerRef.current.stop();
			fetchUserDetails(data.text);
		}
	};

	const fetchUserDetails = async (uid) => {
		const scannedUserId = uid;
		const docRef = doc(db, "user", scannedUserId);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			console.log("Document data:", docSnap.data());
			setPayee(docSnap.data());
			setError("");
			setScannedUserId(scannedUserId);
		} else {
			setError("User not found. Please scan a valid QR Code.");
		}
	};

	const handlePayment = async (e) => {
		e.preventDefault();
		const amount = e.target.amount.value;
		const user = JSON.parse(localStorage.getItem("user"));
		setUserData(user);
		console.log("local storage se", user);

		// Add payment logic here
		if (amount > 0) {
			if (user.wallet >= amount) {
				const payeeDocRef = doc(db, "user", scannedUserId);
				const payerDocRef = doc(db, "user", userData.uid);

				await updateDoc(payeeDocRef, {
					wallet: increment(amount),
				});
				await updateDoc(payerDocRef, {
					wallet: increment(-amount),
				});
				await getDoc(payerDocRef).then((doc) => {
					localStorage.setItem("user", JSON.stringify(doc.data()));
					setUserData(doc.data());
				});
				await getDoc(payeeDocRef).then((doc) => {
					setPayee(doc.data());
				});

				handleOpen();
			} else {
				setError("Insufficient Balance");
			}
		} else {
			setError("Enter a valid amount to pay");
		}
	};

	return (
		<div className=" bg-white rounded-2xl p-10">
			{showScanner && (
				<>
					<Typography variant="h4" className=" pb-5">
						Scan the UPI QR Code To Make Payment
					</Typography>
					<QrReader
						onResult={handleScanResult}
						style={{ width: "100%" }}
						constraints={{
							audio: false,
							video: { facingMode: "environment" },
						}}
						ref={qrScannerRef}
					/>
				</>
			)}
			{scannedUserId && (
				<div>
					<Typography>
						{error && <h1>{error}</h1>}
						{confirmationMessage && <h1>{confirmationMessage}</h1>}
					</Typography>
					<Typography variant="h4" className=" pb-5">
						Scan Successful
					</Typography>
					<Typography variant="h1">
						Scanned User ID: {scannedUserId}
					</Typography>
					<Typography variant="h1">
						Payee Name: {payee.displayName}{" "}
					</Typography>
					<Typography variant="h1">
						Payee Email: {payee.email}{" "}
					</Typography>
					<Button color="blue" onClick={handleOpen}>
						Proceed to Payment
					</Button>
					<Dialog open={open} handler={handleOpen}>
						<DialogHeader toggler={handleOpen}>
							Confirm Payment
						</DialogHeader>
						<form onSubmit={handlePayment}>
							<DialogBody>
								<Typography>
									Enter the amount you want to pay to{" "}
									{payee.displayName}?
								</Typography>
								<Input
									type="number"
									placeholder="Amount"
									name="amount"
								/>
							</DialogBody>
							<DialogFooter>
								<Button
									color="red"
									buttonType="link"
									onClick={handleOpen}
									ripple="dark"
								>
									Cancel
								</Button>

								<Button
									color="blue"
									type="submit"
									ripple="light"
								>
									Confirm Payment
								</Button>
							</DialogFooter>
						</form>
					</Dialog>
				</div>
			)}
		</div>
	);
}
