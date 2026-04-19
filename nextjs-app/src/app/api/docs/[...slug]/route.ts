import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } },
) {
  try {
    const slug = params.slug?.join("/") || "";

    // Construct the file path safely
    const filePath = path.join(process.cwd(), "src/data/docs", `${slug}.md`);

    // Read the file
    const content = await readFile(filePath, "utf-8");

    // Return the content with appropriate headers
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
