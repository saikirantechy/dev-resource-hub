import { NextRequest, NextResponse } from "next/server";
import { parseGitHubPR, generateAnalysis } from "@/lib/pr-assistant";
import { fetchRealPRData, generateAnalysisFromRealData } from "@/lib/github-pr";

export async function POST(request: NextRequest) {
  let prUrl = "";

  try {
    const body = await request.json();
    prUrl = (body?.prUrl as string) || "";

    if (!prUrl) {
      return NextResponse.json(
        { error: "PR URL is required" },
        { status: 400 },
      );
    }

    const parsed = parseGitHubPR(prUrl);
    if (!parsed.isValid) {
      return NextResponse.json(
        { error: "Invalid GitHub PR URL" },
        { status: 400 },
      );
    }

    const realData = await fetchRealPRData(prUrl, body?.token as string | undefined);

    const analysis = generateAnalysisFromRealData(realData, parsed.repoName);

    return NextResponse.json({
      success: true,
      dataSource: "live" as const,
      result: analysis,
    });
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Unknown error";

    // Fall back to mock analysis on API error
    const parsed = parseGitHubPR(prUrl);
    if (parsed.isValid) {
      const mockResult = generateAnalysis(prUrl, parsed.repoName, parsed.prNumber);
      return NextResponse.json({
        success: true,
        dataSource: "mock" as const,
        error: errMsg,
        result: mockResult,
      });
    }

    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 },
    );
  }
}
