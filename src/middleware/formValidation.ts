interface ValidationRules {
  name: { minLength: number; maxLength: number };
  email: { pattern: RegExp };
  mobile: { minLength: number; maxLength: number; pattern: RegExp };
}

const validationRules: ValidationRules = {
  name: { minLength: 3, maxLength: 50 },
  email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  mobile: {
    minLength: 10,
    maxLength: 15,
    pattern: /^\+?[\d\s-]+$/,
  },
};
