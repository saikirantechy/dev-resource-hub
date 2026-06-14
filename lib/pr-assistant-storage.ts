import type { AnalysisResult, ParsedPR } from "@/lib/pr-assistant";

const STORAGE_KEY = "dev-resource-hub-pr-reviews";

export interface SavedReview {
  id: string;
  repoName: string;
  prNumber: string;
  prUrl: string;
  result: AnalysisResult;
  savedAt: string;
}

function getAllReviews(): SavedReview[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistReviews(reviews: SavedReview[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch {
  }
}

export function saveReview(
  prUrl: string,
  parsed: ParsedPR,
  result: AnalysisResult,
): SavedReview {
  const reviews = getAllReviews();
  const id = `${parsed.repoName}#${parsed.prNumber}-${Date.now()}`;

  const review: SavedReview = {
    id,
    repoName: parsed.repoName,
    prNumber: parsed.prNumber,
    prUrl,
    result,
    savedAt: new Date().toISOString(),
  };

  const existingIdx = reviews.findIndex(
    (r) => r.repoName === parsed.repoName && r.prNumber === parsed.prNumber,
  );

  if (existingIdx >= 0) {
    reviews[existingIdx] = review;
  } else {
    reviews.unshift(review);
  }

  persistReviews(reviews);
  return review;
}

export function loadReviews(): SavedReview[] {
  return getAllReviews();
}

export function deleteReview(id: string): void {
  const reviews = getAllReviews().filter((r) => r.id !== id);
  persistReviews(reviews);
}

export function clearAllReviews(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
  }
}

export function getReviewCount(): number {
  return getAllReviews().length;
}
