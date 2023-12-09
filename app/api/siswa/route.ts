import { NextResponse } from "next/server";
import type { Siswa } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const POST = async (req: Request) => {
  try {
    const body: Siswa = await req.json();

    // Validasi input
    if (!body.id || !body.nama || !body.jurusan) {
      return NextResponse.json(
        { error: "id, nama, dan jurusan harus diisi" },
        { status: 400 }
      );
    }

    // Menambahkan siswa ke database
    const siswa = await prisma.siswa.create({
      data: {
        id: body.id,
        nama: body.nama,
        jurusan: body.jurusan,
      },
    });

    return NextResponse.json(siswa, { status: 201 });
  } catch (error) {
    console.error("Error during POST operation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambahkan siswa" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    // Mengambil data siswa dari database
    const siswa = await prisma.siswa.findMany({
      select: {
        id: true,
        nama: true,
        jurusan: true,
      },
    });

    return NextResponse.json(siswa, { status: 200 });
  } catch (error) {
    console.error("Error during GET operation:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data siswa" },
      { status: 500 }
    );
  }
};
