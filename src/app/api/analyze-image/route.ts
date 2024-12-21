// app/api/analyze-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  console.log("API route started");

  try {
    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is missing");
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Get form data
    const formData = await request.formData();
    console.log("Form data received");

    // Get image file
    const imageFile = formData.get("image");
    if (!imageFile || !(imageFile instanceof Blob)) {
      console.error("No valid image file received");
      return NextResponse.json(
        { error: "No image file provided" },
        { status: 400 }
      );
    }
    console.log("Image file received");

    // Get variables
    const variablesStr = formData.get("variables");
    const variables = variablesStr ? JSON.parse(variablesStr as string) : {};
    console.log("Variables:", variables);

    // Convert image to base64
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");
    console.log("Image converted to base64");

    // Initialize Gemini model
    const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });
    console.log("Model initialized");

    // Prepare prompt
const prompt = `You have been given an image with some mathematical expressions, equations, or graphical problems, and you need to solve them. 
    Note: Use the PEMDAS rule for solving mathematical expressions. PEMDAS stands for the Priority Order: Parentheses, Exponents, 
    Multiplication and Division (from left to right), Addition and Subtraction (from left to right). 

    YOU CAN HAVE FIVE TYPES OF EQUATIONS/EXPRESSIONS IN THIS IMAGE:
    1. Simple mathematical expressions like 2 + 2, 3 * 4, etc.: Return {"expr": "2 + 2", "result": "4"}
    2. Set of Equations: Return {"expr": "x", "result": "2", "assign": true}, {"expr": "y", "result": "5", "assign": true}
    3. Assigning values: Return {"expr": "x = 4", "result": "4", "assign": true}
    4. Graphical Math problems: Return {"expr": "problem description", "result": "calculated answer"}
    5. Abstract Concepts: Return {"expr": "explanation", "result": "concept"}

    

    Return ONLY a JSON with the results, no additional text.
    Strictly follow this format: {"expr": "expression", "result": "result", "assign": true/false} so there is not any error in JSON parsing dont give Unterminated string in JSON `;


    // Call Gemini API
    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image,
        },
      },
      prompt,
    ]);
    console.log("Gemini API called successfully");

    const response = result.response;
    const text = response.text();
    console.log("Raw Gemini response:", text);

    // Parse response
    let answers;
    try {
      answers = JSON.parse(text);
      if (!Array.isArray(answers)) {
        answers = [answers];
      }
    } catch (e) {
      console.log("Failed to parse as JSON, creating simple response", e);
      answers = [
        {
          expr: text.substring(0, 100), // Truncate long responses
          result: text.substring(0, 100),
          assign: false,
        },
      ];
    }

    console.log("Parsed answers:", answers);

    return NextResponse.json({
      success: true,
      results: answers,
    });
  } catch (error) {
    console.error("Full error details:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
