import { NextResponse } from "next/server";
import { requirementFormSchema } from "@/lib/validations";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = requirementFormSchema.parse(body);

    // Save to database
    const requirement = await db.requirementForm.create({
      data: {
        ...validatedData,
        socialLinks: validatedData.socialLinks ? JSON.stringify(validatedData.socialLinks) : null,
      },
    });

    return NextResponse.json(
      { message: "Your requirements have been submitted successfully! We will contact you soon.", requirementId: requirement.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Requirement Form Error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid form data", errors: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
