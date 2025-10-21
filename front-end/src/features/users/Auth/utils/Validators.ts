export interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  proofDocument: File | null;
  termsAccepted: boolean;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  companyName?: string;
  proofDocument?: string;
  termsAccepted?: string;
}

export const validateSignup = (
  data: FormData,
  accountType: "buyer" | "seller"
): FormErrors => {
  const errors: FormErrors = {};

  // Name
  if (!data.name || data.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters long";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = "Invalid email address";
  }

  // Phone (10 digits minimum)
  const phoneDigits = data.phone.replace(/\D/g, "");
  if (!data.phone || phoneDigits.length < 10) {
    errors.phone = "Enter a valid phone number";
  }

  // Password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?~-]).{8,}$/;
  if (!data.password || !passwordRegex.test(data.password)) {
    errors.password =
      "Password must be 8+ chars with uppercase, lowercase, number & symbol";
  }

  // Confirm Password
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Terms
  if (!data.termsAccepted) {
    errors.termsAccepted = "You must accept terms and conditions";
  }

  // Seller fields
  if (accountType === "seller") {
    if (!data.companyName || data.companyName.trim().length < 3) {
      errors.companyName = "Company name must be at least 3 characters";
    }
    if (!data.proofDocument) {
      errors.proofDocument = "Please upload proof document";
    }
  }

  return errors;
};
export interface PasswordErrors {
  password?: string;
  confirmPassword?: string;
}

export const validatePassword = (
  password: string,
  confirmPassword: string
): PasswordErrors => {
  const errors: PasswordErrors = {};

  // Password validation (same regex as signup)
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?~-]).{8,}$/;

  if (!password || !passwordRegex.test(password)) {
    errors.password =
      "Password must be 8+ chars with uppercase, lowercase, number & symbol";
  }

  // Confirm password
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
