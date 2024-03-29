"use client";
import { useState, useRef } from "react";
import QrReader from "react-qr-scanner";

export default function UPI() {
	const qrScannerRef = useRef(null);
	const [scannedUserId, setScannedUserId] = useState("");
	const [showScanner, setShowScanner] = useState(true);
	const [confirmationMessage, setConfirmationMessage] = useState("");

	const handleScanError = (err) => {
		console.error(err);
		setConfirmationMessage("Error scanning QR Code. Please try again.");
	};

	const handleScanResult = (data) => {
		if (data) {
			setScannedUserId(data.text);
			setShowScanner(false);
			setConfirmationMessage("");
		}
	};

	return (
		<div>
			{showScanner && (
				<QrReader
					ref={qrScannerRef}
					delay={300}
					onError={handleScanError}
					onScan={handleScanResult}
					style={{ width: "100%" }}
					constraints={{
						audio: false,
						video: { facingMode: "environment" },
					}}
					legacyMode
				/>
			)}
			{!scannedUserId && (
				<div>
					<h1>Scanned User ID: {scannedUserId}</h1>
				</div>
			)}
		</div>
	);
}
