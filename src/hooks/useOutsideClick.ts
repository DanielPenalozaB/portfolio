import { useEffect, useRef } from 'react';

type UseOutsideClickProps = {
	onOutsideClick: () => void;
	enabled?: boolean;
};

export default function useOutsideClick<T extends HTMLElement>({
	onOutsideClick,
	enabled = true
}: UseOutsideClickProps) {
	const ref = useRef<T>(null);

	useEffect(() => {
		if (!enabled) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [onOutsideClick, enabled]);

	return ref;
};