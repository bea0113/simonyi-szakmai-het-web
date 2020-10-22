import "firebase/database";

import clsx from "clsx";
import * as firebase from "firebase/app";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import type { Styles } from "react-select";
import Select from "react-select/";
import CreatableSelect from "react-select/creatable";
import { useToasts } from "react-toast-notifications";

import { Input } from "./Input";

type FormValuesType = {
	name: string;
	email: string;
	university?: string;
	startYear?: number;
	team: string;
	job?: string;
	workplace?: string;
};

export function HackathonForm(): JSX.Element {
	const [onlineTeamNames, setOnlineTeamNames] = React.useState<
		Array<{ value: string; label: string }>
	>();
	const [occupation, setOccupation] = React.useState<string>("egyetemista");

	const { register, handleSubmit, control, errors, setValue } = useForm<
		FormValuesType
	>();
	const { addToast } = useToasts();

	React.useEffect(() => {
		const tempTeamNames: Array<{ value: string; label: string }> = [];
		firebase
			.database()
			.ref("/applications/test")
			.on("value", (snapshot) => {
				snapshot.forEach((element) => {
					const tempTeamName = element.val().team;
					if (typeof tempTeamName === "string")
						tempTeamNames.push({ value: tempTeamName, label: tempTeamName });
				});
				// console.log(tempTeamNames);
				setOnlineTeamNames(tempTeamNames);
			});
		return () => {};
	}, []);

	React.useEffect(() => {
		register("team");
		return () => {};
	}, [register]);

	function reply(error: Error | null) {
		if (error) {
			addToast(<p className="text-xl">{error.message}</p>, {
				appearance: "error",
			});
		} else {
			addToast(<p className="text-xl">Sikeres jelentkezés!</p>, {
				appearance: "success",
			});
		}
	}

	function onSubmit(data: FormValuesType) {
		// console.log(data);
		firebase.database().ref("/applications/test").push(data, reply);
	}

	const selectStyle: Partial<Styles> = {
		control: (provided) => ({
			...provided,
			backgroundColor: "transparent",
			border: "none",
		}),
		singleValue: (provided) => ({
			...provided,
			color: "#e5e5e5",
		}),
		input: (provided) => ({
			...provided,
			color: "#e5e5e5",
		}),
		menuList: (provided) => ({
			...provided,
			backgroundColor: "#32293C",
		}),
		option: (provided, state) => {
			const color = "#e5e5e5";
			const backgroundColor = state.isFocused ? "#ED3A3C" : "#32293C";
			return { ...provided, color, backgroundColor };
		},
		placeholder: (provided) => ({
			...provided,
			color: "#a0aec0",
		}),
	};

	return (
		<form
			id="jelentkezes"
			onSubmit={handleSubmit(onSubmit)}
			className="grid grid-cols-2 w-full mb-16"
		>
			<Input
				type="text"
				placeholder="Teljes név*"
				name="name"
				ref={register({ required: true, maxLength: 255 })}
				error={errors.name}
				errorElement="Kérjük add meg a teljes neved"
			/>

			<Input
				type="text"
				placeholder="Email*"
				name="email"
				ref={register({
					required: true,
					pattern: /^\S+@\S+$/i,
					maxLength: 255,
				})}
				error={errors.email}
				errorElement="Kérjük add meg az email címed"
			/>

			<CreatableSelect
				isClearable
				options={onlineTeamNames}
				placeholder="Csapatnév*"
				styles={selectStyle}
				className="col-span-2 w-full bg-transparent mt-3 mb-1 text-lg border-b-2 border-primary italic"
				onChange={(e) => {
					if (e)
						// @ts-expect-error -- Retarded React-Select
						setValue("team", e.value);
				}}
			/>
			{errors.team && (
				<p className="text-secondary text-sm pt-1 col-span-2">
					Kérjük adj meg egy csapatnevet
				</p>
			)}

			<select
				className="col-span-2 w-full bg-transparent text-lg p-3 pb-1 border-b-2 border-primary italic"
				onChange={(e) => {
					setOccupation(e.target.value);
				}}
			>
				{[
					{ value: "egyetemista", label: "Egyetemista" },
					{ value: "munkás", label: "Munkás" },
				].map((e) => {
					return (
						<option
							key={e.value}
							value={e.value}
							className="bg-backgroundBlue p-3 my-2"
						>
							{e.label}
						</option>
					);
				})}
			</select>

			<div
				className={clsx(
					"col-span-2 sm:col-span-1 sm:mr-2",
					occupation === "egyetemista" ? "" : "hidden",
				)}
			>
				<Input
					type="text"
					placeholder="Egyetem"
					name="university"
					ref={register({ required: false, maxLength: 255 })}
					error={errors.university}
					errorElement="Rossz formátum"
				/>
			</div>

			<div
				className={clsx(
					"col-span-2 sm:col-span-1 sm:mr-2",
					occupation === "egyetemista" ? "" : "hidden",
				)}
			>
				<Input
					type="number"
					placeholder="Melyik évben kezdtél"
					name="startYear"
					ref={register({ required: false, min: 1900, max: 2020 })}
					error={errors.startYear}
					errorElement="Rossz formátum"
				/>
			</div>

			<div
				className={clsx(
					"col-span-2 sm:col-span-1 sm:mr-2",
					occupation === "egyetemista" ? "hidden" : "",
				)}
			>
				<Input
					type="text"
					placeholder="Munkahely"
					name="workplace"
					ref={register({ required: false, maxLength: 100 })}
					error={errors.workplace}
					errorElement="Rossz formátum"
				/>
			</div>

			<div
				className={clsx(
					"col-span-2 sm:col-span-1 sm:mr-2",
					occupation === "egyetemista" ? "hidden" : "",
				)}
			>
				<Input
					type="text"
					placeholder="Munkakör"
					name="job"
					ref={register({ required: false, maxLength: 100 })}
					error={errors.job}
					errorElement="Rossz formátum"
				/>
			</div>

			<button
				type="submit"
				className={clsx(
					"col-span-2 p-1 border-2 border-primary mt-4",
					"animatedButton",
				)}
			>
				<div className={clsx("p-4 w-full bg-secondary text-xl")}>
					Jelentkezés
				</div>
			</button>
		</form>
	);
}
