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

export default function overview() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen((cur) => !cur);
	const [userData, setUserData] = useState({});
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		setUserData(user);
	}, []);

	let cards = [
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD3.png?alt=media&token=8194995c-eec0-4244-85bb-0c67326418bf",
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD2.png?alt=media&token=ad2568d9-df00-4d5b-be15-94668a514c1d",
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD1.png?alt=media&token=4547ca99-884c-4a70-a4c2-4700c50b53ec",
	];

	async function addAmountWallet(e) {
		e.preventDefault();
		console.log(userData.upiID);
		const userDoc = doc(db, "user", userData.upiId);

		const bill = {
			name: "Recharging Wallet",
			amount: parseInt(e.target.amount.value),
		};

		await updateDoc(userDoc, {
			wallet: increment(parseInt(e.target.amount.value)),
			transaction: [...userData.transaction, bill],
		});
		await getDoc(userDoc).then((doc) => {
			localStorage.setItem("user", JSON.stringify(doc.data()));
			setUserData(doc.data());
		});
	}
	return (
		<>
			<div className=" w-full min-h-screen bg-brand-background grid justify-center place-items-center items-center grid-cols-1 md:grid-cols-2  p-5 md:p-3 gap-5 mt-[15vh] md:mt-0">
				<div className=" bg-white p-6 md:p-14 rounded-2xl drop-shadow  w-full h-fit space-y-5 overflow-hidden border">
					<Typography
						variant="h4"
						className="text-2xl md:text-3xl font-bold"
					>
						Your Cards
					</Typography>
					<div>
						{userData?.cards && userData.cards.length > 1 ? (
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
								{userData.cards.map((card, index) => (
									<div
										className="relative h-full w-full"
										key={index}
									>
										<img
											src={card.image}
											alt={`image ${index + 1}`}
											className="h-full w-full object-fill"
										/>

										<div className="absolute inset-0 grid h-full w-full place-items-center "></div>
										<h3 className="absolute inset-0 top-10 left-6 font-bold md:text-lg font-mono text-white md:tracking-widest ">
											{card.bankName}
										</h3>
										<h3 className="absolute top-[45%] right-16 font-bold md:text-xl font-mono text-white md:tracking-[0.5rem] ">
											{card.balance}
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
				<div className=" bg-white p-6 md:p-14 rounded-2xl drop-shadow w-full h-full row-span-2 border space-y-20">
					<div className=" space-y-8">
						<Typography variant="h4">Your Wallet</Typography>

						<Typography variant="h3" className="text-brand-accent">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								className="inline size-14 mr-5"
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
					<div className=" space-y-8">
						<Typography variant="h4">
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
							<Typography variant="h6" color="red">
								No Recent Bills
							</Typography>
						)}
					</div>
				</div>
				<div className=" bg-white p-6 md:p-14 rounded-2xl drop-shadow w-full min-h-full border space-y-5">
					<Typography variant="h4">Your Recent Bills</Typography>
					<div className=" space-y-4">
						{userData.bills && userData.bills.length > 1 ? (
							<div className=" space-y-4">
								{userData.bills.slice(-8).map((bill, index) => (
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
							<Typography variant="h6" color="blue">
								<Link href="/dashboard/bills">
									No Recent Bills Found, Add Some!
								</Link>
							</Typography>
						)}
					</div>{" "}
				</div>
				<div className=" bg-white p-6 rounded-2xl drop-shadow w-full h-full md:hidden">
					<h1>Your Cards</h1>
				</div>
			</div>
		</>
	);
}
