import { LoaderIcon } from "@/assets/svg";
import Link from "next/link";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const variantStyles = {
	fill: "bg-waikawa text-white hover:bg-waikawa-400 focus:bg-waikawa-600 disabled:bg-neutral-300 disabled:text-neutral-500",
	outline: "border border-waikawa text-waikawa hover:bg-waikawa-100 dark:hover:bg-waikawa-900 dark:border-waikawa-900 focus:bg-waikawa-200 disabled:border-waikawa-300 disabled:text-waikawa-300 dark:disabled:border-waikawa-900 dark:disabled:text-waikawa-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent",
	shades: "bg-light text-waikawa hover:bg-waikawa-100 dark:bg-dark dark:hover:bg-waikawa-900 disabled:border-waikawa-300 disabled:text-waikawa-300 dark:disabled:border-waikawa-900 dark:disabled:text-waikawa-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent",
	text: "text-waikawa hover:text-waikawa-400 focus:text-waikawa-600 disabled:text-waikawa-300",
};

const sizeStyles = {
	xs: "px-3 py-2 text-xs",
	sm: "px-4 py-2 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-6 py-3 text-base",
	xl: "px-6 py-4 text-lg",
};

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	children: React.ReactNode;
	variant?: keyof typeof variantStyles;
	size?: keyof typeof sizeStyles;
	isLoading?: boolean;
	isDisabled?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	href?: string;
}

export default function Button({
	children,
	variant = "fill",
	size = "md",
	isLoading = false,
	isDisabled = false,
	className = "",
	leftIcon,
	rightIcon,
	href,
	...props
}: ButtonProps) {
	const baseStyles = "inline-flex items-center gap-2 justify-center font-medium rounded-lg transition-colors duration-200 focus:outline-none disabled:cursor-not-allowed";

	if (typeof children === "string") {
		props.title = props.title || children.toString()
	};

	if (href) {
		return (
			<Link
				href={href}
				className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
				title={props.title}
				rel="noopener noreferrer"
			>
				{isLoading && (
					<LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
				)}
				{!isLoading && leftIcon && (
					<>{leftIcon}</>
				)}
				{children}
				{!isLoading && rightIcon && (
					<>{rightIcon}</>
				)}
			</Link>
		);
	}

	return (
		<button
			disabled={isDisabled || isLoading}
			className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
			{...props}
		>
			{isLoading && (
				<LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
			)}
			{!isLoading && leftIcon && (
				<>{leftIcon}</>
			)}
			{children}
			{!isLoading && rightIcon && (
				<>{rightIcon}</>
			)}
		</button>
	);
};