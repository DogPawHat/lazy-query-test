import type { UseQueryResult } from "@tanstack/react-query";

interface QueryStateInspectorProps {
	result: UseQueryResult<unknown, Error>;
}

export function QueryStateInspector({ result }: QueryStateInspectorProps) {
	const booleanFlags = [
		{ label: "isPending", value: result.isPending },
		{ label: "isFetching", value: result.isFetching },
		{ label: "isLoading", value: result.isLoading },
		{ label: "isError", value: result.isError },
		{ label: "isSuccess", value: result.isSuccess },
	];

	const stringValues = [
		{ label: "status", value: result.status },
		{ label: "fetchStatus", value: result.fetchStatus },
	];

	return (
		<div className="island-shell space-y-3 rounded-xl p-4">
			<h3
				className="text-sm font-semibold tracking-wide uppercase"
				style={{ color: "var(--kicker)" }}
			>
				Query State
			</h3>
			<div className="flex flex-wrap gap-2">
				{booleanFlags.map((flag) => (
					<span
						key={flag.label}
						className="rounded-full px-3 py-1 text-xs font-medium transition-colors"
						style={{
							backgroundColor: flag.value ? "var(--lagoon)" : "var(--chip-bg)",
							color: flag.value ? "#fff" : "var(--sea-ink-soft)",
							border: flag.value ? "none" : "1px solid var(--chip-line)",
						}}
					>
						{flag.label}: {String(flag.value)}
					</span>
				))}
			</div>
			<div className="flex flex-wrap gap-2">
				{stringValues.map((item) => (
					<span
						key={item.label}
						className="rounded-full px-3 py-1 text-xs font-medium"
						style={{
							backgroundColor: "var(--chip-bg)",
							color: "var(--sea-ink-soft)",
							border: "1px solid var(--chip-line)",
						}}
					>
						{item.label}: {item.value}
					</span>
				))}
			</div>
		</div>
	);
}
