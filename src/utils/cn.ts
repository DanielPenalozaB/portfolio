type ClassValue = string | number | boolean | null | undefined | Record<string, boolean> | ClassArray;
type ClassArray = ClassValue[];

function cn(...inputs: ClassValue[]): string {
  return inputs
    .flatMap((input) => {
      if (!input) return []; // Skip falsy values
      if (typeof input === 'string' || typeof input === 'number') return [ input ]; // Handle strings and numbers
      if (Array.isArray(input)) return input.filter(Boolean); // Handle arrays

      if (typeof input === 'object') {
        return Object.entries(input)
          .filter(([ , value ]) => value) // Include only truthy values
          .map(([ key ]) => key);
      }

      return [];
    })
    .join(' '); // Combine into a single string
}

export default cn;