import Image from "next/image";
import Login from "@/components/login";
export default function Home() {
	return (
		<>
			<div className="flex flex-col justify-center items-start mx-auto min-h-screen w-screen md:w-full md:p-2  bg-transparent ">
				<div className=" gradient-bg w-screen h-screen -z-10"></div>

				<Login></Login>
			</div>
		</>
	);
}
