import clsx from "clsx";

export function MiniKonf(): JSX.Element {
	return (
		<div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-12 mt-16 mb-24 items-center">
			<div>
				<h2
					className="font-bold text-primary text-4xl sm:leading-6"
					style={{ marginLeft: "-1px" }}
				>
					Minikonferencia 11.17.&#8209;11.18.
				</h2>
				<p
					className="border-l-8 border-primary p-4 pb-16 text-lg relative"
					style={{
						borderLeftWidth: "7px",
					}}
				>
					<div className="text-2xl">Megnyílt a regisztráció!</div>
					<br />
					A Minikonferencián az informatika különböző területeiről hallhattok
					előadásokat izgalmas előadásokat. Az esemény célja, hogy megmutassa az
					érdeklődöknek az IT világ sokszínűségét, bővítse látókörüket.
					<br />
					<br />
					A konferencián a Simonyi Konferenciához képest hosszabb, mélyebb
					tudást átadó előadásokra számíthattok.
					<br />
					<br />
					Előadók hamarosan.
					<span
						className="rounded-full w-32 h-32 absolute transform -rotate-90 -z-1"
						style={{
							background:
								"linear-gradient(90deg, #7D2742 0%, #732741 9.41%, #50283E 48.05%, #3A293D 79.62%, #32293C 100%)",
							bottom: "1rem",
							right: "2rem",
						}}
					/>
					<span
						className="rounded-full w-48 h-48 absolute transform -rotate-90 -z-1"
						style={{
							background:
								"linear-gradient(90deg, #7D2742 0%, #732741 9.41%, #50283E 48.05%, #3A293D 79.62%, #32293C 100%)",
							bottom: "1rem",
							right: "5rem",
						}}
					/>
				</p>
			</div>
			<div style={{ height: "fit-content" }}>
				<a
					className={clsx(
						"border-primary border-2 p-1 m-4 lg:ml-48 block mx-auto",
						"w-minContent sm:w-fitContent",
					)}
					href="https://register.gotowebinar.com/register/25354049137631499"
				>
					<div
						className={clsx(
							" p-4 text-xl bg-secondary",
							"w-minContent sm:w-fitContent",
						)}
					>
						Jelentkezés
					</div>
				</a>
			</div>
		</div>
	);
}
