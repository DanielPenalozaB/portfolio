import { useState, useCallback } from 'react';

export default function useToggle(initialState = false) {
	const [state, setState] = useState(initialState);

	const toggle = useCallback(() => setState(prev => !prev), []);
	const setTrue = useCallback(() => setState(true), []);
	const setFalse = useCallback(() => setState(false), []);

	return [state, { toggle, setTrue, setFalse }] as const;
};