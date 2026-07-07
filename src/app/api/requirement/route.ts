import { NextResponse } from "next/server";
import { requirementFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = requirementFormSchema.parse(body);

    // TODO: Save to database or send an email
    // For example: await prisma.requirementForm.create({ data: validatedData })
    console.log("Requirement form submitted:", validatedData);

    return NextResponse.json(
      { message: "Your requirements have been submitted successfully! We will contact you soon." },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { message: "Invalid form data.", error: error },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
