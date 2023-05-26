"use client";
import { Categories, NewProductsProps } from "@/app/types";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Spinner from "./spinner";
import { ItemInterface, ReactSortable } from "react-sortablejs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductForm({
	_id,
	name: currentName,
	description: currentDescription,
	price: currentPrice,
	images: currentImages,
	category: currentCategory,
	speed: currentSpeed,
	range: currentRange,
	battery: currentBattery,
	weight: currentWeight,
	bestSeller: currentBestSeller,
	offer: currentOffer,
	offerPrice: currentOfferPrice,
	camera: currentCamera,
	waterProof: currentWaterProof,
	skillLevel: currentSkillLevel,
	ambient: currentAmbient,
	followMode: currentFollowMode,
	autoReturn: currentAutoReturn,
}: NewProductsProps) {
	const [name, setName] = useState(currentName || "");
	const [description, setDescription] = useState(currentDescription || "");
	const [category, setCategory] = useState(currentCategory || "");
	const [speed, setSpeed] = useState(currentSpeed || "");
	const [range, setRange] = useState(currentRange || "");
	const [battery, setBattery] = useState(currentBattery || "");
	const [camera, setCamera] = useState(currentCamera || "");
	const cam = ["No camera", "720p", "1080p", "2K", "4K", "8K"];
	const [waterProof, setWaterProof] = useState(currentWaterProof || "");
	const waterP = ["No", "Yes"];
	const [skillLevel, setSkillLevel] = useState(currentSkillLevel || "");
	const skillL = ["Beginner", "Semi-Professional", "Professional"];
	const [ambient, setAmbient] = useState(currentAmbient || "");
	const amb = ["Indoor", "Outdoor"];
	const [followMode, setFollowMode] = useState(currentFollowMode || "");
	const followM = ["No", "Yes"];
	const [autoReturn, setAutoReturn] = useState(currentAutoReturn || "");
	const autoR = ["No", "Yes"];
	const [weight, setWeight] = useState(currentWeight || "");
	const [bestSeller, setBestSeller] = useState(currentBestSeller || false);
	const [offer, setOffer] = useState(currentOffer || false);
	const [offerPrice, setOfferPrice] = useState(currentOfferPrice || "");
	const [price, setPrice] = useState(currentPrice || "");
	const [images, setImages] = useState(currentImages || [])
	const [goToProducts, setGoToProducts] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [categories, setCategories] = useState<Categories[]>([]);
	const router = useRouter();

	useEffect(() => {
		axios.get("/api/categories").then((response) => {
			setCategories(response.data);
		});
	}, []);

	function goBack() {
		router.push("/admin/products");
	}

	async function saveProduct(
		event: FormEvent<HTMLFormElement>
	): Promise<void> {
		event.preventDefault();

		const data = {
			name,
			description,
			price,
			images,
			category,
			speed,
			range,
			camera,
			battery,
			waterProof,
			skillLevel,
			ambient,
			followMode,
			autoReturn,
			weight,
			bestSeller,
			offer,
			offerPrice,
		};
		{
			if (
				ambient !== "" &&
				category !== "" &&
				camera !== "" &&
				waterProof !== "" &&
				skillLevel !== "" &&
				followMode !== "" &&
				autoReturn !== ""
			) {
				if (_id) {
					await axios.put("/api/products", { ...data, _id });
					setGoToProducts(true);
				} else {
					try {
						await axios.post("/api/products", data);
					} catch (error) {
						console.log("productForm page error:", error);
					}
					setGoToProducts(true);
				}
			} else {
				toast.error("Please select required fields");
			}
		}
	}
	if (goToProducts) {
		router.push("/admin/products");
	}

	async function uploadImages(e: React.ChangeEvent<HTMLInputElement>) {
		const files = e.target?.files;
		if (files && files?.length > 0) {
			setIsUploading(true);
			const data = new FormData();
			Array.from(files).forEach((file) => data.append("file", file));

			try {
				const res = await axios.post("/api/upload", data);
				setImages((oldImages) => {
					return [...oldImages, ...res.data.links];
				});

				console.log(res.data);
			} catch (error) {
				console.log("Error uploading images:", error);
			}
			setIsUploading(false);
		}
	}
	function updateImagesOrder(newOrder: ItemInterface[]): void {
		const updatedImages = newOrder.map((item) => item.link);
		setImages(updatedImages);
	}

	return (
		<>
			<div className=" items-center px-2 m-4 max-w-[500px] ml-auto mr-auto">
				<form onSubmit={saveProduct}>
					<label htmlFor="product">
						<h2>Product name</h2>
						<input
							type="text"
							id="product"
							value={name}
							placeholder="Product name"
							onChange={(event) => setName(event.target.value)}
							aria-label="Product name"
							aria-required="true"
							required
						/>
					</label>
					<div className="flex gap-16">
						<div>
							<label className="my-2">
								<h2>Category</h2>
							</label>
							<div className="mb-2">
								<select
									className="text-black"
									onChange={(event) =>
										setCategory(event.target.value)
									}
									value={category}
								>
									<option>Select</option>
									{categories.length > 0 &&
										categories.map((category) => (
											<option
												key={category._id}
												value={category._id}
											>
												{category.name}
											</option>
										))}
								</select>
							</div>
							<label className="my-2">
								<h2>Camera</h2>
							</label>
							<div className="mb-2">
								<select
									className="text-black"
									onChange={(event) =>
										setCamera(event.target.value)
									}
									value={camera}
									required
								>
									<option>Select</option>
									{cam.length > 0 &&
										cam.map((camera) => (
											<option key={camera} value={camera}>
												{camera}
											</option>
										))}
								</select>
							</div>
							<label className="my-2">
								<h2>Water Proof</h2>
							</label>
							<div className="mb-2">
								<select
									required
									className="text-black"
									onChange={(event) =>
										setWaterProof(event.target.value)
									}
									value={waterProof}
								>
									<option>Select</option>
									{waterP.length > 0 &&
										waterP.map((waterProof) => (
											<option
												key={waterProof}
												value={waterProof}
											>
												{waterProof}
											</option>
										))}
								</select>
							</div>
						</div>
						<div>
							<label className="my-2">
								<h2>Ambient</h2>
							</label>
							<div className="mb-2">
								<select
									className="text-black"
									onChange={(event) =>
										setAmbient(event.target.value)
									}
									value={ambient}
									required
								>
									<option>Select</option>
									{amb.length > 0 &&
										amb.map((ambient) => (
											<option
												key={ambient}
												value={ambient}
											>
												{ambient}
											</option>
										))}
								</select>
							</div>
							<label className="my-2">
								<h2>Follow Mode</h2>
							</label>
							<div className="mb-2">
								<select
									className="text-black"
									onChange={(event) =>
										setFollowMode(event.target.value)
									}
									value={followMode}
									required
								>
									<option>Select</option>
									{followM.length > 0 &&
										followM.map((followMode) => (
											<option
												key={followMode}
												value={followMode}
											>
												{followMode}
											</option>
										))}
								</select>
							</div>
							<label className="my-2">
								<h2>Skill Level</h2>
							</label>
							<div className="mb-2">
								<select
									className="text-black"
									onChange={(event) =>
										setSkillLevel(event.target.value)
									}
									value={skillLevel}
									required
								>
									<option>Select</option>
									{skillL.length > 0 &&
										skillL.map((skillLevel) => (
											<option
												key={skillLevel}
												value={skillLevel}
											>
												{skillLevel}
											</option>
										))}
								</select>
							</div>
						</div>
					</div>

					<label className="my-2">
						<h2>Auto Return</h2>
					</label>
					<div className="mb-2">
						<select
							className="text-black"
							onChange={(event) =>
								setAutoReturn(event.target.value)
							}
							value={autoReturn}
							required
						>
							<option>Select</option>
							{autoR.length > 0 &&
								autoR.map((autoReturn) => (
									<option key={autoReturn} value={autoReturn}>
										{autoReturn}
									</option>
								))}
						</select>
					</div>
					<label htmlFor="speed">
						<h2>Speed</h2>
						<input
							type="number"
							id="speed"
							value={speed}
							placeholder="Speed in mph"
							onChange={(event) => setSpeed(event.target.value)}
							aria-label="Speed"
							aria-required="true"
							required
						/>
					</label>
					<label htmlFor="battery">
						<h2>Battery</h2>
						<input
							type="number"
							id="battery"
							value={battery}
							placeholder="battery in minutes"
							onChange={(event) => setBattery(event.target.value)}
							aria-label="battery"
							aria-required="true"
							required
						/>
					</label>
					<label htmlFor="weight">
						<h2>Weight</h2>
						<input
							type="number"
							id="weight"
							value={weight}
							placeholder="weight in kilos"
							onChange={(event) => setWeight(event.target.value)}
							aria-label="weight"
							aria-required="true"
						/>
					</label>
					<label htmlFor="range">
						<h2>Range</h2>
						<input
							type="number"
							id="range"
							value={range}
							placeholder="range in miles"
							onChange={(event) => setRange(event.target.value)}
							aria-label="range"
							aria-required="true"
							required
						/>
					</label>
					<label htmlFor="description">
						<h2>Description</h2>
						<textarea
							rows={5}
							id="description"
							value={description}
							placeholder="Description"
							onChange={(event) =>
								setDescription(event.target.value)
							}
							aria-label="Description"
						></textarea>
					</label>
					<div className="flex gap-10 pb-4">
						<label htmlFor="bestSeller" className="flex">
							<h2>Best Seller</h2>
							<input
								type="checkbox"
								id="bestSeller"
								checked={bestSeller}
								className="w-4 mx-4"
								placeholder="bestSeller in kilos"
								onChange={(event) =>
									setBestSeller(event.target.checked)
								}
								aria-label="bestSeller"
								aria-required="true"
							/>
						</label>
						<label htmlFor="offer" className="flex">
							<h2>Offer</h2>
							<input
								type="checkbox"
								id="offer"
								className="w-6 mx-4"
								checked={offer}
								placeholder="offer in kilos"
								onChange={(event) =>
									setOffer(event.target.checked)
								}
								aria-label="offer"
								aria-required="true"
							/>
							<input
								type="number"
								id="offerprice"
								value={offerPrice}
								placeholder="Offer Price"
								onChange={(event) =>
									setOfferPrice(event.target.value)
								}
								aria-label="Offer Price"
								aria-required="true"
							/>
						</label>
					</div>
					<label>
						<h2>Photos</h2>
					</label>
					<div className="flex flex-wrap gap-2 h-auto  ">
						<ReactSortable
							list={images.map((link, index) => ({
								id: index.toString(),
								link,
							}))}
							setList={updateImagesOrder}
							className="flex flex-wrap gap-1"
						>
							{images?.length > 0 &&
								images?.map((link) => (
									<div
										key={link}
										className="h-24 w-24 relative  "
									>
										<Image
											src={link}
											alt="test"
											className="rounded-md absolute "
											loading="lazy"
											fill={true}
										/>
									</div>
								))}
						</ReactSortable>
						{isUploading && (
							<div className="flex items-center">
								<Spinner />
							</div>
						)}
						<label className="w-20 h-24 border border-gray-400 bg-gray-700 flex text-gray-400 rounded-md cursor-pointer">
							<div className="w-full h-full flex justify-center items-center">
								<div className="text-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 m-auto"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
										/>
									</svg>
									<h3>Upload</h3>
								</div>
							</div>
							<input
								type="file"
								className="hidden"
								onChange={uploadImages}
							/>
						</label>
					</div>
					<label htmlFor="price">
						<h2>Price</h2>

						<input
							type="number"
							id="price"
							value={price}
							placeholder="Price"
							onChange={(event) => setPrice(event.target.value)}
							aria-label="Price"
							aria-required="true"
							required
						/>
					</label>
					<ToastContainer
						position="top-right"
						autoClose={3000}
						hideProgressBar={false}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss
						draggable
						pauseOnHover
						theme="dark"
					/>
					<button type="submit" className="btn-primary my-4 mr-4">
						Save
					</button>
				</form>
				<div>
					<button onClick={goBack} className="btn-primary m-auto">
						Back
					</button>
				</div>
			</div>
		</>
	);
}
