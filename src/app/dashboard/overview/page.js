"use client";
import { Carousel, Typography, Button } from "@material-tailwind/react";

export default function overview() {
	let cards = [
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD3.png?alt=media&token=8194995c-eec0-4244-85bb-0c67326418bf",
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD2.png?alt=media&token=ad2568d9-df00-4d5b-be15-94668a514c1d",
		"https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD1.png?alt=media&token=4547ca99-884c-4a70-a4c2-4700c50b53ec",
	];
	return (
		<>
			<div className=" bg-gray-100 p-20 rounded-2xl drop-shadow w-full h-full space-y-5 overflow-hidden">
				<Typography variant="h3" className=" font-bold">
					Your Cards
				</Typography>
				<div>
					<Carousel className="rounded-2xl">
						<div className="relative h-full w-full">
							<img
								src="https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD3.png?alt=media&token=8194995c-eec0-4244-85bb-0c67326418bf"
								alt="image 1"
								className="h-full w-full object-fill"
							/>
							<div className="absolute inset-0 grid h-full w-full place-items-center "></div>
							<h3 className="absolute inset-0 top-10 left-6 font-bold text-lg font-mono text-white tracking-widest ">
								HDFC Bank
							</h3>
							<h3 className="absolute top-32 right-16 font-bold text-xl font-mono text-white tracking-[0.5rem] ">
								$10,0000.90
							</h3>
							<h3 className="absolute  bottom-10 left-6 font-bold  font-mono text-lg text-white tracking-widest ">
								**** **** **** 1234
							</h3>
							<h3 className="absolute  bottom-10 right-40 opacity-45 text-lg font-bold font-mono text-white tracking-widest ">
								5/30
							</h3>
						</div>
						<div className="relative h-full w-full">
							<img
								src="https://firebasestorage.googleapis.com/v0/b/digiwallet-yashd.appspot.com/o/assets%2FCARD3.png?alt=media&token=8194995c-eec0-4244-85bb-0c67326418bf"
								alt="image 1"
								className="h-full w-full object-fill"
							/>
							<div className="absolute inset-0 grid h-full w-full place-items-center "></div>
							<h3 className="absolute inset-0 top-10 left-6 font-bold z-10 text-lg font-mono text-white tracking-widest ">
								HDFC Bank
							</h3>
							<h3 className="absolute top-32 right-16 font-bold text-xl z-10 font-mono text-white tracking-[0.5rem] ">
								$10,0000.90
							</h3>
							<h3 className="absolute  bottom-10 left-6 font-bold z-10 font-mono text-lg text-white tracking-widest ">
								**** **** **** 1234
							</h3>
							<h3 className="absolute  bottom-10 right-40 opacity-45 text-lg font-bold z-10 font-mono text-white tracking-widest ">
								5/30
							</h3>
						</div>
					</Carousel>
				</div>
			</div>
			<div className=" bg-gray-100 p-20 rounded-2xl drop-shadow w-full h-full  row-span-2">
				<h1>Your Cards</h1>
			</div>
			<div className=" bg-gray-100 p-20 rounded-2xl drop-shadow w-full h-full">
				<h1>Your Cards</h1>
			</div>
		</>
	);
}
