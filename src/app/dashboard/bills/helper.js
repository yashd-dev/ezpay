export const getBase64 = (file) =>
	new Promise(function (resolve, reject) {
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject("Error: ", error);
	});

export async function fileToGenerativePart(file) {
	const base64EncodedDataPromise = new Promise((resolve) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result.split(",")[1]);
		reader.readAsDataURL(file);
	});

	return {
		inlineData: {
			data: await base64EncodedDataPromise,
			mimeType: file.type,
		},
	};
}
