import Image from "next/image";
import Login from "@/components/login";
export default function Home() {
	return (
		<div className="flex flex-col justify-center items-center mx-auto min-h-screen w-screen md:w-full md:p-2 bg-[#fafafa] md:bg-brand-backgroudSecondary bgimgg">
			<Login></Login>
		</div>
	);
}
