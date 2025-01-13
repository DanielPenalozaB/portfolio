import { useEffect, useRef, useState } from 'react';

type UseKeyboardNavigationProps<T> = {
	items: T[];
	isOpen: boolean;
	onSelect: (item: T) => void;
	onClose: () => void;
};

export default function useKeyboardNavigation<T>({
	items,
	isOpen,
	onSelect,
	onClose
}: UseKeyboardNavigationProps<T>) {
	const [focusedIndex, setFocusedIndex] = useState<number>(-1);
	const menuRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (!isOpen) {
			setFocusedIndex(-1);
		}
	}, [isOpen]);

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isOpen) return;

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				setFocusedIndex(prev => (prev + 1) % items.length);
				break;
			case 'ArrowUp':
				event.preventDefault();
				setFocusedIndex(prev => (prev - 1 + items.length) % items.length);
				break;
			case 'Enter':
				event.preventDefault();
				if (focusedIndex !== -1) {
					onSelect(items[focusedIndex]);
				}
				break;
			case 'Escape':
				event.preventDefault();
				onClose();
				break;
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, focusedIndex, items]);

	return { focusedIndex, menuRef };
};