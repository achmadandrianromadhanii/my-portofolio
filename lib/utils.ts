import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Menggabungkan class Tailwind dengan aman (tanpa konflik)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format tanggal ISO ke format lokal Indonesia
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
