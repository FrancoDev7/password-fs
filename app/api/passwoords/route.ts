import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { category, name, username, password, urlWebsite, notes, userId } =
      await request.json();

    const itemsPassword = await db.passwords.create({
      data: {
        category,
        name,
        username,
        password,
        urlWebsite,
        notes,
        userId,
      },
    });

    return NextResponse.json(itemsPassword);
  } catch (error) {
    console.log(error);
    return new NextResponse("Error al crear el itemPassword", { status: 500 });
  }
}
