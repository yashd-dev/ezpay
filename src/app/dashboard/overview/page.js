"use client";
import {
	Carousel,
	Button,
	Dialog,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Input,
	Checkbox,
} from "@material-tailwind/react";
import Link from "next/link";
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
import Image from "next/image";

export default function Overview() {
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
	let cards = [
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD3.png?alt=media&token=8194995c-eec0-4244-85bb-0c67326418bf",
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD2.png?alt=media&token=ad2568d9-df00-4d5b-be15-94668a514c1d",
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD1.png?alt=media&token=4547ca99-884c-4a70-a4c2-4700c50b53ec",
	];

	const cardData = [
		{
			bankName: "HDFC Bank",
			cardNumber: 1234567890,
			expiry: "12/25",
			balance: 10000,
			img: 1,
		},
		{
			bankName: "Axis Bank",
			cardNumber: 9876543210,
			expiry: "10/24",
			balance: 7500,
			img: 2,
		},
		{
			bankName: "ICICI Bank",
			cardNumber: 2468109753,
			expiry: "06/27",
			balance: 12500,
			img: 3,
		},
		{
			bankName: "State Bank of India",
			cardNumber: 1357924680,
			expiry: "09/26",
			balance: 5000,
			img: 1,
		},
		{
			bankName: "Citibank",
			cardNumber: 8642097531,
			expiry: "03/28",
			balance: 15000,
			img: 2,
		},
		{
			bankName: "Kotak Mahindra Bank",
			cardNumber: 3692581470,
			expiry: "07/25",
			balance: 8000,
			img: 3,
		},
	];

	async function addAmountWallet(e) {
		e.preventDefault();
		console.log(parseInt(e.target.amount.value));
		const userDoc = doc(db, "user", userData.upiId);

		const bill = {
			name: "Recharging Wallet",
			amount: parseInt(e.target.amount.value),
		};

		const transaction = userData.transaction || []; // Add this line to handle the case when userData.transaction is undefined

		await updateDoc(userDoc, {
			wallet: increment(parseInt(e.target.amount.value)),
			transaction: [...transaction, bill],
		});
		await getDoc(userDoc).then((doc) => {
			console.log(doc.data());
			localStorage.setItem("user", JSON.stringify(doc.data()));
			setUserData(doc.data());
		});
	}
	return (
		<>
			<div className=" w-full min-h-screen bg-brand-background grid justify-center place-items-center items-center grid-cols-1 md:grid-cols-2  p-5 md:p-3 gap-5 mt-[5vh] md:mt-5">
				<div className=" bg-white p-6 md:p-14 rounded-2xl drop-shadow  w-full h-fit space-y-5 overflow-hidden border">
					<Typography
						variant="h4"
						className="text-2xl md:text-3xl font-bold"
					>
						Your Cards
					</Typography>
					<div>
						{cardData.length > 1 ? (
							<Carousel
								className="rounded-2xl"
								navigation={({
									setActiveIndex,
									activeIndex,
									length,
								}) => (
									<div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
										{new Array(length)
											.fill("")
											.map((_, i) => (
												<span
													key={i}
													className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
														activeIndex === i
															? "w-8 bg-white"
															: "w-4 bg-white/50"
													}`}
													onClick={() =>
														setActiveIndex(i)
													}
												/>
											))}
									</div>
								)}
							>
								{cardData.map((card, index) => (
									<div
										className="relative h-full w-full"
										key={index}
									>
										<img
											src={cards[card.img - 1]}
											alt={`image ${index + 1}`}
											className="h-full w-full object-fill"
										/>

										<div className="absolute inset-0 grid h-full w-full place-items-center "></div>
										<h3 className="absolute inset-0 top-10 left-6 font-bold md:text-lg font-mono text-white md:tracking-widest ">
											{card.bankName}
										</h3>
										<h3 className="absolute top-[45%] right-16 font-bold md:text-xl font-mono text-white md:tracking-[0.5rem] ">
											₹ {card.balance}
										</h3>
										<h3 className="absolute  bottom-10 left-6 font-bold  font-mono md:text-lg text-white md:tracking-widest ">
											**** ****
											{String(card.cardNumber).slice(-4)}
										</h3>
										<h3 className="absolute  bottom-10 right-[20%] md:right-32 opacity-45 md:text-lg font-bold font-mono text-white md:tracking-widest ">
											{card.expiry}
										</h3>
									</div>
								))}
							</Carousel>
						) : (
							<div className="relative h-full w-full rounded-2xl">
								<img
									src="https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD1.png?alt=media&token=4547ca99-884c-4a70-a4c2-4700c50b53ec"
									alt="image 1"
									className="h-full w-full object-fill rounded-2xl brightness-90"
								/>
								<div className="absolute inset-0 grid h-full w-full place-items-center "></div>
								<h3 className="absolute inset-0 top-[40%] left-6 font-bold md:text-lg font-mono text-white md:tracking-widest ">
									You have no cards, Add one!
								</h3>
							</div>
						)}
					</div>
				</div>
				<div className=" bg-white p-6 md:p-14 md:py-24 rounded-2xl drop-shadow w-full h-full flex flex-col justify-around row-span-2 border space-y-20 order-first">
					<div className=" space-y-8">
						<span className=" border border-brand-border  p-3 rounded-xl block bg-brand-background">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 256 256"
								className=" fill-brand-accent mr-4 inline-block"
							>
								<path d="M230.33,141.06a24.43,24.43,0,0,0-21.24-4.23l-41.84,9.62A28,28,0,0,0,140,112H89.94a31.82,31.82,0,0,0-22.63,9.37L44.69,144H16A16,16,0,0,0,0,160v40a16,16,0,0,0,16,16H120a7.93,7.93,0,0,0,1.94-.24l64-16a6.94,6.94,0,0,0,1.19-.4L226,182.82l.44-.2a24.6,24.6,0,0,0,3.93-41.56ZM16,160H40v40H16Zm203.43,8.21-38,16.18L119,200H56V155.31l22.63-22.62A15.86,15.86,0,0,1,89.94,128H140a12,12,0,0,1,0,24H112a8,8,0,0,0,0,16h32a8.32,8.32,0,0,0,1.79-.2l67-15.41.31-.08a8.6,8.6,0,0,1,6.3,15.9ZM164,96a36,36,0,0,0,5.9-.48,36,36,0,1,0,28.22-47A36,36,0,1,0,164,96Zm60-12a20,20,0,1,1-20-20A20,20,0,0,1,224,84ZM164,40a20,20,0,0,1,19.25,14.61,36,36,0,0,0-15,24.93A20.42,20.42,0,0,1,164,80a20,20,0,0,1,0-40Z"></path>
							</svg>
							<Typography variant="h6" className=" inline-block">
								Make Payment
							</Typography>
						</span>
						<span className=" border border-brand-border bg-brand-background hover:drop-shadow  p-3 rounded-xl mt-2 block">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="32"
								height="32"
								viewBox="0 0 256 256"
								className=" fill-brand-accent mr-4 inline-block"
							>
								<path d="M104,40H56A16,16,0,0,0,40,56v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,104,40Zm0,64H56V56h48v48Zm0,32H56a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V152A16,16,0,0,0,104,136Zm0,64H56V152h48v48ZM200,40H152a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,64H152V56h48v48Zm-64,72V144a8,8,0,0,1,16,0v32a8,8,0,0,1-16,0Zm80-16a8,8,0,0,1-8,8H184v40a8,8,0,0,1-8,8H144a8,8,0,0,1,0-16h24V144a8,8,0,0,1,16,0v8h24A8,8,0,0,1,216,160Zm0,32v16a8,8,0,0,1-16,0V192a8,8,0,0,1,16,0Z"></path>
							</svg>
							<Typography variant="h6" className=" inline-block">
								See Your QR Code
							</Typography>
						</span>
					</div>
					<div className=" size-1 w-full border-b border-brand-border"></div>

					<div className=" space-y-8">
						<span>
							{" "}
							<Typography variant="h4">Your Wallet</Typography>
						</span>

						<Typography variant="h5" className="text-brand-accent">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="inline size-10 mr-5"
								viewBox="0 0 256 256"
							>
								<path d="M216,64H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,56V184a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64Zm0,128H56a8,8,0,0,1-8-8V78.63A23.84,23.84,0,0,0,56,80H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,132Z"></path>
							</svg>{" "}
							₹ {userData.wallet}
						</Typography>
						<button
							onClick={handleOpen}
							className=" flex flex-row justify-center items-center mt-10"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className=" fill-current text-brand-backgroudTertiary size-8 mr-4"
								viewBox="0 0 256 256"
							>
								<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
							</svg>
							Add Money
						</button>
						<Dialog
							size="xs"
							open={open}
							handler={handleOpen}
							className="bg-transparent shadow-none"
						>
							<Card className="mx-auto w-full max-w-[30rem]">
								<form onSubmit={addAmountWallet}>
									<CardBody className="flex flex-col gap-4">
										<Typography
											variant="h4"
											color="blue-gray"
										>
											Enter Amount To Recharge From Your
											Bank!
										</Typography>

										<Typography
											className="-mb-2"
											variant="h6"
										>
											Your Amount
										</Typography>
										<Input
											label="Amount"
											name="amount"
											type="number"
											size="lg"
										/>
									</CardBody>
									<CardFooter className="pt-0">
										<Button
											onClick={handleOpen}
											type="submit"
										>
											Recharge Now!
										</Button>
									</CardFooter>
								</form>
							</Card>
						</Dialog>
					</div>
					<div className=" size-1 w-full border-b border-brand-border"></div>

					<div className=" space-y-8">
						<Typography variant="h5">
							Recent Transactions
						</Typography>
						{userData.transaction ? (
							<div className=" space-y-4">
								{userData.transaction
									.slice(-8)
									.map((bill, index) => (
										<div
											key={index}
											className=" flex flex-row justify-between items-center space-x-4"
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
				<div className=" bg-white p-6 md:p-14 rounded-2xl drop-shadow w-full min-h-full border space-y-5">
					<span className=" flex w-full justify-between">
						<Typography variant="h4">Your Recent Bills</Typography>
						<Link
							href="/dashboard//bills"
							className=" hover:underline"
						>
							{" "}
							Show All{" "}
						</Link>
					</span>

					<div className=" space-y-3 md:flex md:flex-row md:gap-5  w-full md:overflow-x-scroll">
						{userData.bills &&
							userData.bills.slice(-2).map((bill, index) => (
								<div
									key={`bill${index}`}
									className=" bg-brand-backgroudTertiary p-3 rounded-2xl space-y-3 text-brand-background "
								>
									<Image
										src={bill.image}
										alt="Bill"
										className="rounded-2xl object-cover max-h-[200px]"
										width={300}
										height={300}
									/>
									<Typography variant="h6">
										Bill Number {index + 1}
									</Typography>
									<Typography variant="h6">
										Category: {bill.category}{" "}
									</Typography>
									<Typography variant="h6">
										Amount: {bill.amount}{" "}
									</Typography>
									{/* Add any additional bill information or components here */}
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
