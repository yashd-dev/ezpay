"use client";
import { Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { doc , getDoc} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Transaction() {
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
		<div className=" flex flex-col items-center justify-center ">
			<div className=" space-y-12 bg-white rounded-2xl p-14 min-w-[30vw]">
				<Typography variant="h3">Recent Transactions</Typography>
				{userData.transaction ? (
					<div className=" space-y-4">
						<div className=" flex flex-row gap-20 justify-between items-center space-x-4 border-b">
							<Typography variant="h6" color="blue" textGradient>
								Description
							</Typography>
							<Typography variant="h6" color="blue" textGradient>
								Amount
							</Typography>
						</div>
						{userData.transaction.map((bill, index) => (
							<div
								key={index}
								className=" flex flex-row gap-20 justify-between items-center space-x-4"
							>
								<Typography variant="h6">
									{bill.name}
								</Typography>
								<Typography variant="h6">
									₹ {bill.amount}
								</Typography>
							</div>
						))}
					</div>
				) : (
					<Typography variant="h6" color="red" textGradient>
						No Recent Bills :(
					</Typography>
				)}
			</div>
		</div>
	);
}
